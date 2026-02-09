import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  const body = await request.json();
  const { name, bio } = body;

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(name !== undefined && { name }),
      ...(bio !== undefined && { bio }),
    },
  });

  return NextResponse.json({
    name: updatedUser.name,
    bio: updatedUser.bio,
  });
}
