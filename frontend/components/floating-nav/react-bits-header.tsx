"use client"

import Link from "next/link"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react"
import { ArrowRight } from "lucide-react"
import { SiteLogo } from "@/components/site-logo"
import { cn } from "@/lib/utils"

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

const NAV_LINKS = [
  { label: "Locations", href: "/#locations" },
  { label: "Services", href: "/#services" },
  { label: "Effects", href: "/effects" },
  { label: "Globes", href: "/globe-examples" },
]

type ReactBitsHeaderProps = {
  activeHref?: string
  className?: string
}

export function ReactBitsHeader({
  activeHref = "/floating-nav",
  className,
}: ReactBitsHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const linksRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const positionHighlight = useCallback((el: Element | null) => {
    const highlight = highlightRef.current
    const container = linksRef.current
    if (!highlight || !container || !el) return
    const linkRect = el.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    highlight.style.width = `${linkRect.width}px`
    highlight.style.height = `${linkRect.height}px`
    highlight.style.transform = `translateX(${linkRect.left - containerRect.left}px)`
    highlight.style.opacity = "1"
  }, [])

  const getActiveEl = useCallback(() => {
    return linksRef.current?.querySelector("[data-nav-active='true']") ?? null
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const activeEl = getActiveEl()
      if (activeEl) positionHighlight(activeEl)
    })
    return () => cancelAnimationFrame(frame)
  }, [activeHref, getActiveEl, positionHighlight])

  const handleLinkHover = (e: MouseEvent<HTMLAnchorElement>) => {
    positionHighlight(e.currentTarget)
  }

  const handleLinksLeave = () => {
    const activeEl = getActiveEl()
    if (activeEl) {
      positionHighlight(activeEl)
    } else if (highlightRef.current) {
      highlightRef.current.style.opacity = "0"
    }
  }

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-5 z-50 flex flex-col items-center px-4 sm:px-6",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-auto relative flex h-14 w-full max-w-[1680px] items-center justify-between rounded-2xl border border-transparent bg-transparent py-0 pl-4 pr-2 transition-[max-width,background,border-color,backdrop-filter] duration-500 sm:pl-5 sm:pr-2",
          scrolled &&
            "max-w-[calc(1300px-24px)] border-white/[0.06] bg-evergreen/45 shadow-[0_8px_32px_rgba(8,28,21,0.35)] backdrop-blur-[24px] backdrop-saturate-150",
        )}
      >
        <div className="flex min-w-0 items-center">
          <Link
            href="/"
            className="flex shrink-0 items-center [&_img]:brightness-0 [&_img]:invert"
            aria-label="agil.IT home"
          >
            <SiteLogo className="h-7" />
          </Link>

          <span
            aria-hidden
            className="mx-3 hidden select-none text-lg font-light text-white/50 sm:mx-4 md:inline"
          >
            /
          </span>

          <nav
            ref={linksRef}
            aria-label="Primary"
            className="relative hidden items-center gap-1 md:flex"
            onMouseLeave={handleLinksLeave}
          >
            <div
              ref={highlightRef}
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 rounded-xl border border-white/10 bg-evergreen/50 opacity-0 shadow-[0_2px_16px_rgba(0,0,0,0.25),inset_0_0.5px_0_rgba(255,255,255,0.06)] backdrop-blur-[24px] backdrop-saturate-150 transition-[transform,width,height,opacity] duration-300 ease-out"
            />
            {NAV_LINKS.map((link) => {
              const active = activeHref === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-nav-active={active ? "true" : "false"}
                  onMouseEnter={handleLinkHover}
                  className={cn(
                    "relative z-10 rounded-xl px-2.5 py-1.5 font-sans text-[13px] font-medium tracking-[0.04em] uppercase transition-colors",
                    active ? "text-white" : "text-white/70 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/effects"
            className="hidden h-9 items-center gap-2 rounded-[10px] border border-white/10 bg-evergreen/45 px-3 font-sans text-[13px] font-medium text-white shadow-[0_2px_16px_rgba(0,0,0,0.2),inset_0_0.5px_0_rgba(255,255,255,0.06)] backdrop-blur-[32px] backdrop-saturate-150 transition-colors hover:border-white/20 hover:bg-evergreen/55 lg:inline-flex"
          >
            Sandbox
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-white/50 uppercase">
              Soon
            </span>
          </Link>

          <Link
            href="/#top"
            className="rb-cta group relative isolate inline-flex h-9 items-center overflow-hidden rounded-[10px] border-[3px] border-white/10 px-3 font-sans text-xs font-semibold tracking-wide text-white uppercase sm:h-9 sm:border-[5px] sm:px-5 sm:text-[13px]"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = ((e.clientX - rect.left) / rect.width) * 100
              e.currentTarget.style.setProperty("--cta-mx", `${x}%`)
            }}
          >
            <span className="relative z-10 inline-flex items-center gap-1.5">
              Get quotes
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 items-center gap-1.5 rounded-[10px] border border-white/10 bg-evergreen/45 px-3 font-sans text-[13px] font-medium text-white shadow-[0_2px_16px_rgba(0,0,0,0.2),inset_0_0.5px_0_rgba(255,255,255,0.06)] backdrop-blur-[32px] backdrop-saturate-150 transition-colors hover:border-white/20 hover:bg-evergreen/55 sm:inline-flex"
          >
            <GitHubIcon className="size-3.5" />
            <span>Star</span>
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className={cn(
              "inline-flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-[10px] border border-white/10 bg-evergreen/45 backdrop-blur-[32px] backdrop-saturate-150 transition-colors hover:border-white/20 hover:bg-evergreen/55 md:hidden",
              menuOpen && "border-white/20 bg-evergreen/55",
            )}
          >
            <span
              className={cn(
                "block h-[1.5px] w-4 rounded-full bg-white transition-transform duration-200",
                menuOpen && "translate-y-[5.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-4 rounded-full bg-white transition-opacity duration-200",
                menuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-4 rounded-full bg-white transition-transform duration-200",
                menuOpen && "-translate-y-[5.5px] -rotate-45",
              )}
            />
          </button>
        </div>

        {menuOpen ? (
          <div
            className="absolute top-[calc(100%+8px)] right-1.5 z-[1001] flex min-w-[200px] animate-in fade-in slide-in-from-top-1 flex-col gap-0.5 rounded-[14px] border border-white/[0.06] bg-evergreen/90 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-[32px] backdrop-saturate-150 duration-200 md:hidden"
            role="menu"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-[10px] px-3.5 py-3 font-sans text-[13px] font-medium tracking-[0.04em] text-white/70 uppercase transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                {link.label}
                <span aria-hidden className="text-base opacity-40">
                  →
                </span>
              </Link>
            ))}
            <div className="my-1 h-px bg-white/[0.06]" />
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded-[10px] px-3.5 py-3 font-sans text-[13px] font-medium tracking-[0.04em] text-white/70 uppercase transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <GitHubIcon className="size-3.5" />
              GitHub
            </a>
          </div>
        ) : null}
      </div>
    </header>
  )
}
