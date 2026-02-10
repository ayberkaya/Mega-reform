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
      "Meditasyonu hayatınızın bir parçası haline getirmek için adım adım ilerleyeceğiniz kapsamlı bir program. Bu kursta, meditasyonun temel prensiplerini öğrenecek, günlük pratik alışkanlığı geliştirecek ve iç huzurunuzu keşfedeceksiniz.",
    price: null,
    isFree: true,
    level: "Başlangıç",
    lessonCount: 21,
    duration: 315,
    enrollmentCount: 1247,
    rating: 4.9,
    expert: { name: "Ayşe Nur Yılmaz", slug: "ayse-nur-yilmaz", title: "Meditasyon Rehberi", bio: "15 yıllık deneyimle iç huzur yolculuğunuzda rehberlik ediyorum." },
    category: { name: "Meditasyon", slug: "meditasyon", color: "#9DC183" },
    isFeatured: true,
    learnings: [
      "Meditasyonun temel prensiplerini ve tarihçesini öğreneceksiniz",
      "Günlük meditasyon alışkanlığı oluşturmayı başaracaksınız",
      "Nefes farkındalığı ve beden taraması tekniklerini uygulayacaksınız",
      "Stres ve kaygıyı azaltmak için etkili yöntemler geliştireceksiniz",
      "Farkındalık meditasyonu ile anın gücünü keşfedeceksiniz",
      "Kendi meditasyon rutininizi tasarlamayı öğreneceksiniz",
    ],
  },
  {
    slug: "hatha-yoga-temelleri",
    title: "Hatha Yoga Temelleri",
    description:
      "Yoga pratiğinizi güvenli ve doğru bir şekilde başlatırsanız. Temel asanalar ve nefes teknikleri ile bedeninizi ve zihninizi dengeye kavuşturun. Bu kurs, yoga yolculuğunuzun sağlam temeller üzerine inşa edilmesini sağlar.",
    price: 149,
    isFree: false,
    level: "Başlangıç",
    lessonCount: 16,
    duration: 480,
    enrollmentCount: 856,
    rating: 4.8,
    expert: { name: "Mehmet Can Demir", slug: "mehmet-can-demir", title: "Yoga Eğitmeni", bio: "Beden ve ruh uyumunu keşfetmeniz için yanınızdayım." },
    category: { name: "Yoga", slug: "yoga", color: "#D4AF37" },
    isFeatured: false,
    learnings: [
      "Temel yoga asanalarını doğru form ile uygulayacaksınız",
      "Pranayama (nefes teknikleri) ile enerji akışınızı düzenleyeceksiniz",
      "Esneklik ve güç dengenizi geliştireceksiniz",
      "Güvenli yoga pratiği için vücudunuzu dinlemeyi öğreneceksiniz",
      "Evde kendi yoga rutininizi oluşturabileceksiniz",
    ],
  },
  {
    slug: "tarot-okuma-sanati",
    title: "Tarot Okuma Sanati",
    description:
      "Tarot kartlarının dilini öğrenin ve kendi okumalarınızı yapmaya başlayın. Bu kursta büyük ve küçük arkana kartlarının anlamlarını, farklı açılım tekniklerini ve sezgisel okuma yöntemlerini keşfedeceksiniz.",
    price: 199,
    isFree: false,
    level: "Orta",
    lessonCount: 12,
    duration: 360,
    enrollmentCount: 432,
    rating: 4.7,
    expert: { name: "Elif Sena Kara", slug: "elif-sena-kara", title: "Tarot Okuyucusu", bio: "Evrenin mesajlarını birlikte yorumluyoruz." },
    category: { name: "Tarot", slug: "tarot", color: "#4A2D7A" },
    isFeatured: true,
    learnings: [
      "78 tarot kartının anlamlarını derinlemesine öğreneceksiniz",
      "Farklı açılım tekniklerini uygulayabileceksiniz",
      "Sezgisel okuma yeteneklerinizi geliştireceksiniz",
      "Kendiniz ve başkaları için tarot okuması yapabileceksiniz",
      "Kartlar arasındaki ilişkileri ve sembolizmi kavrayacaksınız",
      "Günlük kart çekme pratiği ile rehberlik almayı öğreneceksiniz",
    ],
  },
  {
    slug: "ruhsal-farkindalik",
    title: "Ruhsal Farkındalık ve İç Yolculuk",
    description:
      "Kendinizi derinlemesine keşfetmeniz için hazırlanmış kapsamlı bir ruhsal gelişim programı. İç sesinizi dinlemeyi, enerji bedeninizi anlamayı ve ruhsal dönüşümünüzü başlatmayı öğreneceksiniz.",
    price: 249,
    isFree: false,
    level: "İleri",
    lessonCount: 24,
    duration: 720,
    enrollmentCount: 318,
    rating: 4.9,
    expert: { name: "Ahmet Barış Öztürk", slug: "ahmet-baris-ozturk", title: "Ruhsal Danışmanı", bio: "Ruhsal dönüşüm yolculuğunuzda size ışık tutuyorum." },
    category: { name: "Ruhsal Gelisim", slug: "ruhsal-gelisim", color: "#D3D3FF" },
    isFeatured: false,
    learnings: [
      "İç sesinizi dinlemeyi ve sezgilerinize güvenmeyi öğreneceksiniz",
      "Enerji bedeninizi ve çakra sisteminizi anlayacaksınız",
      "Derin meditasyon tekniklerini uygulayabileceksiniz",
      "Ruhsal dönüşüm sürecini bilinçli bir şekilde yöneteceksiniz",
      "Gölge çalışması ve iç çocuk iyileşmesi yapabileceksiniz",
    ],
  },
  {
    slug: "nefes-terapi-programi",
    title: "Nefes Terapi Programı",
    description:
      "Farklı nefes tekniklerini öğrenin ve günlük hayatınızda etkili bir şekilde uygulayın. Pranayama, holotropik nefes ve diğer güçlü nefes tekniklerini keşfederek bedensel ve zihinsel sağlığınızı destekleyin.",
    price: 99,
    isFree: false,
    level: "Başlangıç",
    lessonCount: 10,
    duration: 150,
    enrollmentCount: 567,
    rating: 4.6,
    expert: { name: "Zeynep Aslan", slug: "zeynep-aslan", title: "Nefes Terapisti", bio: "Nefes çalışmalarıyla bedeninizin doğal şifa gücünü keşfetmenize yardımcı oluyorum." },
    category: { name: "Nefes Teknikleri", slug: "nefes-teknikleri", color: "#B8D4A3" },
    isFeatured: false,
    learnings: [
      "Temel nefes tekniklerini doğru bir şekilde uygulayacaksınız",
      "Stres ve kaygı anlarında nefes kontrolü sağlayabileceksiniz",
      "Uyku kalitesini artıran nefes pratiklerini öğreneceksiniz",
      "Enerji seviyenizi nefes çalışmalarıyla yükselteceksiniz",
    ],
  },
  {
    slug: "ileri-mindfulness",
    title: "İleri Seviye Mindfulness",
    description:
      "Mindfulness pratiğinizi derinleştirin. Günlük farkındalık, vücut taraması ve sevgi dolu şefkat meditasyonları ile iç dünyanıza derinlemesine dalın.",
    price: 179,
    isFree: false,
    level: "İleri",
    lessonCount: 18,
    duration: 540,
    enrollmentCount: 234,
    rating: 4.8,
    expert: { name: "Ali Rıza Çelik", slug: "ali-riza-celik", title: "Mindfulness Koçu", bio: "Anın gücüyle bağlantı kurmak için mindfulness pratiğiyle hayatınıza yeni bir bakış açısı katıyorum." },
    category: { name: "Mindfulness", slug: "mindfulness", color: "#E5C85A" },
    isFeatured: false,
    learnings: [
      "İleri seviye farkındalık meditasyonu tekniklerini öğreneceksiniz",
      "Vücut taraması ile derin rahatlamayı deneyimleyeceksiniz",
      "Sevgi dolu şefkat (metta) meditasyonunu uygulayacaksınız",
      "Günlük hayatta sürekli farkındalık durumunu sürdürebileceksiniz",
      "Zor duygularla mindful bir şekilde başa çıkmayı öğreneceksiniz",
      "Farkındalık temelli stres azaltma (MBSR) tekniklerini keşfedeceksiniz",
    ],
  },
];

