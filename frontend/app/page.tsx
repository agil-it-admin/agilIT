import { SiteHeader } from "@/components/site-header"
import { SiteHeroShell } from "@/components/site-hero-shell"
import { BackboneStats } from "@/components/backbone-stats"
import { ServicesGrid } from "@/components/services-grid"
import { GlobalNetwork } from "@/components/global-network"
import { Testimonials } from "@/components/testimonials"
import { Team } from "@/components/team"
import { IntakeForm } from "@/components/intake-form"
import { BlogSection } from "@/components/blog-section"
import { Faq } from "@/components/faq"
import { SiteFooter } from "@/components/site-footer"
import {
  getCmsArticles,
  getCmsFeaturedPost,
  getCmsTips,
} from "@/lib/cms/blog"
import {
  getCmsFooter,
  getCmsHomePage,
  getCmsNavigation,
  type CmsHomePage,
  type HomeSectionType,
} from "@/lib/cms/site"
import type { BlogPost } from "@/lib/blog"
import type { ReactNode } from "react"

function renderHomeSection(
  type: HomeSectionType,
  home: CmsHomePage,
  blog: {
    featured: BlogPost
    articles: BlogPost[]
    tips: BlogPost[]
  },
): ReactNode {
  switch (type) {
    case "stats":
      return <BackboneStats key={type} content={home.stats} />
    case "services":
      return <ServicesGrid key={type} content={home.services} />
    case "globalNetwork":
      return <GlobalNetwork key={type} content={home.globalNetwork} />
    case "testimonials":
      return <Testimonials key={type} content={home.testimonials} />
    case "team":
      return <Team key={type} content={home.team} />
    case "intake":
      return <IntakeForm key={type} content={home.intake} />
    case "blogSection":
      return (
        <BlogSection
          key={type}
          featured={blog.featured}
          articles={blog.articles}
          tips={blog.tips}
          content={home.blogSection}
        />
      )
    case "faq":
      return <Faq key={type} content={home.faq} />
    default:
      return null
  }
}

export default async function Page() {
  const [navigation, footer, home, featured, articles, tips] =
    await Promise.all([
      getCmsNavigation(),
      getCmsFooter(),
      getCmsHomePage(),
      getCmsFeaturedPost(),
      getCmsArticles(),
      getCmsTips(),
    ])

  const blog = {
    featured,
    articles: articles.filter((p) => p.slug !== featured.slug),
    tips,
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader overlay navigation={navigation} />
      <SiteHeroShell hero={home.hero} />
      <main>
        {home.sections
          .filter((section) => section.enabled)
          .map((section) => renderHomeSection(section.type, home, blog))}
      </main>
      <SiteFooter footer={footer} />
    </div>
  )
}
