import { z } from "zod";

const RATING_MIN = 1;
const RATING_MAX = 5;
const CONTENT_MIN = 10;
const CONTENT_MAX = 2000;

export const createCommentSchema = z.object({
  expertId: z.string().min(1, "Uzman secimi gerekli"),
  content: z
    .string()
    .min(CONTENT_MIN, `Yorum en az ${CONTENT_MIN} karakter olmalidir`)
    .max(CONTENT_MAX, `Yorum en fazla ${CONTENT_MAX} karakter olabilir`),
  rating: z
    .number()
    .int("Puan tam sayi olmalidir")
    .min(RATING_MIN, `Puan ${RATING_MIN}-${RATING_MAX} arasinda olmalidir`)
    .max(RATING_MAX, `Puan ${RATING_MIN}-${RATING_MAX} arasinda olmalidir`),
});

export const createReplySchema = z.object({
  parentId: z.string().min(1, "Yanitlanacak yorum gerekli"),
  content: z
    .string()
    .min(CONTENT_MIN, `Yanit en az ${CONTENT_MIN} karakter olmalidir`)
    .max(CONTENT_MAX, `Yanit en fazla ${CONTENT_MAX} karakter olabilir`),
});

export const approveCommentSchema = z.object({
  commentId: z.string().min(1, "Yorum ID gerekli"),
  isApproved: z.boolean(),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type CreateReplyInput = z.infer<typeof createReplySchema>;
export type ApproveCommentInput = z.infer<typeof approveCommentSchema>;
