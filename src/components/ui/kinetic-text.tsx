"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap/plugins";
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
