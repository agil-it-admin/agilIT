"use client"

import { AnimatedCounter } from "@/components/effects/animated-counter"
import { SpotlightZone } from "@/components/effects/spotlight-zone"
import { stats } from "@/lib/data"
import { cn } from "@/lib/utils"

const tones = [
  "from-pine-teal to-dark-emerald",
  "from-dark-emerald to-sea-green",
  "from-sea-green to-mint-leaf",
  "from-mint-leaf-deep to-celadon",
]

export function BackboneStats() {
  return (
    <SpotlightZone className="border-y border-border bg-evergreen text-frosted-mint">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-center text-sm font-medium text-mint-leaf">
          The backbone of hybrid infrastructure
        </p>
        <div className="mt-10 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden bg-evergreen px-5 py-8 text-center transition-colors hover:bg-pine-teal sm:py-10"
            >
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-gradient-to-br opacity-40 blur-2xl transition-opacity group-hover:opacity-70",
                  tones[index % tones.length],
                )}
              />
              <p className="relative text-4xl font-semibold tracking-tight sm:text-5xl">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="relative mt-2 text-sm text-celadon/90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </SpotlightZone>
  )
}
