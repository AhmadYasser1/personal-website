import type { Metadata } from "next";
import { siteUrl } from "@/config/site";
import { PrivacyContent } from "./privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ayasser.com collects, uses, and protects your information.",
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
