import Link from "next/link";
import { PrimaryPlanCta } from "@/components/cta/PrimaryPlanCta";
import { cn } from "@/lib/utils/cn";

const HEADLINE = "Ruhsal gelişim rastgele olmaz.";
const SUBHEADLINE =
  "Hedefine, zamanına ve seviyene göre oluşturulmuş kişisel plan. Rehberli pratikler. Gerçek ilerleme.";
const TRUST_LINE =
  "Üye olmadan kataloğu gör • Önizlemeleri dinle/oku • Sonra karar ver";

export function Hero() {
  return (
    <section className="relative py-24 md:py-32 bg-background border-b border-lavender/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight">
            {HEADLINE}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-foreground/80 font-body leading-relaxed">
            {SUBHEADLINE}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <PrimaryPlanCta variant="primary" size="lg" />
            <Link
              href="/iceride-ne-var"
              className={cn(
                "inline-flex items-center justify-center rounded-full border-2 border-lavender px-6 py-3 text-sm font-semibold text-primary",
                "hover:bg-lavender/15 transition-colors"
              )}
            >
              İçeride ne var?
            </Link>
          </div>
          <p className="mt-6 text-sm text-foreground/60">
            {TRUST_LINE}
          </p>
        </div>
      </div>
    </section>
  );
}
