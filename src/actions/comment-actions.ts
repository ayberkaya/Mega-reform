"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  createCommentSchema,
  createReplySchema,
  approveCommentSchema,
  type CreateCommentInput,
  type CreateReplyInput,
  type ApproveCommentInput,
} from "@/lib/validations/comment";

export type CommentActionResult =
  | { success: true }
  | { error: string };

export async function createComment(
  data: CreateCommentInput
): Promise<CommentActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Yorum yapmak icin giris yapmalisiniz." };
  }

  const validated = createCommentSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const { expertId, content, rating } = validated.data;

  const expert = await prisma.expertProfile.findUnique({
    where: { id: expertId },
  });
  if (!expert) {
    return { error: "Uzman bulunamadi." };
  }

  const existing = await prisma.comment.findFirst({
    where: { userId: session.user.id, expertId, parentId: null },
  });
  if (existing) {
    return { error: "Bu uzmana zaten bir yorum yaptiniz." };
  }

  await prisma.comment.create({
    data: {
      userId: session.user.id,
      expertId,
      content,
      rating,
      isApproved: false,
    },
  });

  return { success: true };
}

export async function createReply(
  data: CreateReplyInput
): Promise<CommentActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Yanit vermek icin giris yapmalisiniz." };
  }

  const validated = createReplySchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const { parentId, content } = validated.data;

  const parent = await prisma.comment.findUnique({
    where: { id: parentId },
    include: { expert: { select: { userId: true } } },
  });
  if (!parent || parent.parentId) {
    return { error: "Yorum bulunamadi." };
  }

  const isExpert =
    session.user.role === "ADMIN" || parent.expert.userId === session.user.id;
  if (!isExpert) {
    return { error: "Sadece uzman veya yonetici yanitlayabilir." };
  }

  await prisma.comment.create({
    data: {
      userId: session.user.id,
      expertId: parent.expertId,
      parentId,
      content,
      isApproved: true,
    },
  });

  return { success: true };
}

export async function approveComment(
  data: ApproveCommentInput
): Promise<CommentActionResult> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { error: "Yetkisiz islem." };
  }

  const validated = approveCommentSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const { commentId, isApproved } = validated.data;

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });
  if (!comment) {
    return { error: "Yorum bulunamadi." };
  }

  await prisma.comment.update({
    where: { id: commentId },
    data: { isApproved },
  });

  if (comment.parentId === null) {
    await updateExpertRating(comment.expertId);
  }

  return { success: true };
}

async function updateExpertRating(expertId: string): Promise<void> {
  const approved = await prisma.comment.findMany({
    where: { expertId, parentId: null, isApproved: true },
    select: { rating: true },
  });

  const count = approved.length;
  const sum = approved.reduce((s, c) => s + (c.rating ?? 0), 0);
  const rating = count > 0 ? sum / count : 0;

  await prisma.expertProfile.update({
    where: { id: expertId },
    data: { rating, reviewCount: count },
  });
}
