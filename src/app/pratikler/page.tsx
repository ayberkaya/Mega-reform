import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PrimaryPlanCta } from "@/components/cta/PrimaryPlanCta";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Pratikler | Mega Reform",
  description:
    "Meditasyon, mindfulness ve rehberli pratikler kataloğu. Önizleme ücretsiz.",
};

export default function PratiklerPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Pratikler
          </h1>
          <p className="mt-4 text-foreground/70">
            Tüm rehberli pratiklere buradan göz atabilirsin. Önizlemeler
            ücretsiz; tam erişim üyelikle.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link
              href="/makaleler"
              className="rounded-2xl border border-lavender/20 bg-white p-6 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <h2 className="font-heading text-lg font-semibold text-primary">
                Makaleler
              </h2>
              <p className="mt-1 text-sm text-foreground/60">
                Uzman yazıları ve rehberler
              </p>
            </Link>
            <Link
              href="/kurslar"
              className="rounded-2xl border border-lavender/20 bg-white p-6 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <h2 className="font-heading text-lg font-semibold text-primary">
                Kurslar
              </h2>
              <p className="mt-1 text-sm text-foreground/60">
                Adım adım eğitimler
              </p>
            </Link>
            <Link
              href="/videolar"
              className="rounded-2xl border border-lavender/20 bg-white p-6 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <h2 className="font-heading text-lg font-semibold text-primary">
                Videolar
              </h2>
              <p className="mt-1 text-sm text-foreground/60">
                Görüntülü içerikler
              </p>
            </Link>
            <Link
              href="/icerikler"
              className="rounded-2xl border border-lavender/20 bg-white p-6 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <h2 className="font-heading text-lg font-semibold text-primary">
                İçerik kataloğu
              </h2>
              <p className="mt-1 text-sm text-foreground/60">
                Seçilmiş içerikler
              </p>
            </Link>
          </div>
          <div className="mt-12 flex justify-center">
            <PrimaryPlanCta variant="primary" size="lg" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
