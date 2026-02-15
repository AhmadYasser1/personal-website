import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface GlassmorphismContainerProps {
  children: ReactNode;
  className?: string;
}

export function GlassmorphismContainer({
  children,
  className,
}: GlassmorphismContainerProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      {/* Background orbs — radial gradients (zero-cost vs blur-3xl) */}
      <div className="absolute -top-20 -left-20 h-64 w-64 [background:radial-gradient(circle,oklch(0.72_0.19_155/0.20)_0%,transparent_70%)] will-change-transform animate-orb-drift-1" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 [background:radial-gradient(circle,oklch(0.7_0.15_300/0.20)_0%,transparent_70%)] will-change-transform animate-orb-drift-2" />
      {/* Glass container */}
      <div className="relative rounded-xl border border-white/10 bg-card/50 backdrop-blur-xl p-6 shadow-xl">
        {children}
      </div>
    </div>
  );
}
