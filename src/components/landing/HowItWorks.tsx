"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PrimaryPlanCta } from "@/components/cta/PrimaryPlanCta";

const STEPS = [
  { title: "2 dakikada hedefini seç", desc: "Kısa sorularla hedefin ve ritmin belirlenir." },
  { title: "Sana uygun pratikler eşleşsin", desc: "Sistem sana özel haftalık plan oluşturur." },
  { title: "Gün gün ilerle", desc: "Rehberli pratiklerle tutarlı ilerleme." },
] as const;

export function HowItWorks() {
  return (
    <section id="nasil-calisir" className="py-20 md:py-28 bg-white border-y border-lavender/10 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Nasıl çalışır?
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {STEPS.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.08} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-heading font-bold text-lg flex items-center justify-center mx-auto mb-5">
                {i + 1}
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="font-body text-foreground/70 text-sm">
                {step.desc}
              </p>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="text-center mt-12">
          <PrimaryPlanCta variant="primary" size="md" />
        </ScrollReveal>
      </div>
    </section>
  );
}
