import {
  type DatacenterIllustrationVariant,
  facilityIllustrationVariant,
  variantColorMap,
} from "@/lib/placeholder-images"

export type { DatacenterIllustrationVariant }
export { facilityIllustrationVariant }

type Props = {
  variant?: DatacenterIllustrationVariant
  className?: string
  title?: string
}

/** Colored placeholder for facility / blog imagery (no photos). */
export function DatacenterIllustration({
  variant = "server-room",
  className = "",
  title = "Data center facility",
}: Props) {
  const color = variantColorMap[variant]

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ backgroundColor: color }}
      role="img"
      aria-label={title}
    />
  )
}
