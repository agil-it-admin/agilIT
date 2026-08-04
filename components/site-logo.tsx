import Image from "next/image"
import { cn } from "@/lib/utils"

export function SiteLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-block h-9 shrink-0 aspect-[1500/672]",
        className,
      )}
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

/** Nav brand: product name + powered-by logo lockup */
export function SiteBrand({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex min-w-0 flex-col gap-0", className)}>
      <span className="relative z-10 text-lg font-bold leading-none tracking-tight text-evergreen sm:text-xl">
        Colonegotiator
      </span>
      <span className="relative z-0 -mt-0.5 flex items-center gap-2">
        <span className="shrink-0 text-[10px] leading-none font-medium tracking-wide text-muted-foreground uppercase sm:text-[11px]">
          powered by
        </span>
        <span className="relative inline-block h-6 w-[5.5rem] shrink-0 sm:h-7 sm:w-[6.5rem]">
          <Image
            src="/agilit-logo.png"
            alt="agil.IT"
            fill
            className="object-contain object-left"
            sizes="120px"
            priority
          />
        </span>
      </span>
    </span>
  )
}
