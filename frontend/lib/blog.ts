export type BlogCategory =
  | "Pricing"
  | "Contract Negotiation"
  | "Site Selection"
  | "AI Infrastructure"
  | "Cost Optimization"
  | "Procurement"

export type BlogImageVariant = "server-room" | "exterior" | "cooling-aisle"

export type BlogPost = {
  slug: string
  title: string
  category: BlogCategory
  excerpt: string
  readTime: string
  date: string
  kind: "article" | "tip"
  featured?: boolean
  imageVariant: BlogImageVariant
  imageAlt: string
  sections: {
    heading?: string
    paragraphs: string[]
  }[]
}

export const blogCategories: BlogCategory[] = [
  "Pricing",
  "Contract Negotiation",
  "Site Selection",
  "AI Infrastructure",
  "Cost Optimization",
  "Procurement",
]

export const featuredReport = {
  title: "2026 Enterprise Colocation Pricing Benchmark Report",
  description:
    "Metro-by-metro rack rates, power premiums, and renewal deltas across 40+ North American markets — built for procurement and finance teams heading into renewal season.",
  pages: "42 pages",
  format: "PDF",
  highlights: [
    "Wholesale vs. retail $/kW benchmarks",
    "Renewal uplift ranges by metro",
    "AI-density premium indicators",
  ],
}

export const expertInsights = [
  {
    quote:
      "Most renewals fail because teams negotiate rate before they negotiate leverage. Bring competing options to the table first — then talk price.",
    name: "Brad McLaughlin",
    role: "Enterprise Colo Sourcer",
    focus: "3–5 Year Terms",
  },
  {
    quote:
      "Power density is the new geography. If your site plan ignores sustained kW per rack, you’re not selecting a facility — you’re selecting a bottleneck.",
    name: "Patrick Ellis",
    role: "Principal Sourcing Advisor",
    focus: "Power & Density",
  },
]

