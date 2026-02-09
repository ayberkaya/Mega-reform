"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { tr } from "@/content/tr";
import { CATEGORIES } from "@/lib/utils/constants";
import { cn } from "@/lib/utils/cn";

const iconMap: Record<string, React.ReactNode> = {
  lotus: (
    <svg viewBox="0 0 32 32" fill="currentColor" className="w-10 h-10">
      <path d="M16 4c-2 4-6 8-6 12s2.7 7.3 6 8c3.3-.7 6-4 6-8s-4-8-6-12z" />
      <path d="M16 4c-4 3-10 6-12 10 2 4 6 6 10 7-2-3-3.5-8-2-13 1-2 2.5-3 4-4z" opacity="0.6" />
      <path d="M16 4c4 3 10 6 12 10-2 4-6 6-10 7 2-3 3.5-8 2-13-1-2-2.5-3-4-4z" opacity="0.6" />
    </svg>
  ),
  yoga: (
    <svg viewBox="0 0 32 32" fill="currentColor" className="w-10 h-10">
      <circle cx="16" cy="6" r="3" />
      <path d="M16 10v6M10 20l6-4 6 4M8 28l4-8M24 28l-4-8" strokeWidth="2" stroke="currentColor" fill="none" />
    </svg>
  ),
  tarot: (
    <svg viewBox="0 0 32 32" fill="currentColor" className="w-10 h-10">
      <rect x="8" y="4" width="16" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16 10l2 4 4 .5-3 3 .7 4-3.7-2-3.7 2 .7-4-3-3 4-.5z" />
    </svg>
  ),
  chakra: (
    <svg viewBox="0 0 32 32" fill="currentColor" className="w-10 h-10">
      <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="16" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="2" />
    </svg>
  ),
  wind: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
      <path d="M4 12h16a4 4 0 100-4" strokeLinecap="round" />
      <path d="M4 18h20a4 4 0 110 4" strokeLinecap="round" />
      <path d="M4 24h10a3 3 0 100-3" strokeLinecap="round" />
    </svg>
  ),
  mind: (
    <svg viewBox="0 0 32 32" fill="currentColor" className="w-10 h-10">
      <circle cx="16" cy="14" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 14c0-2.2 1.8-4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 22v4M12 28h8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),
};

export function CategoryExplorer() {
  return (
    <section className="py-20 md:py-28 bg-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            {tr.landing.categoriesTitle}
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            {tr.landing.categoriesSubtitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {CATEGORIES.map((category, i) => (
            <ScrollReveal key={category.slug} delay={i * 0.1} variant="scale" className="h-full">
              <motion.a
                href={`/makaleler/kategori/${category.slug}`}
                className={cn(
                  "group flex flex-col items-center justify-center gap-4 p-6 md:p-8 rounded-2xl h-full min-h-[11rem] md:min-h-[12.5rem]",
                  "bg-white/80 backdrop-blur-sm border border-lavender/10",
                  "transition-all duration-300 hover:shadow-xl hover:-translate-y-2",
                  "cursor-pointer"
                )}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="p-4 rounded-2xl transition-colors duration-300 shrink-0"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <div style={{ color: category.color }}>
                    {iconMap[category.icon]}
                  </div>
                </div>
                <span className="font-heading text-base md:text-lg font-semibold text-primary text-center line-clamp-2">
                  {category.name}
                </span>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
