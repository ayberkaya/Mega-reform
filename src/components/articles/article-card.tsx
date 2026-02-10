"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { formatDateShort } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt?: string | null;
  coverImage?: string | null;
  publishedAt?: Date | string | null;
  category?: { name: string; slug: string; color?: string | null } | null;
  expert?: { name: string; slug: string; image?: string | null } | null;
  isFeatured?: boolean;
}

export function ArticleCard({
  slug,
  title,
  excerpt,
  coverImage,
  publishedAt,
  category,
  expert,
  isFeatured,
}: ArticleCardProps) {
  return (
    <Link href={`/makaleler/${slug}`} className="group block h-full">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white/80 backdrop-blur-sm shadow-sm transition-shadow duration-300 group-hover:shadow-xl",
          isFeatured
            ? "border-gold/40 ring-1 ring-gold/20"
            : "border-lavender/20"
        )}
      >
        {/* Image area */}
        <div className="relative aspect-video overflow-hidden">
          {coverImage ? (
            <>
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </>
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: category?.color
                  ? `linear-gradient(135deg, ${category.color}30, ${category.color}10)`
                  : "linear-gradient(135deg, rgba(211,211,255,0.3), rgba(211,211,255,0.1))",
              }}
            >
              <svg
                className="h-12 w-12 opacity-30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {/* Category badge */}
          {category && (
            <div className="absolute left-3 top-3">
              <Badge
                style={{
                  backgroundColor: category.color
                    ? `${category.color}25`
                    : undefined,
                  color: category.color ?? undefined,
                  backdropFilter: "blur(8px)",
                }}
                className="shadow-sm"
              >
                {category.name}
              </Badge>
            </div>
          )}

          {/* Featured accent */}
          {isFeatured && (
            <div className="absolute right-3 top-3">
              <Badge variant="gold" className="shadow-sm">
                Öne Çıkan
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-heading text-lg font-bold leading-snug text-primary line-clamp-2 mb-2 group-hover:text-primary-light transition-colors duration-300">
            {title}
          </h3>

          {excerpt && (
            <p className="text-sm leading-relaxed text-foreground/60 line-clamp-2 mb-4">
              {excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-lavender/10">
            {expert && (
              <div className="flex items-center gap-2 min-w-0">
                <Avatar src={expert.image} alt={expert.name} size="sm" />
                <span className="truncate text-xs font-medium text-foreground/70">
                  {expert.name}
                </span>
              </div>
            )}

            <div className="flex shrink-0 items-center gap-3 text-xs text-foreground/40">
              {publishedAt && (
                <span>{formatDateShort(publishedAt)}</span>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
