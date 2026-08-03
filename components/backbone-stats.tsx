"use client"

import { AnimatedCounter } from "@/components/effects/animated-counter"
import { stats } from "@/lib/data"

export function BackboneStats() {
  return (
    <section className="border-b border-border bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-sea-green">
          The backbone of hybrid infrastructure
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
