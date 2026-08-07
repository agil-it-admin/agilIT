import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DatacenterIllustration } from "@/components/datacenter-illustration"
import {
  getCmsAllBlogSlugs,
  getCmsBlogPost,
  getCmsBlogPosts,
} from "@/lib/cms/blog"
import { getCmsFooter, getCmsNavigation } from "@/lib/cms/site"
import { ArrowLeft } from "lucide-react"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getCmsAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getCmsBlogPost(slug)
  if (!post) return { title: "Article not found" }

  return {
    title: `${post.title} — Colonegotiator`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getCmsBlogPost(slug)
  if (!post) notFound()

  const [allPosts, navigation, footer] = await Promise.all([
    getCmsBlogPosts(),
    getCmsNavigation(),
    getCmsFooter(),
  ])
  const morePosts = allPosts.filter((entry) => entry.slug !== post.slug)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader navigation={navigation} />
      <main>
        <article className="border-b border-border">
          <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Resource Center
            </Link>

            <p className="mt-8 text-sm font-medium text-sea-green">
              {post.category}
            </p>
            <h1 className="mt-3 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span>{post.readTime}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{post.date}</time>
            </div>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-pine-teal/80">
              {post.excerpt}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[22px] ring-1 ring-black/5">
              <DatacenterIllustration
                variant={post.imageVariant}
                className="aspect-16/9 w-full"
                title={post.imageAlt}
              />
            </div>
          </div>

          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="space-y-10">
              {post.sections.map((section, index) => (
                <section key={`${post.slug}-${index}`}>
                  {section.heading ? (
                    <h2 className="text-2xl font-semibold tracking-tight text-evergreen">
                      {section.heading}
                    </h2>
                  ) : null}
                  <div
                    className={
                      section.heading ? "mt-4 space-y-4" : "space-y-4"
                    }
                  >
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 48)}
                        className="text-pretty leading-relaxed text-pine-teal/85"
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

        {morePosts.length > 0 ? (
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold tracking-tight text-evergreen">
              More from the Resource Center
            </h2>
            <ul className="mt-6 space-y-4">
              {morePosts.slice(0, 4).map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={`/blog/${entry.slug}`}
                    className="group block rounded-[16px] border border-border/70 bg-background px-5 py-4 transition-colors hover:border-sea-green/40"
                  >
                    <p className="text-xs font-medium text-sea-green">
                      {entry.category}
                    </p>
                    <p className="mt-1 font-semibold text-evergreen transition-colors group-hover:text-sea-green">
                      {entry.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </main>
      <SiteFooter footer={footer} />
    </div>
  )
}
