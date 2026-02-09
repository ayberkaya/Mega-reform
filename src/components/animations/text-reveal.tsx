"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/providers/animation-provider";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function TextReveal({
  children,
  className,
  delay = 0,
  staggerDelay = 0.03,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = children.split(" ");
  if (reduced) {
    return <span className={cn("inline-flex flex-wrap", className)}>{children}</span>;
  }

  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            duration: 0.4,
            delay: delay + i * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
