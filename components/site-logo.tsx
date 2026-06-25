import Image from "next/image"

export function SiteLogo({ className }: { className?: string }) {
  return (
    <span
      className={`relative inline-block h-9 shrink-0 aspect-[1500/672] ${className ?? ""}`}
    >
      <Image
        src="/agilit-logo.png"
        alt="agil.IT"
        fill
        className="object-contain object-left"
        sizes="(max-width: 768px) 120px, 160px"
        priority
      />
    </span>
  )
}
