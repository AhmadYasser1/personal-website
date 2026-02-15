"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/plugins";
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
  const quickX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(() => {
    const el = elRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      quickX.current = gsap.quickTo(el, "x", {
        duration: 0.4,
        ease: "power3.out",
      });
      quickY.current = gsap.quickTo(el, "y", {
        duration: 0.4,
        ease: "power3.out",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        quickX.current?.((e.clientX - centerX) * strength);
        quickY.current?.((e.clientY - centerY) * strength);
      };

      const handleMouseLeave = () => {
        quickX.current?.(0);
        quickY.current?.(0);
      };

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => mm.revert();
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
