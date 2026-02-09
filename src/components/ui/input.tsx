import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-xl border bg-white/80 px-4 py-2 text-base font-body text-foreground shadow-sm transition-all duration-300",
            "placeholder:text-foreground/40",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:border-lavender",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-400 focus-visible:ring-red-300"
              : "border-lavender/30 hover:border-lavender/60",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
