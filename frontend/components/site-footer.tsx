import { SiteLogo } from "@/components/site-logo"
import {
  defaultFooter,
  formatCopyright,
  type CmsFooter,
} from "@/lib/cms/site"

export function SiteFooter({ footer = defaultFooter }: { footer?: CmsFooter }) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <SiteLogo className="h-10" />
            <p className="mt-4 max-w-sm text-pretty leading-relaxed text-muted-foreground">
              {footer.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-foreground">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
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
            {formatCopyright(footer.copyrightTemplate)}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            {footer.legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
