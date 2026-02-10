"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { tr } from "@/content/tr";
import { STOCK_VIDEOS } from "@/lib/utils/constants";

interface Course {
  title: string;
  description: string;
  category: string;
  level: string;
  lessonCount: number;
  duration: string;
  author: string;
  isFree: boolean;
  price?: number;
}

const DEMO_COURSES: Course[] = [
  {
    title: "Baslangic Meditasyonu: Ic Huzura Ilk Adim",
    description:
      "Meditasyonu hic denememis olsaniz bile bu kurs sizi adim adim ic huzurun kapisina goturecek. Gunluk 10 dakikalik pratiklerle hayatinizi donusturun.",
    category: "Meditasyon",
    level: "Baslangic",
    lessonCount: 12,
    duration: "4 saat",
    author: "Ayse Nur Yilmaz",
    isFree: true,
  },
  {
    title: "Tarot ile Kendini Tanima Yolculugu",
    description:
      "Major ve minor arkana kartlarini ogrenin, kendi kendinize okuma yapin ve evrenin mesajlarini anlayin. Derinlemesine bir ruhsal kesif deneyimi.",
    category: "Tarot",
    level: "Orta",
    lessonCount: 20,
    duration: "8 saat",
    author: "Elif Sena Kara",
    isFree: false,
    price: 149,
  },
];

export function CoursePreview() {
  return (
    <section className="py-20 md:py-28 bg-lavender-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            {tr.landing.coursesTitle}
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            {tr.landing.coursesSubtitle}
          </p>
        </ScrollReveal>

        <div className="space-y-12">
          {DEMO_COURSES.map((course, i) => (
            <ScrollReveal
              key={course.title}
              delay={i * 0.15}
              variant={i % 2 === 0 ? "slideLeft" : "slideRight"}
            >
              <div
                className={`flex flex-col ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 items-center`}
              >
                {/* Video / thumbnail */}
                <div className="w-full md:w-1/2">
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/10 to-lavender/30 flex items-center justify-center overflow-hidden relative">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                      aria-hidden
                    >
                      <source src={STOCK_VIDEOS.coursePreview} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                    <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg relative z-10">
                      <svg className="w-6 h-6 text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="sage">{course.category}</Badge>
                    <Badge variant="outline">{course.level}</Badge>
                    {course.isFree && (
                      <Badge variant="gold">{tr.common.free}</Badge>
                    )}
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary">
                    {course.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-foreground/50">
                    <span>{course.lessonCount} ders</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar alt={course.author} size="sm" />
                    <span className="text-sm font-medium text-foreground/70">
                      {course.author}
                    </span>
                  </div>
                  <Button variant="primary" size="md">
                    {course.isFree ? tr.common.startNow : `Kursa Katil`}
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
