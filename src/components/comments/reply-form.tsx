"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createReply } from "@/actions/comment-actions";
import { tr } from "@/content/tr";

interface ReplyFormProps {
  parentId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ReplyForm({ parentId, onSuccess, onCancel }: ReplyFormProps) {
  const [content, setContent] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const result = await createReply({ parentId, content });
    setPending(false);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    setContent("");
    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-2 border-l-2 border-sage/30 pl-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Yanitinizi yazin..."
        rows={3}
        className="w-full rounded-lg border border-lavender/30 bg-white/80 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        maxLength={2000}
        required
      />
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <Button type="submit" variant="primary" size="sm" disabled={pending}>
          {pending ? "Gonderiliyor..." : tr.comments.reply}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            {tr.common.cancel}
          </Button>
        )}
      </div>
    </form>
  );
}
