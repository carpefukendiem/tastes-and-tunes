import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "waitlist" | "sponsor" | "explore" | "gold";

type SharedButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsButton = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsAnchor = SharedButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantClasses: Record<ButtonVariant, string> = {
  waitlist:
    "bg-linear-to-r from-magenta to-purple text-paper shadow-[var(--shadow-cta)]",
  sponsor: "bg-coral text-paper shadow-[var(--shadow-cta)]",
  explore: "bg-teal text-paper shadow-[var(--shadow-cta)]",
  gold: "bg-gold text-ink shadow-[var(--shadow-cta)]",
};

export function Button({
  children,
  variant = "waitlist",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-pill px-6 py-3 font-heading text-sm font-bold uppercase tracking-[0.08em] transition duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-cta)] focus-visible:outline-gold focus-visible:outline-offset-4 active:translate-y-0 ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };

    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button {...buttonProps} className={classes} type={buttonProps.type ?? "button"}>
      {children}
    </button>
  );
}
