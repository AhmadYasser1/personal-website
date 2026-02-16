import type { Metadata } from "next";
import { siteUrl } from "@/config/site";
import { TermsContent } from "./terms-content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using ayasser.com.",
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
