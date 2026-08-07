export type Facility = {
  id: string;
  name: string;
  provider: string;
  metro: string;
  state: string;
  region: "West" | "Southwest" | "Midwest" | "Southeast" | "Northeast";
  coordinates: [number, number]; // [lng, lat]
  powerMw: number;
  spaceSqft: string;
  tier: "Tier III" | "Tier IV";
  pue: number;
  certifications: string[];
};

export const facilities: Facility[] = [
  {
    id: "santa-clara-1",
    name: "Silicon Valley Campus 4",
    provider: "Northstar Colocation",
    metro: "Santa Clara, CA",
    state: "California",
    region: "West",
    coordinates: [-121.9552, 37.3541],
    powerMw: 48,
    spaceSqft: "210,000 sq ft",
    tier: "Tier III",
    pue: 1.32,
    certifications: ["SOC 2", "ISO 27001", "Uptime M&O"],
  },
  {
    id: "ashburn-1",
    name: "Loudoun Gateway DC1",
    provider: "Meridian Edge",
    metro: "Ashburn, VA",
    state: "Virginia",
    region: "Southeast",
    coordinates: [-77.4875, 39.0437],
    powerMw: 72,
    spaceSqft: "340,000 sq ft",
    tier: "Tier IV",
    pue: 1.28,
    certifications: ["SOC 2", "ISO 27001", "PCI DSS", "HIPAA"],
  },
  {
    id: "dallas-1",
    name: "Infomart Exchange",
    provider: "Lone Star Data",
    metro: "Dallas, TX",
    state: "Texas",
    region: "Southwest",
    coordinates: [-96.7969, 32.7767],
    powerMw: 60,
    spaceSqft: "295,000 sq ft",
    tier: "Tier III",
    pue: 1.35,
    certifications: ["SOC 2", "ISO 27001", "PCI DSS"],
  },
  {
    id: "chicago-1",
    name: "Cermak Carrier Hotel",
    provider: "Lakeside Interconnect",
    metro: "Chicago, IL",
    state: "Illinois",
    region: "Midwest",
    coordinates: [-87.6298, 41.8781],
    powerMw: 54,
    spaceSqft: "260,000 sq ft",
    tier: "Tier IV",
    pue: 1.3,
    certifications: ["SOC 2", "ISO 27001", "HIPAA"],
  },
  {
    id: "phoenix-1",
    name: "Sonoran Desert DC2",
    provider: "Northstar Colocation",
    metro: "Phoenix, AZ",
    state: "Arizona",
    region: "Southwest",
    coordinates: [-112.074, 33.4484],
    powerMw: 66,
    spaceSqft: "315,000 sq ft",
    tier: "Tier III",
    pue: 1.29,
    certifications: ["SOC 2", "ISO 27001", "PCI DSS"],
  },
  {
    id: "newyork-1",
    name: "Hudson Yards Vault",
    provider: "Atlantic Core",
    metro: "New York, NY",
    state: "New York",
    region: "Northeast",
    coordinates: [-74.006, 40.7128],
    powerMw: 36,
    spaceSqft: "150,000 sq ft",
    tier: "Tier IV",
    pue: 1.34,
    certifications: ["SOC 2", "ISO 27001", "FINRA"],
  },
  {
    id: "atlanta-1",
    name: "Peachtree Peering Hub",
    provider: "Meridian Edge",
    metro: "Atlanta, GA",
    state: "Georgia",
    region: "Southeast",
    coordinates: [-84.388, 33.749],
    powerMw: 44,
    spaceSqft: "198,000 sq ft",
    tier: "Tier III",
    pue: 1.33,
    certifications: ["SOC 2", "ISO 27001"],
  },
  {
    id: "seattle-1",
    name: "Cascadia Westin Hub",
    provider: "Northstar Colocation",
    metro: "Seattle, WA",
    state: "Washington",
    region: "West",
    coordinates: [-122.3321, 47.6062],
    powerMw: 30,
    spaceSqft: "132,000 sq ft",
    tier: "Tier III",
    pue: 1.27,
    certifications: ["SOC 2", "ISO 27001", "HIPAA"],
  },
  {
    id: "denver-1",
    name: "Front Range DC1",
    provider: "Lakeside Interconnect",
    metro: "Denver, CO",
    state: "Colorado",
    region: "West",
    coordinates: [-104.9903, 39.7392],
    powerMw: 38,
    spaceSqft: "172,000 sq ft",
    tier: "Tier III",
    pue: 1.31,
    certifications: ["SOC 2", "ISO 27001"],
  },
  {
    id: "miami-1",
    name: "NAP of the Americas",
    provider: "Atlantic Core",
    metro: "Miami, FL",
    state: "Florida",
    region: "Southeast",
    coordinates: [-80.1918, 25.7617],
    powerMw: 42,
    spaceSqft: "188,000 sq ft",
    tier: "Tier IV",
    pue: 1.36,
    certifications: ["SOC 2", "ISO 27001", "LATAM Edge"],
  },
  {
    id: "columbus-1",
    name: "Heartland Cloud Campus",
    provider: "Lakeside Interconnect",
    metro: "Columbus, OH",
    state: "Ohio",
    region: "Midwest",
    coordinates: [-82.9988, 39.9612],
    powerMw: 58,
    spaceSqft: "270,000 sq ft",
    tier: "Tier III",
    pue: 1.28,
    certifications: ["SOC 2", "ISO 27001", "PCI DSS"],
  },
  {
    id: "boston-1",
    name: "Summer Street Exchange",
    provider: "Atlantic Core",
    metro: "Boston, MA",
    state: "Massachusetts",
    region: "Northeast",
    coordinates: [-71.0589, 42.3601],
    powerMw: 28,
    spaceSqft: "120,000 sq ft",
    tier: "Tier III",
    pue: 1.32,
    certifications: ["SOC 2", "ISO 27001", "HIPAA"],
  },
];

