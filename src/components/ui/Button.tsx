import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import LoadingSpinner from "./LoadingSpinner";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "gold";
export type ButtonSize = "sm" | "md" | "lg";

export function buttonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string
) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "text-white bg-gradient-to-r from-primary-dark via-primary to-primary-light bg-[length:150%_100%] bg-left hover:bg-right hover:shadow-[0_0_25px_rgba(30,95,217,0.35)] active:brightness-95",
    secondary:
      "border-2 border-primary/40 text-primary-light hover:border-primary hover:bg-primary/10 active:bg-primary/20",
    outline:
      "border-2 border-primary/40 text-primary-light hover:border-primary hover:bg-primary/10 active:bg-primary/20",
    ghost:
      "text-primary-light hover:text-primary hover:bg-primary/5 active:bg-primary/10",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    gold: "text-black bg-gradient-to-r from-gold via-accent to-gold-dark hover:shadow-[0_0_25px_rgba(255,201,60,0.35)] active:brightness-95",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-3.5 py-2 text-sm gap-1.5",
    md: "px-6 py-2.5 text-sm gap-2",
    lg: "px-8 py-3.5 text-base gap-2.5",
  };

  return clsx(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonStyles(variant, size, className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner size={16} />}
      {children}
    </button>
  );
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  target,
  rel,
  onClick,
  ariaLabel,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      aria-label={ariaLabel}
      className={buttonStyles(variant, size, className)}
    >
      {children}
    </Link>
  );
}
