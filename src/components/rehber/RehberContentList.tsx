"use client";

interface ContentItemShape {
  id: string;
  title?: string;
  guideName?: string | null;
  [key: string]: unknown;
}

interface RehberContentListProps {
  contentItems: ContentItemShape[];
  isMember: boolean;
}

export function RehberContentList({ contentItems, isMember }: RehberContentListProps) {
  if (!contentItems?.length) return null;
  return (
    <ul className="space-y-3">
      {contentItems.map((item) => (
        <li
          key={item.id}
          className="rounded-xl border border-lavender/20 bg-white p-4 text-foreground"
        >
          <span className="font-medium">{item.title ?? item.guideName ?? "İçerik"}</span>
          {!isMember && (
            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
              Üyelik gerekli
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
