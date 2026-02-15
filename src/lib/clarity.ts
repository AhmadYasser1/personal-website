import Clarity from "@microsoft/clarity";

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

let initialized = false;

export function initClarity() {
  if (initialized || !CLARITY_PROJECT_ID || typeof window === "undefined") return;
  Clarity.init(CLARITY_PROJECT_ID);
  initialized = true;
}

export function trackEvent(eventName: string) {
  if (!initialized) return;
  Clarity.event(eventName);
}

export function tagSession(key: string, value: string) {
  if (!initialized) return;
  Clarity.setTag(key, value);
}
