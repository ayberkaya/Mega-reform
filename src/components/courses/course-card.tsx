"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { formatCurrency, formatDuration } from "@/lib/utils/format";

interface CourseCardProps {
  slug: string;
  title: string;
  description?: string | null;
  coverImage?: string | null;
  price?: number | null;
  isFree?: boolean;
  level?: string | null;
  lessonCount: number;
  duration?: number | null;
  enrollmentCount: number;
  rating?: number;
  expert?: { name: string; slug: string; image?: string | null } | null;
  category?: { name: string; slug: string; color?: string | null } | null;
  isFeatured?: boolean;
}

const levelConfig: Record<string, { label: string; variant: "sage" | "gold" | "primary" }> = {
  Baslangic: { label: "Baslangic", variant: "sage" },
  Orta: { label: "Orta", variant: "gold" },
  Ileri: { label: "Ileri", variant: "primary" },
};

export function CourseCard({
  slug,
  title,
  description,
  coverImage,
  price,
  isFree,
  level,
  lessonCount,
  duration,
  enrollmentCount,
  rating,
  expert,
  category,
  isFeatured,
}: CourseCardProps) {
  const levelInfo = level ? levelConfig[level] : null;

  return (
    <Link href={`/kurslar/${slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden">
        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: category?.color
                  ? `linear-gradient(135deg, ${category.color}40, ${category.color}10)`
                  : "linear-gradient(135deg, #D3D3FF40, #9DC18320)",
              }}
            />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Level badge - top left */}
          {levelInfo && (
            <div className="absolute top-3 left-3">
              <Badge variant={levelInfo.variant} className="text-[11px] shadow-sm">
                {levelInfo.label}
              </Badge>
            </div>
          )}

          {/* Price badge - top right */}
          <div className="absolute top-3 right-3">
            {isFree ? (
              <Badge variant="sage" className="text-[11px] font-semibold shadow-sm">
                Ucretsiz
              </Badge>
            ) : price != null ? (
              <Badge variant="gold" className="text-[11px] font-semibold shadow-sm">
                {formatCurrency(price)}
              </Badge>
            ) : null}
          </div>

          {/* Featured indicator */}
          {isFeatured && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="cream" className="text-[11px] shadow-sm">
                <svg
                  className="h-3 w-3 mr-1 text-gold fill-gold"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
                One Cikan
              </Badge>
            </div>
          )}

          {/* Rating - bottom right */}
          {rating != null && rating > 0 && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5">
              <svg
                className="h-3 w-3 text-gold fill-gold"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
              <span className="text-[11px] font-medium text-white">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="flex flex-col gap-3">
          {/* Category */}
          {category && (
            <div>
              <span
                className="text-xs font-medium"
                style={{ color: category.color ?? "#9DC183" }}
              >
                {category.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-heading text-lg font-bold text-primary line-clamp-2 group-hover:text-primary-light transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-sm text-foreground/60 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}

          {/* Footer stats */}
          <div className="flex items-center flex-wrap gap-3 text-xs text-foreground/50 mt-auto pt-3 border-t border-lavender/15">
            {/* Lesson count */}
            <div className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 19.5A2.5 2.5 0 016.5 17H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{lessonCount} ders</span>
            </div>

            {/* Duration */}
            {duration != null && duration > 0 && (
              <div className="flex items-center gap-1">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M12 6v6l4 2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{formatDuration(duration)}</span>
              </div>
            )}

            {/* Enrollment count */}
            <div className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{enrollmentCount.toLocaleString("tr-TR")} katilimci</span>
            </div>
          </div>

          {/* Expert info */}
          {expert && (
            <div className="flex items-center gap-2 pt-2">
              <Avatar src={expert.image} alt={expert.name} size="sm" />
              <span className="text-xs font-medium text-foreground/70">{expert.name}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
