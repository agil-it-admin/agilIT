export type BlogPost = {
  slug: string
  title: string
  category: string
  excerpt: string
  readTime: string
  date: string
  image: string
  imageAlt: string
  sections: {
    heading?: string
    paragraphs: string[]
  }[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "colocation-vs-hybrid-cloud",
    title: "Colocation vs. Hybrid Cloud: Choosing the Right Mix in 2026",
    category: "Strategy",
    excerpt:
      "A practical framework for deciding which workloads stay on owned hardware and which belong in elastic cloud capacity.",
    readTime: "8 min read",
    date: "Jun 12, 2026",
    image: "/blog/placeholder-server-room.png",
    imageAlt: "Pixel-art illustration of a server room aisle with racks and cabling",
    sections: [
      {
        paragraphs: [
          "Most infrastructure teams no longer choose between colocation and cloud in absolute terms. The decision is about placement: which workloads benefit from dedicated hardware, predictable cost, and low-latency cross-connects—and which need burst capacity, managed services, or rapid geographic expansion.",
          "This guide outlines a simple evaluation model you can run with finance and application owners before the next sourcing cycle.",
        ],
      },
      {
        heading: "When colocation still wins",
        paragraphs: [
          "Steady-state production systems with known CPU, memory, and storage profiles are often cheaper to run on owned or leased hardware in a carrier-neutral facility. Trading platforms, core ERP workloads, and compliance-bound databases frequently fall into this bucket.",
          "Colocation also preserves control over patching cadence, hardware selection, and physical security boundaries—requirements that still matter for regulated industries.",
        ],
      },
      {
        heading: "Where hybrid cloud fits",
        paragraphs: [
          "Bursty analytics, dev/test environments, and customer-facing apps with unpredictable traffic spikes are strong candidates for public cloud or hosted private cloud connected via direct interconnect.",
          "The goal is not to minimize cloud spend at all costs—it is to avoid paying cloud premiums for workloads that behave like fixed infrastructure.",
        ],
      },
      {
        heading: "Next steps",
        paragraphs: [
          "Document each application’s performance profile, compliance constraints, and growth assumptions. Map them against facility options in your target metros before requesting quotes.",
          "A structured comparison usually surfaces two or three viable deployment mixes within a single working session.",
        ],
      },
    ],
  },
  {
    slug: "data-center-tiers-explained",
    title: "Understanding Data Center Tiers: III vs. IV Explained",
    category: "Fundamentals",
    excerpt:
      "Redundancy, concurrent maintainability, and what the Uptime Institute classifications actually mean for your SLA.",
    readTime: "6 min read",
    date: "May 28, 2026",
    image: "/blog/placeholder-server-room.png",
    imageAlt: "Pixel-art illustration of a server room aisle with racks and cabling",
    sections: [
      {
        paragraphs: [
          "Tier classifications describe how a facility is designed to handle failure—not how fast your application runs. Procurement teams often treat Tier III and Tier IV as marketing labels; in practice, the difference shows up in maintenance windows and fault tolerance.",
        ],
      },
      {
        heading: "Tier III in plain language",
        paragraphs: [
          "Tier III facilities are concurrently maintainable: you can take one path of power or cooling offline for planned work without shutting down IT equipment. That typically means N+1 redundancy on critical systems and separate distribution paths.",
          "For many enterprise workloads, Tier III is the practical baseline when you need high availability without the capital overhead of full fault tolerance.",
        ],
      },
      {
        heading: "What Tier IV adds",
        paragraphs: [
          "Tier IV introduces fault tolerance: a single unplanned failure on any component should not interrupt the critical environment. That implies 2N or 2(N+1) redundancy and stricter operational procedures.",
          "Mission-critical financial, healthcare, and government systems sometimes mandate Tier IV—or contractually require equivalent redundancy even when the badge is not required.",
        ],
      },
      {
        heading: "Matching tier to risk",
        paragraphs: [
          "Ask whether your SLA is driven by revenue impact, regulatory obligation, or customer contract language. That answer usually narrows the tier range faster than comparing spec sheets alone.",
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
    image: "/blog/placeholder-server-room.png",
    imageAlt: "Pixel-art illustration of a server room aisle with racks and cabling",
    sections: [
      {
        paragraphs: [
          "A standard colocation quote assumes 4–8 kW per cabinet. A modern GPU training rack can demand 30 kW or more. That gap drives redesigns in power distribution, cooling, floor loading, and contract structure—often after a deal is already in motion.",
        ],
      },
      {
        heading: "Beyond the rack rate",
        paragraphs: [
          "High-density deployments may require dedicated busway, remote power panels, or wholesale-style space allocations. Liquid cooling loops, rear-door heat exchangers, and containment aisles add engineering and install lead time.",
          "Facilities that advertise AI-ready capacity should document supported kW per rack, cooling approach, and average provisioning time for dense pods.",
        ],
      },
      {
        heading: "Planning questions to ask",
        paragraphs: [
          "What is the facility’s sustained vs. peak density per contiguous footprint? Are utility interconnection limits a binding constraint in that metro? Can the operator support phased ramp as cluster size grows?",
          "Answering these early prevents rework when procurement discovers the cage cannot support the intended GPU count.",
        ],
      },
      {
        heading: "Budgeting for the full stack",
        paragraphs: [
          "Model power as a recurring operational cost, not a one-time facility feature. Include network egress, cross-connects, and remote hands for hardware swaps at density levels your team cannot service alone.",
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
