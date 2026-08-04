import { Button } from "@/components/ui/button"
import { QuoteCtaButton } from "@/components/quote-cta-button"
import {
  EntranceReveal,
  EntranceStagger,
} from "@/components/entrance-animation"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="pt-8 sm:pt-12 lg:pt-16">
      <div className="flex w-full flex-col px-4 pb-2 sm:px-6 sm:pb-3 lg:px-8 lg:pb-4">
        <div className="max-w-3xl">
          <EntranceReveal delay={0.52} y={16} duration={0.65}>
            <span className="text-sm font-medium text-pine-teal/80">
              Trusted data center & colocation marketplace
            </span>
          </EntranceReveal>

          <EntranceReveal delay={0.62} y={28} duration={0.8}>
            <h1 className="mt-5 text-pretty text-4xl font-semibold leading-[1.06] tracking-tight text-pine-teal sm:text-5xl lg:text-6xl">
              Find the right data center for your workload—without the
              guesswork.
            </h1>
          </EntranceReveal>

          <EntranceReveal delay={0.74} y={22} duration={0.75}>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-pine-teal/85 sm:text-xl">
              Compare colocation, hybrid cloud, bare metal, and connectivity
              across 200+ metros. Tell us your requirements once and our
              advisors return matched, quote-ready facilities.
            </p>
          </EntranceReveal>

          <EntranceStagger
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            baseDelay={0.86}
            stagger={0.08}
            y={16}
            duration={0.55}
          >
            {/* Wrappers keep GSAP off Button transition-all (avoids jitter) */}
            <div className="inline-flex">
              <QuoteCtaButton size="lg">
                Talk to an advisor
                <ArrowRight className="h-4 w-4" />
              </QuoteCtaButton>
            </div>
            <div className="inline-flex">
              <Button
                size="lg"
                variant="outline"
                className="border-border/80 bg-background/70 backdrop-blur-sm"
                nativeButton={false}
                render={<a href="#locations" />}
              >
                Explore the map
              </Button>
            </div>
          </EntranceStagger>
        </div>
      </div>
    </section>
  )
}
