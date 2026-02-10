import type { PlanDayOutline, PlanOutline, PlanBuilderAnswers } from "./storage";
import {
  getIntentionLabel,
  getCurrentStateLabel,
  getApproachDepthLabel,
  getModalityLabel,
  getGuidanceStyleLabel,
  TIME_CONFIG,
  type IntentionId,
  type CurrentStateId,
  type ApproachDepthId,
  type TimeId,
  type GuidanceStyleId,
} from "./templates";

/** Deterministic hash-like seed from answers for stable variation. */
function seedFromAnswers(a: PlanBuilderAnswers): number {
  const s =
    a.intention +
    a.currentState.join(",") +
    a.approachDepth +
    a.modalities.join(",") +
    a.time +
    a.guidanceStyle;
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/** Plan title templates: intention + depth influence wording. */
const TITLE_TEMPLATES: Record<string, string[]> = {
  "mental-clarity": [
    "Zihinsel Netlik için 14 Günlük Yol Haritası",
    "Netlik ve Odak: 14 Günlük Plan",
  ],
  "emotional-balance": [
    "Denge ve Netlik için 14 Günlük Yol Haritası",
    "Duygusal Denge: 14 Günlük Rehber",
  ],
  "inner-strength": [
    "İçsel Güçlenme için 14 Günlük Yol Haritası",
    "İçsel Güç: 14 Günlük Plan",
  ],
  intuition: [
    "Sezgi ve Farkındalık: 14 Günlük Yol Haritası",
    "Sezgilerini Geliştir: 14 Günlük Plan",
  ],
  "self-knowledge": [
    "Kendini Tanıma: 14 Günlük Yol Haritası",
    "İç Keşif: 14 Günlük Plan",
  ],
};

/** Day practice titles by intention (14 each). Different intentions = different plans. */
const DAY_TITLES_BY_INTENTION: Record<string, string[]> = {
  "mental-clarity": [
    "Odak nefesi",
    "Zihin sakinleştirme",
    "Tek nokta meditasyonu",
    "Dikkat toplama",
    "Nefes sayımı",
    "Mindfulness başlangıç",
    "Zihin berraklığı",
    "Kısa odak pratiği",
    "Nefes farkındalığı",
    "Düşünce gözlemi",
    "Sessizlik pratiği",
    "Odaklanma seti",
    "Günlük mini meditasyon",
    "Zihin dinlendirme",
  ],
  "emotional-balance": [
    "Duygu farkındalığı",
    "Denge nefesi",
    "Kabul pratiği",
    "Kalp merkezi",
    "Duygusal köklenme",
    "Şimdiki an",
    "Sevgi nefesi",
    "İç sessizlik",
    "Denge meditasyonu",
    "Güven pratiği",
    "Huzur nefesi",
    "Duygu gözlemi",
    "Merkezlenme",
    "İç barış",
  ],
  "inner-strength": [
    "Güç nefesi",
    "Köklenme meditasyonu",
    "İç kaynak",
    "Dayanıklılık pratiği",
    "Sınır farkındalığı",
    "Güven alanı",
    "Nefesle güç",
    "Durabilme pratiği",
    "İçsel dayanak",
    "Cesaret nefesi",
    "Kabul ve güç",
    "Merkez meditasyonu",
    "Günlük köklenme",
    "İçsel denge",
  ],
  intuition: [
    "Sezgi nefesi",
    "İç ses dinleme",
    "Sembol farkındalığı",
    "Sezgisel alan",
    "Sessiz bilgelik",
    "İç rehber",
    "Sezgi meditasyonu",
    "Farkındalık pratiği",
    "Sezgisel dinlenme",
    "İç bilgi",
    "Sezgi nefesi",
    "Derin dinleme",
    "Sezgisel netlik",
    "İç ışık",
  ],
  "self-knowledge": [
    "Kendini tanıma nefesi",
    "İç keşif",
    "Kimlik farkındalığı",
    "Değerler pratiği",
    "Öz-şefkat",
    "İç gözlem",
    "Kabul meditasyonu",
    "Kendini dinleme",
    "Öz farkındalık",
    "İç yolculuk",
    "Kendini tanıma seti",
    "Derin dinlenme",
    "Öz keşif",
    "İç bütünlük",
  ],
};

const DEFAULT_DAY_TITLES = DAY_TITLES_BY_INTENTION["mental-clarity"]!;

/** Primary practice type from modalities + guidance. */
function getPrimaryType(
  modalities: string[],
  guidanceStyle: string
): "audio" | "guided" | "written" | "visual" | "tarot" {
  if (modalities.includes("intuitive")) return "tarot";
  if (modalities.includes("audio")) return "audio";
  if (modalities.includes("visual")) return "visual";
  if (modalities.includes("written")) return "written";
  return "guided";
}

/**
 * Deterministic 14-day plan from answers. Different combinations yield visibly different plans.
 */
export function generatePlan(answers: PlanBuilderAnswers): PlanOutline {
  const seed = seedFromAnswers(answers);
  const timeConfig = TIME_CONFIG[answers.time as TimeId] ?? TIME_CONFIG["5-7"];
  const intention = answers.intention as IntentionId;
  const titlesPool =
    DAY_TITLES_BY_INTENTION[intention] ?? DEFAULT_DAY_TITLES;

  const titleTemplates = TITLE_TEMPLATES[intention] ?? TITLE_TEMPLATES["mental-clarity"]!;
  const titleIndex = seed % titleTemplates.length;
  const planTitle = titleTemplates[titleIndex]!;

  const days: PlanDayOutline[] = titlesPool.map((title, i) => {
    const day = i + 1;
    const durationSec = timeConfig.defaultDurationSec;
    const type = getPrimaryType(answers.modalities, answers.guidanceStyle);
    const suggestedGuideCategory =
      answers.guidanceStyle === "calm-supportive"
        ? "sakin"
        : answers.guidanceStyle === "clear-directive"
          ? "net"
          : "sorgulayan";
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

  const painChips = answers.currentState.map((id) => getCurrentStateLabel(id));
  const approachChip = getApproachDepthLabel(answers.approachDepth);

  const chips: string[] = [
    getIntentionLabel(answers.intention),
    ...answers.currentState.map(getCurrentStateLabel),
    ...answers.modalities.map(getModalityLabel),
  ];

  return {
    title: planTitle,
    days,
    weeklyMinutes,
    painChips,
    approachChip,
    chips,
  };
}

/** Short personalized sentence for plan reveal (Step 8). */
export function getPersonalSentence(answers: PlanBuilderAnswers): string {
  const intentionLabel = getIntentionLabel(answers.intention);
  const depthLabel = getApproachDepthLabel(answers.approachDepth);
  const parts: string[] = [];
  parts.push(`Bu plan, ${intentionLabel.toLowerCase()} odağında,`);
  if (answers.approachDepth === "light-regular") {
    parts.push("hafif ama sürdürülebilir bir ritimle ilerler.");
  } else if (answers.approachDepth === "balanced-guided") {
    parts.push("dengeli ve rehberli bir yol haritasıyla ilerler.");
  } else {
    parts.push("derin ve dönüştürücü bir ritimle ilerler.");
  }
  return parts.join(" ");
}
