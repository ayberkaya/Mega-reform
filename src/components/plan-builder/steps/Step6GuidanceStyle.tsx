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
              "relative flex cursor-pointer items-center gap-4 rounded-2xl border-2 px-4 py-3.5 transition-all duration-300",
              "hover:border-lavender/50 hover:bg-lavender/5",
              selected === opt.id
                ? "border-primary bg-gradient-to-br from-lavender/25 to-lavender/5 shadow-md ring-2 ring-primary/20"
                : "border-lavender/25 bg-white/80"
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
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all",
                selected === opt.id
                  ? "bg-primary/20 ring-2 ring-primary/40"
                  : "bg-foreground/10"
              )}
              aria-hidden
            >
              <span
                className={cn(
                  "h-6 w-6 rounded-full border-2 border-foreground/30",
                  selected === opt.id && "border-primary bg-primary/30"
                )}
              />
            </span>
            <span className="font-body font-medium text-foreground">
              {opt.label}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
