type DividerVariant = "wave" | "torn";

type DividerProps = {
  variant?: DividerVariant;
  topColor?: string;
  bottomColor?: string;
  className?: string;
};

export function Divider({
  variant = "wave",
  topColor = "transparent",
  bottomColor = "var(--color-cream)",
  className = "",
}: DividerProps) {
  const path =
    variant === "wave"
      ? "M0 70 C 160 122 260 4 430 55 C 590 103 710 122 860 56 C 1010 -8 1135 10 1280 62 L1280 120 L0 120 Z"
      : "M0 44 C75 50 110 26 190 38 C270 50 307 76 390 58 C480 39 520 16 615 31 C710 46 750 82 855 61 C956 40 990 18 1088 35 C1168 48 1218 34 1280 20 L1280 120 L0 120 Z";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative h-16 w-full overflow-hidden sm:h-24 ${className}`}
      style={{ background: topColor }}
    >
      <svg
        className="absolute inset-x-0 bottom-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1280 120"
        role="presentation"
      >
        <path d={path} fill={bottomColor} />
      </svg>
    </div>
  );
}
