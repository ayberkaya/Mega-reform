import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { ExpertProfileTabs } from "@/components/experts/expert-profile-tabs";

/* -------------------------------------------------------------------------- */
/*  Demo Data                                                                  */
/* -------------------------------------------------------------------------- */

const DEMO_EXPERTS = [
  {
    slug: "ayse-nur-yilmaz",
    name: "Ayse Nur Yilmaz",
    title: "Meditasyon Rehberi",
    specialties: ["Meditasyon", "Mindfulness"],
    rating: 4.9,
    reviewCount: 47,
    bio: "15 yillik deneyimle ic huzur yolculugunuzda rehberlik ediyorum. Mindfulness ve meditasyon teknikleriyle hayatiniza denge katiyorum.",
    longBio:
      "15 yildir meditasyon ve mindfulness alaninda calisiyorum. Hindistan ve Nepal'de aldigi egitimlerle Dogu felsefesini modern yasama uyarliyorum.\n\nHer birey icin ozel tasarlanmis meditasyon programlariyla, stres yonetimi, uyku duzeni ve duygusal denge konularinda destek sunuyorum. Grup seanslari ve bireysel danismanlik hizmetlerimle yuzlerce kisinin ic huzurunu bulmasi icin yol gosterdim.\n\nAmacim, herkesin kendi ic sesini duyabilecegi bir alan yaratmak ve bilincliligi gunluk yasama entegre etmektir.",
    isVerified: true,
    yearsExperience: 15,
    website: "https://aysenur.example.com",
    socialLinks: { instagram: "aysenur_meditation", youtube: "AyseNurYilmaz" },
  },
  {
    slug: "mehmet-can-demir",
    name: "Mehmet Can Demir",
    title: "Yoga Egitmeni",
    specialties: ["Yoga", "Nefes Teknikleri"],
    rating: 4.8,
    reviewCount: 35,
    bio: "Beden ve ruh uyumunu kesfetmeniz icin yaninizdayim. Hatha ve Vinyasa yoga derslerimle ic dengenizi bulun.",
    longBio:
      "Yoga pratigiyle 12 yildir hayatimi sekillendiriyorum. Rishikesh'te 500 saatlik yoga ogretmenlik egitimimi tamamladiktan sonra Turkiye'de yoga ogretmenligine basladim.\n\nHatha, Vinyasa ve restoratif yoga derslerimle bedensel ve zihinsel sagliginizi destekliyorum. Nefes tekniklerini yoga pratigiyle birlestirerek butunsel bir iyilesme deneyimi sunuyorum.",
    isVerified: true,
    yearsExperience: 12,
    website: null,
    socialLinks: { instagram: "mehmetcan_yoga" },
  },
  {
    slug: "elif-sena-kara",
    name: "Elif Sena Kara",
    title: "Tarot Okuyucusu",
    specialties: ["Tarot", "Ruhsal Gelisim"],
    rating: 4.7,
    reviewCount: 28,
    bio: "Evrenin mesajlarini birlikte yorumluyoruz. Tarot okumalarimla yasam yolculugunuzda ilham bulun.",
    longBio:
      "8 yildir tarot ve ruhsal gelisim alaninda calisiyorum. Rider-Waite ve Marseille tarot desteleriyle calisarak, danisanlarima yasam yolculuklarinda rehberlik ediyorum.\n\nTarot okumalari ile bireysel farkindalik seanslarini birlestirerek butunsel bir ruhsal gelisim deneyimi sunuyorum.",
    isVerified: false,
    yearsExperience: 8,
    website: null,
    socialLinks: {},
  },
  {
    slug: "ahmet-baris-ozturk",
    name: "Ahmet Baris Ozturk",
    title: "Ruhsal Danismani",
    specialties: ["Ruhsal Gelisim", "Meditasyon"],
    rating: 4.9,
    reviewCount: 52,
    bio: "Ruhsal donusum yolculugunuzda size isik tutuyorum. Kisisel gelisim ve farkindalik seanslarimla kendinizi kesfedeceksiniz.",
    longBio:
      "20 yillik deneyimimle ruhsal gelisim ve meditasyon alanlarinda binlerce kisiye rehberlik ettim. Bireysel danismanlik ve grup calismalariyla katilimcilarin ic dunyalarini kesfetmelerine yardimci oluyorum.\n\nYontemim, Dogu ve Bati felsefelerini harmanlayarak modern insanin ihtiyaclarina uygun bir ruhsal gelisim yolu sunmaktir.",
    isVerified: true,
    yearsExperience: 20,
    website: "https://ahmetbaris.example.com",
    socialLinks: { instagram: "ahmetbaris_spiritual", youtube: "AhmetBarisOzturk" },
  },
  {
    slug: "zeynep-aslan",
    name: "Zeynep Aslan",
    title: "Nefes Terapisti",
    specialties: ["Nefes Teknikleri", "Mindfulness"],
    rating: 4.6,
    reviewCount: 19,
    bio: "Nefes calismalariyla bedeninizin dogal sifa gucunu kesfetmenize yardimci oluyorum.",
    longBio:
      "Nefes terapisi alaninda 6 yildir calisiyorum. Pranayama, holotropik nefes ve modern nefes teknikleriyle bedenin dogal iyilesme mekanizmalarini harekete geciriyorum.\n\nSeans calismalari ile stres, kaygi ve uyku problemlerine dogal cozumler sunuyorum.",
    isVerified: false,
    yearsExperience: 6,
    website: null,
    socialLinks: { instagram: "zeynep_breathwork" },
  },
  {
    slug: "ali-riza-celik",
    name: "Ali Riza Celik",
    title: "Mindfulness Kocu",
    specialties: ["Mindfulness", "Yoga"],
    rating: 4.8,
    reviewCount: 31,
    bio: "Anin gucuyle baglanti kurmak icin mindfulness pratigiyle hayatiniza yeni bir bakis acisi katiyorum.",
    longBio:
      "10 yildir mindfulness ve farkindalik calismalariyla bireylere ve kurumlara hizmet veriyorum. MBSR (Mindfulness Tabanli Stres Azaltma) sertifikali egitimciyim.\n\nGunluk yasama entegre edilebilen pratik mindfulness teknikleri ile is-yasam dengesini kurmaniza ve zihinsel berrakliga ulasmaniza yardimci oluyorum.",
    isVerified: true,
    yearsExperience: 10,
    website: "https://aliriza.example.com",
    socialLinks: { instagram: "aliriza_mindful" },
  },
];

