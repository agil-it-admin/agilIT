"use client"

import { useEffect, useId, useState, type ReactNode } from "react"
import gsap from "gsap"
import {
  Activity,
  Cable,
  Cpu,
  Server,
  ShieldCheck,
  Zap,
} from "lucide-react"
import { getPrefersReducedMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { TiltCard } from "@/components/effects/tilt-card"

type Tab = {
  id: string
  label: string
  title: string
  description: string
  Demo: () => ReactNode
}

function ColocationDemo() {
  return (
    <div className="space-y-3 p-5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium text-evergreen">Facility match</span>
        <span className="inline-flex items-center gap-1 text-sea-green">
          <Activity className="size-3" /> Live
        </span>
      </div>
      {[
        { name: "Loudoun Gateway DC1", mw: "72 MW", score: 98 },
        { name: "Silicon Valley Campus 4", mw: "48 MW", score: 94 },
        { name: "Infomart Exchange", mw: "60 MW", score: 91 },
      ].map((row) => (
        <div
          key={row.name}
          className="flex items-center gap-3 border border-border bg-background/80 px-3 py-2.5"
        >
          <Server className="size-4 shrink-0 text-sea-green" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-evergreen">
              {row.name}
            </p>
            <p className="text-xs text-muted-foreground">{row.mw} available</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-sea-green">{row.score}</p>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
              fit
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function PowerDemo() {
  const bars = [42, 68, 55, 80, 63, 74, 58, 90, 71, 66, 78, 84]
  return (
    <div className="space-y-4 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Committed power</p>
          <p className="text-2xl font-semibold tracking-tight text-evergreen">
            18.4 <span className="text-base font-medium text-sea-green">MW</span>
          </p>
        </div>
        <Zap className="size-8 text-mint-leaf" />
      </div>
      <div className="flex h-28 items-end gap-1.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-dark-emerald to-mint-leaf transition-all"
            style={{ height: `${h}%`, opacity: 0.45 + (h / 100) * 0.55 }}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Utilization across 12 cabinets · last 30 days
      </p>
    </div>
  )
}

function ConnectivityDemo() {
  return (
    <div className="relative overflow-hidden p-5">
      <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Cable className="size-3.5 text-sea-green" />
        Cross-connect fabric
      </div>
      <svg viewBox="0 0 320 160" className="h-40 w-full" aria-hidden>
        <defs>
          <linearGradient id="arc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#52b788" stopOpacity="0" />
            <stop offset="50%" stopColor="#40916c" stopOpacity="1" />
            <stop offset="100%" stopColor="#52b788" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          [40, 120, 160, 40],
          [40, 120, 280, 90],
          [160, 40, 280, 90],
          [90, 70, 220, 130],
        ].map(([x1, y1, x2, y2], i) => (
          <path
            key={i}
            d={`M${x1} ${y1} Q ${(x1 + x2) / 2} ${Math.min(y1, y2) - 30} ${x2} ${y2}`}
            fill="none"
            stroke="url(#arc)"
            strokeWidth="2"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
        {[
          [40, 120, "Meet-me"],
          [160, 40, "Cloud"],
          [280, 90, "Carrier"],
        ].map(([x, y, label], i) => (
          <g key={i}>
            <circle cx={x as number} cy={y as number} r="8" fill="#081c15" />
            <circle cx={x as number} cy={y as number} r="4" fill="#74c69d" />
            <text
              x={x as number}
              y={(y as number) + 22}
              textAnchor="middle"
              className="fill-muted-foreground text-[10px]"
            >
              {label as string}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function ComplianceDemo() {
  const items = [
    { label: "SOC 2 Type II", ok: true },
    { label: "ISO 27001", ok: true },
    { label: "PCI DSS", ok: true },
    { label: "HIPAA", ok: false },
  ]
  return (
    <div className="space-y-3 p-5">
      <div className="flex items-center gap-2">
        <ShieldCheck className="size-4 text-sea-green" />
        <p className="text-sm font-medium text-evergreen">Certification gate</p>
      </div>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between border border-border px-3 py-2.5 text-sm"
        >
          <span className="text-foreground">{item.label}</span>
          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-wide",
              item.ok ? "text-sea-green" : "text-muted-foreground",
            )}
          >
            {item.ok ? "Verified" : "Optional"}
          </span>
        </div>
      ))}
    </div>
  )
}

function ComputeDemo() {
  return (
    <div className="space-y-4 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-evergreen">Bare metal pool</p>
        <Cpu className="size-4 text-sea-green" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { k: "vCPU", v: "128" },
          { k: "RAM", v: "512 GB" },
          { k: "NVMe", v: "7.6 TB" },
          { k: "NIC", v: "100 GbE" },
        ].map((cell) => (
          <div
            key={cell.k}
            className="border border-border bg-frosted-mint/40 px-3 py-3"
          >
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {cell.k}
            </p>
            <p className="mt-1 text-lg font-semibold text-evergreen">{cell.v}</p>
          </div>
        ))}
      </div>
      <div className="h-2 overflow-hidden bg-muted">
        <div className="h-full w-[72%] bg-gradient-to-r from-pine-teal to-mint-leaf" />
      </div>
      <p className="text-xs text-muted-foreground">72% inventory reserved</p>
    </div>
  )
}

const tabs: Tab[] = [
  {
    id: "colo",
    label: "Colocation",
    title: "Match cabinets to real capacity",
    description:
      "Rank facilities by power, space, latency, and certifications — then request quote-ready options in one brief.",
    Demo: ColocationDemo,
  },
  {
    id: "power",
    label: "Power",
    title: "Plan denser racks with confidence",
    description:
      "See committed vs. available megawatts, PUE targets, and growth headroom before you sign.",
    Demo: PowerDemo,
  },
  {
    id: "connect",
    label: "Connectivity",
    title: "Wire into clouds and carriers",
    description:
      "Map meet-me rooms, cloud on-ramps, and cross-connect paths across the network.",
    Demo: ConnectivityDemo,
  },
  {
    id: "compliance",
    label: "Compliance",
    title: "Filter by the audits you need",
    description:
      "Gate results on SOC 2, ISO, PCI, HIPAA, and regional requirements without spreadsheet chaos.",
    Demo: ComplianceDemo,
  },
  {
    id: "compute",
    label: "Bare metal",
    title: "Reserve hardware next to your colo",
    description:
      "Pair dedicated compute with your cages when hybrid topologies need local horsepower.",
    Demo: ComputeDemo,
  },
]

export function ProductShowcase() {
  const [active, setActive] = useState(tabs[0].id)
  const panelId = useId()
  const current = tabs.find((t) => t.id === active) ?? tabs[0]

  useEffect(() => {
    if (getPrefersReducedMotion()) return
    const panel = document.getElementById(panelId)
    if (!panel) return
    gsap.fromTo(
      panel,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
    )
  }, [active, panelId])

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div>
        <p className="text-sm font-medium text-sea-green">Flexible solutions</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-evergreen sm:text-4xl">
          Infrastructure tools that work alone — or together.
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground">
          Explore the same interaction pattern Stripe uses for product tabs:
          switch capabilities and the demo UI morphs in place.
        </p>

        <div
          role="tablist"
          aria-label="Product capabilities"
          className="mt-8 flex flex-col gap-1"
        >
          {tabs.map((tab) => {
            const selected = tab.id === active
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={selected}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "border-l-2 px-4 py-3 text-left transition-colors",
                  selected
                    ? "border-sea-green bg-frosted-mint/60 text-evergreen"
                    : "border-transparent text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <span className="block text-sm font-semibold">{tab.label}</span>
                {selected ? (
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {tab.description}
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>

      <div className="lg:sticky lg:top-24">
        <TiltCard className="border border-border bg-background shadow-[0_30px_80px_-40px_rgba(8,28,21,0.45)]">
          <div className="border-b border-border bg-muted/40 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {current.label}
            </p>
            <p className="mt-0.5 text-sm font-semibold text-evergreen">
              {current.title}
            </p>
          </div>
          <div id={panelId} role="tabpanel">
            <current.Demo />
          </div>
        </TiltCard>
      </div>
    </div>
  )
}
