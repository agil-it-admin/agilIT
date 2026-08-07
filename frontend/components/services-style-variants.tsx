"use client"

import { services, type Service } from "@/lib/data"
import { cn } from "@/lib/utils"
import {
  Server,
  Cloud,
  Network,
  Shield,
  Cpu,
  Globe,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  server: Server,
  cloud: Cloud,
  network: Network,
  shield: Shield,
  cpu: Cpu,
  globe: Globe,
}

const copy = {
  eyebrow: "Compare services",
  title: "Every deployment model, side by side",
  body: "From dedicated cabinets to elastic cloud, see how each option maps to your performance, scale, and budget requirements.",
}

function IconBubble({
  service,
  className,
}: {
  service: Service
  className?: string
}) {
  const Icon = iconMap[service.icon] ?? Server
  return (
    <span
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full bg-frosted-mint text-dark-emerald",
        className,
      )}
    >
      <Icon className="size-4" aria-hidden />
    </span>
  )
}

function Eyebrow({ className }: { className?: string }) {
  return (
    <p className={cn("text-sm font-medium text-sea-green", className)}>
      {copy.eyebrow}
    </p>
  )
}

function CtaLink({
  className,
  label = "Talk through your mix",
}: {
  className?: string
  label?: string
}) {
  return (
    <a
      href="#contact"
      className={cn(
        "group/cta inline-flex items-center gap-2 text-sm font-semibold text-sea-green transition-colors hover:text-dark-emerald",
        className,
      )}
    >
      {label}
      <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
    </a>
  )
}

