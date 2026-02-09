import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const video = await prisma.video.findFirst({
    where: { id, status: "PUBLISHED" },
    select: { title: true, description: true, thumbnailUrl: true },
  });
  if (!video) return { title: "Video bulunamadi | Mega Reform" };
  return {
    title: `${video.title} | Videolar`,
    description: video.description ?? undefined,
    openGraph: {
      title: video.title,
      description: video.description ?? undefined,
      images: video.thumbnailUrl ? [video.thumbnailUrl] : undefined,
      type: "video.other",
    },
  };
}

export default async function VideoDetailPage({ params }: PageProps) {
  const { id } = await params;

  const video = await prisma.video.findFirst({
    where: { id, status: "PUBLISHED" },
    include: { category: { select: { name: true, slug: true } } },
  });

  if (!video) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-light/30 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/videolar"
            className="mb-6 inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-primary"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Videolar
          </Link>

          <div className="rounded-2xl overflow-hidden border border-lavender/20 bg-white shadow-lg">
            <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-lavender/20">
              {video.thumbnailUrl ? (
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-20 h-20 text-primary/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="p-6 md:p-8">
              {video.category && (
                <Badge variant="default" className="mb-3">
                  {video.category.name}
                </Badge>
              )}
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary">
                {video.title}
              </h1>
              {video.description && (
                <p className="mt-4 text-foreground/70 whitespace-pre-line leading-relaxed">
                  {video.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
