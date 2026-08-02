import Link from "next/link";
import Card from "@/components/ui/Card";
import { FiMapPin, FiBriefcase, FiClock, FiDollarSign } from "react-icons/fi";

interface JobCardProps {
  title: string;
  location: string;
  type: string;
  department: string;
  salary?: string | null;
  slug: string;
}

export default function JobCard({
  title,
  location,
  type,
  department,
  salary,
  slug,
}: JobCardProps) {
  return (
    <Link href={`/careers/apply/${slug}`}>
      <Card variant="dark" hover className="group h-full cursor-pointer">
        <div className="flex flex-col h-full">
          <div className="mb-3">
            <span className="inline-block rounded-full bg-primary/10 text-primary-light text-xs font-medium px-2.5 py-1">
              {department}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-primary-light transition-colors">
            {title}
          </h3>
          <div className="mt-auto space-y-2 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <FiMapPin size={15} className="shrink-0 text-slate-400" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiBriefcase size={15} className="shrink-0 text-slate-400" />
              <span>{type}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock size={15} className="shrink-0 text-slate-400" />
              <span>{department}</span>
            </div>
            {salary && (
              <div className="flex items-center gap-2">
                <FiDollarSign size={15} className="shrink-0 text-slate-400" />
                <span>{salary}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
