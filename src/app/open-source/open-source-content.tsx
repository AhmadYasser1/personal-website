"use client";

import * as m from "motion/react-m";
import { MotionConfig } from "motion/react";
import { StatsOverview } from "@/components/open-source/stats-overview";
import { RepoGrid } from "@/components/open-source/repo-grid";
import { PrTracker } from "@/components/open-source/pr-tracker";
import { ActivityTabs } from "@/components/open-source/activity-tabs";
import { GlassmorphismContainer } from "@/components/open-source/glassmorphism-container";
import type { OpenSourcePageData } from "@/lib/data/github-types";

interface OpenSourceContentProps {
  data: OpenSourcePageData;
}

export function OpenSourceContent({ data }: OpenSourceContentProps) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-4 max-w-6xl space-y-16">
          {/* Header */}
          <m.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <m.h1
              className="font-heading text-4xl sm:text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Open Source<span className="text-emerald-500">.</span>
            </m.h1>
            <m.p
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Contributions, projects, and activity across the open source
              ecosystem
            </m.p>
          </m.div>

          {/* Section Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

          {/* Stats Overview */}
          <section aria-label="GitHub statistics">
            <StatsOverview stats={data.stats} />
          </section>

          {/* Activity Dashboard — right after stats */}
          <section aria-label="Contribution activity dashboard">
            <m.h2
              className="font-heading text-2xl sm:text-3xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Activity<span className="text-emerald-500">.</span>
            </m.h2>
            <GlassmorphismContainer>
              <ActivityTabs
                contributionDays={data.contributionDays}
                monthlyActivity={data.monthlyActivity}
                recentCommits={data.recentCommits}
              />
            </GlassmorphismContainer>
          </section>

          {/* Forked Repositories — external contributions */}
          {data.repos.length > 0 && (
            <section aria-label="Contributed repositories">
              <m.h2
                className="font-heading text-2xl sm:text-3xl font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Contributed Repositories
                <span className="text-emerald-500">.</span>
              </m.h2>
              <RepoGrid repos={data.repos} />
            </section>
          )}

          {/* Pull Requests */}
          {data.pullRequests.length > 0 && (
            <section aria-label="External pull requests">
              <m.h2
                className="font-heading text-2xl sm:text-3xl font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Pull Requests<span className="text-emerald-500">.</span>
              </m.h2>
              <PrTracker pullRequests={data.pullRequests} />
            </section>
          )}
        </div>
      </div>
    </MotionConfig>
  );
}
