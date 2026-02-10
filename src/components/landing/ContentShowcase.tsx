"use client";

import { useState } from "react";
import Link from "next/link";
import type { ContentItem } from "@/types/content";
import { ContentCard } from "@/components/content/ContentCard";
import { ContentModal } from "@/components/content/ContentModal";
import { cn } from "@/lib/utils/cn";

interface ContentShowcaseProps {
  items: ContentItem[];
}

export function ContentShowcase({ items }: ContentShowcaseProps) {
  const [selected, setSelected] = useState<ContentItem | null>(null);
  const list = items.slice(0, 6);
  const isMember = false;

  if (list.length === 0) {
    return (
      <section className="py-20 md:py-28 bg-background border-b border-lavender/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            Katalogdan örnekler
          </h2>
          <p className="text-foreground/70 mb-8">
            Henüz örnek içerik yok. Tüm pratiklere göz atmak için kataloğu ziyaret edin.
          </p>
          <Link
            href="/pratikler"
            className="inline-flex rounded-full border-2 border-lavender px-6 py-3 text-sm font-semibold text-primary hover:bg-lavender/15 transition-colors"
          >
            Pratiklere git
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-background border-b border-lavender/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
          Katalogdan örnekler
        </h2>
        <p className="text-foreground/70 mb-10">
          Önizlemeleri dinleyebilir veya okuyabilirsin; tam erişim üyelikle.
        </p>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item) => (
            <li key={item.id}>
              <ContentCard
                content={item}
                isMember={isMember}
                onOpen={setSelected}
              />
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Link
            href="/pratikler"
            className={cn(
              "inline-flex rounded-full border-2 border-lavender px-6 py-3 text-sm font-semibold text-primary",
              "hover:bg-lavender/15 transition-colors"
            )}
          >
            Tüm pratiklere git
          </Link>
        </div>
      </div>
      {selected && (
        <ContentModal
          content={selected}
          isMember={isMember}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
