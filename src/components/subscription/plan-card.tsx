"use client";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils/format";

interface PlanCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  features: readonly string[];
  popular?: boolean;
  currentPlan?: boolean;
  onSelect?: (planId: string) => void;
}

export function PlanCard({
  id,
  name,
  price,
  description,
  features,
  popular,
  currentPlan,
  onSelect,
}: PlanCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border p-6 md:p-8 flex flex-col transition-all duration-300",
        popular
          ? "border-gold/50 bg-gradient-to-b from-gold/5 to-transparent shadow-xl scale-[1.02]"
          : "border-lavender/20 bg-white hover:shadow-lg hover:-translate-y-1",
        currentPlan && "ring-2 ring-sage"
      )}
    >
      {popular && (
        <Badge
          variant="gold"
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4"
        >
          En Populer
        </Badge>
      )}

      <div className="mb-6">
        <h3 className="font-heading text-2xl font-bold text-primary mb-1">
          {name}
        </h3>
        <p className="text-foreground/50 text-sm">{description}</p>
      </div>

      <div className="mb-6">
        {price === 0 ? (
          <span className="font-heading text-4xl font-bold text-primary">
            Ucretsiz
          </span>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="font-heading text-4xl font-bold text-primary">
              {formatCurrency(price)}
            </span>
            <span className="text-foreground/40 text-sm">/ ay</span>
          </div>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <svg
              className="w-5 h-5 text-sage shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-foreground/70">{feature}</span>
          </li>
        ))}
      </ul>

      {currentPlan ? (
        <Button variant="secondary" size="lg" className="w-full" disabled>
          Mevcut Plan
        </Button>
      ) : (
        <Button
          variant={popular ? "gold" : "primary"}
          size="lg"
          className="w-full"
          onClick={() => onSelect?.(id)}
        >
          {price === 0 ? "Ucretsiz Basla" : "Bu Plani Sec"}
        </Button>
      )}
    </div>
  );
}
