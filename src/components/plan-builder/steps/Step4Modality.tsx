"use client";

import { cn } from "@/lib/utils/cn";
import { MODALITY_OPTIONS } from "@/lib/plan-builder/templates";

const ICONS: Record<string, string> = {
  audio: "🔊",
  written: "✍️",
  visual: "👁",
  intuitive: "🌙",
};

export interface Step4ModalityProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

export function Step4Modality({ selected, onChange }: Step4ModalityProps) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <ul
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      role="group"
      aria-label="Hangi tür pratiklerle daha rahat edersin?"
    >
      {MODALITY_OPTIONS.map((opt, i) => {
        const isSelected = selected.includes(opt.id);
        return (
          <li
            key={opt.id}
            className="opacity-0 animate-[plan-card-in_0.4s_var(--ease-spiritual)_forwards]"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <label
              className={cn(
                "flex flex-col cursor-pointer items-center gap-2 rounded-xl border px-3 py-4 transition-all duration-200",
                isSelected
                  ? "border-primary bg-lavender/20 animate-[plan-select-pop_0.35s_ease-out]"
                  : "border-lavender/30 hover:border-lavender/60 hover:bg-lavender/10"
              )}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggle(opt.id)}
                className="sr-only"
                aria-label={opt.label}
              />
              <span className="text-2xl" aria-hidden>
                {ICONS[opt.id] ?? "•"}
              </span>
              <span className="text-center text-sm font-body text-foreground">
                {opt.label}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
