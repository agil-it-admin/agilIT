export type DatacenterIllustrationVariant =
  | "server-room"
  | "exterior"
  | "cooling-aisle"

const VARIANTS: DatacenterIllustrationVariant[] = [
  "server-room",
  "exterior",
  "cooling-aisle",
]

/** Solid color stand-ins for facility / blog imagery. */
export const variantColorMap: Record<DatacenterIllustrationVariant, string> = {
  "server-room": "#b7e4c7",
  exterior: "#95d5b2",
  "cooling-aisle": "#74c69d",
}

export function facilityIllustrationVariant(
  id: string,
): DatacenterIllustrationVariant {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash + id.charCodeAt(i) * (i + 1)) % VARIANTS.length
  }
  return VARIANTS[hash] ?? "server-room"
}
