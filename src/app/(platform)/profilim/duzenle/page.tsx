"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [name, setName] = useState(session?.user?.name || "");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio }),
      });

      if (res.ok) {
        await update({ name });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-primary">
          Profili Düzenle
        </h1>
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          Geri
        </Button>
      </div>

      <Card>
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-1.5">
                Adiniz
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adınız Soyadınız"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-1.5">
                E-posta
              </label>
              <Input
                value={session?.user?.email || ""}
                disabled
                className="opacity-60"
              />
              <p className="text-xs text-foreground/40 mt-1">
                E-posta adresi degistirilemez.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-1.5">
                Hakkinda
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="Kendiniz hakkinda birsey yazin..."
                className="flex w-full rounded-xl border border-lavender/30 bg-white/80 px-4 py-3 text-base font-body text-foreground shadow-sm transition-all duration-300 placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:border-lavender hover:border-lavender/60 resize-none"
              />
            </div>

            {success && (
              <p className="text-sage text-sm bg-sage/10 rounded-lg px-3 py-2">
                Profiliniz başarıyla güncellendi.
              </p>
            )}

            <Button type="submit" variant="primary" isLoading={loading}>
              Kaydet
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
