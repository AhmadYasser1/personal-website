"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  useRef,
} from "react";

// Type for Lenis instance (matches lenis package exports)
type LenisInstance = {
  scrollTo: (
    target: number | string,
    options?: { immediate?: boolean; offset?: number; duration?: number },
  ) => void;
  on: (event: string, callback: (data: { scroll: number }) => void) => void;
  off: (event: string, callback: (data: { scroll: number }) => void) => void;
  raf: (time: number) => void;
  destroy: () => void;
};

const LenisContext = createContext<LenisInstance | null>(null);

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribePrefersReduced(callback: () => void) {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshotPrefersReduced() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerSnapshotPrefersReduced() {
  return false;
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<LenisInstance | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const prefersReduced = useSyncExternalStore(
    subscribePrefersReduced,
    getSnapshotPrefersReduced,
    getServerSnapshotPrefersReduced,
  );

  useEffect(() => {
    let cancelled = false;
    let lenisInstance: LenisInstance | null = null;

    // Dynamically import Lenis and ScrollTrigger
    Promise.all([import("lenis"), import("gsap/ScrollTrigger")]).then(
      ([lenisModule, scrollTriggerModule]) => {
        if (cancelled) return;

        const Lenis = lenisModule.default;
        const { ScrollTrigger } = scrollTriggerModule;

        // Configure ScrollTrigger
        ScrollTrigger.config({ ignoreMobileResize: true });

        // Create Lenis instance
        lenisInstance = new Lenis({
          lerp: prefersReduced ? 1 : 0.1,
          smoothWheel: !prefersReduced,
          syncTouch: false,
        }) as LenisInstance;

        // Sync Lenis with ScrollTrigger
        lenisInstance.on("scroll", ScrollTrigger.update);

        // Set instance in state to make it available via context
        setLenis(lenisInstance);

        // Start RAF loop
        function raf(time: number) {
          if (lenisInstance && !cancelled) {
            lenisInstance.raf(time);
            rafIdRef.current = requestAnimationFrame(raf);
          }
        }
        rafIdRef.current = requestAnimationFrame(raf);
      },
    );

    return () => {
      cancelled = true;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, [prefersReduced]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

/**
 * Custom useLenis hook that is API-compatible with lenis/react.
 * Returns the Lenis instance (or null if not loaded yet).
 * Optionally registers a scroll callback when Lenis is available.
 */
export function useLenis(
  callback?: (data: { scroll: number }) => void,
): LenisInstance | null {
  const lenis = useContext(LenisContext);

  useEffect(() => {
    if (!lenis || !callback) return;

    lenis.on("scroll", callback);

    return () => {
      lenis.off("scroll", callback);
    };
  }, [lenis, callback]);

  return lenis;
}
