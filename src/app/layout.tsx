import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  let siteTitle = "Newa Enterprises — Building Nepal's Digital Future";
  let siteDescription = "Newa Enterprises is a trusted business partner based in Baneshwor, Kathmandu, Nepal. We provide quality services in trading, consultancy, supplies, and digital solutions.";

  try {
    const settings = await prisma.siteSetting.findMany();
    const map: Record<string, string> = {};
    for (const s of settings) map[s.key] = s.value;
    if (map.siteTitle) siteTitle = map.siteTitle;
    if (map.siteDescription) siteDescription = map.siteDescription;
  } catch {}

  return {
    title: siteTitle,
    description: siteDescription,
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      type: "website",
      locale: "en_US",
      siteName: "Newa Enterprises",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-200">
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}