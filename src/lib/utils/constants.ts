export const SITE_NAME = "Mega Reform";
export const SITE_DESCRIPTION =
  "Meditasyon, yoga, tarot ve ruhsal gelişim için uzman rehberlik platformu.";
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const CATEGORIES = [
  { name: "Meditasyon", slug: "meditasyon", icon: "lotus", color: "#9DC183" },
  { name: "Yoga", slug: "yoga", icon: "yoga", color: "#D4AF37" },
  { name: "Tarot", slug: "tarot", icon: "tarot", color: "#4A2D7A" },
  { name: "Ruhsal Gelişim", slug: "ruhsal-gelisim", icon: "chakra", color: "#D3D3FF" },
  { name: "Nefes Teknikleri", slug: "nefes-teknikleri", icon: "wind", color: "#B8D4A3" },
  { name: "Mindfulness", slug: "mindfulness", icon: "mind", color: "#E5C85A" },
] as const;

export const SUBSCRIPTION_PLANS = [
  {
    id: "FREE",
    name: "Ücretsiz",
    price: 0,
    description: "Ruhsal yolculuğunuza ilk adımınızı atın",
    features: [
      "Ayda 3 makale erişimi",
      "Uzman profillerini inceleyin",
      "Yapay zeka rehberiniz",
    ],
  },
  {
    id: "BASIC",
    name: "Keşfet",
    price: 49,
    description: "İç dünyanızı keşfetmeye başlayın",
    features: [
      "Sınırsız makale erişimi",
      "Ayda 2 kurs",
      "Uzman yorumları",
      "Haftalık bülten",
    ],
  },
  {
    id: "PREMIUM",
    name: "Dönüşüm",
    price: 99,
    popular: true,
    description: "Ruhsal dönüşümünüzü hızlandırın",
    features: [
      "Tüm içerik erişimi",
      "Sınırsız kurs",
      "Uzman mesajlaşması",
      "Canlı seanslara katılım",
      "Öncelikli destek",
    ],
  },
  {
    id: "UNLIMITED",
    name: "Aydınlanma",
    price: 179,
    description: "Sınırsızlığı deneyimleyin",
    features: [
      "Dönüşüm planındaki her şey",
      "Bire bir uzman görüşmeleri",
      "Özel meditasyon programı",
      "VIP topluluk erişimi",
      "Öncelikli destek",
    ],
  },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/uzmanlar", label: "Uzmanlar" },
  { href: "/makaleler", label: "Makaleler" },
  { href: "/kurslar", label: "Kurslar" },
  { href: "/videolar", label: "Videolar" },
] as const;