const DEMO_REVIEWS = [
  {
    id: "rev-1",
    content:
      "Seanslar gercekten hayatimi degistirdi. Cok huzurlu ve profesyonel bir ortam. Kesinlikle tavsiye ederim!",
    rating: 5,
    createdAt: new Date("2025-12-15"),
    user: { name: "Derya K.", image: null },
    replies: [
      {
        id: "reply-1",
        content: "Guzel sozleriniz icin cok tesekkur ederim! Yolculugunuzda yanimda olmaktan mutluluk duyuyorum.",
        createdAt: new Date("2025-12-16"),
      },
    ],
  },
  {
    id: "rev-2",
    content:
      "Ilk kez denedim ve beklentimin cok otesinde bir deneyim oldu. Kendimi cok daha iyi hissediyorum.",
    rating: 5,
    createdAt: new Date("2025-11-22"),
    user: { name: "Burak M.", image: null },
    replies: [],
  },
  {
    id: "rev-3",
    content:
      "Harika bir uzman! Anlattiklari cok acik ve uygulanabilir. Gunluk hayatima entegre etmeye basladim bile.",
    rating: 4,
    createdAt: new Date("2025-10-08"),
    user: { name: "Selin T.", image: null },
    replies: [],
  },
];

/* -------------------------------------------------------------------------- */
/*  Data Fetching                                                              */
/* -------------------------------------------------------------------------- */

async function getExpert(slug: string) {
  try {
    const expert = await prisma.expertProfile.findFirst({
      where: { slug, isActive: true },
      include: {
        user: { select: { name: true, image: true } },
      },
    });

    if (expert) {
      return {
        slug: expert.slug,
        name: expert.user.name ?? "Uzman",
        title: expert.title,
        specialties: expert.specialties as string[],
        rating: expert.rating ?? 0,
        reviewCount: expert.reviewCount ?? 0,
        bio: expert.longBio ?? "",
        longBio: expert.longBio,
        isVerified: expert.isVerified,
        yearsExperience: expert.yearsExperience ?? 0,
        image: expert.profileImage ?? expert.user.image,
        coverImage: expert.coverImage,
        website: expert.website,
        socialLinks: (expert.socialLinks as Record<string, string>) ?? {},
      };
    }
  } catch {
    // Database unavailable, fall through to demo data
  }

  // Fall back to demo data
  const demo = DEMO_EXPERTS.find((e) => e.slug === slug);
  if (!demo) return null;

  return {
    ...demo,
    image: null as string | null,
    coverImage: null as string | null,
  };
}

