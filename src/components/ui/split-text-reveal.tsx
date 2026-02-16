"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface SplitTextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  type?: "chars" | "words" | "lines";
  trigger?: "load" | "scroll";
  duration?: number;
  stagger?: number;
}

export function SplitTextReveal({
  children,
  className,
  as: Tag = "h2",
  type = "chars",
  trigger = "scroll",
  duration = 0.6,
  stagger = 0.02,
}: SplitTextRevealProps) {
  const textRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = textRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      // DESKTOP: SplitText animation
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(el, { type });
        const targets =
          type === "chars"
            ? split.chars
            : type === "words"
              ? split.words
              : split.lines;

        if (trigger === "scroll") {
          gsap.from(targets, {
            opacity: 0,
            y: 20,
            duration,
            stagger,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          });
        } else {
          gsap.from(targets, {
            opacity: 0,
            y: 20,
            duration,
            stagger,
            ease: "power2.out",
          });
        }

        return () => {
          split.revert();
        };
      });

      // MOBILE: Simple fade-in, no SplitText
      mm.add("(max-width: 767.98px) and (prefers-reduced-motion: no-preference)", () => {
        if (trigger === "scroll") {
          gsap.from(el, {
            opacity: 0,
            y: 15,
            duration,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          });
        } else {
          gsap.from(el, {
            opacity: 0,
            y: 15,
            duration,
            ease: "power2.out",
          });
        }
      });

      return () => mm.revert();
    },
    { scope: textRef, dependencies: [children, type, trigger, duration, stagger] },
  );

  return (
    <Tag ref={textRef as React.RefObject<HTMLHeadingElement>} className={cn(className)}>
      {children}
    </Tag>
  );
}
