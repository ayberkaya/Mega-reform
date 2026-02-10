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
    <div className="space-y-4">
      <div
        className="inline-flex items-center gap-2 rounded-full bg-lavender/20 px-3 py-1.5 text-sm font-medium text-primary"
        aria-live="polite"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
          {selected.length}
        </span>
        <span>{MAX_SELECT} seçeneğe kadar seçebilirsin</span>
      </div>
      <ul
        className="space-y-2.5"
        role="group"
        aria-label="Şu an seni en çok zorlayan şey ne?"
      >
        {CURRENT_STATE_OPTIONS.map((opt, i) => {
          const isSelected = selected.includes(opt.id);
          return (
            <li
              key={opt.id}
              className="opacity-0 animate-[plan-card-in_0.45s_var(--ease-spiritual)_forwards]"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <label
                className={cn(
                  "relative flex cursor-pointer items-center gap-4 rounded-2xl border-2 px-4 py-3.5 transition-all duration-300",
                  "hover:border-lavender/50 hover:bg-lavender/5",
                  isSelected
                    ? "border-primary bg-gradient-to-br from-lavender/25 to-lavender/5 shadow-md animate-[plan-select-pop_0.35s_ease-out]"
                    : "border-lavender/25 bg-white/80"
                )}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggle(opt.id)}
                  disabled={!isSelected && selected.length >= MAX_SELECT}
                  className="sr-only"
                  aria-label={opt.label}
                />
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all",
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-foreground/20 bg-transparent"
                  )}
                  aria-hidden
                >
                  {isSelected && (
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="font-body text-foreground font-medium">
                  {opt.label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
