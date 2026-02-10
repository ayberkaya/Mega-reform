"use client";

import type { PlanOutline } from "@/lib/plan-builder/storage";

export interface Step8PlanRevealProps {
  plan: PlanOutline;
  personalSentence: string;
  onOpenPlan: () => void;
  onBrowseCatalog: (e: React.MouseEvent) => void;
  onReset?: () => void;
  showReset?: boolean;
}

export function Step8PlanReveal({
  plan,
  personalSentence,
  onOpenPlan,
  onBrowseCatalog,
  onReset,
  showReset = false,
}: Step8PlanRevealProps) {
  const week1 = plan.days.slice(0, 7);

  return (
    <div className="space-y-4 pb-2">
      <h3 className="font-heading text-lg font-semibold text-foreground leading-tight">
        {plan.title}
      </h3>
      <p className="text-sm text-foreground/80 leading-relaxed">
        {personalSentence}
      </p>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-foreground/60">
          Hafta 1 (Gün 1–7)
        </p>
        <ul className="space-y-1.5 text-sm" aria-label="İlk 7 gün">
          {week1.map((d) => (
            <li
              key={d.day}
              className="flex items-center gap-2 text-foreground/85"
            >
              <span
                className="shrink-0 text-base opacity-70"
                aria-label="Kilitli"
                title="Üyelikle açılır"
              >
                🔒
              </span>
              <span className="min-w-0 flex-1 truncate">
                Gün {d.day}: {d.title}
              </span>
              <span className="shrink-0 text-xs text-foreground/60">
                {Math.round(d.durationSec / 60)} dk
              </span>
            </li>
          ))}
        </ul>
      </div>

      <details className="rounded-xl border border-lavender/30 bg-lavender/5 px-4 py-3">
        <summary className="cursor-pointer list-none text-sm font-medium text-foreground/80">
          + 7 gün daha (üyelikle açılır)
        </summary>
      </details>

      <div className="flex flex-wrap gap-2">
        {(plan.chips ?? plan.painChips).slice(0, 8).map((chip) => (
          <span
            key={chip}
            className="rounded-full bg-lavender/30 px-3 py-1 text-xs font-medium text-primary"
          >
            {chip}
          </span>
        ))}
      </div>

      <p className="text-xs text-foreground/60 italic">
        Planın tercihlerine göre değişir. Tam erişim üyelikle açılır.
      </p>

      <div className="flex flex-col gap-2 pt-2">
        <button
          type="button"
          onClick={onOpenPlan}
          className="w-full rounded-full bg-gradient-to-r from-primary to-primary-light py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-lavender focus:ring-offset-2"
        >
          Planımı Aç
        </button>
        <a
          href="/pratikler"
          onClick={onBrowseCatalog}
          className="text-center text-sm text-primary underline underline-offset-2 hover:no-underline"
        >
          Kataloğu incele
        </a>
        {showReset && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-sm text-foreground/60 hover:text-foreground underline underline-offset-2"
          >
            Planı yeniden oluştur
          </button>
        )}
      </div>

      <p className="text-center text-xs text-foreground/50">
        Bu planı daha sonra yeniden oluşturabilirsin.
      </p>
    </div>
  );
}
