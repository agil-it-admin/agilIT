import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BlogIndex } from "@/components/blog-index"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resource Center — Colonegotiator",
  description:
    "Browse enterprise colocation pricing trends, renewal playbooks, and sourcing guides for mid-to-large organizations.",
}

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <div className="border-b border-border/60 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/#blog"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Home
            </Link>
          </div>
        </div>
        <BlogIndex />
      </main>
      <SiteFooter />
    </div>
  )
}
