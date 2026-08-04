export interface FallbackPortfolioItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  client: string | null;
  link: string | null;
  metrics: { label: string; value: string }[] | null;
  techStack: { name: string; type: string }[] | null;
  testimonial: string | null;
  testimonialAuthor: string | null;
}

export const fallbackPortfolio: FallbackPortfolioItem[] = [
  {
    id: "pf00000000000000000001",
    title: "Personal Portfolio Website",
    slug: "manoj-portfolio",
    description:
      "A modern personal portfolio website built with Next.js — clean design, smooth GSAP animations, project showcase, and a contact section.",
    category: "Portfolio Website",
    client: "Manoj Joshi",
    link: "https://manoj-portfolio-eta.vercel.app/",
    metrics: [
      { label: "Custom Build", value: "100%" },
      { label: "Fully Responsive", value: "100%" },
      { label: "Smooth Animations", value: "GSAP" },
      { label: "Deployed On", value: "Vercel" },
    ],
    techStack: [
      { name: "Next.js", type: "Frontend" },
      { name: "React", type: "Frontend" },
      { name: "Tailwind CSS", type: "Design" },
      { name: "Vercel", type: "Platform" },
    ],
    testimonial: "Newa Tech delivered an outstanding website that perfectly captures my personal brand.",
    testimonialAuthor: "Manoj Joshi",
  },
  {
    id: "pf00000000000000000002",
    title: "Milton International College",
    slug: "milton-international-college",
    description:
      "An admissions-focused website for Milton International College — program listings, admission information, and a clean institutional design.",
    category: "Education",
    client: "Milton International College",
    link: "https://milton-teal.vercel.app/",
    metrics: [
      { label: "Programs Showcased", value: "15+" },
      { label: "Fully Responsive", value: "100%" },
      { label: "Admission-Focused", value: "Yes" },
      { label: "Deployed On", value: "Vercel" },
    ],
    techStack: [
      { name: "Next.js", type: "Frontend" },
      { name: "React", type: "Frontend" },
      { name: "Tailwind CSS", type: "Design" },
      { name: "Vercel", type: "Platform" },
    ],
    testimonial: null,
    testimonialAuthor: null,
  },
  {
    id: "pf00000000000000000003",
    title: "Coding House — IT Training Center",
    slug: "coding-house",
    description:
      "A website for Coding House, an IT training center — course listings, testimonials, and an engaging design making course enrollment effortless.",
    category: "Education",
    client: "Coding House",
    link: "https://coding-house.vercel.app/",
    metrics: [
      { label: "Courses Listed", value: "12+" },
      { label: "Fully Responsive", value: "100%" },
      { label: "Enrollment-Focused", value: "Yes" },
      { label: "Deployed On", value: "Vercel" },
    ],
    techStack: [
      { name: "Next.js", type: "Frontend" },
      { name: "React", type: "Frontend" },
      { name: "Tailwind CSS", type: "Design" },
      { name: "Vercel", type: "Platform" },
    ],
    testimonial: null,
    testimonialAuthor: null,
  },
  {
    id: "pf00000000000000000004",
    title: "E-Commerce Store",
    slug: "ecommerce-store",
    description:
      "A complete online store with product listings, cart, and checkout flow — ready for eSewa and Khalti payment integration.",
    category: "E-Commerce",
    client: "Newa Tech Demo Store",
    link: "https://e-commerce-nu-brown.vercel.app/",
    metrics: [
      { label: "Product Ready", value: "50+" },
      { label: "Cart & Checkout", value: "Built" },
      { label: "Payments", value: "eSewa/Khalti" },
      { label: "Deployed On", value: "Vercel" },
    ],
    techStack: [
      { name: "Next.js", type: "Frontend" },
      { name: "React", type: "Frontend" },
      { name: "Tailwind CSS", type: "Design" },
      { name: "Vercel", type: "Platform" },
    ],
    testimonial: null,
    testimonialAuthor: null,
  },
  {
    id: "pf00000000000000000005",
    title: "Fast Food Restaurant",
    slug: "fast-food-restaurant",
    description:
      "A mouth-watering restaurant website with a menu showcase, gallery, and online ordering — built to bring hungry customers in.",
    category: "Food & Restaurant",
    client: "Fast Food Restaurant",
    link: "https://fast-food-theta-nine.vercel.app/",
    metrics: [
      { label: "Menu Items", value: "30+" },
      { label: "Online Ordering", value: "Built" },
      { label: "Fully Responsive", value: "100%" },
      { label: "Deployed On", value: "Vercel" },
    ],
    techStack: [
      { name: "Next.js", type: "Frontend" },
      { name: "React", type: "Frontend" },
      { name: "Tailwind CSS", type: "Design" },
      { name: "Vercel", type: "Platform" },
    ],
    testimonial: null,
    testimonialAuthor: null,
  },
];
