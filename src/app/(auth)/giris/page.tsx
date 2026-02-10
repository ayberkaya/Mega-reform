"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardGlass } from "@/components/ui/card";
import { loginUser, loginWithGoogle, loginDemoUser } from "@/actions/auth-actions";
import { loginSchema } from "@/lib/validations/auth";
import { tr } from "@/content/tr";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const handleDemoLogin = async () => {
    setError("");
    setDemoLoading(true);
    const result = await loginDemoUser();
    setDemoLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      router.push("/panel");
      router.refresh();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validated = loginSchema.safeParse({ email, password });
    if (!validated.success) {
      setError(validated.error.issues[0].message);
      return;
    }

    setLoading(true);
    const result = await loginUser(email, password);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/panel");
      router.refresh();
    }
  };

  return (
    <CardGlass className="p-8 md:p-10">
      {/* Logo */}
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
          {tr.auth.welcomeBack}
        </h1>
      </div>

      {/* Google Login */}
      <form action={loginWithGoogle}>
        <Button
          type="submit"
          variant="secondary"
          className="w-full border-white/20 text-white hover:bg-white/10 mb-4"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google ile devam et
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/40 text-sm">{tr.auth.orContinueWith}</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Login Form */}
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
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm text-white/60">{tr.auth.password}</label>
            <Link
              href="/sifremi-unuttum"
              className="text-xs text-lavender hover:text-lavender-light transition-colors"
            >
              {tr.auth.forgotPassword}
            </Link>
          </div>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {tr.auth.login}
        </Button>

        {process.env.NODE_ENV === "development" && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full border-amber-500/50 text-amber-200 hover:bg-amber-500/10"
            isLoading={demoLoading}
            onClick={handleDemoLogin}
          >
            {tr.auth.demoLogin}
          </Button>
        )}
      </form>

      {/* Register link */}
      <p className="text-center mt-6 text-white/50 text-sm">
        {tr.auth.dontHaveAccount}{" "}
        <Link
          href="/kayit"
          className="text-lavender hover:text-lavender-light font-medium transition-colors"
        >
          {tr.auth.register}
        </Link>
      </p>
    </CardGlass>
  );
}
