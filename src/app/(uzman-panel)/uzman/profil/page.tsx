"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/lib/utils/constants";

export default function ExpertProfilePage() {
  const [title, setTitle] = useState("");
  const [longBio, setLongBio] = useState("");
  const [website, setWebsite] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [specialtyInput, setSpecialtyInput] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const addSpecialty = () => {
    if (specialtyInput.trim() && !specialties.includes(specialtyInput.trim())) {
      setSpecialties([...specialties, specialtyInput.trim()]);
      setSpecialtyInput("");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    // TODO: Save to database via API
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">
            Uzman Profilim
          </h1>
          <p className="text-foreground/60 mt-1">
            Herkese açık profilinizi düzenleyin
          </p>
        </div>
        <Button variant="gold" onClick={handleSave} isLoading={saving}>
          Kaydet
        </Button>
      </div>

      {success && (
        <div className="bg-sage/10 text-sage rounded-xl px-4 py-3 text-sm">
          Profiliniz başarıyla güncellendi.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Unvan / Başlık
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Örneğin: Meditasyon Rehberi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Hakkımda (Detaylı)
                </label>
                <textarea
                  value={longBio}
                  onChange={(e) => setLongBio(e.target.value)}
                  rows={8}
                  placeholder="Kendiniz, deneyimleriniz ve uzmanlık alanınız hakkında detaylı bilgi..."
                  className="flex w-full rounded-xl border border-lavender/30 bg-white/80 px-4 py-3 text-base font-body text-foreground shadow-sm transition-all duration-300 placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:border-lavender resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Web Sitesi
                </label>
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Deneyim (Yıl)
                </label>
                <Input
                  type="number"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(e.target.value)}
                  placeholder="0"
                  min="0"
                  className="w-32"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Categories */}
          <Card>
            <CardContent className="p-6">
              <label className="block text-sm font-medium text-foreground/70 mb-3">
                Uzmanlık Alanları
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => toggleCategory(cat.slug)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedCategories.includes(cat.slug)
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

          {/* Specialties */}
          <Card>
            <CardContent className="p-6">
              <label className="block text-sm font-medium text-foreground/70 mb-3">
                Özel Uzmanlıklar
              </label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={specialtyInput}
                  onChange={(e) => setSpecialtyInput(e.target.value)}
                  placeholder="Orn: Kundalini"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialty())}
                  className="flex-1"
                />
                <Button variant="secondary" size="sm" onClick={addSpecialty}>
                  Ekle
                </Button>
              </div>
              {specialties.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {specialties.map((s) => (
                    <Badge
                      key={s}
                      variant="sage"
                      className="cursor-pointer"
                      onClick={() => setSpecialties(specialties.filter((sp) => sp !== s))}
                    >
                      {s} &times;
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profile & Cover Images */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-3">
                  Profil Fotoğrafı
                </label>
                <div className="border-2 border-dashed border-lavender/30 rounded-xl p-6 text-center hover:border-lavender/60 transition-colors cursor-pointer">
                  <svg className="w-8 h-8 text-foreground/30 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-xs text-foreground/40">Yükle</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-3">
                  Kapak Görseli
                </label>
                <div className="border-2 border-dashed border-lavender/30 rounded-xl p-6 text-center hover:border-lavender/60 transition-colors cursor-pointer">
                  <svg className="w-8 h-8 text-foreground/30 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs text-foreground/40">Yükle</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
