import type { Metadata } from "next";
import { env } from "@/env";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ahmad Yasser. Reach out for collaborations, opportunities, or just to say hello.",
};

export default function ContactPage() {
  return <ContactContent turnstileSiteKey={env.TURNSTILE_SITE_KEY} />;
}
