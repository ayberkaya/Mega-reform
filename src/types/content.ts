export type ContentType = "audio" | "article" | "video" | "practice";

export interface ContentItem {
  id: string;
  title?: string;
  guideName?: string | null;
  type?: ContentType;
  durationSec?: number;
  [key: string]: unknown;
}
