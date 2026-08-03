"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Quote } from "lucide-react"
import { testimonials } from "@/lib/data"
import { getPrefersReducedMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { SpotlightZone } from "@/components/effects/spotlight-zone"

const tones = [
  "from-pine-teal to-dark-emerald",
  "from-dark-emerald to-sea-green",
  "from-sea-green to-mint-leaf",
]

export function Testimonials() {
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = track.current
    if (!el || getPrefersReducedMotion()) return

    const cards = el.querySelectorAll("[data-quote]")
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
    <SpotlightZone
      id="testimonials"
      className="scroll-mt-24 border-y border-border bg-evergreen text-frosted-mint"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-mint-leaf">
            Why teams choose us
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Infrastructure decisions, made with confidence.
          </h2>
          <p className="mt-4 text-celadon/90">
            Hear from infrastructure leaders who used agil.IT to match
            workload, compliance, and latency requirements.
          </p>
        </div>

        <div
          ref={track}
          className="mt-12 grid gap-px bg-white/10 md:grid-cols-3"
        >
          {testimonials.map((t, index) => (
            <figure
              key={t.name}
              data-quote
              className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden bg-evergreen p-5 transition-colors hover:bg-pine-teal sm:p-6"
            >
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-gradient-to-br opacity-40 blur-2xl transition-opacity group-hover:opacity-70",
                  tones[index % tones.length],
                )}
              />
              <div className="relative">
                <Quote
                  className="h-7 w-7 text-mint-leaf/50"
                  aria-hidden="true"
                />
                <blockquote className="mt-4 text-pretty text-lg leading-snug tracking-tight">
                  {t.quote}
                </blockquote>
              </div>
              <figcaption className="relative mt-8 border-t border-white/10 pt-4">
                <span className="block font-semibold">{t.name}</span>
                <span className="mt-1 block text-sm text-celadon/80">
                  {t.role}, {t.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </SpotlightZone>
  )
}
