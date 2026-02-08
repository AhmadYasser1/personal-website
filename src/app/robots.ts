import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";
  return {
    rules: {
      userAgent: "*",
      ...(isProduction ? { allow: "/" } : { disallow: "/" }),
    },
    ...(isProduction && { sitemap: `${siteUrl}/sitemap.xml` }),
  };
}
