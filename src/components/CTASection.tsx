import Link from "next/link";
import Button from "@/components/ui/Button";

interface CTASectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export default function CTASection({
  title,
  subtitle,
  buttonText,
  buttonLink,
}: CTASectionProps) {
  return (
    <section className="bg-gradient-to-r from-amber-600 to-amber-700 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-amber-100 max-w-2xl mx-auto mb-8 leading-relaxed">
          {subtitle}
        </p>
        <Link href={buttonLink}>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-amber-700 text-base sm:text-lg"
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    </section>
  );
}
