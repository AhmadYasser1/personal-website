import type { Metadata } from "next";
import { ExperienceContent } from "./experience-content";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Ahmad Yasser's professional experience including roles at Brooklyn Sports and Entertainment, Cascaid Health, and various tech companies.",
};

export default function ExperiencePage() {
  return <ExperienceContent />;
}
