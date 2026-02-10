"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";

const ITEMS = [
  {
    q: "Neden her şey kilitli görünüyor?",
    a: "Üyelikle tüm pratiklere erişirsin. Önizleme (kısa kesit veya metin) ücretsiz; tam içerik üyelikle açılır. Böylece önce deneyip sonra karar verebilirsin.",
  },
  {
    q: "Önizleme nedir?",
    a: "Her pratikte ücretsiz dinleyebileceğin veya okuyabileceğin kısa bir bölüm vardır (ör. 60–90 saniye ses). Tam pratik üyelikle açılır.",
  },
  {
    q: "Üyelik iptali nasıl?",
    a: "İstediğin zaman iptal edebilirsin. İptal sonrası dönem sonuna kadar erişimin devam eder; yenileme yapılmaz.",
  },
  {
    q: "Hangi seviyeye uygun?",
    a: "Başlangıçtan ileri seviyeye pratikler var. Kayıt sırasında hedefini ve deneyimini seçersen sana uygun plan oluşturulur.",
  },
  {
    q: "Tarot + meditasyon birlikte olur mu?",
    a: "Evet. Platformda meditasyon, mindfulness ve sembol/rehberlik odaklı pratikler bir arada. Hedefine göre hangisine ağırlık vereceğin plana yansır.",
  },
] as const;

export function Faq() {
  return (
    <section className="py-20 md:py-28 bg-background border-b border-lavender/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Sıkça sorulan sorular
          </h2>
        </ScrollReveal>
        <ul className="max-w-2xl mx-auto space-y-6">
          {ITEMS.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <li className="rounded-2xl border border-lavender/20 bg-white p-5 md:p-6">
                <h3 className="font-heading font-semibold text-foreground">
                  {item.q}
                </h3>
                <p className="mt-3 font-body text-sm text-foreground/80 leading-relaxed">
                  {item.a}
                </p>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
