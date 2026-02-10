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
            className="opacity-0 animate-[plan-card-in_0.45s_var(--ease-spiritual)_forwards]"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <label
              className={cn(
                "flex flex-col cursor-pointer items-center gap-3 rounded-2xl border-2 px-3 py-4 transition-all duration-300",
                "hover:border-lavender/50 hover:bg-lavender/5",
                isSelected
                  ? "border-primary bg-gradient-to-br from-lavender/25 to-lavender/5 shadow-md ring-2 ring-primary/20 animate-[plan-select-pop_0.35s_ease-out]"
                  : "border-lavender/25 bg-white/80"
              )}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggle(opt.id)}
                className="sr-only"
                aria-label={opt.label}
              />
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-all",
                  isSelected ? "bg-primary/15" : "bg-lavender/20"
                )}
                aria-hidden
              >
                {ICONS[opt.id] ?? "•"}
              </span>
              <span className="text-center text-sm font-body font-medium text-foreground leading-tight">
                {opt.label}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
