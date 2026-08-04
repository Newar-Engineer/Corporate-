import { Pool } from "pg";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 1,
});

async function query(sql: string, params?: any[]) {
  const client = await pool.connect();
  try {
    return await client.query(sql, params);
  } finally {
    client.release();
  }
}

async function main() {
  console.log("Seeding database...");

  // Clear existing data for tables with changed content
  await query(`DELETE FROM "Service" WHERE "id" LIKE 'svc%'`);
  await query(`DELETE FROM "PortfolioItem" WHERE "id" LIKE 'pf%'`);
  await query(`DELETE FROM "Testimonial" WHERE "id" LIKE 'tt%'`);
  await query(`DELETE FROM "TeamMember" WHERE "id" LIKE 'tm%'`);
  await query(`DELETE FROM "Post" WHERE "id" LIKE 'bp%'`);

  // Create admin user
  const adminHash = "$2a$12$LJ3m4ys3Lk0TSwHnbfOMiOXPm1Qlq5GzGqZy8xKz5p8pBzFv1qKqO";
  const editorHash = "$2a$12$LJ3m4ys3Lk0TSwHnbfOMiOXPm1Qlq5GzGqZy8xKz5p8pBzFv1qKqO";

  await query(
    `INSERT INTO "User" ("id", "email", "password", "name", "role", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, NOW())
     ON CONFLICT ("id") DO UPDATE SET "email" = EXCLUDED."email", "name" = EXCLUDED."name", "role" = EXCLUDED."role"`,
    ["cm0000000000000000000001", "admin@newatech.com", adminHash, "Super Admin", "super-admin"]
  );
  await query(
    `INSERT INTO "User" ("id", "email", "password", "name", "role", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, NOW())
     ON CONFLICT ("id") DO UPDATE SET "email" = EXCLUDED."email", "name" = EXCLUDED."name", "role" = EXCLUDED."role"`,
    ["cm0000000000000000000002", "editor@newatech.com", editorHash, "Editor User", "editor"]
  );
  console.log("Created users");

  // Create services with rich content
  const services = [
    {
      id: "svc00000000000000000001",
      title: "Web Development & Engineering",
      slug: "web-development-engineering",
      description: "We build high-performance web applications using Next.js 16, React 19, and cutting-edge frontend technologies. Our engineering team specializes in server-side rendering, static generation, API routes, and edge functions â€” delivering blazing-fast experiences that rank higher on search engines and convert better.",
      icon: "FiMonitor",
      order: 1,
      features: JSON.stringify([
        { title: "Custom Next.js Development", description: "Full-stack Next.js applications with App Router, Server Components, and streaming SSR." },
        { title: "Performance Optimization", description: "Lighthouse scores of 95+ through code splitting, lazy loading, and edge caching strategies." },
        { title: "Headless CMS Integration", description: "Seamless integration with Strapi, Sanity, Contentful, or custom headless backends." },
        { title: "API & Microservices", description: "RESTful and GraphQL API design with Node.js, tRPC, and serverless functions." },
        { title: "Responsive & Accessible", description: "WCAG 2.1 AA compliant, mobile-first responsive design tested across all devices." },
        { title: "CI/CD & DevOps", description: "Automated testing, continuous deployment via Vercel/AWS, and performance monitoring." },
      ]),
      techStack: JSON.stringify([
        { name: "Next.js 16", type: "Frontend" },
        { name: "React 19", type: "Frontend" },
        { name: "TypeScript", type: "Language" },
        { name: "Tailwind CSS v4", type: "Frontend" },
        { name: "Node.js", type: "Backend" },
        { name: "PostgreSQL", type: "Database" },
        { name: "Prisma 7", type: "Backend" },
        { name: "tRPC", type: "Backend" },
        { name: "Vercel", type: "Hosting" },
        { name: "AWS", type: "Cloud" },
      ]),
      processSteps: JSON.stringify([
        { title: "Discovery & Technical Audit", description: "Analyze requirements, audit existing systems, and define technical architecture.", duration: "1 week" },
        { title: "Architecture & Design", description: "Design component tree, data flow, API structure, and database schema.", duration: "1 week" },
        { title: "Sprint-Based Development", description: "Agile development with 2-week sprints, daily standups, and client demos.", duration: "4-12 weeks" },
        { title: "Testing & QA", description: "Unit tests, integration tests, E2E testing, and performance benchmarking.", duration: "1-2 weeks" },
        { title: "Deployment & Launch", description: "Production deployment with CI/CD, DNS setup, and SSL configuration.", duration: "3-5 days" },
        { title: "Monitoring & Support", description: "Real-time performance monitoring, error tracking, and 24/7 support.", duration: "Ongoing" },
      ]),
      timeline: "6-16 weeks",
    },
    {
      id: "svc00000000000000000002",
      title: "Mobile App Engineering",
      slug: "mobile-app-engineering",
      description: "Native-quality cross-platform mobile applications built with React Native and Expo. From fintech to e-commerce, our apps deliver smooth 60fps experiences with offline support, push notifications, and deep platform integration â€” all from a single TypeScript codebase.",
      icon: "FiSmartphone",
      order: 2,
      features: JSON.stringify([
        { title: "Cross-Platform Development", description: "Single codebase targeting iOS and Android with React Native and Expo SDK." },
        { title: "Native Module Integration", description: "Camera, GPS, biometrics, NFC, and hardware sensor integration." },
        { title: "Offline-First Architecture", description: "Local data persistence with SQLite, WatermelonDB, and background sync." },
        { title: "Push Notifications", description: "Firebase Cloud Messaging and APNs integration with rich media notifications." },
        { title: "App Store Deployment", description: "End-to-end App Store and Google Play submission including screenshots and metadata." },
        { title: "Performance Monitoring", description: "Crashlytics, performance tracking, and user analytics integration." },
      ]),
      techStack: JSON.stringify([
        { name: "React Native", type: "Frontend" },
        { name: "Expo SDK", type: "Frontend" },
        { name: "TypeScript", type: "Language" },
        { name: "WatermelonDB", type: "Database" },
        { name: "Firebase", type: "Backend" },
        { name: "OneSignal", type: "Notifications" },
        { name: "Stripe", type: "Payment" },
        { name: "Fastlane", type: "DevOps" },
      ]),
      processSteps: JSON.stringify([
        { title: "Product Discovery", description: "Define user stories, app architecture, and technical specifications.", duration: "1 week" },
        { title: "UI/UX & Prototyping", description: "Design interactive prototypes in Figma with user flow validation.", duration: "2 weeks" },
        { title: "Core Development", description: "Build screens, navigation, API integration, and business logic.", duration: "6-10 weeks" },
        { title: "Testing & Beta", description: "TestFlight and Google Play beta testing with crash reporting.", duration: "2 weeks" },
        { title: "Store Submission", description: "App Store and Google Play review preparation and submission.", duration: "1 week" },
        { title: "Post-Launch Support", description: "Ongoing maintenance, updates, and feature enhancements.", duration: "Ongoing" },
      ]),
      timeline: "10-16 weeks",
    },
    {
      id: "svc00000000000000000003",
      title: "UI/UX & Product Design",
      slug: "uiux-product-design",
      description: "Data-driven product design that converts. Our design team combines user research, interaction design, and visual craftsmanship to create interfaces that are intuitive, accessible, and beautiful. Every pixel is purposeful â€” optimized for engagement, retention, and business growth.",
      icon: "FiMonitor",
      order: 3,
      features: JSON.stringify([
        { title: "User Research & Testing", description: "User interviews, surveys, usability testing, and heatmap analysis." },
        { title: "Wireframing & Prototyping", description: "Low-fidelity wireframes to high-fidelity interactive prototypes in Figma." },
        { title: "Design Systems", description: "Scalable component libraries with design tokens, variants, and documentation." },
        { title: "Interaction Design", description: "Micro-interactions, animations, and gesture-based navigation design." },
        { title: "Accessibility Audits", description: "WCAG 2.1 compliance audits with actionable remediation recommendations." },
        { title: "Visual Design", description: "Brand-aligned visual design with typography, color theory, and iconography." },
      ]),
      techStack: JSON.stringify([
        { name: "Figma", type: "Design" },
        { name: "Storybook", type: "Design" },
        { name: "Framer Motion", type: "Frontend" },
        { name: "Lottie", type: "Animation" },
        { name: "Hotjar", type: "Analytics" },
        { name: "Zeroheight", type: "Design" },
      ]),
      processSteps: JSON.stringify([
        { title: "Research & Discovery", description: "User research, competitor analysis, and stakeholder interviews.", duration: "1-2 weeks" },
        { title: "Information Architecture", description: "Sitemaps, user flows, and content strategy development.", duration: "1 week" },
        { title: "Wireframing", description: "Low-fidelity wireframes for layout and functionality validation.", duration: "1 week" },
        { title: "Visual Design", description: "High-fidelity mockups with full design system documentation.", duration: "2-3 weeks" },
        { title: "Prototyping & Testing", description: "Interactive prototypes with usability testing and iteration.", duration: "1 week" },
        { title: "Developer Handoff", description: "Annotated designs, asset export, and design QA during development.", duration: "Ongoing" },
      ]),
      timeline: "4-8 weeks",
    },
    {
      id: "svc00000000000000000004",
      title: "E-Commerce Websites",
      slug: "ecommerce-platforms",
      description: "Revenue-generating e-commerce platforms with Nepal's preferred payment gateways â€” eSewa, Khalti, and COD. We build custom storefronts, marketplace platforms, and subscription-based e-commerce systems optimized for conversion and mobile-first shopping behavior.",
      icon: "FiShoppingBag",
      order: 4,
      features: JSON.stringify([
        { title: "Custom Storefront", description: "Next.js-powered storefronts with ISR for instant product page loads." },
        { title: "Nepal Payment Integration", description: "eSewa, Khalti, ConnectIPS, and Cash on Delivery payment gateways." },
        { title: "Inventory & Order Management", description: "Real-time stock tracking, automated order processing, and fulfillment." },
        { title: "Multi-Vendor Marketplace", description: "Vendor dashboards, commission management, and dispute resolution." },
        { title: "Subscription & Recurring", description: "Subscription plans, recurring billing, and customer portal." },
        { title: "Analytics & Reporting", description: "Sales dashboards, customer analytics, and inventory forecasting." },
      ]),
      techStack: JSON.stringify([
        { name: "Next.js", type: "Frontend" },
        { name: "React", type: "Frontend" },
        { name: "TypeScript", type: "Language" },
        { name: "Node.js", type: "Backend" },
        { name: "PostgreSQL", type: "Database" },
        { name: "eSewa API", type: "Payment" },
        { name: "Khalti API", type: "Payment" },
        { name: "Stripe", type: "Payment" },
        { name: "Redis", type: "Cache" },
        { name: "Vercel", type: "Hosting" },
      ]),
      processSteps: JSON.stringify([
        { title: "Business Analysis", description: "Understand business model, catalog size, payment needs, and target audience.", duration: "1 week" },
        { title: "UX & Store Design", description: "Design product pages, cart, checkout flow, and mobile experience.", duration: "2 weeks" },
        { title: "Platform Development", description: "Build catalog, cart, checkout, payment integration, and admin panel.", duration: "6-8 weeks" },
        { title: "Payment Gateway Testing", description: "End-to-end testing of eSewa, Khalti, and COD payment flows.", duration: "1 week" },
        { title: "Inventory & Order Setup", description: "Configure inventory management, order processing, and notification system.", duration: "1 week" },
        { title: "Launch & Optimization", description: "Production launch with performance tuning and post-launch monitoring.", duration: "1 week" },
      ]),
      timeline: "10-14 weeks",
    },
  ];

  for (const svc of services) {
    await query(
      `INSERT INTO "Service" ("id","title","slug","description","icon","order","features","techStack","processSteps","timeline","isActive","updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7::json,$8::json,$9::json,$10,true,NOW())`,
      [svc.id, svc.title, svc.slug, svc.description, svc.icon, svc.order, svc.features, svc.techStack, svc.processSteps, svc.timeline]
    );
  }
  console.log(`Created ${services.length} services`);

  // Create team members
  const team = [
    { id: "tm00000000000000000001", name: "Rajesh Shrestha", role: "CEO & Founder", bio: "With over 15 years of experience in technology and business development, Rajesh founded Newa Tech to help Nepali businesses grow online. He oversees company strategy, key partnerships, and client relationships. A proud Newar businessman from Baneshwor, he is deeply committed to building Nepal's technology ecosystem.", socialLinks: JSON.stringify({ linkedin: "https://linkedin.com/in/rajesh-shrestha", twitter: "https://twitter.com/rajeshne" }), order: 1 },
    { id: "tm00000000000000000002", name: "Anil Bajracharya", role: "CTO & Head of Engineering", bio: "Anil leads the engineering team and drives technical strategy across all service lines. A computer engineering graduate from Pulchowk Campus, he has architected e-commerce platforms, payment gateways, and enterprise systems serving over 100+ Nepali businesses. He specializes in Next.js, React Native, and cloud architecture.", socialLinks: JSON.stringify({ linkedin: "https://linkedin.com/in/anil-bajracharya", github: "https://github.com/anilbajra" }), order: 2 },
    { id: "tm00000000000000000003", name: "Priya Maharjan", role: "VP of Product Design", bio: "Priya brings 10+ years of UX design leadership from both agency and product environments. She has led design initiatives for fintech, e-commerce, and SaaS products used by millions. Her design philosophy centers on data-informed decisions and inclusive design practices.", socialLinks: JSON.stringify({ linkedin: "https://linkedin.com/in/priya-maharjan", twitter: "https://twitter.com/priyamaha" }), order: 3 },
    { id: "tm00000000000000000004", name: "Sagar Karmacharya", role: "Lead Full-Stack Engineer", bio: "Sagar is a full-stack engineer with deep expertise in React, Node.js, and PostgreSQL. He has built and scaled multiple SaaS platforms from zero to production. He is passionate about clean architecture, type safety, and developer experience.", socialLinks: JSON.stringify({ linkedin: "https://linkedin.com/in/sagar-karmacharya", github: "https://github.com/sagarkar" }), order: 4 },
    { id: "tm00000000000000000005", name: "Riya Shrestha", role: "Senior Frontend Engineer", bio: "Riya is a senior frontend engineer specializing in React, Next.js, and design systems. With 6 years of industry experience, she has built high-performing websites and web apps for e-commerce, healthcare, and fintech clients across South Asia.", socialLinks: JSON.stringify({ linkedin: "https://linkedin.com/in/riya-shrestha" }), order: 5 },
    { id: "tm00000000000000000006", name: "Amit Joshi", role: "Senior Backend & DevOps Engineer", bio: "Amit is a certified AWS Solutions Architect with 8+ years of experience building secure, scalable backends and deploying web applications to production. He specializes in Node.js, PostgreSQL, and CI/CD automation for fast, reliable releases.", socialLinks: JSON.stringify({ linkedin: "https://linkedin.com/in/amit-joshi", github: "https://github.com/amitjoshi" }), order: 6 },
  ];
  for (const m of team) {
    await query(
      `INSERT INTO "TeamMember" ("id","name","role","bio","socialLinks","order","updatedAt") VALUES ($1,$2,$3,$4,$5::json,$6,NOW()) ON CONFLICT DO NOTHING`,
      [m.id, m.name, m.role, m.bio, m.socialLinks, m.order]
    );
  }
  console.log(`Created ${team.length} team members`);

  // Create testimonials
  const testimonials = [
    { id: "tt00000000000000000001", clientName: "Rabi Shakya", company: "ShopNepal Pvt. Ltd.", message: "Newa Tech delivered our mobile app in record time without compromising quality. The eSewa and Khalti payment integration was flawless, and the AI recommendations have been a game-changer for our sales. They truly understand both the technology and the Nepal market â€” a rare combination.", rating: 5, approved: true },
    { id: "tt00000000000000000002", clientName: "Amit Pradhan", company: "FinFlow Technologies", message: "The analytics dashboard transformed how we run our business. What used to take half a day of Excel work now loads in under 30 seconds. The fraud detection module alone paid for the entire project within weeks of deployment.", rating: 5, approved: true },
    { id: "tt00000000000000000003", clientName: "Dr. Sunita KC", company: "HealthFirst Nepal", message: "The healthcare booking platform has been a lifesaver for our patients and staff. Patient wait times dropped from 45 minutes to just 12 minutes, and the telemedicine integration was seamless. Newa Tech understood healthcare compliance requirements from day one.", rating: 5, approved: true },
    { id: "tt00000000000000000004", clientName: "Kiran Basnet", company: "Himalayan Group of Companies", message: "NepalERP transformed our business operations across all 7 departments. The month-end closing that used to take 15 days of manual work now happens automatically in 2 days. The VAT automation alone has saved us lakhs in potential penalties.", rating: 5, approved: true },
    { id: "tt00000000000000000005", clientName: "Bishnu Adhikari", company: "Kathmandu Metropolitan City", message: "The smart city platform has given us unprecedented visibility into how our city functions. The air quality monitoring and waste management optimization have been invaluable for public policy. Newa Tech delivered a world-class solution for Kathmandu.", rating: 5, approved: true },
  ];
  for (const t of testimonials) {
    await query(
      `INSERT INTO "Testimonial" ("id","clientName","company","message","rating","approved","updatedAt") VALUES ($1,$2,$3,$4,$5,$6,NOW()) ON CONFLICT DO NOTHING`,
      [t.id, t.clientName, t.company, t.message, t.rating, t.approved]
    );
  }
  console.log(`Created ${testimonials.length} testimonials`);

  // Create portfolio items with rich case study content
  const portfolio: Array<{
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    client: string;
    link?: string;
    clientOverview?: string;
    problem?: string;
    solution?: string;
    results?: string;
    metrics?: string;
    techStack?: string;
    gallery?: string;
    testimonial?: string;
    testimonialAuthor?: string;
    testimonialRole?: string;
    completionDate?: string;
  }> = [
    {
      id: "pf00000000000000000001",
      title: "Personal Portfolio Website",
      slug: "manoj-portfolio",
      description: "A modern personal portfolio website built with Next.js â€” clean design, smooth GSAP animations, project showcase, and a contact section. Shows exactly the level of polish we deliver for personal brands.",
      category: "Portfolio Website",
      client: "Manoj Joshi",
      link: "https://manoj-portfolio-eta.vercel.app/",
      metrics: JSON.stringify([
        { label: "Custom Build", value: "100%" },
        { label: "Fully Responsive", value: "100%" },
        { label: "Smooth Animations", value: "GSAP" },
        { label: "Deployed On", value: "Vercel" },
      ]),
      techStack: JSON.stringify([
        { name: "Next.js", type: "Frontend" },
        { name: "React", type: "Frontend" },
        { name: "Tailwind CSS", type: "Design" },
        { name: "Vercel", type: "Platform" },
      ]),
    },
    {
      id: "pf00000000000000000002",
      title: "Milton International College",
      slug: "milton-international-college",
      description: "An admissions-focused website for Milton International College â€” program listings, admission information, and a clean institutional design that builds trust with students and parents.",
      category: "Education",
      client: "Milton International College",
      link: "https://milton-teal.vercel.app/",
      metrics: JSON.stringify([
        { label: "Programs Showcased", value: "15+" },
        { label: "Fully Responsive", value: "100%" },
        { label: "Admission-Focused", value: "Yes" },
        { label: "Deployed On", value: "Vercel" },
      ]),
      techStack: JSON.stringify([
        { name: "Next.js", type: "Frontend" },
        { name: "React", type: "Frontend" },
        { name: "Tailwind CSS", type: "Design" },
        { name: "Vercel", type: "Platform" },
      ]),
    },
    {
      id: "pf00000000000000000003",
      title: "Coding House â€” IT Training Center",
      slug: "coding-house",
      description: "A website for Coding House, an IT training center â€” course listings, testimonials, and an engaging design that makes enrolling in programming courses simple and exciting.",
      category: "Education",
      client: "Coding House",
      link: "https://coding-house.vercel.app/",
      metrics: JSON.stringify([
        { label: "Courses Listed", value: "12+" },
        { label: "Fully Responsive", value: "100%" },
        { label: "Enrollment-Focused", value: "Yes" },
        { label: "Deployed On", value: "Vercel" },
      ]),
      techStack: JSON.stringify([
        { name: "Next.js", type: "Frontend" },
        { name: "React", type: "Frontend" },
        { name: "Tailwind CSS", type: "Design" },
        { name: "Vercel", type: "Platform" },
      ]),
    },
    {
      id: "pf00000000000000000004",
      title: "E-Commerce Store",
      slug: "ecommerce-store",
      description: "A complete online store with product listings, cart, and checkout flow â€” ready for eSewa and Khalti payment integration. Built to help you start selling online fast.",
      category: "E-Commerce",
      client: "Newa Tech Demo Store",
      link: "https://e-commerce-nu-brown.vercel.app/",
      metrics: JSON.stringify([
        { label: "Product Ready", value: "50+" },
        { label: "Cart & Checkout", value: "Built" },
        { label: "Payments", value: "eSewa/Khalti" },
        { label: "Deployed On", value: "Vercel" },
      ]),
      techStack: JSON.stringify([
        { name: "Next.js", type: "Frontend" },
        { name: "React", type: "Frontend" },
        { name: "Tailwind CSS", type: "Design" },
        { name: "Vercel", type: "Platform" },
      ]),
    },
    {
      id: "pf00000000000000000005",
      title: "Fast Food Restaurant",
      slug: "fast-food-restaurant",
      description: "A mouth-watering restaurant website with a menu showcase, gallery, and online ordering â€” built to bring hungry customers in and keep them coming back.",
      category: "Food & Restaurant",
      client: "Fast Food Restaurant",
      link: "https://fast-food-theta-nine.vercel.app/",
      metrics: JSON.stringify([
        { label: "Menu Items", value: "30+" },
        { label: "Online Ordering", value: "Built" },
        { label: "Fully Responsive", value: "100%" },
        { label: "Deployed On", value: "Vercel" },
      ]),
      techStack: JSON.stringify([
        { name: "Next.js", type: "Frontend" },
        { name: "React", type: "Frontend" },
        { name: "Tailwind CSS", type: "Design" },
        { name: "Vercel", type: "Platform" },
      ]),
    },
  ];
  for (const p of portfolio) {
    await query(
      `INSERT INTO "PortfolioItem" ("id","title","slug","description","category","client","link","clientOverview","problem","solution","results","metrics","techStack","gallery","testimonial","testimonialAuthor","testimonialRole","completionDate","isActive","updatedAt")
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::json,$13::json,$14::json,$15,$16,$17,$18::date,true,NOW())`,
      [p.id, p.title, p.slug, p.description, p.category, p.client, p.link || null,
       p.clientOverview || null, p.problem || null, p.solution || null, p.results || null,
       p.metrics || null, p.techStack || null, p.gallery || null,
       p.testimonial || null, p.testimonialAuthor || null, p.testimonialRole || null,
       p.completionDate]
    );
  }
  console.log(`Created ${portfolio.length} portfolio items`);

  // Create blog posts
  const posts = [
    {
      id: "bp00000000000000000001",
      title: "Why Next.js 16 & Turbopack is a Game Changer for Enterprise Web Apps",
      slug: "nextjs-16-turbopack-game-changer",
      content: `<p>Next.js 16 has arrived, and it's not just another incremental update â€” it represents a fundamental shift in how we build and deploy enterprise web applications. Combined with Turbopack, the Rust-based bundler that replaces Webpack, this release delivers performance improvements that directly impact your bottom line.</p>

<h2>What's New in Next.js 16</h2>
<p>Next.js 16 introduces the stable App Router as the default, Server Components as a first-class citizen, and streaming SSR that sends HTML progressively to the browser. For enterprise applications handling large datasets, this means Time to First Byte (TTFB) improvements of 40-60% compared to Pages Router.</p>

<h2>Turbopack: 700x Faster Than Webpack</h2>
<p>Turbopack, built in Rust by the Vercel team, achieves cold starts 700x faster than Webpack and hot module replacements that are effectively instant. In our testing at Newa Tech, a Next.js enterprise application with 2,000+ components that previously took 45 seconds for a production build now compiles in under 4 seconds.</p>

<h2>Why This Matters for Nepali Businesses</h2>
<p>For Nepali enterprises operating on slower internet connections, the reduced bundle sizes and faster load times translate directly to better user engagement. Our e-commerce clients have seen conversion rate improvements of 15-25% after migrating from traditional SPAs to Next.js 16 with Turbopack.</p>

<p>At Newa Tech, we've already migrated 12 enterprise clients to Next.js 16. The performance improvements have been dramatic â€” average Lighthouse scores went from 65 to 95+, and server costs decreased by 40% due to more efficient edge caching.</p>`,
      excerpt: "Next.js 16 with Turbopack delivers 700x faster builds, 40-60% faster page loads, and lower infrastructure costs. Here's why your enterprise should upgrade.",
      author: "Anil Bajracharya",
      publishedAt: "2026-07-20",
      status: "published",
    },
    {
      id: "bp00000000000000000002",
      title: "Building Scalable FinTech Systems with Node.js & PostgreSQL",
      slug: "scalable-fintech-nodejs-postgresql",
      content: `<p>The fintech sector in Nepal is growing exponentially. Digital lending platforms processed over NPR 50 billion in transactions last year alone. Building systems that can handle this scale reliably requires careful architectural decisions.</p>

<h2>Why Node.js for FinTech</h2>
<p>Node.js's event-driven, non-blocking I/O model makes it ideal for financial applications handling thousands of concurrent transactions. Combined with TypeScript for type safety, we've built systems that process 500,000+ transactions daily with 99.9% uptime.</p>

<h2>PostgreSQL: The Right Choice for Financial Data</h2>
<p>While NoSQL databases have their place, financial transactions demand ACID compliance. PostgreSQL's support for advanced indexing, materialized views, and native JSONB makes it perfect for fintech workloads. We've achieved sub-10ms query times on tables with 50 million+ rows using proper indexing strategies and connection pooling with PgBouncer.</p>

<h2>Real-World Results</h2>
<p>Our FinFlow project (a digital lending analytics platform) processes 500,000+ transactions daily with sub-second dashboard load times. The key was combining PostgreSQL materialized views with Redis caching and implementing proper database sharding for future scalability.</p>`,
      excerpt: "How to architect fintech systems that handle 500,000+ daily transactions with 99.9% uptime using Node.js, TypeScript, and PostgreSQL.",
      author: "Anil Bajracharya",
      publishedAt: "2026-06-25",
      status: "published",
    },
    {
      id: "bp00000000000000000003",
      title: "The Complete Guide to eSewa & Khalti API Integration",
      slug: "esewa-khalti-api-integration-guide",
      content: `<p>Integrating Nepal's digital payment gateways is essential for any business serving Nepali customers. eSewa (5M+ users) and Khalti (3M+ users) together cover the majority of Nepal's digital payment market. Here's our comprehensive guide to integrating both.</p>

<h2>Understanding the Payment Landscape</h2>
<p>Nepal's payment ecosystem is unique. While eSewa and Khalti dominate digital wallets, Cash on Delivery (COD) still accounts for 40% of e-commerce transactions. A well-designed checkout flow should offer all three options while intelligently defaulting to the user's preferred payment method.</p>

<h2>Technical Integration</h2>
<p>Both eSewa and Khalti offer REST APIs for payment initiation, verification, and refund processing. The key considerations are: implementing proper webhook verification using HMAC-SHA256 signatures, handling idempotency for retry scenarios (network issues are common in Nepal), and designing a fallback flow when one gateway is down.</p>

<h2>Security Best Practices</h2>
<p>Never expose API keys on the client side. Use server-side API routes (Next.js API routes or Node.js middleware) to proxy payment requests. Implement request signing, rate limiting, and fraud detection. Store transaction logs in PostgreSQL for audit trails.</p>

<p>At Newa Tech, we've integrated these gateways for 25+ clients. Our average integration time is 3 days, and our systems handle 99.9% payment success rates.</p>`,
      excerpt: "A technical guide to integrating eSewa and Khalti payment gateways into your Next.js or Node.js application with security best practices.",
      author: "Sagar Karmacharya",
      publishedAt: "2026-05-15",
      status: "published",
    },
    {
      id: "bp00000000000000000004",
      title: "From Zero to Production: Deploying Next.js Apps on Vercel",
      slug: "deploying-nextjs-vercel-production",
      content: `<p>Vercel is the premier hosting platform for Next.js applications, offering edge functions, automatic ISR cache invalidation, and global CDN distribution. Here's our battle-tested deployment playbook.</p>

<h2>Environment Configuration</h2>
<p>Proper environment management is critical. Use Vercel's Environment Variables UI for staging, preview, and production environments. Never hardcode secrets â€” use Vercel's built-in encryption for environment variables and consider using a secrets manager like Doppler for larger teams.</p>

<h2>Build Optimization</h2>
<p>Our production Next.js 16 builds went from 8 minutes to 45 seconds by implementing: proper dependency caching in Turbo mode, selective ESM/CJS module resolution, and parallel route compilation. The Vercel Remote Caching feature reduced our team's collective build time by 70%.</p>

<h2>Monitoring & Observability</h2>
<p>Don't launch without monitoring. We integrate Sentry for error tracking, Datadog for performance monitoring, and Vercel Analytics for real-time user insights. Set up Slack alerts for build failures, error rate spikes, and performance regressions. Our standard SLA is 15-minute response time for production incidents.</p>

<h2>Cost Optimization</h2>
<p>Vercel's Pro plan with team seats costs $300/month for most mid-size applications. Optimize costs by: implementing proper ISR revalidation intervals (don't revalidate every page every 10 seconds!), using Edge Functions only when necessary, and monitoring bandwidth usage through Vercel's analytics dashboard.</p>`,
      excerpt: "A production deployment playbook for Next.js 16 on Vercel â€” environment management, build optimization, monitoring, and cost control.",
      author: "Amit Joshi",
      publishedAt: "2026-04-20",
      status: "published",
    },
  ];
  for (const p of posts) {
    await query(
      `INSERT INTO "Post" ("id","title","slug","content","excerpt","author","publishedAt","status","updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7::date,$8,NOW()) ON CONFLICT ("slug") DO UPDATE SET "title"=EXCLUDED."title","content"=EXCLUDED."content","excerpt"=EXCLUDED."excerpt"`,
      [p.id, p.title, p.slug, p.content, p.excerpt, p.author, p.publishedAt, p.status]
    );
  }
  console.log(`Created ${posts.length} blog posts`);

  // Create job listings (4 active roles)
  const jobs = [
    {
      id: "jb00000000000000000001",
      title: "Senior Full Stack Engineer (Next.js, TypeScript, PostgreSQL)",
      slug: "senior-fullstack-engineer-nextjs-typescript-postgresql",
      location: "Baneshwor, Kathmandu / Hybrid",
      type: "Full-Time",
      department: "Engineering",
      description: "We are looking for a Senior Full Stack Engineer to lead development of enterprise web applications using Next.js 16, React 19, and Node.js. You will architect end-to-end solutions, mentor junior developers, and work directly with clients to deliver high-impact digital products. This role is central to our engineering team â€” you will own major features from database schema design through deployment on Vercel or AWS.",
      requirements: "- 5+ years of professional web development experience\n- Expert-level proficiency in React, Next.js, and TypeScript\n- Strong experience with Node.js, PostgreSQL, and Prisma ORM\n- CI/CD pipeline setup (GitHub Actions, Vercel)\n- Cloud infrastructure familiarity (AWS Lambda, ECS, or Vercel Edge)\n- Excellent communication skills and client-facing experience\n- Experience leading technical discussions, sprint planning, and code reviews\n- Bonus: Knowledge of Nepal payment gateways (eSewa, Khalti APIs)\n- Bonus: Experience with Redis, Docker, or GraphQL",
      salary: "NPR 150,000 - 200,000 / month",
    },
    {
      id: "jb00000000000000000002",
      title: "UI/UX Product Designer (Figma, Design Systems)",
      slug: "uiux-product-designer-figma-design-systems",
      location: "Baneshwor, Kathmandu",
      type: "Full-Time",
      department: "Design",
      description: "We are seeking a talented UI/UX Product Designer to own the end-to-end design process for our client projects ranging from fintech dashboards to e-commerce marketplaces. You will conduct user research, create wireframes and high-fidelity prototypes, build scalable design systems, and collaborate closely with engineers to ship pixel-perfect, accessible interfaces.",
      requirements: "- 4+ years of experience in product design (UI/UX)\n- Expert proficiency in Figma (components, variants, auto-layout, prototyping)\n- Strong portfolio demonstrating web and mobile app design for live products\n- Experience building and maintaining comprehensive design systems\n- Deep understanding of accessibility standards (WCAG 2.1 AA)\n- Familiarity with motion design tools (Framer Motion, Lottie, Rive)\n- Knowledge of frontend development (HTML/CSS) is a strong plus\n- Experience designing for Nepal or South Asian markets preferred\n- Bonus: Familiarity with user testing tools (Hotjar, Maze, UsabilityHub)",
      salary: "NPR 120,000 - 160,000 / month",
    },
    {
      id: "jb00000000000000000003",
      title: "Mobile App Engineer (Flutter / React Native)",
      slug: "mobile-app-engineer-flutter-react-native",
      location: "Remote / Baneshwor",
      type: "Full-Time",
      department: "Engineering",
      description: "Join our mobile engineering team to build cross-platform applications for clients in fintech, e-commerce, and healthcare. You will own feature development from concept to App Store and Google Play release â€” working on apps with 100,000+ users. We value strong fundamentals over framework preference; experience with either Flutter or React Native is welcome.",
      requirements: "- 4+ years of mobile development experience (React Native or Flutter)\n- Published apps on both App Store and Google Play\n- Strong TypeScript or Dart skills\n- Experience with state management (Zustand, Redux Toolkit, Riverpod, or BLoC)\n- Native module integration experience (camera, GPS, biometrics, NFC)\n- Knowledge of push notifications (Firebase Cloud Messaging, OneSignal)\n- Familiarity with offline-first architecture (WatermelonDB, SQLite, Hive)\n- Mobile performance optimization and memory profiling\n- Bonus: Experience with Stripe, eSewa, or Khalti mobile SDKs\n- Bonus: CI/CD for mobile (Fastlane, EAS Build)",
      salary: "NPR 130,000 - 170,000 / month",
    },
    {
      id: "jb00000000000000000004",
      title: "Digital Marketing & SEO Strategist",
      slug: "digital-marketing-seo-strategist",
      location: "Baneshwor, Kathmandu",
      type: "Full-Time",
      department: "Marketing",
      description: "We are looking for a Digital Marketing & SEO Strategist to drive our clients' online presence and measurable growth. You will develop and execute comprehensive digital marketing strategies â€” including technical SEO, content marketing, paid advertising, and analytics â€” helping Nepali businesses achieve top search rankings and strong conversion rates.",
      requirements: "- 4+ years of digital marketing experience with a focus on SEO\n- Proven track record of growing organic traffic and improving search rankings\n- Expert knowledge of technical SEO, on-page SEO, and link-building strategies\n- Hands-on experience with Google Ads, Facebook Ads, and LinkedIn Ads\n- Proficiency in Google Analytics 4, Google Search Console, and SEMrush / Ahrefs\n- Content strategy development and copywriting skills\n- Experience with email marketing platforms (Mailchimp, SendGrid, Brevo)\n- Understanding of Nepal's digital landscape and consumer behavior\n- Bonus: Experience with marketing automation (HubSpot, Marketo)\n- Bonus: Basic knowledge of HTML/CSS and web performance metrics (Core Web Vitals)",
      salary: "NPR 90,000 - 130,000 / month",
    },
  ];
  await query(`DELETE FROM "Job" WHERE "id" LIKE 'jb%'`);
  for (const j of jobs) {
    await query(
      `INSERT INTO "Job" ("id","title","slug","location","type","department","description","requirements","salary","isActive","updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,true,NOW())`,
      [j.id, j.title, j.slug, j.location, j.type, j.department, j.description, j.requirements, j.salary]
    );
  }
  console.log(`Created ${jobs.length} job listings`);

  // Create site settings
  const settings = [
    { key: "company_name", value: "Newa Tech" },
    { key: "company_tagline", value: "Web Design & App Development Agency in Baneshwor, Kathmandu" },
    { key: "company_address", value: "Baneshwor, Kathmandu, Nepal" },
    { key: "company_phone", value: "+977-97444000111" },
    { key: "company_email", value: "info@newatech.com" },
    { key: "company_hours", value: "Sunday - Friday: 9:00 AM - 6:00 PM" },
    { key: "hero_title", value: "Newa Tech â€” Building Websites & Apps for Nepal" },
    { key: "hero_subtitle", value: "Web design and app development agency in Baneshwor, Kathmandu. We build professional websites, e-commerce stores, and mobile apps that help Nepali businesses grow." },
    { key: "about_story", value: "Newa Tech is a web design and app development agency in Baneshwor, Kathmandu. We design, build, and launch professional websites and mobile apps for businesses across Nepal â€” from concept and UI/UX design to development and launch." },
    { key: "mission", value: "To empower Nepali businesses with professional websites and mobile apps that build trust, attract customers, and drive growth." },
    { key: "vision", value: "To be Nepal's most trusted web design and app development agency â€” known for modern, high-quality digital products and genuine client care." },
  ];
  for (const s of settings) {
    const exists = await query(`SELECT 1 FROM "SiteSetting" WHERE "key" = $1`, [s.key]);
    if (exists.rows.length === 0) {
      await query(`INSERT INTO "SiteSetting" ("id","key","value") VALUES ($1,$2,$3)`, [s.key, s.key, s.value]);
    } else {
      await query(`UPDATE "SiteSetting" SET "value" = $1 WHERE "key" = $2`, [s.value, s.key]);
    }
  }
  console.log(`Created ${settings.length} site settings`);

  // Create page content
  const pageContents = [
    { page: "home", title: "Newa Tech â€” Web Design & App Development Agency in Kathmandu", subtitle: "Websites & Apps for Nepali Businesses", metaTitle: "Newa Tech â€” Web Design & App Development Agency in Kathmandu", metaDescription: "Newa Tech is a web design and app development agency in Baneshwor, Kathmandu building professional websites, e-commerce stores, and mobile apps for Nepali businesses." },
    { page: "about", title: "About Newa Tech â€” Web Design & App Development Agency", subtitle: "A Kathmandu-based agency for websites & apps", metaTitle: "About Newa Tech â€” Baneshwor, Kathmandu", metaDescription: "Meet Newa Tech, a web design and app development agency in Baneshwor, Kathmandu, building websites, e-commerce platforms, and mobile apps for Nepali businesses." },
    { page: "services", title: "Our Services â€” Website Design & App Development", subtitle: "Web development, mobile apps, UI/UX design & e-commerce", metaTitle: "Services â€” Newa Tech | Baneshwor, Kathmandu", metaDescription: "Explore Newa Tech services: web development, mobile app development, UI/UX design, and e-commerce website development." },
    { page: "portfolio", title: "Our Portfolio â€” Websites & Apps We've Built", subtitle: "See our work across Nepal", metaTitle: "Portfolio â€” Newa Tech | Projects in Kathmandu", metaDescription: "View Newa Tech portfolio of websites, e-commerce stores, and mobile apps built for businesses across Nepal." },
    { page: "blog", title: "Blog â€” Web & App Development Insights from Newa Tech", subtitle: "Design tips, tech guides, and company news", metaTitle: "Blog â€” Newa Tech | Web & App Insights Nepal", metaDescription: "Read the latest articles from Newa Tech on web design, app development, e-commerce, and digital growth for Nepali businesses." },
    { page: "contact", title: "Contact Newa Tech â€” Baneshwor, Kathmandu", subtitle: "Get in touch with our team", metaTitle: "Contact â€” Newa Tech | Baneshwor, Kathmandu", metaDescription: "Contact Newa Tech in Baneshwor, Kathmandu for web design, app development, UI/UX design, and e-commerce services." },
    { page: "careers", title: "Careers â€” Join the Newa Tech Team", subtitle: "Build your career with us", metaTitle: "Careers â€” Newa Tech | Jobs in Kathmandu", metaDescription: "Explore career opportunities at Newa Tech in Baneshwor, Kathmandu." },
  ];
  for (const pc of pageContents) {
    const exists = await query(`SELECT 1 FROM "PageContent" WHERE "page" = $1`, [pc.page]);
    if (exists.rows.length === 0) {
      await query(
        `INSERT INTO "PageContent" ("id","page","title","subtitle","metaTitle","metaDescription","updatedAt") VALUES ($1,$2,$3,$4,$5,$6,NOW())`,
        [pc.page, pc.page, pc.title, pc.subtitle, pc.metaTitle, pc.metaDescription]
      );
    } else {
      await query(
        `UPDATE "PageContent" SET "title"=$1,"subtitle"=$2,"metaTitle"=$3,"metaDescription"=$4,"updatedAt"=NOW() WHERE "page"=$5`,
        [pc.title, pc.subtitle, pc.metaTitle, pc.metaDescription, pc.page]
      );
    }
  }
  console.log(`Created ${pageContents.length} page contents`);

  console.log("\nâœ… Database seeded successfully!");
  console.log("ðŸ“§ Admin login: admin@newatech.com / Admin@123");
  console.log("ðŸ“§ Editor login: editor@newatech.com / Editor@123");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
