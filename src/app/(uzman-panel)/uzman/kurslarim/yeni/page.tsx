"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/utils/constants";

export default function NewCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // TODO: Save to database via API
    alert("Kurs oluşturuldu. Ders ekleyerek devam edebilirsiniz.");
    setSaving(false);
    router.push("/uzman/kurslarim");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">
            Yeni Kurs
          </h1>
          <p className="text-foreground/60 mt-1">
            Kurs detaylarını girin
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => router.back()}>
            İptal
          </Button>
          <Button variant="gold" onClick={handleSave} isLoading={saving}>
            Kursu Oluştur
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Kurs Adı
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Örneğin: Meditasyona Giriş"
                  className="text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Açıklama
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  placeholder="Kursunuzun içeriği hakkında detaylı açıklama..."
                  className="flex w-full rounded-xl border border-lavender/30 bg-white/80 px-4 py-3 text-base font-body text-foreground shadow-sm transition-all duration-300 placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:border-lavender resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Curriculum placeholder */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-lg font-bold text-primary mb-4">
                Ders İçerikleri
              </h3>
              <div className="border-2 border-dashed border-lavender/30 rounded-xl p-8 text-center">
                <svg className="w-8 h-8 text-foreground/30 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <p className="text-sm text-foreground/40">
                  Kursu oluşturduktan sonra ders ekleyebilirsiniz
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Category */}
          <Card>
            <CardContent className="p-6">
              <label className="block text-sm font-medium text-foreground/70 mb-3">
                Kategori
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setCategory(cat.slug)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      category === cat.slug
                        ? "bg-primary text-white"
                        : "bg-lavender/10 text-foreground/60 hover:bg-lavender/20"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Level */}
          <Card>
            <CardContent className="p-6">
              <label className="block text-sm font-medium text-foreground/70 mb-3">
                Seviye
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Baslangic", value: "Baslangic" },
                  { label: "Orta", value: "Orta" },
                  { label: "Ileri", value: "Ileri" },
                ].map((lvl) => (
                  <button
                    key={lvl.value}
                    type="button"
                    onClick={() => setLevel(lvl.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      level === lvl.value
                        ? "bg-primary text-white"
                        : "bg-lavender/10 text-foreground/60 hover:bg-lavender/20"
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardContent className="p-6">
              <label className="block text-sm font-medium text-foreground/70 mb-3">
                Fiyatlandirma
              </label>
              <label className="flex items-center gap-2 mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFree}
                  onChange={(e) => setIsFree(e.target.checked)}
                  className="rounded border-lavender/30 text-primary focus:ring-lavender"
                />
                <span className="text-sm text-foreground/70">Ucretsiz kurs</span>
              </label>
              {!isFree && (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                  <span className="text-sm text-foreground/50 whitespace-nowrap">
                    TL
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card>
            <CardContent className="p-6">
              <label className="block text-sm font-medium text-foreground/70 mb-3">
                Kapak Gorseli
              </label>
              <div className="border-2 border-dashed border-lavender/30 rounded-xl p-8 text-center hover:border-lavender/60 transition-colors cursor-pointer">
                <svg className="w-8 h-8 text-foreground/30 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-foreground/40">
                  Görsel yüklemek için tıklayın
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
