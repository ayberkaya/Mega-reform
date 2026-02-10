"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { buttonVariants } from "@/components/ui/button";
import { usePlanBuilder } from "@/providers/PlanBuilderProvider";

export const PRIMARY_PLAN_CTA_LABEL = "Sana özel planını oluştur";
export const PLAN_PATH = "/basla";

type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

export interface PrimaryPlanCtaProps {
  /** primary = filled, secondary = outline; gold = filled accent (same destination) */
  variant?: "primary" | "secondary" | "gold";
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
}

/**
 * Single main CTA: "Sana özel planını oluştur".
 * With JS + PlanBuilderProvider: opens Plan Builder modal (no navigation).
 * Fallback (no JS or provider): navigates to /basla.
 */
export function PrimaryPlanCta({
  variant = "primary",
  size = "md",
  className,
  onClick,
}: PrimaryPlanCtaProps) {
  const planBuilder = usePlanBuilder();
  const buttonVariant =
    variant === "secondary" ? "secondary" : variant === "gold" ? "gold" : "primary";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (planBuilder) {
      e.preventDefault();
      planBuilder.openPlanBuilder();
    }
    onClick?.();
  };

  return (
    <Link
      href={PLAN_PATH}
      className={cn(buttonVariants({ variant: buttonVariant, size }), className)}
      aria-label={PRIMARY_PLAN_CTA_LABEL}
      onClick={handleClick}
    >
      {PRIMARY_PLAN_CTA_LABEL}
    </Link>
  );
}
