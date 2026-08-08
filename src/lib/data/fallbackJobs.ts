export interface FallbackJob {
  id: string;
  title: string;
  slug: string;
  location: string;
  type: string;
  department: string;
  salary: string | null;
  description: string;
  requirements: string;
}

export const fallbackJobs: FallbackJob[] = [
  {
    id: "jb00000000000000000001",
    title: "Senior Full Stack Engineer (Next.js, TypeScript, PostgreSQL)",
    slug: "senior-fullstack-engineer-nextjs-typescript-postgresql",
    location: "Baneshwor, Kathmandu / Hybrid",
    type: "Full-Time",
    department: "Engineering",
    salary: "NPR 150,000 - 200,000 / month",
    description:
      "We are looking for a Senior Full Stack Engineer to lead development of enterprise web applications using Next.js, React, and Node.js. You will architect end-to-end solutions, mentor junior developers, and work directly with clients to deliver high-impact digital products.",
    requirements:
      "- 3+ years of professional web development experience\n- Expert proficiency in React, Next.js, and TypeScript\n- Strong experience with Node.js, PostgreSQL, and Prisma ORM\n- CI/CD pipeline setup (GitHub Actions, Vercel)\n- Excellent communication skills and client-facing experience\n- Bonus: Knowledge of Nepal payment gateways (eSewa, Khalti APIs)",
  },
  {
    id: "jb00000000000000000002",
    title: "UI/UX Product Designer (Figma, Design Systems)",
    slug: "uiux-product-designer-figma-design-systems",
    location: "Baneshwor, Kathmandu",
    type: "Full-Time",
    department: "Design",
    salary: "NPR 120,000 - 160,000 / month",
    description:
      "We are seeking a talented UI/UX Product Designer to own the end-to-end design process for client projects ranging from business websites to e-commerce stores. You will create wireframes, high-fidelity prototypes, and design systems, and collaborate with engineers to ship pixel-perfect interfaces.",
    requirements:
      "- 2+ years of experience in product design (UI/UX)\n- Expert proficiency in Figma (components, variants, auto-layout, prototyping)\n- Strong portfolio demonstrating web and mobile app design\n- Experience building and maintaining design systems\n- Knowledge of frontend development (HTML/CSS) is a strong plus\n- Bonus: Experience designing for Nepal or South Asian markets",
  },
  {
    id: "jb00000000000000000003",
    title: "Mobile App Engineer (Flutter / React Native)",
    slug: "mobile-app-engineer-flutter-react-native",
    location: "Remote / Baneshwor",
    type: "Full-Time",
    department: "Engineering",
    salary: "NPR 130,000 - 170,000 / month",
    description:
      "Join our mobile engineering team to build cross-platform applications for fintech, e-commerce, and healthcare clients. You will own features from concept to App Store and Google Play release. Experience with either Flutter or React Native is welcome.",
    requirements:
      "- 3+ years of mobile development experience (React Native or Flutter)\n- Published apps on both App Store and Google Play\n- Strong TypeScript or Dart skills\n- Experience with state management (Zustand, Redux Toolkit, Riverpod, or BLoC)\n- Knowledge of push notifications (Firebase Cloud Messaging, OneSignal)\n- Bonus: Experience with eSewa or Khalti mobile SDKs",
  },
  {
    id: "jb00000000000000000004",
    title: "Digital Marketing & SEO Strategist",
    slug: "digital-marketing-seo-strategist",
    location: "Baneshwor, Kathmandu",
    type: "Full-Time",
    department: "Marketing",
    salary: "NPR 90,000 - 130,000 / month",
    description:
      "We are looking for a Digital Marketing & SEO Strategist to drive our clients' online presence. You will execute technical SEO, content marketing, and paid advertising strategies that help Nepali businesses achieve top search rankings and strong conversion rates.",
    requirements:
      "- 2+ years of digital marketing experience with a focus on SEO\n- Knowledge of technical SEO, on-page SEO, and link-building\n- Hands-on experience with Google Ads and Facebook Ads\n- Proficiency in Google Analytics, Google Search Console, and SEMrush\n- Understanding of Nepal's digital landscape and consumer behavior",
  },
];

export function getFallbackJobBySlug(slug: string): FallbackJob | undefined {
  return fallbackJobs.find((j) => j.slug === slug);
}