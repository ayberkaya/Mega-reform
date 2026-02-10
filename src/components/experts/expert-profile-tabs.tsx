"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { StarRating } from "@/components/ui/star-rating";
import { CommentForm } from "@/components/comments/comment-form";
import { formatDate, formatReadTime } from "@/lib/utils/format";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface ExpertProfileTabsProps {
  aboutContent?: string | null;
  articles: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    coverImage?: string | null;
    readTime?: number | null;
    publishedAt?: Date | null;
  }>;
  courses: Array<{
    id: string;
    title: string;
    slug: string;
    description?: string | null;
    coverImage?: string | null;
    lessonCount: number;
    level?: string | null;
    enrollmentCount: number;
  }>;
  reviews: Array<{
    id: string;
    content: string;
    rating: number | null;
    createdAt: Date;
    user: { name: string | null; image: string | null };
    replies: Array<{
      id: string;
      content: string;
      createdAt: Date;
    }>;
  }>;
  expertId?: string | null;
  currentUserId?: string | null;
  hasCommented?: boolean;
}

type TabKey = "hakkinda" | "makaleler" | "kurslar" | "yorumlar";

const tabs: { key: TabKey; label: string }[] = [
  { key: "hakkinda", label: "Hakkında" },
  { key: "makaleler", label: "Makaleler" },
  { key: "kurslar", label: "Kurslar" },
  { key: "yorumlar", label: "Yorumlar" },
];

/* -------------------------------------------------------------------------- */
/*  Animation variants                                                        */
/* -------------------------------------------------------------------------- */

const panelVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

/* -------------------------------------------------------------------------- */
/*  Level label helper                                                        */
/* -------------------------------------------------------------------------- */

function levelLabel(level: string | null | undefined): string {
  switch (level) {
    case "beginner":
      return "Başlangıç";
    case "intermediate":
      return "Orta";
    case "advanced":
      return "İleri";
    default:
      return level ?? "Genel";
  }
}

/* -------------------------------------------------------------------------- */
/*  Empty state component                                                     */
/* -------------------------------------------------------------------------- */

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-lavender/20">
        <svg
          className="h-7 w-7 text-lavender"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 8v4m0 4h.01"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="text-sm text-foreground/50">{message}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

export function ExpertProfileTabs({
  aboutContent,
  articles,
  courses,
  reviews,
  expertId = null,
  currentUserId = null,
  hasCommented = false,
}: ExpertProfileTabsProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("hakkinda");
  const canComment =
    Boolean(expertId) && Boolean(currentUserId) && !hasCommented;

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "shrink-0 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap",
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-foreground/60 hover:bg-lavender/10"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={panelVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {activeTab === "hakkinda" && (
            <HakkindaPanel content={aboutContent} />
          )}
          {activeTab === "makaleler" && (
            <MakalelerPanel articles={articles} />
          )}
          {activeTab === "kurslar" && (
            <KurslarPanel courses={courses} />
          )}
          {activeTab === "yorumlar" && (
            <YorumlarPanel
              reviews={reviews}
              expertId={expertId}
              canComment={canComment}
              onCommentSuccess={() => router.refresh()}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tab Panels                                                                */
/* -------------------------------------------------------------------------- */

function HakkindaPanel({ content }: { content?: string | null }) {
  if (!content) {
    return <EmptyState message="Henüz hakkında bilgisi eklenmemiş." />;
  }

  return (
    <div className="prose prose-sm max-w-none text-foreground/80 leading-relaxed whitespace-pre-line font-body">
      {content}
    </div>
  );
}

/* -------------------------------- Makaleler ------------------------------- */

function MakalelerPanel({
  articles,
}: {
  articles: ExpertProfileTabsProps["articles"];
}) {
  if (articles.length === 0) {
    return <EmptyState message="Henüz makale yayınlanmamış." />;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/makaleler/${article.slug}`}
          className="group block"
        >
          <Card className="h-full overflow-hidden">
            {article.coverImage && (
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <CardContent className="space-y-2">
              <h4 className="font-heading text-base font-semibold text-primary group-hover:text-primary-light transition-colors line-clamp-2">
                {article.title}
              </h4>
              {article.excerpt && (
                <p className="text-sm text-foreground/50 line-clamp-2">
                  {article.excerpt}
                </p>
              )}
              <div className="flex items-center gap-3 text-xs text-foreground/40">
                {article.readTime != null && (
                  <span>{formatReadTime(article.readTime)}</span>
                )}
                {article.publishedAt && (
                  <span>{formatDate(article.publishedAt)}</span>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

/* -------------------------------- Kurslar --------------------------------- */

function KurslarPanel({
  courses,
}: {
  courses: ExpertProfileTabsProps["courses"];
}) {
  if (courses.length === 0) {
    return <EmptyState message="Henüz kurs eklenmemiş." />;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {courses.map((course) => (
        <Link
          key={course.id}
          href={`/kurslar/${course.slug}`}
          className="group block"
        >
          <Card className="h-full overflow-hidden">
            {course.coverImage && (
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={course.coverImage}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <CardContent className="space-y-3">
              <h4 className="font-heading text-base font-semibold text-primary group-hover:text-primary-light transition-colors line-clamp-2">
                {course.title}
              </h4>
              {course.description && (
                <p className="text-sm text-foreground/50 line-clamp-2">
                  {course.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-2">
                {course.level && (
                  <Badge variant="gold">{levelLabel(course.level)}</Badge>
                )}
                <span className="text-xs text-foreground/40">
                  {course.lessonCount} ders
                </span>
                <span className="text-xs text-foreground/40">
                  {course.enrollmentCount} katılımcı
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

/* -------------------------------- Yorumlar -------------------------------- */

function YorumlarPanel({
  reviews,
  expertId,
  canComment,
  onCommentSuccess,
}: {
  reviews: ExpertProfileTabsProps["reviews"];
  expertId?: string | null;
  canComment?: boolean;
  onCommentSuccess?: () => void;
}) {
  return (
    <div className="space-y-6">
      {canComment && expertId && (
        <CommentForm expertId={expertId} onSuccess={onCommentSuccess} />
      )}
      {reviews.length === 0 && !canComment ? (
        <EmptyState message="Henüz yorum yapılmamış." />
      ) : reviews.length === 0 ? (
        <p className="text-sm text-foreground/50">
          Yorumunuz onaylandıktan sonra burada görünecektir.
        </p>
      ) : null}
      {reviews.length > 0 &&
      reviews.map((review) => (
        <div key={review.id} className="space-y-3">
          {/* Review */}
          <div className="flex gap-3">
            <Avatar
              src={review.user.image}
              alt={review.user.name ?? "Kullanıcı"}
              size="sm"
            />
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary">
                  {review.user.name ?? "Anonim"}
                </span>
                <span className="text-xs text-foreground/30">
                  {formatDate(review.createdAt)}
                </span>
              </div>
              {review.rating != null && (
                <StarRating rating={review.rating} size="sm" />
              )}
              <p className="text-sm leading-relaxed text-foreground/70">
                {review.content}
              </p>
            </div>
          </div>

          {/* Expert Replies */}
          {review.replies.length > 0 && (
            <div className="ml-11 space-y-3 border-l-2 border-lavender/20 pl-4">
              {review.replies.map((reply) => (
                <div key={reply.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-sage">
                      Uzman Yaniti
                    </span>
                    <span className="text-xs text-foreground/30">
                      {formatDate(reply.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/60">
                    {reply.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
