"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { Input } from "@/components/ui/input";

interface ExpertFiltersProps {
  categories: { name: string; slug: string }[];
  selectedCategory?: string;
  searchQuery?: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
}

export function ExpertFilters({
  categories,
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}: ExpertFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
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
          placeholder="Uzman ara..."
          value={searchQuery ?? ""}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Pills */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1"
      >
        {/* "Tumunu Gor" pill */}
        <button
          type="button"
          onClick={() => onCategoryChange("")}
          className={cn(
            "shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 cursor-pointer",
            !selectedCategory
              ? "bg-lavender text-primary shadow-sm"
              : "border border-lavender/30 text-foreground/60 hover:bg-lavender/10 hover:text-primary"
          )}
        >
          Tumunu Gor
        </button>

        {categories.map((category) => {
          const isActive = selectedCategory === category.slug;
          return (
            <button
              key={category.slug}
              type="button"
              onClick={() => onCategoryChange(category.slug)}
              className={cn(
                "shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap",
                isActive
                  ? "bg-lavender text-primary shadow-sm"
                  : "border border-lavender/30 text-foreground/60 hover:bg-lavender/10 hover:text-primary"
              )}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
