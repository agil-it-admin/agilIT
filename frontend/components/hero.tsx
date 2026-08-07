import { QuoteCtaButton } from "@/components/quote-cta-button"
import {
  EntranceReveal,
  EntranceStagger,
} from "@/components/entrance-animation"
import { ArrowRight } from "lucide-react"
import { defaultHomePage, type CmsHero } from "@/lib/cms/site"

export function Hero({ content = defaultHomePage.hero }: { content?: CmsHero }) {
  return (
    <section className="pt-8 sm:pt-12 lg:pt-16">
      <div className="flex w-full flex-col px-4 pb-2 sm:px-6 sm:pb-3 lg:px-8 lg:pb-4">
        <div className="max-w-3xl">
          <EntranceReveal delay={0.52} y={16} duration={0.65}>
            <span className="text-sm font-medium text-pine-teal/80">
              {content.eyebrow}
            </span>
          </EntranceReveal>

          <EntranceReveal delay={0.62} y={28} duration={0.8}>
            <h1 className="mt-5 text-pretty text-4xl font-semibold leading-[1.06] tracking-tight text-pine-teal sm:text-5xl lg:text-6xl">
              {content.headline}
            </h1>
          </EntranceReveal>

          <EntranceReveal delay={0.74} y={22} duration={0.75}>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-pine-teal/85 sm:text-xl">
              {content.body}
            </p>
          </EntranceReveal>

          <EntranceStagger
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            baseDelay={0.86}
            stagger={0.08}
            y={16}
            duration={0.55}
          >
            {/* Wrapper keeps GSAP off Button transition-all (avoids jitter) */}
            <div className="inline-flex">
              <QuoteCtaButton size="lg">
                {content.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </QuoteCtaButton>
            </div>
          </EntranceStagger>
        </div>
      </div>
    </section>
  )
}
