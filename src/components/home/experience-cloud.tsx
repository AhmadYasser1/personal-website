"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MagneticElement } from "@/components/ui/magnetic-element";

interface ExperienceCloudProps {
  company: string;
  role: string;
  tagline: string;
  href: string;
  side: "left" | "right";
  className?: string;
}

export function ExperienceCloud({
  company,
  role,
  tagline,
  href,
  side,
  className,
}: ExperienceCloudProps) {
  const cloudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cloud = cloudRef.current;
    if (!cloud) return;

    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    import("gsap").then(({ default: gsap }) => {
      if (cancelled) return;

      gsap.to(cloud, {
        y: "-=12",
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      cleanup = () => {
        gsap.killTweensOf(cloud);
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <MagneticElement strength={0.15}>
      <div ref={cloudRef} className="p-2">
        <Link
          href={href}
          className={cn(
            "group relative block",
            "w-[200px] p-5 rounded-xl",
            "bg-card/30 backdrop-blur-xl",
            "border border-emerald-500/20",
            "shadow-lg shadow-emerald-500/5",
            "hover:border-emerald-500/60 hover:shadow-emerald-500/20",
            "hover:scale-105",
            "transition-all duration-300",
            "will-change-transform",
            side === "left" ? "rotate-[-3deg]" : "rotate-[3deg]",
            className,
          )}
        >
          {/* Background depth layer */}
          <div className="absolute -top-10 -left-10 w-32 h-32 [background:radial-gradient(circle,oklch(from_var(--color-emerald-500)_l_c_h/0.15)_0%,transparent_70%)]" />

          {/* Content */}
          <div className="relative space-y-1.5">
            <div className="text-xs font-medium text-emerald-500">
              {company}
            </div>
            <div className="text-sm font-semibold text-foreground">{role}</div>
            <div className="text-xs text-muted-foreground">{tagline}</div>
          </div>

          {/* Hover arrow hint */}
          <div className="relative mt-3 flex items-center gap-1 text-xs text-emerald-500/0 group-hover:text-emerald-500 transition-colors duration-300">
            <span>View</span>
            <svg
              className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      </div>
    </MagneticElement>
  );
}
