import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function AdminVideolarPage() {
  const videos = await prisma.video.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { category: { select: { name: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">
            Videolar
          </h1>
          <p className="text-foreground/60 mt-1">
            Site videolarını yönetin. Öne çıkan videolar anasayfada görünür.
          </p>
        </div>
        <Link href="/yonetim/videolar/yeni">
          <Button variant="primary">Yeni Video</Button>
        </Link>
      </div>

      {videos.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-foreground/50 mb-4">
              Henüz video eklenmemiş.
            </p>
            <Link href="/yonetim/videolar/yeni">
              <Button variant="primary">Ilk videoyu ekle</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-hidden rounded-xl border border-lavender/20 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-lavender/10 bg-lavender/5">
                <th className="px-4 py-3 font-semibold text-primary">Baslik</th>
                <th className="px-4 py-3 font-semibold text-primary">Kategori</th>
                <th className="px-4 py-3 font-semibold text-primary">Durum</th>
                <th className="px-4 py-3 font-semibold text-primary">Öne çıkan</th>
                <th className="px-4 py-3 font-semibold text-primary">Sira</th>
                <th className="px-4 py-3 font-semibold text-primary">Islem</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((v) => (
                <tr
                  key={v.id}
                  className="border-b border-lavender/10 hover:bg-lavender/5"
                >
                  <td className="px-4 py-3 font-medium text-foreground/90">
                    {v.title}
                  </td>
                  <td className="px-4 py-3 text-foreground/60">
                    {v.category?.name ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        v.status === "PUBLISHED"
                          ? "sage"
                          : v.status === "ARCHIVED"
                            ? "outline"
                            : "gold"
                      }
                    >
                      {v.status === "PUBLISHED"
                        ? "Yayinda"
                        : v.status === "ARCHIVED"
                          ? "Arsiv"
                          : "Taslak"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {v.isFeatured ? (
                      <span className="text-sage">Evet</span>
                    ) : (
                      <span className="text-foreground/40">Hayir</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-foreground/60">{v.sortOrder}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/yonetim/videolar/${v.id}/duzenle`}
                      className="text-primary hover:underline"
                    >
                      Duzenle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