export const regions = [
  "All Regions",
  "West",
  "Southwest",
  "Midwest",
  "Southeast",
  "Northeast",
] as const;

export type Service = {
  id: string;
  name: string;
  tagline: string;
  icon: "server" | "cloud" | "network" | "shield" | "cpu" | "globe";
  bestFor: string;
  weHelpWith: string;
  deployTime: string;
  features: string[];
};

export const services: Service[] = [
  {
    id: "footprint",
    name: "Footprint",
    tagline: "Cabinets through ~1 MW",
    icon: "server",
    bestFor: "Enterprise colo deployments under 1 MW",
    weHelpWith: "Retail to suite shortlists sized to your power draw",
    deployTime: "2–6 weeks typical",
    features: [
      "Cabinet, half-cage & suite matching",
      "Power density & redundancy screening",
      "Remote hands & cross-connect options",
      "Multi-metro shortlists in one brief",
    ],
  },
  {
    id: "commercials",
    name: "Commercials",
    tagline: "3–5 year deal leverage",
    icon: "shield",
    bestFor: "Renewals, new MSAs & term negotiations",
    weHelpWith: "Escalators, uplift caps, and market-check leverage",
    deployTime: "Aligned to your renewal window",
    features: [
      "Escalator & uplift risk review",
      "Apples-to-apples commercial grids",
      "Term structure for 3–5 year deals",
      "Vendor-neutral negotiation support",
    ],
  },
  {
    id: "site-selection",
    name: "Site selection",
    tagline: "Metro strategy that fits the workload",
    icon: "globe",
    bestFor: "Primary, DR & multi-metro colo programs",
    weHelpWith: "Latency, compliance, and capacity-aware metro picks",
    deployTime: "1–3 weeks to shortlist",
    features: [
      "Metro & campus capacity checks",
      "Compliance filter (SOC 2, HIPAA, PCI)",
      "Interconnect & carrier density",
      "Primary + DR pairing options",
    ],
  },
  {
    id: "power-cooling",
    name: "Power & density",
    tagline: "Right-size kW before you sign",
    icon: "cpu",
    bestFor: "Growing racks, AI islands & density upgrades",
    weHelpWith: "Draw vs. reserved power and cooling headroom",
    deployTime: "Often within one business week",
    features: [
      "Actual draw vs. reserved power",
      "Density & cooling readiness",
      "Expansion path inside the facility",
      "Avoid overbuy on day-one power",
    ],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
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
];

export type Partner = {
  name: string;
  logo: string;
};

export const partners: Partner[] = [
  {
    name: "CBRE",
    logo: "/placeholder-images/logos/CBRE_Group_logo.svg",
  },
  {
    name: "JLL",
    logo: "/placeholder-images/logos/jll-logo.svg",
  },
  {
    name: "Digital Realty",
    logo: "/placeholder-images/logos/digital-realty-seeklogo.svg",
  },
];

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
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
];

export const stats = [
  { value: "1,400+", label: "Facilities we source from" },
  { value: "~1 MW", label: "Deal size focus" },
  { value: "3–5 yr", label: "Typical term length" },
  { value: "1 day", label: "Avg. first shortlist response" },
];

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
};

export const team: TeamMember[] = [
  {
    id: "brad-mclaughlin",
    name: "Brad McLaughlin",
    role: "Enterprise Colo Sourcer",
    image: "/placeholder-images/people/brad-mclaughlin.jpg",
  },
  {
    id: "patrick-ellis",
    name: "Patrick Ellis",
    role: "Principal Sourcing Advisor",
    image: "/placeholder-images/people/1582124128804.webp",
  },
];
