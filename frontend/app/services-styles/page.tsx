import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteLogo } from "@/components/site-logo"
import {
  VariantBentoMosaic,
  VariantBrokerProcess,
  VariantComparisonMatrix,
  VariantDarkStage,
  VariantEditorialSplit,
  VariantNumberedLedger,
  VariantQuietRail,
  VariantSoftFieldCards,
} from "@/components/services-style-variants"

const variants = [
  {
    id: "matrix",
    title: "Comparison matrix",
    note: "Current homepage — side-by-side broker table, no pricing or form CTAs.",
    Component: VariantComparisonMatrix,
  },
  {
    id: "soft-field",
    title: "Soft field cards",
    note: "Centered manifesto, floating rounded cards with a light stagger.",
    Component: VariantSoftFieldCards,
  },
  {
    id: "editorial",
    title: "Editorial split",
    note: "Sticky copy left, stacked service rows right — Stripe docs energy.",
    Component: VariantEditorialSplit,
  },
  {
    id: "dark",
    title: "Dark stage",
    note: "Evergreen gallery strip — four equal broker capability tiles.",
    Component: VariantDarkStage,
  },
  {
    id: "bento",
    title: "Bento mosaic",
    note: "Featured lead model + compact supporting services.",
    Component: VariantBentoMosaic,
  },
  {
    id: "quiet",
    title: "Quiet rail",
    note: "Maximum air, icon + short help text — almost no chrome.",
    Component: VariantQuietRail,
  },
  {
    id: "ledger",
    title: "Numbered ledger",
    note: "Typographic index with mono numbers and soft feature chips.",
    Component: VariantNumberedLedger,
  },
  {
    id: "process",
    title: "Broker process",
    note: "How sourcing works across models — process first, services as chips.",
    Component: VariantBrokerProcess,
  },
]

export default function ServicesStylesPage() {
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
            Compare services · Stripe-polished options
          </p>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-medium text-sea-green">Sandbox</p>
          <h1 className="mt-3 max-w-2xl text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            Every deployment model — style options
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Eight broker-focused treatments of the Compare services section. No
            pricing, no per-card quote forms — just how agil.IT helps you
            evaluate colo, hybrid, bare metal, and connectivity. Pick an id and
            we&apos;ll port it live.
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
            Tell me the variant id (matrix, soft-field, editorial, dark, bento,
            quiet, ledger, process) and I&apos;ll swap it onto the homepage.
          </p>
          <Link
            href="/#services"
            className="mt-8 inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/25"
          >
            Jump to current homepage services
          </Link>
        </div>
      </section>
    </main>
  )
}
