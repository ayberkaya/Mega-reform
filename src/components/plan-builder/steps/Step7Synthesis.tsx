"use client";

import { useEffect, useRef, useState } from "react";
import { SYNTHESIS_MESSAGES } from "@/lib/plan-builder/templates";

const KEYWORD_INTERVAL_MS = 2200;

export interface Step7SynthesisProps {
  currentStageIndex: number;
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
      className="relative flex min-h-[240px] flex-col items-center justify-center gap-8 overflow-hidden rounded-2xl py-8"
      role="status"
      aria-live="polite"
      aria-label={msg}
    >
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-lavender/10 to-sage-light/10 animate-[plan-ambient-pulse_8s_ease-in-out_infinite]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-20 opacity-30"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lavender/40 blur-3xl" />
      </div>

      {/* Mandala-style center */}
      <div className="relative flex h-28 w-28 shrink-0 items-center justify-center [contain:layout_paint]">
        <div
          className="absolute h-24 w-24 animate-[plan-mandala-rotate_20s_linear_infinite] opacity-40 [will-change:transform]"
          aria-hidden
        >
          <svg viewBox="0 0 100 100" className="h-full w-full text-primary/50">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = 50 + 45 * Math.cos(rad);
              const y1 = 50 + 45 * Math.sin(rad);
              const x2 = 50 + 25 * Math.cos(rad);
              const y2 = 50 + 25 * Math.sin(rad);
              return (
                <line
                  key={deg}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.35"
                />
              );
            })}
          </svg>
        </div>
        <div
          className="h-14 w-14 animate-[plan-mandala-rotate_15s_linear_infinite_reverse] rounded-full border-2 border-primary/30 bg-lavender/20 [will-change:transform]"
          aria-hidden
        />
      </div>

      {/* Message with fade on change */}
      <p
        key={currentStageIndex}
        className="relative z-10 text-center font-body text-lg font-medium text-foreground/95 animate-[plan-msg-fade_0.5s_var(--ease-spiritual)_forwards]"
      >
        {msg}
      </p>

      {/* Progress bar */}
      <div className="relative z-10 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-lavender/25 [contain:strict]">
        <div
          className="h-full w-1/3 rounded-full bg-gradient-to-r from-primary/50 to-primary/80 animate-[plan-progress-loop_2s_ease-in-out_infinite] [will-change:transform]"
          aria-hidden
        />
      </div>

      {/* Keywords constellation */}
      {displayKeywords.length > 0 && (
        <div className="relative z-10 flex min-h-[3rem] flex-wrap items-center justify-center gap-2">
          {displayKeywords.map((k, i) => (
            <span
              key={`${k}-${i}`}
              className="animate-[plan-keyword-in_0.5s_var(--ease-spiritual)_forwards] rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-sm font-medium text-foreground/90 shadow-sm backdrop-blur-sm"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {k}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
