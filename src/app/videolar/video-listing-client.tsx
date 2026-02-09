"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Video = {
  id: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  duration: number | null;
  category: { name: string; slug: string } | null;
};

type Category = { id: string; name: string; slug: string };

interface VideoListingClientProps {
  videos: Video[];
  categories: Category[];
  currentCategorySlug: string | null;
}

function formatDuration(minutes: number | null): string {
  if (minutes == null) return "";
  const m = minutes % 60;
  const h = Math.floor(minutes / 60);
  if (h > 0) return `${h}s ${m}dk`;
  return `${m} dk`;
}

export function VideoListingClient({
  videos,
  categories,
  currentCategorySlug,
}: VideoListingClientProps) {
  return (
    <div className="space-y-8">
      {categories.length > 0 && (
        <ScrollReveal variant="fadeUp">
          <div className="rounded-2xl border border-lavender/20 bg-white/80 backdrop-blur-sm p-5 shadow-sm space-y-5">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
              <Link
                href="/videolar"
                className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  !currentCategorySlug
                    ? "bg-lavender text-primary shadow-sm"
                    : "border border-lavender/30 text-foreground/60 hover:bg-lavender/10 hover:text-primary"
                }`}
              >
                Tumunu Gor
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/videolar?kategori=${cat.slug}`}
                  className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    currentCategorySlug === cat.slug
                      ? "bg-lavender text-primary shadow-sm"
                      : "border border-lavender/30 text-foreground/60 hover:bg-lavender/10 hover:text-primary"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      <p className="text-sm text-foreground/40">
        {videos.length} video bulundu
      </p>

      {videos.length === 0 ? (
        <div className="rounded-2xl border border-lavender/20 bg-white/50 p-12 text-center">
          <p className="text-foreground/50">Bu kategoride henuz video yok.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Link key={video.id} href={`/videolar/${video.id}`}>
              <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-lavender/20">
                  {video.thumbnailUrl ? (
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-primary/30"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                  {video.duration != null && (
                    <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                      {formatDuration(video.duration)}
                    </span>
                  )}
                </div>
                <CardContent className="p-4">
                  {video.category && (
                    <Badge variant="default" className="mb-2">
                      {video.category.name}
                    </Badge>
                  )}
                  <h3 className="font-heading font-semibold text-primary line-clamp-2">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="mt-1 text-sm text-foreground/50 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
