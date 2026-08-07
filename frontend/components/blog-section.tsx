"use client"

import Link from "next/link"
import { ArrowRight, Download, Quote } from "lucide-react"
import { DatacenterIllustration } from "@/components/datacenter-illustration"
import { QuoteCtaButton } from "@/components/quote-cta-button"
import {
  blogCategories,
  getArticles,
  getFeaturedPost,
  getTips,
  type BlogPost,
} from "@/lib/blog"
import { defaultHomePage, type CmsBlogSection } from "@/lib/cms/site"
import { cn } from "@/lib/utils"

function Cover({
  post,
  className,
}: {
  post: BlogPost
  className?: string
}) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <DatacenterIllustration
        variant={post.imageVariant}
        className="h-full w-full transition duration-700 ease-out group-hover:scale-[1.03]"
        title={post.imageAlt}
      />
    </div>
  )
}

function Meta({
  post,
  className,
}: {
  post: BlogPost
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground",
        className,
      )}
    >
      <span className="text-sea-green">{post.category}</span>
      <span aria-hidden className="text-border">
        ·
      </span>
      <span>{post.readTime}</span>
    </div>
  )
}

type BlogSectionProps = {
  featured?: BlogPost
  articles?: BlogPost[]
  tips?: BlogPost[]
  content?: CmsBlogSection
}

