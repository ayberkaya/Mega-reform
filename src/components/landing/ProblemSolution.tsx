"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { cn } from "@/lib/utils/cn";

const CARDS = [
  {
    problem: "Nereden başlayacağını bilmiyorsun.",
    solution: "Hedefine göre kısa sorularla kişisel plan oluşturulur.",
  },
  {
    problem: "Çok fazla içerik, yön belirsiz.",
    solution: "Sana uygun pratikler eşleşir; gün gün net bir yol haritası.",
  },
  {
    problem: "Tek başına ilerlemek zor.",
    solution: "Uzman rehberlerin sesli ve yazılı pratikleriyle ilerlersin.",
  },
] as const;

export function ProblemSolution() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Sorun → Çözüm
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CARDS.map((card, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <article
                className={cn(
                  "rounded-2xl border border-lavender/20 bg-white p-6 h-full flex flex-col"
                )}
              >
                <p className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">
                  Sorun
                </p>
                <p className="mt-2 font-body text-foreground/90">
                  {card.problem}
                </p>
                <p className="mt-4 text-sm font-semibold text-primary uppercase tracking-wider">
                  Çözüm
                </p>
                <p className="mt-2 font-body text-foreground/80">
                  {card.solution}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
