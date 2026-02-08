"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import type { MonthlyActivity } from "@/lib/data/github-types";

interface ActivityChartProps {
  monthlyActivity: MonthlyActivity[];
}

const chartConfig = {
  commits: { label: "Commits", color: "var(--chart-1)" },
  pullRequests: { label: "Pull Requests", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function ActivityChart({ monthlyActivity }: ActivityChartProps) {
  if (monthlyActivity.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No activity data available.
      </p>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart
        data={monthlyActivity}
        margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          className="stroke-border/50"
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          className="text-xs"
        />
        <YAxis tickLine={false} axisLine={false} className="text-xs" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="commits"
          fill="var(--color-commits)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="pullRequests"
          fill="var(--color-pullRequests)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}
