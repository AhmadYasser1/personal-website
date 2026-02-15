"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap/plugins";

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

  // Sync Lenis with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker so both share the same RAF loop
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: prefersReduced ? 1 : 0.1,
        duration: 1.2,
        smoothWheel: !prefersReduced,
        syncTouch: false,
        autoRaf: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export { useLenis };
