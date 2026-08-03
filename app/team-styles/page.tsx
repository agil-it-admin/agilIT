import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteLogo } from "@/components/site-logo"
import {
  VariantBento,
  VariantCenteredAvatars,
  VariantCurrentBaseline,
  VariantDarkSpotlight,
  VariantEditorialSplit,
  VariantMagazine,
  VariantMeshTilt,
  VariantPortraitRail,
} from "@/components/team-style-variants"

const variants = [
  {
    id: "current",
    title: "Current baseline",
    note: "What’s on the homepage today — centered header, two square cards.",
    Component: VariantCurrentBaseline,
  },
  {
    id: "editorial",
    title: "Editorial split",
    note: "Stripe homepage people layout — copy left, staggered portraits right.",
    Component: VariantEditorialSplit,
  },
  {
    id: "spotlight",
    title: "Dark spotlight",
    note: "Same language as Customer outcomes — evergreen strip + hover glow.",
    Component: VariantDarkSpotlight,
  },
  {
    id: "mesh",
    title: "Mesh + tilt",
    note: "Living gradient backdrop with glare tilt cards.",
    Component: VariantMeshTilt,
  },
  {
    id: "rail",
    title: "Portrait rail",
    note: "Sessions-style horizontal strip; snaps to a 4-up grid on desktop.",
    Component: VariantPortraitRail,
  },
  {
    id: "magazine",
    title: "Magazine list",
    note: "Hairline rules, oversized names, portrait thumbnails.",
    Component: VariantMagazine,
  },
  {
    id: "bento",
    title: "Bento feature",
    note: "One featured advisor + compact supporting bios.",
    Component: VariantBento,
  },
  {
    id: "avatars",
    title: "Centered avatars",
    note: "Minimal Stripe marketing — staggered circle-ish portraits (square).",
    Component: VariantCenteredAvatars,
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
            Team section styles · Stripe-inspired
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
            Eight treatments of the homepage team section. Real bio photos stay
            for Brad & Patrick; two demo advisors use color placeholders so
            denser layouts read correctly. Pick a direction and we can port it
            live.
          </p>
          <nav
            aria-label="Variants"
            className="mt-10 flex flex-wrap gap-2"
          >
            {variants.map((v) => (
              <a
                key={v.id}
                href={`#${v.id}`}
                className="border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
              >
                {v.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:space-y-24 lg:px-8 lg:py-20">
        {variants.map(({ id, title, note, Component }) => (
          <section key={id} id={id} className="scroll-mt-24">
            <div className="mb-6 flex flex-col gap-2 border-b border-border/70 pb-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
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
            Tell me the variant id (editorial, spotlight, mesh…) and I&apos;ll
            swap it onto the homepage team section.
          </p>
          <Link
            href="/#team"
            className="mt-8 inline-flex border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/25"
          >
            Jump to current homepage team
          </Link>
        </div>
      </section>
    </main>
  )
}
