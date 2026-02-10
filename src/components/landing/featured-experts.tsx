"use client";

import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { tr } from "@/content/tr";

interface Expert {
  slug: string;
  name: string;
  title: string;
  image?: string;
  specialties: string[];
  rating: number;
  bio: string;
}

const DEMO_EXPERTS: Expert[] = [
  {
    slug: "ayse-nur-yilmaz",
    name: "Ayşe Nur Yılmaz",
    title: "Meditasyon Rehberi",
    specialties: ["Meditasyon", "Mindfulness"],
    rating: 4.9,
    bio: "15 yıllık deneyimle iç huzur yolculuğunuzda rehberlik ediyorum.",
  },
  {
    slug: "mehmet-can-demir",
    name: "Mehmet Can Demir",
    title: "Yoga Eğitmeni",
    specialties: ["Yoga", "Nefes Teknikleri"],
    rating: 4.8,
    bio: "Beden ve ruh uyumunu keşfetmeniz için yanınızdayım.",
  },
  {
    slug: "elif-sena-kara",
    name: "Elif Sena Kara",
    title: "Tarot Okuyucusu",
    specialties: ["Tarot", "Ruhsal Gelişim"],
    rating: 4.7,
    bio: "Evrenin mesajlarını birlikte yorumluyoruz.",
  },
  {
    slug: "ahmet-baris-ozturk",
    name: "Ahmet Barış Öztürk",
    title: "Ruhsal Danışmanı",
    specialties: ["Ruhsal Gelişim", "Meditasyon"],
    rating: 4.9,
    bio: "Ruhsal dönüşüm yolculuğunuzda size ışık tutuyorum.",
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
            <ScrollReveal key={expert.slug} delay={i * 0.12} variant="fadeUp">
              <Link href={`/uzmanlar/${expert.slug}`} className="block group">
                <Card className="text-center p-6 hover:shadow-2xl transition-shadow h-full">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-4">
                      <Avatar
                        alt={expert.name}
                        size="lg"
                        breathing
                        className="group-hover:ring-sage/60 transition-all"
                      />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-primary mb-1 group-hover:text-primary-light transition-colors">
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
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
