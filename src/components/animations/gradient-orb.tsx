"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface GradientOrbProps {
  size?: number;
  color1?: string;
  color2?: string;
  className?: string;
  delay?: number;
}

export function GradientOrb({
  size = 400,
  color1 = "rgba(74, 45, 122, 0.3)",
  color2 = "rgba(211, 211, 255, 0.2)",
  className,
  delay = 0,
}: GradientOrbProps) {
  return (
    <motion.div
      className={cn("absolute rounded-full blur-3xl pointer-events-none", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color1}, ${color2}, transparent 70%)`,
      }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -25, 15, 0],
        scale: [1, 1.1, 0.95, 1],
        opacity: [0.5, 0.7, 0.4, 0.5],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}
