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
  deployTime: string;
  startingAt: string;
  features: string[];
  popular?: boolean;
};

export const services: Service[] = [
  {
    id: "colocation",
    name: "Colocation",
    tagline: "Your hardware, our resilient facilities",
    icon: "server",
    bestFor: "Predictable workloads & hardware control",
    deployTime: "2–4 weeks",
    startingAt: "$650 / rack",
    features: [
      "Quarter, half & full cabinets",
      "2N redundant power & cooling",
      "Remote hands 24/7/365",
      "Cross-connects to 200+ carriers",
    ],
  },
  {
    id: "cloud",
    name: "Hybrid Cloud",
    tagline: "Burst to public cloud on demand",
    icon: "cloud",
    bestFor: "Variable, scaling workloads",
    deployTime: "3–7 days",
    startingAt: "$0.04 / vCPU-hr",
    popular: true,
    features: [
      "Direct connect to AWS, Azure & GCP",
      "Private interconnect fabric",
      "Elastic compute & object storage",
      "Single-pane billing & governance",
    ],
  },
  {
    id: "bare-metal",
    name: "Bare Metal",
    tagline: "Dedicated servers, cloud agility",
    icon: "cpu",
    bestFor: "High-performance & GPU workloads",
    deployTime: "24–72 hours",
    startingAt: "$199 / mo",
    features: [
      "Latest-gen CPU & NVIDIA GPU nodes",
      "Provision via API in minutes",
      "100 Gbps network options",
      "No noisy-neighbor contention",
    ],
  },
  {
    id: "connectivity",
    name: "Connectivity",
    tagline: "Low-latency global network reach",
    icon: "network",
    bestFor: "Multi-site & edge architectures",
    deployTime: "1–3 weeks",
    startingAt: "Custom",
    features: [
      "Dedicated & wavelength transport",
      "Blended & burstable IP transit",
      "DDoS mitigation included",
      "SLA-backed 99.999% uptime",
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
      "We narrowed 40 facilities down to three finalists in an afternoon. The intake matched us with the exact power density and compliance profile our trading platform needed.",
    name: "Priya Nadar",
    role: "VP of Infrastructure",
    company: "Quanta Markets",
  },
  {
    quote:
      "Migrating from a single cage to a hybrid cloud footprint felt impossible. Their advisors handled carrier negotiations and we cut our latency to AWS in half.",
    name: "Marcus Bell",
    role: "Director of IT",
    company: "Northbound Health",
  },
  {
    quote:
      "The comparison grid gave our procurement team the apples-to-apples view we always struggled to build ourselves. Vendor selection went from months to weeks.",
    name: "Elena Fischer",
    role: "Head of Cloud Ops",
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
    question: "Is there any cost to use the platform?",
    answer:
      "No. Sourcing data center, colocation, and connectivity quotes through our platform is completely free. We are compensated by our provider network once you sign a contract, so our advisory services come at no cost to you.",
  },
  {
    question: "How quickly will I hear back after submitting requirements?",
    answer:
      "A dedicated advisor reviews your requirements and responds within one business day, typically with two to four matched facilities that fit your power, space, compliance, and budget criteria.",
  },
  {
    question: "Can you help with multi-region or international deployments?",
    answer:
      "Yes. Our network spans 200+ metros across North America, EMEA, and APAC. We routinely design multi-region and edge architectures with redundant connectivity between sites.",
  },
  {
    question: "Do you support compliance-sensitive workloads?",
    answer:
      "Absolutely. We filter for SOC 2, ISO 27001, PCI DSS, HIPAA, FedRAMP, and FINRA-aligned facilities so regulated organizations only see compliant options.",
  },
  {
    question: "What if I only need a single cabinet?",
    answer:
      "Deployments of every size are welcome — from a single quarter-cabinet to multi-megawatt campuses. The same matching process and advisory support applies regardless of footprint.",
  },
];

export const stats = [
  { value: "1,400+", label: "Facilities in network" },
  { value: "200+", label: "Global metros" },
  { value: "11M+", label: "Sq ft sourced" },
  { value: "48hr", label: "Avg. quote turnaround" },
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
    role: "Managing Partner",
    image: "/placeholder-images/people/1750707470069.webp",
  },
  {
    id: "patrick-ellis",
    name: "Patrick Ellis",
    role: "Principal Advisor",
    image: "/placeholder-images/people/1582124128804.webp",
  },
];
