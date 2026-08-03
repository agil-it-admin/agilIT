"use client"

import Image from "next/image"
import { ArrowUpRight, Linkedin } from "lucide-react"
import { team, type TeamMember } from "@/lib/data"
import { cn } from "@/lib/utils"
import { TiltCard } from "@/components/effects/tilt-card"
import { MeshGradient } from "@/components/effects/mesh-gradient"
import { SpotlightZone } from "@/components/effects/spotlight-zone"

type DemoMember = TeamMember & {
  role: string
  focus: string
  placeholder?: string
}

const demoTeam: DemoMember[] = [
  {
    ...team[0],
    role: "Managing Partner",
    focus: "Wholesale colo & hyperscale",
  },
  {
    ...team[1],
    role: "Principal Advisor",
    focus: "Hybrid cloud & connectivity",
  },
  {
    id: "maya-chen",
    name: "Maya Chen",
    role: "Market Lead, West",
    focus: "Edge & media workloads",
    image: "",
    placeholder: "#95d5b2",
  },
  {
    id: "jordan-okeke",
    name: "Jordan Okeke",
    role: "Compliance Lead",
    focus: "HIPAA, SOC 2, FedRAMP",
    image: "",
    placeholder: "#74c69d",
  },
]

function Portrait({
  member,
  className,
  sizes = "384px",
}: {
  member: DemoMember
  className?: string
  sizes?: string
}) {
  if (member.placeholder || !member.image) {
    return (
      <div
        className={cn("h-full w-full", className)}
        style={{ backgroundColor: member.placeholder ?? "#b7e4c7" }}
        role="img"
        aria-label={member.name}
      />
    )
  }

  return (
    <Image
      src={member.image}
      alt={member.name}
      fill
      className={cn("object-cover object-top", className)}
      sizes={sizes}
    />
  )
}

