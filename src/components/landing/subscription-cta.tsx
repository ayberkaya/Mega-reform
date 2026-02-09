"use client";

import { Button } from "@/components/ui/button";
import { GradientOrb } from "@/components/animations/gradient-orb";
import { BreathingCircle } from "@/components/animations/breathing-circle";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { tr } from "@/content/tr";

export function SubscriptionCta() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-r from-primary-dark via-primary to-primary-light">
      {/* Orbs */}
      <GradientOrb
        size={350}
        color1="rgba(211, 211, 255, 0.15)"
        color2="transparent"
        className="top-[-50px] left-[-50px]"
      />
      <GradientOrb
        size={300}
        color1="rgba(212, 175, 55, 0.1)"
        color2="transparent"
        className="bottom-[-30px] right-[-30px]"
        delay={4}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="flex justify-center mb-6">
            <BreathingCircle size={60} color="rgba(212, 175, 55, 0.3)" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {tr.landing.subscriptionTitle}
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {tr.landing.subscriptionSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 text-white/70 text-sm">
            <span className="flex items-center gap-2">
              <CheckIcon /> Sınırsız makale erişimi
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon /> Özel kurslar
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon /> Uzman danismanligi
            </span>
          </div>
          <Button variant="gold" size="xl">
            {tr.landing.subscriptionCta}
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
