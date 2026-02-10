"use client";

import type { ContentItem } from "@/types/content";

interface ContentCardProps {
  content: ContentItem;
  isMember: boolean;
  onOpen: (item: ContentItem) => void;
}

export function ContentCard({ content, isMember, onOpen }: ContentCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(content)}
      className="w-full text-left rounded-xl border border-lavender/20 bg-white p-4 hover:border-primary/20 transition-colors"
    >
      <span className="font-medium text-foreground">{content.title ?? content.guideName ?? "İçerik"}</span>
      {!isMember && (
        <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
          Üyelik
        </span>
      )}
    </button>
  );
}
