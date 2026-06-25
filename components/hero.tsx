import { Button } from "@/components/ui/button"
import { QuoteCtaButton } from "@/components/quote-cta-button"
import { stats } from "@/lib/data"
import { Check, ArrowRight } from "lucide-react"

const proofPoints = [
  "No cost, no obligation",
  "1-business-day response",
  "Vendor-neutral advice",
]

export function Hero() {
  return (
    <section className="flex flex-1 flex-col justify-center">
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-16">
        <div>
          <span className="text-sm font-medium text-muted-foreground">
            Trusted data center & colocation marketplace
          </span>
          <h1 className="mt-4 text-pretty text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Find the right data center for your workload—without the guesswork.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Compare colocation, hybrid cloud, bare metal, and connectivity
            across 200+ metros. Tell us your requirements once and our advisors
            return matched, quote-ready facilities.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {proofPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Check className="h-4 w-4 text-foreground" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border/80 bg-background/70 p-6 backdrop-blur-sm sm:p-8">
          <p className="text-sm font-medium text-muted-foreground">
            By the numbers
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8">
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
          </dl>
        </div>
      </div>
    </section>
  )
}
