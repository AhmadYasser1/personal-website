"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";

const CONSENT_KEY = "analytics-consent";

type ConsentValue = "granted" | "declined" | null;

function getSnapshot(): ConsentValue {
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === "granted" || value === "declined") return value;
  return null;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function grantClarityConsent() {
  const clarity = (window as unknown as Record<string, unknown>).clarity as
    | ((...args: unknown[]) => void)
    | undefined;
  clarity?.("consent");
}

const SERVER_SNAPSHOT: ConsentValue = "granted";

export function CookieConsentBanner() {
  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => SERVER_SNAPSHOT,
  );

  useEffect(() => {
    if (consent === "granted") {
      grantClarityConsent();
    }
  }, [consent]);

  const handleAccept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "granted");
    window.dispatchEvent(new StorageEvent("storage", { key: CONSENT_KEY }));
    grantClarityConsent();
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "declined");
    window.dispatchEvent(new StorageEvent("storage", { key: CONSENT_KEY }));
  }, []);

  // Hide if user has already chosen (or during SSR where snapshot is "granted")
  if (consent !== null) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-xl border border-border/60 bg-card/95 px-6 py-4 shadow-lg backdrop-blur-sm sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          This site uses cookies for analytics.{" "}
          <Link
            href="/privacy"
            className="text-emerald-500 underline decoration-emerald-500/30 underline-offset-2 transition-colors hover:text-emerald-400"
          >
            Privacy Policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={handleDecline}
            className="rounded-lg border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-emerald-500 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
