"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "span";
}

export function MagneticElement({
  children,
  className,
  strength = 0.3,
  as: Tag = "div",
}: MagneticElementProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Check matchMedia BEFORE importing gsap — skip entirely on mobile/touch
    const mq = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!mq.matches) return;

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    import("gsap").then(({ default: gsap }) => {
      if (cancelled) return;

      const quickX = gsap.quickTo(el, "x", {
        duration: 0.4,
        ease: "power3.out",
      });
      const quickY = gsap.quickTo(el, "y", {
        duration: 0.4,
        ease: "power3.out",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        quickX((e.clientX - centerX) * strength);
        quickY((e.clientY - centerY) * strength);
      };

      const handleMouseLeave = () => {
        quickX(0);
        quickY(0);
      };

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);

      cleanup = () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [strength]);

  return (
    <Tag
      ref={elRef as React.RefObject<HTMLDivElement>}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </Tag>
  );
}
