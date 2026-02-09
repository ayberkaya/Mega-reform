"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface FloatingParticlesProps {
  count?: number;
  colors?: string[];
  className?: string;
}

export function FloatingParticles({
  count = 40,
  colors = ["rgba(211, 211, 255, 0.4)", "rgba(212, 175, 55, 0.3)", "rgba(157, 193, 131, 0.3)"],
  className,
}: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.3 - 0.1,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around
        if (particle.y < -10) {
          particle.y = canvas.offsetHeight + 10;
          particle.x = Math.random() * canvas.offsetWidth;
        }
        if (particle.x < -10) particle.x = canvas.offsetWidth + 10;
        if (particle.x > canvas.offsetWidth + 10) particle.x = -10;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => resizeCanvas();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [count, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
