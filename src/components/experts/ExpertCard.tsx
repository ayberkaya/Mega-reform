import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { tr } from "@/content/tr";
import type { ExpertListingItem } from "@/lib/experts/data";

const VIEWPOINT_FALLBACK = "Rehberli pratiklerle kendi ritminde ilerleme.";
const FOCUS_FALLBACK = "Rehber";

interface ExpertCardProps extends ExpertListingItem {}

export function ExpertCard({
  slug,
  name,
  focus,
  viewpoint,
  contentCount,
  topTags,
}: ExpertCardProps) {
  const displayFocus = focus?.trim() || FOCUS_FALLBACK;
  const displayViewpoint = viewpoint?.trim() || VIEWPOINT_FALLBACK;
  const chips = topTags.slice(0, 2).filter(Boolean);

  return (
    <Link
      href={`/uzmanlar/${slug}`}
      className={cn(
        "flex flex-col rounded-2xl border border-lavender/20 bg-white p-6 block",
        "hover:border-primary/30 hover:shadow-lg transition-all duration-200 group"
      )}
    >
      {/* Avatar + name: single row, no wrap so initial stays with name */}
      <div className="flex items-center gap-4 flex-nowrap min-w-0">
        <div
          className="h-16 w-16 shrink-0 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden"
          aria-hidden
        >
          <span className="text-2xl font-heading font-bold text-primary/60">
            {name.charAt(0).toLocaleUpperCase("tr-TR")}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-xl font-semibold text-foreground truncate">
            {name}
          </h3>
          <p className="mt-1 text-sm font-medium text-primary">
            {displayFocus}
          </p>
        </div>
      </div>

      <section className="mt-4" aria-labelledby={`viewpoint-${slug}`}>
        <h4
          id={`viewpoint-${slug}`}
          className="text-xs font-semibold uppercase tracking-wider text-foreground/60"
        >
          {tr.rehber.believesIn}
        </h4>
        <p className="mt-1.5 text-sm text-foreground/90 leading-relaxed line-clamp-2">
          {displayViewpoint}
        </p>
      </section>

      {/* Trust lines */}
      <p className="mt-4 text-sm font-medium text-foreground/70">
        {contentCount} içerik
      </p>

      {chips.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-lavender/20 px-3 py-1 text-xs font-medium text-foreground/80"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <span
        className={cn(
          "mt-6 inline-flex w-fit items-center justify-center rounded-full",
          "bg-primary px-5 py-2.5 text-sm font-semibold text-white",
          "group-hover:bg-primary-light transition-colors"
        )}
      >
        {tr.rehberler.profileCta}
      </span>
    </Link>
  );
}
