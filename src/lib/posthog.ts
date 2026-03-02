import posthog from "posthog-js";

let initialized = false;

export function initPostHog() {
  if (initialized || typeof window === "undefined") return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!key || !host) return;

  posthog.init(key, {
    api_host: host,
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    persistence: "localStorage+cookie",
    loaded: () => {
      initialized = true;
    },
  });
}

export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>,
) {
  if (!initialized) return;
  posthog.capture(eventName, properties);
}

export function trackPageView(path: string) {
  if (!initialized) return;
  posthog.capture("$pageview", { $current_url: path });
}

export function optInCapturing() {
  posthog.opt_in_capturing();
}

export function optOutCapturing() {
  posthog.opt_out_capturing();
}
