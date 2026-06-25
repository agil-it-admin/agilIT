import { services } from "@/lib/data"
import { QuoteCtaButton } from "@/components/quote-cta-button"
import {
  Server,
  Cloud,
  Network,
  Shield,
  Cpu,
  Globe,
  Check,
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

export function ServicesGrid() {
  return (
    <section id="services" className="border-t border-border py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-muted-foreground">
            Compare services
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Every deployment model, side by side
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            From dedicated cabinets to elastic cloud, see how each option maps
            to your performance, scale, and budget requirements.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Server
            return (
              <div
                key={service.id}
                className={`relative flex flex-col border bg-card p-6 ${
                  service.popular
                    ? "border-foreground"
                    : "border-border"
                }`}
              >
                {service.popular && (
                  <span className="absolute -top-3 left-6 border border-border bg-background px-3 py-1 text-xs font-medium text-foreground">
                    Most requested
                  </span>
                )}
                <span className="flex h-11 w-11 items-center justify-center border border-border text-foreground">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {service.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {service.tagline}
                </p>

                <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      Best for
                    </dt>
                    <dd className="mt-0.5 font-medium text-foreground">
                      {service.bestFor}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Deploy time</dt>
                    <dd className="font-medium text-foreground">
                      {service.deployTime}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Starting at</dt>
                    <dd className="font-semibold text-foreground">
                      {service.startingAt}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-foreground"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <QuoteCtaButton
                  variant={service.popular ? "default" : "outline"}
                  className="mt-6 w-full"
                >
                  Request a quote
                </QuoteCtaButton>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
