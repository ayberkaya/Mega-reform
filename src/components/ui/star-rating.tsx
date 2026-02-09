"use client";

import { cn } from "@/lib/utils/cn";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  interactive = false,
  onChange,
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: maxStars }, (_, i) => {
        const filled = i < Math.floor(rating);
        const halfFilled = !filled && i < rating;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(i + 1)}
            className={cn(
              "transition-colors duration-200",
              interactive && "cursor-pointer hover:scale-110",
              !interactive && "cursor-default"
            )}
          >
            <svg
              className={cn(
                sizeMap[size],
                filled
                  ? "text-gold fill-gold"
                  : halfFilled
                    ? "text-gold fill-gold/50"
                    : "text-lavender/40 fill-lavender/10"
              )}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                stroke="currentColor"
                strokeWidth="1"
                fill="currentFill"
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
