import Link from "next/link";
import { cn } from "@/lib/utils";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-gradient text-on-accent shadow-[0_8px_24px_-12px_var(--glow)] hover:brightness-110 active:brightness-95",
  secondary:
    "border border-line-strong bg-surface text-ink hover:border-accent hover:text-accent",
  ghost: "text-muted hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-[0.95rem] gap-2",
};

const base =
  "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-2 disabled:pointer-events-none disabled:opacity-50";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Link-aware button. Internal/hash links use `next/link`, external links
 * get `target="_blank" rel="noopener noreferrer"` automatically.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props as CommonProps &
    ButtonHTMLAttributes<HTMLButtonElement> &
    AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string };

  const classes = cn(base, variants[variant], sizes[size], className);
  const href = rest.href;

  if (href !== undefined) {
    const external = /^(https?:|mailto:|tel:)/.test(href);

    if (external) {
      return (
        <a
          {...rest}
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <Link {...rest} href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}
