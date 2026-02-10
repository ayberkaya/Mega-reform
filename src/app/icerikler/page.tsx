import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PrimaryPlanCta } from "@/components/cta/PrimaryPlanCta";
import { tr } from "@/content/tr";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "İçerikler | Mega Reform",
  description: "Dönüşümü destekleyen yazılar. Sınırlı, seçilmiş içerik.",
};

export const dynamic = "force-dynamic";
export const revalidate = 1800;

const ARTICLE_LIMIT = 12;

export default async function IceriklerPage() {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
    take: ARTICLE_LIMIT,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      readTime: true,
      expert: { select: { user: { select: { name: true } } } },
      category: { select: { name: true, slug: true } },
    },
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            {tr.icerikler.title}
          </h1>
          <p className="text-foreground/70 mb-10">{tr.icerikler.subtitle}</p>

          {articles.length === 0 ? (
            <div className="rounded-2xl border border-lavender/20 bg-white p-10 text-center">
              <p className="text-foreground/70">{tr.icerikler.noArticles}</p>
            </div>
          ) : (
            <>
              <ul className="grid gap-6 sm:grid-cols-2">
                {articles.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/makaleler/${a.slug}`}
                      className={cn(
                        "block rounded-2xl border border-lavender/20 bg-white overflow-hidden",
                        "hover:border-primary/30 hover:shadow-md transition-all"
                      )}
                    >
                      {a.coverImage && (
                        <div className="aspect-[16/10] overflow-hidden bg-primary/5">
                          <img
                            src={a.coverImage}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <h2 className="font-heading font-semibold text-foreground line-clamp-2">
                          {a.title}
                        </h2>
                        {a.excerpt && (
                          <p className="mt-1 text-sm text-foreground/70 line-clamp-2">
                            {a.excerpt}
                          </p>
                        )}
                        <p className="mt-2 text-xs text-foreground/50">
                          {a.readTime != null && `${a.readTime} ${tr.icerikler.readTime}`}
                          {a.readTime != null && a.expert?.user?.name && " · "}
                          {a.expert?.user?.name}
                        </p>
                        <span className="mt-2 inline-block text-sm font-medium text-primary">
                          {tr.icerikler.readArticle} →
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Conversion CTA – primary CTA unified */}
              <section className="mt-14 rounded-2xl border-2 border-primary/20 bg-primary/5 p-8 text-center">
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  {tr.icerikler.ctaTitle}
                </h2>
                <p className="mt-2 text-foreground/70 text-sm">
                  {tr.icerikler.ctaSubtitle}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <PrimaryPlanCta variant="gold" size="lg" />
                  <Link
                    href="/uyelik"
                    className="rounded-full border-2 border-lavender px-6 py-3 text-sm font-medium text-primary hover:bg-lavender/15 transition-colors"
                  >
                    Üyeliği gör
                  </Link>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