export function BlogSection({
  featured: featuredProp,
  articles: articlesProp,
  tips: tipsProp,
  content = defaultHomePage.blogSection,
}: BlogSectionProps = {}) {
  const featured = featuredProp ?? getFeaturedPost()
  const articles =
    articlesProp ?? getArticles().filter((p) => p.slug !== featured.slug)
  const tips = tipsProp ?? getTips()
  const featuredReport = content.featuredReport
  const expertInsights = content.expertInsights

  return (
    <section id="blog" className="relative overflow-hidden bg-background">
      {/* Header */}
      <div className="relative border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_10%,rgba(183,228,199,0.32),transparent_55%),radial-gradient(ellipse_45%_35%_at_10%_90%,rgba(216,243,220,0.35),transparent_50%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-sea-green">
                {content.eyebrow}
              </p>
              <h2 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                {content.headline}
              </h2>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/80">
                {content.body}
              </p>
            </div>
            <Link
              href="/blog"
              className="group/cta inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-sea-green transition-colors hover:text-dark-emerald"
            >
              {content.browseAllLabel}
              <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {blogCategories.map((category) => (
              <Link
                key={category}
                href={`/blog#category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-xs font-medium text-pine-teal/80 transition-colors hover:border-sea-green/40 hover:text-evergreen"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Hero featured article */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <Link
            href={`/blog/${featured.slug}`}
            className="block overflow-hidden rounded-[22px] shadow-[0_28px_64px_-32px_rgba(8,28,21,0.45)] ring-1 ring-black/4 lg:col-span-7"
          >
            <Cover post={featured} className="aspect-16/10" />
          </Link>
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wider text-sea-green uppercase">
              Featured
            </p>
            <Meta post={featured} className="mt-3" />
            <h3 className="mt-3 text-pretty text-3xl font-semibold tracking-tight text-evergreen sm:text-4xl">
              <Link
                href={`/blog/${featured.slug}`}
                className="transition-colors hover:text-sea-green"
              >
                {featured.title}
              </Link>
            </h3>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {featured.excerpt}
            </p>
            <Link
              href={`/blog/${featured.slug}`}
              className="group/cta mt-7 inline-flex items-center gap-2 text-sm font-semibold text-sea-green transition-colors hover:text-dark-emerald"
            >
              Read the article
              <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
            </Link>
          </div>
        </article>
      </div>

      {/* Categorized articles */}
      <div className="border-y border-border/60 bg-[#f7faf8]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-sea-green">Browse by topic</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-evergreen sm:text-3xl">
                Categorized articles
              </h3>
            </div>
            <p className="max-w-md text-sm text-muted-foreground sm:text-right">
              Pricing, negotiation, site selection, AI density, cost, and
              procurement — organized for sourcing teams.
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {blogCategories.map((category) => {
              const posts = articles.filter((p) => p.category === category)
              const featuredInCategory =
                featured.category === category ? featured : null
              const list = featuredInCategory
                ? [featuredInCategory, ...posts]
                : posts
              if (list.length === 0) return null

              return (
                <div
                  key={category}
                  id={`category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="scroll-mt-28"
                >
                  <h4 className="text-sm font-semibold tracking-wide text-evergreen">
                    {category}
                  </h4>
                  <ul className="mt-4 divide-y divide-border/80 border-y border-border/80">
                    {list.map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group grid grid-cols-[72px_1fr] items-center gap-4 py-5 sm:grid-cols-[96px_1fr_auto] sm:gap-6"
                        >
                          <div className="overflow-hidden rounded-[12px] ring-1 ring-black/5">
                            <Cover post={post} className="aspect-square" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-pretty font-semibold tracking-tight text-evergreen transition-colors group-hover:text-sea-green">
                              {post.title}
                            </p>
                            <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                              {post.excerpt}
                            </p>
                          </div>
                          <span className="col-start-2 shrink-0 text-xs text-muted-foreground sm:col-start-auto">
                            {post.readTime}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Featured downloadable report */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="relative overflow-hidden rounded-[24px] bg-evergreen px-6 py-10 text-frosted-mint sm:px-10 sm:py-12 lg:px-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_20%,rgba(82,183,136,0.35),transparent_55%)]"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-medium text-mint-leaf">
                {featuredReport.eyebrow}
              </p>
              <h3 className="mt-3 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
                {featuredReport.title}
              </h3>
              <p className="mt-4 max-w-xl text-pretty leading-relaxed text-celadon/90">
                {featuredReport.description}
              </p>
              <ul className="mt-6 space-y-2">
                {featuredReport.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-frosted-mint/90"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-mint-leaf" />
                    {item}
                  </li>
                ))}
              </ul>
              <QuoteCtaButton
                size="lg"
                intent="report"
                className="mt-8 bg-frosted-mint text-evergreen hover:bg-white"
              >
                <Download className="size-4" />
                {featuredReport.ctaLabel}
              </QuoteCtaButton>
            </div>
            <div className="rounded-[20px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
              <p className="text-xs font-semibold tracking-wider text-mint-leaf uppercase">
                Includes
              </p>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-sm text-celadon">Length</dt>
                  <dd className="font-semibold">{featuredReport.pages}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-sm text-celadon">Format</dt>
                  <dd className="font-semibold">{featuredReport.format}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-celadon">Audience</dt>
                  <dd className="text-right font-semibold">
                    {featuredReport.audience}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="border-y border-border/60 bg-[#f7faf8]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-sea-green">Quick Tips</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-evergreen sm:text-3xl">
              Short reads for frequent publishing
            </h3>
            <p className="mt-3 text-muted-foreground">
              300–500 word field notes — practical moves you can apply before
              the next vendor call.
            </p>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tips.map((tip) => (
              <li key={tip.slug}>
                <Link
                  href={`/blog/${tip.slug}`}
                  className="group flex h-full flex-col rounded-[18px] bg-background p-5 shadow-[0_18px_40px_-28px_rgba(8,28,21,0.35)] ring-1 ring-black/4 transition-shadow hover:shadow-[0_22px_48px_-24px_rgba(8,28,21,0.4)]"
                >
                  <span className="text-[11px] font-semibold tracking-wider text-sea-green uppercase">
                    Tip · {tip.category}
                  </span>
                  <h4 className="mt-3 flex-1 text-pretty text-base font-semibold tracking-tight text-evergreen transition-colors group-hover:text-sea-green">
                    {tip.title}
                  </h4>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {tip.excerpt}
                  </p>
                  <span className="mt-4 text-xs text-muted-foreground">
                    {tip.readTime}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Expert Insight pull-quotes */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-sea-green">
            {content.expertEyebrow}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-evergreen sm:text-3xl">
            {content.expertHeadline}
          </h3>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {expertInsights.map((insight) => (
            <li
              key={insight.name}
              className="relative rounded-[22px] bg-[#f7faf8] p-7 ring-1 ring-black/4 sm:p-9"
            >
              <Quote className="size-8 text-sea-green/40" aria-hidden />
              <blockquote className="mt-5 text-pretty text-lg font-medium leading-relaxed tracking-tight text-evergreen sm:text-xl">
                “{insight.quote}”
              </blockquote>
              <footer className="mt-6 flex items-baseline justify-between gap-4 border-t border-border/70 pt-5">
                <div>
                  <p className="font-semibold text-evergreen">{insight.name}</p>
                  <p className="text-sm text-muted-foreground">{insight.role}</p>
                </div>
                <p className="text-xs font-medium text-sea-green">
                  {insight.focus}
                </p>
              </footer>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom CTA — free contract review */}
      <div className="border-t border-border/60 bg-[radial-gradient(ellipse_70%_80%_at_50%_0%,rgba(183,228,199,0.35),transparent_60%)]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-24">
          <p className="text-sm font-medium text-sea-green">
            {content.bottomCta.eyebrow}
          </p>
          <h3 className="mt-3 text-pretty text-3xl font-semibold tracking-tight text-evergreen sm:text-4xl">
            {content.bottomCta.headline}
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-pine-teal/80">
            {content.bottomCta.body}
          </p>
          <QuoteCtaButton size="lg" intent="contract-review" className="mt-8">
            {content.bottomCta.ctaLabel}
            <ArrowRight className="size-4" />
          </QuoteCtaButton>
        </div>
      </div>
    </section>
  )
}
