"use client";

import Link from "next/link";
import { socialLinks } from "@/lib/data/research";
import { MagneticElement } from "@/components/ui/magnetic-element";

const socialIcons = [
  {
    href: socialLinks.twitter,
    label: "Twitter",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: socialLinks.linkedin,
    label: "LinkedIn",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    href: socialLinks.medium,
    label: "Medium",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link
              href="/"
              className="font-heading text-lg font-bold tracking-tight"
            >
              <span className="text-foreground">Ahmad Yasser</span>
              <span className="text-emerald-500 animate-dot-pulse">.</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Human-Computer Interaction Researcher | Digital Fellow at Brooklyn
              Sports and Entertainment
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialIcons.map((social) => (
              <MagneticElement key={social.label} strength={0.4}>
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-all duration-200 hover:text-emerald-500 hover:-translate-y-0.5 hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              </MagneticElement>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <Link
            href="/privacy"
            className="transition-colors hover:text-emerald-500"
          >
            Privacy Policy
          </Link>
          <span className="text-border">&middot;</span>
          <Link
            href="/terms"
            className="transition-colors hover:text-emerald-500"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
