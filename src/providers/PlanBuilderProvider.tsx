"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { PlanBuilderModal } from "@/components/plan-builder/PlanBuilderModal";

interface PlanBuilderContextValue {
  openPlanBuilder: () => void;
  closePlanBuilder: () => void;
}

const PlanBuilderContext = createContext<PlanBuilderContextValue | null>(null);

export function usePlanBuilder(): PlanBuilderContextValue | null {
  return useContext(PlanBuilderContext);
}

export function PlanBuilderProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPlanBuilder = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closePlanBuilder = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value: PlanBuilderContextValue = {
    openPlanBuilder,
    closePlanBuilder,
  };

  return (
    <PlanBuilderContext.Provider value={value}>
      {children}
      <PlanBuilderModal isOpen={isOpen} onClose={closePlanBuilder} />
    </PlanBuilderContext.Provider>
  );
}
