import { partners } from "@/lib/data"

const LOGO_COLORS = ["#b7e4c7", "#95d5b2", "#74c69d"]

export function Partners() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium tracking-wide text-muted-foreground">
          Sourcing capacity from a vetted network of providers
        </p>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {partners.map((partner, index) => (
            <li
              key={partner.name}
              className="group flex items-center justify-center border border-border bg-card px-8 py-6 transition-colors hover:border-foreground/15"
            >
              <div
                className="h-10 w-full max-w-[148px] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                style={{ backgroundColor: LOGO_COLORS[index % LOGO_COLORS.length] }}
                role="img"
                aria-label={partner.name}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
