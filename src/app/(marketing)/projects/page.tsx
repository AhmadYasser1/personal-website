import type { Metadata } from "next";
import { ProjectsContent } from "./projects-content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Ahmad Yasser's projects in AI, machine learning, data analysis, and software development.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
