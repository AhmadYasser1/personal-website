"use client";

import { useRef } from "react";
import Link from "next/link";
import * as m from "motion/react-m";
import { useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0 });

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl will-change-transform animate-orb-drift-1" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl will-change-transform animate-orb-drift-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl will-change-transform animate-orb-pulse" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <m.span 
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Digital Fellow at Brooklyn Sports and Entertainment
            </m.span>
          </m.div>

          <m.h1
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <m.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I&apos;m{" "}
            </m.span>
            <m.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Ahmad Yasser
            </m.span>
          </m.h1>

          <m.p
            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            HCI Researcher and Dual-degree CS graduate from University of Minnesota - Twin Cities.
          </m.p>

          <m.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="min-w-[160px]">
                <Link href="/projects">View Projects</Link>
              </Button>
            </m.div>
            <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="lg" className="min-w-[160px]">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </m.div>
          </m.div>

          <m.div
            className="mt-16 flex items-center justify-center gap-8 sm:gap-12 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Stat label="GPA" value="4.0" isText />
            <Stat label="HCI Publications" value="2+" isText />
            <Stat label="Projects" value={20} suffix="+" />
          </m.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <m.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <m.div
          animate={isInView ? { y: [0, 8, 0] } : { y: 0 }}
          transition={{ duration: 1.5, repeat: isInView ? Infinity : 0 }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <m.div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </m.div>
      </m.div>
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
    <m.div 
      className="text-center"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
        {isText ? (
          <m.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {value}
          </m.span>
        ) : (
          <AnimatedCounter value={value as number} suffix={suffix} duration={1.5} />
        )}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </m.div>
  );
}
