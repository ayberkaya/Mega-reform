"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AnimationContextValue {
  prefersReducedMotion: boolean;
}

const AnimationContext = createContext<AnimationContextValue>({
  prefersReducedMotion: false,
});

export function useReducedMotion(): boolean {
  return useContext(AnimationContext).prefersReducedMotion;
}

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <AnimationContext.Provider value={{ prefersReducedMotion }}>
      {children}
    </AnimationContext.Provider>
  );
}
