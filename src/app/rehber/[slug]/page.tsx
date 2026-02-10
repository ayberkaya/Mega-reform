import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getRehberPageData } from "./data";
import { MemberOnlyBadge } from "@/components/rehber/member-only-badge";
import { RehberContentList } from "@/components/rehber/RehberContentList";
import { tr } from "@/content/tr";
import { auth } from "@/lib/auth";
import { hasActiveMembership } from "@/lib/membership";
import { cn } from "@/lib/utils/cn";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getRehberPageData(slug);
  if (!data) return { title: "Rehber bulunamadı | Mega Reform" };
  return {
    title: `${data.expert.name} | ${tr.rehber.title} | Mega Reform`,
    description: data.expert.viewpoint ?? data.expert.title,
  };
}

export const dynamic = "force-dynamic";

export default async function RehberPage({ params }: Props) {
  const [{ slug }, session] = await Promise.all([
    params,
    auth(),
  ]);
  const data = await getRehberPageData(slug);
  if (!data) notFound();

  const userId = session?.user?.id ?? null;
  const isMember = await hasActiveMembership(userId);
  const { expert, articles, courses, contentItems } = data;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          {/* Hero */}
          <section className="flex flex-col sm:flex-row gap-6 items-start mb-12">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-primary/10">
              {expert.profileImage ? (
                <img src={expert.profileImage} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-heading font-bold text-primary/50">
                  {expert.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                  {expert.name}
                </h1>
                {expert.isVerified && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage text-white" title="Doğrulanmış">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
              <p className="text-foreground/60 mt-1">{expert.title}</p>
              {(expert.rating > 0 || expert.reviewCount > 0) && (
                <p className="text-sm text-foreground/50 mt-2">
                  {expert.rating > 0 && `${expert.rating} · `}
                  {expert.reviewCount} değerlendirme
                </p>
              )}
            </div>
          </section>

          {/* Bu rehber neye inanır? */}
          <section className="mb-10">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-3">
              {tr.rehber.believesIn}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {expert.viewpoint?.trim() || "Rehberli pratiklerle kendi ritminde ilerleme."}
            </p>
          </section>

          {/* Kimler için uygun */}
          <section className="mb-10">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-3">
              {tr.rehber.suitableFor}
            </h2>
            {expert.suitableFor.length > 0 ? (
              <ul className="space-y-2">
                {expert.suitableFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-foreground/70 text-sm">Herkes için uygun.</p>
            )}
          </section>

          {/* Kimler için uygun değil */}
          <section className="mb-10">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-3">
              {tr.rehber.notSuitableFor}
            </h2>
            {expert.notSuitableFor.length > 0 ? (
              <ul className="space-y-2">
                {expert.notSuitableFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-foreground/60 text-sm">Belirtilmedi.</p>
            )}
          </section>

          {/* İçerikleri */}
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
              {tr.rehber.content}
            </h2>

            {contentItems && contentItems.length > 0 ? (
              <RehberContentList contentItems={contentItems} isMember={isMember} />
            ) : articles.length === 0 && courses.length === 0 ? (
              <p className="text-foreground/60 py-6">{tr.rehber.noContent}</p>
            ) : (
              <div className="space-y-6">
                {articles.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground/60 mb-3">{tr.rehber.articles}</h3>
                    <ul className="space-y-3">
                      {articles.map((a) => (
                        <li key={a.slug}>
                          <Link
                            href={a.membersOnly ? "/abonelik" : `/makaleler/${a.slug}`}
                            className={cn(
                              "flex items-center justify-between gap-4 rounded-xl border border-lavender/20 bg-white p-4",
                              "hover:border-primary/20 transition-colors"
                            )}
                          >
                            <div className="min-w-0">
                              <span className="font-medium text-foreground">{a.title}</span>
                              {a.readTime != null && (
                                <span className="ml-2 text-xs text-foreground/50">{a.readTime} dk</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {a.membersOnly && <MemberOnlyBadge />}
                              <span className="text-sm text-primary">{tr.rehber.readArticle} →</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {courses.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground/60 mb-3">{tr.rehber.courses}</h3>
                    <ul className="space-y-3">
                      {courses.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={c.requiresSubscription ? "/abonelik" : `/kurslar/${c.slug}`}
                            className={cn(
                              "flex items-center justify-between gap-4 rounded-xl border border-lavender/20 bg-white p-4",
                              "hover:border-primary/20 transition-colors"
                            )}
                          >
                            <div className="min-w-0">
                              <span className="font-medium text-foreground">{c.title}</span>
                              <span className="ml-2 text-xs text-foreground/50">{c.lessonCount} ders</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {c.requiresSubscription && <MemberOnlyBadge />}
                              <span className="text-sm text-primary">{tr.rehber.viewCourse} →</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>

          <p className="mt-12 text-center">
            <Link href="/uzmanlar" className="text-primary text-sm font-medium hover:underline">
              ← Tüm rehberler
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
