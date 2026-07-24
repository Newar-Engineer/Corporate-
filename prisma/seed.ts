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
      title: "General Trading & Supplies",
      slug: "general-trading-supplies",
      description: "Newa Enterprises is a trusted supplier of high-quality construction materials, hardware, and general goods in Baneshwor, Kathmandu. We source directly from verified manufacturers ensuring competitive pricing and timely delivery across the Kathmandu Valley. Our extensive supply chain network covers everything from cement and steel to sanitary ware and electrical fittings.",
      icon: "FiShoppingBag",
      order: 1,
      features: JSON.stringify([
        { title: "Quality Construction Materials", description: "Cement, steel, aggregates, bricks, and all building materials sourced from ISO-certified manufacturers." },
        { title: "Verified Supplier Network", description: "We maintain a curated network of verified manufacturers and distributors across Nepal and India." },
        { title: "Competitive Bulk Pricing", description: "Leverage our bulk purchasing power to get the best rates for your projects." },
        { title: "Timely Valley-Wide Delivery", description: "Dedicated fleet ensuring on-time delivery across all Kathmandu Valley locations." },
        { title: "Electrical & Sanitary Ware", description: "Complete range of electrical fittings, pipes, sanitary ware, and finishing materials." },
        { title: "Inventory Management", description: "Real-time inventory tracking and just-in-time delivery to minimize project downtime." },
      ]),
      techStack: JSON.stringify([
        { name: "Supplier Portal", type: "Platform" },
        { name: "ERPNext", type: "ERP" },
        { name: "InventoryPro", type: "Inventory" },
        { name: "Google Maps API", type: "Logistics" },
        { name: "Nepal Rastra Bank", type: "Compliance" },
      ]),
      processSteps: JSON.stringify([
        { title: "Requirement Assessment", description: "We evaluate your project needs and provide a detailed material take-off.", duration: "1-2 days" },
        { title: "Sourcing & Quotation", description: "We source from our verified suppliers and provide competitive quotations.", duration: "2-3 days" },
        { title: "Order Confirmation", description: "Once approved, we finalize the order and schedule delivery timelines.", duration: "1 day" },
        { title: "Procurement & Quality Check", description: "Materials are procured and quality-checked before dispatch.", duration: "3-5 days" },
        { title: "Logistics & Delivery", description: "Our fleet delivers materials to your site on the scheduled date.", duration: "1-2 days" },
        { title: "Post-Delivery Support", description: "We follow up to ensure satisfaction and handle any issues promptly.", duration: "Ongoing" },
      ]),
      timeline: "3-10 days",
    },
    {
      id: "svc00000000000000000002",
      title: "Consultancy & Project Management",
      slug: "consultancy-project-management",
      description: "We provide end-to-end consultancy services for commercial and residential projects in Nepal. Our team of experienced engineers and project managers handles everything from feasibility studies and cost estimation to vendor coordination and site supervision. We ensure your project is completed on time, within budget, and to the highest standards.",
      icon: "FiMonitor",
      order: 2,
      features: JSON.stringify([
        { title: "Feasibility Studies", description: "Comprehensive technical and financial feasibility analysis for your project." },
        { title: "Cost Estimation & Budgeting", description: "Detailed BOQ preparation, cost estimation, and budget planning." },
        { title: "Vendor Coordination", description: "End-to-end vendor sourcing, evaluation, and coordination management." },
        { title: "Site Supervision", description: "Experienced engineers for on-site quality control and progress monitoring." },
        { title: "Regulatory Compliance", description: "Assistance with permits, approvals, and regulatory requirements." },
        { title: "Project Handover", description: "Structured handover with documentation, as-built drawings, and maintenance plans." },
      ]),
      techStack: JSON.stringify([
        { name: "AutoCAD", type: "Design" },
        { name: "Primavera P6", type: "Planning" },
        { name: "MS Project", type: "Management" },
        { name: "BIM 360", type: "Collaboration" },
        { name: "SAP ERP", type: "ERP" },
      ]),
      processSteps: JSON.stringify([
        { title: "Discovery & Scoping", description: "Understand project objectives, constraints, and stakeholder requirements.", duration: "1-2 weeks" },
        { title: "Feasibility & Planning", description: "Conduct technical and financial feasibility studies with detailed planning.", duration: "2-4 weeks" },
        { title: "Design & Estimation", description: "Prepare detailed designs, BOQ, and cost estimates.", duration: "2-3 weeks" },
        { title: "Vendor Selection", description: "Evaluate and select vendors through a transparent bidding process.", duration: "1-2 weeks" },
        { title: "Execution & Supervision", description: "On-site project management, quality control, and progress tracking.", duration: "Per project" },
        { title: "Handover & Review", description: "Structured handover with post-project review and documentation.", duration: "1 week" },
      ]),
      timeline: "4-12 weeks",
    },
    {
      id: "svc00000000000000000003",
      title: "Logistics & Transportation",
      slug: "logistics-transportation",
      description: "Reliable logistics and transportation services across Nepal. We operate a fleet of trucks and delivery vehicles serving the Kathmandu Valley and major highways. Whether you need raw material delivery to a construction site or finished goods transport to retail locations, our logistics team ensures safe and on-time delivery every time.",
      icon: "FiTruck",
      order: 3,
      features: JSON.stringify([
        { title: "Fleet Management", description: "Modern fleet of trucks, pickups, and delivery vehicles for all cargo sizes." },
        { title: "Valley-Wide Coverage", description: "Same-day and next-day delivery across all Kathmandu Valley locations." },
        { title: "Highway Transport", description: "Inter-city and highway logistics connecting major Nepali markets." },
        { title: "Real-Time Tracking", description: "GPS-enabled tracking for real-time shipment visibility." },
        { title: "Safe Handling", description: "Professional loading, securing, and unloading for damage-free transport." },
        { title: "Bulk & Heavy Loads", description: "Specialized equipment for heavy machinery and bulk material transport." },
      ]),
      techStack: JSON.stringify([
        { name: "GPS Tracking", type: "Tracking" },
        { name: "LogiNext", type: "Platform" },
        { name: "Route4Me", type: "Optimization" },
        { name: "Google Maps API", type: "Navigation" },
        { name: "TallyPrime", type: "Accounting" },
      ]),
      processSteps: JSON.stringify([
        { title: "Pickup Scheduling", description: "Coordinate pickup location, time, and cargo specifications.", duration: "1 day" },
        { title: "Loading & Inspection", description: "Professional loading with cargo inspection and documentation.", duration: "2-4 hours" },
        { title: "Route Optimization", description: "Optimal route planning considering traffic, road conditions, and priority.", duration: "Real-time" },
        { title: "Transit & Tracking", description: "Real-time GPS tracking with proactive driver communication.", duration: "Per route" },
        { title: "Delivery Confirmation", description: "Proof of delivery with digital signatures and photos.", duration: "At delivery" },
        { title: "Feedback & Billing", description: "Post-delivery feedback collection and invoice generation.", duration: "1 day" },
      ]),
      timeline: "1-3 days",
    },
    {
      id: "svc00000000000000000004",
      title: "E-commerce Solutions",
      slug: "ecommerce-solutions",
      description: "Launch your online store with Nepal's preferred payment gateways — eSewa, Khalti, and Cash on Delivery (COD). Newa Enterprises provides complete e-commerce setup including website development, payment integration, inventory management, and last-mile delivery coordination. We help traditional businesses in Kathmandu go digital with confidence.",
      icon: "FiTrendingUp",
      order: 4,
      features: JSON.stringify([
        { title: "Custom E-Commerce Platform", description: "Tailored online store with product catalog, cart, and checkout experience." },
        { title: "Nepal Payment Integration", description: "Seamless integration with eSewa, Khalti, and COD payment options." },
        { title: "Inventory Management", description: "Real-time stock tracking, low-stock alerts, and supplier management." },
        { title: "Order Fulfillment", description: "End-to-end order processing, packaging, and delivery coordination." },
        { title: "Mobile-Optimized Design", description: "Responsive design optimized for Nepal's mobile-first user base." },
        { title: "Analytics & Reporting", description: "Sales analytics, customer insights, and performance dashboards." },
      ]),
      techStack: JSON.stringify([
        { name: "Next.js", type: "Frontend" },
        { name: "React", type: "Frontend" },
        { name: "Tailwind CSS", type: "Frontend" },
        { name: "Node.js", type: "Backend" },
        { name: "PostgreSQL", type: "Database" },
        { name: "eSewa API", type: "Payment" },
        { name: "Khalti API", type: "Payment" },
        { name: "Vercel", type: "Hosting" },
      ]),
      processSteps: JSON.stringify([
        { title: "Discovery & Planning", description: "Understand business model, target audience, and feature requirements.", duration: "1 week" },
        { title: "UI/UX Design", description: "Design wireframes, prototypes, and mobile-first user interfaces.", duration: "2 weeks" },
        { title: "Development", description: "Build the platform with payment integration, inventory, and order systems.", duration: "4-6 weeks" },
        { title: "Payment Integration", description: "Integrate and test eSewa, Khalti, and COD payment gateways.", duration: "1 week" },
        { title: "Quality Assurance", description: "Comprehensive testing including payment flows and mobile responsiveness.", duration: "1 week" },
        { title: "Launch & Support", description: "Deploy to production with ongoing maintenance and support.", duration: "Ongoing" },
      ]),
      timeline: "6-10 weeks",
    },
    {
      id: "svc00000000000000000005",
      title: "IT & Digital Services",
      slug: "it-digital-services",
      description: "From website development to digital marketing, Newa Enterprises offers a full spectrum of IT services tailored for Nepali businesses. Our team builds responsive websites, manages social media campaigns, handles SEO optimization, and provides IT infrastructure support. We empower Baneshwor businesses with modern digital tools.",
      icon: "FiTool",
      order: 5,
      features: JSON.stringify([
        { title: "Website Development", description: "Custom Next.js websites with blazing-fast performance and SEO optimization." },
        { title: "Mobile Applications", description: "Cross-platform mobile apps built with React Native and Flutter." },
        { title: "Digital Marketing", description: "Social media management, Google Ads, and targeted marketing campaigns." },
        { title: "SEO Optimization", description: "On-page and off-page SEO to improve search rankings and organic traffic." },
        { title: "IT Infrastructure", description: "Network setup, cloud migration, and IT support for businesses." },
        { title: "Brand Identity", description: "Logo design, brand guidelines, and visual identity development." },
      ]),
      techStack: JSON.stringify([
        { name: "Next.js", type: "Frontend" },
        { name: "React", type: "Frontend" },
        { name: "TypeScript", type: "Language" },
        { name: "Node.js", type: "Backend" },
        { name: "PostgreSQL", type: "Database" },
        { name: "AWS", type: "Cloud" },
        { name: "Figma", type: "Design" },
        { name: "Google Analytics", type: "Analytics" },
      ]),
      processSteps: JSON.stringify([
        { title: "Discovery", description: "Understand business goals, target audience, and technical requirements.", duration: "1 week" },
        { title: "Strategy & Design", description: "Create project roadmap, wireframes, and visual design mockups.", duration: "1-2 weeks" },
        { title: "Development", description: "Agile development with regular sprints and client demos.", duration: "3-8 weeks" },
        { title: "Testing & QA", description: "Functional testing, performance optimization, and cross-browser testing.", duration: "1 week" },
        { title: "Deployment", description: "Production deployment with CI/CD pipeline and monitoring setup.", duration: "3-5 days" },
        { title: "Ongoing Support", description: "Maintenance, updates, and 24/7 technical support.", duration: "Ongoing" },
      ]),
      timeline: "4-10 weeks",
    },
    {
      id: "svc00000000000000000006",
      title: "Import & Export Facilitation",
      slug: "import-export-facilitation",
      description: "Newa Enterprises facilitates international trade for Nepali businesses. We handle customs documentation, freight coordination, supplier verification, and quality inspection services. With strong ties to suppliers in India, China, and Southeast Asia, we help importers and exporters in Nepal navigate cross-border trade efficiently.",
      icon: "FiUsers",
      order: 6,
      features: JSON.stringify([
        { title: "Customs Documentation", description: "Complete documentation management including bill of lading, invoice, and permits." },
        { title: "Freight Coordination", description: "Air, sea, and land freight booking and tracking for international shipments." },
        { title: "Supplier Verification", description: "On-ground verification of suppliers in India, China, and SE Asia." },
        { title: "Quality Inspection", description: "Pre-shipment quality inspection and factory audit services." },
        { title: "Regulatory Compliance", description: "Navigation of Nepal's import/export regulations, tariffs, and duties." },
        { title: "Trade Finance", description: "Assistance with letter of credit, bank guarantees, and trade financing." },
      ]),
      techStack: JSON.stringify([
        { name: "Customs EDI", type: "Platform" },
        { name: "TradeLens", type: "Blockchain" },
        { name: "SAP GTS", type: "Compliance" },
        { name: "Flexport", type: "Freight" },
        { name: "Nepal Customs", type: "Government" },
      ]),
      processSteps: JSON.stringify([
        { title: "Requirement Analysis", description: "Understand product specifications, quantity, and delivery timelines.", duration: "1 week" },
        { title: "Supplier Sourcing", description: "Identify and verify suppliers across target markets.", duration: "2-3 weeks" },
        { title: "Negotiation & Contract", description: "Price negotiation, contract finalization, and payment terms agreement.", duration: "1 week" },
        { title: "Logistics & Customs", description: "Freight booking, customs documentation, and clearance coordination.", duration: "1-2 weeks" },
        { title: "Quality Verification", description: "Pre-shipment inspection and quality verification at origin.", duration: "At shipment" },
        { title: "Delivery & Settlement", description: "Final delivery with payment settlement and post-delivery support.", duration: "1 week" },
      ]),
      timeline: "4-8 weeks",
    },
  ];

  for (const svc of services) {
    await query(
      `INSERT INTO "Service" ("id", "title", "slug", "description", "icon", "order", "features", "techStack", "processSteps", "timeline", "isActive", "updatedAt")
       VALUES ($1,$2,$3,$4,$5,$6,$7::json,$8::json,$9::json,$10,true,NOW())
       ON CONFLICT ("slug") DO UPDATE SET
         "title"=EXCLUDED."title", "description"=EXCLUDED."description",
         "icon"=EXCLUDED."icon", "order"=EXCLUDED."order",
         "features"=EXCLUDED."features", "techStack"=EXCLUDED."techStack",
         "processSteps"=EXCLUDED."processSteps", "timeline"=EXCLUDED."timeline"`,
      [svc.id, svc.title, svc.slug, svc.description, svc.icon, svc.order, svc.features, svc.techStack, svc.processSteps, svc.timeline]
    );
  }
  console.log(`Created ${services.length} services`);

  // Create team members
  const team = [
    { id: "tm00000000000000000001", name: "Rajesh Shrestha", role: "Managing Director", bio: "With over 20 years of experience in Nepal's trading and logistics sector, Rajesh founded Newa Enterprises in 2014. He oversees strategic direction, partnerships, and business development. A proud Newar businessman from Baneshwor, he is deeply committed to the local community's economic growth.", socialLinks: JSON.stringify({ linkedin: "https://linkedin.com", facebook: "https://facebook.com" }), order: 1 },
    { id: "tm00000000000000000002", name: "Sunita Maharjan", role: "Operations Manager", bio: "Sunita brings 12 years of operational expertise to Newa Enterprises. She manages day-to-day operations, supply chain logistics, and vendor relationships. Her meticulous planning ensures every delivery reaches our clients on schedule.", socialLinks: JSON.stringify({ linkedin: "https://linkedin.com" }), order: 2 },
    { id: "tm00000000000000000003", name: "Anil Bajracharya", role: "Head of IT & Digital", bio: "Anil leads our digital transformation initiatives and IT services division. A computer engineering graduate from Pulchowk Campus, he has built e-commerce platforms, payment integrations, and digital marketing campaigns for over 50 Nepali businesses.", socialLinks: JSON.stringify({ linkedin: "https://linkedin.com", twitter: "https://twitter.com" }), order: 3 },
    { id: "tm00000000000000000004", name: "Pooja Manandhar", role: "Finance & Accounts", bio: "Pooja manages financial planning, accounting, and compliance at Newa Enterprises. With an MBA from Kathmandu University and 8 years of experience in corporate finance, she ensures transparent and efficient financial operations.", socialLinks: JSON.stringify({ linkedin: "https://linkedin.com" }), order: 4 },
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
    { id: "tt00000000000000000001", clientName: "Hari K. Shakya", company: "Shakya Construction Pvt. Ltd.", message: "Newa Enterprises has been our primary supplier for construction materials for over 3 years. Their reliability and competitive pricing are unmatched in the Kathmandu Valley. Highly recommended for any construction firm.", rating: 5, approved: true },
    { id: "tt00000000000000000002", clientName: "Maya Dangol", company: "Dangol Traders, Baneshwor", message: "We partnered with Newa Enterprises for our e-commerce launch and they handled everything — from website development to eSewa and Khalti integration. Our online sales have grown 300% in just 6 months!", rating: 5, approved: true },
    { id: "tt00000000000000000003", clientName: "Prakash Joshi", company: "Joshi & Sons Hardware", message: "The logistics team at Newa Enterprises is exceptional. They've streamlined our supply chain and reduced delivery times by half. Their professionalism and dedication set them apart from other logistics providers in Nepal.", rating: 4, approved: true },
    { id: "tt00000000000000000004", clientName: "Sushila Shrestha", company: "Bouddha Boutique Hotel", message: "Newa Enterprises provided end-to-end consultancy for our hotel renovation project. Their project management team was on-site daily, ensuring quality and timeline adherence. We are extremely satisfied with the outcome.", rating: 5, approved: true },
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
      title: "Baneshwor Commercial Complex Supply",
      slug: "baneshwor-commercial-complex",
      description: "Complete building material supply for a 5-story commercial complex in Baneshwor, Kathmandu. Supplied cement, steel reinforcement, electrical fittings, and sanitary ware over a 12-month period.",
      category: "Construction Supply",
      client: "Modern Builders Pvt. Ltd.",
      clientOverview: "Modern Builders Pvt. Ltd. is a premier construction firm based in Kathmandu, specializing in mid-rise commercial developments. With over 15 years of experience, they required a dependable material supplier who could maintain consistent quality and delivery schedules across a complex 12-month build.",
      problem: "The project demanded a consistent, high-volume supply of diverse construction materials — from structural steel and cement to electrical fittings and finishing hardware. Previous suppliers had failed to maintain timelines, causing costly project delays. Modern Builders needed a single partner who could handle end-to-end procurement, quality verification, and just-in-time delivery across multiple material categories.",
      solution: "Newa Enterprises deployed a dedicated project management team on-site, coordinated with 8 verified manufacturers across Nepal and India, implemented a weekly delivery schedule synchronized with the construction milestones, and provided daily inventory updates to the project managers. A buffer stock of critical materials was maintained at our Baneshwor warehouse to prevent any supply interruption.",
      results: "Delivered 100% of required materials within the project timeline. The client reported zero construction delays due to material shortage — a first for a project of this scale. The successful partnership led to Modern Builders engaging Newa Enterprises for two subsequent projects.",
      metrics: JSON.stringify([
        { label: "Materials Delivered", value: "2,500+ tons" },
        { label: "On-Time Delivery", value: "98.7%" },
        { label: "Project Timeline", value: "12 months" },
        { label: "Zero Delays", value: "Due to Shortage" },
      ]),
      techStack: JSON.stringify([
        { name: "InventoryPro", type: "Inventory" },
        { name: "ERPNext", type: "ERP" },
        { name: "Google Maps API", type: "Logistics" },
        { name: "AutoCAD", type: "Design" },
      ]),
      gallery: JSON.stringify([
        { url: "/images/gallery/complex-1.jpg", caption: "Building material staging at Baneshwor site" },
        { url: "/images/gallery/complex-2.jpg", caption: "Steel reinforcement delivery and inspection" },
        { url: "/images/gallery/complex-3.jpg", caption: "Completed 5-story commercial complex" },
      ]),
      testimonial: "Newa Enterprises has been our primary supplier for construction materials for over 3 years. Their reliability and competitive pricing are unmatched in the Kathmandu Valley. Highly recommended for any construction firm.",
      testimonialAuthor: "Hari K. Shakya",
      testimonialRole: "Director, Modern Builders Pvt. Ltd.",
      completionDate: "2025-11-15",
    },
    {
      id: "pf00000000000000000002",
      title: "eSewa & Khalti Integration for Dangol Traders",
      slug: "esewa-khalti-dangol-traders",
      description: "Full e-commerce platform development with Nepal payment gateway integration (eSewa, Khalti, COD) for Dangol Traders, a Baneshwor-based retail business. Includes inventory management and delivery tracking.",
      category: "E-commerce",
      client: "Dangol Traders",
      clientOverview: "Dangol Traders is a well-established retail business in Baneshwor, Kathmandu, specializing in household goods and electronics. They had a loyal local customer base but were losing market share to online competitors and wanted to launch an e-commerce presence with Nepal's preferred payment methods.",
      problem: "Dangol Traders had no online presence and their customers increasingly demanded digital payment options. Existing off-the-shelf e-commerce platforms didn't support eSewa or Khalti — Nepal's two dominant payment gateways. They needed a custom solution that integrated seamlessly with their existing inventory, supported COD, and worked reliably on mobile devices where 80% of their web traffic would originate.",
      solution: "We built a custom Next.js e-commerce platform with a mobile-first design, integrated eSewa and Khalti APIs for real-time payment processing, implemented a dual-language (Nepali/English) interface, connected their warehouse inventory system for live stock updates, and set up automated SMS order confirmations via Nepal Telecom's API.",
      results: "Online sales reached 30% of total revenue within 3 months. Customer reach expanded beyond Baneshwor to the entire Kathmandu Valley. The integrated payment gateways reduced cart abandonment by 45% compared to COD-only checkouts.",
      metrics: JSON.stringify([
        { label: "Online Revenue", value: "30% of Total" },
        { label: "Cart Abandonment", value: "-45%" },
        { label: "Monthly Orders", value: "1,200+" },
        { label: "Customer Reach", value: "Valley-Wide" },
      ]),
      techStack: JSON.stringify([
        { name: "Next.js", type: "Frontend" },
        { name: "React", type: "Frontend" },
        { name: "Tailwind CSS", type: "Frontend" },
        { name: "Node.js", type: "Backend" },
        { name: "PostgreSQL", type: "Database" },
        { name: "eSewa API", type: "Payment" },
        { name: "Khalti API", type: "Payment" },
        { name: "Vercel", type: "Hosting" },
      ]),
      gallery: JSON.stringify([
        { url: "/images/gallery/esewa-1.jpg", caption: "E-commerce homepage with featured products" },
        { url: "/images/gallery/esewa-2.jpg", caption: "eSewa and Khalti payment checkout screen" },
        { url: "/images/gallery/esewa-3.jpg", caption: "Mobile-responsive product listing" },
      ]),
      testimonial: "We partnered with Newa Enterprises for our e-commerce launch and they handled everything — from website development to eSewa and Khalti integration. Our online sales have grown 300% in just 6 months!",
      testimonialAuthor: "Maya Dangol",
      testimonialRole: "Owner, Dangol Traders",
      completionDate: "2026-03-20",
    },
    {
      id: "pf00000000000000000003",
      title: "Kathmandu Valley Logistics Overhaul",
      slug: "kathmandu-logistics-overhaul",
      description: "Designed and implemented a new logistics routing system for Joshi & Sons Hardware, reducing delivery times by 50% across 12 retail locations in the Kathmandu Valley.",
      category: "Logistics",
      client: "Joshi & Sons Hardware",
      clientOverview: "Joshi & Sons Hardware operates 12 retail outlets across the Kathmandu Valley, serving contractors, builders, and walk-in customers. Their central warehouse in Kalimati distributed goods to all locations, but the logistics operation was fragmented and inefficient.",
      problem: "The company relied on manual dispatch planning and individual drivers choosing their own routes. This led to inconsistent delivery times, high fuel costs, frequent overtime, and customer complaints about late deliveries. Store managers had no visibility into incoming shipments, making inventory planning impossible.",
      solution: "Newa Enterprises designed a centralized logistics system using GPS-tracked vehicles, optimized multi-stop routing algorithms, and a real-time dashboard for dispatch managers. We trained 15 drivers on the new system, implemented morning-wave scheduling for high-priority deliveries, and created a store-level ETA notification system.",
      results: "Average delivery time dropped from 4.5 hours to 2.2 hours. Fuel costs decreased by 28% through optimized routing. Customer satisfaction scores improved by 35 points. The system was recognized by the Kathmandu Chamber of Commerce as a model for urban logistics.",
      metrics: JSON.stringify([
        { label: "Delivery Time", value: "-51%" },
        { label: "Fuel Cost Savings", value: "28%" },
        { label: "Customer Rating", value: "+35 pts" },
        { label: "Daily Routes", value: "48 optimized" },
      ]),
      techStack: JSON.stringify([
        { name: "GPS Tracking", type: "Tracking" },
        { name: "Route4Me", type: "Optimization" },
        { name: "Google Maps API", type: "Navigation" },
        { name: "LogiNext", type: "Platform" },
        { name: "TallyPrime", type: "Accounting" },
      ]),
      gallery: JSON.stringify([
        { url: "/images/gallery/logistics-1.jpg", caption: "Dispatch dashboard with real-time tracking" },
        { url: "/images/gallery/logistics-2.jpg", caption: "Optimized route map across Kathmandu Valley" },
        { url: "/images/gallery/logistics-3.jpg", caption: "Fleet of delivery vehicles at Kalimati hub" },
      ]),
      testimonial: "The logistics team at Newa Enterprises is exceptional. They've streamlined our supply chain and reduced delivery times by half. Their professionalism and dedication set them apart from other logistics providers in Nepal.",
      testimonialAuthor: "Prakash Joshi",
      testimonialRole: "Operations Head, Joshi & Sons Hardware",
      completionDate: "2025-08-10",
    },
    {
      id: "pf00000000000000000004",
      title: "Hotel Bouddha Renovation Project",
      slug: "hotel-bouddha-renovation",
      description: "Full project management consultancy for the renovation of Bouddha Boutique Hotel. Scope included structural assessment, contractor coordination, material sourcing, and quality assurance.",
      category: "Consultancy",
      client: "Bouddha Boutique Hotel",
      clientOverview: "Bouddha Boutique Hotel is a 25-room heritage hotel located near the Bouddhanath Stupa in Kathmandu. The property, a restored Newar mansion, needed a comprehensive renovation to modernize facilities while preserving its architectural character.",
      problem: "The hotel's management lacked construction project management experience. Multiple contractor bids varied wildly in scope and price. There was no structural assessment or detailed renovation plan. The client needed a trusted advisor to navigate the entire renovation — from initial assessment through contractor selection, material sourcing, and quality control — while ensuring the hotel could reopen within a fixed 6-month window before peak tourist season.",
      solution: "Newa Enterprises conducted a full structural audit and heritage impact assessment, prepared detailed BOQ and tender documents, managed the contractor bidding process selecting 3 specialized firms, sourced period-appropriate materials from local artisans in Patan and Bhaktapur, and provided daily on-site supervision with weekly progress reports to hotel management.",
      results: "The renovation was completed in 5.5 months — 2 weeks ahead of schedule. The project came in 8% under budget due to competitive sourcing and tight supervision. The hotel reopened for the peak tourist season and received rave reviews for its blend of heritage charm and modern amenities.",
      metrics: JSON.stringify([
        { label: "Completion", value: "2 weeks early" },
        { label: "Budget", value: "8% under" },
        { label: "Rooms Renovated", value: "25" },
        { label: "Occupancy Post", value: "92%" },
      ]),
      techStack: JSON.stringify([
        { name: "AutoCAD", type: "Design" },
        { name: "Primavera P6", type: "Planning" },
        { name: "BIM 360", type: "Collaboration" },
        { name: "MS Project", type: "Management" },
      ]),
      gallery: JSON.stringify([
        { url: "/images/gallery/hotel-1.jpg", caption: "Heritage facade restoration in progress" },
        { url: "/images/gallery/hotel-2.jpg", caption: "Renovated lobby with traditional Newar architecture" },
        { url: "/images/gallery/hotel-3.jpg", caption: "Modern guest room with heritage touches" },
      ]),
      testimonial: "Newa Enterprises provided end-to-end consultancy for our hotel renovation project. Their project management team was on-site daily, ensuring quality and timeline adherence. We are extremely satisfied with the outcome.",
      testimonialAuthor: "Sushila Shrestha",
      testimonialRole: "Owner, Bouddha Boutique Hotel",
      completionDate: "2026-01-25",
    },
    {
      id: "pf00000000000000000005",
      title: "Newa Enterprises Digital Presence",
      slug: "newa-enterprises-website",
      description: "Designed and developed the complete digital presence for Newa Enterprises including this corporate website, social media profiles, and digital marketing strategy.",
      category: "Digital Services",
      client: "Newa Enterprises",
      clientOverview: "Newa Enterprises required a modern digital presence to showcase its diversified service portfolio — from construction supply to IT consulting — and attract both local and international clients. The existing website was outdated, non-responsive, and did not reflect the company's professional capabilities.",
      problem: "The old website was built on a legacy PHP platform that was insecure and slow. It had no mobile responsiveness (critical in Nepal's mobile-first market), no SEO optimization, no way for clients to submit inquiries online, and no integration with social media. The company was invisible in search results for key terms like 'construction supplier Kathmandu' or 'e-commerce development Nepal.'",
      solution: "We built a modern Next.js corporate website with glassmorphic dark theme design, server-side rendering for SEO, dynamic content management through a custom admin dashboard, integrated blog and portfolio sections, Nepal payment gateways (eSewa/Khalti) showcased as service offerings, and a comprehensive digital marketing strategy including Google Business Profile optimization and social media campaigns.",
      results: "Website traffic increased 8x within 3 months of launch. The site ranks on page 1 for 15+ key business search terms in Nepal. Online inquiries grew from 0-2 per month to 25+ per month. The site achieved 98/100 Google Lighthouse performance score.",
      metrics: JSON.stringify([
        { label: "Traffic Increase", value: "8x" },
        { label: "Search Rankings", value: "Page 1 for 15+" },
        { label: "Monthly Inquiries", value: "25+" },
        { label: "Lighthouse Score", value: "98/100" },
      ]),
      techStack: JSON.stringify([
        { name: "Next.js", type: "Frontend" },
        { name: "React", type: "Frontend" },
        { name: "TypeScript", type: "Language" },
        { name: "Tailwind CSS", type: "Frontend" },
        { name: "PostgreSQL", type: "Database" },
        { name: "Prisma", type: "Backend" },
        { name: "Vercel", type: "Hosting" },
        { name: "Google Analytics", type: "Analytics" },
      ]),
      gallery: JSON.stringify([
        { url: "/images/gallery/website-1.jpg", caption: "Homepage hero section with glassmorphic design" },
        { url: "/images/gallery/website-2.jpg", caption: "Services page with interactive cards" },
        { url: "/images/gallery/website-3.jpg", caption: "Admin dashboard for content management" },
      ]),
      testimonial: "This website transformed how clients perceive our company. The inquiry volume and quality have been exceptional. Newa Enterprises' own IT team delivered a world-class digital presence.",
      testimonialAuthor: "Rajesh Shrestha",
      testimonialRole: "Managing Director, Newa Enterprises",
      completionDate: "2026-07-01",
    },
  ];
  for (const p of portfolio) {
    await query(
      `INSERT INTO "PortfolioItem" ("id","title","slug","description","category","client","clientOverview","problem","solution","results","metrics","techStack","gallery","testimonial","testimonialAuthor","testimonialRole","completionDate","isActive","updatedAt")
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::json,$12::json,$13::json,$14,$15,$16,$17::date,true,NOW())
       ON CONFLICT ("slug") DO UPDATE SET
         "title"=EXCLUDED."title","description"=EXCLUDED."description",
         "category"=EXCLUDED."category","client"=EXCLUDED."client",
         "clientOverview"=EXCLUDED."clientOverview",
         "problem"=EXCLUDED."problem","solution"=EXCLUDED."solution",
         "results"=EXCLUDED."results",
         "metrics"=EXCLUDED."metrics","techStack"=EXCLUDED."techStack",
         "gallery"=EXCLUDED."gallery",
         "testimonial"=EXCLUDED."testimonial",
         "testimonialAuthor"=EXCLUDED."testimonialAuthor",
         "testimonialRole"=EXCLUDED."testimonialRole"`,
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
    { id: "bp00000000000000000001", title: "Why Nepal Businesses Should Go Digital in 2026", slug: "nepal-businesses-digital-2026", content: "<p>Nepal's digital landscape is transforming rapidly. With over 13 million internet users and mobile penetration exceeding 130%, the opportunity for Nepali businesses to expand online has never been greater.</p><p>At Newa Enterprises, we've helped dozens of Kathmandu-based businesses establish their digital presence. Here are the top reasons to go digital this year:</p><h2>1. Reach Customers Beyond Your Locality</h2><p>With e-commerce platforms and social media, a hardware store in Baneshwor can now serve customers across the entire Kathmandu Valley, and even beyond.</p><h2>2. Nepal Payment Gateways Are Now Accessible</h2><p>eSewa, Khalti, and Cash on Delivery have made online transactions seamless for Nepali consumers. Integrating these payment methods into your business is now easier than ever.</p><h2>3. Cost-Effective Marketing</h2><p>Digital marketing through Facebook, Instagram, and Google costs a fraction of traditional advertising while offering precise targeting and measurable results.</p><p>Ready to take your business digital? Contact Newa Enterprises for a free consultation.</p>", excerpt: "Nepal's digital economy is booming. Discover why 2026 is the year for your business to establish a strong online presence.", author: "Anil Bajracharya", publishedAt: "2026-07-15", status: "published" },
    { id: "bp00000000000000000002", title: "Understanding eSewa and Khalti for Your Business", slug: "esewa-khalti-business-guide", content: "<p>eSewa and Khalti are Nepal's two most popular digital payment platforms. Together, they process millions of transactions daily. For any business in Nepal, accepting payments through these platforms is no longer optional — it's essential.</p><h2>What is eSewa?</h2><p>eSewa is Nepal's first digital wallet, launched in 2009. With over 5 million users, it allows customers to pay bills, transfer money, and make online purchases.</p><h2>What is Khalti?</h2><p>Khalti is a popular digital payment platform integrated with over 10,000 merchants across Nepal. It offers features like Khalti QR, online payments, and utility bill payments.</p><h2>Why Integrate Both?</h2><p>Offering both eSewa and Khalti ensures you don't lose customers who prefer one platform over the other. Combined with Cash on Delivery (COD), you cover every payment preference.</p><p>Newa Enterprises provides seamless integration of both payment gateways for your e-commerce platform. Contact us to get started.</p>", excerpt: "A complete guide to integrating Nepal's top payment gateways — eSewa, Khalti, and COD — for your business.", author: "Anil Bajracharya", publishedAt: "2026-06-28", status: "published" },
    { id: "bp00000000000000000003", title: "Construction Material Sourcing in Nepal: A Guide", slug: "construction-material-sourcing-nepal", content: "<p>Sourcing quality construction materials at competitive prices is one of the biggest challenges for builders and contractors in Nepal. At Newa Enterprises, we've spent over a decade building a reliable supply chain. Here's what we've learned.</p><h2>1. Verify Supplier Credentials</h2><p>Always verify that your supplier has proper licenses, tax registration, and a track record of timely delivery. We maintain a verified network of manufacturers and distributors.</p><h2>2. Compare Pricing Across Suppliers</h2><p>Prices for materials like cement, steel, and aggregates can vary significantly. Newa Enterprises leverages bulk purchasing power to offer competitive rates without compromising quality.</p><h2>3. Plan for Logistics</h2><p>In Kathmandu, traffic and road conditions can impact delivery schedules. Work with a logistics partner who understands the local terrain and can plan accordingly.</p><p>Whether you need materials for a single project or ongoing supply, Newa Enterprises is your trusted partner in Baneshwor, Kathmandu.</p>", excerpt: "Learn how to source quality construction materials in Nepal with tips from Newa Enterprises' decade of experience in the trading sector.", author: "Rajesh Shrestha", publishedAt: "2026-05-20", status: "published" },
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
