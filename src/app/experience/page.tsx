import type { Metadata } from "next";
import { ExperienceContent } from "./experience-content";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Ahmed Yasser's professional experience including roles at BSE Global, Cascaid Health, and various tech companies.",
};

export default function ExperiencePage() {
  return <ExperienceContent />;
}


