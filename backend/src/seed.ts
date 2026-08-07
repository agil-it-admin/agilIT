import "dotenv/config"
import { getPayload } from "payload"
import config from "./payload.config"

const posts = [
  {
    slug: "renew-or-go-back-to-market",
    title: "Renew or Go Back to Market?",
    category: "Contract Negotiation",
    excerpt:
      "A decision framework for evaluating colocation renewals against a fresh RFP — when loyalty saves money, and when it quietly costs you.",
    readTime: "9 min read",
    publishedAt: "2026-07-22",
    kind: "article",
    featured: true,
    imageVariant: "server-room",
    imageAlt: "Server room aisle with racks and cabling",
    sections: [
      {
        paragraphs: [
          {
            text: "Renewal season compresses months of leverage into a few short windows. Operators know your migration costs; you know their vacancy risk. The teams that win treat renewal as a sourcing event — not a paperwork exercise.",
          },
          {
            text: "This guide walks through when to renew in place, when to reopen the market, and how to structure a dual-track process without disrupting operations.",
          },
        ],
      },
      {
        heading: "When renewal is the right call",
        paragraphs: [
          {
            text: "Stay if your density roadmap fits the cage, interconnects are sticky, and the operator can match or beat a credible market alternative within 5–8%. Factor in migration risk, remote-hands quality, and remaining cross-connect lead times.",
          },
        ],
      },
      {
        heading: "When to go back to market",
        paragraphs: [
          {
            text: "Reopen the RFP when power headroom is tight, renewal uplift exceeds metro benchmarks, or your workload mix has shifted toward AI density the current site cannot support economically.",
          },
          {
            text: "A clean market check usually takes 3–5 weeks with a structured brief — far less than the multi-year cost of an unchallenged renewal.",
          },
        ],
      },
      {
        heading: "Run both tracks",
        paragraphs: [
          {
            text: "The strongest posture is parallel: negotiate renewal terms while collecting 2–3 alternate quotes. Even if you stay, competitive tension resets the conversation.",
          },
        ],
      },
    ],
  },
  {
    slug: "reading-colo-price-sheets",
    title: "How to Read a Colocation Price Sheet Without Getting Surprised",
    category: "Pricing",
    excerpt:
      "Rack rate is rarely the whole story. Break down power, cross-connects, remote hands, and commitment structures before you compare quotes.",
    readTime: "7 min read",
    publishedAt: "2026-07-08",
    kind: "article",
    featured: false,
    imageVariant: "exterior",
    imageAlt: "Data center campus exterior",
    sections: [
      {
        paragraphs: [
          {
            text: "Two quotes with the same cabinet rate can diverge by 20–40% once power, interconnects, and professional services are included. Normalize every line item against your actual deployment profile.",
          },
        ],
      },
      {
        heading: "Normalize to $/kW and total cost of occupancy",
        paragraphs: [
          {
            text: "Compare committed power, burst allowances, and whether cooling is bundled. Model Year 1 vs. Years 2–5 separately — many surprises hide in escalators and renewal clauses.",
          },
        ],
      },
    ],
  },
  {
    slug: "site-selection-scorecard",
    title: "A Practical Site Selection Scorecard for Multi-Metro Deals",
    category: "Site Selection",
    excerpt:
      "Latency, fiber diversity, utility risk, and labor access — weight the factors that actually move your architecture.",
    readTime: "8 min read",
    publishedAt: "2026-06-24",
    kind: "article",
    featured: false,
    imageVariant: "cooling-aisle",
    imageAlt: "Cooling aisle with CRAC units",
    sections: [
      {
        paragraphs: [
          {
            text: "Metro shortlists fail when every stakeholder scores facilities with a different mental model. A shared scorecard forces trade-offs into the open before you request final proposals.",
          },
        ],
      },
      {
        heading: "Core scoring dimensions",
        paragraphs: [
          {
            text: "Network (carrier diversity, cloud on-ramps), power (capacity + timeline), operations (remote hands SLAs), and commercial (term flexibility). Score each 1–5 with written rationale.",
          },
        ],
      },
    ],
  },
  {
    slug: "ai-power-density-costs",
    title: "The Hidden Costs of Power Density in AI Workloads",
    category: "AI Infrastructure",
    excerpt:
      "GPU clusters are rewriting the rules on kW-per-rack. Here is how to budget for liquid cooling and high-density cages.",
    readTime: "10 min read",
    publishedAt: "2026-05-09",
    kind: "article",
    featured: false,
    imageVariant: "cooling-aisle",
    imageAlt: "Server hall with CRAC units and technicians",
    sections: [
      {
        paragraphs: [
          {
            text: "A standard colocation quote assumes 4–8 kW per cabinet. A modern GPU training rack can demand 30 kW or more. That gap drives redesigns in power distribution, cooling, floor loading, and contract structure.",
          },
        ],
      },
      {
        heading: "Beyond the rack rate",
        paragraphs: [
          {
            text: "High-density deployments may require dedicated busway, remote power panels, or wholesale-style allocations. Liquid cooling loops and containment add engineering lead time.",
          },
        ],
      },
      {
        heading: "Planning questions to ask",
        paragraphs: [
          {
            text: "What is sustained vs. peak density per contiguous footprint? Are utility interconnection limits binding? Can the operator support phased ramp as cluster size grows?",
          },
        ],
      },
    ],
  },
  {
    slug: "cost-optimization-playbook",
    title: "Five Levers to Cut Colocation Spend Without Moving",
    category: "Cost Optimization",
    excerpt:
      "Right-size power commits, reclaim stranded cabinets, and renegotiate soft costs before you start a migration project.",
    readTime: "6 min read",
    publishedAt: "2026-06-03",
    kind: "article",
    featured: false,
    imageVariant: "server-room",
    imageAlt: "Server racks in a colo cage",
    sections: [
      {
        paragraphs: [
          {
            text: "Not every cost problem needs a new facility. Many teams leave 10–25% on the table through over-committed power, idle cabinets, and unchecked remote-hands usage.",
          },
        ],
      },
      {
        heading: "Start with utilization",
        paragraphs: [
          {
            text: "Audit actual draw vs. committed kW, then renegotiate commits or reclaim cabinets. Pair that with a cross-connect inventory — orphaned circuits add up quietly.",
          },
        ],
      },
    ],
  },
  {
    slug: "procurement-rfp-brief",
    title: "Write a Colocation RFP Brief Providers Can Actually Answer",
    category: "Procurement",
    excerpt:
      "Ambiguous briefs produce incomparable quotes. Structure requirements so advisors and operators respond on the same grid.",
    readTime: "7 min read",
    publishedAt: "2026-05-18",
    kind: "article",
    featured: false,
    imageVariant: "exterior",
    imageAlt: "Facility campus aerial view",
    sections: [
      {
        paragraphs: [
          {
            text: "A strong brief specifies power, density, compliance, interconnects, timeline, and decision criteria up front. Vague ‘need colo in Ashburn’ RFPs waste weeks of clarification.",
          },
        ],
      },
      {
        heading: "Minimum brief contents",
        paragraphs: [
          {
            text: "Workload profile, kW range, redundancy needs, target metros, must-have carriers/clouds, term preferences, and scoring weights. Attach a response template.",
          },
        ],
      },
    ],
  },
  {
    slug: "tip-ask-for-escalator-caps",
    title: "Always Cap Annual Escalators in Writing",
    category: "Contract Negotiation",
    excerpt:
      "A 3% ‘standard’ escalator compounds fast. Cap it, or trade a higher Year-1 rate for a flatter curve.",
    readTime: "3 min read",
    publishedAt: "2026-07-28",
    kind: "tip",
    featured: false,
    imageVariant: "server-room",
    imageAlt: "Contract review tip",
    sections: [
      {
        paragraphs: [
          {
            text: "Operators often present annual escalators as non-negotiable. They are not. Ask for a hard cap, a CPI collar, or a multi-year rate lock in exchange for term length.",
          },
          {
            text: "Model the full term: a 3% annual bump on a five-year deal meaningfully changes TCO versus a flat or capped structure. Put the formula in the schedule — not the ‘standard terms’ appendix.",
          },
          {
            text: "If the provider resists, ask which metros currently accept caps for similar footprints. Market evidence shortens the debate.",
          },
        ],
      },
    ],
  },
  {
    slug: "tip-measure-actual-power",
    title: "Measure Actual Draw Before You Recommit Power",
    category: "Cost Optimization",
    excerpt:
      "Committed kW is where quiet overspend hides. Two weeks of metering usually pays for itself.",
    readTime: "2 min read",
    publishedAt: "2026-07-15",
    kind: "tip",
    featured: false,
    imageVariant: "cooling-aisle",
    imageAlt: "Power metering tip",
    sections: [
      {
        paragraphs: [
          {
            text: "Before renewal, pull 14–30 days of actual cabinet draw. Compare peak and P95 against your committed power.",
          },
          {
            text: "If you are consistently under 60% of commit, renegotiate downward or reclaim cabinets. If you spike near commit, decide whether to buy headroom or redesign placement.",
          },
          {
            text: "Bring the charts to the renewal call. Data beats anecdotes every time.",
          },
        ],
      },
    ],
  },
  {
    slug: "tip-dual-path-fiber",
    title: "Require Dual Diverse Fiber Entrances — Explicitly",
    category: "Site Selection",
    excerpt:
      "‘Carrier rich’ is not the same as path diversity. Put entrance diversity in the requirements.",
    readTime: "3 min read",
    publishedAt: "2026-07-01",
    kind: "tip",
    featured: false,
    imageVariant: "exterior",
    imageAlt: "Fiber diversity tip",
    sections: [
      {
        paragraphs: [
          {
            text: "Ask for documented dual diverse building entrances and separately routed conduits to your suite or MMR. Marketing lists of carriers do not prove physical diversity.",
          },
          {
            text: "Request a simple diagram in the proposal package. If the operator cannot produce one, treat diversity as unverified until a site walk confirms it.",
          },
        ],
      },
    ],
  },
  {
    slug: "tip-remote-hands-sla",
    title: "Put Remote Hands Response Times in the MSA",
    category: "Procurement",
    excerpt:
      "When a disk fails at 2 a.m., the rate card matters less than the response clock.",
    readTime: "2 min read",
    publishedAt: "2026-06-12",
    kind: "tip",
    featured: false,
    imageVariant: "server-room",
    imageAlt: "Remote hands tip",
    sections: [
      {
        paragraphs: [
          {
            text: "Negotiate remote-hands response and completion targets for P1/P2 events, not just hourly rates. Include after-hours and weekend coverage explicitly.",
          },
          {
            text: "If you run lean ops, this clause is as important as power redundancy. Ask for historical mean time to dispatch for your target facility.",
          },
        ],
      },
    ],
  },
] as const

