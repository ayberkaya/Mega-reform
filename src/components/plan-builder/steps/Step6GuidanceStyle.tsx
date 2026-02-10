"use client";

import { cn } from "@/lib/utils/cn";
import { GUIDANCE_STYLE_OPTIONS } from "@/lib/plan-builder/templates";

export interface Step6GuidanceStyleProps {
  selected: string | null;
  onChange: (id: string) => void;
}

export function Step6GuidanceStyle({ selected, onChange }: Step6GuidanceStyleProps) {
  return (
    <ul
      className="space-y-3"
      role="radiogroup"
      aria-label="Bir rehberden ne beklersin?"
    >
      {GUIDANCE_STYLE_OPTIONS.map((opt) => (
        <li key={opt.id}>
          <label
            className={cn(
              "flex cursor-pointer items-center gap-4 rounded-xl border px-4 py-3.5 transition-all duration-200",
              selected === opt.id
                ? "border-primary bg-lavender/20"
                : "border-lavender/30 hover:border-lavender/60"
            )}
          >
            <input
              type="radio"
              name="guidanceStyle"
              value={opt.id}
              checked={selected === opt.id}
              onChange={() => onChange(opt.id)}
              className="sr-only"
              aria-label={opt.label}
            />
            <span
              className="h-10 w-10 shrink-0 rounded-full bg-foreground/10"
              aria-hidden
            />
            <span className="font-body text-foreground">{opt.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
