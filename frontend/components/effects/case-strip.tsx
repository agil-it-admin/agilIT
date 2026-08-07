"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ArrowUpRight } from "lucide-react"
import { getPrefersReducedMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { SpotlightZone } from "@/components/effects/spotlight-zone"

const stories = [
  {
    company: "Northwind Analytics",
    headline: "Consolidated 4 regions onto a single colo brief.",
    metric: "11 weeks",
    metricLabel: "to first live cabinet",
    tone: "from-pine-teal to-dark-emerald",
  },
  {
    company: "Harbor Payments",
    headline: "Cut latency to primary processors by relocating to Ashburn.",
    metric: "38%",
    metricLabel: "lower p99 latency",
    tone: "from-dark-emerald to-sea-green",
  },
  {
    company: "Cascade Media",
    headline: "Hybrid edge footprint across West Coast metros.",
    metric: "6 sites",
    metricLabel: "matched in one RFP",
    tone: "from-sea-green to-mint-leaf",
  },
  {
    company: "Atlas Health",
    headline: "HIPAA-ready capacity without rebuilding procurement.",
    metric: "SOC 2",
    metricLabel: "+ HIPAA gated",
    tone: "from-mint-leaf-deep to-celadon",
  },
]

export function CaseStrip() {
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = track.current
    if (!el || getPrefersReducedMotion()) return

    const cards = el.querySelectorAll("[data-case]")
    gsap.set(cards, { opacity: 0, y: 28 })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
          })
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <SpotlightZone className="border-y border-border bg-evergreen text-frosted-mint">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-mint-leaf">Customer outcomes</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Powering infrastructure decisions of every size.
          </h2>
          <p className="mt-4 text-celadon/90">
            Hover the strip — the spotlight follows, Stripe-style. Stories are
            illustrative for this effects demo.
          </p>
        </div>

        <div
          ref={track}
          className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stories.map((story) => (
            <article
              key={story.company}
              data-case
              className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden bg-evergreen p-5 transition-colors hover:bg-pine-teal"
            >
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-gradient-to-br opacity-40 blur-2xl transition-opacity group-hover:opacity-70",
                  story.tone,
                )}
              />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-wider text-mint-leaf">
                  {story.company}
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
                  {story.headline}
                </h3>
              </div>
              <div className="relative mt-8 flex items-end justify-between gap-3">
                <div>
                  <p className="text-2xl font-semibold tracking-tight">
                    {story.metric}
                  </p>
                  <p className="text-xs text-celadon/80">{story.metricLabel}</p>
                </div>
                <span className="inline-flex size-8 items-center justify-center border border-white/20 text-mint-leaf transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SpotlightZone>
  )
}
