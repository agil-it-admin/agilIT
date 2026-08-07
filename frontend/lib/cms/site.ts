import { fetchPayloadAPI } from "@/lib/cms/payload"
import {
  faqs as staticFaqs,
  services as staticServices,
  stats as staticStats,
  team as staticTeam,
  testimonials as staticTestimonials,
  type Faq,
  type Service,
  type TeamMember,
  type Testimonial,
} from "@/lib/data"
import {
  expertInsights as staticExpertInsights,
  featuredReport as staticFeaturedReport,
} from "@/lib/blog"

export type NavLink = { label: string; href: string }

export type CmsNavigation = {
  links: NavLink[]
  primaryCtaLabel: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
}

export type CmsFooterColumn = {
  title: string
  links: NavLink[]
}

export type CmsFooter = {
  tagline: string
  columns: CmsFooterColumn[]
  copyrightTemplate: string
  legalLinks: NavLink[]
}

export type CmsHero = {
  eyebrow: string
  headline: string
  body: string
  ctaLabel: string
}

export type CmsStats = {
  eyebrow: string
  items: { value: string; label: string }[]
}

export type CmsServices = {
  eyebrow: string
  headline: string
  body: string
  ctaLabel: string
  items: Service[]
}

export type CmsGlobalNetwork = {
  eyebrow: string
  headline: string
  body: string
  ctaLabel: string
}

export type CmsTestimonials = {
  eyebrow: string
  headline: string
  body: string
  items: Testimonial[]
}

export type CmsTeam = {
  eyebrow: string
  headline: string
  body: string
  ctaLabel: string
  members: TeamMember[]
}

export type CmsIntake = {
  eyebrow: string
  headline: string
  body: string
  benefits: string[]
  steps: string[]
  needOptions: string[]
  regionOptions: string[]
  footprintOptions: string[]
  timelineOptions: string[]
}

export type CmsExpertInsight = {
  quote: string
  name: string
  role: string
  focus: string
}

export type CmsFeaturedReport = {
  eyebrow: string
  title: string
  description: string
  pages: string
  format: string
  audience: string
  ctaLabel: string
  highlights: string[]
}

export type CmsBlogSection = {
  eyebrow: string
  headline: string
  body: string
  browseAllLabel: string
  expertEyebrow: string
  expertHeadline: string
  expertInsights: CmsExpertInsight[]
  bottomCta: {
    eyebrow: string
    headline: string
    body: string
    ctaLabel: string
  }
  featuredReport: CmsFeaturedReport
}

export type CmsFaq = {
  eyebrow: string
  headline: string
  body: string
  items: Faq[]
}

export type CmsHomePage = {
  hero: CmsHero
  stats: CmsStats
  services: CmsServices
  globalNetwork: CmsGlobalNetwork
  testimonials: CmsTestimonials
  team: CmsTeam
  intake: CmsIntake
  blogSection: CmsBlogSection
  faq: CmsFaq
}

function unwrapTexts(
  items?: { text?: string | null }[] | string[] | null,
): string[] {
  if (!items?.length) return []
  return items
    .map((item) => (typeof item === "string" ? item : item?.text?.trim()))
    .filter((text): text is string => Boolean(text))
}

export const defaultNavigation: CmsNavigation = {
  links: [
    { label: "Sourcing", href: "#services" },
    { label: "Locations", href: "#locations" },
    { label: "Why Us", href: "#testimonials" },
    { label: "Team", href: "#team" },
    { label: "Resources", href: "/blog" },
    { label: "FAQ", href: "#faq" },
  ],
  primaryCtaLabel: "Start sourcing",
  secondaryCtaLabel: "Learn more",
  secondaryCtaHref: "/#overview",
}

