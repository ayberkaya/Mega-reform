/**
 * Fallback focus + viewpoint when expert is derived from content_items only
 * (no ExpertProfile). Key = guideName (exact match, trimmed).
 */
export type GuideProfile = {
  focus: string;
  viewpoint: string;
};

const profiles: Record<string, GuideProfile> = {
  "Mega Reform": {
    focus: "Meditasyon Rehberi",
    viewpoint: "Farkındalık ve nefes odaklı pratiklerle günlük sakinlik.",
  },
  "Ayşe Nur Yılmaz": {
    focus: "Meditasyon Rehberi",
    viewpoint: "Nefes ve beden farkındalığı ile günlük stresi azaltmak.",
  },
  "Mehmet Can Demir": {
    focus: "Mindfulness Rehberi",
    viewpoint: "Bilinçli farkındalık ve odaklanma pratikleriyle zihinsel netlik.",
  },
  "Elif Sena Kara": {
    focus: "Uyku ve Rahatlama Rehberi",
    viewpoint: "Gece ritüelleri ve gevşeme teknikleriyle kaliteli uyku.",
  },
  "Ahmet Barış Öztürk": {
    focus: "Duygusal Denge Rehberi",
    viewpoint: "Duyguları tanımak ve dengeyi güçlendirmek için rehberli pratikler.",
  },
};

export function getGuideProfile(guideName: string | null): GuideProfile | null {
  if (!guideName?.trim()) return null;
  const key = guideName.trim();
  return profiles[key] ?? null;
}

export function getGuideViewpoint(guideName: string | null): string | null {
  return getGuideProfile(guideName)?.viewpoint ?? null;
}

export function getGuideFocus(guideName: string | null): string | null {
  return getGuideProfile(guideName)?.focus ?? null;
}
