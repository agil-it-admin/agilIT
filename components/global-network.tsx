"use client"

import dynamic from "next/dynamic"
import { ArrowRight } from "lucide-react"
import { useQuoteModal } from "@/components/quote-modal-provider"

const CobeArcsGlobe = dynamic(
  () =>
    import("@/components/globe-examples/cobe-arcs").then((m) => m.CobeArcsGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-square max-h-[480px] w-full items-center justify-center text-sm text-muted-foreground">
        Loading network…
      </div>
    ),
  },
)

export function GlobalNetwork() {
  const { openQuoteModal } = useQuoteModal()

  return (
    <section id="locations" className="relative overflow-hidden border-y border-border/60 bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_85%_20%,rgba(183,228,199,0.32),transparent_55%),radial-gradient(ellipse_45%_40%_at_10%_90%,rgba(216,243,220,0.35),transparent_50%)]"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-28">
        <div>
          <p className="text-sm font-medium text-sea-green">Global network</p>
          <h2 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            See capacity across metros — then drill into a facility.
          </h2>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-pine-teal/80">
            Explore our provider footprint across 200+ metros. Trace routes,
            spot density hubs, and shortlist facilities that fit your power,
            compliance, and interconnect needs.
          </p>
          <button
            type="button"
            onClick={openQuoteModal}
            className="group/cta mt-9 inline-flex items-center gap-2 text-sm font-semibold text-sea-green transition-colors hover:text-dark-emerald"
          >
            Talk to an advisor
            <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
          </button>
        </div>
        <div className="flex justify-center lg:justify-end">
          <CobeArcsGlobe />
        </div>
      </div>
    </section>
  )
}
