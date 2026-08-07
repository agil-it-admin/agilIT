import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteLogo } from "@/components/site-logo"
import {
  VariantCurrentBaseline,
  VariantDarkStage,
  VariantFloatingPanel,
  VariantNumberedLedger,
  VariantQuietList,
  VariantSoftField,
  VariantStripeEditorial,
  VariantTwoUpCards,
} from "@/components/faq-style-variants"

const variants = [
  {
    id: "editorial",
    title: "Stripe editorial",
    note: "Title left, hairline accordion right — classic Stripe docs/marketing FAQ.",
    Component: VariantStripeEditorial,
  },
  {
    id: "soft-field",
    title: "Soft field",
    note: "Centered manifesto over a mint wash, pill +/- cards with soft depth.",
    Component: VariantSoftField,
  },
  {
    id: "quiet",
    title: "Quiet list",
    note: "Maximum air, oversized questions, almost no chrome.",
    Component: VariantQuietList,
  },
  {
    id: "dark",
    title: "Dark stage",
    note: "Evergreen split layout — Stripe developer-section energy.",
    Component: VariantDarkStage,
  },
  {
    id: "two-up",
    title: "Two-up cards",
    note: "All answers visible in a soft grid — lean-back browsing, no click required.",
    Component: VariantTwoUpCards,
  },
  {
    id: "ledger",
    title: "Numbered ledger",
    note: "Typographic index with mono numbers and generous expand.",
    Component: VariantNumberedLedger,
  },
  {
    id: "panel",
    title: "Floating panel",
    note: "Single inset stack floating on a soft field — product-page FAQ.",
    Component: VariantFloatingPanel,
  },
  {
    id: "current",
    title: "Current baseline",
    note: "What’s on the homepage today — centered header, boxed accordion.",
    Component: VariantCurrentBaseline,
  },
]

export default function FaqStylesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              Back
            </Link>
            <SiteLogo />
          </div>
          <p className="hidden text-sm text-muted-foreground md:block">
            FAQ section · Stripe-polished options
          </p>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-medium text-sea-green">Sandbox</p>
          <h1 className="mt-3 max-w-2xl text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            Questions, answered — style options
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Seven polished treatments of the FAQ section, plus the current
            baseline. Stripe cues: split layouts, hairline rules, soft
            atmosphere, and smooth expand. Pick an id and we&apos;ll port it
            live.
          </p>
          <nav aria-label="Variants" className="mt-10 flex flex-wrap gap-2">
            {variants.map((v) => (
              <a
                key={v.id}
                href={`#${v.id}`}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
              >
                {v.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="space-y-20 py-12 lg:space-y-28 lg:py-20">
        {variants.map(({ id, title, note, Component }) => (
          <section key={id} id={id} className="scroll-mt-24">
            <div className="mx-auto mb-6 flex max-w-7xl flex-col gap-2 px-4 pb-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-8">
              <div>
                <p className="font-mono text-[11px] tracking-wider text-sea-green uppercase">
                  {id}
                </p>
                <h2 className="mt-1 text-lg font-semibold tracking-tight text-evergreen">
                  {title}
                </h2>
              </div>
              <p className="max-w-md text-sm text-muted-foreground sm:text-right">
                {note}
              </p>
            </div>
            <Component />
          </section>
        ))}
      </div>

      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-evergreen sm:text-3xl">
            Prefer one of these?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tell me the variant id (editorial, soft-field, quiet, dark, two-up,
            ledger, panel) and I&apos;ll swap it onto the homepage.
          </p>
          <Link
            href="/#faq"
            className="mt-8 inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/25"
          >
            Jump to current homepage FAQ
          </Link>
        </div>
      </section>
    </main>
  )
}
