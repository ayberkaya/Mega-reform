/** localStorage key for plan builder state. No PII. */
export const PLAN_STORAGE_KEY = "mr_plan_v2";

export interface PlanDayOutline {
  day: number;
  title: string;
  durationSec: number;
  type: string;
  suggestedGuideCategory?: string;
}

export interface PlanOutline {
  title: string;
  days: PlanDayOutline[];
  weeklyMinutes: number;
  painChips: string[];
  approachChip: string;
  /** Chips from intentions, current states, modalities for reveal. */
  chips: string[];
}

export interface PlanBuilderAnswers {
  intention: string;
  currentState: string[];
  approachDepth: string;
  modalities: string[];
  time: string;
  guidanceStyle: string;
}

export interface SavedPlanState {
  answers: PlanBuilderAnswers;
  plan: PlanOutline;
  savedAt: number;
}

function isValidAnswers(a: unknown): a is PlanBuilderAnswers {
  if (!a || typeof a !== "object") return false;
  const o = a as Record<string, unknown>;
  return (
    typeof o.intention === "string" &&
    Array.isArray(o.currentState) &&
    o.currentState.every((x: unknown) => typeof x === "string") &&
    typeof o.approachDepth === "string" &&
    Array.isArray(o.modalities) &&
    o.modalities.every((x: unknown) => typeof x === "string") &&
    typeof o.time === "string" &&
    typeof o.guidanceStyle === "string"
  );
}

function isValidPlan(p: unknown): p is PlanOutline {
  if (!p || typeof p !== "object") return false;
  const o = p as Record<string, unknown>;
  return (
    typeof o.title === "string" &&
    Array.isArray(o.days) &&
    o.days.every(
      (d: unknown) =>
        d &&
        typeof d === "object" &&
        typeof (d as PlanDayOutline).day === "number" &&
        typeof (d as PlanDayOutline).title === "string"
    ) &&
    typeof o.weeklyMinutes === "number"
  );
}

export function getSavedPlan(): SavedPlanState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PLAN_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (
      !parsed ||
      typeof parsed !== "object" ||
      !isValidAnswers((parsed as SavedPlanState).answers) ||
      !isValidPlan((parsed as SavedPlanState).plan)
    ) {
      return null;
    }
    return parsed as SavedPlanState;
  } catch {
    return null;
  }
}

export function savePlan(state: SavedPlanState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // quota or disabled storage
  }
}

export function clearSavedPlan(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(PLAN_STORAGE_KEY);
  } catch {
    // no-op
  }
}
