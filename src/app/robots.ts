import type { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://megareform.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/panel", "/uzman", "/yonetim", "/api/"] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
