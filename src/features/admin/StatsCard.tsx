import { ReactNode } from "react";
import Card from "@/components/ui/Card";
import clsx from "clsx";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: string | null;
}

export default function StatsCard({
  title,
  value,
  icon,
  change,
}: StatsCardProps) {
  const isPositive = change && !change.startsWith("-");

  return (
    <Card className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        {change && (
          <p
            className={clsx(
              "text-sm font-medium mt-1",
              isPositive ? "text-green-600" : "text-red-600"
            )}
          >
            {change}
          </p>
        )}
      </div>
    </Card>
  );
}
