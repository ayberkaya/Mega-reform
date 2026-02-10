"use client";

import { cn } from "@/lib/utils/cn";
import {
  PAIN_POINT_OPTIONS,
  APPROACH_OPTIONS,
  TIME_OPTIONS,
  PROGRESS_MESSAGES,
} from "@/lib/plan-builder/templates";
import type { PlanOutline } from "@/lib/plan-builder/storage";

const MAX_PAIN_SELECT = 2;

export interface Step1Props {
  selected: string[];
  onChange: (ids: string[]) => void;
}

export function Step1PainPoints({ selected, onChange }: Step1Props) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else if (selected.length < MAX_PAIN_SELECT) {
      onChange([...selected, id]);
    }
  };
  return (
    <div className="space-y-3">
      <p className="text-sm text-foreground/70">En fazla 2 seçebilirsin.</p>
      <ul className="space-y-2" role="group" aria-label="Zorluk alanları">
        {PAIN_POINT_OPTIONS.map((opt) => (
          <li key={opt.id}>
            <label
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all",
                selected.includes(opt.id)
                  ? "border-primary bg-lavender/20"
                  : "border-lavender/30 hover:border-lavender/60"
              )}
            >
              <input
                type="checkbox"
                checked={selected.includes(opt.id)}
                onChange={() => toggle(opt.id)}
                disabled={
                  !selected.includes(opt.id) && selected.length >= MAX_PAIN_SELECT
                }
                className="h-4 w-4 rounded border-lavender text-primary focus:ring-lavender"
                aria-label={opt.label}
              />
              <span className="font-body text-foreground">{opt.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface Step2Props {
  selected: string | null;
  onChange: (id: string) => void;
}

export function Step2Approach({ selected, onChange }: Step2Props) {
  return (
    <ul className="space-y-2" role="radiogroup" aria-label="Yaklaşım tercihi">
      {APPROACH_OPTIONS.map((opt) => (
        <li key={opt.id}>
          <label
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all",
              selected === opt.id
                ? "border-primary bg-lavender/20"
                : "border-lavender/30 hover:border-lavender/60"
            )}
          >
            <input
              type="radio"
              name="approach"
              value={opt.id}
              checked={selected === opt.id}
              onChange={() => onChange(opt.id)}
              className="h-4 w-4 border-lavender text-primary focus:ring-lavender"
              aria-label={opt.label}
            />
            <span className="font-body text-foreground">{opt.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

export interface Step3Props {
  selected: string | null;
  onChange: (id: string) => void;
}

export function Step3Time({ selected, onChange }: Step3Props) {
  return (
    <ul className="space-y-2" role="radiogroup" aria-label="Zaman tercihi">
      {TIME_OPTIONS.map((opt) => (
        <li key={opt.id}>
          <label
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all",
              selected === opt.id
                ? "border-primary bg-lavender/20"
                : "border-lavender/30 hover:border-lavender/60"
            )}
          >
            <input
              type="radio"
              name="time"
              value={opt.id}
              checked={selected === opt.id}
              onChange={() => onChange(opt.id)}
              className="h-4 w-4 border-lavender text-primary focus:ring-lavender"
              aria-label={opt.label}
            />
            <span className="font-body text-foreground">{opt.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

export interface Step4Props {
  currentMessageIndex: number;
}

export function Step4Progress({ currentMessageIndex }: Step4Props) {
  const msg = PROGRESS_MESSAGES[currentMessageIndex];
  return (
    <div
      className="min-h-[120px] flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label={msg}
    >
      <p className="font-body text-foreground">{msg}</p>
    </div>
  );
}

export interface Step5Props {
  plan: PlanOutline;
  onOpenPlan: () => void;
  onBrowseCatalog: (e: React.MouseEvent) => void;
  onReset: () => void;
  showReset?: boolean;
}

export function Step5Preview({
  plan,
  onOpenPlan,
  onBrowseCatalog,
  onReset,
  showReset = false,
}: Step5Props) {
  const days1to7 = plan.days.slice(0, 7);
  return (
    <div className="space-y-4">
      <p className="font-heading text-lg font-semibold text-foreground">
        {plan.title}
      </p>
      <ul className="space-y-1.5" aria-label="İlk 7 gün">
        {days1to7.map((d) => (
          <li
            key={d.day}
            className="flex items-center gap-2 text-foreground/80"
          >
            <span aria-hidden className="text-base">
              🔒
            </span>
            <span>
              Gün {d.day}: {d.title}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-sm text-foreground/70">
        Tahmini haftalık süre: ~{plan.weeklyMinutes} dk
      </p>
      <div className="flex flex-wrap gap-2">
        {plan.painChips.map((chip) => (
          <span
            key={chip}
            className="rounded-full bg-lavender/30 px-3 py-1 text-xs font-medium text-primary"
          >
            {chip}
          </span>
        ))}
        <span className="rounded-full bg-lavender/30 px-3 py-1 text-xs font-medium text-primary">
          {plan.approachChip}
        </span>
      </div>
      <p className="text-xs text-foreground/60 italic">
        Planın hedeflerine göre değişir.
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
          Kataloğu gör
        </a>
        {showReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-sm text-foreground/60 hover:text-foreground underline underline-offset-2"
          >
            Planı yeniden oluştur
          </button>
        )}
      </div>
      <p className="text-xs text-foreground/50">Tam plan üyelikle açılır.</p>
    </div>
  );
}
