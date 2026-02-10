"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExpertCard } from "@/components/experts/expert-card";
import { ExpertFilters } from "@/components/experts/expert-filters";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

interface Expert {
  slug: string;
  name: string;
  title: string;
  image?: string | null;
  specialties: string[];
  rating: number;
  reviewCount: number;
  bio?: string | null;
  isVerified?: boolean;
  yearsExperience?: number | null;
}

interface ExpertListingClientProps {
  experts: Expert[];
  categories: { name: string; slug: string }[];
}

export function ExpertListingClient({
  experts,
  categories,
}: ExpertListingClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExperts = useMemo(() => {
    let result = experts;

    // Filter by category (match against specialties)
    if (selectedCategory) {
      const categoryName = categories
        .find((c) => c.slug === selectedCategory)
        ?.name.toLocaleLowerCase("tr-TR");

      if (categoryName) {
        result = result.filter((expert) =>
          expert.specialties.some(
            (s) => s.toLocaleLowerCase("tr-TR") === categoryName
          )
        );
      }
    }

    // Filter by search query (match name, title, bio)
    if (searchQuery.trim()) {
      const q = searchQuery.toLocaleLowerCase("tr-TR");
      result = result.filter(
        (expert) =>
          expert.name.toLocaleLowerCase("tr-TR").includes(q) ||
          expert.title.toLocaleLowerCase("tr-TR").includes(q) ||
          expert.bio?.toLocaleLowerCase("tr-TR").includes(q) ||
          expert.specialties.some((s) =>
            s.toLocaleLowerCase("tr-TR").includes(q)
          )
      );
    }

    return result;
  }, [experts, categories, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <ScrollReveal variant="fadeUp">
        <ExpertFilters
        categories={categories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchQuery}
      />
      </ScrollReveal>

      {/* Results count */}
      <p className="text-sm text-foreground/40">
        {filteredExperts.length} uzman bulundu
      </p>

      {/* Expert grid */}
      <AnimatePresence mode="wait">
        {filteredExperts.length > 0 ? (
          <motion.div
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredExperts.map((expert, i) => (
              <ScrollReveal key={expert.slug} delay={i * 0.06} variant="fadeUp">
                <ExpertCard
                  slug={expert.slug}
                  name={expert.name}
                  title={expert.title}
                  image={expert.image}
                  specialties={expert.specialties}
                  rating={expert.rating}
                  reviewCount={expert.reviewCount}
                  bio={expert.bio}
                  isVerified={expert.isVerified}
                  yearsExperience={expert.yearsExperience}
                />
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
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-primary mb-2">
              Sonuç bulunamadı
            </h3>
            <p className="max-w-sm text-sm text-foreground/50">
              Aradığınız kriterlere uygun uzman bulunamadı. Farklı bir kategori
              veya arama terimi deneyerek yolculuğunuza eşlik edecek uzmanı
              bulabilirsiniz.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
