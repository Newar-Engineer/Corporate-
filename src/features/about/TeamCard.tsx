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
    <Card variant="dark" hover className="text-center group">
      <div className="relative mx-auto mb-4 h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full bg-slate-900 border-2 border-primary/20">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={`Photo of ${name}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 96px, 112px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary-light text-xl font-bold">
            {getInitials(name)}
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-white">{name}</h3>
      <p className="text-sm text-primary-light font-medium mb-2">{role}</p>
      {bio && (
        <p className="text-sm text-slate-400 leading-relaxed">{bio}</p>
      )}
    </Card>
  );
}
