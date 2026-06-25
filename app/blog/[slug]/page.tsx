import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { blogPosts, getAllBlogSlugs, getBlogPost } from "@/lib/blog"
import { ArrowLeft } from "lucide-react"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: "Article not found" }

  return {
    title: `${post.title} — agil.IT`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const morePosts = blogPosts.filter((entry) => entry.slug !== post.slug)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <article className="border-b border-border">
          <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to articles
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-foreground">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[21/9] overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>

          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="space-y-10">
              {post.sections.map((section, index) => (
                <section key={index}>
                  {section.heading && (
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                      {section.heading}
                    </h2>
                  )}
                  <div
                    className={`space-y-4 ${section.heading ? "mt-4" : ""}`}
                  >
                    {section.paragraphs.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-pretty leading-relaxed text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </article>

        <section className="border-t border-border py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-medium text-muted-foreground">
              More articles
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {morePosts.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/blog/${entry.slug}`}
                  className="group flex gap-4 rounded-xl border border-border bg-card p-4"
                >
                  <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                    <Image
                      src={entry.image}
                      alt={entry.imageAlt}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">
                      {entry.category} · {entry.readTime}
                    </p>
                    <h3 className="mt-1 text-balance font-semibold leading-snug text-foreground group-hover:underline">
                      {entry.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
