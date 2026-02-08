"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContributionHeatmap } from "./contribution-heatmap";
import { ActivityChart } from "./activity-chart";
import { CommitTimeline } from "./commit-timeline";
import type {
  ContributionDay,
  MonthlyActivity,
  CommitEvent,
} from "@/lib/data/github-types";

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
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="rounded-xl bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="heatmap">Contributions</TabsTrigger>
          <TabsTrigger value="chart">Activity</TabsTrigger>
          <TabsTrigger value="timeline">Commits</TabsTrigger>
        </TabsList>
      </Tabs>

      <AnimatePresence mode="wait">
        <motion.div
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
