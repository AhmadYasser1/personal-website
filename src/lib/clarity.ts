import Clarity from "@microsoft/clarity";

let initialized = false;

export function initClarity(projectId: string) {
  if (initialized || typeof window === "undefined") return;
  Clarity.init(projectId);
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
