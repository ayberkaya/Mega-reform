import Link from "next/link";
import { formatDurationSec } from "@/lib/utils/format";
import type { ContentType } from "@/types/content";
import { cn } from "@/lib/utils/cn";
import { PrimaryPlanCta } from "@/components/cta/PrimaryPlanCta";

export type ExampleWeekItem = {
  dayLabel: string;
  title: string;
  durationSec: number;
  type: ContentType;
  locked: boolean;
  guideName?: string | null;
};

interface ExampleWeekPlanProps {
  planTitle: string;
  items: ExampleWeekItem[];
  ctaHref?: string;
  /** Secondary CTA label (link to ctaHref). Default: "Üyeliği gör" */
  ctaLabel?: string;
}

export function ExampleWeekPlan({
  planTitle,
  items,
  ctaHref = "/uyelik",
  ctaLabel = "Üyeliği gör",
}: ExampleWeekPlanProps) {
  return (
    <div className="rounded-2xl border border-lavender/20 bg-white p-5 md:p-6">
      <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
        {planTitle}
      </h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className={cn(
              "flex items-center gap-3 rounded-xl border border-lavender/15 px-4 py-3",
              item.locked && "bg-foreground/[0.03]"
            )}
          >
            <span className="shrink-0 w-16 text-sm font-medium text-foreground/70">
              {item.dayLabel}
            </span>
            <span className="flex-1 min-w-0 font-body text-sm text-foreground">
              {item.title}
            </span>
            <span className="shrink-0 text-xs text-foreground/50">
              {formatDurationSec(item.durationSec)}
            </span>
            {item.locked && (
              <span className="shrink-0 text-base" aria-hidden>
                🔒
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-foreground/60">
        Bu planın tamamı üyelikle açılır.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <PrimaryPlanCta size="sm" className="px-5 py-2.5" />
        <Link
          href={ctaHref}
          className={cn(
            "inline-block rounded-full border-2 border-lavender px-5 py-2.5 text-sm font-medium text-primary",
            "hover:bg-lavender/15 transition-colors"
          )}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
