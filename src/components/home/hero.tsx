"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { MagneticElement } from "@/components/ui/magnetic-element";
import { gsap, SplitText, useGSAP } from "@/lib/gsap/plugins";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const heading = headingRef.current;
      if (!heading) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(heading, {
          type: "chars",
          mask: "chars",
        });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from("[data-hero-badge]", {
          opacity: 0,
          y: 15,
          duration: 0.5,
        })
          .from(
            split.chars,
            {
              y: "100%",
              opacity: 0,
              duration: 0.6,
              stagger: 0.025,
            },
            "-=0.2",
          )
          .from(
            "[data-hero-dot]",
            {
              scale: 0,
              opacity: 0,
              duration: 0.4,
              ease: "back.out(2)",
            },
            "-=0.3",
          )
          .from(
            "[data-hero-subtitle]",
            {
              opacity: 0,
              y: 20,
              filter: "blur(8px)",
              duration: 0.6,
            },
            "-=0.2",
          )
          .from(
            "[data-hero-cta]",
            {
              opacity: 0,
              y: 20,
              duration: 0.5,
              stagger: 0.1,
            },
            "-=0.3",
          )
          .from(
            "[data-hero-stat]",
            {
              opacity: 0,
              y: 15,
              duration: 0.4,
              stagger: 0.1,
            },
            "-=0.2",
          )
          .from(
            "[data-hero-scroll]",
            {
              opacity: 0,
              duration: 0.5,
            },
            "-=0.1",
          );

        return () => {
          split.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
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
          <div data-hero-badge>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 transition-transform duration-200 hover:scale-105">
              Digital Fellow at Brooklyn Sports and Entertainment
            </span>
          </div>

          <h1
            ref={headingRef}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Hi, I&apos;m{" "}
            <span className="text-emerald-400">Ahmad Yasser</span>
            <span
              data-hero-dot
              className="inline-block text-emerald-500 animate-dot-pulse"
            >
              .
            </span>
          </h1>

          <p
            data-hero-subtitle
            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Human-Computer Interaction Researcher and Dual-degree CS graduate
            from University of Minnesota - Twin Cities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticElement strength={0.3}>
              <div data-hero-cta>
                <Button
                  asChild
                  size="lg"
                  className="min-w-[160px] transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  <Link href="/projects">See My Work</Link>
                </Button>
              </div>
            </MagneticElement>
            <MagneticElement strength={0.3}>
              <div data-hero-cta>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-w-[160px] transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </MagneticElement>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
            <div data-hero-stat>
              <Stat label="GPA" value="4.0" isText />
            </div>
            <div data-hero-stat>
              <Stat label="Research Publications" value="2+" isText />
            </div>
            <div data-hero-stat>
              <Stat label="Projects" value={20} suffix="+" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — CSS-only */}
      <div
        data-hero-scroll
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
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
  isText = false,
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
          <AnimatedCounter
            value={value as number}
            suffix={suffix}
            duration={1.5}
          />
        )}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
