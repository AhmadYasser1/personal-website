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

      const split = SplitText.create(el, { type: "chars" });

      // Each character goes from dim (0.15) to full opacity tied to scroll
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
    { scope: textRef, dependencies: [children], revertOnUpdate: true },
  );

  return (
    <Tag ref={textRef as React.RefObject<HTMLHeadingElement>} className={cn(className)}>
      {children}
    </Tag>
  );
}
