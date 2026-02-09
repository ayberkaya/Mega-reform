"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/lib/utils/constants";

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSave = async (status: "DRAFT" | "PUBLISHED") => {
    setSaving(true);
    // TODO: Save to database via API
    alert(
      status === "DRAFT"
        ? "Makale taslak olarak kaydedildi"
        : "Makale yayınlandı"
    );
    setSaving(false);
    router.push("/uzman/makalelerim");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">
            Yeni Makale
          </h1>
          <p className="text-foreground/60 mt-1">
            Bilgi ve deneyimlerinizi paylaşın
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => handleSave("DRAFT")}
            isLoading={saving}
          >
            Taslak Kaydet
          </Button>
          <Button
            variant="gold"
            onClick={() => handleSave("PUBLISHED")}
            isLoading={saving}
          >
            Yayinla
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Başlık
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Makalenizin başlığı..."
                  className="text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Özet
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  placeholder="Makalenizin kısa bir özeti..."
                  className="flex w-full rounded-xl border border-lavender/30 bg-white/80 px-4 py-3 text-base font-body text-foreground shadow-sm transition-all duration-300 placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:border-lavender resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1.5">
                  İçerik
                </label>
                {/* TODO: Replace with TipTap editor */}
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={16}
                  placeholder="Makalenizin içeriğini buraya yazın..."
                  className="flex w-full rounded-xl border border-lavender/30 bg-white/80 px-4 py-3 text-base font-body text-foreground shadow-sm transition-all duration-300 placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:border-lavender resize-none"
                />
                <p className="text-xs text-foreground/40 mt-1">
                  TipTap zengin metin editörü yaklaşında aktif olacak
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
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

          {/* Cover Image */}
          <Card>
            <CardContent className="p-6">
              <label className="block text-sm font-medium text-foreground/70 mb-3">
                Kapak Görseli
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

          {/* Tags */}
          <Card>
            <CardContent className="p-6">
              <label className="block text-sm font-medium text-foreground/70 mb-3">
                Etiketler
              </label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Etiket ekle..."
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  className="flex-1"
                />
                <Button variant="secondary" size="sm" onClick={addTag}>
                  Ekle
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} &times;
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
