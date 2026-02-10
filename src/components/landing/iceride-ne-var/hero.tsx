"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PrimaryPlanCta } from "@/components/cta/PrimaryPlanCta";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function IcerideNeVarHero() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Üyelerimizin keşfettiği dünya
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            İçeride ne var?{" "}
            <span className="text-primary">Keşfet.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/70 max-w-2xl">
            Rehberli pratikler, uzman yazıları, kurslar ve kişisel haftalık planın
            — hepsi tek yerde, senin ritminde.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <PrimaryPlanCta variant="primary" size="lg" />
            <Link
              href="/pratikler"
              className={cn(
                "inline-flex rounded-full border-2 border-lavender px-6 py-3 text-sm font-semibold text-primary",
                "hover:bg-lavender/15 transition-colors"
              )}
            >
              Önizlemelere göz at
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
