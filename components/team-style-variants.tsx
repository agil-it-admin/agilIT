"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { team } from "@/lib/data"
import { cn } from "@/lib/utils"
import { MeshGradient } from "@/components/effects/mesh-gradient"

const advisors = [
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
] as const

const copy = {
  eyebrow: "Our team",
  title: "Advisors who know the market",
  body: "Seasoned infrastructure specialists who help you navigate colocation, cloud, and connectivity decisions with clarity.",
}

function Portrait({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src: string
  alt: string
  className?: string
  sizes: string
  priority?: boolean
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      className={cn(
        "object-cover object-top transition duration-700 ease-out group-hover:scale-[1.03]",
        className,
      )}
      sizes={sizes}
    />
  )
}

function Eyebrow({ className }: { className?: string }) {
  return (
    <p className={cn("text-sm font-medium text-sea-green", className)}>
      {copy.eyebrow}
    </p>
  )
}

function CtaLink({ className }: { className?: string }) {
  return (
    <a
      href="#contact"
      className={cn(
        "group/cta inline-flex items-center gap-2 text-sm font-semibold text-sea-green transition-colors hover:text-dark-emerald",
        className,
      )}
    >
      Talk to an advisor
      <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
    </a>
  )
}

/** 1 — Classic Stripe editorial: copy left, staggered portraits right */
export function VariantStripeEditorial() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(183,228,199,0.35),transparent_55%),radial-gradient(ellipse_50%_40%_at_10%_90%,rgba(216,243,220,0.45),transparent_50%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div className="max-w-lg">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            {copy.title}
          </h3>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-pine-teal/80">
            {copy.body}
          </p>
          <CtaLink className="mt-9" />
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {advisors.map((m, i) => (
            <li
              key={m.id}
              className={cn("group", i === 1 && "mt-10 sm:mt-14 lg:mt-16")}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[18px] bg-muted shadow-[0_24px_60px_-28px_rgba(8,28,21,0.45)] ring-1 ring-black/[0.04]">
                <Portrait
                  src={m.image}
                  alt={m.name}
                  sizes="(max-width: 1024px) 45vw, 280px"
                  priority={i === 0}
                />
              </div>
              <div className="mt-4 px-0.5">
                <p className="font-semibold tracking-tight text-evergreen">
                  {m.name}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">{m.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** 2 — Soft field: centered copy, floating duo with soft depth */
export function VariantSoftField() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-frosted-mint/50 via-background to-background"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(116,198,157,0.28),transparent_70%)] blur-2xl"
      />
      <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:py-28">
        <Eyebrow />
        <h3 className="mx-auto mt-4 max-w-2xl text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
          {copy.title}
        </h3>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-pine-teal/75">
          {copy.body}
        </p>

        <ul className="mx-auto mt-16 flex max-w-2xl items-end justify-center gap-5 sm:gap-8">
          {advisors.map((m, i) => (
            <li
              key={m.id}
              className={cn(
                "group w-[42%] max-w-[260px]",
                i === 0 ? "-rotate-1" : "rotate-1 translate-y-4 sm:translate-y-6",
              )}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-muted shadow-[0_30px_70px_-32px_rgba(8,28,21,0.5)] ring-1 ring-white/60">
                <Portrait
                  src={m.image}
                  alt={m.name}
                  sizes="(max-width: 640px) 42vw, 260px"
                />
              </div>
              <div className="mt-5">
                <p className="font-semibold tracking-tight text-evergreen">
                  {m.name}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">{m.role}</p>
              </div>
            </li>
          ))}
        </ul>

        <CtaLink className="mt-12" />
      </div>
    </section>
  )
}

/** 3 — Overlap collage: one lead photo, second tucked behind */
export function VariantOverlapCollage() {
  const [lead, support] = advisors
  return (
    <section className="overflow-hidden bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-28">
        <div className="relative mx-auto aspect-[5/6] w-full max-w-md lg:max-w-none lg:justify-self-end">
          <div className="group absolute inset-y-[8%] right-0 w-[58%] overflow-hidden rounded-[20px] bg-muted shadow-[0_28px_64px_-30px_rgba(8,28,21,0.4)] ring-1 ring-black/[0.05]">
            <Portrait
              src={support.image}
              alt={support.name}
              sizes="(max-width: 1024px) 45vw, 280px"
            />
          </div>
          <div className="group absolute inset-y-0 left-0 w-[62%] overflow-hidden rounded-[22px] bg-muted shadow-[0_36px_80px_-28px_rgba(8,28,21,0.55)] ring-1 ring-black/[0.06]">
            <Portrait
              src={lead.image}
              alt={lead.name}
              sizes="(max-width: 1024px) 50vw, 320px"
              priority
            />
          </div>
          <div className="absolute -bottom-2 left-[8%] right-[20%] flex gap-8 rounded-[16px] border border-white/70 bg-background/90 px-5 py-4 shadow-[0_18px_40px_-24px_rgba(8,28,21,0.35)] backdrop-blur-md sm:px-6">
            <div>
              <p className="text-sm font-semibold text-evergreen">{lead.name}</p>
              <p className="text-xs text-muted-foreground">{lead.role}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-evergreen">
                {support.name}
              </p>
              <p className="text-xs text-muted-foreground">{support.role}</p>
            </div>
          </div>
        </div>

        <div className="max-w-lg lg:pl-8">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            {copy.title}
          </h3>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-pine-teal/80">
            {copy.body}
          </p>
          <ul className="mt-8 space-y-3">
            {advisors.map((m) => (
              <li
                key={m.id}
                className="flex items-baseline justify-between gap-4 border-b border-border/70 py-3"
              >
                <span className="font-medium text-evergreen">{m.name}</span>
                <span className="text-sm text-muted-foreground">{m.focus}</span>
              </li>
            ))}
          </ul>
          <CtaLink className="mt-8" />
        </div>
      </div>
    </section>
  )
}

/** 4 — Quiet columns: generous air, two tall equal portraits */
export function VariantQuietColumns() {
  return (
    <section className="border-y border-border/60 bg-[#f7faf8]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-[2.75rem] sm:leading-[1.1]">
            {copy.title}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/75">
            {copy.body}
          </p>
        </div>

        <ul className="mt-16 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:gap-14">
          {advisors.map((m) => (
            <li key={m.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-muted">
                <Portrait
                  src={m.image}
                  alt={m.name}
                  sizes="(max-width: 640px) 100vw, 480px"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-evergreen/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>
              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xl font-semibold tracking-tight text-evergreen">
                    {m.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
                </div>
                <p className="hidden text-right text-sm text-sea-green sm:block">
                  {m.focus}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** 5 — Mesh atmosphere: living gradient + glass captions */
export function VariantMeshAtmosphere() {
  return (
    <section className="relative isolate overflow-hidden">
      <MeshGradient className="opacity-80" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/70"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-xl">
          <Eyebrow className="text-dark-emerald" />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            {copy.title}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/80">
            {copy.body}
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:gap-8">
          {advisors.map((m, i) => (
            <li
              key={m.id}
              className={cn(
                "group relative overflow-hidden rounded-[24px] bg-white/35 shadow-[0_24px_60px_-28px_rgba(8,28,21,0.35)] ring-1 ring-white/50 backdrop-blur-md",
                i === 1 && "lg:translate-y-10",
              )}
            >
              <div className="relative aspect-[5/4] sm:aspect-[4/5]">
                <Portrait
                  src={m.image}
                  alt={m.name}
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-evergreen/80 via-evergreen/35 to-transparent p-5 pt-16 sm:p-6 sm:pt-20">
                <p className="text-lg font-semibold text-frosted-mint">
                  {m.name}
                </p>
                <p className="mt-0.5 text-sm text-celadon">{m.role}</p>
              </div>
            </li>
          ))}
        </ul>

        <CtaLink className="mt-12 lg:mt-20" />
      </div>
    </section>
  )
}

/** 6 — Dark gallery: evergreen stage, luminous portraits */
export function VariantDarkGallery() {
  return (
    <section className="relative overflow-hidden bg-evergreen text-frosted-mint">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(82,183,136,0.28),transparent_55%),radial-gradient(ellipse_40%_35%_at_90%_80%,rgba(64,145,108,0.2),transparent_50%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-sm font-medium text-mint-leaf">{copy.eyebrow}</p>
            <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
              {copy.title}
            </h3>
            <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-celadon/90">
              {copy.body}
            </p>
            <a
              href="#contact"
              className="group/cta mt-9 inline-flex items-center gap-2 text-sm font-semibold text-mint-leaf transition-colors hover:text-frosted-mint"
            >
              Talk to an advisor
              <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
            </a>
          </div>

          <ul className="grid grid-cols-2 gap-4 sm:gap-5">
            {advisors.map((m, i) => (
              <li key={m.id} className={cn("group", i === 0 && "lg:-mt-8")}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[18px] bg-pine-teal/40 ring-1 ring-white/10">
                  <Portrait
                    src={m.image}
                    alt={m.name}
                    className="opacity-95"
                    sizes="(max-width: 1024px) 45vw, 300px"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-evergreen/70 via-transparent to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p className="font-semibold">{m.name}</p>
                    <p className="mt-0.5 text-sm text-celadon/85">{m.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/** 7 — Horizontal ledger: oversized names, portrait thumbs */
export function VariantNameLedger() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            {copy.title}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/80">
            {copy.body}
          </p>
        </div>

        <ul className="mt-14 divide-y divide-border/80 border-y border-border/80">
          {advisors.map((m) => (
            <li
              key={m.id}
              className="group grid items-center gap-6 py-8 sm:grid-cols-[112px_1fr_auto] sm:gap-10 lg:py-10"
            >
              <div className="relative aspect-square w-24 overflow-hidden rounded-[16px] bg-muted sm:w-28">
                <Portrait src={m.image} alt={m.name} sizes="112px" />
              </div>
              <div>
                <p className="text-3xl font-semibold tracking-tight text-evergreen transition-colors group-hover:text-sea-green sm:text-4xl lg:text-[2.75rem]">
                  {m.name}
                </p>
                <p className="mt-2 text-muted-foreground">
                  {m.role}
                  <span className="mx-2 text-border">·</span>
                  {m.focus}
                </p>
              </div>
              <span className="hidden text-sm font-medium text-sea-green sm:inline">
                Advisor
              </span>
            </li>
          ))}
        </ul>

        <CtaLink className="mt-10" />
      </div>
    </section>
  )
}

/** 8 — Baseline: current homepage (for comparison) */
export function VariantCurrentBaseline() {
  return (
    <section className="border border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-muted-foreground">
            {copy.eyebrow}
          </span>
          <h3 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {copy.title}
          </h3>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {copy.body}
          </p>
        </div>
        <ul className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
          {advisors.map((member) => (
            <li
              key={member.id}
              className="overflow-hidden border border-border bg-card"
            >
              <div className="relative aspect-square border-b border-border bg-muted">
                <Portrait
                  src={member.image}
                  alt={member.name}
                  className="transition-none group-hover:scale-100"
                  sizes="384px"
                />
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
