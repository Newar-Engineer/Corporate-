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
     ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name", "role" = EXCLUDED."role"`,
    ["cm0000000000000000000001", "admin@newaenterprises.com", adminHash, "Super Admin", "super-admin"]
  );
  await query(
    `INSERT INTO "User" ("id", "email", "password", "name", "role", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, NOW())
     ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name", "role" = EXCLUDED."role"`,
    ["cm0000000000000000000002", "editor@newaenterprises.com", editorHash, "Editor User", "editor"]
  );
  console.log("Created users");

  // Create services with rich content
  const services = [
    {
      id: "svc00000000000000000001",
      title: "Web Development & Engineering",
      slug: "web-development-engineering",
      description: "We build high-performance web applications using Next.js 16, React 19, and cutting-edge frontend technologies. Our engineering team specializes in server-side rendering, static generation, API routes, and edge functions — delivering blazing-fast experiences that rank higher on search engines and convert better.",
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
      description: "Native-quality cross-platform mobile applications built with React Native and Expo. From fintech to e-commerce, our apps deliver smooth 60fps experiences with offline support, push notifications, and deep platform integration — all from a single TypeScript codebase.",
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
      description: "Data-driven product design that converts. Our design team combines user research, interaction design, and visual craftsmanship to create interfaces that are intuitive, accessible, and beautiful. Every pixel is purposeful — optimized for engagement, retention, and business growth.",
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
      title: "Cloud & DevOps Solutions",
      slug: "cloud-devops-solutions",
      description: "Enterprise-grade cloud infrastructure on AWS and Vercel. We design scalable, secure environments with automated CI/CD pipelines, container orchestration, and 24/7 monitoring. Migrate from legacy servers to serverless architectures with zero downtime.",
      icon: "FiCloud",
      order: 4,
      features: JSON.stringify([
        { title: "Cloud Architecture Design", description: "Scalable AWS/ Vercel architecture with cost optimization and security best practices." },
        { title: "CI/CD Pipeline Setup", description: "Automated GitHub Actions / GitLab CI pipelines with staging and production environments." },
        { title: "Docker & Kubernetes", description: "Containerized deployments with Docker Compose and Kubernetes orchestration." },
        { title: "Monitoring & Alerting", description: "Datadog, Sentry, and PagerDuty integration with proactive alerting." },
        { title: "Database Management", description: "PostgreSQL replication, backup strategies, and migration automation." },
        { title: "Security & Compliance", description: "SSL/TLS, WAF, DDoS protection, and SOC 2 compliance preparation." },
      ]),
      techStack: JSON.stringify([
        { name: "AWS", type: "Cloud" },
        { name: "Vercel", type: "Hosting" },
        { name: "Docker", type: "DevOps" },
        { name: "Kubernetes", type: "DevOps" },
        { name: "GitHub Actions", type: "DevOps" },
        { name: "Terraform", type: "DevOps" },
        { name: "Datadog", type: "Monitoring" },
        { name: "Sentry", type: "Monitoring" },
      ]),
      processSteps: JSON.stringify([
        { title: "Infrastructure Audit", description: "Assess current infrastructure, identify bottlenecks, and plan migration.", duration: "1 week" },
        { title: "Architecture Design", description: "Design cloud architecture with HA, DR, and security considerations.", duration: "1 week" },
        { title: "Environment Setup", description: "Provision staging and production environments with IaC (Terraform).", duration: "1-2 weeks" },
        { title: "Migration & Deployment", description: "Zero-downtime migration with rollback capability and validation.", duration: "2-4 weeks" },
        { title: "Monitoring Setup", description: "Configure dashboards, alerts, and logging infrastructure.", duration: "1 week" },
        { title: "Ongoing Management", description: "24/7 monitoring, cost optimization, and security patching.", duration: "Ongoing" },
      ]),
      timeline: "4-10 weeks",
    },
    {
      id: "svc00000000000000000005",
      title: "E-Commerce Platforms",
      slug: "ecommerce-platforms",
      description: "Revenue-generating e-commerce platforms with Nepal's preferred payment gateways — eSewa, Khalti, and COD. We build custom storefronts, marketplace platforms, and subscription-based e-commerce systems optimized for conversion and mobile-first shopping behavior.",
      icon: "FiTrendingUp",
      order: 5,
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
    {
      id: "svc00000000000000000006",
      title: "AI & Data Analytics",
      slug: "ai-data-analytics",
      description: "Transform raw data into actionable intelligence. We build custom AI solutions including recommendation engines, predictive analytics dashboards, natural language processing pipelines, and computer vision systems — tailored for South Asian business contexts and data volumes.",
      icon: "FiCode",
      order: 6,
      features: JSON.stringify([
        { title: "Custom ML Models", description: "Scikit-learn, TensorFlow, and PyTorch models trained on your business data." },
        { title: "Predictive Analytics", description: "Demand forecasting, customer churn prediction, and price optimization." },
        { title: "NLP & Text Analytics", description: "Sentiment analysis, document classification, and multilingual NLP for Nepali/English." },
        { title: "Computer Vision", description: "Image classification, object detection, and OCR for document processing." },
        { title: "BI Dashboards", description: "Interactive Metabase and Power BI dashboards with real-time data pipelines." },
        { title: "Data Engineering", description: "ETL pipelines, data warehousing, and real-time streaming with Kafka." },
      ]),
      techStack: JSON.stringify([
        { name: "Python", type: "Language" },
        { name: "TensorFlow", type: "ML" },
        { name: "PyTorch", type: "ML" },
        { name: "Apache Kafka", type: "Data" },
        { name: "PostgreSQL", type: "Database" },
        { name: "Metabase", type: "Analytics" },
        { name: "Power BI", type: "Analytics" },
        { name: "AWS SageMaker", type: "Cloud" },
      ]),
      processSteps: JSON.stringify([
        { title: "Data Audit", description: "Assess data quality, sources, and infrastructure readiness.", duration: "1-2 weeks" },
        { title: "Pipeline Development", description: "Build ETL pipelines for data ingestion, cleaning, and transformation.", duration: "2-4 weeks" },
        { title: "Model Development", description: "Train, validate, and optimize machine learning models.", duration: "3-6 weeks" },
        { title: "Dashboard & Visualization", description: "Create interactive dashboards with key business metrics and insights.", duration: "1-2 weeks" },
        { title: "Deployment & Integration", description: "Deploy models to production with API endpoints and monitoring.", duration: "1-2 weeks" },
        { title: "Ongoing Optimization", description: "Model retraining, performance monitoring, and accuracy improvement.", duration: "Ongoing" },
      ]),
      timeline: "8-16 weeks",
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
    { id: "tm00000000000000000001", name: "Rajesh Shrestha", role: "CEO & Founder", bio: "With over 20 years of experience across trading, technology, and business development, Rajesh founded Newa Enterprises in 2014. He oversees company strategy, key partnerships, and new market expansion. A proud Newar businessman from Baneshwor, he is deeply committed to building Nepal's technology ecosystem.", socialLinks: JSON.stringify({ linkedin: "https://linkedin.com/in/rajesh-shrestha", twitter: "https://twitter.com/rajeshne" }), order: 1 },
    { id: "tm00000000000000000002", name: "Anil Bajracharya", role: "CTO & Head of Engineering", bio: "Anil leads the engineering team and drives technical strategy across all service lines. A computer engineering graduate from Pulchowk Campus, he has architected e-commerce platforms, payment gateways, and enterprise systems serving over 100+ Nepali businesses. He specializes in Next.js, React Native, and cloud architecture.", socialLinks: JSON.stringify({ linkedin: "https://linkedin.com/in/anil-bajracharya", github: "https://github.com/anilbajra" }), order: 2 },
    { id: "tm00000000000000000003", name: "Priya Maharjan", role: "VP of Product Design", bio: "Priya brings 10+ years of UX design leadership from both agency and product environments. She has led design initiatives for fintech, e-commerce, and SaaS products used by millions. Her design philosophy centers on data-informed decisions and inclusive design practices.", socialLinks: JSON.stringify({ linkedin: "https://linkedin.com/in/priya-maharjan", twitter: "https://twitter.com/priyamaha" }), order: 3 },
    { id: "tm00000000000000000004", name: "Sagar Karmacharya", role: "Lead Full-Stack Engineer", bio: "Sagar is a full-stack engineer with deep expertise in React, Node.js, and PostgreSQL. He has built and scaled multiple SaaS platforms from zero to production. He is passionate about clean architecture, type safety, and developer experience.", socialLinks: JSON.stringify({ linkedin: "https://linkedin.com/in/sagar-karmacharya", github: "https://github.com/sagarkar" }), order: 4 },
    { id: "tm00000000000000000005", name: "Riya Shrestha", role: "AI & Data Engineering Lead", bio: "Riya specializes in machine learning, NLP, and data pipeline engineering. With a Master's in Data Science from TU Berlin and 6 years of industry experience, she has deployed production ML systems for finance, healthcare, and logistics clients across South Asia.", socialLinks: JSON.stringify({ linkedin: "https://linkedin.com/in/riya-shrestha" }), order: 5 },
    { id: "tm00000000000000000006", name: "Amit Joshi", role: "Cloud & DevOps Architect", bio: "Amit is a certified AWS Solutions Architect with 8+ years of experience designing and managing cloud infrastructure. He has led migrations of 50+ servers to cloud-native architectures and specializes in Kubernetes, Terraform, and CI/CD automation.", socialLinks: JSON.stringify({ linkedin: "https://linkedin.com/in/amit-joshi", github: "https://github.com/amitjoshi" }), order: 6 },
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
    { id: "tt00000000000000000001", clientName: "Rabi Shakya", company: "ShopNepal Pvt. Ltd.", message: "Newa Enterprises delivered our mobile app in record time without compromising quality. The eSewa and Khalti payment integration was flawless, and the AI recommendations have been a game-changer for our sales. They truly understand both the technology and the Nepal market — a rare combination.", rating: 5, approved: true },
    { id: "tt00000000000000000002", clientName: "Amit Pradhan", company: "FinFlow Technologies", message: "The analytics dashboard transformed how we run our business. What used to take half a day of Excel work now loads in under 30 seconds. The fraud detection module alone paid for the entire project within weeks of deployment.", rating: 5, approved: true },
    { id: "tt00000000000000000003", clientName: "Dr. Sunita KC", company: "HealthFirst Nepal", message: "The healthcare booking platform has been a lifesaver for our patients and staff. Patient wait times dropped from 45 minutes to just 12 minutes, and the telemedicine integration was seamless. Newa Enterprises understood healthcare compliance requirements from day one.", rating: 5, approved: true },
    { id: "tt00000000000000000004", clientName: "Kiran Basnet", company: "Himalayan Group of Companies", message: "NepalERP transformed our business operations across all 7 departments. The month-end closing that used to take 15 days of manual work now happens automatically in 2 days. The VAT automation alone has saved us lakhs in potential penalties.", rating: 5, approved: true },
    { id: "tt00000000000000000005", clientName: "Bishnu Adhikari", company: "Kathmandu Metropolitan City", message: "The smart city platform has given us unprecedented visibility into how our city functions. The air quality monitoring and waste management optimization have been invaluable for public policy. Newa Enterprises delivered a world-class solution for Kathmandu.", rating: 5, approved: true },
  ];
  for (const t of testimonials) {
    await query(
      `INSERT INTO "Testimonial" ("id","clientName","company","message","rating","approved","updatedAt") VALUES ($1,$2,$3,$4,$5,$6,NOW()) ON CONFLICT DO NOTHING`,
      [t.id, t.clientName, t.company, t.message, t.rating, t.approved]
    );
  }
  console.log(`Created ${testimonials.length} testimonials`);

  // Create portfolio items with rich case study content
  const portfolio = [
    {
      id: "pf00000000000000000001",
      title: "ShopNepal — Multi-Vendor E-Commerce Mobile App",
      slug: "shopnepal-ecommerce-app",
      description: "A cross-platform mobile marketplace connecting 500+ vendors with 50,000+ customers across Nepal. Features real-time order tracking, eSewa/Khalti payment, and AI-powered product recommendations.",
      category: "Mobile App",
      client: "ShopNepal Pvt. Ltd.",
      clientOverview: "ShopNepal is a Kathmandu-based startup aiming to build Nepal's largest mobile-first marketplace. With 500+ registered vendors and a target of 100,000 active users within the first year, they needed a performant cross-platform mobile app that could handle high traffic volumes and complex payment workflows.",
      problem: "The existing web-only platform had poor mobile conversion rates (under 2%). Developing separate native iOS and Android apps was cost-prohibitive. They needed a single codebase solution that delivered native-quality experiences on both platforms, integrated with eSewa and Khalti for real-time payments, supported offline browsing, and scaled to handle flash sale traffic spikes of 10,000+ concurrent users.",
      solution: "We built a React Native + Expo application with a GraphQL backend on Node.js. Implemented eSewa and Khalti SDK integration for one-tap payments, built an offline-first architecture using WatermelonDB for product browsing without connectivity, deployed AI-based product recommendations using TensorFlow Lite on-device, and designed a scalable backend on AWS Lambda with auto-scaling for traffic spikes.",
      results: "App launched in 10 weeks on both App Store and Google Play. Achieved 4.7-star rating with 15,000+ downloads in the first month. Mobile conversion rate improved from 2% to 8.5%. Average order value increased by 35% through AI recommendations. Vendor onboarding grew 3x within 2 months of launch.",
      metrics: JSON.stringify([
        { label: "App Store Rating", value: "4.7 stars" },
        { label: "Conversion Rate", value: "8.5%" },
        { label: "First Month Downloads", value: "15,000+" },
        { label: "Vendor Growth", value: "3x in 2 months" },
      ]),
      techStack: JSON.stringify([
        { name: "React Native", type: "Frontend" },
        { name: "Expo SDK", type: "Frontend" },
        { name: "TypeScript", type: "Language" },
        { name: "Node.js", type: "Backend" },
        { name: "GraphQL", type: "Backend" },
        { name: "PostgreSQL", type: "Database" },
        { name: "eSewa API", type: "Payment" },
        { name: "Khalti API", type: "Payment" },
        { name: "TensorFlow Lite", type: "ML" },
        { name: "AWS Lambda", type: "Cloud" },
      ]),
      gallery: JSON.stringify([
        { url: "/images/gallery/shopnepal-1.jpg", caption: "Homepage with AI-curated product feed" },
        { url: "/images/gallery/shopnepal-2.jpg", caption: "eSewa and Khalti checkout flow" },
        { url: "/images/gallery/shopnepal-3.jpg", caption: "Vendor dashboard with real-time sales analytics" },
      ]),
      testimonial: "Newa Enterprises delivered our app in record time without compromising quality. The payment integration was flawless and the AI recommendations have been a game-changer for our sales. They truly understand the Nepal market.",
      testimonialAuthor: "Rabi Shakya",
      testimonialRole: "CEO, ShopNepal Pvt. Ltd.",
      completionDate: "2026-06-15",
    },
    {
      id: "pf00000000000000000002",
      title: "FinFlow — FinTech Analytics Dashboard",
      slug: "finflow-fintech-dashboard",
      description: "Real-time financial analytics and reporting dashboard for a leading Nepal-based fintech company. Processes 500,000+ transactions daily with sub-second query performance.",
      category: "Web App",
      client: "FinFlow Technologies",
      clientOverview: "FinFlow Technologies operates a digital lending platform processing over 500,000 transactions daily across Nepal. Their analytics team needed a modern dashboard to replace an Excel-based reporting system that was taking 4+ hours to generate daily reports and couldn't handle real-time data.",
      problem: "The legacy reporting system involved manual data exports from PostgreSQL, Excel pivot tables, and email-based distribution. Generating the daily executive report took 4-6 hours. There was no real-time view of transaction volumes, default rates, or portfolio health. The C-suite couldn't make data-driven decisions in time. The system also had no role-based access control, meaning sensitive financial data was visible to all users.",
      solution: "We built a Next.js analytics dashboard with server-side rendering for instant page loads on large datasets. Implemented PostgreSQL materialized views and Redis caching for sub-second query performance on 50M+ row datasets. Designed role-based dashboards for executives, operations, and risk teams. Built real-time data pipelines using Apache Kafka for streaming transaction data with <100ms latency.",
      results: "Report generation time dropped from 4-6 hours to under 30 seconds. Executive decision-making improved with real-time data visibility. The platform identified 3 fraud patterns within the first month, saving an estimated NPR 2.5 Cr in potential losses. System handles 500,000+ daily transactions with 99.9% uptime.",
      metrics: JSON.stringify([
        { label: "Report Generation", value: "30 seconds" },
        { label: "Daily Transactions", value: "500,000+" },
        { label: "Fraud Losses Prevented", value: "NPR 2.5 Cr" },
        { label: "System Uptime", value: "99.9%" },
      ]),
      techStack: JSON.stringify([
        { name: "Next.js", type: "Frontend" },
        { name: "React", type: "Frontend" },
        { name: "TypeScript", type: "Language" },
        { name: "Node.js", type: "Backend" },
        { name: "PostgreSQL", type: "Database" },
        { name: "Redis", type: "Cache" },
        { name: "Apache Kafka", type: "Data" },
        { name: "Metabase", type: "Analytics" },
        { name: "AWS", type: "Cloud" },
      ]),
      gallery: JSON.stringify([
        { url: "/images/gallery/finflow-1.jpg", caption: "Executive dashboard with real-time KPIs" },
        { url: "/images/gallery/finflow-2.jpg", caption: "Transaction volume and trend analysis view" },
        { url: "/images/gallery/finflow-3.jpg", caption: "Risk management dashboard with fraud alerts" },
      ]),
      testimonial: "The dashboard transformed how we run our business. What used to take half a day now loads in seconds. The fraud detection module alone paid for the entire project within weeks.",
      testimonialAuthor: "Amit Pradhan",
      testimonialRole: "CTO, FinFlow Technologies",
      completionDate: "2026-04-20",
    },
    {
      id: "pf00000000000000000003",
      title: "CargoLink — Corporate Logistics Portal",
      slug: "cargologistics-portal",
      description: "A comprehensive logistics management platform for a Fortune 500 logistics company operating across South Asia. Manages 10,000+ shipments daily with real-time tracking and route optimization.",
      category: "Enterprise System",
      client: "CargoLink International",
      clientOverview: "CargoLink International is a major logistics provider operating across Nepal, India, and Bangladesh, handling 10,000+ shipments daily. Their operations relied on a 15-year-old legacy system that was increasingly unstable and couldn't scale with business growth.",
      problem: "The legacy DOS-based system crashed weekly, causing shipment delays and data loss. There was no real-time tracking for customers, no integration with Nepal customs EDI, and no mobile access for field staff. Dispatchers used whiteboards and phone calls to manage 100+ drivers daily. Customer complaints about lost shipments and late deliveries were at an all-time high.",
      solution: "We designed and built a modern logistics portal with Next.js frontend and Node.js microservices backend. Implemented real-time GPS tracking with ETAs using Google Maps Platform, built a mobile-first driver app with React Native for proof-of-delivery photos and digital signatures, integrated with Nepal Customs EDI for automated customs clearance, and designed an AI-powered route optimization engine that reduced fuel consumption by 25%.",
      results: "Shipment tracking accuracy improved from 60% to 99%. Customer complaints dropped by 80%. Fuel costs reduced by 25% through route optimization. Driver productivity increased by 40% with the mobile app eliminating paper-based processes. Customs clearance time reduced from 3 days to 6 hours.",
      metrics: JSON.stringify([
        { label: "Tracking Accuracy", value: "99%" },
        { label: "Customer Complaints", value: "-80%" },
        { label: "Fuel Cost Reduction", value: "25%" },
        { label: "Customs Clearance", value: "6 hours" },
      ]),
      techStack: JSON.stringify([
        { name: "Next.js", type: "Frontend" },
        { name: "React Native", type: "Frontend" },
        { name: "TypeScript", type: "Language" },
        { name: "Node.js", type: "Backend" },
        { name: "PostgreSQL", type: "Database" },
        { name: "Google Maps API", type: "Logistics" },
        { name: "Redis", type: "Cache" },
        { name: "Docker", type: "DevOps" },
        { name: "AWS", type: "Cloud" },
      ]),
      gallery: JSON.stringify([
        { url: "/images/gallery/cargolink-1.jpg", caption: "Dispatch control room with live GPS tracking" },
        { url: "/images/gallery/cargolink-2.jpg", caption: "Route optimization engine with real-time traffic" },
        { url: "/images/gallery/cargolink-3.jpg", caption: "Driver mobile app with proof-of-delivery workflow" },
      ]),
      testimonial: "Newa Enterprises took our operations from the 1990s to the cutting edge. The real-time tracking and route optimization have been transformative. Our customers can finally see where their shipments are.",
      testimonialAuthor: "Vikram Thapa",
      testimonialRole: "VP of Operations, CargoLink International",
      completionDate: "2026-02-28",
    },
    {
      id: "pf00000000000000000004",
      title: "HealthFirst — Healthcare Appointment System",
      slug: "healthfirst-appointment-system",
      description: "A full-stack healthcare booking platform connecting 200+ doctors with 100,000+ patients across major hospitals in Kathmandu. Features real-time slot booking, telemedicine, and EHR integration.",
      category: "Web App",
      client: "HealthFirst Nepal",
      clientOverview: "HealthFirst Nepal is a healthcare technology company working with 200+ doctors across 15 major hospitals in the Kathmandu Valley. Their goal was to create a unified appointment booking system that would replace fragmented hospital-specific systems and reduce patient wait times.",
      problem: "Patients had to call each hospital individually to check doctor availability, often waiting 30+ minutes on hold. There was no centralized system showing real-time availability across hospitals. Missed appointments cost hospitals an estimated NPR 5 Cr annually. Doctors had no way to manage their schedules across multiple hospital affiliations. The COVID-19 pandemic also highlighted the urgent need for telemedicine capabilities.",
      solution: "We built a full-stack Next.js platform with a React Native patient mobile app. Implemented real-time slot management with 15-minute granularity, built a HIPAA-compliant video consultation system using WebRTC with end-to-end encryption, integrated with 5 major hospital EHR systems via HL7 FHIR standards, and designed an AI-powered scheduling optimizer that reduced patient wait times by predicting no-shows and overbooking accordingly.",
      results: "Patient wait times reduced from average 45 minutes to 12 minutes. Hospital no-show rates dropped from 25% to 8% through automated reminders and intelligent overbooking. The platform handled 100,000+ bookings in the first 3 months. Telemedicine adoption reached 35% of all consultations within 2 months of launch.",
      metrics: JSON.stringify([
        { label: "Average Wait Time", value: "12 min" },
        { label: "No-Show Rate", value: "8%" },
        { label: "Monthly Bookings", value: "33,000+" },
        { label: "Telemedicine Adoption", value: "35%" },
      ]),
      techStack: JSON.stringify([
        { name: "Next.js", type: "Frontend" },
        { name: "React Native", type: "Frontend" },
        { name: "TypeScript", type: "Language" },
        { name: "Node.js", type: "Backend" },
        { name: "PostgreSQL", type: "Database" },
        { name: "WebRTC", type: "Video" },
        { name: "Redis", type: "Cache" },
        { name: "Docker", type: "DevOps" },
      ]),
      gallery: JSON.stringify([
        { url: "/images/gallery/healthfirst-1.jpg", caption: "Patient-facing booking interface with real-time slots" },
        { url: "/images/gallery/healthfirst-2.jpg", caption: "Doctor dashboard with schedule and telemedicine controls" },
        { url: "/images/gallery/healthfirst-3.jpg", caption: "Video consultation interface with EHR side panel" },
      ]),
      testimonial: "The platform has been a lifesaver for our patients and staff. Wait times are down dramatically and the telemedicine integration was seamless. Newa Enterprises understood healthcare compliance requirements from day one.",
      testimonialAuthor: "Dr. Sunita KC",
      testimonialRole: "Medical Director, HealthFirst Nepal",
      completionDate: "2025-12-10",
    },
    {
      id: "pf00000000000000000005",
      title: "GrowthEngine — SaaS Marketing Platform",
      slug: "growthengine-saas-marketing",
      description: "A comprehensive marketing automation SaaS platform serving 1,200+ businesses across South Asia. Features email campaigns, SMS marketing, social media scheduling, and AI-powered audience segmentation.",
      category: "SaaS",
      client: "GrowthEngine Inc.",
      clientOverview: "GrowthEngine Inc. is a Singapore-based SaaS startup that expanded into the South Asian market. Their platform needed a complete rebuild to support multi-language interfaces (English, Nepali, Hindi), local payment gateways, and SMS integration with Nepal's telecom providers.",
      problem: "The existing Ruby on Rails monolith couldn't scale, had frequent outages during campaign blasts, and lacked support for Nepali/Hindi languages. Customers complained about slow email delivery (30+ minutes for campaigns) and no SMS integration with Nepal's Ncell and Nepal Telecom. The platform had 3-second page load times and a 40% bounce rate during peak hours.",
      solution: "We rebuilt the platform as a Next.js + Node.js microservices architecture. Implemented Redis-backed job queues for sub-second email/SMS delivery, built a React-based drag-and-drop campaign builder, integrated with Nepal Telecom and Ncell SMS gateways, deployed AI-based audience segmentation using customer behavior data, and localized the entire UI into Nepali and Hindi using next-intl.",
      results: "Email delivery time dropped from 30+ minutes to under 5 seconds. Platform uptime improved from 95% to 99.9%. Customer base grew from 400 to 1,200+ within 6 months of relaunch. Page load times improved from 3 seconds to 400ms. Revenue increased 3x within the first quarter post-launch.",
      metrics: JSON.stringify([
        { label: "Email Delivery", value: "5 seconds" },
        { label: "Platform Uptime", value: "99.9%" },
        { label: "Customer Growth", value: "1,200+" },
        { label: "Revenue Growth", value: "3x" },
      ]),
      techStack: JSON.stringify([
        { name: "Next.js", type: "Frontend" },
        { name: "React", type: "Frontend" },
        { name: "TypeScript", type: "Language" },
        { name: "Node.js", type: "Backend" },
        { name: "PostgreSQL", type: "Database" },
        { name: "Redis", type: "Cache" },
        { name: "BullMQ", type: "Queue" },
        { name: "AWS SES", type: "Email" },
        { name: "next-intl", type: "i18n" },
      ]),
      gallery: JSON.stringify([
        { url: "/images/gallery/growthengine-1.jpg", caption: "Campaign builder with drag-and-drop editor" },
        { url: "/images/gallery/growthengine-2.jpg", caption: "AI-powered audience segmentation dashboard" },
        { url: "/images/gallery/growthengine-3.jpg", caption: "Multi-language campaign analytics view" },
      ]),
      testimonial: "The rebuild transformed our business. Our customers in Nepal and India finally have a platform that speaks their language and supports their payment methods. The performance improvement alone drove our 3x revenue growth.",
      testimonialAuthor: "James Chen",
      testimonialRole: "CEO, GrowthEngine Inc.",
      completionDate: "2026-01-15",
    },
    {
      id: "pf00000000000000000006",
      title: "TeamSync — Real-Time Collaboration Tool",
      slug: "teamsync-collaboration-tool",
      description: "A real-time collaboration platform with document editing, video conferencing, and project management for remote teams across South Asia. Handles 1M+ daily active users with sub-100ms latency.",
      category: "SaaS",
      client: "TeamSync Labs",
      clientOverview: "TeamSync Labs is a Bangalore-based startup building collaboration software for the South Asian market. Their prototype had struggled with latency issues across diverse network conditions in the region, and they needed a complete architectural overhaul to scale from 10,000 to 1,000,000+ users.",
      problem: "The existing WebSocket-based real-time sync couldn't handle 50,000+ concurrent connections, causing frequent disconnections and data loss. Document collaboration had 2-5 second latency on 4G networks — unacceptable for real-time editing. Video conferencing quality degraded severely on sub-2Mbps connections common in Nepal and rural India. The platform needed edge deployment across multiple regions to reduce latency.",
      solution: "We rebuilt the real-time layer using WebRTC DataChannels with CRDT-based conflict resolution for sub-50ms document sync. Deployed edge functions across 6 AWS regions in South Asia using Lambda@Edge for <20ms latency. Built an adaptive video conferencing system using the Scalable Video Technology (SVT) codec that maintains quality at 500kbps. Implemented YugabyteDB for multi-region database replication with automatic failover.",
      results: "Platform scaled from 10,000 to 1,000,000+ daily active users. Document collaboration latency reduced from 2-5 seconds to under 50ms on 4G. Video conferencing now works reliably on 500kbps connections. Infrastructure costs reduced by 40% through edge computing optimization. Customer acquisition cost dropped 60% through viral team invite loops.",
      metrics: JSON.stringify([
        { label: "Daily Active Users", value: "1,000,000+" },
        { label: "Collaboration Latency", value: "50ms" },
        { label: "Infra Cost Savings", value: "40%" },
        { label: "Min. Video Bandwidth", value: "500kbps" },
      ]),
      techStack: JSON.stringify([
        { name: "React", type: "Frontend" },
        { name: "TypeScript", type: "Language" },
        { name: "WebRTC", type: "Real-Time" },
        { name: "CRDT", type: "Data" },
        { name: "YugabyteDB", type: "Database" },
        { name: "Redis", type: "Cache" },
        { name: "AWS Lambda@Edge", type: "Edge" },
        { name: "SVT Codec", type: "Video" },
      ]),
      gallery: JSON.stringify([
        { url: "/images/gallery/teamsync-1.jpg", caption: "Real-time collaborative document editor" },
        { url: "/images/gallery/teamsync-2.jpg", caption: "Video conference with adaptive quality controls" },
        { url: "/images/gallery/teamsync-3.jpg", caption: "Multi-region latency dashboard for infrastructure monitoring" },
      ]),
      testimonial: "Newa Enterprises solved problems we'd been struggling with for two years. The CRDT-based sync and edge deployment transformed our product. Our users in Nepal now have the same experience as users in Bangalore.",
      testimonialAuthor: "Arun Patel",
      testimonialRole: "CTO, TeamSync Labs",
      completionDate: "2025-09-30",
    },
    {
      id: "pf00000000000000000007",
      title: "NepalERP — Enterprise Resource Planning System",
      slug: "nepalerp-enterprise-system",
      description: "A comprehensive ERP system built for Nepali enterprises with multi-currency support, Nepal tax compliance (VAT/PAN), eSewa integration for payments, and real-time inventory tracking across multiple warehouses.",
      category: "Enterprise System",
      client: "Himalayan Group of Companies",
      clientOverview: "Himalayan Group is a diversified Nepali conglomerate with operations in manufacturing, retail, hospitality, and logistics across 5 cities in Nepal. They needed a unified ERP system to replace 7 different software packages that couldn't communicate with each other.",
      problem: "The company operated 7 disconnected systems: separate software for accounting, inventory, HR, payroll, sales, procurement, and manufacturing. Month-end closing required 15+ days of manual reconciliation. There was no real-time view of cash flow, inventory levels, or profitability across business units. Nepal-specific requirements like VAT filing, PAN validation, and multi-currency (NPR, INR, USD) were not supported by off-the-shelf ERP solutions.",
      solution: "We designed and built NepalERP — a modular Next.js + Node.js ERP system with PostgreSQL. Implemented Nepal-specific tax engine with automated VAT return generation and PAN validation, built multi-currency support with real-time Nepal Rastra Bank exchange rate integration, developed a real-time consolidated dashboard showing cash flow, inventory, and P&L across all 7 business units, integrated eSewa and Khalti for B2B payments, and deployed on-premise with hybrid cloud backup for industries with unreliable internet.",
      results: "Month-end closing reduced from 15+ days to 2 days. Inventory holding costs reduced by 18% through real-time visibility and JIT procurement. Tax compliance became fully automated, eliminating NPR 12 Lakh in annual penalties. The system unified 7 departments across 5 cities, saving an estimated NPR 2 Cr annually in operational efficiency.",
      metrics: JSON.stringify([
        { label: "Month-End Closing", value: "2 days" },
        { label: "Inventory Cost Savings", value: "18%" },
        { label: "Annual Penalties Saved", value: "NPR 12 Lakh" },
        { label: "Annual Efficiency Savings", value: "NPR 2 Cr" },
      ]),
      techStack: JSON.stringify([
        { name: "Next.js", type: "Frontend" },
        { name: "React", type: "Frontend" },
        { name: "TypeScript", type: "Language" },
        { name: "Node.js", type: "Backend" },
        { name: "PostgreSQL", type: "Database" },
        { name: "Redis", type: "Cache" },
        { name: "NRB API", type: "Finance" },
        { name: "Docker", type: "DevOps" },
      ]),
      gallery: JSON.stringify([
        { url: "/images/gallery/nepalerp-1.jpg", caption: "Executive dashboard with consolidated P&L and cash flow" },
        { url: "/images/gallery/nepalerp-2.jpg", caption: "Inventory management across multiple warehouse locations" },
        { url: "/images/gallery/nepalerp-3.jpg", caption: "Nepal VAT return generator with automated filing" },
      ]),
      testimonial: "NepalERP transformed our business operations. What used to take 15 days of manual work now happens automatically in 2 days. The Nepal-specific features like VAT automation and multi-currency support are exactly what we needed.",
      testimonialAuthor: "Kiran Basnet",
      testimonialRole: "CFO, Himalayan Group of Companies",
      completionDate: "2025-07-20",
    },
    {
      id: "pf00000000000000000008",
      title: "SmartCity — IoT Monitoring Platform",
      slug: "smartcity-iot-platform",
      description: "An IoT-enabled smart city monitoring platform for Kathmandu Metropolitan City. Tracks air quality, traffic patterns, waste management, and street lighting across 150+ sensor nodes in real-time.",
      category: "Enterprise System",
      client: "Kathmandu Metropolitan City",
      clientOverview: "The Kathmandu Metropolitan City office wanted to leverage IoT technology to improve urban management. They needed a centralized platform to monitor air pollution, traffic congestion, waste bin fill levels, and energy consumption across the city's street lighting infrastructure.",
      problem: "The city had 150+ IoT sensors deployed across multiple pilot projects but data was fragmented across 4 different vendor dashboards. There was no unified view, no historical analysis, and no alerting system for critical events (e.g., air quality exceeding dangerous levels, waste bins overflowing). Sensor data had 30-minute latency due to polling-based architecture. The city's IT team had limited experience with IoT data pipelines.",
      solution: "We built a real-time IoT platform using Node.js MQTT brokers for sub-second sensor data ingestion. Designed a React dashboard with Mapbox GL for geospatial visualization of all 150+ sensors, implemented ML-based predictive models for traffic congestion and air quality forecasting 24 hours in advance, built automated alerting via SMS (Ncell/Nepal Telecom) and email for critical thresholds, and deployed Edge Gateways for local data processing with cloud sync for reliability during internet outages.",
      results: "Sensor data latency reduced from 30 minutes to under 500ms. The city identified 5 major air pollution hotspots and implemented targeted interventions. Waste collection efficiency improved by 35% through fill-level optimized routing. Street lighting energy consumption reduced by 28% through adaptive dimming based on motion sensors and ambient light. The platform won the 'Smart City Innovation Award' at Nepal Digital Summit 2026.",
      metrics: JSON.stringify([
        { label: "Data Latency", value: "500ms" },
        { label: "Sensors Monitored", value: "150+" },
        { label: "Waste Collection Efficiency", value: "+35%" },
        { label: "Street Lighting Energy Savings", value: "28%" },
      ]),
      techStack: JSON.stringify([
        { name: "React", type: "Frontend" },
        { name: "TypeScript", type: "Language" },
        { name: "Node.js", type: "Backend" },
        { name: "MQTT", type: "IoT" },
        { name: "Mapbox GL", type: "Maps" },
        { name: "TimescaleDB", type: "Database" },
        { name: "Redis", type: "Cache" },
        { name: "Docker", type: "DevOps" },
        { name: "AWS IoT Core", type: "Cloud" },
      ]),
      gallery: JSON.stringify([
        { url: "/images/gallery/smartcity-1.jpg", caption: "City-wide sensor map with real-time air quality overlay" },
        { url: "/images/gallery/smartcity-2.jpg", caption: "Traffic heatmap with congestion prediction" },
        { url: "/images/gallery/smartcity-3.jpg", caption: "Waste management dashboard with fill-level alerts" },
      ]),
      testimonial: "This platform has given us unprecedented visibility into how our city functions. The air quality monitoring alone has been invaluable for public health policy. Newa Enterprises delivered a world-class solution for Kathmandu.",
      testimonialAuthor: "Bishnu Adhikari",
      testimonialRole: "Chief Technology Officer, Kathmandu Metropolitan City",
      completionDate: "2026-05-01",
    },
  ];
  for (const p of portfolio) {
    await query(
      `INSERT INTO "PortfolioItem" ("id","title","slug","description","category","client","clientOverview","problem","solution","results","metrics","techStack","gallery","testimonial","testimonialAuthor","testimonialRole","completionDate","isActive","updatedAt")
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::json,$12::json,$13::json,$14,$15,$16,$17::date,true,NOW())`,
      [p.id, p.title, p.slug, p.description, p.category, p.client,
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
      content: `<p>Next.js 16 has arrived, and it's not just another incremental update — it represents a fundamental shift in how we build and deploy enterprise web applications. Combined with Turbopack, the Rust-based bundler that replaces Webpack, this release delivers performance improvements that directly impact your bottom line.</p>

<h2>What's New in Next.js 16</h2>
<p>Next.js 16 introduces the stable App Router as the default, Server Components as a first-class citizen, and streaming SSR that sends HTML progressively to the browser. For enterprise applications handling large datasets, this means Time to First Byte (TTFB) improvements of 40-60% compared to Pages Router.</p>

<h2>Turbopack: 700x Faster Than Webpack</h2>
<p>Turbopack, built in Rust by the Vercel team, achieves cold starts 700x faster than Webpack and hot module replacements that are effectively instant. In our testing at Newa Enterprises, a Next.js enterprise application with 2,000+ components that previously took 45 seconds for a production build now compiles in under 4 seconds.</p>

<h2>Why This Matters for Nepali Businesses</h2>
<p>For Nepali enterprises operating on slower internet connections, the reduced bundle sizes and faster load times translate directly to better user engagement. Our e-commerce clients have seen conversion rate improvements of 15-25% after migrating from traditional SPAs to Next.js 16 with Turbopack.</p>

<p>At Newa Enterprises, we've already migrated 12 enterprise clients to Next.js 16. The performance improvements have been dramatic — average Lighthouse scores went from 65 to 95+, and server costs decreased by 40% due to more efficient edge caching.</p>`,
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

<p>At Newa Enterprises, we've integrated these gateways for 25+ clients. Our average integration time is 3 days, and our systems handle 99.9% payment success rates.</p>`,
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
<p>Proper environment management is critical. Use Vercel's Environment Variables UI for staging, preview, and production environments. Never hardcode secrets — use Vercel's built-in encryption for environment variables and consider using a secrets manager like Doppler for larger teams.</p>

<h2>Build Optimization</h2>
<p>Our production Next.js 16 builds went from 8 minutes to 45 seconds by implementing: proper dependency caching in Turbo mode, selective ESM/CJS module resolution, and parallel route compilation. The Vercel Remote Caching feature reduced our team's collective build time by 70%.</p>

<h2>Monitoring & Observability</h2>
<p>Don't launch without monitoring. We integrate Sentry for error tracking, Datadog for performance monitoring, and Vercel Analytics for real-time user insights. Set up Slack alerts for build failures, error rate spikes, and performance regressions. Our standard SLA is 15-minute response time for production incidents.</p>

<h2>Cost Optimization</h2>
<p>Vercel's Pro plan with team seats costs $300/month for most mid-size applications. Optimize costs by: implementing proper ISR revalidation intervals (don't revalidate every page every 10 seconds!), using Edge Functions only when necessary, and monitoring bandwidth usage through Vercel's analytics dashboard.</p>`,
      excerpt: "A production deployment playbook for Next.js 16 on Vercel — environment management, build optimization, monitoring, and cost control.",
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

  // Create job listings
  const jobs = [
    { id: "jb00000000000000000001", title: "Sales Executive", slug: "sales-executive", location: "Baneshwor, Kathmandu", type: "full-time", department: "Sales & Marketing", description: "We are looking for an energetic Sales Executive to join our team in Baneshwor. You will be responsible for business development, client relationship management, and achieving sales targets for our trading and services divisions.", requirements: "- Bachelor's degree in Business Administration or related field\n- Minimum 2 years of sales experience\n- Excellent communication and negotiation skills\n- Knowledge of Kathmandu Valley market\n- Valid motorcycle license preferred", salary: "NPR 35,000 - 50,000 per month" },
    { id: "jb00000000000000000002", title: "Logistics Coordinator", slug: "logistics-coordinator", location: "Baneshwor, Kathmandu", type: "full-time", department: "Operations", description: "Newa Enterprises is seeking a Logistics Coordinator to manage our supply chain and transportation operations. You will coordinate with suppliers, fleet drivers, and clients to ensure timely delivery of goods across the Kathmandu Valley.", requirements: "- Bachelor's degree in Supply Chain Management or related field\n- 3+ years of logistics experience\n- Familiarity with Kathmandu Valley routes\n- Strong organizational and problem-solving skills\n- Proficiency in MS Office and inventory management software", salary: "NPR 40,000 - 60,000 per month" },
    { id: "jb00000000000000000003", title: "Web Developer (Part-Time)", slug: "web-developer-part-time", location: "Remote / Baneshwor", type: "part-time", department: "IT & Digital", description: "We are looking for a skilled Web Developer to join our IT team on a part-time basis. You will work on client websites, e-commerce platforms, and payment gateway integrations with eSewa and Khalti.", requirements: "- Proficiency in React, Next.js, and Tailwind CSS\n- Experience with Node.js and API development\n- Knowledge of Nepal payment gateways (eSewa, Khalti API)\n- Familiarity with PostgreSQL or MongoDB\n- Portfolio of previous work required", salary: "NPR 25,000 - 40,000 per month" },
  ];
  for (const j of jobs) {
    await query(
      `INSERT INTO "Job" ("id","title","slug","location","type","department","description","requirements","salary","isActive","updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,true,NOW()) ON CONFLICT ("slug") DO UPDATE SET "title"=EXCLUDED."title","description"=EXCLUDED."description"`,
      [j.id, j.title, j.slug, j.location, j.type, j.department, j.description, j.requirements, j.salary]
    );
  }
  console.log(`Created ${jobs.length} job listings`);

  // Create site settings
  const settings = [
    { key: "company_name", value: "Newa Enterprises" },
    { key: "company_tagline", value: "Your Trusted Business Partner in Baneshwor, Kathmandu" },
    { key: "company_address", value: "Baneshwor, Kathmandu, Nepal" },
    { key: "company_phone", value: "+977-1-4XXXXXX" },
    { key: "company_email", value: "info@newaenterprises.com" },
    { key: "company_hours", value: "Sunday - Friday: 9:00 AM - 6:00 PM" },
    { key: "hero_title", value: "Newa Enterprises — Building Business, Building Nepal" },
    { key: "hero_subtitle", value: "Trusted trading, consultancy, and digital services provider in Baneshwor, Kathmandu. We help Nepali businesses grow with reliable supply chains and modern digital solutions." },
    { key: "about_story", value: "Founded in 2014 by Rajesh Shrestha, Newa Enterprises began as a small trading operation in Baneshwor, Kathmandu. What started with supplying construction materials to local builders has grown into a diversified business serving clients across Nepal." },
    { key: "mission", value: "To empower Nepali businesses with reliable supply chains, expert consultancy, and modern digital solutions that drive growth and prosperity." },
    { key: "vision", value: "To be Nepal's most trusted business partner — known for integrity, quality, and innovation in every sector we serve." },
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
    { page: "home", title: "Newa Enterprises — Trusted Business Partner in Baneshwor, Kathmandu", subtitle: "Trading, Consultancy & Digital Services", metaTitle: "Newa Enterprises — Trusted Business Partner in Baneshwor, Kathmandu", metaDescription: "Newa Enterprises in Baneshwor, Kathmandu offers reliable trading, consultancy, logistics, and digital services for Nepali businesses." },
    { page: "about", title: "About Newa Enterprises — Our Story, Mission & Team", subtitle: "Learn about our journey since 2014", metaTitle: "About Newa Enterprises — Baneshwor, Kathmandu", metaDescription: "Discover the story of Newa Enterprises, our mission to empower Nepali businesses, and meet our experienced team." },
    { page: "services", title: "Our Services — Trading, Consultancy & Digital Solutions", subtitle: "Comprehensive business services in Kathmandu", metaTitle: "Services — Newa Enterprises | Baneshwor, Kathmandu", metaDescription: "Explore Newa Enterprises' services: general trading & supplies, consultancy, logistics, e-commerce, IT, and import/export facilitation." },
    { page: "portfolio", title: "Our Portfolio — Projects & Case Studies", subtitle: "See our work across Nepal", metaTitle: "Portfolio — Newa Enterprises | Projects in Kathmandu", metaDescription: "View Newa Enterprises' portfolio of construction supply, e-commerce, logistics, and consultancy projects across the Kathmandu Valley." },
    { page: "blog", title: "Blog — Insights & Updates from Newa Enterprises", subtitle: "Business tips, guides, and company news", metaTitle: "Blog — Newa Enterprises | Business Insights Nepal", metaDescription: "Read the latest articles from Newa Enterprises on digital payments (eSewa, Khalti), construction sourcing, business growth, and more." },
    { page: "contact", title: "Contact Newa Enterprises — Baneshwor, Kathmandu", subtitle: "Get in touch with our team", metaTitle: "Contact — Newa Enterprises | Baneshwor, Kathmandu", metaDescription: "Contact Newa Enterprises in Baneshwor, Kathmandu for trading, consultancy, logistics, and digital services." },
    { page: "careers", title: "Careers — Join the Newa Enterprises Team", subtitle: "Build your career with us", metaTitle: "Careers — Newa Enterprises | Jobs in Kathmandu", metaDescription: "Explore career opportunities at Newa Enterprises in Baneshwor, Kathmandu." },
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

  console.log("\n✅ Database seeded successfully!");
  console.log("📧 Admin login: admin@newaenterprises.com / Admin@123");
  console.log("📧 Editor login: editor@newaenterprises.com / Editor@123");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
