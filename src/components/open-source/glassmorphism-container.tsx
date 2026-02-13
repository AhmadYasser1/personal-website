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
      {/* Background orbs — CSS-animated for compositor-thread performance */}
      <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl will-change-transform animate-orb-drift-1" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl will-change-transform animate-orb-drift-2" />
      {/* Glass container */}
      <div className="relative rounded-xl border border-white/10 bg-card/50 backdrop-blur-xl p-6 shadow-xl">
        {children}
      </div>
    </div>
  );
}
