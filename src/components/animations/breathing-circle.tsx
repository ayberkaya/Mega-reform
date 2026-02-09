"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface BreathingCircleProps {
  size?: number;
  color?: string;
  className?: string;
}

export function BreathingCircle({
  size = 120,
  color = "rgba(211, 211, 255, 0.3)",
  className,
}: BreathingCircleProps) {
  return (
    <div className={cn("relative", className)}>
      <motion.div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color}, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 60%)`,
        }}
        animate={{
          scale: [1.05, 0.95, 1.05],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
}
