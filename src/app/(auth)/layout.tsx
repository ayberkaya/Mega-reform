import { GradientOrb } from "@/components/animations/gradient-orb";
import { FloatingParticles } from "@/components/animations/floating-particles";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-primary-light relative overflow-hidden">
      <FloatingParticles count={25} />
      <GradientOrb
        size={400}
        color1="rgba(211, 211, 255, 0.15)"
        color2="transparent"
        className="top-[-100px] left-[-100px]"
      />
      <GradientOrb
        size={350}
        color1="rgba(212, 175, 55, 0.1)"
        color2="transparent"
        className="bottom-[-80px] right-[-80px]"
        delay={5}
      />

      {/* Mandala background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-[700px] h-[700px]" fill="white">
          <circle cx="200" cy="200" r="180" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="60" fill="none" stroke="white" strokeWidth="0.5" />
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={200 + 60 * Math.cos(angle)}
                y1={200 + 60 * Math.sin(angle)}
                x2={200 + 180 * Math.cos(angle)}
                y2={200 + 180 * Math.sin(angle)}
                stroke="white"
                strokeWidth="0.5"
              />
            );
          })}
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">{children}</div>
    </div>
  );
}
