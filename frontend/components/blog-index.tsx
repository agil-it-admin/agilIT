"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { DatacenterIllustration } from "@/components/datacenter-illustration"
import {
  blogCategories,
  getArticles,
  getTips,
  type BlogPost,
} from "@/lib/blog"
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
      <span aria-hidden className="text-border">
        ·
      </span>
      <time dateTime={post.date}>{post.date}</time>
    </div>
  )
}

type BlogIndexProps = {
  articles?: BlogPost[]
  tips?: BlogPost[]
  allPosts?: BlogPost[]
}

export function BlogIndex({
  articles: articlesProp,
  tips: tipsProp,
  allPosts: allPostsProp,
}: BlogIndexProps = {}) {
  const articles = articlesProp ?? getArticles()
  const tips = tipsProp ?? getTips()
  const allPosts = allPostsProp ?? [...articles, ...tips]

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_10%,rgba(183,228,199,0.32),transparent_55%),radial-gradient(ellipse_45%_35%_at_10%_90%,rgba(216,243,220,0.35),transparent_50%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-medium text-sea-green">
            Resource Center / Blog
          </p>
          <h1 className="mt-4 max-w-3xl text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            Browse all articles
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-pine-teal/80">
            Pricing benchmarks, renewal playbooks, and procurement-ready guides
            for teams sourcing enterprise colocation.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <a
              href="#all-articles"
              className="rounded-full border border-evergreen/20 bg-evergreen px-3.5 py-1.5 text-xs font-medium text-frosted-mint transition-colors hover:bg-pine-teal"
            >
              All articles
            </a>
            {blogCategories.map((category) => (
              <a
                key={category}
                href={`#category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-xs font-medium text-pine-teal/80 transition-colors hover:border-sea-green/40 hover:text-evergreen"
              >
                {category}
              </a>
            ))}
            <a
              href="#tips"
              className="rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-xs font-medium text-pine-teal/80 transition-colors hover:border-sea-green/40 hover:text-evergreen"
            >
              Quick tips
            </a>
          </div>
        </div>
      </div>

      <div
        id="all-articles"
        className="scroll-mt-28 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-sea-green">
              {articles.length} articles
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-evergreen sm:text-3xl">
              All guides
            </h2>
          </div>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_18px_40px_-28px_rgba(8,28,21,0.35)] ring-1 ring-black/4 transition-shadow hover:shadow-[0_22px_48px_-24px_rgba(8,28,21,0.4)]"
              >
                <Cover post={post} className="aspect-16/10" />
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <Meta post={post} />
                  <h3 className="mt-3 text-pretty text-lg font-semibold tracking-tight text-evergreen transition-colors group-hover:text-sea-green">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sea-green">
                    Read article
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-y border-border/60 bg-[#f7faf8]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-medium text-sea-green">Browse by topic</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-evergreen sm:text-3xl">
            Categorized articles
          </h2>

          <div className="mt-12 space-y-12">
            {blogCategories.map((category) => {
              const posts = allPosts.filter((p) => p.category === category)
              if (posts.length === 0) return null

              return (
                <div
                  key={category}
                  id={`category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="scroll-mt-28"
                >
                  <h3 className="text-sm font-semibold tracking-wide text-evergreen">
                    {category}
                  </h3>
                  <ul className="mt-4 divide-y divide-border/80 border-y border-border/80">
                    {posts.map((post) => (
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
                              {post.kind === "tip" ? (
                                <span className="ml-2 text-xs font-medium text-sea-green">
                                  Tip
                                </span>
                              ) : null}
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

      <div
        id="tips"
        className="scroll-mt-28 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-sea-green">Quick Tips</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-evergreen sm:text-3xl">
            Short reads from the field
          </h2>
          <p className="mt-3 text-muted-foreground">
            Practical moves you can apply before the next vendor call.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tips.map((tip) => (
            <li key={tip.slug}>
              <Link
                href={`/blog/${tip.slug}`}
                className="group flex h-full flex-col rounded-[18px] bg-[#f7faf8] p-5 shadow-[0_18px_40px_-28px_rgba(8,28,21,0.35)] ring-1 ring-black/4 transition-shadow hover:shadow-[0_22px_48px_-24px_rgba(8,28,21,0.4)]"
              >
                <span className="text-[11px] font-semibold tracking-wider text-sea-green uppercase">
                  Tip · {tip.category}
                </span>
                <h3 className="mt-3 flex-1 text-pretty text-base font-semibold tracking-tight text-evergreen transition-colors group-hover:text-sea-green">
                  {tip.title}
                </h3>
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
    </section>
  )
}
