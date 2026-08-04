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

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader overlay />
      <SiteHeroShell />
      <main>
        <BackboneStats />
        <ServicesGrid />
        <GlobalNetwork />
        <Testimonials />
        <Team />
        <IntakeForm />
        <BlogSection />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  )
}
