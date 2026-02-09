"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { tr } from "@/content/tr";

interface Article {
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  readTime: number;
  author: string;
  date: string;
}

const DEMO_ARTICLES: Article[] = [
  {
    title: "Gunluk Meditasyonun 7 Donusturucu Etkisi",
    excerpt: "Meditasyonu hayatiniza dahil ettiginizde bedeninizde ve ruhunuzda gozlemleyeceginiz degisimler...",
    category: "Meditasyon",
    categoryColor: "#9DC183",
    readTime: 5,
    author: "Ayse Nur Yilmaz",
    date: "8 Subat 2026",
  },
  {
    title: "Tarot Kartlarini Anlamanin Ilk Adimlari",
    excerpt: "Tarot kartlarinin gizemli dunyasina adim atarken bilmeniz gerekenler ve baslangic rehberi...",
    category: "Tarot",
    categoryColor: "#4A2D7A",
    readTime: 8,
    author: "Elif Sena Kara",
    date: "6 Subat 2026",
  },
  {
    title: "Nefes Calismasi ile Stresi Birakma",
    excerpt: "Bilimsel olarak kanitlanmis nefes tekniklerini gunluk rutininize nasil dahil edebilirsiniz...",
    category: "Nefes Teknikleri",
    categoryColor: "#B8D4A3",
    readTime: 4,
    author: "Mehmet Can Demir",
    date: "4 Subat 2026",
  },
  {
    title: "Yoga ve Zihinsel Saglik Arasindaki Bag",
    excerpt: "Modern bilim, binlerce yıllık yoga pratiğinin zihinsel sağlık üzerindeki etkilerini nasıl doğruluyor...",
    category: "Yoga",
    categoryColor: "#D4AF37",
    readTime: 6,
    author: "Mehmet Can Demir",
    date: "2 Subat 2026",
  },
];

export function LatestArticles() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            {tr.landing.articlesTitle}
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            {tr.landing.articlesSubtitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEMO_ARTICLES.map((article, i) => (
            <ScrollReveal key={article.title} delay={i * 0.1} variant="fadeUp">
              <Card className="group cursor-pointer overflow-hidden">
                {/* Color accent bar */}
                <div
                  className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
                  style={{ backgroundColor: article.categoryColor }}
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge
                      style={{
                        backgroundColor: `${article.categoryColor}20`,
                        color: article.categoryColor,
                      }}
                    >
                      {article.category}
                    </Badge>
                    <span className="text-xs text-foreground/40">
                      {article.readTime} {tr.articles.readTime}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-primary mb-2 group-hover:text-primary-light transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar alt={article.author} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-foreground/80">
                        {article.author}
                      </p>
                      <p className="text-xs text-foreground/40">{article.date}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-10">
          <a
            href="/makaleler"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-light transition-colors"
          >
            {tr.common.seeAll}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
