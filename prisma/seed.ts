import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@newaenterprises.com" },
    update: {},
    create: {
      email: "admin@newaenterprises.com",
      password: "$2a$12$LJ3m4ys3Lk0TSwHnbfOMiOXPm1Qlq5GzGqZy8xKz5p8pBzFv1qKqO", // Admin@123
      name: "Super Admin",
      role: "super-admin",
    },
  });
  console.log("Created admin user:", admin.email);

  // Create editor user
  const editor = await prisma.user.upsert({
    where: { email: "editor@newaenterprises.com" },
    update: {},
    create: {
      email: "editor@newaenterprises.com",
      password: "$2a$12$LJ3m4ys3Lk0TSwHnbfOMiOXPm1Qlq5GzGqZy8xKz5p8pBzFv1qKqO", // Editor@123
      name: "Editor User",
      role: "editor",
    },
  });
  console.log("Created editor user:", editor.email);

  // Create services
  const services = [
    {
      title: "General Trading & Supplies",
      slug: "general-trading-supplies",
      description:
        "Newa Enterprises is a trusted supplier of high-quality construction materials, hardware, and general goods in Baneshwor, Kathmandu. We source directly from verified manufacturers ensuring competitive pricing and timely delivery across the Kathmandu Valley. Our extensive supply chain network covers everything from cement and steel to sanitary ware and electrical fittings.",
      icon: "FiShoppingBag",
      imageUrl: null,
      order: 1,
    },
    {
      title: "Consultancy & Project Management",
      slug: "consultancy-project-management",
      description:
        "We provide end-to-end consultancy services for commercial and residential projects in Nepal. Our team of experienced engineers and project managers handles everything from feasibility studies and cost estimation to vendor coordination and site supervision. We ensure your project is completed on time, within budget, and to the highest standards.",
      icon: "FiMonitor",
      imageUrl: null,
      order: 2,
    },
    {
      title: "Logistics & Transportation",
      slug: "logistics-transportation",
      description:
        "Reliable logistics and transportation services across Nepal. We operate a fleet of trucks and delivery vehicles serving the Kathmandu Valley and major highways. Whether you need raw material delivery to a construction site or finished goods transport to retail locations, our logistics team ensures safe and on-time delivery every time.",
      icon: "FiTruck",
      imageUrl: null,
      order: 3,
    },
    {
      title: "E-commerce Solutions",
      slug: "ecommerce-solutions",
      description:
        "Launch your online store with Nepal's preferred payment gateways — eSewa, Khalti, and Cash on Delivery (COD). Newa Enterprises provides complete e-commerce setup including website development, payment integration, inventory management, and last-mile delivery coordination. We help traditional businesses in Kathmandu go digital with confidence.",
      icon: "FiTrendingUp",
      imageUrl: null,
      order: 4,
    },
    {
      title: "IT & Digital Services",
      slug: "it-digital-services",
      description:
        "From website development to digital marketing, Newa Enterprises offers a full spectrum of IT services tailored for Nepali businesses. Our team builds responsive websites, manages social media campaigns, handles SEO optimization, and provides IT infrastructure support. We empower Baneshwor businesses with modern digital tools.",
      icon: "FiTool",
      imageUrl: null,
      order: 5,
    },
    {
      title: "Import & Export Facilitation",
      slug: "import-export-facilitation",
      description:
        "Newa Enterprises facilitates international trade for Nepali businesses. We handle customs documentation, freight coordination, supplier verification, and quality inspection services. With strong ties to suppliers in India, China, and Southeast Asia, we help importers and exporters in Nepal navigate cross-border trade efficiently.",
      icon: "FiUsers",
      imageUrl: null,
      order: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log(`Created ${services.length} services`);

  // Create team members
  const team = [
    {
      name: "Rajesh Shrestha",
      role: "Managing Director",
      photoUrl: null,
      bio: "With over 20 years of experience in Nepal's trading and logistics sector, Rajesh founded Newa Enterprises in 2014. He oversees strategic direction, partnerships, and business development. A proud Newar businessman from Baneshwor, he is deeply committed to the local community's economic growth.",
      socialLinks: JSON.stringify({ linkedin: "https://linkedin.com", facebook: "https://facebook.com" }),
      order: 1,
    },
    {
      name: "Sunita Maharjan",
      role: "Operations Manager",
      photoUrl: null,
      bio: "Sunita brings 12 years of operational expertise to Newa Enterprises. She manages day-to-day operations, supply chain logistics, and vendor relationships. Her meticulous planning ensures every delivery reaches our clients on schedule.",
      socialLinks: JSON.stringify({ linkedin: "https://linkedin.com" }),
      order: 2,
    },
    {
      name: "Anil Bajracharya",
      role: "Head of IT & Digital",
      photoUrl: null,
      bio: "Anil leads our digital transformation initiatives and IT services division. A computer engineering graduate from Pulchowk Campus, he has built e-commerce platforms, payment integrations, and digital marketing campaigns for over 50 Nepali businesses.",
      socialLinks: JSON.stringify({ linkedin: "https://linkedin.com", twitter: "https://twitter.com" }),
      order: 3,
    },
    {
      name: "Pooja Manandhar",
      role: "Finance & Accounts",
      photoUrl: null,
      bio: "Pooja manages financial planning, accounting, and compliance at Newa Enterprises. With an MBA from Kathmandu University and 8 years of experience in corporate finance, she ensures transparent and efficient financial operations.",
      socialLinks: JSON.stringify({ linkedin: "https://linkedin.com" }),
      order: 4,
    },
  ];

  for (const member of team) {
    await prisma.teamMember.create({ data: member });
  }
  console.log(`Created ${team.length} team members`);

  // Create testimonials
  const testimonials = [
    {
      clientName: "Hari K. Shakya",
      company: "Shakya Construction Pvt. Ltd.",
      message:
        "Newa Enterprises has been our primary supplier for construction materials for over 3 years. Their reliability and competitive pricing are unmatched in the Kathmandu Valley. Highly recommended for any construction firm.",
      rating: 5,
      photoUrl: null,
      approved: true,
    },
    {
      clientName: "Maya Dangol",
      company: "Dangol Traders, Baneshwor",
      message:
        "We partnered with Newa Enterprises for our e-commerce launch and they handled everything — from website development to eSewa and Khalti integration. Our online sales have grown 300% in just 6 months!",
      rating: 5,
      photoUrl: null,
      approved: true,
    },
    {
      clientName: "Prakash Joshi",
      company: "Joshi & Sons Hardware",
      message:
        "The logistics team at Newa Enterprises is exceptional. They've streamlined our supply chain and reduced delivery times by half. Their professionalism and dedication set them apart from other logistics providers in Nepal.",
      rating: 4,
      photoUrl: null,
      approved: true,
    },
    {
      clientName: "Sushila Shrestha",
      company: "Bouddha Boutique Hotel",
      message:
        "Newa Enterprises provided end-to-end consultancy for our hotel renovation project. Their project management team was on-site daily, ensuring quality and timeline adherence. We are extremely satisfied with the outcome.",
      rating: 5,
      photoUrl: null,
      approved: true,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`Created ${testimonials.length} testimonials`);

  // Create portfolio items
  const portfolio = [
    {
      title: "Baneshwor Commercial Complex Supply",
      slug: "baneshwor-commercial-complex",
      description:
        "Complete building material supply for a 5-story commercial complex in Baneshwor, Kathmandu. Supplied cement, steel reinforcement, electrical fittings, and sanitary ware over a 12-month period.",
      category: "Construction Supply",
      imageUrl: null,
      client: "Modern Builders Pvt. Ltd.",
      completionDate: new Date("2025-11-15"),
      testimonial: null,
    },
    {
      title: "eSewa & Khalti Integration for Dangol Traders",
      slug: "esewa-khalti-dangol-traders",
      description:
        "Full e-commerce platform development with Nepal payment gateway integration (eSewa, Khalti, COD) for Dangol Traders, a Baneshwor-based retail business. Includes inventory management and delivery tracking.",
      category: "E-commerce",
      imageUrl: null,
      client: "Dangol Traders",
      completionDate: new Date("2026-03-20"),
      testimonial: null,
    },
    {
      title: "Kathmandu Valley Logistics Overhaul",
      slug: "kathmandu-logistics-overhaul",
      description:
        "Designed and implemented a new logistics routing system for Joshi & Sons Hardware, reducing delivery times by 50% across 12 retail locations in the Kathmandu Valley.",
      category: "Logistics",
      imageUrl: null,
      client: "Joshi & Sons Hardware",
      completionDate: new Date("2025-08-10"),
      testimonial: null,
    },
    {
      title: "Hotel Bouddha Renovation Project",
      slug: "hotel-bouddha-renovation",
      description:
        "Full project management consultancy for the renovation of Bouddha Boutique Hotel. Scope included structural assessment, contractor coordination, material sourcing, and quality assurance.",
      category: "Consultancy",
      imageUrl: null,
      client: "Bouddha Boutique Hotel",
      completionDate: new Date("2026-01-25"),
      testimonial: null,
    },
    {
      title: "Newa Enterprises Digital Presence",
      slug: "newa-enterprises-website",
      description:
        "Designed and developed the complete digital presence for Newa Enterprises including this corporate website, social media profiles, and digital marketing strategy.",
      category: "Digital Services",
      imageUrl: null,
      client: "Newa Enterprises",
      completionDate: new Date("2026-07-01"),
      testimonial: null,
    },
  ];

  for (const item of portfolio) {
    await prisma.portfolioItem.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
  }
  console.log(`Created ${portfolio.length} portfolio items`);

  // Create blog posts
  const posts = [
    {
      title: "Why Nepal Businesses Should Go Digital in 2026",
      slug: "nepal-businesses-digital-2026",
      content: `<p>Nepal's digital landscape is transforming rapidly. With over 13 million internet users and mobile penetration exceeding 130%, the opportunity for Nepali businesses to expand online has never been greater.</p><p>At Newa Enterprises, we've helped dozens of Kathmandu-based businesses establish their digital presence. Here are the top reasons to go digital this year:</p><h2>1. Reach Customers Beyond Your Locality</h2><p>With e-commerce platforms and social media, a hardware store in Baneshwor can now serve customers across the entire Kathmandu Valley, and even beyond.</p><h2>2. Nepal Payment Gateways Are Now Accessible</h2><p>eSewa, Khalti, and Cash on Delivery have made online transactions seamless for Nepali consumers. Integrating these payment methods into your business is now easier than ever.</p><h2>3. Cost-Effective Marketing</h2><p>Digital marketing through Facebook, Instagram, and Google costs a fraction of traditional advertising while offering precise targeting and measurable results.</p><p>Ready to take your business digital? Contact Newa Enterprises for a free consultation.</p>`,
      excerpt:
        "Nepal's digital economy is booming. Discover why 2026 is the year for your business to establish a strong online presence.",
      coverImage: null,
      author: "Anil Bajracharya",
      publishedAt: new Date("2026-07-15"),
      status: "published",
    },
    {
      title: "Understanding eSewa and Khalti for Your Business",
      slug: "esewa-khalti-business-guide",
      content: `<p>eSewa and Khalti are Nepal's two most popular digital payment platforms. Together, they process millions of transactions daily. For any business in Nepal, accepting payments through these platforms is no longer optional — it's essential.</p><h2>What is eSewa?</h2><p>eSewa is Nepal's first digital wallet, launched in 2009. With over 5 million users, it allows customers to pay bills, transfer money, and make online purchases.</p><h2>What is Khalti?</h2><p>Khalti is a popular digital payment platform integrated with over 10,000 merchants across Nepal. It offers features like Khalti QR, online payments, and utility bill payments.</p><h2>Why Integrate Both?</h2><p>Offering both eSewa and Khalti ensures you don't lose customers who prefer one platform over the other. Combined with Cash on Delivery (COD), you cover every payment preference.</p><p>Newa Enterprises provides seamless integration of both payment gateways for your e-commerce platform. Contact us to get started.</p>`,
      excerpt:
        "A complete guide to integrating Nepal's top payment gateways — eSewa, Khalti, and COD — for your business.",
      coverImage: null,
      author: "Anil Bajracharya",
      publishedAt: new Date("2026-06-28"),
      status: "published",
    },
    {
      title: "Construction Material Sourcing in Nepal: A Guide",
      slug: "construction-material-sourcing-nepal",
      content: `<p>Sourcing quality construction materials at competitive prices is one of the biggest challenges for builders and contractors in Nepal. At Newa Enterprises, we've spent over a decade building a reliable supply chain. Here's what we've learned.</p><h2>1. Verify Supplier Credentials</h2><p>Always verify that your supplier has proper licenses, tax registration, and a track record of timely delivery. We maintain a verified network of manufacturers and distributors.</p><h2>2. Compare Pricing Across Suppliers</h2><p>Prices for materials like cement, steel, and aggregates can vary significantly. Newa Enterprises leverages bulk purchasing power to offer competitive rates without compromising quality.</p><h2>3. Plan for Logistics</h2><p>In Kathmandu, traffic and road conditions can impact delivery schedules. Work with a logistics partner who understands the local terrain and can plan accordingly.</p><p>Whether you need materials for a single project or ongoing supply, Newa Enterprises is your trusted partner in Baneshwor, Kathmandu.</p>`,
      excerpt:
        "Learn how to source quality construction materials in Nepal with tips from Newa Enterprises' decade of experience in the trading sector.",
      coverImage: null,
      author: "Rajesh Shrestha",
      publishedAt: new Date("2026-05-20"),
      status: "published",
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`Created ${posts.length} blog posts`);

  // Create job listings
  const jobs = [
    {
      title: "Sales Executive",
      slug: "sales-executive",
      location: "Baneshwor, Kathmandu",
      type: "full-time",
      department: "Sales & Marketing",
      description:
        "We are looking for an energetic Sales Executive to join our team in Baneshwor. You will be responsible for business development, client relationship management, and achieving sales targets for our trading and services divisions.",
      requirements:
        "- Bachelor's degree in Business Administration or related field\n- Minimum 2 years of sales experience\n- Excellent communication and negotiation skills\n- Knowledge of Kathmandu Valley market\n- Valid motorcycle license preferred",
      salary: "NPR 35,000 - 50,000 per month",
    },
    {
      title: "Logistics Coordinator",
      slug: "logistics-coordinator",
      location: "Baneshwor, Kathmandu",
      type: "full-time",
      department: "Operations",
      description:
        "Newa Enterprises is seeking a Logistics Coordinator to manage our supply chain and transportation operations. You will coordinate with suppliers, fleet drivers, and clients to ensure timely delivery of goods across the Kathmandu Valley.",
      requirements:
        "- Bachelor's degree in Supply Chain Management or related field\n- 3+ years of logistics experience\n- Familiarity with Kathmandu Valley routes\n- Strong organizational and problem-solving skills\n- Proficiency in MS Office and inventory management software",
      salary: "NPR 40,000 - 60,000 per month",
    },
    {
      title: "Web Developer (Part-Time)",
      slug: "web-developer-part-time",
      location: "Remote / Baneshwor",
      type: "part-time",
      department: "IT & Digital",
      description:
        "We are looking for a skilled Web Developer to join our IT team on a part-time basis. You will work on client websites, e-commerce platforms, and payment gateway integrations with eSewa and Khalti.",
      requirements:
        "- Proficiency in React, Next.js, and Tailwind CSS\n- Experience with Node.js and API development\n- Knowledge of Nepal payment gateways (eSewa, Khalti API)\n- Familiarity with PostgreSQL or MongoDB\n- Portfolio of previous work required",
      salary: "NPR 25,000 - 40,000 per month",
    },
  ];

  for (const job of jobs) {
    await prisma.job.upsert({
      where: { slug: job.slug },
      update: job,
      create: job,
    });
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
    {
      key: "hero_subtitle",
      value: "Trusted trading, consultancy, and digital services provider in Baneshwor, Kathmandu. We help Nepali businesses grow with reliable supply chains and modern digital solutions.",
    },
    { key: "about_story", value: "Founded in 2014 by Rajesh Shrestha, Newa Enterprises began as a small trading operation in Baneshwor, Kathmandu. What started with supplying construction materials to local builders has grown into a diversified business serving clients across Nepal. Our deep roots in the Newar business community and our commitment to quality and reliability have made us a trusted name in Kathmandu's commercial landscape." },
    { key: "mission", value: "To empower Nepali businesses with reliable supply chains, expert consultancy, and modern digital solutions that drive growth and prosperity." },
    { key: "vision", value: "To be Nepal's most trusted business partner — known for integrity, quality, and innovation in every sector we serve." },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting,
    });
  }
  console.log(`Created ${settings.length} site settings`);

  // Create page content for SEO
  const pageContents = [
    {
      page: "home",
      title: "Newa Enterprises — Trusted Business Partner in Baneshwor, Kathmandu",
      subtitle: "Trading, Consultancy & Digital Services",
      metaTitle: "Newa Enterprises — Trusted Business Partner in Baneshwor, Kathmandu",
      metaDescription:
        "Newa Enterprises in Baneshwor, Kathmandu offers reliable trading, consultancy, logistics, and digital services for Nepali businesses. eSewa & Khalti integration available.",
      content: null,
    },
    {
      page: "about",
      title: "About Newa Enterprises — Our Story, Mission & Team",
      subtitle: "Learn about our journey since 2014",
      metaTitle: "About Newa Enterprises — Baneshwor, Kathmandu",
      metaDescription:
        "Discover the story of Newa Enterprises, our mission to empower Nepali businesses, and meet our experienced team based in Baneshwor, Kathmandu.",
      content: null,
    },
    {
      page: "services",
      title: "Our Services — Trading, Consultancy & Digital Solutions",
      subtitle: "Comprehensive business services in Kathmandu",
      metaTitle: "Services — Newa Enterprises | Baneshwor, Kathmandu",
      metaDescription:
        "Explore Newa Enterprises' services: general trading & supplies, consultancy, logistics, e-commerce solutions with eSewa/Khalti, IT services, and import/export facilitation in Nepal.",
      content: null,
    },
    {
      page: "portfolio",
      title: "Our Portfolio — Projects & Case Studies",
      subtitle: "See our work across Nepal",
      metaTitle: "Portfolio — Newa Enterprises | Projects in Kathmandu",
      metaDescription:
        "View Newa Enterprises' portfolio of construction supply, e-commerce, logistics, and consultancy projects across the Kathmandu Valley.",
      content: null,
    },
    {
      page: "blog",
      title: "Blog — Insights & Updates from Newa Enterprises",
      subtitle: "Business tips, guides, and company news",
      metaTitle: "Blog — Newa Enterprises | Business Insights Nepal",
      metaDescription:
        "Read the latest articles from Newa Enterprises on digital payments in Nepal (eSewa, Khalti), construction sourcing, business growth, and more.",
      content: null,
    },
    {
      page: "contact",
      title: "Contact Newa Enterprises — Baneshwor, Kathmandu",
      subtitle: "Get in touch with our team",
      metaTitle: "Contact — Newa Enterprises | Baneshwor, Kathmandu",
      metaDescription:
        "Contact Newa Enterprises in Baneshwor, Kathmandu. Call, email, or visit us for trading, consultancy, logistics, and digital services inquiries.",
      content: null,
    },
    {
      page: "careers",
      title: "Careers — Join the Newa Enterprises Team",
      subtitle: "Build your career with us",
      metaTitle: "Careers — Newa Enterprises | Jobs in Kathmandu",
      metaDescription:
        "Explore career opportunities at Newa Enterprises in Baneshwor, Kathmandu. We're hiring sales executives, logistics coordinators, and web developers.",
      content: null,
    },
  ];

  for (const pc of pageContents) {
    await prisma.pageContent.upsert({
      where: { page: pc.page },
      update: pc,
      create: pc,
    });
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
    await prisma.$disconnect();
  });