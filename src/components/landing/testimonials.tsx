"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { StarRating } from "@/components/ui/star-rating";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { tr } from "@/content/tr";

interface Testimonial {
  name: string;
  quote: string;
  rating: number;
}

/** Pre-computed radial lines for mandala SVG. Fixed values avoid server/client float divergence (hydration mismatch). */
const MANDALA_LINES = (() => {
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 * Math.PI) / 180;
    const round = (n: number) => Math.round(n * 1e4) / 1e4;
    lines.push({
      x1: round(200 + 60 * Math.cos(angle)),
      y1: round(200 + 60 * Math.sin(angle)),
      x2: round(200 + 180 * Math.cos(angle)),
      y2: round(200 + 180 * Math.sin(angle)),
    });
  }
  return lines;
})();

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Zeynep A.",
    quote:
      "Mega Reform sayesinde meditasyona başladım ve hayatım tamamen değişti. Her sabah 10 dakikalık pratik, günüme huzurla başlamamı sağlıyor.",
    rating: 5,
  },
  {
    name: "Burak K.",
    quote:
      "Tarot kursu inanılmazdı. Elif hoca sayesinde kendimi daha iyi tanıdım ve hayatıma daha bilinçli yön vermeye başladım.",
    rating: 5,
  },
  {
    name: "Merve D.",
    quote:
      "Nefes teknikleri kursunu tamamladıktan sonra stresle başa çıkma yeteneğim çok gelişti. Uzmanlar gerçekten rehberlik ediyor.",
    rating: 5,
  },
  {
    name: "Emre T.",
    quote:
      "Yoga eğitimi mükemmeldi. Hem bedensel hem ruhsal olarak kendimi çok daha iyi hissediyorum. Tüm yol arkadaşlarıma öneririm.",
    rating: 4,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Mandala background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-[600px] h-[600px]" fill="currentColor">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {MANDALA_LINES.map((props, i) => (
            <line key={i} {...props} stroke="currentColor" strokeWidth="0.5" />
          ))}
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            {tr.landing.testimonialsTitle}
          </h2>
        </ScrollReveal>

        <div className="relative min-h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center"
            >
              <blockquote className="font-heading text-xl md:text-2xl lg:text-3xl text-primary/80 italic leading-relaxed mb-8 max-w-3xl mx-auto">
                &ldquo;{TESTIMONIALS[current].quote}&rdquo;
              </blockquote>
              <div className="flex flex-col items-center gap-3">
                <Avatar alt={TESTIMONIALS[current].name} size="md" />
                <div>
                  <p className="font-medium text-foreground">
                    {TESTIMONIALS[current].name}
                  </p>
                  <StarRating
                    rating={TESTIMONIALS[current].rating}
                    size="sm"
                    className="justify-center mt-1"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-primary w-8"
                  : "bg-lavender/40 hover:bg-lavender"
              }`}
              aria-label={`Yorum ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