async function getExpertContent(slug: string, currentUserId?: string | null) {
  try {
    const expert = await prisma.expertProfile.findFirst({
      where: { slug, isActive: true },
      select: { id: true },
    });

    if (!expert) {
      return {
        articles: [],
        courses: [],
        reviews: DEMO_REVIEWS,
        expertId: null,
        hasCommented: false,
      };
    }

    const [articles, courses, reviews, hasCommentedResult] = await Promise.all([
      prisma.article.findMany({
        where: { expertId: expert.id, status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          readTime: true,
          publishedAt: true,
        },
      }),
      prisma.course.findMany({
        where: { expertId: expert.id, status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          coverImage: true,
          lessonCount: true,
          level: true,
          enrollmentCount: true,
        },
      }),
      prisma.comment.findMany({
        where: { expertId: expert.id, isApproved: true, parentId: null },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          content: true,
          rating: true,
          createdAt: true,
          user: { select: { name: true, image: true } },
          replies: {
            where: { isApproved: true },
            select: { id: true, content: true, createdAt: true },
            orderBy: { createdAt: "asc" },
          },
        },
      }),
      currentUserId
        ? prisma.comment.findFirst({
            where: {
              expertId: expert.id,
              userId: currentUserId,
              parentId: null,
            },
            select: { id: true },
          })
        : Promise.resolve(null),
    ]);

    return {
      articles,
      courses,
      reviews: reviews.length > 0 ? reviews : DEMO_REVIEWS,
      expertId: expert.id,
      hasCommented: !!hasCommentedResult,
    };
  } catch {
    return {
      articles: [],
      courses: [],
      reviews: DEMO_REVIEWS,
      expertId: null,
      hasCommented: false,
    };
  }
}

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                   */
/* -------------------------------------------------------------------------- */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const expert = await getExpert(slug);

  if (!expert) {
    return { title: "Uzman Bulunamadı | Mega Reform" };
  }

  return {
    title: `${expert.name} - ${expert.title} | Mega Reform`,
    description: expert.bio,
    openGraph: {
      title: `${expert.name} - ${expert.title}`,
      description: expert.bio,
      type: "profile",
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Page Component                                                             */
/* -------------------------------------------------------------------------- */

export default async function ExpertDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [expert, session] = await Promise.all([getExpert(slug), auth()]);

  if (!expert) {
    notFound();
  }

  const content = await getExpertContent(slug, session?.user?.id);
  const { articles, courses, reviews, expertId, hasCommented } = content;
  const currentUserId = session?.user?.id ?? null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-light/30">
        {/* Cover / Hero Area */}
        <section className="relative">
          {/* Gradient Cover */}
          <div className="h-48 md:h-64 bg-gradient-to-br from-primary-dark via-primary to-primary-light">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-8 left-1/4 w-72 h-72 rounded-full bg-lavender/10 blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-56 h-56 rounded-full bg-sage/10 blur-3xl" />
              <div className="absolute top-12 right-12 w-32 h-32 rounded-full bg-gold/10 blur-2xl" />
            </div>
          </div>

          {/* Expert Info Card */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-lavender/20 shadow-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <Avatar
                    src={expert.image}
                    alt={expert.name}
                    size="xl"
                    breathing
                  />
                  {expert.isVerified && (
                    <span
                      className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-sage text-white shadow-lg"
                      title="Doğrulanmış Uzman"
                    >
                      <svg
                        className="h-4.5 w-4.5"
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
                    </span>
                  )}
                </div>

                {/* Expert Details */}
                <div className="flex-1 text-center md:text-left space-y-3">
                  <div>
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                      <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary">
                        {expert.name}
                      </h1>
                      {expert.isVerified && (
                        <Badge variant="sage" className="text-xs">
                          Doğrulanmış
                        </Badge>
                      )}
                    </div>
                    <p className="text-foreground/60 text-base">{expert.title}</p>
                  </div>

                  {/* Rating & Stats */}
                  <div className="flex items-center justify-center md:justify-start gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <StarRating rating={expert.rating} size="sm" />
                      <span className="font-semibold text-primary">
                        {expert.rating.toFixed(1)}
                      </span>
                      <span className="text-foreground/40">
                        ({expert.reviewCount} yorum)
                      </span>
                    </div>
                    {expert.yearsExperience > 0 && (
                      <>
                        <span className="text-lavender/40">|</span>
                        <span className="text-gold font-medium">
                          {expert.yearsExperience} yıl deneyim
                        </span>
                      </>
                    )}
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    {expert.specialties.map((specialty) => (
                      <Badge key={specialty} variant="sage">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Bio */}
                  <p className="text-foreground/70 text-sm leading-relaxed max-w-2xl">
                    {expert.bio}
                  </p>

                  {/* Social / external links: new tab, clearly marked */}
                  {expert.socialLinks && Object.keys(expert.socialLinks).length > 0 && (
                    <div className="flex items-center justify-center md:justify-start gap-3 pt-1">
                      {expert.socialLinks.instagram && (
                        <a
                          href={`https://instagram.com/${expert.socialLinks.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/40 hover:text-primary transition-colors duration-200"
                          title="Instagram (Dış bağlantı)"
                        >
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                        </a>
                      )}
                      {expert.socialLinks.youtube && (
                        <a
                          href={`https://youtube.com/@${expert.socialLinks.youtube}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/40 hover:text-primary transition-colors duration-200"
                          title="YouTube (Dış bağlantı)"
                        >
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                        </a>
                      )}
                      {expert.website && (
                        <a
                          href={expert.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/40 hover:text-primary transition-colors duration-200"
                          title="Web sitesi (Dış bağlantı)"
                        >
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 shrink-0">
                  <Button variant="primary" size="md">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Mesaj Gönder
                  </Button>
                  <Button variant="secondary" size="md">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Takip Et
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ExpertProfileTabs
            aboutContent={expert.longBio ?? null}
            articles={articles}
            courses={courses}
            reviews={reviews}
            expertId={expertId}
            currentUserId={currentUserId}
            hasCommented={hasCommented}
          />
        </section>

        {/* Back Link */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <Link
            href="/uzmanlar"
            className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-primary transition-colors duration-200"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Tüm Uzmanlara Dön
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
