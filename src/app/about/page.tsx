import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Ahmed Yasser - dual-degree CS graduate from UMN and EUI, AI researcher, and Digital Fellow at BSE Global.",
};

export default function AboutPage() {
  return <AboutContent />;
}


