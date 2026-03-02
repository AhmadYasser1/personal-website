"use client";

import * as m from "motion/react-m";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { GitCommit, GitPullRequest, FolderGit2, Activity } from "lucide-react";
import type { GitHubStats } from "@/lib/data/github-types";

interface StatsOverviewProps {
  stats: GitHubStats;
}

const statItems = [
  {
    key: "totalContributions" as const,
    label: "Contributions",
    icon: Activity,
  },
  {
    key: "totalCommits" as const,
    label: "Commits",
    icon: GitCommit,
  },
  {
    key: "totalPRs" as const,
    label: "External PRs",
    icon: GitPullRequest,
  },
  {
    key: "totalRepos" as const,
    label: "Contributed Repos",
    icon: FolderGit2,
  },
];

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <m.div
      className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <m.div
            key={item.key}
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm text-center">
              <CardContent className="flex flex-col items-center gap-2 p-4">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <AnimatedCounter
                  value={stats[item.key]}
                  className="text-2xl font-heading font-bold tabular-nums"
                />
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          </m.div>
        );
      })}
    </m.div>
  );
}
