import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils/slug";
import { getGuideFocus, getGuideViewpoint } from "./profiles";

export type ExpertListingItem = {
  slug: string;
  name: string;
  focus: string | null;
  viewpoint: string | null;
  contentCount: number;
  topTags: string[];
};

const MIN_EXPERTS = 4;
const MAX_EXPERTS = 12;

/**
 * Builds expert list from ExpertProfile + article/course counts. Sorted by contentCount desc.
 */
export async function getExpertsForListing(): Promise<ExpertListingItem[]> {
  const expertProfiles = await prisma.expertProfile.findMany({
    where: { isActive: true },
    select: {
      slug: true,
      title: true,
      user: { select: { name: true } },
    },
  });

  const countBySlug = await getArticleCourseCountByExpert();
  const result: ExpertListingItem[] = [];

  for (const ep of expertProfiles) {
    const count = countBySlug.get(ep.slug) ?? 0;
    const name = ep.user.name?.trim() ?? "Rehber";
    result.push({
      slug: ep.slug,
      name,
      focus: ep.title ?? getGuideFocus(name) ?? null,
      viewpoint: getGuideViewpoint(name),
      contentCount: count,
      topTags: [],
    });
  }

  result.sort((a, b) => b.contentCount - a.contentCount);
  const slice = result.slice(0, MAX_EXPERTS);
  if (slice.length >= MIN_EXPERTS) return slice;
  return result.slice(0, Math.max(MIN_EXPERTS, result.length));
}

async function getArticleCourseCountByExpert(): Promise<Map<string, number>> {
  const [articles, courses, expertIds] = await Promise.all([
    prisma.article.groupBy({
      by: ["expertId"],
      where: { status: "PUBLISHED" },
      _count: { id: true },
    }),
    prisma.course.groupBy({
      by: ["expertId"],
      where: { status: "PUBLISHED" },
      _count: { id: true },
    }),
    prisma.expertProfile.findMany({
      where: { isActive: true },
      select: { id: true, slug: true },
    }),
  ]);

  const slugById = new Map(expertIds.map((e) => [e.id, e.slug]));
  const articleCount = new Map(articles.map((a) => [a.expertId, a._count.id]));
  const courseCount = new Map(courses.map((c) => [c.expertId, c._count.id]));
  const result = new Map<string, number>();
  for (const { id, slug } of expertIds) {
    const total = (articleCount.get(id) ?? 0) + (courseCount.get(id) ?? 0);
    if (total > 0) result.set(slug, total);
  }
  return result;
}
