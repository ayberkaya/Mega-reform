"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PrimaryPlanCta } from "@/components/cta/PrimaryPlanCta";
import { cn } from "@/lib/utils/cn";

const BULLETS = [
  "Kişisel yol haritaları",
  "Rehberli pratik kütüphanesi",
  "Uzman rehberler",
  "Kaydet / tekrar et",
  "İlerleme takibi",
] as const;

export function MembershipValue() {
  return (
    <section className="py-20 md:py-28 bg-white border-y border-lavender/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Üyelikle açılanlar
          </h2>
        </ScrollReveal>
        <ScrollReveal className="max-w-md mx-auto">
          <ul className="space-y-4">
            {BULLETS.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 font-body text-foreground/90"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>
        <ScrollReveal className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <PrimaryPlanCta variant="primary" size="lg" />
          <Link
            href="/uyelik"
            className={cn(
              "inline-flex rounded-full border-2 border-lavender px-6 py-3 text-sm font-semibold text-primary",
              "hover:bg-lavender/15 transition-colors"
            )}
          >
            Üyelik detayları
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
