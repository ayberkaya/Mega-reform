"use client";

import { useEffect, useRef, useState } from "react";
import { SYNTHESIS_MESSAGES } from "@/lib/plan-builder/templates";

const KEYWORD_INTERVAL_MS = 2200;

export interface Step7SynthesisProps {
  currentStageIndex: number;
  /** Keywords from user choices for floating display */
  keywords: string[];
}

export function Step7Synthesis({
  currentStageIndex,
  keywords,
}: Step7SynthesisProps) {
  const [displayKeywords, setDisplayKeywords] = useState<string[]>([]);
  const keywordIndexRef = useRef(0);

  useEffect(() => {
    if (keywords.length === 0) return;
    const next = keywords[keywordIndexRef.current];
    if (next) setDisplayKeywords([next]);

    const id = setInterval(() => {
      keywordIndexRef.current = (keywordIndexRef.current + 1) % keywords.length;
      const k = keywords[keywordIndexRef.current];
      if (k) {
        setDisplayKeywords((prev) => {
          const combined = [...prev.slice(-3), k].filter(Boolean);
          return combined.slice(-4);
        });
      }
    }, KEYWORD_INTERVAL_MS);
    return () => clearInterval(id);
  }, [keywords]);

  const msg = SYNTHESIS_MESSAGES[currentStageIndex];

  return (
    <div
      className="flex min-h-[200px] flex-col items-center justify-center gap-6 py-4"
      role="status"
      aria-live="polite"
      aria-label={msg}
    >
      <div className="relative flex h-24 w-24 shrink-0 items-center justify-center [contain:layout_paint]">
        <div
          className="absolute h-20 w-20 rounded-full bg-lavender/30 blur-xl animate-[plan-synthesis-rotate_12s_linear_infinite] [will-change:transform]"
          aria-hidden
        />
        <div
          className="h-12 w-12 rounded-full border-2 border-primary/30 bg-lavender/20 animate-[plan-synthesis-rotate_8s_linear_infinite_reverse] [will-change:transform]"
          aria-hidden
        />
      </div>
      <p className="text-center font-body text-foreground/90">{msg}</p>
      <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-lavender/30 [contain:strict]">
        <div
          className="h-full w-1/3 rounded-full bg-primary/60 animate-[plan-progress-loop_2s_ease-in-out_infinite] [will-change:transform]"
          aria-hidden
        />
      </div>
      {displayKeywords.length > 0 && (
        <div className="flex min-h-[2.5rem] flex-wrap items-center justify-center gap-2">
          {displayKeywords.map((k, i) => (
            <span
              key={`${k}-${i}`}
              className="animate-[plan-keyword-float_3s_ease-in-out_infinite] rounded-full bg-lavender/25 px-3 py-1 text-xs text-foreground/80 [will-change:transform]"
              style={{ animationDelay: `${i * 400}ms` }}
            >
              {k}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
