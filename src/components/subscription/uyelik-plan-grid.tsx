"use client";

import { useRouter } from "next/navigation";
import { PlanCard } from "@/components/subscription/plan-card";
import { SUBSCRIPTION_PLANS } from "@/lib/utils/constants";

export function UyelikPlanGrid() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-5 items-stretch">
      {SUBSCRIPTION_PLANS.map((plan) => (
        <PlanCard
          key={plan.id}
          id={plan.id}
          name={plan.name}
          price={plan.price}
          description={plan.description}
          features={[...plan.features]}
          popular={plan.popular}
          onSelect={() => router.push("/basla")}
        />
      ))}
    </div>
  );
}
