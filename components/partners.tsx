import Image from "next/image"
import { partners } from "@/lib/data"

export function Partners() {
  return (
    <section className="border-y border-border bg-muted/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:gap-6 sm:px-6 lg:px-8">
        <p className="shrink-0 text-center text-xs font-medium tracking-wide text-muted-foreground sm:text-left">
          Sourcing capacity from a vetted network of providers
        </p>
        <div
          className="hidden h-5 w-px shrink-0 bg-border sm:block"
          aria-hidden
        />
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 sm:ml-auto sm:justify-end">
          {partners.map((name) => (
            <div
              key={name}
              className="relative h-6 w-24 shrink-0 opacity-40 grayscale"
            >
              <Image
                src="/placeholder-logo.svg"
                alt=""
                fill
                className="object-contain"
                sizes="96px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
