/** localStorage key for plan builder state. No PII. */
export const PLAN_STORAGE_KEY = "mr_plan_v1";

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
}

export interface PlanBuilderAnswers {
  painPoints: string[];
  approach: string;
  time: string;
}

export interface SavedPlanState {
  answers: PlanBuilderAnswers;
  plan: PlanOutline;
  savedAt: number;
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
      !Array.isArray((parsed as SavedPlanState).answers?.painPoints) ||
      !Array.isArray((parsed as SavedPlanState).plan?.days)
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
