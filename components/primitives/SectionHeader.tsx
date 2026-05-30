import type { HTMLAttributes } from "react";

type SectionHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  accent?: string;
  eyebrow?: string;
  align?: "left" | "center";
  titleClassName?: string;
  accentClassName?: string;
  srOnlyText?: string;
};

export function SectionHeader({
  title,
  accent,
  eyebrow,
  align = "center",
  titleClassName = "",
  accentClassName = "",
  srOnlyText,
  className = "",
  ...props
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto text-center" : "text-left"} max-w-3xl ${className}`}
      {...props}
    >
      {srOnlyText ? <h2 className="sr-only">{srOnlyText}</h2> : null}
      {eyebrow ? (
        <p className="font-heading text-sm font-bold uppercase tracking-[0.24em] text-gold">
          {eyebrow}
        </p>
      ) : null}
      <div aria-hidden={srOnlyText ? true : undefined}>
        <h2
          className={`mt-2 font-poster text-display leading-[0.95] tracking-[-0.02em] ${titleClassName}`}
        >
          {title}
        </h2>
        {accent ? (
          <p
            className={`mt-1 font-script text-script leading-tight ${accentClassName}`}
          >
            {accent}
          </p>
        ) : null}
      </div>
      <svg
        aria-hidden="true"
        className={`${centered ? "mx-auto" : ""} mt-4 h-4 w-40 text-gold`}
        viewBox="0 0 180 20"
        fill="none"
      >
        <path
          d="M2 10 C18 2 28 18 45 10 S72 2 90 10 S119 18 136 10 S162 2 178 10"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
}
