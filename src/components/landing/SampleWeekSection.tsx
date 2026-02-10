import type { ExampleWeekItem } from "@/components/value/ExampleWeekPlan";
import { ExampleWeekPlan } from "@/components/value/ExampleWeekPlan";

const PLAN_TITLE =
  "Örnek 7 Günlük Plan (senin planın hedeflerine göre değişir)";

interface SampleWeekSectionProps {
  items: ExampleWeekItem[];
}

export function SampleWeekSection({ items }: SampleWeekSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-background border-b border-lavender/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ExampleWeekPlan
          planTitle={PLAN_TITLE}
          items={items}
          ctaHref="/uyelik"
          ctaLabel="Planımı Aç"
        />
      </div>
    </section>
  );
}
