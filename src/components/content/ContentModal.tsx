"use client";

import type { ContentItem } from "@/types/content";

interface ContentModalProps {
  content: ContentItem;
  isMember: boolean;
  onClose: () => void;
}

export function ContentModal({ content, isMember, onClose }: ContentModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal>
      <div className="max-h-[80vh] w-full max-w-lg overflow-auto rounded-2xl border border-lavender/20 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-lg font-semibold text-foreground">
            {content.title ?? content.guideName ?? "İçerik"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full p-1 text-foreground/60 hover:bg-lavender/20"
            aria-label="Kapat"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        {!isMember && (
          <p className="mt-2 text-sm text-foreground/60">
            Tam erişim için üyelik gerekir.
          </p>
        )}
      </div>
    </div>
  );
}
