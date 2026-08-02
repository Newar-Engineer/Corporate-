import { ButtonLink } from "@/components/ui/Button";

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
    <section className="relative overflow-hidden bg-gradient-to-r from-gold via-accent to-gold-dark py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-black/70 max-w-2xl mx-auto mb-8 leading-relaxed">
          {subtitle}
        </p>
        <ButtonLink href={buttonLink} size="lg" className="bg-black text-white hover:bg-slate-900 hover:shadow-[0_0_25px_rgba(0,0,0,0.3)]">
          {buttonText}
        </ButtonLink>
      </div>
    </section>
  );
}