/** 1 — Comparison matrix (current homepage) */
export function VariantComparisonMatrix() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_0%,rgba(183,228,199,0.28),transparent_55%),radial-gradient(ellipse_50%_40%_at_90%_100%,rgba(216,243,220,0.35),transparent_50%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow />
            <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
              {copy.title}
            </h3>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/80">
              {copy.body}
            </p>
          </div>
          <CtaLink />
        </div>

        <div className="mt-12 overflow-x-auto">
          <div className="min-w-[900px] overflow-hidden rounded-[22px] bg-background/80 shadow-[0_28px_64px_-36px_rgba(8,28,21,0.35)] ring-1 ring-black/4">
            <div className="grid grid-cols-[1.1fr_repeat(4,1fr)] border-b border-border/70 bg-[#f7faf8]/80">
              <div className="px-5 py-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                What we source
              </div>
              {services.map((s) => (
                <div key={s.id} className="border-l border-border/70 px-4 py-4">
                  <IconBubble service={s} className="size-9" />
                  <h4 className="mt-2 font-semibold text-evergreen">{s.name}</h4>
                  <p className="mt-0.5 text-xs text-muted-foreground">{s.tagline}</p>
                </div>
              ))}
            </div>
            {(
              [
                ["Best for", "bestFor"],
                ["How we help", "weHelpWith"],
                ["Typical timeline", "deployTime"],
              ] as const
            ).map(([label, key], row) => (
              <div
                key={label}
                className={cn(
                  "grid grid-cols-[1.1fr_repeat(4,1fr)] border-b border-border/70",
                  row % 2 === 1 && "bg-[#f7faf8]/40",
                )}
              >
                <div className="px-5 py-4 text-sm font-medium text-pine-teal/80">
                  {label}
                </div>
                {services.map((s) => (
                  <div
                    key={`${s.id}-${key}`}
                    className="border-l border-border/70 px-4 py-4 text-sm text-evergreen"
                  >
                    {s[key]}
                  </div>
                ))}
              </div>
            ))}
            <div className="grid grid-cols-[1.1fr_repeat(4,1fr)]">
              <div className="px-5 py-4 text-sm font-medium text-pine-teal/80">
                What we compare
              </div>
              {services.map((s) => (
                <ul
                  key={`${s.id}-f`}
                  className="space-y-2 border-l border-border/70 px-4 py-4"
                >
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2 text-xs leading-snug text-evergreen"
                    >
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-sea-green" />
                      {f}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** 2 — Soft field feature cards */
export function VariantSoftFieldCards() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-frosted-mint/45 via-background to-background"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-16 h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(116,198,157,0.22),transparent_70%)] blur-2xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            {copy.title}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/75">
            {copy.body}
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <li
              key={s.id}
              className={cn(
                "rounded-[22px] bg-white/75 p-6 shadow-[0_22px_50px_-28px_rgba(8,28,21,0.4)] ring-1 ring-black/4 backdrop-blur-sm",
                i % 2 === 1 && "lg:translate-y-6",
              )}
            >
              <IconBubble service={s} />
              <h4 className="mt-5 text-lg font-semibold tracking-tight text-evergreen">
                {s.name}
              </h4>
              <p className="mt-1 text-sm text-muted-foreground">{s.tagline}</p>
              <p className="mt-5 text-sm leading-relaxed text-evergreen">
                <span className="font-medium text-sea-green">We help with </span>
                {s.weHelpWith.toLowerCase()}.
              </p>
              <ul className="mt-5 space-y-2 border-t border-border/70 pt-5">
                {s.features.slice(0, 3).map((f) => (
                  <li
                    key={f}
                    className="flex gap-2 text-sm leading-snug text-pine-teal/90"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-sea-green" />
                    {f}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <CtaLink />
        </div>
      </div>
    </section>
  )
}

/** 3 — Editorial split: copy left, stacked services right */
export function VariantEditorialSplit() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(183,228,199,0.3),transparent_55%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8 lg:py-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            {copy.title}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/80">
            {copy.body}
          </p>
          <CtaLink className="mt-8" />
        </div>

        <ul className="divide-y divide-border/80 border-y border-border/80">
          {services.map((s) => (
            <li
              key={s.id}
              className="grid gap-4 py-7 sm:grid-cols-[auto_1fr] sm:gap-6"
            >
              <IconBubble service={s} />
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="text-xl font-semibold tracking-tight text-evergreen">
                    {s.name}
                  </h4>
                  <span className="text-xs font-medium text-muted-foreground">
                    {s.deployTime}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{s.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-evergreen">
                  {s.weHelpWith}
                </p>
                <p className="mt-2 text-sm text-pine-teal/75">
                  Best for {s.bestFor.toLowerCase()}.
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** 4 — Dark stage gallery */
export function VariantDarkStage() {
  return (
    <section className="relative overflow-hidden bg-evergreen text-frosted-mint">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_30%_0%,rgba(82,183,136,0.28),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-mint-leaf">{copy.eyebrow}</p>
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
            {copy.title}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-celadon/90">
            {copy.body}
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[20px] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = iconMap[s.icon] ?? Server
            return (
              <article
                key={s.id}
                className="flex flex-col bg-evergreen p-6 transition-colors hover:bg-pine-teal"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-mint-leaf">
                  <Icon className="size-4" aria-hidden />
                </span>
                <h4 className="mt-5 text-lg font-semibold">{s.name}</h4>
                <p className="mt-1 text-sm text-celadon/85">{s.tagline}</p>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-frosted-mint/90">
                  {s.weHelpWith}
                </p>
                <p className="mt-5 border-t border-white/10 pt-4 text-xs text-mint-leaf">
                  Best for {s.bestFor.toLowerCase()}
                </p>
              </article>
            )
          })}
        </div>

        <CtaLink
          className="mt-10 text-mint-leaf hover:text-frosted-mint"
          label="Talk through your mix"
        />
      </div>
    </section>
  )
}

/** 5 — Bento mosaic */
export function VariantBentoMosaic() {
  const [lead, ...rest] = services

  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(183,228,199,0.28),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            {copy.title}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/80">
            {copy.body}
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
          <article className="flex flex-col justify-between rounded-[24px] bg-[#f7faf8] p-7 ring-1 ring-black/4 sm:p-9 lg:col-span-7 lg:row-span-2">
            <div>
              <IconBubble service={lead} className="size-12" />
              <h4 className="mt-6 text-3xl font-semibold tracking-tight text-evergreen">
                {lead.name}
              </h4>
              <p className="mt-2 text-muted-foreground">{lead.tagline}</p>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-evergreen">
                {lead.weHelpWith}. Best for {lead.bestFor.toLowerCase()}.
              </p>
            </div>
            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {lead.features.map((f) => (
                <li
                  key={f}
                  className="flex gap-2 text-sm text-pine-teal/90"
                >
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-sea-green" />
                  {f}
                </li>
              ))}
            </ul>
          </article>

          {rest.map((s) => (
            <article
              key={s.id}
              className="rounded-[20px] bg-[#f7faf8] p-6 ring-1 ring-black/4 lg:col-span-5"
            >
              <div className="flex items-start gap-4">
                <IconBubble service={s} />
                <div>
                  <h4 className="text-lg font-semibold text-evergreen">
                    {s.name}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {s.weHelpWith}
                  </p>
                  <p className="mt-3 text-xs font-medium text-sea-green">
                    {s.deployTime}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <CtaLink className="mt-10" />
      </div>
    </section>
  )
}

/** 6 — Quiet icon rail */
export function VariantQuietRail() {
  return (
    <section className="border-y border-border/60 bg-[#f7faf8]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-[2.75rem] sm:leading-[1.1]">
            {copy.title}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/75">
            {copy.body}
          </p>
        </div>

        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {services.map((s) => (
            <li key={s.id} className="text-center sm:text-left">
              <IconBubble service={s} className="mx-auto sm:mx-0" />
              <h4 className="mt-5 text-lg font-semibold tracking-tight text-evergreen">
                {s.name}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.weHelpWith}
              </p>
              <p className="mt-4 text-xs font-medium tracking-wide text-sea-green uppercase">
                {s.bestFor}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-14 text-center">
          <CtaLink />
        </div>
      </div>
    </section>
  )
}

/** 7 — Numbered ledger */
export function VariantNumberedLedger() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl border-b border-border/80 pb-10">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            {copy.title}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/80">
            {copy.body}
          </p>
        </div>

        <ul>
          {services.map((s, i) => (
            <li
              key={s.id}
              className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-border/80 py-8 sm:grid-cols-[4.5rem_1fr_auto] sm:gap-8 sm:py-10"
            >
              <span className="font-mono text-sm tracking-wider text-sea-green/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="text-xl font-semibold tracking-tight text-evergreen sm:text-2xl">
                  {s.name}
                </h4>
                <p className="mt-2 text-muted-foreground">{s.weHelpWith}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.features.slice(0, 3).map((f) => (
                    <li
                      key={f}
                      className="rounded-full bg-[#f7faf8] px-3 py-1 text-xs text-pine-teal/90 ring-1 ring-black/4"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="hidden text-sm text-muted-foreground sm:block">
                {s.deployTime}
              </span>
            </li>
          ))}
        </ul>

        <CtaLink className="mt-10" />
      </div>
    </section>
  )
}

/** 8 — Horizon process: how brokerage works across models */
export function VariantBrokerProcess() {
  const steps = [
    {
      title: "Brief once",
      detail: "Power, density, compliance, metros, and timeline in a single intake.",
    },
    {
      title: "Match models",
      detail: "We map your workload to colo, hybrid, bare metal, or connectivity.",
    },
    {
      title: "Compare options",
      detail: "Side-by-side facilities and providers — no rate cards on this page.",
    },
    {
      title: "Advise & shortlist",
      detail: "Advisors return quote-ready options you can take to procurement.",
    },
  ]

  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(183,228,199,0.3),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            {copy.title}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/80">
            {copy.body}
          </p>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-[20px] bg-[#f7faf8] p-6 ring-1 ring-black/4"
            >
              <span className="font-mono text-xs tracking-wider text-sea-green">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-3 text-lg font-semibold text-evergreen">
                {step.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>

        <ul className="mt-10 flex flex-wrap gap-2">
          {services.map((s) => (
            <li
              key={s.id}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-sm font-medium text-evergreen"
            >
              <IconBubble service={s} className="size-7" />
              {s.name}
            </li>
          ))}
        </ul>

        <CtaLink className="mt-10" />
      </div>
    </section>
  )
}
