"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface KineticTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function KineticText({
  children,
  className,
  as: Tag = "p",
}: KineticTextProps) {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("gsap/SplitText"),
    ]).then(([gsapMod, scrollMod, splitMod]) => {
      if (cancelled) return;

      const gsap = gsapMod.default;
      const { ScrollTrigger } = scrollMod;
      const { SplitText } = splitMod;
      gsap.registerPlugin(ScrollTrigger, SplitText);

      const mm = gsap.matchMedia();

      // DESKTOP: SplitText scrub animation
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const split = SplitText.create(el, { type: "chars" });

          gsap.fromTo(
            split.chars,
            { opacity: 0.15 },
            {
              opacity: 1,
              stagger: 0.03,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "bottom 40%",
                scrub: 1,
              },
            },
          );

          return () => {
            split.revert();
          };
        },
      );

      // MOBILE: Simple opacity fade on scroll, no SplitText
      mm.add(
        "(max-width: 767.98px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            el,
            { opacity: 0.15 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "bottom 40%",
                scrub: 1,
              },
            },
          );
        },
      );

      cleanup = () => mm.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [children]);

  return (
    <Tag
      ref={textRef as React.RefObject<HTMLHeadingElement>}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
