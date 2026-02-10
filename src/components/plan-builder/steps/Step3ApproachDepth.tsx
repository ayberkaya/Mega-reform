"use client";

import { cn } from "@/lib/utils/cn";
import { APPROACH_DEPTH_OPTIONS } from "@/lib/plan-builder/templates";

const DEPTH_GRADIENTS: Record<string, string> = {
  "light-regular": "from-lavender-light/40 to-sage-light/20",
  "balanced-guided": "from-lavender/30 to-primary/5",
  "deep-transformative": "from-primary/10 to-primary-dark/10",
};

export interface Step3ApproachDepthProps {
  selected: string | null;
  onChange: (id: string) => void;
}

export function Step3ApproachDepth({ selected, onChange }: Step3ApproachDepthProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-gradient-to-br p-4 transition-[background] duration-700",
        selected && DEPTH_GRADIENTS[selected]
          ? DEPTH_GRADIENTS[selected]
          : "from-lavender/10 to-transparent"
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
                "block cursor-pointer rounded-xl border px-4 py-3.5 text-center transition-all duration-300",
                selected === opt.id
                  ? "border-primary bg-white/80 shadow-md"
                  : "border-lavender/30 hover:border-lavender/60 hover:bg-white/50"
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
              <span className="font-body text-foreground">{opt.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
