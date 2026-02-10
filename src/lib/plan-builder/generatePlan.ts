import type { PlanDayOutline, PlanOutline, PlanBuilderAnswers } from "./storage";
import {
  getPainDayTitles,
  getApproachStyle,
  getPainPointLabel,
  getApproachLabel,
  TIME_CONFIG,
  type PainPointId,
  type ApproachId,
  type TimeId,
} from "./templates";

/** Content item list fields only (no fullUrl/fullText). Optional match for plan days. */
export interface ContentItemListFields {
  id: string;
  title?: string | null;
  guideName?: string | null;
  type?: string | null;
  durationSec?: number | null;
  tags?: string[] | null;
  goal?: string | null;
}

const PLAN_TITLE = "14 Günlük Kişisel Plan";

/**
 * Deterministic 14-day plan from answers. Uses templates; optionally fills from contentItems (list fields only).
 */
export function generatePlan(
  answers: PlanBuilderAnswers,
  contentItems?: ContentItemListFields[] | null
): PlanOutline {
  const [pain1, pain2] = answers.painPoints as (PainPointId | undefined)[];
  const approach = answers.approach as ApproachId;
  const timeId = answers.time as TimeId;

  const timeConfig = TIME_CONFIG[timeId] ?? TIME_CONFIG["5-10"];
  const style = getApproachStyle(approach);

  const titles1 = pain1 ? getPainDayTitles(pain1) : [];
  const titles2 = pain2 ? getPainDayTitles(pain2) : [];
  const combinedTitles = mergeDayTitles(titles1, titles2, 14);

  const days: PlanDayOutline[] = combinedTitles.map((title, i) => {
    const day = i + 1;
    let durationSec = timeConfig.defaultDurationSec;
    let type = style.primaryType;
    let suggestedGuideCategory = style.guideCategory;

    if (contentItems && contentItems.length > 0) {
      const match = findBestContentMatch(
        contentItems,
        day,
        pain1,
        pain2,
        approach,
        timeConfig.defaultDurationSec
      );
      if (match) {
        return {
          day,
          title: match.title ?? title,
          durationSec: match.durationSec ?? durationSec,
          type: match.type ?? type,
          suggestedGuideCategory: match.suggestedGuideCategory ?? suggestedGuideCategory,
        };
      }
    }

    return {
      day,
      title,
      durationSec,
      type,
      suggestedGuideCategory,
    };
  });

  const weeklyMinutes = Math.round(
    (timeConfig.defaultDurationSec * timeConfig.sessionsPerWeek) / 60
  );

  const painChips = answers.painPoints.map((id) => getPainPointLabel(id));
  const approachChip = getApproachLabel(approach);

  return {
    title: PLAN_TITLE,
    days,
    weeklyMinutes,
    painChips,
    approachChip,
  };
}

function mergeDayTitles(a: string[], b: string[], count: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    if (a[i] && b[i]) {
      out.push(i % 2 === 0 ? a[i]! : b[i]!);
    } else {
      out.push(a[i] ?? b[i] ?? `Gün ${i + 1} pratiği`);
    }
  }
  return out;
}

function findBestContentMatch(
  items: ContentItemListFields[],
  day: number,
  pain1?: PainPointId,
  pain2?: PainPointId,
  approach?: ApproachId,
  preferredDurationSec?: number
): Partial<PlanDayOutline> | null {
  const painGoals = new Set<string>();
  if (pain1) painGoals.add(pain1);
  if (pain2) painGoals.add(pain2);

  const byGoal = items.filter((item) => {
    const g = item.goal?.toLowerCase();
    const tags = (item.tags ?? []).map((t) => t.toLowerCase());
    if (!g && tags.length === 0) return true;
    return (
      (g && painGoals.has(g as PainPointId)) ||
      tags.some((t) => painGoals.has(t as PainPointId))
    );
  });
  const pool = byGoal.length > 0 ? byGoal : items;

  const idx = (day - 1) % pool.length;
  const item = pool[idx];
  if (!item) return null;

  return {
    title: item.title ?? undefined,
    durationSec: item.durationSec ?? preferredDurationSec ?? undefined,
    type: item.type ?? undefined,
    suggestedGuideCategory: item.guideName ?? undefined,
  };
}
