import Link from "next/link";
import Button from "@/components/ui/Button";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  bgImage?: string;
}

export default function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink = "/contact",
  bgImage,
}: HeroSectionProps) {
  return (
    <section
      className="relative flex items-center justify-center min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] overflow-hidden"
      aria-labelledby="hero-title"
    >
      {bgImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h1
          id="hero-title"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
        >
          {title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed">
          {subtitle}
        </p>
        {ctaText && (
          <Link href={ctaLink}>
            <Button variant="primary" size="lg" className="text-base sm:text-lg">
              {ctaText}
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
