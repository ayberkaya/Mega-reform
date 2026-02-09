"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";
import { createComment } from "@/actions/comment-actions";
import { tr } from "@/content/tr";

interface CommentFormProps {
  expertId: string;
  onSuccess?: () => void;
}

export function CommentForm({ expertId, onSuccess }: CommentFormProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (rating === 0) {
      setError("Lutfen puan seciniz.");
      return;
    }
    setPending(true);
    const result = await createComment({ expertId, content, rating });
    setPending(false);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    setContent("");
    setRating(0);
    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-lavender/20 bg-white/50 p-6">
      <h4 className="font-heading text-lg font-semibold text-primary">
        {tr.comments.writeComment}
      </h4>
      <div>
        <span className="text-sm text-foreground/60 mr-2">Puan:</span>
        <StarRating
          rating={rating}
          interactive
          onChange={setRating}
          size="md"
        />
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={tr.comments.writeComment}
        rows={4}
        className="w-full rounded-xl border border-lavender/30 bg-white/80 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        maxLength={2000}
        required
      />
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" variant="primary" size="md" disabled={pending}>
        {pending ? "Gonderiliyor..." : tr.comments.submit}
      </Button>
    </form>
  );
}
