"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PrimaryPlanCta } from "@/components/cta/PrimaryPlanCta";
import { STOCK_VIDEOS } from "@/lib/utils/constants";

export type TeaserVideo = {
  id: string;
  title: string;
  thumbnailUrl: string | null;
};

const PLACEHOLDERS = [
  { title: "Sabah Meditasyonu", src: "/videos/showcase-1.mp4" },
  { title: "Nefes Çalışması", src: "/videos/showcase-2.mp4" },
  { title: "İç Huzur Akışı", src: "/videos/showcase-3.mp4" },
  { title: "Tarot Rehberi", src: "/videos/showcase-4.mp4" },
];

function LockedCard({
  title,
  mediaSrc,
  fallbackSrc,
  index,
}: {
  title: string;
  mediaSrc: string;
  fallbackSrc: string;
  index: number;
}) {
  const [src, setSrc] = useState(mediaSrc);
  return (
    <ScrollReveal delay={index * 0.08} variant="fadeUp">
      <div className="aspect-video rounded-xl border border-lavender/20 overflow-hidden bg-gradient-to-br from-primary/10 to-lavender/15 relative group">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
          aria-hidden
          src={src}
          onError={() => setSrc(fallbackSrc)}
        />
        <div className="absolute inset-0 bg-primary/60 flex flex-col items-center justify-center gap-3">
          <span className="text-4xl" aria-hidden>🔒</span>
          <span className="text-sm font-semibold text-white drop-shadow">
            Üyelikle eriş
          </span>
        </div>
        <p className="absolute bottom-2 left-2 right-2 text-xs text-white/90 font-medium text-center drop-shadow-md z-10 pointer-events-none">
          {title}
        </p>
      </div>
    </ScrollReveal>
  );
}

function LockedVideoCard({
  video,
  index,
}: {
  video: TeaserVideo;
  index: number;
}) {
  return (
    <ScrollReveal delay={index * 0.08} variant="fadeUp">
      <div className="aspect-video rounded-xl border border-lavender/20 overflow-hidden bg-gradient-to-br from-primary/10 to-lavender/15 relative group">
        {video.thumbnailUrl ? (
          <Image
            src={video.thumbnailUrl}
            alt=""
            fill
            className="object-cover opacity-80 group-hover:opacity-90 transition-opacity"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            aria-hidden
          >
            <source src={STOCK_VIDEOS.showcaseFeatured} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-primary/60 flex flex-col items-center justify-center gap-3">
          <span className="text-4xl" aria-hidden>🔒</span>
          <span className="text-sm font-semibold text-white drop-shadow">
            Üyelikle eriş
          </span>
        </div>
        <p className="absolute bottom-2 left-2 right-2 text-xs text-white/90 font-medium text-center drop-shadow-md z-10 pointer-events-none">
          {video.title}
        </p>
      </div>
    </ScrollReveal>
  );
}

interface IcerideNeVarContentTeaserProps {
  videos?: TeaserVideo[];
}

export function IcerideNeVarContentTeaser({ videos = [] }: IcerideNeVarContentTeaserProps) {
  const hasVideos = videos.length > 0;
  const displayItems = hasVideos
    ? videos.slice(0, 4).map((v, i) => (
        <LockedVideoCard key={v.id} video={v} index={i} />
      ))
    : PLACEHOLDERS.map((p, i) => (
        <LockedCard
          key={p.title}
          title={p.title}
          mediaSrc={p.src}
          fallbackSrc={STOCK_VIDEOS.showcaseFeatured}
          index={i}
        />
      ));

  return (
    <section className="py-16 md:py-24 bg-background border-b border-lavender/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-10">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            İçeriklerden birkaç örnek
          </h2>
          <p className="mt-3 text-foreground/70 max-w-xl mx-auto">
            Tam pratikler, videolar ve kurslar üyelikle seninle.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {displayItems}
        </div>
        <ScrollReveal className="mt-10 text-center">
          <PrimaryPlanCta variant="primary" size="lg" />
          <p className="mt-4 text-sm text-foreground/60">
            <Link href="/pratikler" className="underline hover:text-primary">
              Sadece önizlemelere bak
            </Link>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
