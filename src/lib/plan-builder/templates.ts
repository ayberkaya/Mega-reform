/** Step 1: pain point option ids (max 2 selectable). */
export const PAIN_POINT_OPTIONS = [
  { id: "mind-scattered", label: "Zihnim çok dağınık" },
  { id: "always-tired", label: "Sürekli yorgun hissediyorum" },
  { id: "lost-inner-peace", label: "İç huzurumu kaybettim" },
  { id: "hard-decisions", label: "Karar vermekte zorlanıyorum" },
  { id: "curious-no-start", label: "Merak ediyorum ama nereden başlayacağımı bilmiyorum" },
] as const;

export type PainPointId = (typeof PAIN_POINT_OPTIONS)[number]["id"];

/** Step 2: approach (single). */
export const APPROACH_OPTIONS = [
  { id: "short-calm", label: "Kısa, sakinleştirici pratikler" },
  { id: "deep-guided", label: "Derin, rehberli çalışmalar" },
  { id: "intuitive-tarot", label: "Sezgisel / içgörü odaklı (Tarot)" },
] as const;

export type ApproachId = (typeof APPROACH_OPTIONS)[number]["id"];

/** Step 3: time (single). */
export const TIME_OPTIONS = [
  { id: "5-10", label: "Günde 5–10 dk" },
  { id: "15-20", label: "Günde 15–20 dk" },
  { id: "few-days", label: "Haftada birkaç gün" },
] as const;

export type TimeId = (typeof TIME_OPTIONS)[number]["id"];

/** Progress step messages (Step 4). */
export const PROGRESS_MESSAGES = [
  "Yanıtların analiz ediliyor",
  "Sana uygun pratikler eşleştiriliyor",
  "Haftalık denge planı oluşturuluyor",
  "Rehber seçimi yapılıyor",
] as const;

/** Template: 14-day practice titles per pain point. Used when no content_items match. */
const PAIN_DAY_TITLES: Record<PainPointId, string[]> = {
  "mind-scattered": [
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
  "always-tired": [
    "Enerji nefesi",
    "Dinlenme meditasyonu",
    "Vücut taraması",
    "Yorgunluk rahatlatma",
    "Kısa yenilenme",
    "Nefesle enerji",
    "Dinlenme molası",
    "Gevşeme pratiği",
    "Uyku hazırlığı",
    "Enerji dengeleme",
    "Mini dinlenme",
    "Stres atma",
    "Tazelenme nefesi",
    "Hafif gevşeme",
  ],
  "lost-inner-peace": [
    "İç huzur nefesi",
    "Şükran meditasyonu",
    "Kabul pratiği",
    "Kalp merkezi",
    "Huzur alanı",
    "Şimdiki an",
    "Sevgi nefesi",
    "İç sessizlik",
    "Denge meditasyonu",
    "Güven pratiği",
    "Huzur nefesi",
    "Köklenme",
    "Merkezlenme",
    "İç barış",
  ],
  "hard-decisions": [
    "Netlik meditasyonu",
    "Sezgisel dinlenme",
    "Karar alanı",
    "İç ses",
    "Netlik nefesi",
    "Seçim farkındalığı",
    "Kısa netlik",
    "Zihin berraklığı",
    "Sezgi pratiği",
    "Karar huzuru",
    "Odak ve netlik",
    "İç rehber",
    "Netlik seti",
    "Karar meditasyonu",
  ],
  "curious-no-start": [
    "Keşif nefesi",
    "Başlangıç meditasyonu",
    "Merak pratiği",
    "İlk adım",
    "Kısa giriş",
    "Temel farkındalık",
    "Başlangıç seti",
    "Merak alanı",
    "Yumuşak giriş",
    "Keşif meditasyonu",
    "Temel pratik",
    "İlk hafta",
    "Merak nefesi",
    "Başlangıç dengesi",
  ],
};

/** Practice type slug for plan outline. */
export type PracticeTypeSlug = "audio" | "guided" | "tarot" | "breathing" | "meditation";

/** Approach → default practice type and style hint. */
const APPROACH_STYLE: Record<
  ApproachId,
  { primaryType: PracticeTypeSlug; guideCategory: string }
> = {
  "short-calm": { primaryType: "breathing", guideCategory: "nefes" },
  "deep-guided": { primaryType: "guided", guideCategory: "rehberli" },
  "intuitive-tarot": { primaryType: "tarot", guideCategory: "tarot" },
};

/** Time → default duration (sec) and sessions per week hint (for weekly minutes calc). */
export const TIME_CONFIG: Record<
  TimeId,
  { defaultDurationSec: number; sessionsPerWeek: number }
> = {
  "5-10": { defaultDurationSec: 420, sessionsPerWeek: 7 }, // ~7 min avg, 7 days
  "15-20": { defaultDurationSec: 1050, sessionsPerWeek: 7 }, // ~17.5 min, 7 days
  "few-days": { defaultDurationSec: 900, sessionsPerWeek: 3 }, // 15 min, 3 days
};

export function getPainPointLabel(id: string): string {
  return PAIN_POINT_OPTIONS.find((o) => o.id === id)?.label ?? id;
}

export function getApproachLabel(id: string): string {
  return APPROACH_OPTIONS.find((o) => o.id === id)?.label ?? id;
}

export function getTimeLabel(id: string): string {
  return TIME_OPTIONS.find((o) => o.id === id)?.label ?? id;
}

/** Get 14 day titles for a pain point (template-only). */
export function getPainDayTitles(painId: PainPointId): string[] {
  return PAIN_DAY_TITLES[painId] ?? PAIN_DAY_TITLES["curious-no-start"];
}

/** Get approach style for type/guide category. */
export function getApproachStyle(approachId: ApproachId) {
  return APPROACH_STYLE[approachId] ?? APPROACH_STYLE["short-calm"];
}
