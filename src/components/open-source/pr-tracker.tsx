"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PullRequest } from "@/lib/data/github-types";

interface PrTrackerProps {
  pullRequests: PullRequest[];
}

const statusConfig = {
  open: {
    label: "Open",
    className: "bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 border-emerald-500/30",
  },
  merged: {
    label: "Merged",
    className: "bg-purple-500/20 text-purple-500 dark:text-purple-400 border-purple-500/30",
  },
  closed: {
    label: "Closed",
    className: "bg-red-500/20 text-red-500 dark:text-red-400 border-red-500/30",
  },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function PrTracker({ pullRequests }: PrTrackerProps) {
  if (pullRequests.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No external pull requests to display.
      </p>
    );
  }

  return (
    <motion.div
      className="space-y-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.06 } },
      }}
    >
      {pullRequests.map((pr) => {
        const config = statusConfig[pr.state];
        return (
          <motion.div
            key={pr.url}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <a
              href={pr.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="flex items-center justify-between gap-4 p-4 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors group">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                    {pr.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{pr.repository.nameWithOwner}</span>
                    <span>·</span>
                    <span>{formatDate(pr.createdAt)}</span>
                    {(pr.additions > 0 || pr.deletions > 0) && (
                      <>
                        <span>·</span>
                        <span className="text-emerald-500">
                          +{pr.additions}
                        </span>
                        <span className="text-red-500">-{pr.deletions}</span>
                      </>
                    )}
                  </div>
                </div>
                <Badge
                  className={cn(
                    "shrink-0 inline-flex items-center gap-1.5 border",
                    config.className
                  )}
                >
                  {pr.state === "open" && (
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-current"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                  {config.label}
                </Badge>
              </Card>
            </a>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
