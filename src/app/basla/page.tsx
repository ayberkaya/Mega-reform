import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PrimaryPlanCta } from "@/components/cta/PrimaryPlanCta";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Sana Özel Planını Oluştur | Mega Reform",
  description:
    "Hedefine, zamanına ve seviyene göre kişisel plan. Rehberli pratiklerle ilerle.",
};

export default function BaslaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Sana özel planını oluştur
          </h1>
          <p className="mt-4 text-foreground/70">
            Hedefine ve deneyim seviyene göre haftalık pratik planı hazırlıyoruz.
            Niyetini seç, planını al.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryPlanCta
              variant="primary"
              size="lg"
              className="inline-flex items-center justify-center rounded-full h-12 px-8 font-semibold"
            />
            <Link
              href="/giris"
              className="inline-flex items-center justify-center rounded-full border-2 border-lavender px-8 py-3 text-sm font-medium text-primary hover:bg-lavender/15 transition-colors"
            >
              Zaten üyeyim
            </Link>
          </div>
          <p className="mt-6 text-sm text-foreground/60">
            Ücretsiz. Planını oluştur, sonra istersen kayıt olup tam erişime geç.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
