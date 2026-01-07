import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ahmed Yasser. Reach out for collaborations, opportunities, or just to say hello.",
};

export default function ContactPage() {
  return <ContactContent />;
}


