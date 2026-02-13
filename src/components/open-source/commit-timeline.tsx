"use client";

import * as m from "motion/react-m";
import { GitCommit } from "lucide-react";
import type { CommitEvent } from "@/lib/data/github-types";

interface CommitTimelineProps {
  commits: CommitEvent[];
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 30) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
}

export function CommitTimeline({ commits }: CommitTimelineProps) {
  if (commits.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No recent commits to display.
      </p>
    );
  }

  return (
    <m.div
      className="relative space-y-0"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {/* Vertical line */}
      <div className="absolute left-[15px] top-3 bottom-3 w-px bg-border" />

      {commits.map((commit) => (
        <m.div
          key={commit.url}
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative flex items-start gap-4 py-3"
        >
          <div className="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-border bg-background">
            <GitCommit className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <a
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-primary transition-colors line-clamp-1"
            >
              {commit.message}
            </a>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
              <span>{commit.repository.nameWithOwner}</span>
              <span>·</span>
              <span>{timeAgo(commit.committedDate)}</span>
            </div>
          </div>
        </m.div>
      ))}
    </m.div>
  );
}