const texts = (items: string[]) => items.map((text) => ({ text }))

const navigationSeed = {
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

const footerSeed = {
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

const homePageSeed = {
  sections: [
    { type: "stats", enabled: true },
    { type: "services", enabled: true },
    { type: "globalNetwork", enabled: true },
    { type: "testimonials", enabled: true },
    { type: "team", enabled: true },
    { type: "intake", enabled: true },
    { type: "blogSection", enabled: true },
    { type: "faq", enabled: true },
  ],
  hero: {
    eyebrow: "Enterprise colocation sourcing",
    headline: "The sourcing partner for enterprise colocation.",
    body: "Mid-to-large enterprises trust us to source cabinets through ~1 MW deals—typically on 3–5 year terms. We bring market leverage, negotiated pricing, and a shortlist you can take to procurement.",
    ctaLabel: "Start sourcing",
  },
  stats: {
    eyebrow: "Built for enterprise colocation sourcing",
    items: [
      { value: "1,400+", label: "Facilities we source from" },
      { value: "~1 MW", label: "Deal size focus" },
      { value: "3–5 yr", label: "Typical term length" },
      { value: "1 day", label: "Avg. first shortlist response" },
    ],
  },
  services: {
    eyebrow: "Sourcing levers",
    headline: "The trends and levers that win colo deals",
    body: "Footprint, commercials, site selection, and power density—side by side—so mid-to-large enterprises can source colocation with confidence through ~1 MW.",
    ctaLabel: "Start sourcing",
    items: [
      {
        key: "footprint",
        name: "Footprint",
        tagline: "Cabinets through ~1 MW",
        icon: "server",
        bestFor: "Enterprise colo deployments under 1 MW",
        weHelpWith: "Retail to suite shortlists sized to your power draw",
        deployTime: "2–6 weeks typical",
        features: texts([
          "Cabinet, half-cage & suite matching",
          "Power density & redundancy screening",
          "Remote hands & cross-connect options",
          "Multi-metro shortlists in one brief",
        ]),
      },
      {
        key: "commercials",
        name: "Commercials",
        tagline: "3–5 year deal leverage",
        icon: "shield",
        bestFor: "Renewals, new MSAs & term negotiations",
        weHelpWith: "Escalators, uplift caps, and market-check leverage",
        deployTime: "Aligned to your renewal window",
        features: texts([
          "Escalator & uplift risk review",
          "Apples-to-apples commercial grids",
          "Term structure for 3–5 year deals",
          "Vendor-neutral negotiation support",
        ]),
      },
      {
        key: "site-selection",
        name: "Site selection",
        tagline: "Metro strategy that fits the workload",
        icon: "globe",
        bestFor: "Primary, DR & multi-metro colo programs",
        weHelpWith: "Latency, compliance, and capacity-aware metro picks",
        deployTime: "1–3 weeks to shortlist",
        features: texts([
          "Metro & campus capacity checks",
          "Compliance filter (SOC 2, HIPAA, PCI)",
          "Interconnect & carrier density",
          "Primary + DR pairing options",
        ]),
      },
      {
        key: "power-cooling",
        name: "Power & density",
        tagline: "Right-size kW before you sign",
        icon: "cpu",
        bestFor: "Growing racks, AI islands & density upgrades",
        weHelpWith: "Draw vs. reserved power and cooling headroom",
        deployTime: "Often within one business week",
        features: texts([
          "Actual draw vs. reserved power",
          "Density & cooling readiness",
          "Expansion path inside the facility",
          "Avoid overbuy on day-one power",
        ]),
      },
    ],
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
    items: [
      {
        quote:
          "We needed a ~400 kW colo footprint on a five-year term. They shortlisted three facilities with real commercial leverage—not a pile of brochures—and procurement signed in weeks.",
        name: "Priya Nadar",
        role: "VP of Infrastructure",
        company: "Quanta Markets",
      },
      {
        quote:
          "Our renewal had a steep escalator baked in. Their market check reset the conversation and saved us from locking in three more years of above-market power.",
        name: "Marcus Bell",
        role: "Director of IT",
        company: "Northbound Health",
      },
      {
        quote:
          "Finally, someone who sources enterprise colo for a living. The comparison grid gave our leadership the confidence to move—and the numbers held up in diligence.",
        name: "Elena Fischer",
        role: "Head of Infrastructure Ops",
        company: "Ardent Logistics",
      },
    ],
  },
  team: {
    eyebrow: "Our team",
    headline: "The people who source enterprise colo",
    body: "We are the team enterprises call when they need someone who sources colocation for a living—cabinets through ~1 MW, typically on 3–5 year terms, with leverage you can take to the board.",
    ctaLabel: "Start sourcing",
    members: [
      {
        key: "brad-mclaughlin",
        name: "Brad McLaughlin",
        role: "Enterprise Colo Sourcer",
        imagePath: "/placeholder-images/people/brad-mclaughlin.jpg",
      },
      {
        key: "patrick-ellis",
        name: "Patrick Ellis",
        role: "Principal Sourcing Advisor",
        imagePath: "/placeholder-images/people/1582124128804.webp",
      },
    ],
  },
  intake: {
    eyebrow: "Start sourcing",
    headline: "Tell us the deal. We'll source the colo.",
    body: "Answer four quick questions and a dedicated sourcer returns two to four matched facilities within one business day—sized for enterprise colo through ~1 MW. Always free, always vendor-neutral.",
    benefits: texts([
      "Enterprise colo focus—not a general IT marketplace",
      "Commercial leverage on 3–5 year terms",
      "Shortlists procurement can stand behind",
    ]),
    steps: texts(["Need", "Footprint", "Timeline", "Contact"]),
    needOptions: texts([
      "New colo deployment",
      "Renewal / renegotiation",
      "Expansion in place",
      "Multi-metro / DR",
    ]),
    regionOptions: texts([
      "West",
      "Southwest",
      "Midwest",
      "Southeast",
      "Northeast",
      "No preference",
    ]),
    footprintOptions: texts([
      "1–5 racks",
      "Half cage / 6–20 racks",
      "Private suite / up to ~500 kW",
      "Up to ~1 MW",
    ]),
    timelineOptions: texts([
      "Immediately",
      "1–3 months",
      "3–6 months",
      "Planning a 3–5 year term",
    ]),
  },
  blogSection: {
    eyebrow: "Resource Center / Blog",
    headline: "Trends and levers for enterprise colo",
    body: "Pricing benchmarks, renewal playbooks, and procurement-ready guides for teams sourcing enterprise colocation—so you walk into the next deal with leverage.",
    browseAllLabel: "Browse all articles",
    expertEyebrow: "Expert Insight",
    expertHeadline: "From the sourcing team",
    expertInsights: [
      {
        quote:
          "Most renewals fail because teams negotiate rate before they negotiate leverage. Bring competing options to the table first — then talk price.",
        name: "Brad McLaughlin",
        role: "Enterprise Colo Sourcer",
        focus: "3–5 Year Terms",
      },
      {
        quote:
          "Power density is the new geography. If your site plan ignores sustained kW per rack, you're not selecting a facility — you're selecting a bottleneck.",
        name: "Patrick Ellis",
        role: "Principal Sourcing Advisor",
        focus: "Power & Density",
      },
    ],
    bottomCta: {
      eyebrow: "Next step",
      headline: "Request a free contract review",
      body: "Share your current MSA or renewal notice. Our advisors flag uplift risk, escalator exposure, and where a market check could reset leverage — at no cost.",
      ctaLabel: "Request a free contract review",
    },
    featuredReport: {
      eyebrow: "Featured report",
      title: "2026 Enterprise Colocation Pricing Benchmark Report",
      description:
        "Metro-by-metro rack rates, power premiums, and renewal deltas across 40+ North American markets — built for procurement and finance teams heading into renewal season.",
      pages: "42 pages",
      format: "PDF",
      audience: "Procurement & finance",
      ctaLabel: "Request the report",
      highlights: texts([
        "Wholesale vs. retail $/kW benchmarks",
        "Renewal uplift ranges by metro",
        "AI-density premium indicators",
      ]),
    },
  },
  faq: {
    eyebrow: "FAQ",
    headline: "Enterprise colo sourcing, clarified",
    body: "Straight answers on deal size, cost, renewals, and how fast we move.",
    items: [
      {
        question: "Is there any cost to use Colonegotiator?",
        answer:
          "No. Enterprise colocation sourcing through us is free to you. We are compensated by the provider network when you sign, so advisory, shortlists, and negotiation support come at no cost to your team.",
      },
      {
        question: "What deal sizes do you focus on?",
        answer:
          "We specialize in mid-to-large enterprise colocation—from a handful of cabinets up through roughly 1 MW. Most engagements land on 3–5 year terms. If you are shopping multi-megawatt wholesale campuses, we can still advise, but that is not our core lane.",
      },
      {
        question: "How quickly will I hear back after submitting requirements?",
        answer:
          "A dedicated sourcer reviews your requirements and responds within one business day, typically with two to four matched facilities that fit your power, term, compliance, and commercial criteria.",
      },
      {
        question: "Do you support compliance-sensitive workloads?",
        answer:
          "Yes. We filter for SOC 2, ISO 27001, PCI DSS, HIPAA, FedRAMP, and FINRA-aligned facilities so regulated organizations only see compliant colo options.",
      },
      {
        question: "Can you help with renewals—not just new deals?",
        answer:
          "Absolutely. Renewals are where escalators and uplift often hide. We run a market check against your current MSA so you know whether to renew, renegotiate, or go back to market before the window closes.",
      },
    ],
  },
}

async function seed() {
  const payload = await getPayload({ config })

  const existingUsers = await payload.find({
    collection: "users",
    limit: 1,
    overrideAccess: true,
  })

  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: {
        email: "admin@colonegotiator.com",
        password: "changeme123",
        name: "Colonegotiator Admin",
      },
      overrideAccess: true,
    })
    payload.logger.info("Created default admin user (admin@colonegotiator.com / changeme123)")
  }

  for (const post of posts) {
    const existing = await payload.find({
      collection: "articles",
      where: { slug: { equals: post.slug } },
      limit: 1,
      overrideAccess: true,
    })

    const data = {
      ...post,
      publishedAt: new Date(post.publishedAt).toISOString(),
      // Payload expects mutable arrays (seed data is `as const`)
      sections: post.sections.map((section) => ({
        heading: "heading" in section ? section.heading : undefined,
        paragraphs: section.paragraphs.map((p) => ({ text: p.text })),
      })),
    }

    if (existing.docs[0]) {
      // Use string IDs — Cockroach/serial bigint IDs exceed JS safe integers.
      await payload.update({
        collection: "articles",
        id: String(existing.docs[0].id),
        data: data as never,
        overrideAccess: true,
      })
      payload.logger.info(`Updated article: ${post.slug}`)
    } else {
      await payload.create({
        collection: "articles",
        data: data as never,
        overrideAccess: true,
      })
      payload.logger.info(`Created article: ${post.slug}`)
    }
  }

  await payload.updateGlobal({
    slug: "navigation",
    data: navigationSeed,
    overrideAccess: true,
  })
  payload.logger.info("Upserted navigation global")

  await payload.updateGlobal({
    slug: "footer",
    data: footerSeed,
    overrideAccess: true,
  })
  payload.logger.info("Upserted footer global")

  await payload.updateGlobal({
    slug: "home-page",
    data: homePageSeed,
    overrideAccess: true,
  })
  payload.logger.info("Upserted home-page global")

  payload.logger.info(`Seed complete (${posts.length} articles + globals).`)
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
