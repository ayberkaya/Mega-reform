"use client";

import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { approveComment } from "@/actions/comment-actions";
import { formatDate } from "@/lib/utils/format";

type CommentRow = {
  id: string;
  content: string;
  rating: number | null;
  isApproved: boolean;
  createdAt: Date;
  user: { name: string | null; image: string | null };
  expert: {
    slug: string;
    user: { name: string | null };
  };
};

interface CommentApprovalListProps {
  pending: CommentRow[];
  approved: CommentRow[];
}

export function CommentApprovalList({
  pending,
  approved,
}: CommentApprovalListProps) {
  const router = useRouter();

  async function handleApprove(commentId: string, isApproved: boolean) {
    await approveComment({ commentId, isApproved });
    router.refresh();
  }

  return (
    <div className="space-y-10">
      {pending.length > 0 && (
        <div>
          <h2 className="font-heading text-xl font-bold text-primary mb-4">
            Onay bekleyen ({pending.length})
          </h2>
          <div className="space-y-4">
            {pending.map((c) => (
              <Card key={c.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar
                      src={c.user.image}
                      alt={c.user.name ?? "Kullanici"}
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-primary">
                          {c.user.name ?? "Anonim"}
                        </span>
                        <span className="text-xs text-foreground/40">
                          {formatDate(c.createdAt)}
                        </span>
                        <a
                          href={`/uzmanlar/${c.expert.slug}`}
                          className="text-xs text-sage hover:underline"
                        >
                          @{c.expert.user.name ?? "Uzman"}
                        </a>
                      </div>
                      {c.rating != null && (
                        <StarRating rating={c.rating} size="sm" className="mt-1" />
                      )}
                      <p className="mt-2 text-sm text-foreground/80">
                        {c.content}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleApprove(c.id, true)}
                        >
                          Onayla
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleApprove(c.id, false)}
                        >
                          Reddet
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Son onaylananlar
        </h2>
        {approved.length === 0 && pending.length === 0 ? (
          <p className="text-foreground/50">Henüz yorum yok.</p>
        ) : approved.length === 0 ? (
          <p className="text-foreground/50">Onaylanmis yorum yok.</p>
        ) : (
          <div className="space-y-3">
            {approved.map((c) => (
              <div
                key={c.id}
                className="rounded-xl border border-lavender/20 bg-white/50 p-4"
              >
                <div className="flex gap-3">
                  <Avatar
                    src={c.user.image}
                    alt={c.user.name ?? "Kullanici"}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-primary">
                        {c.user.name ?? "Anonim"}
                      </span>
                      <span className="text-xs text-foreground/40">
                        {formatDate(c.createdAt)}
                      </span>
                      <a
                        href={`/uzmanlar/${c.expert.slug}`}
                        className="text-xs text-sage hover:underline"
                      >
                        @{c.expert.user.name ?? "Uzman"}
                      </a>
                    </div>
                    {c.rating != null && (
                      <StarRating rating={c.rating} size="sm" className="mt-1" />
                    )}
                    <p className="mt-1 text-sm text-foreground/70">
                      {c.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
