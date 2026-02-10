"use client";

import { cn } from "@/lib/utils/cn";
import { APPROACH_DEPTH_OPTIONS } from "@/lib/plan-builder/templates";

const DEPTH_GRADIENTS: Record<string, string> = {
  "light-regular": "from-lavender-light/50 via-sage-light/20 to-transparent",
  "balanced-guided": "from-lavender/40 via-primary/10 to-transparent",
  "deep-transformative": "from-primary/20 via-primary-dark/10 to-transparent",
};

export interface Step3ApproachDepthProps {
  selected: string | null;
  onChange: (id: string) => void;
}

export function Step3ApproachDepth({ selected, onChange }: Step3ApproachDepthProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-gradient-to-br p-5 transition-all duration-700",
        selected && DEPTH_GRADIENTS[selected]
          ? DEPTH_GRADIENTS[selected]
          : "from-lavender/15 to-transparent"
      )}
    >
      <ul
        className="flex flex-col gap-3 sm:flex-row sm:justify-center"
        role="radiogroup"
        aria-label="Bu yolculuk ne kadar derin olsun?"
      >
        {APPROACH_DEPTH_OPTIONS.map((opt) => (
          <li key={opt.id} className="flex-1 min-w-0">
            <label
              className={cn(
                "block cursor-pointer rounded-2xl border-2 px-4 py-4 text-center transition-all duration-300",
                "hover:border-lavender/50 hover:bg-white/60",
                selected === opt.id
                  ? "border-primary bg-white/90 shadow-lg shadow-primary/10 -translate-y-0.5"
                  : "border-lavender/25 bg-white/70"
              )}
            >
              <input
                type="radio"
                name="approachDepth"
                value={opt.id}
                checked={selected === opt.id}
                onChange={() => onChange(opt.id)}
                className="sr-only"
                aria-label={opt.label}
              />
              <span className="font-body text-foreground font-medium leading-snug">
                {opt.label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
