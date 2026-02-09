import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-lavender/20 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 ease-[var(--ease-spiritual)] hover:shadow-lg hover:-translate-y-1",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardGlass = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg transition-all duration-300 ease-[var(--ease-spiritual)] hover:shadow-xl hover:-translate-y-1",
        className
      )}
      {...props}
    />
  )
);
CardGlass.displayName = "CardGlass";

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pb-0", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardGlass, CardHeader, CardContent, CardFooter };
