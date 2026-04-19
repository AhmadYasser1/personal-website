import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Ahmad Yasser - dual-degree CS graduate from UMN, Human-Computer Interaction researcher, and Chief of Staff at QuantHub.",
};

export default function AboutPage() {
  return <AboutContent />;
}
