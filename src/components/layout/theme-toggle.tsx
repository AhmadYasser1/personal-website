"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";

function subscribe() {
  return () => {};
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const isDark = hydrated ? theme === "dark" : false;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <m.svg
            key="sun"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </m.svg>
        ) : (
          <m.svg
            key="moon"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </m.svg>
        )}
      </AnimatePresence>
    </Button>
  );
}
