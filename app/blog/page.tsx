import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BlogSection } from "@/components/blog-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resource Center — agil.IT",
  description:
    "Guides, pricing benchmarks, quick tips, and expert insight for teams sourcing colocation, cloud, and connectivity.",
}

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <div className="border-b border-border/60 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Home
            </Link>
          </div>
        </div>
        <BlogSection />
      </main>
      <SiteFooter />
    </div>
  )
}
