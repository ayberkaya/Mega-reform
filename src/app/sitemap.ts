import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://megareform.com";

const staticPages: MetadataRoute.Sitemap = [
  { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
  { url: `${baseUrl}/uzmanlar`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  { url: `${baseUrl}/makaleler`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  { url: `${baseUrl}/kurslar`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  { url: `${baseUrl}/videolar`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [experts, articles, courses, videos] = await Promise.all([
      prisma.expertProfile.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.article.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.course.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.video.findMany({
        where: { status: "PUBLISHED" },
        select: { id: true, updatedAt: true },
      }),
    ]);

    const expertUrls: MetadataRoute.Sitemap = experts.map((e) => ({
      url: `${baseUrl}/uzmanlar/${e.slug}`,
      lastModified: e.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    const articleUrls: MetadataRoute.Sitemap = articles.map((a) => ({
      url: `${baseUrl}/makaleler/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
    const courseUrls: MetadataRoute.Sitemap = courses.map((c) => ({
      url: `${baseUrl}/kurslar/${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
    const videoUrls: MetadataRoute.Sitemap = videos.map((v) => ({
      url: `${baseUrl}/videolar/${v.id}`,
      lastModified: v.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [
      ...staticPages,
      ...expertUrls,
      ...articleUrls,
      ...courseUrls,
      ...videoUrls,
    ];
  } catch {
    return staticPages;
  }
}
