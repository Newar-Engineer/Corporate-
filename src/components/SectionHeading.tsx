import clsx from "clsx";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "mb-10 sm:mb-12",
        centered && "text-center"
      )}
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={clsx(
          "mt-4 h-1 w-16 rounded-full bg-amber-600",
          centered && "mx-auto"
        )}
      />
    </div>
  );
}
