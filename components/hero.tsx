import { Button } from "@/components/ui/button"
import { QuoteCtaButton } from "@/components/quote-cta-button"
import { DatacenterIllustration } from "@/components/datacenter-illustration"
import {
  EntranceReveal,
  EntranceStagger,
} from "@/components/entrance-animation"
import { stats } from "@/lib/data"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="flex flex-1 flex-col justify-center">
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-16">
        <div>
          <EntranceReveal delay={0.52} y={16} duration={0.65}>
            <span className="text-sm font-medium text-muted-foreground">
              Trusted data center & colocation marketplace
            </span>
          </EntranceReveal>
          <EntranceReveal delay={0.62} y={28} duration={0.8}>
            <h1 className="mt-4 text-pretty text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Find the right data center for your workload—without the
              guesswork.
            </h1>
          </EntranceReveal>
          <EntranceReveal delay={0.74} y={22} duration={0.75}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Compare colocation, hybrid cloud, bare metal, and connectivity
              across 200+ metros. Tell us your requirements once and our
              advisors return matched, quote-ready facilities.
            </p>
          </EntranceReveal>

          <EntranceStagger
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            baseDelay={0.86}
            stagger={0.08}
            y={20}
          >
            <QuoteCtaButton size="lg">
              Get matched facilities
              <ArrowRight className="h-4 w-4" />
            </QuoteCtaButton>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<a href="#locations" />}
            >
              Explore the map
            </Button>
          </EntranceStagger>
        </div>

        <div className="flex flex-col gap-4">
          <EntranceReveal delay={0.95} x={36} y={0} duration={0.85}>
            <div className="overflow-hidden border border-border/80 bg-background/70 shadow-sm">
              <DatacenterIllustration
                variant="exterior"
                className="aspect-[16/9] w-full"
                title="Modern data center facility with rooftop cooling units"
              />
              <p className="border-t border-border/80 bg-background/80 px-4 py-2.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
                Carrier-neutral facilities across 200+ U.S. metros
              </p>
            </div>
          </EntranceReveal>

          <EntranceReveal delay={1.05} y={24} duration={0.8}>
            <div className="border border-border/80 bg-background/70 p-6 backdrop-blur-sm sm:p-8">
              <p className="text-sm font-medium text-muted-foreground">
                By the numbers
              </p>
              <EntranceStagger
                as="dl"
                className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8"
                baseDelay={1.15}
                stagger={0.06}
                y={16}
                duration={0.6}
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        {stat.value}
                      </span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </EntranceStagger>
            </div>
          </EntranceReveal>
        </div>
      </div>
    </section>
  )
}
