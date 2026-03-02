"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initPostHog, trackPageView } from "@/lib/posthog";

export function PostHogProvider() {
  const pathname = usePathname();

  useEffect(() => {
    initPostHog();
  }, []);

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
