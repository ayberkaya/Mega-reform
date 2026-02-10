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
import { generatePlan, getPersonalSentence } from "@/lib/plan-builder/generatePlan";
import {
  getIntentionLabel,
  getCurrentStateLabel,
  getModalityLabel,
} from "@/lib/plan-builder/templates";
import {
  Step1Intention,
  Step2CurrentState,
  Step3ApproachDepth,
  Step4Modality,
  Step5TimeReality,
  Step6GuidanceStyle,
  Step7Synthesis,
  Step8PlanReveal,
} from "./steps";

const TOTAL_STEPS = 8;
const SYNTHESIS_STAGE_MS = 2600;

const STEP_TITLES: Record<number, string> = {
  1: "Bu yolculuğa hangi niyetle başlıyorsun?",
  2: "Şu an seni en çok zorlayan şey ne?",
  3: "Bu yolculuk ne kadar derin olsun?",
  4: "Hangi tür pratiklerle daha rahat edersin?",
  5: "Gerçekçi olalım…",
  6: "Bir rehberden ne beklersin?",
  7: "Planın oluşturuluyor",
  8: "Sana özel plan hazır",
};

export interface PlanBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlanBuilderModal({ isOpen, onClose }: PlanBuilderModalProps) {
  const [step, setStep] = useState(1);
  const [intention, setIntention] = useState<string | null>(null);
  const [currentState, setCurrentState] = useState<string[]>([]);
  const [approachDepth, setApproachDepth] = useState<string | null>(null);
  const [modalities, setModalities] = useState<string[]>([]);
  const [time, setTime] = useState<string | null>(null);
  const [guidanceStyle, setGuidanceStyle] = useState<string | null>(null);
  const [synthesisStage, setSynthesisStage] = useState(0);
  const [generatedPlan, setGeneratedPlan] = useState<SavedPlanState | null>(null);
  const [showFromSaved, setShowFromSaved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const openFromSaved = useCallback(() => {
    const saved = getSavedPlan();
    if (saved) {
      setGeneratedPlan(saved);
      setStep(8);
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
      setStep(8);
      setShowFromSaved(true);
    } else {
      setStep(1);
      setIntention(null);
      setCurrentState([]);
      setApproachDepth(null);
      setModalities([]);
      setTime(null);
      setGuidanceStyle(null);
      setGeneratedPlan(null);
      setShowFromSaved(false);
      setSynthesisStage(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    window.dispatchEvent(new CustomEvent("mr_plan_step", { detail: { step } }));
  }, [isOpen, step]);

  useEffect(() => {
    if (step !== 7) return;
    const stages = 5;
    if (synthesisStage >= stages) {
      const answers: PlanBuilderAnswers = {
        intention: intention!,
        currentState,
        approachDepth: approachDepth!,
        modalities,
        time: time!,
        guidanceStyle: guidanceStyle!,
      };
      const plan = generatePlan(answers);
      const state: SavedPlanState = { answers, plan, savedAt: Date.now() };
      savePlan(state);
      setGeneratedPlan(state);
      setStep(8);
      setShowFromSaved(false);
      window.dispatchEvent(new CustomEvent("mr_plan_complete"));
      return;
    }
    const id = setTimeout(() => setSynthesisStage((s) => s + 1), SYNTHESIS_STAGE_MS);
    return () => clearTimeout(id);
  }, [step, synthesisStage, intention, currentState, approachDepth, modalities, time, guidanceStyle]);

  const goNext = useCallback(() => {
    if (step === 1 && intention) setStep(2);
    else if (step === 2 && currentState.length > 0) setStep(3);
    else if (step === 3 && approachDepth) setStep(4);
    else if (step === 4 && modalities.length > 0) setStep(5);
    else if (step === 5 && time) setStep(6);
    else if (step === 6 && guidanceStyle) setStep(7);
  }, [step, intention, currentState, approachDepth, modalities, time, guidanceStyle]);

  const goBack = useCallback(() => {
    if (step > 1 && step < 7) setStep(step - 1);
  }, [step]);

  const canNext =
    (step === 1 && intention) ||
    (step === 2 && currentState.length > 0) ||
    (step === 3 && approachDepth) ||
    (step === 4 && modalities.length > 0) ||
    (step === 5 && time) ||
    (step === 6 && guidanceStyle);
  const showBack = step >= 2 && step <= 6;

  const handleClose = useCallback(() => onClose(), [onClose]);

  const handleReset = useCallback(() => {
    clearSavedPlan();
    setGeneratedPlan(null);
    setStep(1);
    setIntention(null);
    setCurrentState([]);
    setApproachDepth(null);
    setModalities([]);
    setTime(null);
    setGuidanceStyle(null);
    setShowFromSaved(false);
    setSynthesisStage(0);
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

  const synthesisKeywords = [
    intention ? getIntentionLabel(intention) : null,
    ...currentState.map(getCurrentStateLabel),
    ...modalities.map(getModalityLabel),
  ].filter(Boolean) as string[];

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
        className="relative flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl border border-lavender/20 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-lavender/20 px-4 py-3">
          <span className="text-sm font-medium text-foreground/70">
            {step}/{TOTAL_STEPS}
          </span>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 text-foreground/70 transition-colors hover:bg-lavender/20 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-lavender"
            aria-label="Kapat"
          >
            <span aria-hidden>×</span>
          </button>
        </div>
        <div
          className="h-1 shrink-0 bg-lavender/20"
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
        <div className="min-h-0 flex-1 overflow-y-auto p-6">
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
              <Step1Intention selected={intention} onChange={setIntention} />
            )}
            {step === 2 && (
              <Step2CurrentState
                selected={currentState}
                onChange={setCurrentState}
              />
            )}
            {step === 3 && (
              <Step3ApproachDepth
                selected={approachDepth}
                onChange={setApproachDepth}
              />
            )}
            {step === 4 && (
              <Step4Modality selected={modalities} onChange={setModalities} />
            )}
            {step === 5 && (
              <Step5TimeReality selected={time} onChange={setTime} />
            )}
            {step === 6 && (
              <Step6GuidanceStyle
                selected={guidanceStyle}
                onChange={setGuidanceStyle}
              />
            )}
            {step === 7 && (
              <Step7Synthesis
                currentStageIndex={synthesisStage}
                keywords={synthesisKeywords}
              />
            )}
            {step === 8 && generatedPlan && (
              <Step8PlanReveal
                plan={generatedPlan.plan}
                personalSentence={getPersonalSentence(generatedPlan.answers)}
                onOpenPlan={handleOpenPlan}
                onBrowseCatalog={handleBrowseCatalog}
                onReset={handleReset}
                showReset={showFromSaved}
              />
            )}
          </div>
          {step <= 6 && (
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
