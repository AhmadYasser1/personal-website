"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/plugins";
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
  const quickX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    // Disable on touch devices and reduced motion
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      quickX.current = gsap.quickTo(card, "rotateY", {
        duration: 0.3,
        ease: "power2.out",
      });
      quickY.current = gsap.quickTo(card, "rotateX", {
        duration: 0.3,
        ease: "power2.out",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const normalX = (e.clientX - centerX) / (rect.width / 2);
        const normalY = (e.clientY - centerY) / (rect.height / 2);

        quickX.current?.(normalX * maxTilt);
        quickY.current?.(-normalY * maxTilt);
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

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => mm.revert();
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
