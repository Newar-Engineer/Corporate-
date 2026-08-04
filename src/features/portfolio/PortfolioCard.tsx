import Link from "next/link";
import Image from "next/image";

interface PortfolioCardProps {
  title: string;
  category: string;
  imageUrl?: string | null;
  slug: string;
}

export default function PortfolioCard({
  title,
  category,
  imageUrl,
  slug,
}: PortfolioCardProps) {
  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group relative block h-64 sm:h-72 overflow-hidden rounded-xl bg-gray-100"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`Portfolio: ${title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-gray-200 text-gray-400 text-sm">
          No image
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
        <span className="inline-block rounded-full bg-primary text-white text-xs font-medium px-2.5 py-1 mb-2">
          {category}
        </span>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
    </Link>
  );
}
