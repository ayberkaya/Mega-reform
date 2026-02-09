"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { videoSchema, type VideoInput } from "@/lib/validations/video";

export type VideoActionResult = { success: true; id: string } | { error: string };

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return null;
  }
  return session;
}

export async function createVideo(
  data: VideoInput
): Promise<VideoActionResult> {
  const session = await requireAdmin();
  if (!session) return { error: "Yetkisiz islem." };

  const validated = videoSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const payload = {
    ...validated.data,
    categoryId: validated.data.categoryId || null,
    thumbnailUrl: validated.data.thumbnailUrl || null,
    publishedAt:
      validated.data.status === "PUBLISHED" ? new Date() : null,
  };

  const video = await prisma.video.create({
    data: payload,
  });
  return { success: true, id: video.id };
}

export async function updateVideo(
  id: string,
  data: VideoInput
): Promise<VideoActionResult> {
  const session = await requireAdmin();
  if (!session) return { error: "Yetkisiz islem." };

  const validated = videoSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const existing = await prisma.video.findUnique({
    where: { id },
    select: { publishedAt: true },
  });
  if (!existing) return { error: "Video bulunamadi." };

  const payload = {
    ...validated.data,
    categoryId: validated.data.categoryId || null,
    thumbnailUrl: validated.data.thumbnailUrl || null,
    publishedAt:
      validated.data.status === "PUBLISHED"
        ? existing.publishedAt ?? new Date()
        : null,
  };

  await prisma.video.update({
    where: { id },
    data: payload,
  });
  return { success: true, id };
}

export async function deleteVideo(id: string): Promise<VideoActionResult> {
  const session = await requireAdmin();
  if (!session) return { error: "Yetkisiz islem." };

  await prisma.video.delete({ where: { id } });
  return { success: true, id };
}
