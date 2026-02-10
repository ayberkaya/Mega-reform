"use client";

import Link from "next/link";
import { PrimaryPlanCta } from "@/components/cta/PrimaryPlanCta";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { cn } from "@/lib/utils/cn";

const BULLETS = [
  "Rehberli meditasyon ve nefes pratikleri",
  "Uzman yazıları ve makaleler",
  "Adım adım kurslar",
  "Videolu içerikler",
  "Kişisel haftalık plan",
] as const;

export function WhatsInsideSection() {
  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            İçeride ne var?
          </h2>
          <p className="mt-4 text-foreground/70">
            Üye olmadan kataloğu inceleyebilir, önizlemeleri dinleyebilir veya
            okuyabilirsin. Tam erişim üyelikle.
          </p>
          <ul className="mt-8 space-y-3">
            {BULLETS.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-foreground/90"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryPlanCta variant="primary" size="lg" />
            <Link
              href="/pratikler"
              className={cn(
                "inline-flex rounded-full border-2 border-lavender px-6 py-3 text-sm font-semibold text-primary",
                "hover:bg-lavender/15 transition-colors"
              )}
            >
              Pratiklere göz at
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
