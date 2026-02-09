"use client";

import { useRouter } from "next/navigation";
import { PlanCard } from "@/components/subscription/plan-card";
import { SUBSCRIPTION_PLANS } from "@/lib/utils/constants";
import { tr } from "@/content/tr";

export default function SubscriptionPage() {
  const router = useRouter();

  const handleSelectPlan = async (planId: string) => {
    if (planId === "FREE") return;

    // TODO: Create Stripe Checkout Session
    // For now, show coming soon
    alert("Stripe odeme entegrasyonu yaklnda aktif olacak!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-3">
          {tr.subscription.title}
        </h1>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          {tr.subscription.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            id={plan.id}
            name={plan.name}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            popular={"popular" in plan && plan.popular === true}
            currentPlan={plan.id === "FREE"}
            onSelect={handleSelectPlan}
          />
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="font-heading text-2xl font-bold text-primary text-center mb-6">
          Sikca Sorulan Sorular
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Planimı istedigim zaman degistirebilir miyim?",
              a: "Evet, planinizi istediginiz zaman yukseltebilir veya dusurtebilirsiniz. Degisiklik bir sonraki fatura doneminde gecerli olur.",
            },
            {
              q: "Odeme yontemleri nelerdir?",
              a: "Kredi karti ve banka karti ile TL uzerinden odeme yapabilirsiniz.",
            },
            {
              q: "İptal etmek için ne yapmam gerekiyor?",
              a: "Ayarlar sayfasından istediğiniz zaman aboneliğinizi iptal edebilirsiniz. Mevcut dönem sonuna kadar erişimleriniz devam eder.",
            },
          ].map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-lavender/20 bg-white overflow-hidden"
            >
              <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-foreground/80 hover:bg-lavender/5 transition-colors">
                {faq.q}
                <svg
                  className="w-5 h-5 text-foreground/40 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-4 pb-4 text-sm text-foreground/60">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
