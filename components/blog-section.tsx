import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { DatacenterIllustration } from "@/components/datacenter-illustration"
import { blogPosts } from "@/lib/blog"
import { cn } from "@/lib/utils"

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

export function BlogSection() {
  const [lead, ...rest] = blogPosts

  return (
    <section id="blog" className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_10%,rgba(183,228,199,0.32),transparent_55%),radial-gradient(ellipse_45%_35%_at_10%_90%,rgba(216,243,220,0.4),transparent_50%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-sea-green">Blog</p>
            <h2 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              Guides from the data center floor
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-pine-teal/80">
              Strategy, fundamentals, and infrastructure trends for teams
              sourcing colocation, cloud, and connectivity.
            </p>
          </div>
          <Link
            href={`/blog/${lead.slug}`}
            className="group/cta inline-flex items-center gap-2 text-sm font-semibold text-sea-green transition-colors hover:text-dark-emerald"
          >
            Browse articles
            <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
          </Link>
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
              <h3 className="mt-3 text-pretty text-2xl font-semibold tracking-tight text-evergreen sm:text-3xl">
                <Link
                  href={`/blog/${lead.slug}`}
                  className="transition-colors hover:text-sea-green"
                >
                  {lead.title}
                </Link>
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                {lead.excerpt}
              </p>
            </div>
          </article>

          <div className="flex flex-col gap-6 lg:col-span-5 lg:gap-0 lg:divide-y lg:divide-border/80">
            {rest.map((post) => (
              <article
                key={post.slug}
                className="group grid grid-cols-[112px_1fr] gap-4 sm:grid-cols-[140px_1fr] sm:gap-5 lg:py-6 first:lg:pt-0 last:lg:pb-0"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block overflow-hidden rounded-[14px] ring-1 ring-black/4"
                >
                  <Cover post={post} className="aspect-square" />
                </Link>
                <div className="flex min-w-0 flex-col justify-center">
                  <Meta post={post} />
                  <h3 className="mt-2 text-pretty text-base font-semibold tracking-tight text-evergreen sm:text-lg">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-sea-green"
                    >
                      {post.title}
                    </Link>
                  </h3>
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
