import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { VideoShowcase } from "@/components/landing/video-showcase";
import { CategoryExplorer } from "@/components/landing/category-explorer";
import { FeaturedExperts } from "@/components/landing/featured-experts";
import { LatestArticles } from "@/components/landing/latest-articles";
import { CoursePreview } from "@/components/landing/course-preview";
import { Testimonials } from "@/components/landing/testimonials";
import { SubscriptionCta } from "@/components/landing/subscription-cta";
import { WhatsInsideSection } from "@/components/landing/whats-inside-section";
import { NewsletterSignup } from "@/components/landing/newsletter-signup";
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget";
import { prisma } from "@/lib/prisma";

export const revalidate = 300; // 5 min ISR for landing

async function getFeaturedVideos() {
  try {
    return await prisma.video.findMany({
      where: { status: "PUBLISHED", isFeatured: true },
      orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
      take: 5,
      select: {
        id: true,
        title: true,
        thumbnailUrl: true,
        muxPlaybackId: true,
        duration: true,
      },
    });
  } catch {
    return [];
  }
}

export default async function Home() {
  const featuredVideos = await getFeaturedVideos();

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <VideoShowcase videos={featuredVideos} />
        <CategoryExplorer />
        <FeaturedExperts />
        <LatestArticles />
        <CoursePreview />
        <Testimonials />
        <SubscriptionCta />
        <WhatsInsideSection />
        <NewsletterSignup />
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  );
}
