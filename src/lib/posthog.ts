import posthog from "posthog-js";

export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>,
) {
  posthog.capture(eventName, properties);
}

export function optInCapturing() {
  posthog.opt_in_capturing();
}

export function optOutCapturing() {
  posthog.opt_out_capturing();
}
