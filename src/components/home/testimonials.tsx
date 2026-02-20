"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/lib/data/testimonials";
import type { Testimonial } from "@/lib/data/testimonials";

export function Testimonials() {
  return (
    <section className="py-24 [content-visibility:auto] [contain-intrinsic-size:auto_600px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            What People Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Recommendations from mentors and colleagues I&apos;ve had the
            privilege of working with
          </p>
        </div>
      </div>

      {/* Mobile: snap-scrollable horizontal list */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 scrollbar-hide">
          {testimonials.map((t) => (
            <div key={t.id} className="snap-start shrink-0 w-[85vw] max-w-[440px]">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: infinite marquee */}
      <div className="group hidden md:block relative overflow-hidden">
        {/* Gradient fade — left */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        {/* Gradient fade — right */}
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee will-change-transform group-hover:[animation-play-state:paused]">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
          {/* Duplicate for seamless infinite loop */}
          {testimonials.map((t) => (
            <TestimonialCard key={`${t.id}-dup`} testimonial={t} aria-hidden />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, "aria-hidden": ariaHidden }: { testimonial: Testimonial; "aria-hidden"?: boolean }) {
  return (
    <div className="px-2 shrink-0 md:w-[440px]" aria-hidden={ariaHidden}>
      <Card className="h-full border-border/50 hover:border-primary/30 transition-colors">
        <CardContent className="flex flex-col flex-1 pt-6">
          {/* Quote icon */}
          <svg
            className="w-8 h-8 text-primary/20 mb-3 shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.998 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.986z" />
          </svg>

          <p className="text-sm leading-relaxed text-foreground/90 italic mb-5 grow">
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          <div className="flex items-center gap-3 pt-3 border-t border-border/50 mt-auto shrink-0">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={36}
              height={36}
              sizes="36px"
              className="w-9 h-9 rounded-full object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate">
                {testimonial.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {testimonial.title}
              </p>
            </div>
            <Badge
              variant="secondary"
              className="text-[10px] shrink-0"
            >
              {testimonial.relationship}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
