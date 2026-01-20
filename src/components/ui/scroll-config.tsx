"use client";

import { useEffect } from "react";

export function ScrollConfig() {
  useEffect(() => {
    // Prevent scroll restoration on refresh - always start at top
    if (typeof window !== 'undefined') {
      // Disable scroll restoration
      history.scrollRestoration = "manual";
      
      // Scroll to top on page load
      window.scrollTo(0, 0);
      
      // Add slight delay to ensure it works after hydration
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}
