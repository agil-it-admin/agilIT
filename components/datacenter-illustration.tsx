import Image from "next/image"
import {
  type DatacenterIllustrationVariant,
  facilityIllustrationVariant,
  variantImageMap,
} from "@/lib/placeholder-images"

export type { DatacenterIllustrationVariant }
export { facilityIllustrationVariant }

type Props = {
  variant?: DatacenterIllustrationVariant
  className?: string
  title?: string
}

/** Data center scene photos for the hero, cards, and blog. */
export function DatacenterIllustration({
  variant = "server-room",
  className = "",
  title = "Data center facility",
}: Props) {
  const src = variantImageMap[variant]

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
