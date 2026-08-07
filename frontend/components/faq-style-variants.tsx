"use client"

import { useState, type ReactNode } from "react"
import { ChevronDown, Minus, Plus } from "lucide-react"
import { faqs } from "@/lib/data"
import { cn } from "@/lib/utils"

const copy = {
  eyebrow: "FAQ",
  title: "Questions, answered",
  body: "Straight answers on how sourcing works, what it costs, and how fast we move.",
}

function useAccordion(defaultOpen: number | null = 0) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i))
  return { open, toggle }
}

function SectionShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      {children}
    </section>
  )
}

function Eyebrow({ className }: { className?: string }) {
  return (
    <p className={cn("text-sm font-medium text-sea-green", className)}>
      {copy.eyebrow}
    </p>
  )
}

/** Shared animated answer panel */
function Answer({
  open,
  children,
  className,
}: {
  open: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows] duration-300 ease-out",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div className="overflow-hidden">
        <div className={cn("pb-5", className)}>{children}</div>
      </div>
    </div>
  )
}

/** 1 — Stripe editorial: title left, hairline accordion right */
export function VariantStripeEditorial() {
  const { open, toggle } = useAccordion(0)

  return (
    <SectionShell className="bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_10%,rgba(183,228,199,0.3),transparent_55%),radial-gradient(ellipse_50%_40%_at_90%_90%,rgba(216,243,220,0.4),transparent_50%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:px-8 lg:py-28">
        <div className="max-w-md lg:pt-2">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            {copy.title}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/80">
            {copy.body}
          </p>
        </div>

        <div className="divide-y divide-border/80 border-y border-border/80">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left sm:py-6"
                >
                  <span className="text-base font-semibold tracking-tight text-evergreen sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "mt-1 size-5 shrink-0 text-sea-green transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <Answer open={isOpen}>
                  <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </Answer>
              </div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}

/** 2 — Soft field: centered header, pill icon accordion */
export function VariantSoftField() {
  const { open, toggle } = useAccordion(0)

  return (
    <SectionShell>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-frosted-mint/45 via-background to-background"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-16 h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(116,198,157,0.22),transparent_70%)] blur-2xl"
      />
      <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="text-center">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            {copy.title}
          </h3>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-lg leading-relaxed text-pine-teal/75">
            {copy.body}
          </p>
        </div>

        <div className="mt-14 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.question}
                className={cn(
                  "overflow-hidden rounded-[18px] border border-transparent bg-white/70 shadow-[0_18px_40px_-28px_rgba(8,28,21,0.35)] ring-1 ring-black/4 backdrop-blur-sm transition-shadow",
                  isOpen && "shadow-[0_24px_50px_-24px_rgba(8,28,21,0.4)]",
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className="text-base font-semibold tracking-tight text-evergreen">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors",
                      isOpen
                        ? "bg-sea-green text-white"
                        : "bg-frosted-mint text-dark-emerald",
                    )}
                  >
                    {isOpen ? (
                      <Minus className="size-4" />
                    ) : (
                      <Plus className="size-4" />
                    )}
                  </span>
                </button>
                <Answer open={isOpen} className="px-5 sm:px-6">
                  <p className="text-pretty leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </Answer>
              </div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}

/** 3 — Quiet list: maximum air, no chrome */
export function VariantQuietList() {
  const { open, toggle } = useAccordion(0)

  return (
    <SectionShell className="border-y border-border/60 bg-[#f7faf8]">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="max-w-xl">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-[2.75rem] sm:leading-[1.1]">
            {copy.title}
          </h3>
        </div>

        <div className="mt-14">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.question}
                className="border-b border-evergreen/10 first:border-t"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
                >
                  <span className="text-lg font-semibold tracking-tight text-evergreen transition-colors group-hover:text-sea-green sm:text-xl">
                    {item.question}
                  </span>
                  <span className="text-2xl font-light leading-none text-sea-green/80">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <Answer open={isOpen}>
                  <p className="max-w-2xl pb-2 text-pretty text-base leading-relaxed text-pine-teal/75 sm:text-lg">
                    {item.answer}
                  </p>
                </Answer>
              </div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}

/** 4 — Dark stage: evergreen FAQ */
export function VariantDarkStage() {
  const { open, toggle } = useAccordion(0)

  return (
    <SectionShell className="bg-evergreen text-frosted-mint">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_20%_0%,rgba(82,183,136,0.25),transparent_55%),radial-gradient(ellipse_40%_35%_at_90%_100%,rgba(64,145,108,0.18),transparent_50%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-28">
        <div>
          <p className="text-sm font-medium text-mint-leaf">{copy.eyebrow}</p>
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
            {copy.title}
          </h3>
          <p className="mt-5 max-w-sm text-pretty text-lg leading-relaxed text-celadon/90">
            {copy.body}
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left sm:py-6"
                >
                  <span className="text-base font-semibold tracking-tight sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "mt-1 size-5 shrink-0 text-mint-leaf transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <Answer open={isOpen}>
                  <p className="max-w-xl text-pretty leading-relaxed text-celadon/90">
                    {item.answer}
                  </p>
                </Answer>
              </div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}

/** 5 — Two-up open cards: answers visible in a soft grid */
export function VariantTwoUpCards() {
  return (
    <SectionShell className="bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(183,228,199,0.28),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            {copy.title}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/75">
            {copy.body}
          </p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {faqs.map((item) => (
            <li
              key={item.question}
              className="rounded-[20px] bg-[#f7faf8] p-6 ring-1 ring-black/4 sm:p-7"
            >
              <h4 className="text-base font-semibold tracking-tight text-evergreen sm:text-lg">
                {item.question}
              </h4>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {item.answer}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}

/** 6 — Numbered ledger: typographic Stripe About feel */
export function VariantNumberedLedger() {
  const { open, toggle } = useAccordion(0)

  return (
    <SectionShell className="bg-background">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-xl border-b border-border/80 pb-10">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            {copy.title}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/80">
            {copy.body}
          </p>
        </div>

        <div>
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.question}
                className="border-b border-border/80 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="group grid w-full grid-cols-[3rem_1fr_auto] items-start gap-4 py-7 text-left sm:grid-cols-[4.5rem_1fr_auto] sm:gap-8 sm:py-8"
                >
                  <span className="font-mono text-sm tracking-wider text-sea-green/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-semibold tracking-tight text-evergreen transition-colors group-hover:text-sea-green sm:text-xl">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300",
                      isOpen && "rotate-180 text-sea-green",
                    )}
                  />
                </button>
                <Answer open={isOpen} className="sm:pl-[4.5rem]">
                  <p className="max-w-2xl pl-12 text-pretty leading-relaxed text-muted-foreground sm:pl-0">
                    {item.answer}
                  </p>
                </Answer>
              </div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}

/** 7 — Floating panel: single inset glass stack */
export function VariantFloatingPanel() {
  const { open, toggle } = useAccordion(0)

  return (
    <SectionShell className="bg-[#f3f8f5]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(116,198,157,0.2),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="text-center">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            {copy.title}
          </h3>
        </div>

        <div className="mt-12 overflow-hidden rounded-[24px] bg-background shadow-[0_32px_80px_-36px_rgba(8,28,21,0.45)] ring-1 ring-black/5">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.question}
                className="border-b border-border/70 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8 sm:py-6"
                >
                  <span className="text-base font-semibold tracking-tight text-evergreen sm:text-lg">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "inline-flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors",
                      isOpen
                        ? "border-sea-green bg-sea-green text-white"
                        : "border-border text-evergreen",
                    )}
                  >
                    {isOpen ? (
                      <Minus className="size-3.5" />
                    ) : (
                      <Plus className="size-3.5" />
                    )}
                  </span>
                </button>
                <Answer open={isOpen} className="px-6 sm:px-8">
                  <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </Answer>
              </div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}

/** 8 — Current baseline */
export function VariantCurrentBaseline() {
  const { open, toggle } = useAccordion(0)

  return (
    <SectionShell className="border border-border bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="text-center">
          <span className="text-sm font-medium text-muted-foreground">
            {copy.eyebrow}
          </span>
          <h3 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {copy.title}
          </h3>
        </div>

        <div className="mt-12 divide-y divide-border overflow-hidden border border-border bg-card">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-foreground">
                    {item.question}
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-border text-foreground">
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6">
                    <p className="text-pretty leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}
