import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { ExpertCommentList } from "@/components/comments/expert-comment-list";

export default async function ExpertCommentsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/giris");
  }

  const expert = await prisma.expertProfile.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  if (!expert) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">
            Yorumlar
          </h1>
          <p className="text-foreground/60 mt-1">
            Profilinize yapılan yorumları görüntüleyip yanıtlayın
          </p>
        </div>
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-foreground/60">
              Yorumları görmek için önce uzman profilinizi oluşturmalısınız.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const comments = await prisma.comment.findMany({
    where: { expertId: expert.id, parentId: null },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      content: true,
      rating: true,
      isApproved: true,
      createdAt: true,
      user: { select: { name: true, image: true } },
      replies: {
        orderBy: { createdAt: "asc" },
        select: { id: true, content: true, createdAt: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-primary">
          Yorumlar
        </h1>
        <p className="text-foreground/60 mt-1">
          Profilinize yapılan yorumları görüntüleyip yanıtlayın
        </p>
      </div>

      <ExpertCommentList comments={comments} />
    </div>
  );
}
