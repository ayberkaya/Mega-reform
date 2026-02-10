import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { UyelikPlanGrid } from "@/components/subscription/uyelik-plan-grid";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

export const metadata: Metadata = {
  title: "Üyelik | Mega Reform",
  description:
    "Size uygun planı seçin. Sınırsız içerik, uzman rehberliği ve kişisel plan.",
};

export default function UyelikPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Hedefine uygun planı seç
            </h1>
            <p className="mt-4 text-lg text-foreground/70">
              Rehberli pratikler, kurslar ve kişisel haftalık planın — hepsi tek
              abonelikte. İstediğin zaman iptal edebilirsin.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mb-4">
            <UyelikPlanGrid />
          </ScrollReveal>

          <p className="mt-12 text-center text-sm text-foreground/50">
            Özel indirim ve kurumsal teklifler için{" "}
            <Link href="/iletisim" className="text-primary hover:underline">
              iletişime geçin
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
