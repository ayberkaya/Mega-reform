import { prisma } from "@/lib/prisma";

export type RehberPageExpert = {
  slug: string;
  name: string;
  title: string;
  profileImage: string | null;
  coverImage: string | null;
  viewpoint: string | null;
  focus: string | null;
  signaturePractice: string | null;
  suitableFor: string[];
  notSuitableFor: string[];
  isVerified: boolean;
  rating: number;
  reviewCount: number;
};

export type RehberArticle = {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  readTime: number | null;
  membersOnly: boolean;
};

export type RehberCourse = {
  slug: string;
  title: string;
  description: string | null;
  coverImage: string | null;
  lessonCount: number;
  requiresSubscription: boolean;
};

export type RehberContentItem = {
  id: string;
  title?: string;
  guideName?: string | null;
  [key: string]: unknown;
};

export type RehberPageData = {
  expert: RehberPageExpert;
  articles: RehberArticle[];
  courses: RehberCourse[];
  contentItems?: RehberContentItem[];
};

export async function getRehberPageData(slug: string): Promise<RehberPageData | null> {
  const expert = await prisma.expertProfile.findFirst({
    where: { slug, isActive: true },
    select: {
      slug: true,
      title: true,
      profileImage: true,
      coverImage: true,
      isVerified: true,
      rating: true,
      reviewCount: true,
      user: { select: { name: true } },
      id: true,
    },
  });

  if (!expert) return null;

  const [articles, courses] = await Promise.all([
    prisma.article.findMany({
      where: { expertId: expert.id, status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        readTime: true,
        tags: true,
      },
    }),
    prisma.course.findMany({
      where: { expertId: expert.id, status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      select: {
        slug: true,
        title: true,
        description: true,
        coverImage: true,
        lessonCount: true,
        requiresSubscription: true,
      },
    }),
  ]);

  return {
    expert: {
      slug: expert.slug,
      name: expert.user.name ?? "Rehber",
      title: expert.title,
      profileImage: expert.profileImage,
      coverImage: expert.coverImage,
      viewpoint: null,
      focus: null,
      signaturePractice: null,
      suitableFor: [],
      notSuitableFor: [],
      isVerified: expert.isVerified,
      rating: expert.rating,
      reviewCount: expert.reviewCount,
    },
    articles: articles.map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      coverImage: a.coverImage,
      readTime: a.readTime,
      membersOnly: a.tags.includes("premium"),
    })),
    courses: courses.map((c) => ({
      slug: c.slug,
      title: c.title,
      description: c.description,
      coverImage: c.coverImage,
      lessonCount: c.lessonCount,
      requiresSubscription: c.requiresSubscription,
    })),
  };
}
