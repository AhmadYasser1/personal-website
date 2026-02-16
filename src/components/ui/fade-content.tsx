"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface FadeContentProps {
  children: React.ReactNode;
  className?: string;
  blur?: number;
  duration?: number;
  delay?: number;
  y?: number;
}

export function FadeContent({
  children,
  className,
  blur = 8,
  duration = 0.8,
  delay = 0,
  y = 30,
}: FadeContentProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = elRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el, {
          opacity: 0,
          y,
          filter: `blur(${blur}px)`,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: elRef },
  );

  return (
    <div ref={elRef} className={cn(className)}>
      {children}
    </div>
  );
}
