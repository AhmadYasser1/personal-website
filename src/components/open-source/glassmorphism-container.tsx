"use client";

import { motion } from "motion/react";
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
      {/* Animated background orbs */}
      <motion.div
        className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      {/* Glass container */}
      <div className="relative rounded-xl border border-white/10 bg-card/50 backdrop-blur-xl p-6 shadow-xl">
        {children}
      </div>
    </div>
  );
}
