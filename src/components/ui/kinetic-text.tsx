"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, SplitText);

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

  useGSAP(
    () => {
      const el = textRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      // DESKTOP: SplitText scrub animation
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
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
      });

      // MOBILE: Simple opacity fade on scroll, no SplitText
      mm.add("(max-width: 767.98px) and (prefers-reduced-motion: no-preference)", () => {
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
      });

      return () => mm.revert();
    },
    { scope: textRef, dependencies: [children], revertOnUpdate: true },
  );

  return (
    <Tag ref={textRef as React.RefObject<HTMLHeadingElement>} className={cn(className)}>
      {children}
    </Tag>
  );
}
