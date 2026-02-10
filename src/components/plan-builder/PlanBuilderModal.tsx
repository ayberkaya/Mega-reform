"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/cn";
import {
  getSavedPlan,
  savePlan,
  clearSavedPlan,
  type PlanBuilderAnswers,
  type SavedPlanState,
} from "@/lib/plan-builder/storage";
import { generatePlan } from "@/lib/plan-builder/generatePlan";
import { PROGRESS_MESSAGES } from "@/lib/plan-builder/templates";
import {
  Step1PainPoints,
  Step2Approach,
  Step3Time,
  Step4Progress,
  Step5Preview,
} from "./PlanBuilderSteps";

const TOTAL_STEPS = 5;
const PROGRESS_MSG_DURATION_MS = 1800;

const STEP_TITLES: Record<number, string> = {
  1: "Şu an en çok zorlandığın alan hangisi?",
  2: "Bu konuda sana ne daha yakın?",
  3: "Gerçekçi olalım, ne kadar zaman ayırabilirsin?",
  4: "Planın hazırlanıyor",
  5: "Planın hazır",
};

export interface PlanBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlanBuilderModal({ isOpen, onClose }: PlanBuilderModalProps) {
  const [step, setStep] = useState(1);
  const [painPoints, setPainPoints] = useState<string[]>([]);
  const [approach, setApproach] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [progressIndex, setProgressIndex] = useState(0);
  const [generatedPlan, setGeneratedPlan] = useState<SavedPlanState | null>(null);
  const [showFromSaved, setShowFromSaved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousRef = useRef<HTMLButtonElement | null>(null);

  const openFromSaved = useCallback(() => {
    const saved = getSavedPlan();
    if (saved) {
      setGeneratedPlan(saved);
      setStep(5);
      setShowFromSaved(true);
    } else {
      setStep(1);
      setShowFromSaved(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const saved = getSavedPlan();
    if (saved) {
      setGeneratedPlan(saved);
      setStep(5);
      setShowFromSaved(true);
    } else {
      setStep(1);
      setPainPoints([]);
      setApproach(null);
      setTime(null);
      setGeneratedPlan(null);
      setShowFromSaved(false);
    }
    setProgressIndex(0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("mr_plan_step", { detail: { step } })
      );
    }, 0);
    return () => clearTimeout(t);
  }, [isOpen, step]);

  useEffect(() => {
    if (step !== 4) return;
    if (progressIndex >= PROGRESS_MESSAGES.length) {
      const answers: PlanBuilderAnswers = {
        painPoints,
        approach: approach!,
        time: time!,
      };
      const plan = generatePlan(answers);
      const state: SavedPlanState = {
        answers,
        plan,
        savedAt: Date.now(),
      };
      savePlan(state);
      setGeneratedPlan(state);
      setStep(5);
      setShowFromSaved(false);
      window.dispatchEvent(new CustomEvent("mr_plan_complete"));
      return;
    }
    const id = setTimeout(() => {
      setProgressIndex((i) => i + 1);
    }, PROGRESS_MSG_DURATION_MS);
    return () => clearTimeout(id);
  }, [step, progressIndex, painPoints, approach, time]);

  const goNext = useCallback(() => {
    if (step === 1 && painPoints.length > 0) setStep(2);
    else if (step === 2 && approach) setStep(3);
    else if (step === 3 && time) setStep(4);
  }, [step, painPoints.length, approach, time]);

  const goBack = useCallback(() => {
    if (step > 1 && step < 5) setStep(step - 1);
  }, [step]);

  const canNext =
    (step === 1 && painPoints.length > 0) ||
    (step === 2 && approach) ||
    (step === 3 && time);
  const showBack = step >= 2 && step <= 4;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleReset = useCallback(() => {
    clearSavedPlan();
    setGeneratedPlan(null);
    setStep(1);
    setPainPoints([]);
    setApproach(null);
    setTime(null);
    setShowFromSaved(false);
  }, []);

  const handleOpenPlan = useCallback(() => {
    onClose();
    window.location.href = "/uyelik?source=plan-builder";
  }, [onClose]);

  const handleBrowseCatalog = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onClose();
      window.location.href = "/pratikler";
    },
    [onClose]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    const focusables = containerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!first) return;
    first.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    containerRef.current.addEventListener("keydown", onKeyDown);
    return () => containerRef.current?.removeEventListener("keydown", onKeyDown);
  }, [isOpen, step]);

  if (!isOpen) return null;

  const content = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="plan-builder-title"
      aria-describedby="plan-builder-desc"
    >
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        aria-hidden
        onClick={handleClose}
      />
      <div
        ref={containerRef}
        className="relative w-full max-w-lg rounded-2xl border border-lavender/20 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-lavender/20 px-4 py-3">
          <span className="text-sm font-medium text-foreground/70">
            {step}/{TOTAL_STEPS}
          </span>
          <button
            type="button"
            ref={previousRef}
            onClick={handleClose}
            className="rounded-full p-2 text-foreground/70 transition-colors hover:bg-lavender/20 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-lavender"
            aria-label="Kapat"
          >
            <span aria-hidden>×</span>
          </button>
        </div>
        <div
          className="h-1 bg-lavender/20"
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
        >
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
        <div className="p-6">
          <h2
            id="plan-builder-title"
            className="font-heading text-xl font-semibold text-foreground"
          >
            {STEP_TITLES[step]}
          </h2>
          <p id="plan-builder-desc" className="sr-only">
            Plan oluşturma adımı {step}
          </p>
          <div className="mt-4">
            {step === 1 && (
              <Step1PainPoints
                selected={painPoints}
                onChange={setPainPoints}
              />
            )}
            {step === 2 && (
              <Step2Approach selected={approach} onChange={setApproach} />
            )}
            {step === 3 && (
              <Step3Time selected={time} onChange={setTime} />
            )}
            {step === 4 && (
              <Step4Progress currentMessageIndex={progressIndex} />
            )}
            {step === 5 && generatedPlan && (
              <Step5Preview
                plan={generatedPlan.plan}
                onOpenPlan={handleOpenPlan}
                onBrowseCatalog={handleBrowseCatalog}
                onReset={handleReset}
                showReset={showFromSaved}
              />
            )}
          </div>
          {step <= 3 && (
            <div className="mt-6 flex gap-2">
              {showBack && (
                <button
                  type="button"
                  onClick={goBack}
                  className={cn(
                    "rounded-full border-2 border-lavender px-4 py-2 font-medium text-primary",
                    "hover:bg-lavender/20 focus:outline-none focus:ring-2 focus:ring-lavender"
                  )}
                >
                  Geri
                </button>
              )}
              <button
                type="button"
                onClick={goNext}
                disabled={!canNext}
                className={cn(
                  "rounded-full bg-gradient-to-r from-primary to-primary-light px-4 py-2 font-medium text-white",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-lavender focus:ring-offset-2"
                )}
              >
                İleri
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(content, document.body)
    : null;
}
