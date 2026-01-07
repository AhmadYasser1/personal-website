import type { Metadata } from "next";
import { ResearchContent } from "./research-content";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Ahmed Yasser's research publications, academic work, and contributions to AI and NLP including CHI 2025 and The Arabic Pile dataset.",
};

export default function ResearchPage() {
  return <ResearchContent />;
}


