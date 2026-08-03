"use client"

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react"
import { getPrefersReducedMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"

type SpotlightZoneProps = {
  children: ReactNode
  className?: string
  size?: number
  id?: string
}

export function SpotlightZone({
  children,
  className,
  size = 520,
  id,
}: SpotlightZoneProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || getPrefersReducedMotion()) return

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
      el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
    }

    el.addEventListener("pointermove", onMove)
    return () => el.removeEventListener("pointermove", onMove)
  }, [])

  return (
    <div
      id={id}
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={
        {
          "--spot-x": "50%",
          "--spot-y": "40%",
          "--spot-size": `${size}px`,
        } as CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(var(--spot-size) circle at var(--spot-x) var(--spot-y), rgba(82,183,136,0.18), transparent 55%)",
        }}
      />
      {children}
    </div>
  )
}
