import Image from "next/image";
import Card from "@/components/ui/Card";
import { getInitials } from "@/lib/utils";

interface TeamCardProps {
  name: string;
  role: string;
  photoUrl?: string | null;
  bio?: string | null;
}

export default function TeamCard({
  name,
  role,
  photoUrl,
  bio,
}: TeamCardProps) {
  return (
    <Card className="text-center group hover:-translate-y-1 transition-all duration-300">
      <div className="relative mx-auto mb-4 h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full bg-gray-100">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={`Photo of ${name}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 96px, 112px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-amber-100 text-amber-700 text-xl font-bold">
            {getInitials(name)}
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <p className="text-sm text-amber-600 font-medium mb-2">{role}</p>
      {bio && (
        <p className="text-sm text-gray-600 leading-relaxed">{bio}</p>
      )}
    </Card>
  );
}
