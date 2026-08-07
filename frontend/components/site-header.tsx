"use client"

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { SiteBrand } from "@/components/site-logo"
import { useQuoteModal } from "@/components/quote-modal-provider"
import { cn } from "@/lib/utils"
import {
  ENTRANCE_EASE,
  ENTRANCE_EASE_OUT,
  ENTRANCE_PREPARE_CLASS,
  entranceStyle,
  getPrefersReducedMotion,
} from "@/lib/motion"
import {
  defaultNavigation,
  type CmsNavigation,
} from "@/lib/cms/site"

function clearEntranceProps(el: Element) {
  el.classList.remove(ENTRANCE_PREPARE_CLASS)
  gsap.set(el, { clearProps: "opacity,visibility,transform" })
}

export function SiteHeader({
  overlay = false,
  navigation = defaultNavigation,
}: {
  overlay?: boolean
  navigation?: CmsNavigation
}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // Once entrance finishes, never put entrance-prepare back (scroll re-renders
  // were re-hiding the nav after GSAP cleared the class from the DOM).
  const [entered, setEntered] = useState(false)
  const { openQuoteModal } = useQuoteModal()
  const headerRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const learnMoreRef = useRef<HTMLButtonElement>(null)
  const getQuotesRef = useRef<HTMLButtonElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const nav = navigation.links

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  function scrollToNextSection() {
    const href = navigation.secondaryCtaHref || "/#overview"
    const hashIndex = href.indexOf("#")
    const hash = hashIndex >= 0 ? href.slice(hashIndex + 1) : "overview"
    const path = hashIndex > 0 ? href.slice(0, hashIndex) : "/"

    const go = () => {
      const target = document.getElementById(hash)
      target?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    if (window.location.pathname !== path && path !== "") {
      window.location.assign(href.startsWith("/") ? href : `/${href}`)
      return
    }

    setOpen(false)
    go()
  }

  const positionHighlight = useCallback((el: Element | null) => {
    const highlight = highlightRef.current
    const container = navRef.current
    if (!highlight || !container || !el) return
    const linkRect = el.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    highlight.style.width = `${linkRect.width}px`
    highlight.style.height = `${linkRect.height}px`
    highlight.style.transform = `translateX(${linkRect.left - containerRect.left}px)`
    highlight.style.opacity = "1"
  }, [])

  const handleLinkHover = (e: MouseEvent<HTMLAnchorElement>) => {
    positionHighlight(e.currentTarget)
  }

  const handleLinksLeave = () => {
    if (highlightRef.current) highlightRef.current.style.opacity = "0"
  }

  useLayoutEffect(() => {
    const header = headerRef.current
    const bar = barRef.current
    if (!header || !bar) return

    let cancelled = false

    const navLinks = navRef.current
      ? Array.from(navRef.current.querySelectorAll("[data-nav-link]"))
      : []
    const ctaEls = [learnMoreRef.current, getQuotesRef.current].filter(
      Boolean,
    ) as Element[]
    const animatedEls = [
      header,
      logoRef.current,
      ...navLinks,
      ...ctaEls,
      menuBtnRef.current,
    ].filter(Boolean) as Element[]

    const finishEntrance = () => {
      if (cancelled) return
      animatedEls.forEach(clearEntranceProps)
      setEntered(true)
    }

    if (getPrefersReducedMotion()) {
      finishEntrance()
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
        onComplete: () => {
          if (!cancelled) clearEntranceProps(header)
        },
      })

      const tl = gsap.timeline({
        defaults: { ease: ENTRANCE_EASE_OUT },
        onComplete: finishEntrance,
      })

      if (logoRef.current) {
        tl.to(
          logoRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            onComplete: () => {
              if (!cancelled) clearEntranceProps(logoRef.current!)
            },
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
              onComplete: () => {
                if (!cancelled) clearEntranceProps(el)
              },
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
              onComplete: () => {
                if (!cancelled) clearEntranceProps(el)
              },
            },
            parallelStart,
          )
        })
      }

      if (learnMoreRef.current && getQuotesRef.current) {
        tl.to(
          [learnMoreRef.current, getQuotesRef.current],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: ENTRANCE_EASE_OUT,
            onComplete: () => {
              if (cancelled) return
              clearEntranceProps(learnMoreRef.current!)
              clearEntranceProps(getQuotesRef.current!)
            },
          },
          0.38,
        )
      } else if (getQuotesRef.current) {
        tl.to(
          getQuotesRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: ENTRANCE_EASE_OUT,
            onComplete: () => {
              if (!cancelled) clearEntranceProps(getQuotesRef.current!)
            },
          },
          0.38,
        )
      }
      if (menuBtnRef.current) {
        tl.to(
          menuBtnRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            onComplete: () => {
              if (!cancelled) clearEntranceProps(menuBtnRef.current!)
            },
          },
          0.28,
        )
      }
    }, header)

    return () => {
      cancelled = true
      ctx.revert()
    }
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          !entered && ENTRANCE_PREPARE_CLASS,
          "pointer-events-none fixed inset-x-0 z-50 flex justify-center transition-[top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled ? "top-3 sm:top-4" : "top-0",
        )}
        style={entered ? undefined : entranceStyle(-20, 0)}
      >
        <div
          ref={barRef}
          className={cn(
            // Animate width (not max-w-none) so the side inset eases instead of snapping
            "pointer-events-auto relative border border-transparent bg-transparent transition-[width,max-width,background-color,border-color,box-shadow,backdrop-filter,border-radius] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled
              ? "w-[calc(100%-2rem)] max-w-7xl rounded-[18px] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)]"
              : "w-full max-w-full rounded-none",
            scrolled &&
              (overlay
                ? "border-border/60 bg-background/75 shadow-sm backdrop-blur-xl backdrop-saturate-150"
                : "border-border/80 bg-background/85 shadow-sm backdrop-blur-xl backdrop-saturate-150"),
            !scrolled &&
              overlay &&
              "bg-frosted-mint/20 backdrop-blur-[2px]",
          )}
        >
          <div className="flex h-16 w-full items-center justify-between gap-3 pl-3 pr-2 sm:h-[4.25rem] sm:pl-4 sm:pr-2.5 lg:px-8">
            <div className="flex min-w-0 items-center gap-1 sm:gap-2">
              <a
                ref={logoRef}
                href="/"
                className={cn(
                  !entered && ENTRANCE_PREPARE_CLASS,
                  "relative z-20 flex shrink-0 items-center py-0.5",
                )}
                style={entered ? undefined : entranceStyle(14, 0)}
                aria-label="Colonegotiator home — powered by agil.IT"
              >
                <SiteBrand />
              </a>

              <nav
                ref={navRef}
                className="relative ml-2 hidden items-center gap-0.5 md:ml-3 md:flex"
                aria-label="Primary"
                onMouseLeave={handleLinksLeave}
              >
                <div
                  ref={highlightRef}
                  aria-hidden
                  className="pointer-events-none absolute top-0 left-0 border border-border/70 bg-frosted-mint/80 opacity-0 transition-[transform,width,height,opacity] duration-300 ease-out"
                />
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    data-nav-link
                    onMouseEnter={handleLinkHover}
                    className={cn(
                      !entered && ENTRANCE_PREPARE_CLASS,
                      "relative z-10 px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                    )}
                    style={entered ? undefined : entranceStyle(16, 0)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <Button
                ref={getQuotesRef}
                className={!entered ? ENTRANCE_PREPARE_CLASS : undefined}
                style={entered ? undefined : entranceStyle(16, 0)}
                onClick={() => openQuoteModal()}
              >
                {navigation.primaryCtaLabel}
              </Button>
              <Button
                ref={learnMoreRef}
                variant="outline"
                className={!entered ? ENTRANCE_PREPARE_CLASS : undefined}
                style={entered ? undefined : entranceStyle(16, 0)}
                onClick={scrollToNextSection}
              >
                {navigation.secondaryCtaLabel}
              </Button>
            </div>

            <button
              ref={menuBtnRef}
              type="button"
              className={cn(
                !entered && ENTRANCE_PREPARE_CLASS,
                "inline-flex h-10 w-10 items-center justify-center text-foreground md:hidden",
              )}
              style={entered ? undefined : entranceStyle(12, 0)}
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {open ? (
              <div
                className={cn(
                  "absolute top-[calc(100%+8px)] right-0 left-0 z-50 border border-border bg-background/95 p-2 shadow-sm backdrop-blur-xl md:hidden",
                  overlay && "bg-frosted-mint/95",
                )}
              >
                <nav className="flex flex-col gap-0.5" aria-label="Mobile">
                  {nav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button
                    className="mt-1 w-full"
                    onClick={() => {
                      setOpen(false)
                      openQuoteModal()
                    }}
                  >
                    {navigation.primaryCtaLabel}
                  </Button>
                </nav>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {/* Reserve space when header isn't overlaid on a hero */}
      {!overlay ? <div className="h-20 sm:h-24" aria-hidden /> : null}
    </>
  )
}
