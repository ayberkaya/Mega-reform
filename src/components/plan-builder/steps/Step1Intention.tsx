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
          style={{ animationDelay: `${i * 90}ms` }}
        >
          <label
            className={cn(
              "relative flex cursor-pointer items-center gap-4 rounded-2xl border-2 px-4 py-3.5 transition-all duration-300",
              "hover:border-lavender/50 hover:bg-lavender/5",
              selected === opt.id
                ? "border-primary bg-gradient-to-br from-lavender/30 to-lavender/10 shadow-lg animate-[plan-card-glow_4s_ease-in-out_infinite]"
                : "border-lavender/25 bg-white/80"
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
            <span className="font-body text-foreground font-medium">
              {opt.label}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
