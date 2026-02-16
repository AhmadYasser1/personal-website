"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

ScrollTrigger.config({ ignoreMobileResize: true });

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
  const lenisRef = useRef<LenisRef>(null);

  const prefersReduced = useSyncExternalStore(
    subscribePrefersReduced,
    getSnapshotPrefersReduced,
    getServerSnapshotPrefersReduced,
  );

  // Sync Lenis scroll position with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: prefersReduced ? 1 : 0.1,
        smoothWheel: !prefersReduced,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export { useLenis };
