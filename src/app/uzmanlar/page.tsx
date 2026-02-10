import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ExpertListingClient } from "@/components/experts/expert-listing-client";
import { DEMO_EXPERTS } from "@/data/demo-experts";

export const revalidate = 3600; // 1 hr
export const metadata: Metadata = {
  title: "Uzmanlarımız | Mega Reform",
  description:
    "Alanında deneyimli, güvenilir rehberlerle tanışın. Meditasyon, yoga, tarot ve ruhsal gelişim uzmanlarımızı keşfedin.",
};

const DEMO_CATEGORIES = [
  { name: "Meditasyon", slug: "meditasyon" },
  { name: "Yoga", slug: "yoga" },
  { name: "Tarot", slug: "tarot" },
  { name: "Ruhsal Gelisim", slug: "ruhsal-gelisim" },
  { name: "Nefes Teknikleri", slug: "nefes-teknikleri" },
  { name: "Mindfulness", slug: "mindfulness" },
];

async function getExperts() {
  try {
    const experts = await prisma.expertProfile.findMany({
      where: { isActive: true },
      orderBy: { rating: "desc" },
      include: {
        user: { select: { name: true, image: true } },
      },
    });

    if (experts.length === 0) {
      return {
        experts: DEMO_EXPERTS.map((e) => ({
          slug: e.slug,
          name: e.name,
          title: e.title,
          specialties: e.specialties,
          rating: e.rating,
          reviewCount: e.reviewCount,
          bio: e.bio,
          isVerified: e.isVerified,
          yearsExperience: e.yearsExperience,
          image: e.image,
        })),
        isDemo: true,
      };
    }

    return {
      experts: experts.map((e) => ({
        slug: e.slug,
        name: e.user.name ?? "Uzman",
        title: e.title,
        specialties: e.specialties as string[],
        rating: e.rating ?? 0,
        reviewCount: e.reviewCount ?? 0,
        bio: e.longBio ?? "",
        isVerified: e.isVerified,
        yearsExperience: e.yearsExperience ?? 0,
        image: e.profileImage ?? e.user.image,
      })),
      isDemo: false,
    };
  } catch {
    return {
      experts: DEMO_EXPERTS.map((e) => ({
        slug: e.slug,
        name: e.name,
        title: e.title,
        specialties: e.specialties,
        rating: e.rating,
        reviewCount: e.reviewCount,
        bio: e.bio,
        isVerified: e.isVerified,
        yearsExperience: e.yearsExperience,
        image: e.image,
      })),
      isDemo: true,
    };
  }
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    if (categories.length === 0) {
      return DEMO_CATEGORIES;
    }

    return categories.map((c) => ({
      name: c.name,
      slug: c.slug,
    }));
  } catch {
    return DEMO_CATEGORIES;
  }
}

export default async function UzmanlarPage() {
  const [{ experts }, categories] = await Promise.all([
    getExperts(),
    getCategories(),
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-cream/40 via-white to-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light pb-16 pt-28 md:pt-36 md:pb-24">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-lavender/10 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-gold/10 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Ana sayfaya don
            </Link>
            <div className="text-center">
              <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4">
                Uzmanlarimiz
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-white/60 md:text-xl">
                Alaninda deneyimli, guvenilir rehberlerle tanisin
              </p>
            </div>
          </div>
        </section>

        {/* Expert Listing */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-20">
          <ExpertListingClient experts={experts} categories={categories} />
        </section>
      </main>
      <Footer />
    </>
  );
}
