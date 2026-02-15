"use client";

import { useEffect } from "react";
import { useLenis } from "@/components/smooth-scroll-provider";

export function ScrollConfig() {
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prevent scroll restoration on refresh — always start at top
    history.scrollRestoration = "manual";

    // Scroll to top via Lenis (immediate = no smooth animation)
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis]);

  return null;
}
