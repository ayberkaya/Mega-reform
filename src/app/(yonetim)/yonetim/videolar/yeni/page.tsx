import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { VideoForm } from "@/components/videos/video-form";

export default async function YeniVideoPage() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    select: { id: true, name: true },
  });

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
          Yeni Video
        </h1>
        <p className="text-foreground/60 mt-1">
          Yayinlanacak videoyu ekleyin. Mux entegrasyonu ile ileride yukleme desteklenecek.
        </p>
      </div>

      <VideoForm categories={categories} mode="create" />
    </div>
  );
}
