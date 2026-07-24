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
      <Card
        hover
        className="group h-full cursor-pointer transition-all duration-300 hover:border-amber-200 hover:-translate-y-1"
      >
        <div className="flex flex-col h-full">
          <div className="mb-3">
            <span className="inline-block rounded-full bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1">
              {department}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
            {title}
          </h3>
          <div className="mt-auto space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FiMapPin size={15} className="shrink-0 text-gray-400" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiBriefcase size={15} className="shrink-0 text-gray-400" />
              <span>{type}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock size={15} className="shrink-0 text-gray-400" />
              <span>{department}</span>
            </div>
            {salary && (
              <div className="flex items-center gap-2">
                <FiDollarSign size={15} className="shrink-0 text-gray-400" />
                <span>{salary}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
