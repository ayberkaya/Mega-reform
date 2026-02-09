import { cn } from "@/lib/utils/cn";

interface WaveDividerProps {
  color?: string;
  flip?: boolean;
  className?: string;
  variant?: "gentle" | "flowing";
}

export function WaveDivider({
  color = "#FAFBF9",
  flip = false,
  className,
  variant = "gentle",
}: WaveDividerProps) {
  const paths = {
    gentle:
      "M0,64 C288,120 576,20 720,64 C864,108 1152,120 1440,80 L1440,320 L0,320 Z",
    flowing:
      "M0,96 C240,160 480,32 720,96 C960,160 1200,32 1440,96 L1440,320 L0,320 Z",
  };

  return (
    <div
      className={cn(
        "w-full overflow-hidden leading-none",
        flip && "rotate-180",
        className
      )}
    >
      <svg
        className="relative block w-full h-[80px] md:h-[120px]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={paths[variant]} fill={color} />
      </svg>
    </div>
  );
}
