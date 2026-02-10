"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PrimaryPlanCta } from "@/components/cta/PrimaryPlanCta";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function IcerideNeVarFomoCta() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Yeni içerikler sık sık ekleniyor
          </h2>
          <p className="mt-4 text-foreground/70">
            Pratikler, kurslar ve kişisel planın hepsi burada. Yol arkadaşlarımızla
            birlikte ilerlemek için iyi bir zaman.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryPlanCta variant="primary" size="lg" />
            <Link
              href="/uyelik"
              className={cn(
                "inline-flex rounded-full border-2 border-lavender px-6 py-3 text-sm font-semibold text-primary",
                "hover:bg-lavender/15 transition-colors"
              )}
            >
              Üyelik seçenekleri
            </Link>
          </div>
          <p className="mt-6 text-xs text-foreground/50">
            İstediğin zaman iptal. Verin güvende.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
