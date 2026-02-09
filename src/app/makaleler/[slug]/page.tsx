import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { formatDate, formatReadTime } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Demo data                                                         */
/* ------------------------------------------------------------------ */

const DEMO_ARTICLES = [
  {
    slug: "meditasyona-baslama-rehberi",
    title: "Meditasyona Baslamak Icin 7 Temel Adim",
    excerpt:
      "Meditasyona yeni baslayanlar icin pratik ipuclari ve gunluk rutininize nasil dahil edebileceginizi kesfedeceksiniz.",
    readTime: 8,
    publishedAt: "2025-12-15",
    category: { name: "Meditasyon", slug: "meditasyon", color: "#9DC183" },
    expert: {
      name: "Ayse Nur Yilmaz",
      slug: "ayse-nur-yilmaz",
      title: "Meditasyon Ögretmeni",
    },
    isFeatured: true,
    content: [
      "Meditasyon, binlerce yillik gecmise sahip bir ic huzur pratigidir. Modern yasamin yogunlugu icinde zihninizi sakinlestirmek ve icinizde var olan dengeyi yeniden kesfetmek icin meditasyon muhtesem bir aractir.",
      "Ilk adim olarak, her gun ayni saatte 5 dakikalik bir meditasyon pratigiyle baslayin. Sessiz bir ortam secin, rahat bir pozisyonda oturun ve nefesinize odaklanin. Zihniniz daldiginda, nazikce dikkatinizi nefesinize geri getirin.",
      "Ikinci adim, beklentilerinizi bir kenara birakmaktir. Meditasyonda 'dogru' ya da 'yanlis' yoktur. Her oturusun kendine ozgu bir deneyim oldugunu kabul edin. Bazi gunler zihniniz cok mesgul olacak, diger gunler derin bir sakinlik hissedeceksiniz.",
      "Ucuncu adim, duzenliliktir. Meditasyonu gunluk rutininizin bir parcasi haline getirin. Sabah uyandiginda ya da aksam yatmadan once meditasyon yapmak, pratiginizi aliskanliga donusturmenin en etkili yoludur.",
      "Dorduncu adim, rehberli meditasyonlardan yararlanmaktir. Baslangicta bir rehber esliginde meditasyon yapmak, tekniklerinizi gelistirmenize ve motivasyonunuzu korumananiza yardimci olacaktir.",
      "Besinci adim, sabir ve sefkattir. Kendinize karsi nazik olun. Meditasyon bir yaris degil, bir yolculuktur. Her adim sizi ic huzurunuza daha da yaklastirir.",
      "Altinci adim, farkli meditasyon tekniklerini denemektir. Nefes meditasyonu, vucudu tarama, sevgi-sefkat meditasyonu gibi cesitli yaklasimlar deneyerek size en uygun olani bulabilirsiniz.",
      "Yedinci ve son adim, topluluk destegi aramaktir. Ayni yolculukta olan insanlarla bir arada olmak, pratiginizi derinlestirir ve motivasyonunuzu arttirir.",
    ],
  },
  {
    slug: "yoga-nefes-teknikleri",
    title: "Yogada Nefes Tekniklerinin Onemi",
    excerpt:
      "Pranayama ve diger nefes tekniklerini yoga pratiginize nasil entegre edebileceginizi ogrenin.",
    readTime: 6,
    publishedAt: "2025-12-10",
    category: { name: "Yoga", slug: "yoga", color: "#D4AF37" },
    expert: {
      name: "Mehmet Can Demir",
      slug: "mehmet-can-demir",
      title: "Yoga Egitmeni",
    },
    isFeatured: false,
    content: [
      "Yoga pratiginizde nefes, hareket kadar onemlidir. Pranayama olarak bilinen nefes teknikleri, yoganin temel tasilarindan birini olusturur ve fiziksel pratiginizi derinlestirir.",
      "Ujjayi nefes, yoganin en temel nefes tekniklerinden biridir. Bogazi hafifce daraltarak yapilan bu nefes, isinma saglar ve ic odaklanmanizi destekler. Her asanada bu nefesi uygulamaya calisin.",
      "Nadi Shodhana (burun kanatli nefes), zihinsel dengeyi saglamak icin kullanilir. Sag ve sol burun delikleri arasinda alternatif solunumla sinir sisteminizi dengeye getirebilirsiniz.",
      "Kapalbhati nefesi, enerjik bir temizlik nefesidir. Karin kaslarini kullanarak yapilan hizli nefes verme hareketleriyle vucudunuzu canlandirir ve zihninizi berraklastirir.",
      "Nefes pratiginizi gunluk yoga rutininize entegre etmenin en iyi yolu, her seansin basinda ve sonunda 5 dakikalik bir pranayama calismasi eklemektir.",
    ],
  },
  {
    slug: "tarot-kartlari-anlami",
    title: "Buyuk Arkana: Tarot Kartlarinin Derin Anlamlari",
    excerpt:
      "22 Buyuk Arkana kartinin sembolik anlamlarini ve hayatinizdaki yansimalarini kesfedeceksiniz.",
    readTime: 12,
    publishedAt: "2025-12-05",
    category: { name: "Tarot", slug: "tarot", color: "#4A2D7A" },
    expert: {
      name: "Elif Sena Kara",
      slug: "elif-sena-kara",
      title: "Tarot Okuyucusu",
    },
    isFeatured: false,
    content: [
      "Tarot kartlari, yuzyillardir insanlarin kendilerini tanimasina ve yasam yolculuklarini anlamasina yardimci olan guclu sembolik araclardir. Buyuk Arkana, tarot destesinin 22 kartlik ozunu olusturur.",
      "Deli (The Fool) karti, yeni baslangiclari ve sinirsiз potansiyeli temsil eder. Bu kart, hayata guvenle atilmamizi ve maceraya acik olmamizi hatirlatir.",
      "Buyucu (The Magician) karti, icerideki gucu ve yaraticilik potansiyelini simgeler. Elinizdeki kaynaklari bilinçli kullanarak hayallerinizi gerceklestirme kapasitenizi gosterir.",
      "Yuksek Rahibe (The High Priestess), sezgilerin ve ic bilgeligin kapilarini açar. Bu kart, ic sesinize guvenmenizi ve derinlere bakmanizi oguтler.",
      "Her kartin anlami, ciктigi pozisyona ve yanindaki kartlara gore nüans kazanir. Tarot okuma, bir sanat formu olarak pratik ve sabir gerektirir.",
      "Tarot pratiginizde en önemli sey, kartlara yaklasim seklinizdir. Acik bir zihin ve iyi niyetle yaklastiginizda, kartlar size en derin iceriklerle cevap verir.",
    ],
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
    expert: {
      name: "Ahmet Baris Ozturk",
      slug: "ahmet-baris-ozturk",
      title: "Yasam Kocu",
    },
    isFeatured: true,
    content: [
      "Ruhsal gelisim, hayat boyu süren bir ic kesfetme yolculugudur. Bu yolculukta önemli olan varış noktasi degil, yolun kendisidir ve her adim sizi daha derin bir farkindaliğa tasir.",
      "Kendinize zaman ayirmak, ruhsal gelisimin temelidir. Gunluk hayatin kosturmacasindan bir adim geri cekilin ve kendinize sorun: 'Ben gercekten ne hissediyorum? Ne istiyorum?'",
      "Gunluk tutmak, ic dunyanizi kesfetmenin en etkili yollarindan biridir. Her gun birkaç dakika ayirarak dusuncelerinizi ve duygularinizi yaziya dokmek, farkindaliginizi derinlestirir.",
      "Dogayla baglanti kurmak, ruhsal gelisimi destekleyen guclu bir pratiktir. Dogada yuruyus yapmak, bir agacin altinda oturmak ya da gokyuzunu seyretmek bile zihninizi sakinlestirir.",
      "Minnettarlik pratigi, bakis acinizi donusturur. Her gun minnettar oldugunuz uc seyi yazarak gune baslamak, pozitif bir zihinsel cerceveyi beslemenize yardimci olur.",
    ],
  },
  {
    slug: "mindfulness-gunluk-yasam",
    title: "Gunluk Yasamda Mindfulness Pratigi",
    excerpt:
      "Is, yemek ve yuruyus gibi gunluk aktivitelerde farkindalik pratiginizi nasil gelistirebilirsiniz.",
    readTime: 7,
    publishedAt: "2025-11-20",
    category: { name: "Mindfulness", slug: "mindfulness", color: "#E5C85A" },
    expert: {
      name: "Ali Riza Celik",
      slug: "ali-riza-celik",
      title: "Mindfulness Egitmeni",
    },
    isFeatured: false,
    content: [
      "Mindfulness, su anki ana tam dikkatinizle mevcut olmaktir. Gunluk rutininizin her anini bir farkindalik firsatina donusturebilirsiniz.",
      "Yemek yerken mindfulness pratigi yapmak icin, her lokmanin tadini, dokusunu ve kokusunu farkedin. Yavaslayarak ve duyulariniza odaklanarak yemek yemeyi deneyin.",
      "Yuruyus meditasyonu, hareketli bir mindfulness pratigidir. Her adiminizi farkederek, ayaginizin yere temas edisini hissederek yurumek, gunluk aktivitelerde bile meditasyon yapabilmenizi saglar.",
      "Is yerinde mindfulness uygulamak icin, bir gorev arasinda kisa bir nefes molasi verin. Uc derin nefes alin ve dikkatinizi su anda olana getirin.",
      "Gunluk mindfulness pratigi, stres seviyenizi azaltir, odaklanmanizi arttirir ve genel yasam kalitenizi yukseltir.",
    ],
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
    expert: {
      name: "Zeynep Aslan",
      slug: "zeynep-aslan",
      title: "Nefes Terapisti",
    },
    isFeatured: false,
    content: [
      "Nefes, stresle basa cikmanin en hizli ve en erisilebilir aracidir. Dogru nefes teknikleriyle sinir sisteminizi aninda sakinlestirebilirsiniz.",
      "4-7-8 Tekniği: 4 saniye nefes alin, 7 saniye tutun, 8 saniye yavasca verin. Bu teknik, parasempatik sinir sisteminizi aktive ederek sakinlik saglar.",
      "Kutu Nefesi: 4 saniye nefes alin, 4 saniye tutun, 4 saniye verin, 4 saniye bekleyin. Bu teknik odaklanmayi arttirir ve zihinsel berraklik getirir.",
      "Karin Nefesi: Ellerinizi karniniza koyun ve karninizin sisip inmesini hissederek derin nefes alin. Bu teknik, gercek derin nefes almanizi saglar.",
      "Alternatif Burun Nefesi: Sag burun deliginizi kapatarak sol burundan nefes alin, sonra sol burun deliginizi kapatarak sag burundan verin. Bu teknik dengeyi saglar.",
      "Bu teknikleri gunluk rutininize dahil ederek, stresli anlarda otomatik olarak uygulamaya baslarsiniz. Her gun 5 dakikalik bir nefes pratigi, hayatinizi donusturebilir.",
    ],
  },
];

