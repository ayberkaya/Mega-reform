"use client";

import { cn } from "@/lib/utils/cn";
import { CURRENT_STATE_OPTIONS } from "@/lib/plan-builder/templates";

const MAX_SELECT = 3;

export interface Step2CurrentStateProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

export function Step2CurrentState({ selected, onChange }: Step2CurrentStateProps) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else if (selected.length < MAX_SELECT) {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-foreground/70">
        <span aria-live="polite">
          {selected.length} / {MAX_SELECT} seçildi
        </span>
      </p>
      <ul
        className="space-y-2"
        role="group"
        aria-label="Şu an seni en çok zorlayan şey ne?"
      >
        {CURRENT_STATE_OPTIONS.map((opt) => {
          const isSelected = selected.includes(opt.id);
          return (
            <li key={opt.id}>
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200",
                  isSelected
                    ? "border-primary bg-lavender/20 animate-[plan-select-pop_0.35s_ease-out]"
                    : "border-lavender/30 hover:border-lavender/60"
                )}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggle(opt.id)}
                  disabled={
                    !isSelected && selected.length >= MAX_SELECT
                  }
                  className="h-4 w-4 rounded border-lavender text-primary focus:ring-lavender"
                  aria-label={opt.label}
                />
                <span className="font-body text-foreground">{opt.label}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
