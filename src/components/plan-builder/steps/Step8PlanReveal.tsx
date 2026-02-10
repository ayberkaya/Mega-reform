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
    <div className="space-y-5 pb-2">
      {/* Badge */}
      <p className="text-xs font-semibold uppercase tracking-widest text-primary/80">
        Sana özel
      </p>

      {/* Title — reveal animation */}
      <h3 className="font-heading text-xl font-bold leading-tight text-foreground animate-[plan-reveal-title_0.6s_var(--ease-spiritual)_forwards] md:text-2xl">
        {plan.title}
      </h3>

      {/* Personal sentence — quote style */}
      <div className="border-l-4 border-primary/40 bg-lavender/10 pl-4 pr-3 py-3 rounded-r-xl animate-[plan-reveal-line_0.5s_var(--ease-spiritual)_forwards]">
        <p className="text-sm text-foreground/85 leading-relaxed italic">
          {personalSentence}
        </p>
      </div>

      {/* Week 1 */}
      <div>
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-foreground/60">
          Hafta 1 · Gün 1–7
        </p>
        <ul className="space-y-2 text-sm" aria-label="İlk 7 gün">
          {week1.map((d, i) => (
            <li
              key={d.day}
              className="flex items-center gap-3 rounded-xl border border-lavender/20 bg-white/60 px-3 py-2.5 text-foreground/85 animate-[plan-reveal-line_0.45s_var(--ease-spiritual)_forwards]"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lavender/20 text-xs font-semibold text-primary"
                aria-hidden
              >
                🔒
              </span>
              <span className="min-w-0 flex-1 truncate font-medium">
                Gün {d.day}: {d.title}
              </span>
              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {Math.round(d.durationSec / 60)} dk
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Week 2 teaser */}
      <details className="group rounded-2xl border-2 border-dashed border-lavender/40 bg-lavender/5 px-4 py-3">
        <summary className="cursor-pointer list-none text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
          + 7 gün daha (üyelikle açılır)
        </summary>
      </details>

      {/* Chips — premium pills */}
      <div className="flex flex-wrap gap-2">
        {(plan.chips ?? plan.painChips).slice(0, 8).map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-primary/15 bg-gradient-to-r from-lavender/25 to-lavender/10 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm"
          >
            {chip}
          </span>
        ))}
      </div>

      <p className="text-xs text-foreground/55 italic">
        Planın tercihlerine göre değişir. Tam erişim üyelikle açılır.
      </p>

      {/* CTAs */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          type="button"
          onClick={onOpenPlan}
          className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-light to-primary py-4 font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <span className="relative z-10">Planımı Aç</span>
        </button>
        <a
          href="/pratikler"
          onClick={onBrowseCatalog}
          className="text-center text-sm font-medium text-primary underline underline-offset-2 transition-colors hover:no-underline hover:text-primary-light"
        >
          Kataloğu incele
        </a>
        {showReset && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-sm text-foreground/55 hover:text-foreground underline underline-offset-2 transition-colors"
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
