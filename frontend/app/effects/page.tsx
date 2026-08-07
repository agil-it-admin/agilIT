"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { AnimatedCounter } from "@/components/effects/animated-counter"
import { CaseStrip } from "@/components/effects/case-strip"
import { FloatingPanels } from "@/components/effects/floating-panels"
import { MeshGradient } from "@/components/effects/mesh-gradient"
import { ProductShowcase } from "@/components/effects/product-showcase"
import { Button } from "@/components/ui/button"
import { SiteLogo } from "@/components/site-logo"
import { EntranceReveal } from "@/components/entrance-animation"

const CobeArcsGlobe = dynamic(
  () =>
    import("@/components/globe-examples/cobe-arcs").then((m) => m.CobeArcsGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-square max-h-[480px] w-full items-center justify-center bg-muted text-sm text-muted-foreground">
        Loading globe…
      </div>
    ),
  },
)

const backboneStats = [
  { value: "1,400+", label: "Facilities in network" },
  { value: "200+", label: "Global metros covered" },
  { value: "99.99%", label: "Uptime SLAs sourced" },
  { value: "48hr", label: "Average quote turnaround" },
]

export default function EffectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="relative z-20 border-b border-border/60 bg-background/70 backdrop-blur-md">
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
          <p className="hidden text-sm text-muted-foreground sm:block">
            Interactive effects · inspired by{" "}
            <a
              href="https://stripe.com/"
              target="_blank"
              rel="noreferrer"
              className="text-sea-green underline-offset-2 hover:underline"
            >
              Stripe
            </a>
          </p>
        </div>
      </header>

      {/* Hero — mesh gradient + floating UI */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <MeshGradient />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <EntranceReveal y={16} duration={0.65}>
              <p className="text-sm font-medium text-pine-teal/80">
                Data center infrastructure to grow your footprint.
              </p>
            </EntranceReveal>
            <EntranceReveal delay={0.08} y={28} duration={0.8}>
              <h1 className="mt-4 max-w-xl text-pretty text-4xl font-semibold leading-[1.05] tracking-tight text-evergreen sm:text-5xl lg:text-6xl">
                Financial-grade motion.{" "}
                <em className="font-semibold not-italic text-sea-green">
                  Built for colo.
                </em>
              </h1>
            </EntranceReveal>
            <EntranceReveal delay={0.16} y={22} duration={0.75}>
              <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-pine-teal/80">
                A playground of the interaction patterns that make{" "}
                <a
                  href="https://stripe.com/"
                  className="underline underline-offset-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  stripe.com
                </a>{" "}
                feel alive — mesh gradients, tilt cards, tabbed demos, counters,
                and a live globe — tuned to agil.IT greens.
              </p>
            </EntranceReveal>
            <EntranceReveal delay={0.24} y={18} duration={0.7}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" nativeButton={false} render={<a href="#solutions" />}>
                  Explore effects
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  nativeButton={false}
                  render={<Link href="/globe-examples" />}
                >
                  Globe gallery
                </Button>
              </div>
            </EntranceReveal>
          </div>

          <EntranceReveal delay={0.3} x={24} y={0} duration={0.9}>
            <FloatingPanels />
          </EntranceReveal>
        </div>
      </section>

      {/* Backbone stats */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-center text-sm font-medium text-sea-green">
            The backbone of hybrid infrastructure
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {backboneStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product tabs */}
      <section
        id="solutions"
        className="scroll-mt-8 border-b border-border bg-muted/30"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <ProductShowcase />
        </div>
      </section>

      {/* Globe */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <p className="text-sm font-medium text-sea-green">Global network</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-evergreen sm:text-4xl">
              See capacity across metros — then drill into a facility.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Stripe leans on globe metaphors for scale. Here we wire the
              lightweight cobe arcs demo to your real facility coordinates.
            </p>
            <Button
              className="mt-8"
              variant="outline"
              nativeButton={false}
              render={<Link href="/globe-examples" />}
            >
              Compare globe libraries
              <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="overflow-hidden border border-border bg-muted/40">
            <CobeArcsGlobe />
          </div>
        </div>
      </section>

      {/* Case strip with spotlight */}
      <CaseStrip />

      {/* Integration / CTA */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(183,228,199,0.45),transparent_55%)]"
        />
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:py-32">
          <h2 className="text-3xl font-semibold tracking-tight text-evergreen sm:text-4xl">
            Ready to ship motion like this on the real homepage?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            This route is a sandbox. Port the mesh, tilt cards, and tabbed demos
            into production sections when you&apos;re happy with the feel.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" nativeButton={false} render={<Link href="/" />}>
              Back to homepage
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/globe-examples" />}
            >
              Globe examples
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