function findArticle(slug: string) {
  return DEMO_ARTICLES.find((a) => a.slug === slug) ?? null;
}

function getRelatedArticles(currentSlug: string, categorySlug: string) {
  return DEMO_ARTICLES.filter(
    (a) => a.slug !== currentSlug && a.category.slug === categorySlug
  ).slice(0, 3);
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);

  if (!article) {
    return { title: "Makale Bulunamadi" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.expert.name],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug, article.category.slug);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-cream/40 via-white to-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light pb-16 pt-28 md:pt-36 md:pb-24">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-lavender/10 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-gold/10 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Ana sayfaya don
              </Link>
              <span className="text-white/30">|</span>
              <Link
                href="/makaleler"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Makalelere don
              </Link>
            </div>
            {/* Category */}
            <div className="mb-4">
            <Badge
              style={{
                backgroundColor: `${article.category.color}30`,
                color: article.category.color,
              }}
            >
              {article.category.name}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
            <Link
              href={`/uzmanlar/${article.expert.slug}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Avatar alt={article.expert.name} size="sm" />
              <div>
                <span className="font-medium text-white/80">
                  {article.expert.name}
                </span>
                <span className="block text-xs text-white/40">
                  {article.expert.title}
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline text-white/20">|</span>

            <span className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M3 10h18M8 2v4M16 2v4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {formatDate(article.publishedAt)}
            </span>

            <span className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 7v5l3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {formatReadTime(article.readTime)}
            </span>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <article className="prose prose-lg max-w-none">
            {article.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-foreground/80 leading-relaxed mb-6 text-base md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Expert mini card */}
            <Card>
              <CardContent className="flex flex-col items-center text-center gap-3">
                <Avatar alt={article.expert.name} size="lg" breathing />
                <div>
                  <h3 className="font-heading text-lg font-bold text-primary">
                    {article.expert.name}
                  </h3>
                  <p className="text-sm text-foreground/50">
                    {article.expert.title}
                  </p>
                </div>
                <Link href={`/uzmanlar/${article.expert.slug}`}>
                  <Button variant="secondary" size="sm">
                    Profili Gor
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <Card>
                <CardContent className="space-y-4">
                  <h3 className="font-heading text-lg font-bold text-primary">
                    Benzer Yazilar
                  </h3>
                  <div className="space-y-3">
                    {relatedArticles.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/makaleler/${related.slug}`}
                        className="group block rounded-xl border border-lavender/10 p-3 transition-all duration-300 hover:border-lavender/30 hover:bg-lavender/5"
                      >
                        <h4 className="text-sm font-semibold text-primary line-clamp-2 group-hover:text-primary-light transition-colors">
                          {related.title}
                        </h4>
                        <p className="mt-1 text-xs text-foreground/40">
                          {formatReadTime(related.readTime)} &middot;{" "}
                          {related.expert.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Category link */}
            <Card>
              <CardContent className="text-center">
                <p className="text-sm text-foreground/50 mb-3">
                  Bu makale{" "}
                  <span className="font-semibold text-primary">
                    {article.category.name}
                  </span>{" "}
                  kategorisinde yayınlanmıştır.
                </p>
                <Link href="/makaleler">
                  <Button variant="ghost" size="sm">
                    Tüm Makalelere Dön
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-dark via-primary to-primary-light py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 top-10 h-60 w-60 rounded-full bg-lavender/10 blur-3xl" />
          <div className="absolute -left-10 bottom-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl mb-4">
            Tüm Makalelere Sınırsız Erişim
          </h2>
          <p className="text-white/60 text-lg mb-6 max-w-xl mx-auto">
            Premium uyeliginizle tum makalelere, kurslara ve uzman
            danışmanlığına erişim sağlayın.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-white/60 text-sm">
            <span className="flex items-center gap-2">
              <CheckIcon /> Sınırsız makale erişimi
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon /> Özel kurslar
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon /> Uzman danismanligi
            </span>
          </div>
          <Button variant="gold" size="lg">
            Premium Uye Ol
          </Button>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 text-sage"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
