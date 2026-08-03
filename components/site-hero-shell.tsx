import { Hero } from "@/components/hero"
import { LogoMarquee } from "@/components/logo-marquee"
import ColorBends from "@/components/color-bends"
import DotField from "@/components/dot-field"

export function SiteHeroShell() {
  return (
    <div
      id="top"
      className="relative flex min-h-dvh flex-col overflow-hidden bg-frosted-mint/35"
    >
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full">
        <ColorBends
          className="h-full w-full"
          colors={["#a8cbb8", "#7fa892", "#c5ddd0"]}
          rotation={-20}
          speed={0.14}
          scale={1}
          frequency={1.05}
          warpStrength={1.05}
          mouseInfluence={0}
          noise={0.06}
          parallax={0}
          iterations={2}
          intensity={0.85}
          bandWidth={2.2}
          transparent
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] h-full w-full">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(8, 28, 21, 0.35)"
          gradientTo="rgba(45, 106, 79, 0.28)"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 86%, var(--background) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex min-h-dvh flex-col pt-16 sm:pt-20">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
          <Hero />
        </div>
        <LogoMarquee />
        <div className="h-10 shrink-0 sm:h-14" aria-hidden="true" />
      </div>
    </div>
  )
}
