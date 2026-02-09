import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { VideoForm } from "@/components/videos/video-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VideoDuzenlePage({ params }: PageProps) {
  const { id } = await params;

  const [video, categories] = await Promise.all([
    prisma.video.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        categoryId: true,
        status: true,
        isFeatured: true,
        sortOrder: true,
        thumbnailUrl: true,
      },
    }),
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!video) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/yonetim/videolar"
          className="text-sm text-foreground/50 hover:text-primary mb-2 inline-block"
        >
          ← Videolar
        </Link>
        <h1 className="font-heading text-3xl font-bold text-primary">
          Videoyu Duzenle
        </h1>
        <p className="text-foreground/60 mt-1">
          {video.title}
        </p>
      </div>

      <VideoForm
        categories={categories}
        initial={{
          id: video.id,
          title: video.title,
          description: video.description ?? undefined,
          categoryId: video.categoryId ?? undefined,
          status: video.status,
          isFeatured: video.isFeatured,
          sortOrder: video.sortOrder,
          thumbnailUrl: video.thumbnailUrl ?? undefined,
        }}
        mode="edit"
      />
    </div>
  );
}
