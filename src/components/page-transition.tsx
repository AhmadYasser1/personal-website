"use client";

import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Freezes the previous route's children so AnimatePresence
 * can animate them out while the new route renders.
 */
function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  // Capture context on mount; useState initializer runs only once
  const [frozen] = useState(() => context);

  return (
    <LayoutRouterContext value={frozen}>
      {children}
    </LayoutRouterContext>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        // Critical: recalculate GSAP ScrollTrigger positions
        // after the old route finishes its exit animation
        ScrollTrigger.refresh();
      }}
    >
      <m.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </m.div>
    </AnimatePresence>
  );
}
