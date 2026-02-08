const DEFAULT_SITE_URL = "https://ahmad-yasser-hassanein.vercel.app";

export const siteConfig = {
  name: "Ahmad Yasser",
  description:
    "Dual-degree CS graduate from University of Minnesota-Twin Cities. Digital Fellow at Brooklyn Sports and Entertainment. HCI Researcher with 2+ publications.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(
    /\/$/,
    ""
  ),
  author: {
    name: "Ahmad Yasser Hassanein",
    email: "ahmadyasser03@outlook.com",
  },
  links: {
    github: "https://github.com/ahmadyasser01",
    linkedin: "https://linkedin.com/in/ahmad-yasser-hassanein",
  },
} as const;

export const siteUrl = siteConfig.url;
