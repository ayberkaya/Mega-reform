import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  breathing?: boolean;
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-20 w-20",
  xl: "h-32 w-32",
};

const imageSizeMap = {
  sm: 32,
  md: 48,
  lg: 80,
  xl: 128,
};

export function Avatar({ src, alt, size = "md", className, breathing }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden bg-lavender/30 flex items-center justify-center shrink-0",
        sizeMap[size],
        breathing && "ring-2 ring-lavender/50 animate-breathe",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={imageSizeMap[size]}
          height={imageSizeMap[size]}
          className="object-cover w-full h-full"
        />
      ) : (
        <span className="text-primary font-heading font-semibold text-lg">
          {alt.charAt(0).toLocaleUpperCase("tr-TR")}
        </span>
      )}
    </div>
  );
}
