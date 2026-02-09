"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createVideo, updateVideo } from "@/actions/video-actions";
import type { VideoInput } from "@/lib/validations/video";

interface VideoFormProps {
  categories: { id: string; name: string }[];
  initial?: Partial<VideoInput> & { id?: string };
  mode: "create" | "edit";
}

export function VideoForm({
  categories,
  initial,
  mode,
}: VideoFormProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(
    initial?.description ?? ""
  );
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? "");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED" | "ARCHIVED">(
    initial?.status ?? "DRAFT"
  );
  const [isFeatured, setIsFeatured] = useState(initial?.isFeatured ?? false);
  const [sortOrder, setSortOrder] = useState(
    initial?.sortOrder ?? 0
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(
    initial?.thumbnailUrl ?? ""
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const payload: VideoInput = {
      title,
      description: description || undefined,
      categoryId: categoryId || undefined,
      status,
      isFeatured,
      sortOrder,
      thumbnailUrl: thumbnailUrl || undefined,
    };
    const result =
      mode === "create"
        ? await createVideo(payload)
        : initial?.id
          ? await updateVideo(initial.id, payload)
          : { error: "ID gerekli" };
    setPending(false);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    if (mode === "create" && "id" in result) {
      window.location.href = `/yonetim/videolar/${result.id}/duzenle`;
    } else {
      window.location.href = "/yonetim/videolar";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground/80">
          Baslik *
        </label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Video basligi"
          required
          maxLength={200}
          className="w-full"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground/80">
          Aciklama
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Kisa aciklama"
          rows={4}
          className="w-full rounded-xl border border-lavender/30 bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground/80">
          Kategori
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full rounded-xl border border-lavender/30 bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
        >
          <option value="">Seciniz</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground/80">
          Kapak URL
        </label>
        <Input
          type="url"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          placeholder="https://..."
          className="w-full"
        />
      </div>
      <div className="flex flex-wrap gap-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground/80">
            Durum
          </label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "DRAFT" | "PUBLISHED" | "ARCHIVED")
            }
            className="rounded-xl border border-lavender/30 bg-white px-4 py-2 text-sm"
          >
            <option value="DRAFT">Taslak</option>
            <option value="PUBLISHED">Yayinda</option>
            <option value="ARCHIVED">Arsiv</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground/80">
            Sira
          </label>
          <Input
            type="number"
            min={0}
            value={sortOrder}
            onChange={(e) => setSortOrder(parseInt(e.target.value, 10) || 0)}
            className="w-24"
          />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input
            type="checkbox"
            id="featured"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="h-4 w-4 rounded border-lavender/30 text-primary focus:ring-primary"
          />
          <label htmlFor="featured" className="text-sm text-foreground/80">
            One cikan
          </label>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <div className="flex gap-3">
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Kaydediliyor..." : mode === "create" ? "Olustur" : "Guncelle"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => (window.location.href = "/yonetim/videolar")}
        >
          Iptal
        </Button>
      </div>
    </form>
  );
}
