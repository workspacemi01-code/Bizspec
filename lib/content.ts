/**
 * Every word on the site, in one file.
 *
 * Copy changes far more often than layout, and a marketing site whose text is
 * scattered through components means a wording change is a code hunt. This is
 * also what CONTENT.md documents.
 *
 * Nothing here may claim a certification, partnership, metric or testimonial
 * that has not been confirmed. Where something is not yet known it is marked
 * with a TO BE ADDED placeholder rather than invented.
 */

export const site = {
  name: "Bizspec",
  tagline: "Business systems. Digital products. Practical technology.",
  /** Set NEXT_PUBLIC_SITE_URL once the domain is live; this is the fallback. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bizspec.co",
  description:
    "Bizspec helps businesses implement technology, build digital products, improve e-commerce operations and deploy practical business systems.",
  /** Interim address and number, to be swapped for the official ones. Both
   *  are overridable by environment so that swap needs no code change. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "bizspec.org@gmail.com",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+234 703 559 9433",
  /** Digits only, the form wa.me expects. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "2347035599433",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN ?? "",
  regions: ["Nigeria", "Africa", "United Kingdom"],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/academy", label: "Academy" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const hero = {
  headline: "Build better systems. Run better businesses.",
  lead: "Bizspec helps businesses implement the right technology, build digital products, improve operations, and deploy systems that work in the real world.",
  primary: { href: "/contact", label: "Work with Bizspec" },
  secondary: { href: "/services", label: "Explore our services" },
  trust: ["Business systems", "Digital products", "E-commerce", "Technology education"],
} as const;

/** The "what are you trying to solve?" router, so nobody has to understand the
 *  whole business model before finding their way. */
export const needs = [
  {
    title: "I need a business system",
    body: "Zoho implementation, CRM, inventory, business operations and automation.",
    cta: { href: "/services/zoho", label: "Explore business systems" },
  },
  {
    title: "I need a digital product",
    body: "Web applications, mobile applications, e-commerce platforms and custom systems.",
    cta: { href: "/services#product-development", label: "Build my product" },
  },
  {
    title: "I need help launching",
    body: "Testing, deployment, integrations, troubleshooting and production support.",
    cta: { href: "/services#testing-deployment", label: "Get technical support" },
  },
  {
    title: "I want to improve my e-commerce operation",
    body: "E-commerce systems, inventory, websites and operational workflows.",
    cta: { href: "/services#ecommerce", label: "Improve my e-commerce" },
  },
  {
    title: "I want to learn",
    body: "Practical courses covering product, e-commerce, inventory, AI and technology.",
    cta: { href: "/academy", label: "Explore Bizspec Academy" },
  },
] as const;

export const services = [
  {
    id: "zoho",
    title: "Zoho implementation & support",
    summary:
      "Help businesses select, configure, implement and maintain Zoho applications.",
    items: [
      "CRM",
      "Books",
      "Inventory",
      "Desk",
      "People",
      "SalesIQ",
      "Automation",
      "Integrations",
      "Custom workflows",
      "Ongoing support",
    ],
    cta: { href: "/services/zoho", label: "Explore Zoho services" },
  },
  {
    id: "product-development",
    title: "Web application development",
    summary:
      "Build custom web applications designed around specific business processes.",
    items: [
      "Business management systems",
      "Internal platforms",
      "Customer portals",
      "Booking systems",
      "Operational platforms",
    ],
  },
  {
    id: "mobile",
    title: "Mobile application development",
    summary:
      "Design and develop mobile applications for businesses and digital products.",
    items: [],
  },
  {
    id: "ecommerce",
    title: "E-commerce development",
    summary: "Build and support e-commerce websites and systems.",
    items: [
      "E-commerce websites",
      "Product management",
      "Order management",
      "Inventory",
      "Payments",
      "Integrations",
      "Operational workflows",
    ],
  },
  {
    id: "inventory",
    title: "Inventory management",
    summary: "Help businesses establish better inventory processes and technology.",
    items: [
      "Inventory system implementation",
      "Stock management",
      "Product structure",
      "Multi-location inventory",
      "Workflow configuration",
      "System integration",
    ],
  },
  {
    id: "testing-deployment",
    title: "Testing & deployment",
    summary:
      "Help teams move products from development into reliable production environments.",
    items: [
      "Functional testing",
      "QA",
      "User acceptance testing",
      "Deployment support",
      "Production configuration",
      "Troubleshooting",
    ],
  },
] as const;

export const differentiators = [
  {
    title: "Business-first thinking",
    body: "Technology should solve an actual business problem, not simply exist because it can be built.",
  },
  {
    title: "Practical implementation",
    body: "We focus on systems that teams can actually use and maintain.",
  },
  {
    title: "Product thinking",
    body: "We understand requirements, workflows, users, operations and business outcomes.",
  },
  {
    title: "Technical execution",
    body: "From development and testing to integrations and deployment, Bizspec can support the complete delivery cycle.",
  },
  {
    title: "Long-term support",
    body: "Technology does not end at launch. Businesses often need optimisation, support and continuous improvement.",
  },
] as const;

export const howWeWork = [
  { step: "01", title: "Understand", body: "We learn about your business, users, existing systems and challenges." },
  { step: "02", title: "Define", body: "We translate the problem into requirements, workflows and a practical solution." },
  { step: "03", title: "Build or implement", body: "We configure, integrate, develop or deploy the required system." },
  { step: "04", title: "Test & launch", body: "We validate the solution and support production deployment." },
  { step: "05", title: "Support & improve", body: "We continue improving the system as the business evolves." },
] as const;

/** Descriptions stay at what has been confirmed. No invented features. */
/**
 * The product list.
 *
 * Name, category and what it does \u2014 no status badge and no link, because a
 * "Live" chip over a link that goes nowhere is the one thing on a site that
 * loses a reader at the moment they click. Each product gets a link and a
 * screenshot when it has somewhere real to point.
 */
export const products = [
  {
    name: "Styles2Fit",
    category: "Fashion technology",
    body: "An AI-enabled fashion platform connecting fashion businesses and customers.",
  },
  {
    name: "Space Booking System",
    category: "Booking & reservations",
    body: "A digital platform for managing spaces, bookings and reservations.",
  },
  {
    name: "Budgeting System",
    category: "Finance & planning",
    body: "A practical budgeting and financial planning platform.",
  },
  {
    name: "Bummitestore",
    category: "E-commerce",
    body: "An e-commerce platform.",
  },
] as const;

/** Only clients we may name publicly. No metrics, logos or outcomes invented. */
/**
 * Client work, shown without naming anyone.
 *
 * Nothing here identifies a business, so no permission is needed to publish
 * it and no confidence is broken. Everything stated is true of the engagements
 * as they stand; a named case study can replace this later, with consent.
 */
export const clientWork = {
  headline: "Businesses we support on Zoho",
  lead: "We work with retail, apparel and services businesses across Nigeria and the United Kingdom. We do not publish client names \u2014 references are shared privately, with the client's permission, once a conversation is serious.",
  /**
   * Figures that are counted, not claimed. Confirm before changing:
   *  3 = businesses currently on ongoing support
   *  2 = Nigeria and the United Kingdom
   *  6 = the Zoho applications listed under our Zoho service, i.e. what we
   *      implement \u2014 not a count of what any one client runs
   */
  facts: [
    { value: "3", label: "businesses on ongoing support" },
    { value: "2", label: "countries" },
    { value: "6", label: "Zoho applications we implement" },
  ],
  /** What the engagements actually consist of. */
  disciplines: [
    "Zoho CRM configured around an existing sales process",
    "Zoho Books and Inventory kept in step with each other",
    "Migration from spreadsheets and disconnected tools",
    "Integration between Zoho and an online store",
    "Team training, so the system survives the handover",
    "Ongoing support once the implementation is done",
  ],
} as const;

export const zoho = {
  headline: "Make Zoho work for your business",
  lead: "From setup and configuration to integrations, automation and ongoing support, Bizspec helps businesses turn Zoho into a practical business operating system.",
  apps: ["Zoho CRM", "Zoho Books", "Zoho Inventory", "Zoho Desk", "Zoho People", "Zoho SalesIQ"],
  flow: [
    { title: "Discover", body: "Understand your business and requirements." },
    { title: "Configure", body: "Set up the right Zoho applications and workflows." },
    { title: "Integrate", body: "Connect Zoho with the tools your business already uses." },
    { title: "Train", body: "Help your team understand and use the system." },
    { title: "Support", body: "Provide ongoing technical and operational assistance." },
  ],
  cta: { href: "/contact?topic=zoho-implementation", label: "Talk to a Zoho specialist" },
} as const;

export const academy = {
  headline: "Learn technology that solves real business problems.",
  lead: "Bizspec Academy focuses on practical skills for people building, managing and growing digital businesses.",
  /** Courses are not open for enrolment yet, so the primary action is a
   *  waitlist rather than a checkout. */
  enrolmentOpen: false,
  courses: [
    {
      title: "Marketing with AI",
      body: "Learn how AI can support modern marketing workflows and content operations.",
    },
    {
      title: "Product Management",
      body: "Learn how to understand problems, define requirements, prioritise features and manage digital products.",
    },
    {
      title: "E-commerce Management",
      body: "Learn how to operate and improve e-commerce businesses.",
    },
    {
      title: "Inventory Management",
      body: "Understand inventory processes, systems and operational control.",
    },
    {
      title: "Technical Product Management",
      body: "Develop the technical understanding needed to work effectively with engineering teams and digital products.",
    },
  ],
} as const;

export const about = {
  headline: "Technology should make business simpler.",
  story: [
    "Bizspec works at the point where business operations meet technology. We implement business systems, build digital products, improve e-commerce and inventory operations, and support teams through testing, deployment and the work that follows a launch.",
    "We also teach. Bizspec Academy exists because the systems we build are only as good as the people running them, and practical skills are harder to find than tools.",
  ],
  beliefs: [
    "Technology should be understandable.",
    "Systems should serve the people using them.",
    "Products should solve real problems.",
    "Implementation should continue beyond configuration.",
    "Learning should be practical.",
  ],
} as const;

export const contactTopics = [
  "Zoho implementation",
  "Zoho support",
  "Web application",
  "Mobile application",
  "E-commerce",
  "Inventory management",
  "Testing & QA",
  "Deployment",
  "Business system",
  "Academy",
  "Other",
] as const;

export const closingCta = {
  headline: "Have a business problem that technology can solve?",
  lead: "Tell us what you're trying to build, improve or implement. We'll help you identify the next practical step.",
  primary: { href: "/contact", label: "Start a conversation" },
  secondary: { href: "/services", label: "Explore services" },
} as const;
