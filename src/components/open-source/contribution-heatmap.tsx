"use client";

import { useSyncExternalStore } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ContributionDay } from "@/lib/data/github-types";

interface ContributionHeatmapProps {
  days: ContributionDay[];
}

function subscribe() {
  return () => {};
}

const calendarTheme = {
  dark: [
    "oklch(0.269 0 0)",
    "oklch(0.4 0.15 264)",
    "oklch(0.5 0.2 264)",
    "oklch(0.6 0.24 264)",
    "oklch(0.75 0.24 264)",
  ] as [string, string, string, string, string],
  light: [
    "oklch(0.95 0 0)",
    "oklch(0.85 0.08 150)",
    "oklch(0.73 0.14 150)",
    "oklch(0.6 0.18 150)",
    "oklch(0.45 0.16 150)",
  ] as [string, string, string, string, string],
};

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ContributionHeatmap({ days }: ContributionHeatmapProps) {
  const { resolvedTheme } = useTheme();
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (days.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No contribution data available.
      </p>
    );
  }

  if (!hydrated) {
    return <div className="h-32 animate-pulse rounded-lg bg-muted" />;
  }

  const colorScheme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <div
      aria-label={`GitHub contribution calendar showing ${days.reduce((s, d) => s + d.count, 0)} contributions`}
    >
      <TooltipProvider>
        <ActivityCalendar
          data={days}
          theme={calendarTheme}
          colorScheme={colorScheme}
          blockSize={13}
          blockMargin={4}
          blockRadius={3}
          fontSize={13}
          showWeekdayLabels={["mon", "wed", "fri"]}
          renderBlock={(block, activity) => (
            <Tooltip key={activity.date}>
              <TooltipTrigger asChild>{block}</TooltipTrigger>
              <TooltipContent>
                <span className="font-medium">
                  {activity.count} contribution{activity.count !== 1 ? "s" : ""}
                </span>{" "}
                on {formatDate(activity.date)}
              </TooltipContent>
            </Tooltip>
          )}
        />
      </TooltipProvider>

      {/* Screen reader accessible table */}
      <details className="sr-only">
        <summary>View contribution data as table</summary>
        <table>
          <caption>Monthly contribution summary</caption>
          <thead>
            <tr>
              <th>Date</th>
              <th>Contributions</th>
            </tr>
          </thead>
          <tbody>
            {days
              .filter((d) => d.count > 0)
              .slice(-30)
              .map((day) => (
                <tr key={day.date}>
                  <td>{day.date}</td>
                  <td>{day.count}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
