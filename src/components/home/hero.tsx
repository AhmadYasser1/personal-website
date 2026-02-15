"use client";

import Link from "next/link";
import * as m from "motion/react-m";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background — radial gradients (zero-cost vs blur-3xl) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute top-20 left-10 w-72 h-72 [background:radial-gradient(circle,oklch(from_var(--color-emerald-500)_l_c_h/0.10)_0%,transparent_70%)] will-change-transform animate-orb-drift-1" />
        <div className="absolute bottom-20 right-10 w-96 h-96 [background:radial-gradient(circle,oklch(from_var(--color-emerald-500)_l_c_h/0.05)_0%,transparent_70%)] will-change-transform animate-orb-drift-2" />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] [background:radial-gradient(circle,oklch(from_var(--color-emerald-500)_l_c_h/0.05)_0%,transparent_70%)] will-change-transform animate-orb-pulse" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 transition-transform duration-200 hover:scale-105">
              Digital Fellow at Brooklyn Sports and Entertainment
            </span>
          </m.div>

          <m.h1
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Ahmad Yasser
            </span>
            <span className="text-emerald-500 animate-dot-pulse">.</span>
          </m.h1>

          <m.p
            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Human-Computer Interaction Researcher and Dual-degree CS graduate from University of Minnesota - Twin Cities.
          </m.p>

          <m.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button asChild size="lg" className="min-w-[160px] transition-transform duration-200 hover:scale-105 active:scale-95">
              <Link href="/projects">See My Work</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[160px] transition-transform duration-200 hover:scale-105 active:scale-95">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </m.div>

          <m.div
            className="mt-16 flex items-center justify-center gap-8 sm:gap-12 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Stat label="GPA" value="4.0" isText />
            <Stat label="Research Publications" value="2+" isText />
            <Stat label="Projects" value={20} suffix="+" />
          </m.div>
        </div>
      </div>

      {/* Scroll indicator — CSS-only */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in [animation-delay:1s] [animation-fill-mode:backwards]">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2 animate-scroll-bounce">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  suffix = "",
  isText = false
}: {
  label: string;
  value: number | string;
  suffix?: string;
  isText?: boolean;
}) {
  return (
    <div className="text-center transition-transform duration-200 hover:scale-110">
      <div className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
        {isText ? (
          <span>{value}</span>
        ) : (
          <AnimatedCounter value={value as number} suffix={suffix} duration={1.5} />
        )}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
