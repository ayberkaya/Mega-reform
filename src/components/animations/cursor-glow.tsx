"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    // Only enable on desktop
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 768px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 hidden md:block"
      style={{
        x: springX,
        y: springY,
        width: 400,
        height: 400,
        marginLeft: -200,
        marginTop: -200,
        background:
          "radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(211, 211, 255, 0.05) 40%, transparent 70%)",
        borderRadius: "50%",
      }}
    />
  );
}
