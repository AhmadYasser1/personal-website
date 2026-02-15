"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  animate?: boolean;
}

export function GradientText({
  children,
  className,
  as: Tag = "span",
  animate = false,
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500",
        animate && "bg-[length:200%_auto] animate-gradient-shift",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
