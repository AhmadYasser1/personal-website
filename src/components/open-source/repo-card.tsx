"use client";

import * as m from "motion/react-m";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star, GitFork, ExternalLink } from "lucide-react";
import type { GitHubRepo } from "@/lib/data/github-types";

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <m.div
      whileHover={{
        y: -5,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="h-full"
    >
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <Card className="h-full group cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/5">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="font-heading text-base group-hover:text-emerald-500 transition-colors line-clamp-1">
                {repo.name}
              </CardTitle>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-emerald-500 transition-all" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
              {repo.description || "No description available"}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {repo.primaryLanguage && (
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-3 w-3 rounded-full shrink-0"
                    style={{ backgroundColor: repo.primaryLanguage.color }}
                  />
                  {repo.primaryLanguage.name}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5" />
                {repo.stargazerCount}
              </span>
              {repo.forkCount > 0 && (
                <span className="flex items-center gap-1">
                  <GitFork className="h-3.5 w-3.5" />
                  {repo.forkCount}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </a>
    </m.div>
  );
}
