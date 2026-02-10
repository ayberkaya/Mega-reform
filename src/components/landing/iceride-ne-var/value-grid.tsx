"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { cn } from "@/lib/utils/cn";

const ITEMS = [
  {
    title: "Rehberli meditasyon ve nefes",
    description: "Uzman sesiyle adım adım pratikler; istediğin zaman, istediğin yerde.",
    icon: "🧘",
  },
  {
    title: "Uzman makaleleri",
    description: "Ruhsal gelişim yazıları ve rehberlik; derinleşmek için tam kütüphane.",
    icon: "📜",
  },
  {
    title: "Adım adım kurslar",
    description: "Tarot, yoga, mindfulness; modül modül ilerleyeceğin eğitimler.",
    icon: "📚",
  },
  {
    title: "Videolu içerikler",
    description: "Görüntülü pratikler ve dersler; sınırsız izleme.",
    icon: "▶️",
  },
  {
    title: "Kişisel haftalık plan",
    description: "Hedefine göre oluşturulan 7 günlük pratik programın.",
    icon: "📅",
  },
  {
    title: "Kaydet ve tekrar et",
    description: "Favorilerin ve ilerleme takibi; yolculuğun seninle.",
    icon: "🔖",
  },
] as const;

export function IcerideNeVarValueGrid() {
  return (
    <section className="py-16 md:py-24 bg-white border-y border-lavender/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Üyelikle açılanlar
          </h2>
          <p className="mt-3 text-foreground/70 max-w-xl mx-auto">
            Hepsine tek yerden, kendi hızında ulaşırsın.
          </p>
        </ScrollReveal>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <li
                className={cn(
                  "rounded-2xl border border-lavender/20 bg-background/50 p-6 h-full",
                  "flex flex-col gap-3 transition-shadow hover:shadow-lg"
                )}
              >
                <span className="text-2xl" aria-hidden>
                  {item.icon}
                </span>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/70 flex-1">
                  {item.description}
                </p>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
