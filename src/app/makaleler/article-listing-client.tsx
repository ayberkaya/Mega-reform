"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Input } from "@/components/ui/input";
import { ArticleCard } from "@/components/articles/article-card";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

interface ArticleItem {
  slug: string;
  title: string;
  excerpt?: string | null;
  coverImage?: string | null;
  readTime?: number | null;
  publishedAt?: Date | string | null;
  category?: { name: string; slug: string; color?: string | null } | null;
  expert?: { name: string; slug: string; image?: string | null } | null;
  isFeatured?: boolean;
}

interface ArticleListingClientProps {
  articles: ArticleItem[];
  categories: { name: string; slug: string }[];
}

export function ArticleListingClient({
  articles,
  categories,
}: ArticleListingClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    let result = articles;

    if (selectedCategory) {
      result = result.filter(
        (a) => a.category?.slug === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLocaleLowerCase("tr-TR");
      result = result.filter(
        (a) =>
          a.title.toLocaleLowerCase("tr-TR").includes(q) ||
          a.excerpt?.toLocaleLowerCase("tr-TR").includes(q) ||
          a.expert?.name.toLocaleLowerCase("tr-TR").includes(q)
      );
    }

    return result;
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <ScrollReveal variant="fadeUp">
        <div className="rounded-2xl border border-lavender/20 bg-white/80 backdrop-blur-sm p-5 shadow-sm space-y-5">
          {/* Search */}
          <div className="relative max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
              <svg
                className="h-4 w-4 text-foreground/40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M16 16l4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <Input
              type="search"
              placeholder="Makale ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className={cn(
                "shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 cursor-pointer",
                !selectedCategory
                  ? "bg-lavender text-primary shadow-sm"
                  : "border border-lavender/30 text-foreground/60 hover:bg-lavender/10 hover:text-primary"
              )}
            >
              Tumunu Gor
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={cn(
                  "shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap",
                  selectedCategory === cat.slug
                    ? "bg-lavender text-primary shadow-sm"
                    : "border border-lavender/30 text-foreground/60 hover:bg-lavender/10 hover:text-primary"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Results count */}
      <p className="text-sm text-foreground/40">
        {filteredArticles.length} makale bulundu
      </p>

      {/* Article grid */}
      <AnimatePresence mode="wait">
        {filteredArticles.length > 0 ? (
          <motion.div
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredArticles.map((article, i) => (
              <ScrollReveal key={article.slug} delay={i * 0.08} variant="fadeUp">
                <ArticleCard {...article} />
              </ScrollReveal>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-lavender/20">
              <svg
                className="h-10 w-10 text-primary/40"
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
            <h3 className="font-heading text-xl font-bold text-primary mb-2">
              Sonuc bulunamadi
            </h3>
            <p className="max-w-sm text-sm text-foreground/50">
              Aradiginiz kriterlere uygun makale bulunamadi. Farkli bir kategori
              veya arama terimi deneyebilirsiniz.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