/** A — Editorial split: copy left, portraits right (Stripe homepage people) */
export function VariantEditorialSplit() {
  return (
    <section className="overflow-hidden border border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:py-24">
        <div>
          <p className="text-sm font-medium text-sea-green">Our team</p>
          <h3 className="mt-3 max-w-md text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            Advisors who know the market
          </h3>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Seasoned infrastructure specialists who help you navigate
            colocation, cloud, and connectivity decisions with clarity.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-sea-green transition-colors hover:text-dark-emerald"
          >
            Talk to an advisor
            <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {demoTeam.map((m, i) => (
            <article
              key={m.id}
              className={cn(
                "group overflow-hidden border border-border bg-card",
                i % 2 === 1 && "mt-8",
              )}
            >
              <div className="relative aspect-[4/5] bg-muted">
                <Portrait member={m} sizes="(max-width: 1024px) 50vw, 280px" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-evergreen">{m.name}</h4>
                <p className="mt-0.5 text-sm text-muted-foreground">{m.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** B — Dark spotlight strip (matches Customer outcomes) */
export function VariantDarkSpotlight() {
  return (
    <SpotlightZone className="border border-border bg-evergreen text-frosted-mint">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-mint-leaf">Our team</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Advisors who know the market
          </h3>
          <p className="mt-4 text-celadon/90">
            Seasoned infrastructure specialists who help you navigate
            colocation, cloud, and connectivity with clarity.
          </p>
        </div>
        <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {demoTeam.map((m, i) => (
            <article
              key={m.id}
              className="group relative flex flex-col overflow-hidden bg-evergreen transition-colors hover:bg-pine-teal"
            >
              <div className="relative aspect-[4/5] bg-pine-teal/40">
                <Portrait
                  member={m}
                  className="opacity-90 transition-opacity group-hover:opacity-100"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-evergreen via-transparent to-transparent opacity-80"
                />
              </div>
              <div className="relative -mt-16 p-5">
                <p className="text-xs font-semibold tracking-wider text-mint-leaf uppercase">
                  {m.focus}
                </p>
                <h4 className="mt-2 text-lg font-semibold">{m.name}</h4>
                <p className="mt-1 text-sm text-celadon/80">{m.role}</p>
              </div>
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -right-6 -top-6 size-32 rounded-full bg-gradient-to-br opacity-30 blur-2xl",
                  i % 2 === 0
                    ? "from-mint-leaf to-sea-green"
                    : "from-sea-green to-dark-emerald",
                )}
              />
            </article>
          ))}
        </div>
      </div>
    </SpotlightZone>
  )
}

/** C — Soft mesh + tilt cards */
export function VariantMeshTilt() {
  return (
    <section className="relative isolate overflow-hidden border border-border">
      <MeshGradient className="opacity-70" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-pine-teal/80">Our team</p>
          <h3 className="mt-3 text-pretty text-3xl font-semibold tracking-tight text-evergreen sm:text-4xl">
            Advisors who know the market
          </h3>
          <p className="mt-4 text-pretty text-lg text-pine-teal/75">
            Hover a card — Stripe-style depth and glare on real bios.
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {demoTeam.map((m) => (
            <TiltCard
              key={m.id}
              className="overflow-hidden border border-border/80 bg-background/80 shadow-sm backdrop-blur-sm"
            >
              <div className="relative aspect-square bg-muted">
                <Portrait member={m} sizes="240px" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-evergreen">{m.name}</h4>
                <p className="mt-0.5 text-sm text-muted-foreground">{m.role}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

/** D — Horizontal portrait rail */
export function VariantPortraitRail() {
  return (
    <section className="border border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-sea-green">Our team</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-evergreen sm:text-4xl">
              Advisors who know the market
            </h3>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Scroll the rail on smaller screens — a Stripe Sessions–style
            speaker strip.
          </p>
        </div>
        <div className="mt-10 -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {demoTeam.map((m) => (
            <article
              key={m.id}
              className="w-[72vw] shrink-0 border border-border bg-card sm:w-[42vw] lg:w-auto"
            >
              <div className="relative aspect-[3/4] bg-muted">
                <Portrait member={m} sizes="(max-width: 1024px) 70vw, 25vw" />
              </div>
              <div className="flex items-start justify-between gap-3 p-4">
                <div>
                  <h4 className="font-semibold text-evergreen">{m.name}</h4>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {m.role}
                  </p>
                  <p className="mt-2 text-xs text-sea-green">{m.focus}</p>
                </div>
                <span className="inline-flex size-8 shrink-0 items-center justify-center border border-border text-muted-foreground">
                  <Linkedin className="size-3.5" aria-hidden />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** E — Magazine / typographic (hairline rules, big names) */
export function VariantMagazine() {
  return (
    <section className="border border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="border-b border-foreground/15 pb-8">
          <p className="text-sm font-medium tracking-wide text-muted-foreground">
            Our team
          </p>
          <h3 className="mt-3 max-w-3xl text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl lg:text-6xl">
            Advisors who know the market
          </h3>
        </div>
        <ul className="divide-y divide-foreground/10">
          {demoTeam.map((m) => (
            <li
              key={m.id}
              className="group grid gap-6 py-8 sm:grid-cols-[140px_1fr_auto] sm:items-center lg:gap-10"
            >
              <div className="relative aspect-square w-28 overflow-hidden bg-muted sm:w-full">
                <Portrait member={m} sizes="140px" />
              </div>
              <div>
                <h4 className="text-2xl font-semibold tracking-tight text-evergreen transition-colors group-hover:text-sea-green sm:text-3xl">
                  {m.name}
                </h4>
                <p className="mt-1 text-muted-foreground">
                  {m.role} · {m.focus}
                </p>
              </div>
              <span className="hidden size-10 items-center justify-center border border-foreground/20 text-evergreen transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:inline-flex">
                <ArrowUpRight className="size-4" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** F — Bento asymmetric */
export function VariantBento() {
  const [lead, ...rest] = demoTeam
  return (
    <section className="border border-border bg-frosted-mint/25">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-sea-green">Our team</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-evergreen sm:text-4xl">
            Advisors who know the market
          </h3>
          <p className="mt-4 text-muted-foreground">
            Asymmetric bento — one featured advisor, supporting bios beside.
          </p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
          <article className="overflow-hidden border border-border bg-card lg:col-span-7 lg:row-span-2">
            <div className="grid h-full sm:grid-cols-2">
              <div className="relative min-h-[280px] bg-muted sm:min-h-full">
                <Portrait member={lead} sizes="(max-width: 1024px) 100vw, 40vw" />
              </div>
              <div className="flex flex-col justify-end p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-wider text-sea-green uppercase">
                  Featured
                </p>
                <h4 className="mt-3 text-2xl font-semibold text-evergreen">
                  {lead.name}
                </h4>
                <p className="mt-1 text-muted-foreground">{lead.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {lead.focus}. Hands-on sourcing across wholesale and retail
                  colocation footprints.
                </p>
              </div>
            </div>
          </article>
          {rest.map((m) => (
            <article
              key={m.id}
              className="flex gap-4 overflow-hidden border border-border bg-card p-4 lg:col-span-5"
            >
              <div className="relative aspect-square w-24 shrink-0 bg-muted sm:w-28">
                <Portrait member={m} sizes="112px" />
              </div>
              <div className="flex min-w-0 flex-col justify-center">
                <h4 className="font-semibold text-evergreen">{m.name}</h4>
                <p className="mt-0.5 text-sm text-muted-foreground">{m.role}</p>
                <p className="mt-2 text-xs text-sea-green">{m.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** G — Centered avatars + floating captions (minimal Stripe) */
export function VariantCenteredAvatars() {
  return (
    <section className="border border-border bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-24">
        <p className="text-sm font-medium text-sea-green">Our team</p>
        <h3 className="mt-3 text-pretty text-3xl font-semibold tracking-tight text-evergreen sm:text-4xl">
          Advisors who know the market
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
          Seasoned infrastructure specialists who help you navigate
          colocation, cloud, and connectivity decisions with clarity.
        </p>
        <ul className="mt-14 flex flex-wrap items-start justify-center gap-8 sm:gap-10">
          {demoTeam.map((m, i) => (
            <li
              key={m.id}
              className={cn(
                "w-36 text-center sm:w-40",
                i % 2 === 1 && "sm:mt-10",
              )}
            >
              <div className="relative mx-auto aspect-square w-28 overflow-hidden border border-border bg-muted sm:w-32">
                <Portrait member={m} sizes="128px" />
              </div>
              <h4 className="mt-4 text-sm font-semibold text-evergreen">
                {m.name}
              </h4>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">
                {m.role}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** H — Current site baseline (for comparison) */
export function VariantCurrentBaseline() {
  return (
    <section className="border border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-muted-foreground">
            Our team
          </span>
          <h3 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Advisors who know the market
          </h3>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Seasoned infrastructure specialists who help you navigate
            colocation, cloud, and connectivity decisions with clarity.
          </p>
        </div>
        <ul className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
          {demoTeam.slice(0, 2).map((member) => (
            <li
              key={member.id}
              className="overflow-hidden border border-border bg-card"
            >
              <div className="relative aspect-square border-b border-border bg-muted">
                <Portrait member={member} sizes="384px" />
              </div>
              <div className="p-6">
                <h4 className="font-semibold text-foreground">{member.name}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {member.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
