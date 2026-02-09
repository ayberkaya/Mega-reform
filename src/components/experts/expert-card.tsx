import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";

interface ExpertCardProps {
  slug: string;
  name: string;
  title: string;
  image?: string | null;
  specialties: string[];
  rating: number;
  reviewCount: number;
  bio?: string | null;
  isVerified?: boolean;
  yearsExperience?: number | null;
}

export function ExpertCard({
  slug,
  name,
  title,
  image,
  specialties,
  rating,
  reviewCount,
  bio,
  isVerified,
  yearsExperience,
}: ExpertCardProps) {
  return (
    <Link href={`/uzmanlar/${slug}`} className="group block">
      <Card className="h-full overflow-hidden">
        <CardContent className="flex flex-col items-center text-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <Avatar
              src={image}
              alt={name}
              size="lg"
              breathing
              className="group-hover:ring-sage/60 transition-all duration-500"
            />
            {isVerified && (
              <span
                className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-sage text-white shadow-md"
                title="Dogrulanmis Uzman"
              >
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </div>

          {/* Name & Title */}
          <div className="space-y-1">
            <h3 className="font-heading text-xl font-bold text-primary group-hover:text-primary-light transition-colors duration-300">
              {name}
            </h3>
            <p className="text-sm text-foreground/50">{title}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <StarRating rating={rating} size="sm" />
            <span className="text-sm text-foreground/40">
              ({reviewCount})
            </span>
          </div>

          {/* Experience */}
          {yearsExperience != null && yearsExperience > 0 && (
            <p className="text-xs font-medium text-gold">
              {yearsExperience} yıl deneyim
            </p>
          )}

          {/* Specialties */}
          {specialties.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {specialties.slice(0, 3).map((specialty) => (
                <Badge key={specialty} variant="sage">
                  {specialty}
                </Badge>
              ))}
              {specialties.length > 3 && (
                <Badge variant="outline">+{specialties.length - 3}</Badge>
              )}
            </div>
          )}

          {/* Bio */}
          {bio && (
            <p className="text-sm leading-relaxed text-foreground/60 line-clamp-2">
              {bio}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
