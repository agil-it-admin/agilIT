import { fetchPayloadAPI } from "@/lib/cms/payload"
import {
  blogPosts as staticPosts,
  type BlogCategory,
  type BlogImageVariant,
  type BlogPost,
} from "@/lib/blog"

type CmsSection = {
  heading?: string | null
  paragraphs?: { text?: string | null }[] | null
}

type CmsArticle = {
  id?: string
  title?: string
  slug?: string
  excerpt?: string
  category?: BlogCategory
  kind?: "article" | "tip"
  featured?: boolean | null
  readTime?: string
  publishedAt?: string
  imageVariant?: BlogImageVariant
  imageAlt?: string
  sections?: CmsSection[] | null
}

function formatDate(value?: string): string {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function mapCmsArticle(doc: CmsArticle): BlogPost | null {
  if (!doc?.slug || !doc.title || !doc.category || !doc.kind) return null

  const sections =
    doc.sections
      ?.map((section) => ({
        heading: section.heading || undefined,
        paragraphs: (section.paragraphs || [])
          .map((p) => p.text?.trim())
          .filter((text): text is string => Boolean(text)),
      }))
      .filter((section) => section.paragraphs.length > 0) || []

  if (sections.length === 0) return null

  return {
    slug: doc.slug,
    title: doc.title,
    category: doc.category,
    excerpt: doc.excerpt || "",
    readTime: doc.readTime || "5 min read",
    date: formatDate(doc.publishedAt),
    kind: doc.kind,
    featured: Boolean(doc.featured),
    imageVariant: doc.imageVariant || "server-room",
    imageAlt: doc.imageAlt || "Data center illustration",
    sections,
  }
}

async function fetchAllCmsArticles(): Promise<BlogPost[] | null> {
  const result = await fetchPayloadAPI(
    "/articles",
    {
      depth: 1,
      limit: 100,
      sort: "-publishedAt",
    },
    { throwOnHttpError: false, revalidate: 60 },
  )

  if (!result.ok || !result.data || typeof result.data !== "object") {
    return null
  }

  const docs = (result.data as { docs?: CmsArticle[] }).docs
  if (!Array.isArray(docs) || docs.length === 0) return null

  const mapped = docs
    .map(mapCmsArticle)
    .filter((post): post is BlogPost => Boolean(post))

  return mapped.length > 0 ? mapped : null
}

/** Prefer Payload CMS; fall back to static `lib/blog.ts` when CMS is offline/empty. */
export async function getCmsBlogPosts(): Promise<BlogPost[]> {
  try {
    const fromCms = await fetchAllCmsArticles()
    if (fromCms) return fromCms
  } catch {
    // fall through
  }
  return staticPosts
}

export async function getCmsBlogPost(
  slug: string,
): Promise<BlogPost | undefined> {
  const result = await fetchPayloadAPI(
    "/articles",
    {
      "where[slug][equals]": slug,
      depth: 1,
      limit: 1,
    },
    { throwOnHttpError: false, revalidate: 60 },
  )

  if (result.ok && result.data && typeof result.data === "object") {
    const docs = (result.data as { docs?: CmsArticle[] }).docs
    const mapped = docs?.[0] ? mapCmsArticle(docs[0]) : null
    if (mapped) return mapped
  }

  const posts = await getCmsBlogPosts()
  return posts.find((post) => post.slug === slug)
}

export async function getCmsAllBlogSlugs(): Promise<string[]> {
  const posts = await getCmsBlogPosts()
  return posts.map((post) => post.slug)
}

export async function getCmsFeaturedPost(): Promise<BlogPost> {
  const posts = await getCmsBlogPosts()
  return posts.find((post) => post.featured) ?? posts[0]
}

export async function getCmsArticles(): Promise<BlogPost[]> {
  const posts = await getCmsBlogPosts()
  return posts.filter((post) => post.kind === "article")
}

export async function getCmsTips(): Promise<BlogPost[]> {
  const posts = await getCmsBlogPosts()
  return posts.filter((post) => post.kind === "tip")
}

export async function getCmsPostsByCategory(
  category: BlogCategory,
): Promise<BlogPost[]> {
  const posts = await getCmsBlogPosts()
  return posts.filter(
    (post) => post.category === category && post.kind === "article",
  )
}
