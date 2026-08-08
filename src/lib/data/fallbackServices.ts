export interface FallbackFeature {
  title: string;
  description: string;
}

export interface FallbackTech {
  name: string;
  type: string;
}

export interface FallbackStep {
  title: string;
  description: string;
  duration: string;
}

export interface FallbackService {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  features: FallbackFeature[];
  techStack: FallbackTech[];
  processSteps: FallbackStep[];
  timeline: string;
}

export const fallbackServices: FallbackService[] = [
  {
    id: "svc00000000000000000001",
    title: "Web Development & Engineering",
    slug: "web-development-engineering",
    description:
      "We build high-performance web applications using Next.js, React, and modern frontend technologies — delivering blazing-fast experiences that rank higher on search engines and convert better for Nepali businesses.",
    icon: "FiMonitor",
    order: 1,
    features: [
      { title: "Custom Next.js Development", description: "Full-stack Next.js applications with App Router, Server Components, and streaming SSR." },
      { title: "Performance Optimization", description: "Fast load times on Nepali internet through code splitting, lazy loading, and caching." },
      { title: "Responsive & Mobile-First", description: "Every page tested across phones, tablets, and desktops — most of Nepal browses on mobile." },
      { title: "Local Payment Integration", description: "eSewa, Khalti, ConnectIPS, and bank transfer payment flows built in from day one." },
      { title: "SEO & Google Ready", description: "Structured data, fast pages, and clean markup so customers in Nepal can find you." },
      { title: "Ongoing Support", description: "Maintenance, speed checks, and updates after launch so your website stays healthy." },
    ],
    techStack: [
      { name: "Next.js", type: "Frontend" },
      { name: "React", type: "Frontend" },
      { name: "TypeScript", type: "Language" },
      { name: "Tailwind CSS", type: "Frontend" },
      { name: "Node.js", type: "Backend" },
      { name: "PostgreSQL", type: "Database" },
      { name: "Vercel", type: "Hosting" },
    ],
    processSteps: [
      { title: "Discovery Call", description: "We talk through your business, goals, and what the website needs to do.", duration: "1 day" },
      { title: "Design & Approval", description: "Modern UI/UX mockups for your website before any code is written.", duration: "1 week" },
      { title: "Development", description: "Your site is built page by page and you can preview it live along the way.", duration: "2-4 weeks" },
      { title: "Testing & Launch", description: "Mobile checks, speed tests, and a smooth launch with domain and hosting setup.", duration: "3-5 days" },
      { title: "Support", description: "Post-launch fixes and updates as your business grows.", duration: "Ongoing" },
    ],
    timeline: "3-6 weeks",
  },
  {
    id: "svc00000000000000000002",
    title: "Mobile App Engineering",
    slug: "mobile-app-engineering",
    description:
      "Native-quality Android and iOS apps built with React Native — with eSewa and Khalti wallet payments, offline support, and push notifications. One codebase, both stores.",
    icon: "FiSmartphone",
    order: 2,
    features: [
      { title: "Android & iOS", description: "Single codebase that runs smoothly on both platforms." },
      { title: "Nepal Payment Integration", description: "eSewa, Khalti, and Fonepay SDK wired straight into your app." },
      { title: "Push Notifications", description: "Keep customers updated with offers, orders, and reminders." },
      { title: "Offline Support", description: "Data syncs when the connection drops and comes back — common in Nepal." },
      { title: "App Store Launch", description: "We handle Google Play and App Store submission, including screenshots." },
      { title: "Post-Launch Updates", description: "Feature releases, bug fixes, and store updates as you grow." },
    ],
    techStack: [
      { name: "React Native", type: "Frontend" },
      { name: "Expo", type: "Frontend" },
      { name: "TypeScript", type: "Language" },
      { name: "Firebase", type: "Backend" },
      { name: "eSewa API", type: "Payment" },
      { name: "Khalti API", type: "Payment" },
    ],
    processSteps: [
      { title: "Product Discovery", description: "Features, user flow, and app design requirements agreed upfront.", duration: "1 week" },
      { title: "Design & Prototype", description: "App screens designed in Figma for your approval.", duration: "1-2 weeks" },
      { title: "Development", description: "Screens, payments, and features built and tested on real devices.", duration: "4-8 weeks" },
      { title: "Beta Testing", description: "TestFlight/Play beta with your real users before launch.", duration: "1-2 weeks" },
      { title: "Store Launch", description: "Google Play and App Store release handled end to end.", duration: "1 week" },
    ],
    timeline: "8-14 weeks",
  },
  {
    id: "svc00000000000000000003",
    title: "UI/UX & Product Design",
    slug: "uiux-product-design",
    description:
      "Modern, user-friendly design that converts visitors into customers. Research, wireframes, style guides, and pixel-perfect interfaces for your website or app.",
    icon: "FiCode",
    order: 3,
    features: [
      { title: "User Research", description: "Understand your customers and what makes them trust or leave a site." },
      { title: "Wireframes", description: "Clean page layouts and user flows agreed before design begins." },
      { title: "Brand Style Guide", description: "Colors, fonts, and spacing that match your logo and brand." },
      { title: "High-Fidelity Mockups", description: "Pixel-perfect screens seen in Figma before development." },
      { title: "Mobile-First Design", description: "Designed for the way Nepali users most often browse — on phones." },
    ],
    techStack: [
      { name: "Figma", type: "Design" },
      { name: "Adobe XD", type: "Design" },
      { name: "Canva", type: "Design" },
    ],
    processSteps: [
      { title: "Kickoff & Research", description: "Goals, audience, and competitor review.", duration: "2-3 days" },
      { title: "Wireframes", description: "Page structure and content layout approvals.", duration: "1 week" },
      { title: "Visual Design", description: "Final look in full color with style guide.", duration: "1-2 weeks" },
      { title: "Handoff", description: "Design files and specs given to developers.", duration: "1 day" },
    ],
    timeline: "2-4 weeks",
  },
  {
    id: "svc00000000000000000004",
    title: "E-Commerce Websites",
    slug: "ecommerce-platforms",
    description:
      "Online stores that actually sell — with eSewa, Khalti, and COD checkout, simple product management, and a mobile-first shopping experience built for Nepal.",
    icon: "FiShoppingBag",
    order: 4,
    features: [
      { title: "Nepal Payment Gateways", description: "eSewa, Khalti, ConnectIPS, and Cash on Delivery checkout." },
      { title: "Product & Order Management", description: "Add products, track stock, and manage orders from one dashboard." },
      { title: "Mobile-First Shopping", description: "A smooth store experience on the phones your customers use." },
      { title: "Delivery Partners Ready", description: "Structure ready for Pathao, Foodmandu, and courier integration." },
      { title: "Discounts & Coupons", description: "Special offers and festival campaigns with a few clicks." },
      { title: "Analytics", description: "See what sells, traffic sources, and customer behavior." },
    ],
    techStack: [
      { name: "Next.js", type: "Frontend" },
      { name: "React", type: "Frontend" },
      { name: "PostgreSQL", type: "Database" },
      { name: "eSewa API", type: "Payment" },
      { name: "Khalti API", type: "Payment" },
      { name: "Vercel", type: "Hosting" },
    ],
    processSteps: [
      { title: "Requirements", description: "Products, delivery, and payment setup discussed.", duration: "2-3 days" },
      { title: "Design", description: "Store look, colors, and product page design.", duration: "1 week" },
      { title: "Build & Setup", description: "Catalog, cart, checkout, and admin panel.", duration: "2-4 weeks" },
      { title: "Payments & Tests", description: "Live eSewa/Khalti testing with real orders.", duration: "1 week" },
      { title: "Launch", description: "Go live with training and support.", duration: "3-5 days" },
    ],
    timeline: "5-9 weeks",
  },
];

export function getFallbackServiceBySlug(slug: string): FallbackService | undefined {
  return fallbackServices.find((s) => s.slug === slug);
}