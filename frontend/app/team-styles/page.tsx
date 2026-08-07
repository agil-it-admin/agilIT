import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteLogo } from "@/components/site-logo"
import {
  VariantCurrentBaseline,
  VariantDarkGallery,
  VariantMeshAtmosphere,
  VariantNameLedger,
  VariantOverlapCollage,
  VariantQuietColumns,
  VariantSoftField,
  VariantStripeEditorial,
} from "@/components/team-style-variants"

const variants = [
  {
    id: "editorial",
    title: "Stripe editorial",
    note: "Copy left, staggered tall portraits right — soft radial wash, no card chrome.",
    Component: VariantStripeEditorial,
  },
  {
    id: "soft-field",
    title: "Soft field duo",
    note: "Centered manifesto with slightly tilted floating portraits and depth.",
    Component: VariantSoftField,
  },
  {
    id: "overlap",
    title: "Overlap collage",
    note: "Photographic composition — lead portrait overlapping a support image.",
    Component: VariantOverlapCollage,
  },
  {
    id: "quiet",
    title: "Quiet columns",
    note: "Maximum air, equal tall portraits, mint wash — calm Stripe marketing.",
    Component: VariantQuietColumns,
  },
  {
    id: "mesh",
    title: "Mesh atmosphere",
    note: "Living gradient field with glass-edged portraits and caption fade.",
    Component: VariantMeshAtmosphere,
  },
  {
    id: "dark",
    title: "Dark gallery",
    note: "Evergreen stage, luminous portraits — Stripe’s developer-section energy.",
    Component: VariantDarkGallery,
  },
  {
    id: "ledger",
    title: "Name ledger",
    note: "Oversized names with portrait thumbs — typographic Stripe About feel.",
    Component: VariantNameLedger,
  },
  {
    id: "current",
    title: "Current baseline",
    note: "What’s on the homepage today — centered header, two square cards.",
    Component: VariantCurrentBaseline,
  },
]

export default function TeamStylesPage() {
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
            Team section · Stripe-polished options
          </p>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-medium text-sea-green">Sandbox</p>
          <h1 className="mt-3 max-w-2xl text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            Advisors who know the market — style options
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Seven polished treatments of the two-advisor section, plus the
            current baseline. Stripe cues: generous type, soft atmosphere,
            staggered photography, and almost no card chrome. Pick an id and
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
            Tell me the variant id (editorial, soft-field, overlap, quiet,
            mesh, dark, ledger) and I&apos;ll swap it onto the homepage.
          </p>
          <Link
            href="/#team"
            className="mt-8 inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/25"
          >
            Jump to current homepage team
          </Link>
        </div>
      </section>
    </main>
  )
}
