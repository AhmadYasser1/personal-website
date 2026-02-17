"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MagneticElement } from "@/components/ui/magnetic-element";

export function BackButton() {
  return (
    <div className="fixed left-6 top-1/2 z-50 -translate-y-1/2 md:left-10">
      <MagneticElement strength={0.4}>
        <Link
          href="/"
          aria-label="Back to home"
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/20 bg-zinc-900/80 backdrop-blur-sm transition-colors hover:border-emerald-500/50 hover:bg-zinc-800/90"
        >
          <ArrowLeft className="h-5 w-5 text-emerald-400 transition-transform group-hover:-translate-x-0.5" />
        </Link>
      </MagneticElement>
    </div>
  );
}
