export const placeholderImages = {
  serverRoom: "/placeholder-images/Gemini_Generated_Image_e4kjme4kjme4kjme.png",
  exterior: "/placeholder-images/Gemini_Generated_Image_xq1sk4xq1sk4xq1s.png",
  coolingAisle: "/placeholder-images/Gemini_Generated_Image_1facrm1facrm1fac.png",
  landscape: "/placeholder-images/Gemini_Generated_Image_nc8pyvnc8pyvnc8p.png",
} as const

export type PlaceholderImageKey = keyof typeof placeholderImages

export const placeholderImageList = Object.values(placeholderImages)

export type DatacenterIllustrationVariant =
  | "server-room"
  | "exterior"
  | "cooling-aisle"

const VARIANTS: DatacenterIllustrationVariant[] = [
  "server-room",
  "exterior",
  "cooling-aisle",
]

export const variantImageMap: Record<
  DatacenterIllustrationVariant,
  (typeof placeholderImages)[PlaceholderImageKey]
> = {
  "server-room": placeholderImages.serverRoom,
  exterior: placeholderImages.exterior,
  "cooling-aisle": placeholderImages.coolingAisle,
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
