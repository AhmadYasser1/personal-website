"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
}

export function TiltCard({
  children,
  className,
  maxTilt = 8,
  scale = 1.02,
  perspective = 1000,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Skip on touch devices and reduced motion — avoid loading GSAP
    const mq = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!mq.matches) return;

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    import("gsap").then(({ default: gsap }) => {
      if (cancelled) return;

      const quickX = gsap.quickTo(card, "rotateY", {
        duration: 0.3,
        ease: "power2.out",
      });
      const quickY = gsap.quickTo(card, "rotateX", {
        duration: 0.3,
        ease: "power2.out",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const normalX = (e.clientX - centerX) / (rect.width / 2);
        const normalY = (e.clientY - centerY) / (rect.height / 2);

        quickX(normalX * maxTilt);
        quickY(-normalY * maxTilt);
      };

      const handleMouseEnter = () => {
        gsap.to(card, { scale, duration: 0.3, ease: "power2.out" });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      cleanup = () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
        gsap.killTweensOf(card);
        gsap.set(card, { rotateX: 0, rotateY: 0, scale: 1 });
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [maxTilt, scale]);

  return (
    <div style={{ perspective: `${perspective}px` }}>
      <div
        ref={cardRef}
        className={cn("will-change-transform", className)}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
}
