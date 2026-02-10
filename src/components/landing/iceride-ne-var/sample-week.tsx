"use client";

import type { ExampleWeekItem } from "@/components/value/ExampleWeekPlan";
import { ExampleWeekPlan } from "@/components/value/ExampleWeekPlan";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

const DEMO_WEEK: ExampleWeekItem[] = [
  { dayLabel: "Pazartesi", title: "Sabah Nefesi", durationSec: 300, type: "practice", locked: true, guideName: "Uzman" },
  { dayLabel: "Salı", title: "İç Huzur Meditasyonu", durationSec: 600, type: "practice", locked: true },
  { dayLabel: "Çarşamba", title: "Temel Yoga Akışı", durationSec: 900, type: "video", locked: true },
  { dayLabel: "Perşembe", title: "Tarot ile Günlük Yansıma", durationSec: 480, type: "article", locked: true },
  { dayLabel: "Cuma", title: "Stres Azaltma Nefesi", durationSec: 300, type: "practice", locked: true },
  { dayLabel: "Cumartesi", title: "Beden Taraması", durationSec: 1200, type: "practice", locked: true },
  { dayLabel: "Pazar", title: "Haftalık Özet Meditasyonu", durationSec: 720, type: "practice", locked: true },
];

export function IcerideNeVarSampleWeek() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-lavender/10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Bir haftanda böyle görünür
          </h2>
          <p className="mt-3 text-foreground/70">
            Hedefine göre kişiselleşen plan; her gün net bir pratik. Planın üyelikle gün gün hayat bulur.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <ExampleWeekPlan
            planTitle="Örnek 7 günlük plan (senin planın hedeflerine göre değişir)"
            items={DEMO_WEEK}
            ctaHref="/uyelik"
            ctaLabel="Üyeliği gör"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
