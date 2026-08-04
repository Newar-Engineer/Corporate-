import Link from "next/link";
import { FiMonitor, FiSmartphone, FiShoppingBag, FiCode, FiPenTool, FiArrowUpRight } from "react-icons/fi";
import Card from "@/components/ui/Card";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  slug: string;
  startingFrom?: string;
}

const iconMap: Record<string, { Icon: React.ElementType; fallback: React.ElementType }> = {
  web: { Icon: FiMonitor, fallback: FiMonitor },
  mobile: { Icon: FiSmartphone, fallback: FiSmartphone },
  ecommerce: { Icon: FiShoppingBag, fallback: FiShoppingBag },
  design: { Icon: FiPenTool, fallback: FiCode },
};

export default function ServiceCard({
  title,
  description,
  icon,
  slug,
  startingFrom,
}: ServiceCardProps) {
  const entry = iconMap[icon] || { Icon: FiCode, fallback: FiCode };
  const Icon = entry.Icon ?? entry.fallback;

  return (
    <Link href={`/services/${slug}`} className="group h-full block">
      <Card variant="dark" hover className="h-full cursor-pointer group-hover:-translate-y-1">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary-light transition-all duration-300 group-hover:bg-primary/20 group-hover:text-primary-sky">
          <Icon size={24} aria-hidden="true" />
        </div>
        <h3 className="text-h3 text-white mb-2 transition-colors group-hover:text-primary-light">
          {title}
        </h3>
        <p className="text-small text-slate-400 leading-relaxed">{description}</p>
        {startingFrom && (
          <p className="mt-3 text-small font-semibold text-gold">
            Starting from {startingFrom}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-small font-semibold text-primary-light opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          Learn more
          <FiArrowUpRight size={14} />
        </span>
      </Card>
    </Link>
  );
}
