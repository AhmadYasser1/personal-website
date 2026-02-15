"use client";

import { useRef, useEffect, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap/plugins";

function subscribeToPointerMedia(callback: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getPointerFineSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getPointerFineServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const isFinePointer = useSyncExternalStore(
    subscribeToPointerMedia,
    getPointerFineSnapshot,
    getPointerFineServerSnapshot,
  );

  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const xDot = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yDot = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const xFollower = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yFollower = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useEffect(() => {
    if (!isFinePointer) return;
    const dot = dotRef.current;
    const follower = followerRef.current;
    if (!dot || !follower) return;

    // Pre-configure quickTo tweens for maximum perf
    xDot.current = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power2.out" });
    yDot.current = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power2.out" });
    xFollower.current = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power2.out" });
    yFollower.current = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      xDot.current?.(e.clientX);
      yDot.current?.(e.clientY);
      xFollower.current?.(e.clientX);
      yFollower.current?.(e.clientY);
    };

    // Expand follower on interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select, [data-magnetic]")
      ) {
        gsap.to(follower, { scale: 2, opacity: 0.5, duration: 0.3, ease: "power2.out" });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select, [data-magnetic]")
      ) {
        gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      {/* Small emerald dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      </div>
      {/* Larger follower circle */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      >
        <div className="w-8 h-8 rounded-full border border-emerald-500/40" />
      </div>
    </>
  );
}