const DEMO_LESSONS = [
  { title: "Giriş ve Hoş Geldiniz", duration: 5, isFree: true },
  { title: "Temel Kavramlar", duration: 15, isFree: true },
  { title: "İlk Pratik", duration: 20, isFree: false },
  { title: "Derinleşme", duration: 25, isFree: false },
  { title: "Günlük Rutininizi Oluşturma", duration: 15, isFree: false },
];

const levelConfig: Record<string, { label: string; variant: "sage" | "gold" | "primary" }> = {
  Başlangıç: { label: "Başlangıç", variant: "sage" },
  Orta: { label: "Orta", variant: "gold" },
  İleri: { label: "İleri", variant: "primary" },
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
    return { title: "Kurs Bulunamadı | Mega Reform" };
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
                      Öne Çıkan
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
                    <span>{course.enrollmentCount.toLocaleString("tr-TR")} katılımcı</span>
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
                    {course.isFree ? "Kursa Katıl" : `Kursa Katıl - ${formatCurrency(course.price!)}`}
                  </Button>
                  <Button variant="secondary" size="lg">
                    <svg className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="5 3 19 12 5 21 5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
                    </svg>
                    Tanıtım Videosunu İzle
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
                        <span className="font-heading text-3xl font-bold text-sage">Ücretsiz</span>
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
                        <span>Katılımcı</span>
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
                    Bu Kursta Neler Öğreneceksiniz?
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
                Müfredat
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
                          Ücretsiz
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
                Eğitmen
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
                          Profili Görüntüle
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
