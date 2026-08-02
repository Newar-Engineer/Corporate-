import Link from "next/link";
import Image from "next/image";
import Card from "@/components/ui/Card";
import { formatDate, truncate } from "@/lib/utils";
import { FiClock, FiUser } from "react-icons/fi";

interface BlogCardProps {
  title: string;
  excerpt: string;
  coverImage?: string | null;
  author: string;
  publishedAt: Date | string;
  slug: string;
}

export default function BlogCard({
  title,
  excerpt,
  coverImage,
  author,
  publishedAt,
  slug,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card variant="dark" hover className="group h-full cursor-pointer overflow-hidden p-0">
        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={`Cover image for ${title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-800 text-slate-400 text-sm">
              No image
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-light transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
            {truncate(excerpt, 120)}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <FiUser size={13} />
              {author}
            </span>
            <span className="flex items-center gap-1">
              <FiClock size={13} />
              {formatDate(publishedAt)}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
