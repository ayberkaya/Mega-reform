/** Step 1: intention (single select). */
export const INTENTION_OPTIONS = [
  { id: "mental-clarity", label: "Zihinsel netlik" },
  { id: "emotional-balance", label: "Duygusal denge" },
  { id: "inner-strength", label: "İçsel güçlenme" },
  { id: "intuition", label: "Sezgilerimi geliştirmek" },
  { id: "self-knowledge", label: "Kendimi daha iyi tanımak" },
] as const;

export type IntentionId = (typeof INTENTION_OPTIONS)[number]["id"];

/** Step 2: current state (multi, max 3). */
export const CURRENT_STATE_OPTIONS = [
  { id: "mind-full", label: "Sürekli zihnim dolu" },
  { id: "procrastination", label: "Ertelemekten yoruldum" },
  { id: "energy-fluctuating", label: "Enerjim çok dalgalı" },
  { id: "decision-stuck", label: "Karar verirken tıkanıyorum" },
  { id: "hard-to-turn-inward", label: "İçime dönmekte zorlanıyorum" },
  { id: "feel-alone", label: "Yalnız hissediyorum" },
] as const;

export type CurrentStateId = (typeof CURRENT_STATE_OPTIONS)[number]["id"];

/** Step 3: approach depth (single). */
export const APPROACH_DEPTH_OPTIONS = [
  { id: "light-regular", label: "Hafif ve düzenli" },
  { id: "balanced-guided", label: "Dengeli ve rehberli" },
  { id: "deep-transformative", label: "Derin ve dönüştürücü" },
] as const;

export type ApproachDepthId = (typeof APPROACH_DEPTH_OPTIONS)[number]["id"];

/** Step 4: modality (multi). */
export const MODALITY_OPTIONS = [
  { id: "audio", label: "Sesli rehberlik", icon: "audio" },
  { id: "written", label: "Yazılı farkındalık çalışmaları", icon: "written" },
  { id: "visual", label: "Görsel anlatım", icon: "visual" },
  { id: "intuitive", label: "Sezgisel çalışmalar (Tarot / semboller)", icon: "intuitive" },
] as const;

export type ModalityId = (typeof MODALITY_OPTIONS)[number]["id"];

/** Step 5: time (single). */
export const TIME_OPTIONS = [
  { id: "5-7", label: "Günde 5–7 dk", weeklyMinutes: 35 },
  { id: "10-15", label: "Günde 10–15 dk", weeklyMinutes: 87 },
  { id: "few-days", label: "Haftada birkaç gün", weeklyMinutes: 45 },
  { id: "variable", label: "Zamanım değişken", weeklyMinutes: 30 },
] as const;

export type TimeId = (typeof TIME_OPTIONS)[number]["id"];

/** Step 6: guidance style (single). */
export const GUIDANCE_STYLE_OPTIONS = [
  { id: "calm-supportive", label: "Sakin ve destekleyici" },
  { id: "clear-directive", label: "Net ve yön gösteren" },
  { id: "inquiry-deepening", label: "Sorgulatan ve derinleştiren" },
] as const;

export type GuidanceStyleId = (typeof GUIDANCE_STYLE_OPTIONS)[number]["id"];

/** Synthesis stage messages (Step 7). Neutral language, no "AI analiz". */
export const SYNTHESIS_MESSAGES = [
  "Niyetin ve ihtiyaçların eşleştiriliyor",
  "Uygun pratik yoğunluğu hesaplanıyor",
  "Rehber yaklaşımı belirleniyor",
  "Denge dağılımı ayarlanıyor",
  "İlk 14 gün yapılandırılıyor",
] as const;

/** Time → default duration (sec) and sessions per week for plan generation. */
export const TIME_CONFIG: Record<
  TimeId,
  { defaultDurationSec: number; sessionsPerWeek: number }
> = {
  "5-7": { defaultDurationSec: 360, sessionsPerWeek: 7 },
  "10-15": { defaultDurationSec: 750, sessionsPerWeek: 7 },
  "few-days": { defaultDurationSec: 900, sessionsPerWeek: 3 },
  variable: { defaultDurationSec: 420, sessionsPerWeek: 4 },
};

export function getIntentionLabel(id: string): string {
  return INTENTION_OPTIONS.find((o) => o.id === id)?.label ?? id;
}

export function getCurrentStateLabel(id: string): string {
  return CURRENT_STATE_OPTIONS.find((o) => o.id === id)?.label ?? id;
}

export function getApproachDepthLabel(id: string): string {
  return APPROACH_DEPTH_OPTIONS.find((o) => o.id === id)?.label ?? id;
}

export function getModalityLabel(id: string): string {
  return MODALITY_OPTIONS.find((o) => o.id === id)?.label ?? id;
}

export function getTimeLabel(id: string): string {
  return TIME_OPTIONS.find((o) => o.id === id)?.label ?? id;
}

export function getGuidanceStyleLabel(id: string): string {
  return GUIDANCE_STYLE_OPTIONS.find((o) => o.id === id)?.label ?? id;
}

/** Weekly minutes estimate for time option (for live display in Step 5). */
export function getWeeklyMinutesEstimate(timeId: string): number {
  const opt = TIME_OPTIONS.find((o) => o.id === timeId);
  return opt?.weeklyMinutes ?? 35;
}
