"use client";

import { cn } from "@/lib/utils/cn";
import { INTENTION_OPTIONS } from "@/lib/plan-builder/templates";

export interface Step1IntentionProps {
  selected: string | null;
  onChange: (id: string) => void;
}

export function Step1Intention({ selected, onChange }: Step1IntentionProps) {
  return (
    <ul
      className="space-y-3"
      role="radiogroup"
      aria-label="Bu yolculuğa hangi niyetle başlıyorsun?"
    >
      {INTENTION_OPTIONS.map((opt, i) => (
        <li
          key={opt.id}
          className="opacity-0 animate-[plan-card-in_0.5s_var(--ease-spiritual)_forwards]"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <label
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition-all duration-200",
              selected === opt.id
                ? "border-primary bg-lavender/25 shadow-[0_0_0_1px_rgba(45,27,78,0.15)] animate-[plan-card-glow_4s_ease-in-out_infinite]"
                : "border-lavender/30 hover:border-lavender/60 hover:bg-lavender/10"
            )}
          >
            <input
              type="radio"
              name="intention"
              value={opt.id}
              checked={selected === opt.id}
              onChange={() => onChange(opt.id)}
              className="sr-only"
              aria-label={opt.label}
            />
            <span className="font-body text-foreground">{opt.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
