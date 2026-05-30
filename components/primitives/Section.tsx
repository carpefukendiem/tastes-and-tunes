import type { HTMLAttributes, ReactNode } from "react";

type SectionBg = "cream" | "teal" | "navy" | "navyDeep" | "sunset";

const bgClasses: Record<SectionBg, string> = {
  cream: "bg-cream text-ink",
  teal: "bg-teal text-paper",
  navy: "bg-navy text-paper",
  navyDeep: "bg-navy-deep text-paper",
  sunset: "text-paper",
};

type SectionProps = HTMLAttributes<HTMLElement> & {
  bg?: SectionBg;
  bleed?: boolean;
  grain?: boolean;
  topDivider?: ReactNode;
  bottomDivider?: ReactNode;
};

export function Section({
  bg = "cream",
  bleed = false,
  grain = false,
  topDivider,
  bottomDivider,
  className = "",
  children,
  style,
  ...props
}: SectionProps) {
  return (
    <section
      className={`relative overflow-hidden ${bgClasses[bg]} ${
        grain ? "paper-grain" : ""
      } ${className}`}
      style={{
        ...(bg === "sunset" ? { background: "var(--grad-sunset)" } : null),
        ...style,
      }}
      {...props}
    >
      {topDivider}
      <div className={bleed ? "" : "py-[var(--section-py)]"}>{children}</div>
      {bottomDivider}
    </section>
  );
}
