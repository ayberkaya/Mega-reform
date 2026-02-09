import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { formatCurrency, formatDuration } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

// Demo courses data
const DEMO_COURSES = [
  {
    slug: "meditasyona-giris",
    title: "Meditasyona Giriş: 21 Günlük Program",
    description:
      "Meditasyonu hayatinizin bir parcasi haline getirmek icin adim adim ilerleyeceginiz kapsamli bir program. Bu kursda, meditasyonun temel prensiplerini ogrenecek, gunluk pratik aliskanligi gelistirecek ve ic huzurunuzu kesfedeceksiniz.",
    price: null,
    isFree: true,
    level: "Baslangic",
    lessonCount: 21,
    duration: 315,
    enrollmentCount: 1247,
    rating: 4.9,
    expert: { name: "Ayse Nur Yilmaz", slug: "ayse-nur-yilmaz", title: "Meditasyon Rehberi", bio: "15 yillik deneyimle ic huzur yolculugunuzda rehberlik ediyorum." },
    category: { name: "Meditasyon", slug: "meditasyon", color: "#9DC183" },
    isFeatured: true,
    learnings: [
      "Meditasyonun temel prensiplerini ve tarihcesini ogreneceksiniz",
      "Gunluk meditasyon aliskanligi olusturmayi basaracaksiniz",
      "Nefes farkindaligi ve beden taramasi tekniklerini uygulayacaksiniz",
      "Stres ve kaygiyi azaltmak icin etkili yontemler gelistireceksiniz",
      "Farkindalik meditasyonu ile anin gucunu kesfedeceksiniz",
      "Kendi meditasyon rutininizi tasarlamayi ogreneceksiniz",
    ],
  },
  {
    slug: "hatha-yoga-temelleri",
    title: "Hatha Yoga Temelleri",
    description:
      "Yoga pratiginizi guvenli ve dogru bir sekilde baslatirsaniz. Temel asanalar ve nefes teknikleri ile bedeninizi ve zihninizi dengeye kavusturun. Bu kurs, yoga yolculugunuzun saglam temeller uzerine insa edilmesini saglar.",
    price: 149,
    isFree: false,
    level: "Baslangic",
    lessonCount: 16,
    duration: 480,
    enrollmentCount: 856,
    rating: 4.8,
    expert: { name: "Mehmet Can Demir", slug: "mehmet-can-demir", title: "Yoga Egitmeni", bio: "Beden ve ruh uyumunu kesfetmeniz icin yaninizdayim." },
    category: { name: "Yoga", slug: "yoga", color: "#D4AF37" },
    isFeatured: false,
    learnings: [
      "Temel yoga asanalarini dogru form ile uygulayacaksiniz",
      "Pranayama (nefes teknikleri) ile enerji akinizi duzenleyeceksiniz",
      "Esneklik ve guc dengenizi gelistireceksiniz",
      "Guvenli yoga pratigi icin vucudunuzu dinlemeyi ogreneceksiniz",
      "Evde kendi yoga rutininizi olusturabileceksiniz",
    ],
  },
  {
    slug: "tarot-okuma-sanati",
    title: "Tarot Okuma Sanati",
    description:
      "Tarot kartlarinin dilini ogrenin ve kendi okumalarinizi yapmaya baslayin. Bu kursda buyuk ve kucuk arkana kartlarinin anlamlarini, farkli acilim tekniklerini ve sezgisel okuma yontemlerini kesfedeceksiniz.",
    price: 199,
    isFree: false,
    level: "Orta",
    lessonCount: 12,
    duration: 360,
    enrollmentCount: 432,
    rating: 4.7,
    expert: { name: "Elif Sena Kara", slug: "elif-sena-kara", title: "Tarot Okuyucusu", bio: "Evrenin mesajlarini birlikte yorumluyoruz." },
    category: { name: "Tarot", slug: "tarot", color: "#4A2D7A" },
    isFeatured: true,
    learnings: [
      "78 tarot kartinin anlamlarini derinlemesine ogreneceksiniz",
      "Farkli acilim tekniklerini uygulayabileceksiniz",
      "Sezgisel okuma yeteneklerinizi gelistireceksiniz",
      "Kendiniz ve baskalar icin tarot okumasi yapabileceksiniz",
      "Kartlar arasindaki iliskileri ve sembolizmi kavrayacaksiniz",
      "Gunluk kart cekme pratigi ile rehberlik almayi ogreneceksiniz",
    ],
  },
  {
    slug: "ruhsal-farkindalik",
    title: "Ruhsal Farkindalik ve Ic Yolculuk",
    description:
      "Kendinizi derinlemesine kesfetmeniz icin hazirlanmis kapsamli bir ruhsal gelisim programi. Ic sesinizi dinlemeyi, enerji bedeninizi anlamayi ve ruhsal donusumunuzu baslatmayi ogreneceksiniz.",
    price: 249,
    isFree: false,
    level: "Ileri",
    lessonCount: 24,
    duration: 720,
    enrollmentCount: 318,
    rating: 4.9,
    expert: { name: "Ahmet Baris Ozturk", slug: "ahmet-baris-ozturk", title: "Ruhsal Danismani", bio: "Ruhsal donusum yolculugunuzda size isik tutuyorum." },
    category: { name: "Ruhsal Gelisim", slug: "ruhsal-gelisim", color: "#D3D3FF" },
    isFeatured: false,
    learnings: [
      "Ic sesinizi dinlemeyi ve sezgilerinize guvenmezi ogreneceksiniz",
      "Enerji bedeninizi ve cakra sisteminizi anlayacaksiniz",
      "Derin meditasyon tekniklerini uygulayabileceksiniz",
      "Ruhsal donusum surecini bilineli bir sekilde yoneteceksiniz",
      "Golge calismasi ve ic cocuk iyilesmesi yapabileceksiniz",
    ],
  },
  {
    slug: "nefes-terapi-programi",
    title: "Nefes Terapi Programi",
    description:
      "Farkli nefes tekniklerini ogrenin ve gunluk hayatinizda etkili bir sekilde uygulayin. Pranayama, holotropik nefes ve diger guclu nefes tekniklerini kesfederek bedensel ve zihinsel sagliginizi destekleyin.",
    price: 99,
    isFree: false,
    level: "Baslangic",
    lessonCount: 10,
    duration: 150,
    enrollmentCount: 567,
    rating: 4.6,
    expert: { name: "Zeynep Aslan", slug: "zeynep-aslan", title: "Nefes Terapisti", bio: "Nefes calismalariyla bedeninizin dogal sifa gucunu kesfetmenize yardimci oluyorum." },
    category: { name: "Nefes Teknikleri", slug: "nefes-teknikleri", color: "#B8D4A3" },
    isFeatured: false,
    learnings: [
      "Temel nefes tekniklerini dogru bir sekilde uygulayacaksiniz",
      "Stres ve kaygi anlarinda nefes kontrolu saglayabileceksiniz",
      "Uyku kalitesini artiran nefes pratiklerini ogreneceksiniz",
      "Enerji seviyenizi nefes calismalariyla yukselteceksiniz",
    ],
  },
  {
    slug: "ileri-mindfulness",
    title: "Ileri Seviye Mindfulness",
    description:
      "Mindfulness pratiginizi derinlestirin. Gunluk farkindalik, vucud taramasi ve sevgi dolu sefkat meditasyonlari ile ic dunyaniza derinlemesine dalin.",
    price: 179,
    isFree: false,
    level: "Ileri",
    lessonCount: 18,
    duration: 540,
    enrollmentCount: 234,
    rating: 4.8,
    expert: { name: "Ali Riza Celik", slug: "ali-riza-celik", title: "Mindfulness Kocu", bio: "Anin gucuyle baglanti kurmak icin mindfulness pratigiyle hayatiniza yeni bir bakis acisi katiyorum." },
    category: { name: "Mindfulness", slug: "mindfulness", color: "#E5C85A" },
    isFeatured: false,
    learnings: [
      "Ileri seviye farkindalik meditasyonu tekniklerini ogreneceksiniz",
      "Vucud taramasi ile derin rahatlamayi deneyimleyeceksiniz",
      "Sevgi dolu sefkat (metta) meditasyonunu uygulayacaksiniz",
      "Gunluk hayatta surekli farkindalik durumunu surdurebileceksiniz",
      "Zor duygularla mindful bir sekilde basa cikmayi ogreneceksiniz",
      "Farkindalik temelli stres azaltma (MBSR) tekniklerini kesfedeceksiniz",
    ],
  },
];

