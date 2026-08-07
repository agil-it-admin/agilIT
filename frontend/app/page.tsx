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
} from "@/lib/cms/site"

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

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader overlay navigation={navigation} />
      <SiteHeroShell hero={home.hero} />
      <main>
        <BackboneStats content={home.stats} />
        <ServicesGrid content={home.services} />
        <GlobalNetwork content={home.globalNetwork} />
        <Testimonials content={home.testimonials} />
        <Team content={home.team} />
        <IntakeForm content={home.intake} />
        <BlogSection
          featured={featured}
          articles={articles.filter((p) => p.slug !== featured.slug)}
          tips={tips}
          content={home.blogSection}
        />
        <Faq content={home.faq} />
      </main>
      <SiteFooter footer={footer} />
    </div>
  )
}
