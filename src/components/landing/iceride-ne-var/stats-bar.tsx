"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";

const STATS = [
  { value: "50+", label: "Rehberli pratik" },
  { value: "12+", label: "Uzman rehber" },
  { value: "25+", label: "Saat video" },
  { value: "Her hafta", label: "Yeni içerik" },
] as const;

export function IcerideNeVarStatsBar() {
  return (
    <section className="py-10 md:py-14 bg-primary text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-2">
          <p className="text-sm font-semibold text-white/80 uppercase tracking-wider">
            İçeride neler var?
          </p>
        </ScrollReveal>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-6">
          {STATS.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <li className="text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold">
                  {stat.value}
                </p>
                <p className="text-sm text-white/80 mt-1">{stat.label}</p>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
