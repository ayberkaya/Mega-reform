import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PrimaryPlanCta } from "@/components/cta/PrimaryPlanCta";
import { SUBSCRIPTION_PLANS } from "@/lib/utils/constants";
import { cn } from "@/lib/utils/cn";

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center">
            Üyelik planları
          </h1>
          <p className="mt-4 text-foreground/70 text-center max-w-xl mx-auto">
            Hedefine göre planını oluştur; rehberli pratiklerle ilerle.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div
                key={plan.id}
                className="rounded-2xl border border-lavender/20 bg-white p-6 flex flex-col"
              >
                <h2 className="font-heading text-lg font-semibold text-primary">
                  {plan.name}
                </h2>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  {plan.price === 0 ? "Ücretsiz" : `₺${plan.price}`}
                  {plan.price > 0 && (
                    <span className="text-sm font-normal text-foreground/60">
                      {plan.price > 0 ? " / ay" : ""}
                    </span>
                  )}
                </p>
                <p className="mt-2 text-sm text-foreground/60">
                  {plan.description}
                </p>
                <ul className="mt-4 space-y-2 flex-1">
                  {plan.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="text-sm text-foreground/80 flex gap-2">
                      <span className="text-sage">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.price > 0 && (
                  <PrimaryPlanCta
                    variant="secondary"
                    size="sm"
                    className="mt-6 w-full justify-center"
                  />
                )}
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-foreground/50">
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
