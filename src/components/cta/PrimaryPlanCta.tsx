"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { buttonVariants } from "@/components/ui/button";

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
 * Single main CTA: "Sana özel planını oluştur" → /basla.
 * Primary/gold = filled; secondary = outline.
 */
export function PrimaryPlanCta({
  variant = "primary",
  size = "md",
  className,
  onClick,
}: PrimaryPlanCtaProps) {
  const buttonVariant =
    variant === "secondary" ? "secondary" : variant === "gold" ? "gold" : "primary";
  return (
    <Link
      href={PLAN_PATH}
      className={cn(buttonVariants({ variant: buttonVariant, size }), className)}
      aria-label={PRIMARY_PLAN_CTA_LABEL}
      onClick={onClick}
    >
      {PRIMARY_PLAN_CTA_LABEL}
    </Link>
  );
}
