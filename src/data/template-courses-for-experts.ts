/**
 * Template courses shown on expert profile when DB has no courses.
 * Each course is tied to an expert slug; course slug matches /kurslar/[slug].
 */

export interface TemplateCourseForExpert {
  id: string;
  expertSlug: string;
  title: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  lessonCount: number;
  level: string | null;
  enrollmentCount: number;
}

export const TEMPLATE_COURSES_FOR_EXPERTS: TemplateCourseForExpert[] = [
  {
    id: "template-meditasyona-giris",
    expertSlug: "ayse-nur-yilmaz",
    title: "Meditasyona Giriş: 21 Günlük Program",
    slug: "meditasyona-giris",
    description:
      "Meditasyonu hayatınızın bir parçası haline getirmek için adım adım ilerleyeceğiniz kapsamlı bir program.",
    coverImage: null,
    lessonCount: 21,
    level: "Başlangıç",
    enrollmentCount: 1247,
  },
  {
    id: "template-hatha-yoga-temelleri",
    expertSlug: "mehmet-can-demir",
    title: "Hatha Yoga Temelleri",
    slug: "hatha-yoga-temelleri",
    description:
      "Yoga pratiğinizi güvenli ve doğru bir şekilde başlatırsanız. Temel asanalar ve nefes teknikleri.",
    coverImage: null,
    lessonCount: 16,
    level: "Başlangıç",
    enrollmentCount: 856,
  },
  {
    id: "template-tarot-okuma-sanati",
    expertSlug: "elif-sena-kara",
    title: "Tarot Okuma Sanati",
    slug: "tarot-okuma-sanati",
    description:
      "Tarot kartlarının dilini öğrenin ve kendi okumalarınızı yapmaya başlayın.",
    coverImage: null,
    lessonCount: 12,
    level: "Orta",
    enrollmentCount: 432,
  },
  {
    id: "template-ruhsal-farkindalik",
    expertSlug: "ahmet-baris-ozturk",
    title: "Ruhsal Farkındalık ve İç Yolculuk",
    slug: "ruhsal-farkindalik",
    description:
      "Kendinizi derinlemesine keşfetmeniz için hazırlanmış kapsamlı bir ruhsal gelişim programı.",
    coverImage: null,
    lessonCount: 24,
    level: "Ileri",
    enrollmentCount: 318,
  },
];

export function getTemplateCoursesForExpert(expertSlug: string): TemplateCourseForExpert[] {
  return TEMPLATE_COURSES_FOR_EXPERTS.filter((c) => c.expertSlug === expertSlug);
}

/** Map template course to ExpertProfileTabs courses shape (id, title, slug, ...). */
export function mapTemplateCoursesToTabShape(
  items: TemplateCourseForExpert[]
): Array<{
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  lessonCount: number;
  level: string | null;
  enrollmentCount: number;
}> {
  return items.map((c) => ({
    id: c.id,
    title: c.title,
    slug: c.slug,
    description: c.description,
    coverImage: c.coverImage,
    lessonCount: c.lessonCount,
    level: c.level,
    enrollmentCount: c.enrollmentCount,
  }));
}
