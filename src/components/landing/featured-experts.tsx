"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { tr } from "@/content/tr";

interface Expert {
  name: string;
  title: string;
  image?: string;
  specialties: string[];
  rating: number;
  bio: string;
}

const DEMO_EXPERTS: Expert[] = [
  {
    name: "Ayse Nur Yilmaz",
    title: "Meditasyon Rehberi",
    specialties: ["Meditasyon", "Mindfulness"],
    rating: 4.9,
    bio: "15 yıllık deneyimle iç huzur yolculuğunuzda rehberlik ediyorum.",
  },
  {
    name: "Mehmet Can Demir",
    title: "Yoga Egitmeni",
    specialties: ["Yoga", "Nefes Teknikleri"],
    rating: 4.8,
    bio: "Beden ve ruh uyumunu keşfetmeniz için yanınızdayım.",
  },
  {
    name: "Elif Sena Kara",
    title: "Tarot Okuyucusu",
    specialties: ["Tarot", "Ruhsal Gelisim"],
    rating: 4.7,
    bio: "Evrenin mesajlarini birlikte yorumluyoruz.",
  },
  {
    name: "Ahmet Baris Ozturk",
    title: "Ruhsal Danismani",
    specialties: ["Ruhsal Gelisim", "Meditasyon"],
    rating: 4.9,
    bio: "Ruhsal donusum yolculugunuzda size isikyolculugu yapiyorum.",
  },
];

export function FeaturedExperts() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-cream-light to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            {tr.landing.expertsTitle}
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            {tr.landing.expertsSubtitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_EXPERTS.map((expert, i) => (
            <ScrollReveal key={expert.name} delay={i * 0.12} variant="fadeUp">
              <Card className="text-center p-6 hover:shadow-2xl group cursor-pointer">
                <CardContent className="p-0">
                  <div className="flex justify-center mb-4">
                    <Avatar
                      alt={expert.name}
                      size="lg"
                      breathing
                    />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-1">
                    {expert.name}
                  </h3>
                  <p className="text-sm text-foreground/50 mb-3">
                    {expert.title}
                  </p>
                  <div className="flex justify-center mb-3">
                    <StarRating rating={expert.rating} size="sm" />
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                    {expert.specialties.map((s) => (
                      <Badge key={s} variant="sage">
                        {s}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {expert.bio}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
