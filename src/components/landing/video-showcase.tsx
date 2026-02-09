"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { WaveDivider } from "@/components/animations/wave-divider";
import { tr } from "@/content/tr";

export type VideoShowcaseVideo = {
  id: string;
  title: string;
  thumbnailUrl: string | null;
  muxPlaybackId: string | null;
  duration: number | null;
};

interface VideoShowcaseProps {
  videos?: VideoShowcaseVideo[];
}

const PLACEHOLDER_TITLES = [
  "Sabah Meditasyonu",
  "Nefes Calismasi",
  "Yoga Akisi",
  "Tarot Rehberi",
];

function VideoThumbnail({
  video,
  index,
}: {
  video: VideoShowcaseVideo;
  index: number;
}) {
  const href = `/videolar?video=${video.id}`;
  const content = (
    <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/5 to-lavender/15 flex items-center justify-center border border-lavender/10 cursor-pointer group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      {video.thumbnailUrl ? (
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <svg
          className="w-8 h-8 text-primary/30 group-hover:text-primary/50 transition-colors"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <p className="absolute bottom-2 left-2 right-2 text-xs text-white/90 font-medium text-center drop-shadow-md">
        {video.title}
      </p>
    </div>
  );

  return (
    <ScrollReveal delay={index * 0.1} variant="fadeUp">
      <Link href={href} className="block">
        {content}
      </Link>
    </ScrollReveal>
  );
}

export function VideoShowcase({ videos = [] }: VideoShowcaseProps) {
  const [featured, ...rest] = videos;
  const gridVideos = rest.length > 0 ? rest : [];
  const hasData = videos.length > 0;

  return (
    <>
      <WaveDivider color="#FFF8F0" />
      <section className="py-20 md:py-28 bg-cream-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              {tr.landing.videoTitle}
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              {tr.landing.videoSubtitle}
            </p>
          </ScrollReveal>

          {/* Main featured video */}
          <ScrollReveal variant="scale" className="max-w-4xl mx-auto mb-8">
            {featured ? (
              <Link href={`/videolar?video=${featured.id}`} className="block">
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/10 via-lavender/20 to-sage/10 flex items-center justify-center overflow-hidden border border-lavender/20 shadow-xl relative group cursor-pointer">
                  {featured.thumbnailUrl && (
                    <Image
                      src={featured.thumbnailUrl}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="absolute bottom-6 left-6 text-white/80 font-heading text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    {featured.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/10 via-lavender/20 to-sage/10 flex items-center justify-center overflow-hidden border border-lavender/20 shadow-xl relative group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="absolute bottom-6 left-6 text-white/80 font-heading text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Ic Huzura Yolculuk - Rehberli Meditasyon
                </p>
              </div>
            )}
          </ScrollReveal>

          {/* Thumbnail grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {hasData
              ? gridVideos.slice(0, 4).map((v, i) => (
                  <VideoThumbnail key={v.id} video={v} index={i} />
                ))
              : PLACEHOLDER_TITLES.map((title, i) => (
                  <ScrollReveal key={title} delay={i * 0.1} variant="fadeUp">
                    <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/5 to-lavender/15 flex items-center justify-center border border-lavender/10 cursor-pointer group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                      <svg className="w-8 h-8 text-primary/30 group-hover:text-primary/50 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <p className="absolute bottom-2 left-2 right-2 text-xs text-primary/60 font-medium text-center">
                        {title}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
          </div>
        </div>
      </section>
    </>
  );
}
