import Image from "next/image";
import Card from "@/components/ui/Card";
import { getInitials } from "@/lib/utils";
import { FiStar } from "react-icons/fi";

interface TestimonialCardProps {
  clientName: string;
  company: string;
  message: string;
  rating: number;
  photoUrl?: string | null;
}

export default function TestimonialCard({
  clientName,
  company,
  message,
  rating,
  photoUrl,
}: TestimonialCardProps) {
  return (
    <Card variant="dark" className="relative">
      <div className="mb-3 flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <FiStar
            key={i}
            size={16}
            className={
              i < rating ? "fill-accent text-accent" : "text-slate-600"
            }
          />
        ))}
      </div>

      <blockquote className="text-sm text-slate-300 leading-relaxed mb-4 italic">
        &ldquo;{message}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-900 border border-primary/20 shrink-0">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={`Photo of ${clientName}`}
              fill
              className="object-cover"
              sizes="40px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary-light text-xs font-bold">
              {getInitials(clientName)}
            </div>
          )}
        </div>
        <div>
          <cite className="not-italic text-sm font-semibold text-white block">
            {clientName}
          </cite>
          <span className="text-xs text-slate-400">{company}</span>
        </div>
      </div>
    </Card>
  );
}
