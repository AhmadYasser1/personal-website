"use client";

import { motion } from "motion/react";
import { RepoCard } from "./repo-card";
import type { GitHubRepo } from "@/lib/data/github-types";

interface RepoGridProps {
  repos: GitHubRepo[];
}

export function RepoGrid({ repos }: RepoGridProps) {
  if (repos.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No repositories to display.
      </p>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {repos.map((repo) => (
        <motion.div
          key={repo.name}
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full"
        >
          <RepoCard repo={repo} />
        </motion.div>
      ))}
    </motion.div>
  );
}
