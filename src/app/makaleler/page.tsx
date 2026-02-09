import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ArticleListingClient } from "./article-listing-client";

export const revalidate = 1800; // 30 min
export const metadata: Metadata = {
  title: "Makaleler",
  description:
    "Meditasyon, yoga, tarot ve ruhsal gelişim hakkında uzman yazılarını keşfedeceksiniz. Ruhsal gelişim yolculuğunuza ilham katacak içeriklere göz atın.",
};

const DEMO_ARTICLES = [
  {
    slug: "meditasyona-baslama-rehberi",
    title: "Meditasyona Baslamak Icin 7 Temel Adim",
    excerpt:
      "Meditasyona yeni baslayanlar icin pratik ipuclari ve gunluk rutininize nasil dahil edebileceginizi kesfedeceksiniz.",
    readTime: 8,
    publishedAt: "2025-12-15",
    category: { name: "Meditasyon", slug: "meditasyon", color: "#9DC183" },
    expert: { name: "Ayse Nur Yilmaz", slug: "ayse-nur-yilmaz" },
    isFeatured: true,
  },
  {
    slug: "yoga-nefes-teknikleri",
    title: "Yogada Nefes Tekniklerinin Onemi",
    excerpt:
      "Pranayama ve diger nefes tekniklerini yoga pratiginize nasil entegre edebileceginizi ogrenin.",
    readTime: 6,
    publishedAt: "2025-12-10",
    category: { name: "Yoga", slug: "yoga", color: "#D4AF37" },
    expert: { name: "Mehmet Can Demir", slug: "mehmet-can-demir" },
    isFeatured: false,
  },
  {
    slug: "tarot-kartlari-anlami",
    title: "Buyuk Arkana: Tarot Kartlarinin Derin Anlamlari",
    excerpt:
      "22 Buyuk Arkana kartinin sembolik anlamlarini ve hayatinizdaki yansimalarini kesfedeceksiniz.",
    readTime: 12,
    publishedAt: "2025-12-05",
    category: { name: "Tarot", slug: "tarot", color: "#4A2D7A" },
    expert: { name: "Elif Sena Kara", slug: "elif-sena-kara" },
    isFeatured: false,
  },
  {
    slug: "ruhsal-gelisim-yolculugu",
    title: "Ruhsal Gelisim Yolculugunda Ilk Adimlar",
    excerpt:
      "Kendinizi tanimaya baslamanin ve ic sesinizi dinlemenin yollari uzerine kapsamli bir rehber.",
    readTime: 10,
    publishedAt: "2025-11-28",
    category: {
      name: "Ruhsal Gelisim",
      slug: "ruhsal-gelisim",
      color: "#D3D3FF",
    },
    expert: { name: "Ahmet Baris Ozturk", slug: "ahmet-baris-ozturk" },
    isFeatured: true,
  },
  {
    slug: "mindfulness-gunluk-yasam",
    title: "Gunluk Yasamda Mindfulness Pratigi",
    excerpt:
      "Is, yemek ve yuruyus gibi gunluk aktivitelerde farkindalik pratiginizi nasil gelistirebilirsiniz.",
    readTime: 7,
    publishedAt: "2025-11-20",
    category: { name: "Mindfulness", slug: "mindfulness", color: "#E5C85A" },
    expert: { name: "Ali Riza Celik", slug: "ali-riza-celik" },
    isFeatured: false,
  },
  {
    slug: "nefes-calismalari-stres",
    title: "Stresle Basa Cikmak Icin 5 Nefes Calismasi",
    excerpt:
      "Gunluk hayatta karsilastiginiz stres anlarinda uygulayabileceginiz etkili nefes teknikleri.",
    readTime: 5,
    publishedAt: "2025-11-15",
    category: {
      name: "Nefes Teknikleri",
      slug: "nefes-teknikleri",
      color: "#B8D4A3",
    },
    expert: { name: "Zeynep Aslan", slug: "zeynep-aslan" },
    isFeatured: false,
  },
] as const;

const CATEGORIES = [
  { name: "Meditasyon", slug: "meditasyon" },
  { name: "Yoga", slug: "yoga" },
  { name: "Tarot", slug: "tarot" },
  { name: "Ruhsal Gelisim", slug: "ruhsal-gelisim" },
  { name: "Mindfulness", slug: "mindfulness" },
  { name: "Nefes Teknikleri", slug: "nefes-teknikleri" },
];

export default function MakalelerPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-cream/40 via-white to-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light pb-16 pt-28 md:pt-36 md:pb-24">
          {/* Decorative elements */}
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
                Makaleler
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-white/60 md:text-xl">
                Ruhsal gelişim yolculuğunuza ilham katacak yazılar
              </p>
            </div>
          </div>
        </section>

        {/* Articles listing */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-20">
          <ArticleListingClient
            articles={DEMO_ARTICLES as any}
            categories={CATEGORIES}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
