import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { CommentApprovalList } from "@/components/comments/comment-approval-list";

export default async function YonetimYorumlarPage() {
  const [pending, approved] = await Promise.all([
    prisma.comment.findMany({
      where: { parentId: null, isApproved: false },
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, image: true } },
        expert: { select: { slug: true, user: { select: { name: true } } } },
      },
    }),
    prisma.comment.findMany({
      where: { parentId: null, isApproved: true },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        user: { select: { name: true, image: true } },
        expert: { select: { slug: true, user: { select: { name: true } } } },
      },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-primary">
          Yorumlar
        </h1>
        <p className="text-foreground/60 mt-1">
          Uzman profillerine yapilan yorumlari onaylayin veya reddedin
        </p>
      </div>

      <CommentApprovalList pending={pending} approved={approved} />
    </div>
  );
}
