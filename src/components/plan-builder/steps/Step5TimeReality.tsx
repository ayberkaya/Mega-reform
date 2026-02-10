"use client";

import { cn } from "@/lib/utils/cn";
import {
  TIME_OPTIONS,
  getWeeklyMinutesEstimate,
} from "@/lib/plan-builder/templates";

export interface Step5TimeRealityProps {
  selected: string | null;
  onChange: (id: string) => void;
}

export function Step5TimeReality({ selected, onChange }: Step5TimeRealityProps) {
  const weeklyMinutes = selected ? getWeeklyMinutesEstimate(selected) : 0;

  return (
    <div className="space-y-4">
      <ul
        className="space-y-2.5"
        role="radiogroup"
        aria-label="Gerçekçi olalım…"
      >
        {TIME_OPTIONS.map((opt) => (
          <li key={opt.id}>
            <label
              className={cn(
                "relative flex cursor-pointer items-center gap-4 rounded-2xl border-2 px-4 py-3.5 transition-all duration-300",
                "hover:border-lavender/50 hover:bg-lavender/5",
                selected === opt.id
                  ? "border-primary bg-gradient-to-br from-lavender/25 to-lavender/5 shadow-md"
                  : "border-lavender/25 bg-white/80"
              )}
            >
              <input
                type="radio"
                name="time"
                value={opt.id}
                checked={selected === opt.id}
                onChange={() => onChange(opt.id)}
                className="sr-only"
                aria-label={opt.label}
              />
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                  selected === opt.id
                    ? "border-primary bg-primary"
                    : "border-foreground/20 bg-transparent"
                )}
                aria-hidden
              >
                {selected === opt.id && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </span>
              <span className="font-body font-medium text-foreground">
                {opt.label}
              </span>
            </label>
          </li>
        ))}
      </ul>
      {selected && (
        <div
          className="rounded-2xl border border-lavender/30 bg-lavender/10 px-4 py-3 text-center"
          aria-live="polite"
        >
          <p className="text-sm font-medium text-primary">
            Tahmini haftalık süre
          </p>
          <p className="mt-0.5 text-2xl font-heading font-semibold text-foreground">
            ~{weeklyMinutes} dakika
          </p>
        </div>
      )}
    </div>
  );
}
