import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(1, "Şifre alanı boş bırakılamaz"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Adınız en az 2 karakter olmalıdır")
      .max(50, "Adınız en fazla 50 karakter olabilir"),
    email: z.string().email("Geçerli bir e-posta adresi giriniz"),
    password: z
      .string()
      .min(8, "Şifre en az 8 karakter olmalıdır")
      .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
      .regex(/[0-9]/, "Şifre en az bir rakam içermelidir"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmedi",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
