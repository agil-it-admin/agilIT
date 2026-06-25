"use client"

import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { SiteLogo } from "@/components/site-logo"
import { useQuoteModal } from "@/components/quote-modal-provider"
import { cn } from "@/lib/utils"
import {
  ENTRANCE_EASE,
  ENTRANCE_EASE_OUT,
  ENTRANCE_PREPARE_CLASS,
  entranceStyle,
  getPrefersReducedMotion,
} from "@/lib/motion"

const nav = [
  { label: "Locations", href: "#locations" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Why Us", href: "#testimonials" },
  { label: "Blog", href: "#blog" },
  { label: "FAQ", href: "#faq" },
]

function clearEntranceProps(el: Element) {
  el.classList.remove(ENTRANCE_PREPARE_CLASS)
  gsap.set(el, { clearProps: "opacity,visibility,transform" })
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false)
  const { openQuoteModal } = useQuoteModal()
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const browseMapRef = useRef<HTMLAnchorElement>(null)
  const getQuotesRef = useRef<HTMLButtonElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return

    const navLinks = navRef.current
      ? Array.from(navRef.current.children)
      : []
    const ctaEls = [browseMapRef.current, getQuotesRef.current].filter(
      Boolean,
    ) as Element[]
    const animatedEls = [
      header,
      logoRef.current,
      ...navLinks,
      ...ctaEls,
      menuBtnRef.current,
    ].filter(Boolean) as Element[]

    if (getPrefersReducedMotion()) {
      animatedEls.forEach(clearEntranceProps)
      return
    }

    gsap.set(header, { opacity: 0, y: -20, visibility: "hidden" })
    if (logoRef.current) {
      gsap.set(logoRef.current, { opacity: 0, y: 14, visibility: "hidden" })
    }
    if (navLinks.length > 0) {
      gsap.set(navLinks, { opacity: 0, y: 16, visibility: "hidden" })
    }
    if (ctaEls.length > 0) {
      gsap.set(ctaEls, { opacity: 0, y: 16, visibility: "hidden" })
    }
    if (menuBtnRef.current) {
      gsap.set(menuBtnRef.current, {
        opacity: 0,
        y: 12,
        visibility: "hidden",
      })
    }

    const ctx = gsap.context(() => {
      gsap.to(header, {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: ENTRANCE_EASE,
        onComplete: () => clearEntranceProps(header),
      })

      const tl = gsap.timeline({ defaults: { ease: ENTRANCE_EASE_OUT } })

      if (logoRef.current) {
        tl.to(
          logoRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            onComplete: () => clearEntranceProps(logoRef.current!),
          },
          0.12,
        )
      }
      if (navLinks.length > 0) {
        const navStart = 0.22
        const navStagger = 0.04
        const navDuration = 0.55
        const staggeredNavCount = Math.min(4, navLinks.length)
        const navTween = {
          autoAlpha: 1,
          y: 0,
          duration: navDuration,
        }

        navLinks.slice(0, staggeredNavCount).forEach((el, i) => {
          tl.to(
            el,
            {
              ...navTween,
              onComplete: () => clearEntranceProps(el),
            },
            navStart + i * navStagger,
          )
        })

        const parallelStart = navStart + staggeredNavCount * navStagger
        navLinks.slice(staggeredNavCount).forEach((el) => {
          tl.to(
            el,
            {
              ...navTween,
              onComplete: () => clearEntranceProps(el),
            },
            parallelStart,
          )
        })
      }

      if (browseMapRef.current && getQuotesRef.current) {
        const ctaStart = 0.38
        const ctaDuration = 0.55
        tl.to(
          [browseMapRef.current, getQuotesRef.current],
          {
            autoAlpha: 1,
            y: 0,
            duration: ctaDuration,
            ease: ENTRANCE_EASE_OUT,
            onComplete: () => {
              clearEntranceProps(browseMapRef.current!)
              clearEntranceProps(getQuotesRef.current!)
            },
          },
          ctaStart,
        )
      }
      if (menuBtnRef.current) {
        tl.to(
          menuBtnRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            onComplete: () => clearEntranceProps(menuBtnRef.current!),
          },
          0.28,
        )
      }
    }, header)

    return () => ctx.revert()
  }, [])

  return (
    <header
      ref={headerRef}
      className={cn(
        ENTRANCE_PREPARE_CLASS,
        overlay
          ? "sticky top-0 z-50 border-b border-border/20 bg-frosted-mint/25 backdrop-blur-[2px]"
          : "sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md",
      )}
      style={entranceStyle(-20, 0)}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          ref={logoRef}
          href="#top"
          className={cn(ENTRANCE_PREPARE_CLASS, "flex items-center")}
          style={entranceStyle(14, 0)}
        >
          <SiteLogo />
        </a>

        <nav
          ref={navRef}
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                ENTRANCE_PREPARE_CLASS,
                "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
              )}
              style={entranceStyle(16, 0)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            ref={browseMapRef}
            href="#locations"
            className={cn(
              ENTRANCE_PREPARE_CLASS,
              "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
            )}
            style={entranceStyle(16, 0)}
          >
            Browse map
          </a>
          <Button
            ref={getQuotesRef}
            className={ENTRANCE_PREPARE_CLASS}
            style={entranceStyle(16, 0)}
            onClick={openQuoteModal}
          >
            Get quotes
          </Button>
        </div>

        <button
          ref={menuBtnRef}
          type="button"
          className={cn(
            ENTRANCE_PREPARE_CLASS,
            "inline-flex h-10 w-10 items-center justify-center text-foreground md:hidden",
          )}
          style={entranceStyle(12, 0)}
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
                className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
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
