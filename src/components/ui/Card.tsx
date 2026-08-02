import { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "light" | "dark";
}

export default function Card({
  children,
  className,
  hover = false,
  variant = "light",
}: CardProps) {
  const styles =
    variant === "dark"
      ? "rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
      : "rounded-xl border border-gray-200 bg-white p-6";

  return (
    <div
      className={clsx(
        styles,
        hover &&
          (variant === "dark"
            ? "transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(30,95,217,0.1)]"
            : "transition-shadow hover:shadow-lg"),
        className
      )}
    >
      {children}
    </div>
  );
}
