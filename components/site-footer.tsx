import { SiteLogo } from "@/components/site-logo"

const columns = [
  {
    title: "Sourcing",
    links: ["Enterprise colo", "Renewals", "Contract review", "Benchmarks"],
  },
  {
    title: "Company",
    links: ["About", "Provider network", "Careers", "Contact"],
  },
  {
    title: "Resources",
    links: ["Resource Center", "Pricing trends", "Term guides", "Compliance"],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <SiteLogo className="h-10" />
            <p className="mt-4 max-w-sm text-pretty leading-relaxed text-muted-foreground">
              Vendor-neutral enterprise colocation sourcing for mid-to-large
              organizations—cabinets through ~1 MW, typically on 3–5 year terms.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-foreground">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} agil.IT. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#top" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#top" className="hover:text-foreground">
              Terms
            </a>
            <a href="#top" className="hover:text-foreground">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
