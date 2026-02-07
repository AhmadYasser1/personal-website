const DEFAULT_SITE_URL = "https://ahmad-yasser-hassanein.vercel.app";

export const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/$/, "");
