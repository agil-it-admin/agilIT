"use client"

import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { DatacenterIllustration } from "@/components/datacenter-illustration"
import { blogPosts } from "@/lib/blog"
import { cn } from "@/lib/utils"

const copy = {
  eyebrow: "Blog",
  title: "Guides from the data center floor",
  body: "Strategy, fundamentals, and infrastructure trends for teams sourcing colocation, cloud, and connectivity.",
}

function Eyebrow({ className }: { className?: string }) {
  return (
    <p className={cn("text-sm font-medium text-sea-green", className)}>
      {copy.eyebrow}
    </p>
  )
}

function BrowseLink({ className }: { className?: string }) {
  return (
    <Link
      href={`/blog/${blogPosts[0].slug}`}
      className={cn(
        "group/cta inline-flex items-center gap-2 text-sm font-semibold text-sea-green transition-colors hover:text-dark-emerald",
        className,
      )}
    >
      Browse articles
      <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
    </Link>
  )
}

function Cover({
  post,
  className,
}: {
  post: (typeof blogPosts)[number]
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
  post: (typeof blogPosts)[number]
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

/** 1 — Stripe editorial: featured lead + stacked companions */
export function VariantStripeEditorial() {
  const [lead, ...rest] = blogPosts

  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_10%,rgba(183,228,199,0.32),transparent_55%),radial-gradient(ellipse_45%_35%_at_10%_90%,rgba(216,243,220,0.4),transparent_50%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow />
            <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              {copy.title}
            </h3>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-pine-teal/80">
              {copy.body}
            </p>
          </div>
          <BrowseLink />
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <article className="group lg:col-span-7">
            <Link href={`/blog/${lead.slug}`} className="block">
              <Cover
                post={lead}
                className="aspect-16/10 rounded-[20px] shadow-[0_28px_64px_-32px_rgba(8,28,21,0.45)] ring-1 ring-black/4"
              />
            </Link>
            <div className="mt-6 max-w-xl">
              <Meta post={lead} />
              <h4 className="mt-3 text-pretty text-2xl font-semibold tracking-tight text-evergreen sm:text-3xl">
                <Link
                  href={`/blog/${lead.slug}`}
                  className="transition-colors hover:text-sea-green"
                >
                  {lead.title}
                </Link>
              </h4>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                {lead.excerpt}
              </p>
            </div>
          </article>

          <div className="flex flex-col gap-6 lg:col-span-5 lg:gap-0 lg:divide-y lg:divide-border/80">
            {rest.map((post) => (
              <article
                key={post.slug}
                className="group grid grid-cols-[112px_1fr] gap-4 lg:py-6 first:lg:pt-0 last:lg:pb-0 sm:grid-cols-[140px_1fr] sm:gap-5"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block overflow-hidden rounded-[14px] ring-1 ring-black/4"
                >
                  <Cover post={post} className="aspect-square" />
                </Link>
                <div className="flex min-w-0 flex-col justify-center">
                  <Meta post={post} />
                  <h4 className="mt-2 text-pretty text-base font-semibold tracking-tight text-evergreen sm:text-lg">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-sea-green"
                    >
                      {post.title}
                    </Link>
                  </h4>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** 2 — Soft field: centered header, rounded floating cards */
export function VariantSoftField() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-frosted-mint/45 via-background to-background"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-20 h-[380px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(116,198,157,0.22),transparent_70%)] blur-2xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            {copy.title}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/75">
            {copy.body}
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {blogPosts.map((post, i) => (
            <article
              key={post.slug}
              className={cn(
                "group overflow-hidden rounded-[22px] bg-white/75 shadow-[0_22px_50px_-28px_rgba(8,28,21,0.4)] ring-1 ring-black/4 backdrop-blur-sm",
                i === 1 && "lg:translate-y-6",
              )}
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <Cover post={post} className="aspect-16/10" />
              </Link>
              <div className="p-6">
                <Meta post={post} />
                <h4 className="mt-3 text-pretty text-lg font-semibold tracking-tight text-evergreen">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-sea-green"
                  >
                    {post.title}
                  </Link>
                </h4>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sea-green transition-colors hover:text-dark-emerald"
                >
                  Read article
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <BrowseLink />
        </div>
      </div>
    </section>
  )
}

/** 3 — Quiet magazine: hairline rows, portrait thumbs */
export function VariantQuietMagazine() {
  return (
    <section className="border-y border-border/60 bg-[#f7faf8]">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <Eyebrow />
            <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-[2.75rem] sm:leading-[1.1]">
              {copy.title}
            </h3>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/75">
              {copy.body}
            </p>
          </div>
          <BrowseLink />
        </div>

        <ul className="mt-14 divide-y divide-evergreen/10 border-y border-evergreen/10">
          {blogPosts.map((post) => (
            <li
              key={post.slug}
              className="group grid items-center gap-5 py-8 sm:grid-cols-[120px_1fr_auto] sm:gap-8"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block overflow-hidden rounded-[14px] ring-1 ring-black/5"
              >
                <Cover post={post} className="aspect-4/3" />
              </Link>
              <div>
                <Meta post={post} />
                <h4 className="mt-2 text-pretty text-xl font-semibold tracking-tight text-evergreen transition-colors group-hover:text-sea-green sm:text-2xl">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h4>
                <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {post.excerpt}
                </p>
              </div>
              <ArrowUpRight className="hidden size-5 text-sea-green transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** 4 — Dark stage */
export function VariantDarkStage() {
  return (
    <section className="relative overflow-hidden bg-evergreen text-frosted-mint">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_70%_0%,rgba(82,183,136,0.28),transparent_55%),radial-gradient(ellipse_40%_35%_at_10%_100%,rgba(64,145,108,0.18),transparent_50%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-mint-leaf">{copy.eyebrow}</p>
            <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
              {copy.title}
            </h3>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-celadon/90">
              {copy.body}
            </p>
          </div>
          <Link
            href={`/blog/${blogPosts[0].slug}`}
            className="group/cta inline-flex items-center gap-2 text-sm font-semibold text-mint-leaf transition-colors hover:text-frosted-mint"
          >
            Browse articles
            <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[20px] bg-white/10 sm:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col bg-evergreen p-1 transition-colors hover:bg-pine-teal"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <Cover
                  post={post}
                  className="aspect-16/10 rounded-[14px] opacity-95"
                />
              </Link>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center gap-2 text-xs font-medium text-celadon/80">
                  <span className="text-mint-leaf">{post.category}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h4 className="mt-3 text-pretty text-lg font-semibold tracking-tight">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h4>
                <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-celadon/85">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** 5 — Bento mosaic: asymmetric Stripe homepage energy */
export function VariantBentoMosaic() {
  const [lead, second, third] = blogPosts

  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_30%_0%,rgba(183,228,199,0.28),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            {copy.title}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/80">
            {copy.body}
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-12 lg:grid-rows-2 lg:gap-5">
          <article className="group overflow-hidden rounded-[22px] bg-[#f7faf8] ring-1 ring-black/4 lg:col-span-7 lg:row-span-2">
            <Link href={`/blog/${lead.slug}`} className="block">
              <Cover post={lead} className="aspect-16/10 lg:aspect-auto lg:h-[280px]" />
            </Link>
            <div className="p-6 sm:p-8">
              <Meta post={lead} />
              <h4 className="mt-3 text-pretty text-2xl font-semibold tracking-tight text-evergreen sm:text-3xl">
                <Link
                  href={`/blog/${lead.slug}`}
                  className="transition-colors hover:text-sea-green"
                >
                  {lead.title}
                </Link>
              </h4>
              <p className="mt-3 max-w-lg text-pretty leading-relaxed text-muted-foreground">
                {lead.excerpt}
              </p>
              <BrowseLink className="mt-6" />
            </div>
          </article>

          {[second, third].map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-[20px] bg-[#f7faf8] ring-1 ring-black/4 lg:col-span-5"
            >
              <div className="grid flex-1 sm:grid-cols-[140px_1fr] lg:grid-cols-[120px_1fr]">
                <Link href={`/blog/${post.slug}`} className="block">
                  <Cover post={post} className="aspect-square h-full min-h-[120px]" />
                </Link>
                <div className="flex flex-col justify-center p-5">
                  <Meta post={post} />
                  <h4 className="mt-2 text-pretty text-base font-semibold tracking-tight text-evergreen sm:text-lg">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-sea-green"
                    >
                      {post.title}
                    </Link>
                  </h4>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** 6 — Horizon rail: Sessions-style strip */
export function VariantHorizonRail() {
  return (
    <section className="overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Eyebrow />
            <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
              {copy.title}
            </h3>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:text-right">
            {copy.body}
          </p>
        </div>

        <div className="mt-12 -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {blogPosts.map((post, i) => (
            <article
              key={post.slug}
              className={cn(
                "group w-[78vw] shrink-0 sm:w-[46vw] lg:w-auto",
                i === 1 && "lg:mt-8",
                i === 2 && "lg:mt-4",
              )}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block overflow-hidden rounded-[20px] shadow-[0_24px_56px_-30px_rgba(8,28,21,0.4)] ring-1 ring-black/4"
              >
                <Cover post={post} className="aspect-4/5" />
              </Link>
              <div className="mt-5">
                <Meta post={post} />
                <h4 className="mt-2 text-pretty text-lg font-semibold tracking-tight text-evergreen">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-sea-green"
                  >
                    {post.title}
                  </Link>
                </h4>
              </div>
            </article>
          ))}
        </div>

        <BrowseLink className="mt-10" />
      </div>
    </section>
  )
}

/** 7 — Numbered ledger */
export function VariantNumberedLedger() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl border-b border-border/80 pb-10">
          <Eyebrow />
          <h3 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            {copy.title}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-pine-teal/80">
            {copy.body}
          </p>
        </div>

        <ul>
          {blogPosts.map((post, i) => (
            <li
              key={post.slug}
              className="group border-b border-border/80 last:border-b-0"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="grid grid-cols-[3rem_1fr_auto] items-start gap-4 py-8 sm:grid-cols-[4.5rem_1fr_auto] sm:gap-8 sm:py-10"
              >
                <span className="font-mono text-sm tracking-wider text-sea-green/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <Meta post={post} />
                  <h4 className="mt-2 text-pretty text-xl font-semibold tracking-tight text-evergreen transition-colors group-hover:text-sea-green sm:text-2xl lg:text-[1.65rem]">
                    {post.title}
                  </h4>
                  <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {post.excerpt}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 size-5 shrink-0 text-sea-green transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** 8 — Current baseline */
export function VariantCurrentBaseline() {
  return (
    <section className="border border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-medium text-muted-foreground">
              {copy.eyebrow}
            </span>
            <h3 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {copy.title}
            </h3>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {copy.body}
            </p>
          </div>
          <Link
            href={`/blog/${blogPosts[0].slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
          >
            Browse articles
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden border border-border bg-card"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative block aspect-16/10 overflow-hidden border-b border-border bg-muted"
              >
                <DatacenterIllustration
                  variant={post.imageVariant}
                  className="h-full w-full"
                  title={post.imageAlt}
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className="border border-border px-2.5 py-0.5 text-foreground">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h4 className="mt-4 text-balance text-lg font-semibold leading-snug text-foreground">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h4>
                <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
