import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";
import { VideoListingClient } from "./video-listing-client";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Videolar",
  description:
    "Meditasyon, yoga ve ruhsal gelisim videolari. Uzman rehberlerimizin iceriklerini izleyin.",
  openGraph: { title: "Videolar | Mega Reform", description: "Ruhsal gelisim videolari." },
};

async function getVideos(categorySlug?: string | null) {
  const where: { status: "PUBLISHED"; category?: { slug: string } } = {
    status: "PUBLISHED",
  };
  if (categorySlug) {
    where.category = { slug: categorySlug };
  }

  return prisma.video.findMany({
    where,
    orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
    select: {
      id: true,
      title: true,
      description: true,
      thumbnailUrl: true,
      duration: true,
      category: { select: { name: true, slug: true } },
    },
  });
}

async function getCategories() {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    select: { id: true, name: true, slug: true },
  });
}

interface PageProps {
  searchParams: Promise<{ kategori?: string }>;
}

export default async function VideolarPage({ searchParams }: PageProps) {
  const { kategori } = await searchParams;
  const [videos, categories] = await Promise.all([
    getVideos(kategori || null),
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
                Videolar
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-white/60 md:text-xl">
                Meditasyon, yoga ve ruhsal gelisim videolari
              </p>
            </div>
          </div>
        </section>

        {/* Video Listing */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-20">
          <VideoListingClient
            videos={videos}
            categories={categories}
            currentCategorySlug={kategori ?? null}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
