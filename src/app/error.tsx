"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-dark/5 to-cream-light px-4">
      <div className="max-w-md text-center space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-sage/20 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-sage"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="font-heading text-3xl font-bold text-primary">
          Bir sorun olustu
        </h1>
        <p className="text-foreground/60">
          Beklenmeyen bir hata meydana geldi. Lutfen tekrar deneyin veya ana
          sayfaya donun.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="primary" onClick={reset}>
            Tekrar dene
          </Button>
          <Button variant="secondary" onClick={() => (window.location.href = "/")}>
            Ana sayfa
          </Button>
        </div>
      </div>
    </div>
  );
}
