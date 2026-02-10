import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PrimaryPlanCta } from "@/components/cta/PrimaryPlanCta";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "İçeride Ne Var? | Mega Reform",
  description:
    "Rehberli pratikler, makaleler, kurslar ve videolarla ruhsal gelişim yolculuğun.",
};

const BULLETS = [
  "Rehberli meditasyon ve nefes pratikleri",
  "Uzman yazıları ve makaleler",
  "Adım adım kurslar",
  "Videolu içerikler",
  "Kişisel haftalık plan",
] as const;

export default function IcerideNeVarPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            İçeride ne var?
          </h1>
          <p className="mt-4 text-foreground/70">
            Üye olmadan kataloğu inceleyebilir, önizlemeleri dinleyebilir veya
            okuyabilirsin. Tam erişim üyelikle.
          </p>
          <ul className="mt-8 space-y-3">
            {BULLETS.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-foreground/90"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryPlanCta variant="primary" size="lg" />
            <Link
              href="/pratikler"
              className={cn(
                "inline-flex rounded-full border-2 border-lavender px-6 py-3 text-sm font-semibold text-primary",
                "hover:bg-lavender/15 transition-colors"
              )}
            >
              Pratiklere göz at
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
