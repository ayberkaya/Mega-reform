import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  IcerideNeVarHero,
  IcerideNeVarValueGrid,
  IcerideNeVarStatsBar,
  IcerideNeVarContentTeaser,
  IcerideNeVarSampleWeek,
  IcerideNeVarFomoCta,
} from "@/components/landing/iceride-ne-var";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "İçeride Ne Var? | Mega Reform",
  description:
    "Rehberli pratikler, makaleler, kurslar ve kişisel plan — hepsi tek yerde, senin ritminde.",
};

async function getTeaserVideos() {
  try {
    const rows = await prisma.video.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
      take: 4,
      select: { id: true, title: true, thumbnailUrl: true },
    });
    return rows;
  } catch {
    return [];
  }
}

export default async function IcerideNeVarPage() {
  const teaserVideos = await getTeaserVideos();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <IcerideNeVarHero />
        <IcerideNeVarValueGrid />
        <IcerideNeVarStatsBar />
        <IcerideNeVarContentTeaser videos={teaserVideos} />
        <IcerideNeVarSampleWeek />
        <IcerideNeVarFomoCta />
      </main>
      <Footer />
    </>
  );
}
