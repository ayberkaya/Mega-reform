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
        className="space-y-2"
        role="radiogroup"
        aria-label="Gerçekçi olalım…"
      >
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
      {selected && (
        <p
          className="text-sm text-foreground/70 transition-opacity duration-300"
          aria-live="polite"
        >
          Tahmini haftalık süre: ~{weeklyMinutes} dk
        </p>
      )}
    </div>
  );
}
