"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CourseCard } from "@/components/courses/course-card";
import { Input } from "@/components/ui/input";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { cn } from "@/lib/utils/cn";

interface Course {
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

interface Category {
  name: string;
  slug: string;
}

interface CourseListingClientProps {
  courses: Course[];
  categories: Category[];
}

const LEVELS = [
  { label: "Tümü", value: null },
  { label: "Başlangıç", value: "Başlangıç" },
  { label: "Orta", value: "Orta" },
  { label: "İleri", value: "İleri" },
];

const PRICE_FILTERS = [
  { label: "Tümü", value: null },
  { label: "Ücretsiz", value: "free" },
  { label: "Ücretli", value: "paid" },
];

export function CourseListingClient({ courses, categories }: CourseListingClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const filteredCourses = useMemo(() => {
    let result = courses;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLocaleLowerCase("tr-TR");
      result = result.filter(
        (course) =>
          course.title.toLocaleLowerCase("tr-TR").includes(query) ||
          (course.description &&
            course.description.toLocaleLowerCase("tr-TR").includes(query)) ||
          (course.expert &&
            course.expert.name.toLocaleLowerCase("tr-TR").includes(query))
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter(
        (course) => course.category?.slug === selectedCategory
      );
    }

    // Filter by level
    if (selectedLevel) {
      result = result.filter((course) => course.level === selectedLevel);
    }

    // Filter by price
    if (selectedPrice === "free") {
      result = result.filter((course) => course.isFree);
    } else if (selectedPrice === "paid") {
      result = result.filter((course) => !course.isFree);
    }

    return result;
  }, [courses, searchQuery, selectedCategory, selectedLevel, selectedPrice]);

  return (
    <div className="space-y-8">
      {/* Search & Filters */}
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
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M16 16l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <Input
            type="search"
            placeholder="Kurs ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 cursor-pointer",
              selectedCategory === null
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
              onClick={() =>
                setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)
              }
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

        {/* Level & Price */}
        <div className="flex flex-wrap items-center gap-4 pt-1 border-t border-lavender/10">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground/60">Seviye:</span>
            <div className="flex flex-wrap gap-1">
              {LEVELS.map((level) => (
                <button
                  key={level.label}
                  type="button"
                  onClick={() => setSelectedLevel(level.value)}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 cursor-pointer",
                    selectedLevel === level.value
                      ? "bg-lavender text-primary shadow-sm"
                      : "border border-lavender/30 text-foreground/60 hover:bg-lavender/10 hover:text-primary"
                  )}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground/60">Fiyat:</span>
            <div className="flex flex-wrap gap-1">
              {PRICE_FILTERS.map((priceFilter) => (
                <button
                  key={priceFilter.label}
                  type="button"
                  onClick={() => setSelectedPrice(priceFilter.value)}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 cursor-pointer",
                    selectedPrice === priceFilter.value
                      ? "bg-lavender text-primary shadow-sm"
                      : "border border-lavender/30 text-foreground/60 hover:bg-lavender/10 hover:text-primary"
                  )}
                >
                  {priceFilter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      </ScrollReveal>

      {/* Results count */}
      <p className="text-sm text-foreground/40">
        {filteredCourses.length} kurs bulundu
      </p>

      {/* Course grid */}
      <AnimatePresence mode="wait">
        {filteredCourses.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCourses.map((course, i) => (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <CourseCard
                  slug={course.slug}
                  title={course.title}
                  description={course.description}
                  coverImage={course.coverImage}
                  price={course.price}
                  isFree={course.isFree}
                  level={course.level}
                  lessonCount={course.lessonCount}
                  duration={course.duration}
                  enrollmentCount={course.enrollmentCount}
                  rating={course.rating}
                  expert={course.expert}
                  category={course.category}
                  isFeatured={course.isFeatured}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lavender/20 mb-4">
              <svg
                className="h-8 w-8 text-primary/40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-semibold text-primary mb-2">
              Sonuc bulunamadi
            </h3>
            <p className="text-foreground/50 text-sm">
              Arama kriterlerinize uygun kurs bulunamadi.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
