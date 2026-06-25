import Image from "next/image"
import Link from "next/link"
import { blogPosts } from "@/lib/blog"
import { ArrowUpRight } from "lucide-react"

export function BlogSection() {
  return (
    <section id="blog" className="border-t border-border py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-medium text-muted-foreground">
              Blog
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Guides from the data center floor
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Strategy, fundamentals, and infrastructure trends for teams
              sourcing colocation, cloud, and connectivity.
            </p>
          </div>
          <Link
            href="/blog/colocation-vs-hybrid-cloud"
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
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative aspect-[16/10] overflow-hidden border-b border-border bg-muted"
              >
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-foreground">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-4 text-balance text-lg font-semibold leading-snug text-foreground">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <span className="text-xs font-medium text-muted-foreground">
                    {post.date}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:underline"
                  >
                    Read article
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
