"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Building2, Gauge, Network, Radio } from "lucide-react"
import { getPrefersReducedMotion } from "@/lib/motion"
import { TiltCard } from "@/components/effects/tilt-card"

const panels = [
  {
    title: "Ashburn · VA",
    detail: "72 MW · Tier IV",
    icon: Building2,
    offset: "translate-y-6 lg:translate-y-10",
    delay: 0,
  },
  {
    title: "Latency map",
    detail: "12 ms to IAD",
    icon: Network,
    offset: "-translate-y-2 lg:-translate-y-6",
    delay: 0.08,
  },
  {
    title: "PUE tracker",
    detail: "1.28 trailing",
    icon: Gauge,
    offset: "translate-y-10 lg:translate-y-16",
    delay: 0.16,
  },
  {
    title: "Carrier density",
    detail: "40+ networks",
    icon: Radio,
    offset: "translate-y-0",
    delay: 0.24,
  },
]

export function FloatingPanels() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || getPrefersReducedMotion()) return

    const cards = el.querySelectorAll("[data-float]")
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.35,
        },
      )

      cards.forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -10 : 12,
          duration: 2.8 + i * 0.35,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.2,
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={root}
      className="relative mx-auto grid max-w-lg grid-cols-2 gap-3 sm:gap-4"
      style={{ perspective: "1000px" }}
    >
      {panels.map((panel) => (
        <div
          key={panel.title}
          data-float
          className={`${panel.offset} will-change-transform`}
        >
          <TiltCard
            maxTilt={8}
            className="border border-white/50 bg-white/80 p-4 shadow-[0_20px_50px_-28px_rgba(8,28,21,0.55)] backdrop-blur-md"
          >
            <panel.icon className="size-4 text-sea-green" />
            <p className="mt-3 text-sm font-semibold text-evergreen">
              {panel.title}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{panel.detail}</p>
          </TiltCard>
        </div>
      ))}
    </div>
  )
}
