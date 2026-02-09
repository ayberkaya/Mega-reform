"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FloatingParticles } from "@/components/animations/floating-particles";
import { GradientOrb } from "@/components/animations/gradient-orb";
import { BreathingCircle } from "@/components/animations/breathing-circle";
import { CursorGlow } from "@/components/animations/cursor-glow";
import { TextReveal } from "@/components/animations/text-reveal";
import { tr } from "@/content/tr";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-dark via-primary to-primary-light">
      {/* Background layers */}
      <FloatingParticles count={50} />
      <GradientOrb
        size={500}
        color1="rgba(74, 45, 122, 0.5)"
        color2="rgba(211, 211, 255, 0.15)"
        className="top-[-100px] left-[-100px]"
      />
      <GradientOrb
        size={400}
        color1="rgba(212, 175, 55, 0.15)"
        color2="rgba(157, 193, 131, 0.1)"
        className="bottom-[-50px] right-[-50px]"
        delay={5}
      />
      <GradientOrb
        size={300}
        color1="rgba(211, 211, 255, 0.2)"
        color2="transparent"
        className="top-[30%] right-[20%]"
        delay={8}
      />
      <CursorGlow />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Breathing circle above title */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <BreathingCircle size={80} color="rgba(211, 211, 255, 0.25)" />
        </motion.div>

        {/* Heading */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          <TextReveal delay={0.3}>
            {tr.landing.heroTitle}
          </TextReveal>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-white/70 font-body max-w-2xl mx-auto leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {tr.landing.heroSubtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Button variant="gold" size="lg">
            {tr.landing.heroCta}
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="text-white/90 hover:text-white border border-white/20 hover:bg-white/10"
          >
            {tr.landing.heroCtaSecondary}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
