/**
 * Demo expert data when DB has no experts. Stock images from Unsplash (portrait, calm/professional).
 * Used by: FeaturedExperts (landing), /uzmanlar, /uzmanlar/[slug].
 */
const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop`;

export interface DemoExpertBase {
  slug: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  bio: string;
  image: string;
}

export interface DemoExpertListing extends DemoExpertBase {
  reviewCount: number;
  isVerified: boolean;
  yearsExperience: number;
}

export interface DemoExpertProfile extends DemoExpertListing {
  longBio: string;
  website: string | null;
  socialLinks: Record<string, string>;
}

export const DEMO_EXPERTS_LANDING: DemoExpertBase[] = [
  {
    slug: "ayse-nur-yilmaz",
    name: "Ayşe Nur Yılmaz",
    title: "Meditasyon Rehberi",
    specialties: ["Meditasyon", "Mindfulness"],
    rating: 4.9,
    bio: "15 yıllık deneyimle iç huzur yolculuğunuzda rehberlik ediyorum.",
    image: IMG("1594744803329-e58b31de8bf5"),
  },
  {
    slug: "mehmet-can-demir",
    name: "Mehmet Can Demir",
    title: "Yoga Eğitmeni",
    specialties: ["Yoga", "Nefes Teknikleri"],
    rating: 4.8,
    bio: "Beden ve ruh uyumunu keşfetmeniz için yanınızdayım.",
    image: IMG("1507003211169-0a1dd7228f2d"),
  },
  {
    slug: "elif-sena-kara",
    name: "Elif Sena Kara",
    title: "Tarot Okuyucusu",
    specialties: ["Tarot", "Ruhsal Gelişim"],
    rating: 4.7,
    bio: "Evrenin mesajlarını birlikte yorumluyoruz.",
    image: IMG("1531746020798-e6953c6e8e04"),
  },
  {
    slug: "ahmet-baris-ozturk",
    name: "Ahmet Barış Öztürk",
    title: "Ruhsal Danışmanı",
    specialties: ["Ruhsal Gelişim", "Meditasyon"],
    rating: 4.9,
    bio: "Ruhsal dönüşüm yolculuğunuzda size ışık tutuyorum.",
    image: IMG("1500648767791-00dcc994a43e"),
  },
];

export const DEMO_EXPERTS: DemoExpertProfile[] = [
  {
    slug: "ayse-nur-yilmaz",
    name: "Ayşe Nur Yılmaz",
    title: "Meditasyon Rehberi",
    specialties: ["Meditasyon", "Mindfulness"],
    rating: 4.9,
    reviewCount: 47,
    bio: "15 yıllık deneyimle iç huzur yolculuğunuzda rehberlik ediyorum. Mindfulness ve meditasyon teknikleriyle hayatınıza denge katıyorum.",
    longBio:
      "15 yıldır meditasyon ve mindfulness alanında çalışıyorum. Hindistan ve Nepal'de aldığı eğitimlerle Doğu felsefesini modern yaşama uyarlıyorum.\n\nHer birey için özel tasarlanmış meditasyon programlarıyla, stres yönetimi, uyku düzeni ve duygusal denge konularında destek sunuyorum.",
    isVerified: true,
    yearsExperience: 15,
    website: "https://aysenur.example.com",
    socialLinks: { instagram: "aysenur_meditation", youtube: "AyseNurYilmaz" },
    image: IMG("1594744803329-e58b31de8bf5"),
  },
  {
    slug: "mehmet-can-demir",
    name: "Mehmet Can Demir",
    title: "Yoga Eğitmeni",
    specialties: ["Yoga", "Nefes Teknikleri"],
    rating: 4.8,
    reviewCount: 35,
    bio: "Beden ve ruh uyumunu keşfetmeniz için yanınızdayım. Hatha ve Vinyasa yoga derslerimle iç dengenizi bulun.",
    longBio:
      "Yoga pratiğiyle 12 yıldır hayatımı şekillendiriyorum. Rishikesh'te 500 saatlik yoga öğretmenlik eğitimimi tamamladıktan sonra Türkiye'de yoga öğretmenliğine başladım.",
    isVerified: true,
    yearsExperience: 12,
    website: null,
    socialLinks: { instagram: "mehmetcan_yoga" },
    image: IMG("1507003211169-0a1dd7228f2d"),
  },
  {
    slug: "elif-sena-kara",
    name: "Elif Sena Kara",
    title: "Tarot Okuyucusu",
    specialties: ["Tarot", "Ruhsal Gelişim"],
    rating: 4.7,
    reviewCount: 28,
    bio: "Evrenin mesajlarını birlikte yorumluyoruz. Tarot okumalarımla yaşam yolculuğunuzda ilham bulun.",
    longBio:
      "8 yıldır tarot ve ruhsal gelişim alanında çalışıyorum. Rider-Waite ve Marseille tarot desteleriyle çalışarak danışanlarıma yaşam yolculuklarında rehberlik ediyorum.",
    isVerified: false,
    yearsExperience: 8,
    website: null,
    socialLinks: {},
    image: IMG("1531746020798-e6953c6e8e04"),
  },
  {
    slug: "ahmet-baris-ozturk",
    name: "Ahmet Barış Öztürk",
    title: "Ruhsal Danışmanı",
    specialties: ["Ruhsal Gelişim", "Meditasyon"],
    rating: 4.9,
    reviewCount: 52,
    bio: "Ruhsal dönüşüm yolculuğunuzda size ışık tutuyorum. Kişisel gelişim ve farkındalık seanslarımla kendinizi keşfedeceksiniz.",
    longBio:
      "20 yıllık deneyimimle ruhsal gelişim ve meditasyon alanlarında binlerce kişiye rehberlik ettim.",
    isVerified: true,
    yearsExperience: 20,
    website: "https://ahmetbaris.example.com",
    socialLinks: { instagram: "ahmetbaris_spiritual", youtube: "AhmetBarisOzturk" },
    image: IMG("1500648767791-00dcc994a43e"),
  },
  {
    slug: "zeynep-aslan",
    name: "Zeynep Aslan",
    title: "Nefes Terapisti",
    specialties: ["Nefes Teknikleri", "Mindfulness"],
    rating: 4.6,
    reviewCount: 19,
    bio: "Nefes çalışmalarıyla bedeninizin doğal şifa gücünü keşfetmenize yardımcı oluyorum.",
    longBio: "Nefes terapisi alanında 6 yıldır çalışıyorum.",
    isVerified: false,
    yearsExperience: 6,
    website: null,
    socialLinks: { instagram: "zeynep_breathwork" },
    image: IMG("1573496359142-b8d87734a5a2"),
  },
  {
    slug: "ali-riza-celik",
    name: "Ali Rıza Çelik",
    title: "Mindfulness Koçu",
    specialties: ["Mindfulness", "Yoga"],
    rating: 4.8,
    reviewCount: 31,
    bio: "Anın gücüyle bağlantı kurmak için mindfulness pratiğiyle hayatınıza yeni bir bakış açısı katıyorum.",
    longBio: "10 yıldır mindfulness ve farkındalık çalışmalarıyla bireylere ve kurumlara hizmet veriyorum.",
    isVerified: true,
    yearsExperience: 10,
    website: "https://aliriza.example.com",
    socialLinks: { instagram: "aliriza_mindful" },
    image: IMG("1472099645785-5658abf4ff4e"),
  },
];