export const blogPosts: BlogPost[] = [
  {
    slug: "renew-or-go-back-to-market",
    title: "Renew or Go Back to Market?",
    category: "Contract Negotiation",
    excerpt:
      "A decision framework for evaluating colocation renewals against a fresh RFP — when loyalty saves money, and when it quietly costs you.",
    readTime: "9 min read",
    date: "Jul 22, 2026",
    kind: "article",
    featured: true,
    imageVariant: "server-room",
    imageAlt: "Server room aisle with racks and cabling",
    sections: [
      {
        paragraphs: [
          "Renewal season compresses months of leverage into a few short windows. Operators know your migration costs; you know their vacancy risk. The teams that win treat renewal as a sourcing event — not a paperwork exercise.",
          "This guide walks through when to renew in place, when to reopen the market, and how to structure a dual-track process without disrupting operations.",
        ],
      },
      {
        heading: "When renewal is the right call",
        paragraphs: [
          "Stay if your density roadmap fits the cage, interconnects are sticky, and the operator can match or beat a credible market alternative within 5–8%. Factor in migration risk, remote-hands quality, and remaining cross-connect lead times.",
        ],
      },
      {
        heading: "When to go back to market",
        paragraphs: [
          "Reopen the RFP when power headroom is tight, renewal uplift exceeds metro benchmarks, or your workload mix has shifted toward AI density the current site cannot support economically.",
          "A clean market check usually takes 3–5 weeks with a structured brief — far less than the multi-year cost of an unchallenged renewal.",
        ],
      },
      {
        heading: "Run both tracks",
        paragraphs: [
          "The strongest posture is parallel: negotiate renewal terms while collecting 2–3 alternate quotes. Even if you stay, competitive tension resets the conversation.",
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
    date: "Jul 8, 2026",
    kind: "article",
    imageVariant: "exterior",
    imageAlt: "Data center campus exterior",
    sections: [
      {
        paragraphs: [
          "Two quotes with the same cabinet rate can diverge by 20–40% once power, interconnects, and professional services are included. Normalize every line item against your actual deployment profile.",
        ],
      },
      {
        heading: "Normalize to $/kW and total cost of occupancy",
        paragraphs: [
          "Compare committed power, burst allowances, and whether cooling is bundled. Model Year 1 vs. Years 2–5 separately — many surprises hide in escalators and renewal clauses.",
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
    date: "Jun 24, 2026",
    kind: "article",
    imageVariant: "cooling-aisle",
    imageAlt: "Cooling aisle with CRAC units",
    sections: [
      {
        paragraphs: [
          "Metro shortlists fail when every stakeholder scores facilities with a different mental model. A shared scorecard forces trade-offs into the open before you request final proposals.",
        ],
      },
      {
        heading: "Core scoring dimensions",
        paragraphs: [
          "Network (carrier diversity, cloud on-ramps), power (capacity + timeline), operations (remote hands SLAs), and commercial (term flexibility). Score each 1–5 with written rationale.",
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
    date: "May 9, 2026",
    kind: "article",
    imageVariant: "cooling-aisle",
    imageAlt: "Server hall with CRAC units and technicians",
    sections: [
      {
        paragraphs: [
          "A standard colocation quote assumes 4–8 kW per cabinet. A modern GPU training rack can demand 30 kW or more. That gap drives redesigns in power distribution, cooling, floor loading, and contract structure.",
        ],
      },
      {
        heading: "Beyond the rack rate",
        paragraphs: [
          "High-density deployments may require dedicated busway, remote power panels, or wholesale-style allocations. Liquid cooling loops and containment add engineering lead time.",
        ],
      },
      {
        heading: "Planning questions to ask",
        paragraphs: [
          "What is sustained vs. peak density per contiguous footprint? Are utility interconnection limits binding? Can the operator support phased ramp as cluster size grows?",
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
    date: "Jun 3, 2026",
    kind: "article",
    imageVariant: "server-room",
    imageAlt: "Server racks in a colo cage",
    sections: [
      {
        paragraphs: [
          "Not every cost problem needs a new facility. Many teams leave 10–25% on the table through over-committed power, idle cabinets, and unchecked remote-hands usage.",
        ],
      },
      {
        heading: "Start with utilization",
        paragraphs: [
          "Audit actual draw vs. committed kW, then renegotiate commits or consolidate footprints. Pair that with a cross-connect inventory — orphaned circuits add up quietly.",
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
    date: "May 18, 2026",
    kind: "article",
    imageVariant: "exterior",
    imageAlt: "Facility campus aerial view",
    sections: [
      {
        paragraphs: [
          "A strong brief specifies power, density, compliance, interconnects, timeline, and decision criteria up front. Vague ‘need colo in Ashburn’ RFPs waste weeks of clarification.",
        ],
      },
      {
        heading: "Minimum brief contents",
        paragraphs: [
          "Workload profile, kW range, redundancy needs, target metros, must-have carriers/clouds, term preferences, and scoring weights. Attach a response template.",
        ],
      },
    ],
  },
  // Quick tips (300–500 word equivalents — short sections)
  {
    slug: "tip-ask-for-escalator-caps",
    title: "Always Cap Annual Escalators in Writing",
    category: "Contract Negotiation",
    excerpt:
      "A 3% ‘standard’ escalator compounds fast. Cap it, or trade a higher Year-1 rate for a flatter curve.",
    readTime: "3 min read",
    date: "Jul 28, 2026",
    kind: "tip",
    imageVariant: "server-room",
    imageAlt: "Contract review tip",
    sections: [
      {
        paragraphs: [
          "Operators often present annual escalators as non-negotiable. They are not. Ask for a hard cap, a CPI collar, or a multi-year rate lock in exchange for term length.",
          "Model the full term: a 3% annual bump on a five-year deal meaningfully changes TCO versus a flat or capped structure. Put the formula in the schedule — not the ‘standard terms’ appendix.",
          "If the provider resists, ask which metros currently accept caps for similar footprints. Market evidence shortens the debate.",
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
    date: "Jul 15, 2026",
    kind: "tip",
    imageVariant: "cooling-aisle",
    imageAlt: "Power metering tip",
    sections: [
      {
        paragraphs: [
          "Before renewal, pull 14–30 days of actual cabinet draw. Compare peak and P95 against your committed power.",
          "If you are consistently under 60% of commit, renegotiate downward or reclaim cabinets. If you spike near commit, decide whether to buy headroom or redesign placement.",
          "Bring the charts to the renewal call. Data beats anecdotes every time.",
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
    date: "Jul 1, 2026",
    kind: "tip",
    imageVariant: "exterior",
    imageAlt: "Fiber diversity tip",
    sections: [
      {
        paragraphs: [
          "Ask for documented dual diverse building entrances and separately routed conduits to your suite or MMR. Marketing lists of carriers do not prove physical diversity.",
          "Request a simple diagram in the proposal package. If the operator cannot produce one, treat diversity as unverified until a site walk confirms it.",
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
    date: "Jun 12, 2026",
    kind: "tip",
    imageVariant: "server-room",
    imageAlt: "Remote hands tip",
    sections: [
      {
        paragraphs: [
          "Negotiate remote-hands response and completion targets for P1/P2 events, not just hourly rates. Include after-hours and weekend coverage explicitly.",
          "If you run lean ops, this clause is as important as power redundancy. Ask for historical mean time to dispatch for your target facility.",
        ],
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug)
}

export function getFeaturedPost(): BlogPost {
  return blogPosts.find((post) => post.featured) ?? blogPosts[0]
}

export function getArticles(): BlogPost[] {
  return blogPosts.filter((post) => post.kind === "article")
}

export function getTips(): BlogPost[] {
  return blogPosts.filter((post) => post.kind === "tip")
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter(
    (post) => post.category === category && post.kind === "article",
  )
}
