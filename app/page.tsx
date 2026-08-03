import { SiteHeader } from "@/components/site-header"
import { SiteHeroShell } from "@/components/site-hero-shell"
import { BackboneStats } from "@/components/backbone-stats"
import { CustomerOutcomes } from "@/components/customer-outcomes"
import { ServicesGrid } from "@/components/services-grid"
import { LocatorMap } from "@/components/locator-map"
import { IntakeForm } from "@/components/intake-form"
import { Testimonials } from "@/components/testimonials"
import { Team } from "@/components/team"
import { BlogSection } from "@/components/blog-section"
import { Faq } from "@/components/faq"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader overlay />
      <SiteHeroShell />
      <main>
        <BackboneStats />
        <LocatorMap />
        <CustomerOutcomes />
        <ServicesGrid />
        <Team />
        <IntakeForm />
        <Testimonials />
        <BlogSection />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  )
}
