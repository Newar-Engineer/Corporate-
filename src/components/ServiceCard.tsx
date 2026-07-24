import Link from "next/link";
import Card from "@/components/ui/Card";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  slug: string;
}

const iconMap: Record<string, string> = {
  web: "🌐",
  mobile: "📱",
  marketing: "📈",
  consulting: "💡",
  ecommerce: "🛒",
  payment: "💳",
  design: "🎨",
  cloud: "☁️",
  security: "🔒",
  default: "🚀",
};

export default function ServiceCard({
  title,
  description,
  icon,
  slug,
}: ServiceCardProps) {
  const emoji = iconMap[icon] || iconMap.default;

  return (
    <Link href={`/services/${slug}`}>
      <Card hover className="group h-full cursor-pointer transition-all duration-300 hover:border-amber-200 hover:-translate-y-1">
        <div className="text-4xl mb-4" aria-hidden="true">
          {emoji}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </Card>
    </Link>
  );
}
