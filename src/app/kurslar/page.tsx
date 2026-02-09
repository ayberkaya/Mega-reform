import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CourseListingClient } from "@/components/courses/course-listing-client";

export const revalidate = 3600; // 1 hr
export const metadata: Metadata = {
  title: "Kurslar | Mega Reform",
  description:
    "Meditasyon, yoga, tarot ve ruhsal gelişim kurslarımızı keşfedin. Uzman rehberler eşliğinde kendi hızınızda ilerleyin.",
};

// Demo data for development
const DEMO_COURSES = [
  {
    slug: "meditasyona-giris",
    title: "Meditasyona Giriş: 21 Günlük Program",
    description:
      "Meditasyonu hayatinizin bir parcasi haline getirmek icin adim adim ilerleyeceginiz kapsamli bir program.",
    price: null,
    isFree: true,
    level: "Baslangic",
    lessonCount: 21,
    duration: 315,
    enrollmentCount: 1247,
    rating: 4.9,
    expert: { name: "Ayse Nur Yilmaz", slug: "ayse-nur-yilmaz" },
    category: { name: "Meditasyon", slug: "meditasyon", color: "#9DC183" },
    isFeatured: true,
  },
  {
    slug: "hatha-yoga-temelleri",
    title: "Hatha Yoga Temelleri",
    description:
      "Yoga pratiginizi guvenli ve dogru bir sekilde baslatirsaniz. Temel asanalar ve nefes teknikleri.",
    price: 149,
    isFree: false,
    level: "Baslangic",
    lessonCount: 16,
    duration: 480,
    enrollmentCount: 856,
    rating: 4.8,
    expert: { name: "Mehmet Can Demir", slug: "mehmet-can-demir" },
    category: { name: "Yoga", slug: "yoga", color: "#D4AF37" },
    isFeatured: false,
  },
  {
    slug: "tarot-okuma-sanati",
    title: "Tarot Okuma Sanati",
    description:
      "Tarot kartlarinin dilini ogrenin ve kendi okumalarinizi yapmaya baslayin.",
    price: 199,
    isFree: false,
    level: "Orta",
    lessonCount: 12,
    duration: 360,
    enrollmentCount: 432,
    rating: 4.7,
    expert: { name: "Elif Sena Kara", slug: "elif-sena-kara" },
    category: { name: "Tarot", slug: "tarot", color: "#4A2D7A" },
    isFeatured: true,
  },
  {
    slug: "ruhsal-farkindalik",
    title: "Ruhsal Farkindalik ve Ic Yolculuk",
    description:
      "Kendinizi derinlemesine kesfetmeniz icin hazirlanmis kapsamli bir ruhsal gelisim programi.",
    price: 249,
    isFree: false,
    level: "Ileri",
    lessonCount: 24,
    duration: 720,
    enrollmentCount: 318,
    rating: 4.9,
    expert: { name: "Ahmet Baris Ozturk", slug: "ahmet-baris-ozturk" },
    category: { name: "Ruhsal Gelisim", slug: "ruhsal-gelisim", color: "#D3D3FF" },
    isFeatured: false,
  },
  {
    slug: "nefes-terapi-programi",
    title: "Nefes Terapi Programi",
    description:
      "Farkli nefes tekniklerini ogrenin ve gunluk hayatinizda etkili bir sekilde uygulayin.",
    price: 99,
    isFree: false,
    level: "Baslangic",
    lessonCount: 10,
    duration: 150,
    enrollmentCount: 567,
    rating: 4.6,
    expert: { name: "Zeynep Aslan", slug: "zeynep-aslan" },
    category: { name: "Nefes Teknikleri", slug: "nefes-teknikleri", color: "#B8D4A3" },
    isFeatured: false,
  },
  {
    slug: "ileri-mindfulness",
    title: "Ileri Seviye Mindfulness",
    description:
      "Mindfulness pratiginizi derinlestirin. Gunluk farkindalik, vucud taramasi ve sevgi dolu sefkat meditasyonlari.",
    price: 179,
    isFree: false,
    level: "Ileri",
    lessonCount: 18,
    duration: 540,
    enrollmentCount: 234,
    rating: 4.8,
    expert: { name: "Ali Riza Celik", slug: "ali-riza-celik" },
    category: { name: "Mindfulness", slug: "mindfulness", color: "#E5C85A" },
    isFeatured: false,
  },
];

const DEMO_CATEGORIES = [
  { name: "Meditasyon", slug: "meditasyon" },
  { name: "Yoga", slug: "yoga" },
  { name: "Tarot", slug: "tarot" },
  { name: "Ruhsal Gelisim", slug: "ruhsal-gelisim" },
  { name: "Nefes Teknikleri", slug: "nefes-teknikleri" },
  { name: "Mindfulness", slug: "mindfulness" },
];

export default function KurslarPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-cream/40 via-white to-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light pb-16 pt-28 md:pt-36 md:pb-24">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-lavender/10 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-gold/10 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Ana sayfaya don
            </Link>
            <div className="text-center">
              <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4">
                Kurslar
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-white/60 md:text-xl">
                Uzman rehberler esliginde kendi hizinizda ilerleyin. Meditasyon, yoga ve ruhsal gelisim kurslarini kesfedin.
              </p>
            </div>
          </div>
        </section>

        {/* Course Listing */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-20">
          <CourseListingClient courses={DEMO_COURSES} categories={DEMO_CATEGORIES} />
        </section>
      </main>
      <Footer />
    </>
  );
}
