"use client";

import { useEffect, useRef, useState } from "react";
import * as m from "motion/react-m";
import { useInView } from "motion/react";

interface AnimatedCounterProps {
  value: number | string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  const numericValue = typeof value === "string" ? parseFloat(value) : value;
  const isDecimal = numericValue % 1 !== 0;

  useEffect(() => {
    if (!isInView) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      const id = requestAnimationFrame(() => setDisplayValue(numericValue));
      return () => cancelAnimationFrame(id);
    }

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateValue = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);

      // Easing function (ease out cubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericValue;

      setDisplayValue(current);

      if (now < endTime) {
        requestAnimationFrame(updateValue);
      } else {
        setDisplayValue(numericValue);
      }
    };

    requestAnimationFrame(updateValue);
  }, [isInView, numericValue, duration]);

  return (
    <m.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {isDecimal ? displayValue.toFixed(1) : Math.floor(displayValue)}
      {suffix}
    </m.span>
  );
}
