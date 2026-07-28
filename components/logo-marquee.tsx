import Image from "next/image"
import { partners } from "@/lib/data"

/** Repeat enough times that one track fills wide viewports before looping. */
const LOOP_COPIES = 4

function LogoSet({ ariaHidden }: { ariaHidden?: boolean }) {
  const items = Array.from({ length: LOOP_COPIES }, () => partners).flat()

  return (
    <ul
      className="flex shrink-0 items-center gap-12 sm:gap-16 md:gap-20"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((partner, index) => (
        <li
          key={`${partner.name}-${index}`}
          className="flex shrink-0 items-center justify-center"
        >
          <div className="relative h-7 w-[100px] opacity-40 grayscale sm:h-8 sm:w-[125px]">
            <Image
              src={partner.logo}
              alt={ariaHidden ? "" : partner.name}
              fill
              className="object-contain object-center"
              sizes="125px"
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function LogoMarquee() {
  return (
    <section
      aria-label="Partner network"
      className="logo-marquee-fade mt-6 shrink-0 overflow-hidden border-y border-border bg-background/25 sm:mt-8 lg:mt-16"
    >
      <div className="logo-marquee flex w-max items-center gap-12 py-4 sm:gap-16 sm:py-5 md:gap-20">
        <LogoSet />
        <LogoSet ariaHidden />
      </div>
    </section>
  )
}
