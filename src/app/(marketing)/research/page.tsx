import type { Metadata } from "next";
import { ResearchContent } from "./research-content";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Ahmad Yasser's research publications, academic work, and contributions to HCI including CHI 2025 and The Arabic Pile dataset.",
};

export default function ResearchPage() {
  return <ResearchContent />;
}
