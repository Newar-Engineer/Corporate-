import { ButtonLink } from "@/components/ui/Button";

export default function ServiceNotFound() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,95,217,0.1)_0%,transparent_60%)]" />
      <div className="relative mx-auto max-w-md px-4 text-center">
        <div className="mb-6 text-7xl font-bold gradient-text">404</div>
        <h1 className="mb-3 text-2xl font-bold text-white">Service Not Found</h1>
        <p className="mb-8 text-sm text-slate-400 leading-relaxed">
          The service page you&rsquo;re looking for doesn&rsquo;t exist or may have been moved.
        </p>
        <ButtonLink href="/services">
          &larr; Browse All Services
        </ButtonLink>
      </div>
    </section>
  );
}
