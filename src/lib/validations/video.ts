import { z } from "zod";

export const videoSchema = z.object({
  title: z.string().min(1, "Baslik gerekli").max(200, "Baslik en fazla 200 karakter"),
  description: z.string().max(5000).optional().nullable(),
  categoryId: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  isFeatured: z.boolean(),
  sortOrder: z.number().int().min(0),
  thumbnailUrl: z.string().url().optional().nullable().or(z.literal("")),
});

export type VideoInput = z.infer<typeof videoSchema>;
