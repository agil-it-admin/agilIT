import type { CSSProperties } from "react"

export const ENTRANCE_EASE = "power3.out"
export const ENTRANCE_EASE_OUT = "power2.out"
export const ENTRANCE_PREPARE_CLASS = "entrance-prepare"
export const ENTRANCE_STAGGER_PREPARE_CLASS = "entrance-stagger-prepare"

export function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function entranceStyle(y = 24, x = 0): CSSProperties {
  return {
    "--entrance-y": `${y}px`,
    "--entrance-x": `${x}px`,
  } as CSSProperties
}
