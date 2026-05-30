import Image from "next/image";
import type { SiteAsset } from "@/lib/assets";

type IconBadgeProps = {
  asset: SiteAsset;
  label?: string;
  className?: string;
};

export function IconBadge({ asset, label, className = "" }: IconBadgeProps) {
  return (
    <figure className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <div className="relative aspect-square w-28 overflow-hidden rounded-full shadow-card ring-4 ring-paper/70 sm:w-32">
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes="(min-width: 640px) 8rem, 7rem"
          className="scale-110 object-cover"
        />
      </div>
      {label ? (
        <figcaption className="max-w-36 text-center font-heading text-small font-bold uppercase leading-tight tracking-[0.08em] text-paper">
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}
