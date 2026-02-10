"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { StarRating } from "@/components/ui/star-rating";
import { ReplyForm } from "./reply-form";
import { formatDate } from "@/lib/utils/format";

type CommentItem = {
  id: string;
  content: string;
  rating: number | null;
  isApproved: boolean;
  createdAt: Date;
  user: { name: string | null; image: string | null };
  replies: Array<{
    id: string;
    content: string;
    createdAt: Date;
  }>;
};

type FilterKey = "all" | "unreplied" | "replied";

interface ExpertCommentListProps {
  comments: CommentItem[];
}

export function ExpertCommentList({ comments }: ExpertCommentListProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [openReplyId, setOpenReplyId] = useState<string | null>(null);

  const filtered =
    filter === "unreplied"
      ? comments.filter((c) => c.replies.length === 0)
      : filter === "replied"
        ? comments.filter((c) => c.replies.length > 0)
        : comments;

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(
          [
            { key: "all" as const, label: "Tumu" },
            { key: "unreplied" as const, label: "Yanitlanmamis" },
            { key: "replied" as const, label: "Yanitlanmis" },
          ] as const
        ).map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === key
                ? "bg-primary text-white"
                : "text-foreground/60 hover:bg-lavender/10"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-lavender/20 bg-white/50 p-12 text-center">
          <p className="text-foreground/50">
            {filter === "all"
              ? "Henüz yorum yok."
              : filter === "unreplied"
                ? "Yanitlanmamis yorum yok."
                : "Yanitlanmis yorum yok."}
          </p>
        </div>
      ) : (
        <ul className="space-y-6">
          {filtered.map((comment) => (
            <li key={comment.id} className="space-y-3">
              <div className="flex gap-3">
                <Avatar
                  src={comment.user.image}
                  alt={comment.user.name ?? "Kullanici"}
                  size="sm"
                />
                <div className="flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-primary">
                      {comment.user.name ?? "Anonim"}
                    </span>
                    <span className="text-xs text-foreground/40">
                      {formatDate(comment.createdAt)}
                    </span>
                    {!comment.isApproved && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                        Onay bekliyor
                      </span>
                    )}
                  </div>
                  {comment.rating != null && (
                    <StarRating rating={comment.rating} size="sm" />
                  )}
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {comment.content}
                  </p>
                  {comment.replies.length > 0 && (
                    <div className="mt-3 space-y-2 border-l-2 border-lavender/20 pl-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="space-y-0.5">
                          <span className="text-xs font-semibold text-sage">
                            Uzman Yaniti
                          </span>
                          <p className="text-sm text-foreground/70">
                            {reply.content}
                          </p>
                          <span className="text-xs text-foreground/40">
                            {formatDate(reply.createdAt)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {openReplyId === comment.id ? (
                    <ReplyForm
                      parentId={comment.id}
                      onSuccess={() => {
                        setOpenReplyId(null);
                        router.refresh();
                      }}
                      onCancel={() => setOpenReplyId(null)}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setOpenReplyId(comment.id)}
                      className="mt-2 text-sm font-medium text-sage hover:underline"
                    >
                      Yanitla
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
