"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardGlass } from "@/components/ui/card";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { tr } from "@/content/tr";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validated = forgotPasswordSchema.safeParse({ email });
    if (!validated.success) {
      setError(validated.error.issues[0].message);
      return;
    }

    setLoading(true);
    // TODO: Implement password reset email
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <CardGlass className="p-8 md:p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="font-heading text-xl text-white mb-3">
          E-posta Gönderildi
        </h1>
        <p className="text-white/60 text-sm mb-6">
          Şifre sıfırlama bağlantınız e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.
        </p>
        <Link href="/giris">
          <Button variant="secondary" className="border-white/20 text-white hover:bg-white/10">
            Girişe Dön
          </Button>
        </Link>
      </CardGlass>
    );
  }

  return (
    <CardGlass className="p-8 md:p-10">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <svg className="w-8 h-8 text-lavender" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 4c-2 4-6 8-6 12s2.7 7.3 6 8c3.3-.7 6-4 6-8s-4-8-6-12z" />
            <path d="M16 4c-4 3-10 6-12 10 2 4 6 6 10 7-2-3-3.5-8-2-13 1-2 2.5-3 4-4z" opacity="0.6" />
            <path d="M16 4c4 3 10 6 12 10-2 4-6 6-10 7 2-3 3.5-8 2-13-1-2-2.5-3-4-4z" opacity="0.6" />
          </svg>
          <span className="font-heading text-2xl font-bold text-white">
            Mega Reform
          </span>
        </Link>
        <h1 className="font-heading text-xl text-white/80 mt-4">
          {tr.auth.forgotPassword}
        </h1>
        <p className="text-white/50 text-sm mt-2">
          E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-white/60 mb-1.5">
            {tr.auth.email}
          </label>
          <Input
            type="email"
            placeholder="ornek@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-lavender/50"
          />
        </div>

        {error && (
          <p className="text-red-300 text-sm bg-red-500/10 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full"
          isLoading={loading}
        >
          Sıfırlama Bağlantısı Gönder
        </Button>
      </form>

      <p className="text-center mt-6 text-white/50 text-sm">
        <Link
          href="/giris"
          className="text-lavender hover:text-lavender-light font-medium transition-colors"
        >
          Girişe Dön
        </Link>
      </p>
    </CardGlass>
  );
}
