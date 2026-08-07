"use client"

import { useQuoteModal } from "@/components/quote-modal-provider"
import DotField from "@/components/dot-field"
import { defaultHomePage, type CmsServices } from "@/lib/cms/site"
import { cn } from "@/lib/utils"
import {
  Server,
  Cloud,
  Network,
  Shield,
  Cpu,
  Globe,
  ArrowRight,
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

export function ServicesGrid({
  content = defaultHomePage.services,
}: {
  content?: CmsServices
}) {
  const { openQuoteModal } = useQuoteModal()
  const services = content.items

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-frosted-mint/25"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <DotField
          className="h-full w-full"
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(8, 28, 21, 0.28)"
          gradientTo="rgba(45, 106, 79, 0.22)"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/40 via-transparent to-background/70"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-sea-green">{content.eyebrow}</p>
            <h2 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              {content.headline}
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/80">
              {content.body}
            </p>
          </div>
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="group/cta inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-sea-green transition-colors hover:text-dark-emerald"
          >
            {content.ctaLabel}
            <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
          </button>
        </div>

        {/* Desktop comparison table */}
        <div className="mt-14 hidden overflow-hidden rounded-[22px] bg-background/80 shadow-[0_28px_64px_-36px_rgba(8,28,21,0.35)] ring-1 ring-black/4 backdrop-blur-sm lg:block">
          <div className="grid grid-cols-[1.15fr_repeat(4,1fr)] border-b border-border/70 bg-[#f7faf8]/80">
            <div className="px-6 py-5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              What we source on
            </div>
            {services.map((service) => {
              const Icon = iconMap[service.icon] ?? Server
              return (
                <div
                  key={service.id}
                  className="border-l border-border/70 px-5 py-5"
                >
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-frosted-mint text-dark-emerald">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-evergreen">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">
                    {service.tagline}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-[1.15fr_repeat(4,1fr)] border-b border-border/70">
            <div className="px-6 py-5 text-sm font-medium text-pine-teal/80">
              Best for
            </div>
            {services.map((service) => (
              <div
                key={`${service.id}-best`}
                className="border-l border-border/70 px-5 py-5 text-sm font-medium text-evergreen"
              >
                {service.bestFor}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[1.15fr_repeat(4,1fr)] border-b border-border/70 bg-[#f7faf8]/40">
            <div className="px-6 py-5 text-sm font-medium text-pine-teal/80">
              How we help
            </div>
            {services.map((service) => (
              <div
                key={`${service.id}-help`}
                className="border-l border-border/70 px-5 py-5 text-sm leading-relaxed text-evergreen"
              >
                {service.weHelpWith}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[1.15fr_repeat(4,1fr)] border-b border-border/70">
            <div className="px-6 py-5 text-sm font-medium text-pine-teal/80">
              Typical timeline
            </div>
            {services.map((service) => (
              <div
                key={`${service.id}-time`}
                className="border-l border-border/70 px-5 py-5 text-sm font-medium text-evergreen"
              >
                {service.deployTime}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[1.15fr_repeat(4,1fr)]">
            <div className="px-6 py-5 text-sm font-medium text-pine-teal/80">
              What we compare
            </div>
            {services.map((service) => (
              <ul
                key={`${service.id}-features`}
                className="space-y-2.5 border-l border-border/70 px-5 py-5"
              >
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm leading-snug text-evergreen"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1 shrink-0 rounded-full bg-sea-green"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Mobile / tablet stacked cards — still no pricing or form CTAs */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Server
            return (
              <li
                key={service.id}
                className={cn(
                  "rounded-[20px] bg-background/80 p-6 shadow-[0_18px_40px_-28px_rgba(8,28,21,0.35)] ring-1 ring-black/4 backdrop-blur-sm",
                  i % 2 === 1 && "sm:translate-y-4",
                )}
              >
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-frosted-mint text-dark-emerald">
                  <Icon className="size-4" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-evergreen">
                  {service.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {service.tagline}
                </p>

                <dl className="mt-5 space-y-3 border-t border-border/70 pt-5 text-sm">
                  <div>
                    <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Best for
                    </dt>
                    <dd className="mt-1 font-medium text-evergreen">
                      {service.bestFor}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      How we help
                    </dt>
                    <dd className="mt-1 text-evergreen">{service.weHelpWith}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Typical timeline
                    </dt>
                    <dd className="mt-1 font-medium text-evergreen">
                      {service.deployTime}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-5 space-y-2 border-t border-border/70 pt-5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-evergreen"
                    >
                      <span
                        aria-hidden
                        className="mt-2 size-1 shrink-0 rounded-full bg-sea-green"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