const DEMO_LESSONS = [
  { title: "Giriş ve Hoş Geldiniz", duration: 5, isFree: true },
  { title: "Temel Kavramlar", duration: 15, isFree: true },
  { title: "Ilk Pratik", duration: 20, isFree: false },
  { title: "Derinlesme", duration: 25, isFree: false },
  { title: "Gunluk Rutininizi Olusturma", duration: 15, isFree: false },
];

const levelConfig: Record<string, { label: string; variant: "sage" | "gold" | "primary" }> = {
  Baslangic: { label: "Baslangic", variant: "sage" },
  Orta: { label: "Orta", variant: "gold" },
  Ileri: { label: "Ileri", variant: "primary" },
};

function findCourse(slug: string) {
  return DEMO_COURSES.find((c) => c.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = findCourse(slug);

  if (!course) {
    return { title: "Kurs Bulunamadi | Mega Reform" };
  }

  return {
    title: `${course.title} | Mega Reform`,
    description: course.description,
  };
}

export default async function KursDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = findCourse(slug);

  if (!course) {
    notFound();
  }

  const levelInfo = course.level ? levelConfig[course.level] : null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-light/30">
        {/* Hero Section */}
        <section
          className="relative pt-32 pb-16 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${course.category.color}15, ${course.category.color}05, transparent)`,
          }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: course.category.color ?? "#D3D3FF" }}
            />
            <div className="absolute bottom-0 left-20 w-48 h-48 rounded-full bg-lavender/10 blur-3xl" />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-foreground/50 mb-8">
              <Link href="/kurslar" className="hover:text-primary transition-colors">
                Kurslar
              </Link>
              <span>/</span>
              <span className="text-foreground/70">{course.title}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left: Course info */}
              <div className="flex-1 space-y-6">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    className="text-xs"
                    style={{
                      backgroundColor: `${course.category.color}30`,
                      color: course.category.color ?? "#2D1B4E",
                    }}
                  >
                    {course.category.name}
                  </Badge>
                  {levelInfo && (
                    <Badge variant={levelInfo.variant} className="text-xs">
                      {levelInfo.label}
                    </Badge>
                  )}
                  {course.isFeatured && (
                    <Badge variant="cream" className="text-xs">
                      One Cikan
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                  {course.title}
                </h1>

                {/* Description */}
                <p className="text-foreground/70 text-lg leading-relaxed">
                  {course.description}
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/60">
                  {/* Rating */}
                  {course.rating != null && (
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="h-4 w-4 text-gold fill-gold"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                      <span className="font-semibold text-foreground/80">{course.rating.toFixed(1)}</span>
                    </div>
                  )}

                  {/* Enrollment */}
                  <div className="flex items-center gap-1.5">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{course.enrollmentCount.toLocaleString("tr-TR")} katilimci</span>
                  </div>

                  {/* Lessons */}
                  <div className="flex items-center gap-1.5">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{course.lessonCount} ders</span>
                  </div>

                  {/* Duration */}
                  {course.duration != null && (
                    <div className="flex items-center gap-1.5">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{formatDuration(course.duration)}</span>
                    </div>
                  )}
                </div>

                {/* Expert info */}
                <div className="flex items-center gap-3 pt-2">
                  <Avatar src={null} alt={course.expert.name} size="md" />
                  <div>
                    <Link
                      href={`/uzmanlar/${course.expert.slug}`}
                      className="text-sm font-semibold text-primary hover:text-primary-light transition-colors"
                    >
                      {course.expert.name}
                    </Link>
                    <p className="text-xs text-foreground/50">{course.expert.title}</p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <Button variant={course.isFree ? "primary" : "gold"} size="lg">
                    {course.isFree ? "Kursa Katil" : `Kursa Katil - ${formatCurrency(course.price!)}`}
                  </Button>
                  <Button variant="secondary" size="lg">
                    <svg className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="5 3 19 12 5 21 5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
                    </svg>
                    Tanitim Videosunu Izle
                  </Button>
                </div>
              </div>

              {/* Right: Price card (desktop) */}
              <div className="hidden lg:block w-80 shrink-0">
                <Card className="sticky top-28">
                  <CardContent className="space-y-4">
                    {/* Price */}
                    <div className="text-center">
                      {course.isFree ? (
                        <span className="font-heading text-3xl font-bold text-sage">Ucretsiz</span>
                      ) : (
                        <span className="font-heading text-3xl font-bold text-primary">
                          {formatCurrency(course.price!)}
                        </span>
                      )}
                    </div>

                    <Button variant={course.isFree ? "primary" : "gold"} size="lg" className="w-full">
                      {course.isFree ? "Hemen Basla" : "Satin Al"}
                    </Button>

                    {/* Quick info */}
                    <div className="space-y-3 pt-2 text-sm text-foreground/60">
                      <div className="flex items-center justify-between">
                        <span>Ders Sayısı</span>
                        <span className="font-medium text-foreground/80">{course.lessonCount}</span>
                      </div>
                      {course.duration != null && (
                        <div className="flex items-center justify-between">
                          <span>Toplam Sure</span>
                          <span className="font-medium text-foreground/80">{formatDuration(course.duration)}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span>Seviye</span>
                        <span className="font-medium text-foreground/80">{course.level}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Katilimci</span>
                        <span className="font-medium text-foreground/80">{course.enrollmentCount.toLocaleString("tr-TR")}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What you'll learn */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <Card>
                <CardContent className="space-y-6">
                  <h2 className="font-heading text-2xl font-bold text-primary">
                    Bu Kursta Neler Ogreneceksiniz?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.learnings.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage/20">
                          <svg
                            className="h-3 w-3 text-sage"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 12l2 2 4-4"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span className="text-sm text-foreground/70 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* Curriculum */}
        <section className="py-16 bg-white/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="font-heading text-2xl font-bold text-primary mb-8">
                Mufredat
              </h2>
            </ScrollReveal>

            <div className="space-y-3">
              {DEMO_LESSONS.map((lesson, i) => {
                const isAccessible = lesson.isFree || course.isFree;

                return (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <div
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border transition-all duration-200",
                        isAccessible
                          ? "bg-white/80 border-lavender/20 hover:border-sage/40 hover:shadow-sm"
                          : "bg-white/40 border-lavender/10"
                      )}
                    >
                      {/* Lesson number */}
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                          isAccessible
                            ? "bg-sage/20 text-sage"
                            : "bg-lavender/15 text-foreground/40"
                        )}
                      >
                        {i + 1}
                      </div>

                      {/* Title */}
                      <div className="flex-1 min-w-0">
                        <h4
                          className={cn(
                            "text-sm font-medium",
                            isAccessible ? "text-primary" : "text-foreground/50"
                          )}
                        >
                          {lesson.title}
                        </h4>
                      </div>

                      {/* Duration */}
                      <span className="text-xs text-foreground/40 shrink-0">
                        {formatDuration(lesson.duration)}
                      </span>

                      {/* Lock / Free indicator */}
                      {isAccessible ? (
                        <Badge variant="sage" className="text-[10px] shrink-0">
                          Ucretsiz
                        </Badge>
                      ) : (
                        <svg
                          className="h-4 w-4 text-foreground/30 shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                          <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {course.lessonCount > DEMO_LESSONS.length && (
              <p className="mt-4 text-center text-sm text-foreground/40">
                ve {course.lessonCount - DEMO_LESSONS.length} ders daha...
              </p>
            )}
          </div>
        </section>

        {/* Expert Profile Card */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="font-heading text-2xl font-bold text-primary mb-8">
                Egitmen
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Card>
                <CardContent>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <Avatar src={null} alt={course.expert.name} size="xl" breathing />

                    <div className="flex-1 text-center sm:text-left space-y-3">
                      <div>
                        <Link
                          href={`/uzmanlar/${course.expert.slug}`}
                          className="font-heading text-xl font-bold text-primary hover:text-primary-light transition-colors"
                        >
                          {course.expert.name}
                        </Link>
                        <p className="text-sm text-foreground/50 mt-1">{course.expert.title}</p>
                      </div>

                      <p className="text-sm text-foreground/60 leading-relaxed">
                        {course.expert.bio}
                      </p>

                      <Link href={`/uzmanlar/${course.expert.slug}`}>
                        <Button variant="ghost" size="sm">
                          Profili Goruntule
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
