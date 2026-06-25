import Image from "next/image"
import { partners } from "@/lib/data"

export function Partners() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium tracking-wide text-muted-foreground">
          Sourcing capacity from a vetted network of providers
        </p>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {partners.map((partner) => (
            <li
              key={partner.name}
              className="group flex items-center justify-center border border-border bg-card px-8 py-6 transition-colors hover:border-foreground/15"
            >
              <div className="relative h-10 w-full max-w-[148px] opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain object-center"
                  sizes="148px"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