export const defaultFooter: CmsFooter = {
  tagline:
    "Vendor-neutral enterprise colocation sourcing for mid-to-large organizations—cabinets through ~1 MW, typically on 3–5 year terms.",
  columns: [
    {
      title: "Sourcing",
      links: [
        { label: "Enterprise colo", href: "/#intake" },
        { label: "Renewals", href: "/#intake" },
        { label: "Contract review", href: "/#blog" },
        { label: "Benchmarks", href: "/blog" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/#team" },
        { label: "Provider network", href: "/#locations" },
        { label: "Careers", href: "/#team" },
        { label: "Contact", href: "/#intake" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Resource Center", href: "/blog" },
        { label: "Pricing trends", href: "/blog#category-pricing" },
        { label: "Term guides", href: "/blog#category-contract-negotiation" },
        { label: "Compliance", href: "/blog#category-procurement" },
      ],
    },
  ],
  copyrightTemplate: "© {year} agil.IT. All rights reserved.",
  legalLinks: [
    { label: "Privacy", href: "#top" },
    { label: "Terms", href: "#top" },
    { label: "Cookies", href: "#top" },
  ],
}

export const defaultHomePage: CmsHomePage = {
  hero: {
    eyebrow: "Enterprise colocation sourcing",
    headline: "The sourcing partner for enterprise colocation.",
    body: "Mid-to-large enterprises trust us to source cabinets through ~1 MW deals—typically on 3–5 year terms. We bring market leverage, negotiated pricing, and a shortlist you can take to procurement.",
    ctaLabel: "Start sourcing",
  },
  stats: {
    eyebrow: "Built for enterprise colocation sourcing",
    items: staticStats,
  },
  services: {
    eyebrow: "Sourcing levers",
    headline: "The trends and levers that win colo deals",
    body: "Footprint, commercials, site selection, and power density—side by side—so mid-to-large enterprises can source colocation with confidence through ~1 MW.",
    ctaLabel: "Start sourcing",
    items: staticServices,
  },
  globalNetwork: {
    eyebrow: "Provider network",
    headline: "Capacity across the metros that matter for enterprise colo.",
    body: "We source from a vetted facility network so your shortlist reflects real power, compliance, and commercial options—not brochure capacity.",
    ctaLabel: "Start sourcing",
  },
  testimonials: {
    eyebrow: "Why enterprises choose us",
    headline: "Colocation decisions, backed by sourcing credibility.",
    body: "Hear from infrastructure leaders who used Colonegotiator to source enterprise colo—on terms, power, and timelines that held up in procurement.",
    items: staticTestimonials,
  },
  team: {
    eyebrow: "Our team",
    headline: "The people who source enterprise colo",
    body: "We are the team enterprises call when they need someone who sources colocation for a living—cabinets through ~1 MW, typically on 3–5 year terms, with leverage you can take to the board.",
    ctaLabel: "Start sourcing",
    members: staticTeam,
  },
  intake: {
    eyebrow: "Start sourcing",
    headline: "Tell us the deal. We'll source the colo.",
    body: "Answer four quick questions and a dedicated sourcer returns two to four matched facilities within one business day—sized for enterprise colo through ~1 MW. Always free, always vendor-neutral.",
    benefits: [
      "Enterprise colo focus—not a general IT marketplace",
      "Commercial leverage on 3–5 year terms",
      "Shortlists procurement can stand behind",
    ],
    steps: ["Need", "Footprint", "Timeline", "Contact"],
    needOptions: [
      "New colo deployment",
      "Renewal / renegotiation",
      "Expansion in place",
      "Multi-metro / DR",
    ],
    regionOptions: [
      "West",
      "Southwest",
      "Midwest",
      "Southeast",
      "Northeast",
      "No preference",
    ],
    footprintOptions: [
      "1–5 racks",
      "Half cage / 6–20 racks",
      "Private suite / up to ~500 kW",
      "Up to ~1 MW",
    ],
    timelineOptions: [
      "Immediately",
      "1–3 months",
      "3–6 months",
      "Planning a 3–5 year term",
    ],
  },
  blogSection: {
    eyebrow: "Resource Center / Blog",
    headline: "Trends and levers for enterprise colo",
    body: "Pricing benchmarks, renewal playbooks, and procurement-ready guides for teams sourcing enterprise colocation—so you walk into the next deal with leverage.",
    browseAllLabel: "Browse all articles",
    expertEyebrow: "Expert Insight",
    expertHeadline: "From the sourcing team",
    expertInsights: staticExpertInsights,
    bottomCta: {
      eyebrow: "Next step",
      headline: "Request a free contract review",
      body: "Share your current MSA or renewal notice. Our advisors flag uplift risk, escalator exposure, and where a market check could reset leverage — at no cost.",
      ctaLabel: "Request a free contract review",
    },
    featuredReport: {
      eyebrow: "Featured report",
      title: staticFeaturedReport.title,
      description: staticFeaturedReport.description,
      pages: staticFeaturedReport.pages,
      format: staticFeaturedReport.format,
      audience: "Procurement & finance",
      ctaLabel: "Request the report",
      highlights: staticFeaturedReport.highlights,
    },
  },
  faq: {
    eyebrow: "FAQ",
    headline: "Enterprise colo sourcing, clarified",
    body: "Straight answers on deal size, cost, renewals, and how fast we move.",
    items: staticFaqs,
  },
}

function mapLinks(
  links?: { label?: string | null; href?: string | null }[] | null,
): NavLink[] {
  if (!links?.length) return []
  return links
    .filter((l): l is { label: string; href: string } =>
      Boolean(l?.label && l?.href),
    )
    .map((l) => ({ label: l.label, href: l.href }))
}

function mapNavigation(data: Record<string, unknown> | null): CmsNavigation | null {
  if (!data) return null
  const links = mapLinks(data.links as Parameters<typeof mapLinks>[0])
  if (links.length === 0) return null
  return {
    links,
    primaryCtaLabel:
      (data.primaryCtaLabel as string) || defaultNavigation.primaryCtaLabel,
    secondaryCtaLabel:
      (data.secondaryCtaLabel as string) || defaultNavigation.secondaryCtaLabel,
    secondaryCtaHref:
      (data.secondaryCtaHref as string) || defaultNavigation.secondaryCtaHref,
  }
}

function mapFooter(data: Record<string, unknown> | null): CmsFooter | null {
  if (!data) return null
  const columnsRaw = data.columns as
    | {
        title?: string
        links?: { label?: string; href?: string }[]
      }[]
    | null
  const columns =
    columnsRaw
      ?.map((col) => ({
        title: col.title || "",
        links: mapLinks(col.links),
      }))
      .filter((col) => col.title && col.links.length > 0) || []

  const tagline = (data.tagline as string) || ""
  if (!tagline || columns.length === 0) return null

  return {
    tagline,
    columns,
    copyrightTemplate:
      (data.copyrightTemplate as string) || defaultFooter.copyrightTemplate,
    legalLinks: mapLinks(data.legalLinks as Parameters<typeof mapLinks>[0]),
  }
}

function mapHomePage(data: Record<string, unknown> | null): CmsHomePage | null {
  if (!data) return null
  const hero = data.hero as CmsHero | undefined
  const stats = data.stats as {
    eyebrow?: string
    items?: { value?: string; label?: string }[]
  } | null
  const services = data.services as {
    eyebrow?: string
    headline?: string
    body?: string
    ctaLabel?: string
    items?: {
      key?: string
      name?: string
      tagline?: string
      icon?: Service["icon"]
      bestFor?: string
      weHelpWith?: string
      deployTime?: string
      features?: { text?: string }[]
    }[]
  } | null
  const globalNetwork = data.globalNetwork as CmsGlobalNetwork | undefined
  const testimonials = data.testimonials as {
    eyebrow?: string
    headline?: string
    body?: string
    items?: Testimonial[]
  } | null
  const team = data.team as {
    eyebrow?: string
    headline?: string
    body?: string
    ctaLabel?: string
    members?: {
      key?: string
      name?: string
      role?: string
      imagePath?: string
    }[]
  } | null
  const intake = data.intake as Record<string, unknown> | null
  const blogSection = data.blogSection as Record<string, unknown> | null
  const faq = data.faq as {
    eyebrow?: string
    headline?: string
    body?: string
    items?: Faq[]
  } | null

  if (!hero?.headline || !stats?.items?.length || !services?.items?.length) {
    return null
  }

  const serviceItems: Service[] = services.items
    .filter((s) => s.key && s.name && s.icon)
    .map((s) => ({
      id: s.key!,
      name: s.name!,
      tagline: s.tagline || "",
      icon: s.icon!,
      bestFor: s.bestFor || "",
      weHelpWith: s.weHelpWith || "",
      deployTime: s.deployTime || "",
      features: unwrapTexts(s.features),
    }))

  if (serviceItems.length === 0) return null

  const teamMembers: TeamMember[] =
    team?.members
      ?.filter((m) => m.key && m.name && m.imagePath)
      .map((m) => ({
        id: m.key!,
        name: m.name!,
        role: m.role || "",
        image: m.imagePath!,
      })) || defaultHomePage.team.members

  const featuredReportRaw = blogSection?.featuredReport as
    | Record<string, unknown>
    | undefined
  const bottomCtaRaw = blogSection?.bottomCta as
    | CmsBlogSection["bottomCta"]
    | undefined

  return {
    hero: {
      eyebrow: hero.eyebrow || defaultHomePage.hero.eyebrow,
      headline: hero.headline,
      body: hero.body || defaultHomePage.hero.body,
      ctaLabel: hero.ctaLabel || defaultHomePage.hero.ctaLabel,
    },
    stats: {
      eyebrow: stats.eyebrow || defaultHomePage.stats.eyebrow,
      items: (stats.items || [])
        .filter((i): i is { value: string; label: string } =>
          Boolean(i.value && i.label),
        )
        .map((i) => ({ value: i.value, label: i.label })),
    },
    services: {
      eyebrow: services.eyebrow || defaultHomePage.services.eyebrow,
      headline: services.headline || defaultHomePage.services.headline,
      body: services.body || defaultHomePage.services.body,
      ctaLabel: services.ctaLabel || defaultHomePage.services.ctaLabel,
      items: serviceItems,
    },
    globalNetwork: {
      eyebrow:
        globalNetwork?.eyebrow || defaultHomePage.globalNetwork.eyebrow,
      headline:
        globalNetwork?.headline || defaultHomePage.globalNetwork.headline,
      body: globalNetwork?.body || defaultHomePage.globalNetwork.body,
      ctaLabel:
        globalNetwork?.ctaLabel || defaultHomePage.globalNetwork.ctaLabel,
    },
    testimonials: {
      eyebrow: testimonials?.eyebrow || defaultHomePage.testimonials.eyebrow,
      headline:
        testimonials?.headline || defaultHomePage.testimonials.headline,
      body: testimonials?.body || defaultHomePage.testimonials.body,
      items:
        testimonials?.items?.filter((t) => t.quote && t.name) ||
        defaultHomePage.testimonials.items,
    },
    team: {
      eyebrow: team?.eyebrow || defaultHomePage.team.eyebrow,
      headline: team?.headline || defaultHomePage.team.headline,
      body: team?.body || defaultHomePage.team.body,
      ctaLabel: team?.ctaLabel || defaultHomePage.team.ctaLabel,
      members: teamMembers,
    },
    intake: (() => {
      const benefits = unwrapTexts(intake?.benefits as { text?: string }[])
      const steps = unwrapTexts(intake?.steps as { text?: string }[])
      const needOptions = unwrapTexts(
        intake?.needOptions as { text?: string }[],
      )
      const regionOptions = unwrapTexts(
        intake?.regionOptions as { text?: string }[],
      )
      const footprintOptions = unwrapTexts(
        intake?.footprintOptions as { text?: string }[],
      )
      const timelineOptions = unwrapTexts(
        intake?.timelineOptions as { text?: string }[],
      )
      return {
        eyebrow: (intake?.eyebrow as string) || defaultHomePage.intake.eyebrow,
        headline:
          (intake?.headline as string) || defaultHomePage.intake.headline,
        body: (intake?.body as string) || defaultHomePage.intake.body,
        benefits: benefits.length
          ? benefits
          : defaultHomePage.intake.benefits,
        steps: steps.length ? steps : defaultHomePage.intake.steps,
        needOptions: needOptions.length
          ? needOptions
          : defaultHomePage.intake.needOptions,
        regionOptions: regionOptions.length
          ? regionOptions
          : defaultHomePage.intake.regionOptions,
        footprintOptions: footprintOptions.length
          ? footprintOptions
          : defaultHomePage.intake.footprintOptions,
        timelineOptions: timelineOptions.length
          ? timelineOptions
          : defaultHomePage.intake.timelineOptions,
      }
    })(),
    blogSection: {
      eyebrow:
        (blogSection?.eyebrow as string) || defaultHomePage.blogSection.eyebrow,
      headline:
        (blogSection?.headline as string) ||
        defaultHomePage.blogSection.headline,
      body:
        (blogSection?.body as string) || defaultHomePage.blogSection.body,
      browseAllLabel:
        (blogSection?.browseAllLabel as string) ||
        defaultHomePage.blogSection.browseAllLabel,
      expertEyebrow:
        (blogSection?.expertEyebrow as string) ||
        defaultHomePage.blogSection.expertEyebrow,
      expertHeadline:
        (blogSection?.expertHeadline as string) ||
        defaultHomePage.blogSection.expertHeadline,
      expertInsights:
        (blogSection?.expertInsights as CmsExpertInsight[])?.filter(
          (i) => i?.quote && i?.name,
        ) || defaultHomePage.blogSection.expertInsights,
      bottomCta: {
        eyebrow:
          bottomCtaRaw?.eyebrow ||
          defaultHomePage.blogSection.bottomCta.eyebrow,
        headline:
          bottomCtaRaw?.headline ||
          defaultHomePage.blogSection.bottomCta.headline,
        body:
          bottomCtaRaw?.body || defaultHomePage.blogSection.bottomCta.body,
        ctaLabel:
          bottomCtaRaw?.ctaLabel ||
          defaultHomePage.blogSection.bottomCta.ctaLabel,
      },
      featuredReport: {
        eyebrow:
          (featuredReportRaw?.eyebrow as string) ||
          defaultHomePage.blogSection.featuredReport.eyebrow,
        title:
          (featuredReportRaw?.title as string) ||
          defaultHomePage.blogSection.featuredReport.title,
        description:
          (featuredReportRaw?.description as string) ||
          defaultHomePage.blogSection.featuredReport.description,
        pages:
          (featuredReportRaw?.pages as string) ||
          defaultHomePage.blogSection.featuredReport.pages,
        format:
          (featuredReportRaw?.format as string) ||
          defaultHomePage.blogSection.featuredReport.format,
        audience:
          (featuredReportRaw?.audience as string) ||
          defaultHomePage.blogSection.featuredReport.audience,
        ctaLabel:
          (featuredReportRaw?.ctaLabel as string) ||
          defaultHomePage.blogSection.featuredReport.ctaLabel,
        highlights: (() => {
          const highlights = unwrapTexts(
            featuredReportRaw?.highlights as { text?: string }[],
          )
          return highlights.length
            ? highlights
            : defaultHomePage.blogSection.featuredReport.highlights
        })(),
      },
    },
    faq: {
      eyebrow: faq?.eyebrow || defaultHomePage.faq.eyebrow,
      headline: faq?.headline || defaultHomePage.faq.headline,
      body: faq?.body || defaultHomePage.faq.body,
      items:
        faq?.items?.filter((i) => i.question && i.answer) ||
        defaultHomePage.faq.items,
    },
  }
}

async function fetchGlobal(
  slug: string,
): Promise<Record<string, unknown> | null> {
  const result = await fetchPayloadAPI(
    `/globals/${slug}`,
    { depth: 1 },
    { throwOnHttpError: false, revalidate: 60 },
  )
  if (!result.ok || !result.data || typeof result.data !== "object") {
    return null
  }
  return result.data as Record<string, unknown>
}

export async function getCmsNavigation(): Promise<CmsNavigation> {
  try {
    const mapped = mapNavigation(await fetchGlobal("navigation"))
    if (mapped) return mapped
  } catch {
    // fall through
  }
  return defaultNavigation
}

export async function getCmsFooter(): Promise<CmsFooter> {
  try {
    const mapped = mapFooter(await fetchGlobal("footer"))
    if (mapped) return mapped
  } catch {
    // fall through
  }
  return defaultFooter
}

export async function getCmsHomePage(): Promise<CmsHomePage> {
  try {
    const mapped = mapHomePage(await fetchGlobal("home-page"))
    if (mapped) return mapped
  } catch {
    // fall through
  }
  return defaultHomePage
}

export function formatCopyright(template: string, year = new Date().getFullYear()) {
  return template.replace(/\{year\}/g, String(year))
}
