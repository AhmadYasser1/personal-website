"use client";

import { cn } from "@/lib/utils";

interface StarBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  speed?: string;
}

export function StarBorder({
  children,
  className,
  borderWidth = 1,
  speed = "6s",
}: StarBorderProps) {
  return (
    <div
      className={cn("relative rounded-xl overflow-hidden", className)}
      style={{ padding: borderWidth }}
    >
      {/* Rotating gradient border */}
      <div
        className="absolute inset-0 animate-star-rotate"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, oklch(0.55 0.2 160) 10%, transparent 20%)",
          animationDuration: speed,
        }}
      />

      {/* Inner content with background to mask the gradient */}
      <div className="relative rounded-[calc(0.75rem-1px)] bg-card h-full">
        {children}
      </div>
    </div>
  );
}
