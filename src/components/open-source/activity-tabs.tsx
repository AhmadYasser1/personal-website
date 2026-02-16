"use client";

import { useState, startTransition } from "react";
import dynamic from "next/dynamic";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommitTimeline } from "./commit-timeline";
import type {
  ContributionDay,
  MonthlyActivity,
  CommitEvent,
} from "@/lib/data/github-types";

const ContributionHeatmap = dynamic(
  () =>
    import("./contribution-heatmap").then((mod) => ({
      default: mod.ContributionHeatmap,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-32 animate-pulse rounded-lg bg-muted" />
    ),
  }
);

const ActivityChart = dynamic(
  () =>
    import("./activity-chart").then((mod) => ({
      default: mod.ActivityChart,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] w-full animate-pulse rounded-lg bg-muted" />
    ),
  }
);

interface ActivityTabsProps {
  contributionDays: ContributionDay[];
  monthlyActivity: MonthlyActivity[];
  recentCommits: CommitEvent[];
}

export function ActivityTabs({
  contributionDays,
  monthlyActivity,
  recentCommits,
}: ActivityTabsProps) {
  const [activeTab, setActiveTab] = useState("heatmap");

  return (
    <div>
      <Tabs value={activeTab} onValueChange={(value) => startTransition(() => setActiveTab(value))}>
        <TabsList className="rounded-xl bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="heatmap">Contributions</TabsTrigger>
          <TabsTrigger value="chart">Activity</TabsTrigger>
          <TabsTrigger value="timeline">Commits</TabsTrigger>
        </TabsList>
      </Tabs>

      <AnimatePresence mode="wait">
        <m.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-6"
        >
          {activeTab === "heatmap" && (
            <ContributionHeatmap days={contributionDays} />
          )}
          {activeTab === "chart" && (
            <ActivityChart monthlyActivity={monthlyActivity} />
          )}
          {activeTab === "timeline" && (
            <CommitTimeline commits={recentCommits} />
          )}
        </m.div>
      </AnimatePresence>
    </div>
  );
}
