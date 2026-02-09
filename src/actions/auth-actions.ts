"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { AuthError } from "next-auth";

export async function registerUser(data: RegisterInput) {
  const validated = registerSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const { name, email, password } = validated.data;

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Bu e-posta adresi zaten kayıtlı" };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  // Auto-login after registration
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch {
    // Registration succeeded even if auto-login fails
    return { success: true };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "E-posta veya şifre hatalı" };
        default:
          return { error: "Bir hata olustu. Lutfen tekrar deneyin." };
      }
    }
    throw error;
  }
}

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/panel" });
}
