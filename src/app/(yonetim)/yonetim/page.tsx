import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

async function getStats() {
  const [
    userCount,
    expertCount,
    articleCount,
    courseCount,
    videoCount,
    commentCount,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.expertProfile.count(),
    prisma.article.count({ where: { status: "PUBLISHED" } }),
    prisma.course.count({ where: { status: "PUBLISHED" } }),
    prisma.video.count({ where: { status: "PUBLISHED" } }),
    prisma.comment.count({ where: { isApproved: false, parentId: null } }),
  ]);

  return {
    userCount,
    expertCount,
    articleCount,
    courseCount,
    videoCount,
    pendingComments: commentCount,
  };
}

export default async function YonetimDashboardPage() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-primary">
          Yonetim Paneli
        </h1>
        <p className="text-foreground/60 mt-1">
          Platform istatistikleri ve hizli erisim
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-heading font-bold text-primary">
              {stats.userCount}
            </p>
            <p className="text-xs text-foreground/50">Kullanici</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-heading font-bold text-primary">
              {stats.expertCount}
            </p>
            <p className="text-xs text-foreground/50">Uzman</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-heading font-bold text-primary">
              {stats.articleCount}
            </p>
            <p className="text-xs text-foreground/50">Makale</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-heading font-bold text-primary">
              {stats.courseCount}
            </p>
            <p className="text-xs text-foreground/50">Kurs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-heading font-bold text-primary">
              {stats.videoCount}
            </p>
            <p className="text-xs text-foreground/50">Video</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-heading font-bold text-primary">
              {stats.pendingComments}
            </p>
            <p className="text-xs text-foreground/50">Onay bekleyen yorum</p>
            {stats.pendingComments > 0 && (
              <Link
                href="/yonetim/yorumlar"
                className="mt-2 block text-xs text-sage hover:underline"
              >
                Goruntule
              </Link>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Hizli Islemler
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/yonetim/videolar/yeni"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
          >
            Yeni Video Ekle
          </Link>
          <Link
            href="/yonetim/yorumlar"
            className="rounded-xl border border-lavender/30 px-4 py-2 text-sm font-medium text-foreground/70 hover:bg-lavender/10 transition-colors"
          >
            Yorumlari Yonet
          </Link>
        </div>
      </div>
    </div>
  );
}
