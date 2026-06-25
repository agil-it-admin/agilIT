"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { SiteLogo } from "@/components/site-logo"
import { useQuoteModal } from "@/components/quote-modal-provider"

const nav = [
  { label: "Services", href: "#services" },
  { label: "Locations", href: "#locations" },
  { label: "Why Us", href: "#testimonials" },
  { label: "Blog", href: "#blog" },
  { label: "FAQ", href: "#faq" },
]

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false)
  const { openQuoteModal } = useQuoteModal()

  return (
    <header
      className={
        overlay
          ? "sticky top-0 z-50 border-b border-border/20 bg-frosted-mint/25 backdrop-blur-[2px]"
          : "sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md"
      }
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center">
          <SiteLogo />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#locations"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Browse map
          </a>
          <Button onClick={openQuoteModal}>Get quotes</Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          className={
            overlay
              ? "border-t border-border/30 bg-frosted-mint/90 backdrop-blur-md md:hidden"
              : "border-t border-border bg-background md:hidden"
          }
        >
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6"
            aria-label="Mobile"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <Button
              className="mt-2"
              onClick={() => {
                setOpen(false)
                openQuoteModal()
              }}
            >
              Get quotes
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
