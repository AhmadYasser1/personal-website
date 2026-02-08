"use client";

import { LazyMotion } from "motion/react";

const loadFeatures = () =>
  import("motion/react").then((mod) => mod.domAnimation);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
