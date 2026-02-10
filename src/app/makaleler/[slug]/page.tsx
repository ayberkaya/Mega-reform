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
    title: "Meditasyona Başlamak İçin 7 Temel Adım",
    excerpt:
      "Meditasyona yeni başlayanlar için pratik ipuçları ve günlük rutininize nasıl dahil edebileceğinizi keşfedeceksiniz.",
    readTime: 8,
    publishedAt: "2025-12-15",
    category: { name: "Meditasyon", slug: "meditasyon", color: "#9DC183" },
    expert: {
      name: "Ayşe Nur Yılmaz",
      slug: "ayse-nur-yilmaz",
      title: "Meditasyon Öğretmeni",
    },
    isFeatured: true,
    content: [
      "Meditasyon, binlerce yıllık geçmişe sahip bir iç huzur pratiğidir. Modern yaşamın yoğunluğu içinde zihninizi sakinleştirmek ve içinizde var olan dengeyi yeniden keşfetmek için meditasyon muhteşem bir araçtır.",
      "İlk adım olarak, her gün aynı saatte 5 dakikalık bir meditasyon pratiğiyle başlayın. Sessiz bir ortam seçin, rahat bir pozisyonda oturun ve nefesinize odaklanın. Zihniniz dalındığında, nazikçe dikkatinizi nefesinize geri getirin.",
      "İkinci adım, beklentilerinizi bir kenara bırakmaktır. Meditasyonda 'doğru' ya da 'yanlış' yoktur. Her oturuşun kendine özgü bir deneyim olduğunu kabul edin. Bazı günler zihniniz çok meşgul olacak, diğer günler derin bir sakinlik hissedeceksiniz.",
      "Üçüncü adım, düzenliliktir. Meditasyonu günlük rutininizin bir parçası haline getirin. Sabah uyandığında ya da akşam yatmadan önce meditasyon yapmak, pratiğinizi alışkanlığa dönüştürmenin en etkili yoludur.",
      "Dördüncü adım, rehberli meditasyonlardan yararlanmaktır. Başlangıçta bir rehber eşliğinde meditasyon yapmak, tekniklerinizi geliştirmenize ve motivasyonunuzu korumanıza yardımcı olacaktır.",
      "Beşinci adım, sabır ve şefkattir. Kendinize karşı nazik olun. Meditasyon bir yarış değil, bir yolculuktur. Her adım sizi iç huzurunuza daha da yaklaştırır.",
      "Altıncı adım, farklı meditasyon tekniklerini denemektir. Nefes meditasyonu, vücudu tarama, sevgi-şefkat meditasyonu gibi çeşitli yaklaşımlar deneyerek size en uygun olanı bulabilirsiniz.",
      "Yedinci ve son adım, topluluk desteği aramaktır. Aynı yolculukta olan insanlarla bir arada olmak, pratiğinizi derinleştirir ve motivasyonunuzu artırır.",
    ],
  },
  {
    slug: "yoga-nefes-teknikleri",
    title: "Yogada Nefes Tekniklerinin Önemi",
    excerpt:
      "Pranayama ve diğer nefes tekniklerini yoga pratiğinize nasıl entegre edebileceğinizi öğrenin.",
    readTime: 6,
    publishedAt: "2025-12-10",
    category: { name: "Yoga", slug: "yoga", color: "#D4AF37" },
    expert: {
      name: "Mehmet Can Demir",
      slug: "mehmet-can-demir",
      title: "Yoga Eğitmeni",
    },
    isFeatured: false,
    content: [
      "Yoga pratiğinizde nefes, hareket kadar önemlidir. Pranayama olarak bilinen nefes teknikleri, yoganın temel taşlarından birini oluşturur ve fiziksel pratiğinizi derinleştirir.",
      "Ujjayi nefes, yoganın en temel nefes tekniklerinden biridir. Boğazı hafifçe daraltarak yapılan bu nefes, ısınma sağlar ve iç odaklanmanızı destekler. Her asanada bu nefesi uygulamaya çalışın.",
      "Nadi Shodhana (burun kanatlı nefes), zihinsel dengeyi sağlamak için kullanılır. Sağ ve sol burun delikleri arasında alternatif solunumla sinir sisteminizi dengeye getirebilirsiniz.",
      "Kapalbhati nefesi, enerjik bir temizlik nefesidir. Karın kaslarını kullanarak yapılan hızlı nefes verme hareketleriyle vücudunuzu canlandırır ve zihninizi berraklaştırır.",
      "Nefes pratiğinizi günlük yoga rutininize entegre etmenin en iyi yolu, her seansın başında ve sonunda 5 dakikalık bir pranayama çalışması eklemektir.",
    ],
  },
  {
    slug: "tarot-kartlari-anlami",
    title: "Büyük Arkana: Tarot Kartlarının Derin Anlamları",
    excerpt:
      "22 Büyük Arkana kartının sembolik anlamlarını ve hayatınızdaki yansımalarını keşfedeceksiniz.",
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
      "Tarot kartları, yüzyıllardır insanların kendilerini tanımasına ve yaşam yolculuklarını anlamasına yardımcı olan güçlü sembolik araçlardır. Büyük Arkana, tarot destesinin 22 kartlık özünü oluşturur.",
      "Deli (The Fool) kartı, yeni başlangıçları ve sınırsız potansiyeli temsil eder. Bu kart, hayata güvenle atılmamızı ve maceraya açık olmamızı hatırlatır.",
      "Büyücü (The Magician) kartı, içerideki gücü ve yaratıcılık potansiyelini simgeler. Elinizdeki kaynakları bilinçli kullanarak hayallerinizi gerçekleştirme kapasitenizi gösterir.",
      "Yüksek Rahibe (The High Priestess), sezgilerin ve iç bilgeliğin kapılarını açar. Bu kart, iç sesinize güvenmenizi ve derinlere bakmanızı öğütler.",
      "Her kartın anlamı, çıktığı pozisyona ve yanındaki kartlara göre nüans kazanır. Tarot okuma, bir sanat formu olarak pratik ve sabır gerektirir.",
      "Tarot pratiğinizde en önemli şey, kartlara yaklaşım şeklinizdir. Açık bir zihin ve iyi niyetle yaklaştığınızda, kartlar size en derin içeriklerle cevap verir.",
    ],
  },
  {
    slug: "ruhsal-gelisim-yolculugu",
    title: "Ruhsal Gelişim Yolculuğunda İlk Adımlar",
    excerpt:
      "Kendinizi tanımaya başlamanın ve iç sesinizi dinlemenin yolları üzerine kapsamlı bir rehber.",
    readTime: 10,
    publishedAt: "2025-11-28",
    category: {
      name: "Ruhsal Gelisim",
      slug: "ruhsal-gelisim",
      color: "#D3D3FF",
    },
    expert: {
      name: "Ahmet Barış Öztürk",
      slug: "ahmet-baris-ozturk",
      title: "Yaşam Koçu",
    },
    isFeatured: true,
    content: [
      "Ruhsal gelişim, hayat boyu süren bir iç keşfetme yolculuğudur. Bu yolculukta önemli olan varış noktası değil, yolun kendisidir ve her adım sizi daha derin bir farkındalığa taşır.",
      "Kendinize zaman ayırmak, ruhsal gelişimin temelidir. Günlük hayatın koşturmacasından bir adım geri çekilin ve kendinize sorun: 'Ben gerçekten ne hissediyorum? Ne istiyorum?'",
      "Günlük tutmak, iç dünyanızı keşfetmenin en etkili yollarından biridir. Her gün birkaç dakika ayırarak düşüncelerinizi ve duygularınızı yazıya dökmek, farkındalığınızı derinleştirir.",
      "Doğayla bağlantı kurmak, ruhsal gelişimi destekleyen güçlü bir pratiktir. Doğada yürüyüş yapmak, bir ağacın altında oturmak ya da gökyüzünü seyretmek bile zihninizi sakinleştirir.",
      "Minnettarlık pratiği, bakış açınızı dönüştürür. Her gün minnettar olduğunuz üç şeyi yazarak güne başlamak, pozitif bir zihinsel çerçeveyi beslemenize yardımcı olur.",
    ],
  },
  {
    slug: "mindfulness-gunluk-yasam",
    title: "Günlük Yaşamda Mindfulness Pratiği",
    excerpt:
      "İş, yemek ve yürüyüş gibi günlük aktivitelerde farkındalık pratiğinizi nasıl geliştirebilirsiniz.",
    readTime: 7,
    publishedAt: "2025-11-20",
    category: { name: "Mindfulness", slug: "mindfulness", color: "#E5C85A" },
    expert: {
      name: "Ali Rıza Çelik",
      slug: "ali-riza-celik",
      title: "Mindfulness Eğitmeni",
    },
    isFeatured: false,
    content: [
      "Mindfulness, şu anki ana tam dikkatinizle mevcut olmaktır. Günlük rutininizin her anını bir farkındalık fırsatına dönüştürebilirsiniz.",
      "Yemek yerken mindfulness pratiği yapmak için, her lokmanın tadını, dokusunu ve kokusunu fark edin. Yavaşlayarak ve duyularınıza odaklanarak yemek yemeyi deneyin.",
      "Yürüyüş meditasyonu, hareketli bir mindfulness pratiğidir. Her adımınızı fark ederek, ayağınızın yere temas edişini hissederek yürümek, günlük aktivitelerde bile meditasyon yapabilmenizi sağlar.",
      "İş yerinde mindfulness uygulamak için, bir görev arasında kısa bir nefes molası verin. Üç derin nefes alın ve dikkatinizi şu anda olana getirin.",
      "Günlük mindfulness pratiği, stres seviyenizi azaltır, odaklanmanızı artırır ve genel yaşam kalitenizi yükseltir.",
    ],
  },
  {
    slug: "nefes-calismalari-stres",
    title: "Stresle Başa Çıkmak İçin 5 Nefes Çalışması",
    excerpt:
      "Günlük hayatta karşılaştığınız stres anlarında uygulayabileceğiniz etkili nefes teknikleri.",
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
      "Nefes, stresle başa çıkmanın en hızlı ve en erişilebilir aracıdır. Doğru nefes teknikleriyle sinir sisteminizi anında sakinleştirebilirsiniz.",
      "4-7-8 Tekniği: 4 saniye nefes alın, 7 saniye tutun, 8 saniye yavaşça verin. Bu teknik, parasempatik sinir sisteminizi aktive ederek sakinlik sağlar.",
      "Kutu Nefesi: 4 saniye nefes alın, 4 saniye tutun, 4 saniye verin, 4 saniye bekleyin. Bu teknik odaklanmayı artırır ve zihinsel berraklık getirir.",
      "Karın Nefesi: Ellerinizi karnınıza koyun ve karnınızın şişip inmesini hissederek derin nefes alın. Bu teknik, gerçek derin nefes almanızı sağlar.",
      "Alternatif Burun Nefesi: Sağ burun deliğinizi kapatarak sol burundan nefes alın, sonra sol burun deliğinizi kapatarak sağ burundan verin. Bu teknik dengeyi sağlar.",
      "Bu teknikleri günlük rutininize dahil ederek, stresli anlarda otomatik olarak uygulamaya başlarsınız. Her gün 5 dakikalık bir nefes pratiği, hayatınızı dönüştürebilir.",
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
