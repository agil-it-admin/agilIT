"use client"

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react"
import { getPrefersReducedMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"

type TiltCardProps = {
  children: ReactNode
  className?: string
  maxTilt?: number
  glare?: boolean
  style?: CSSProperties
}

export function TiltCard({
  children,
  className,
  maxTilt = 10,
  glare = true,
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const target = useRef({ rx: 0, ry: 0, gx: 50, gy: 50 })
  const current = useRef({ rx: 0, ry: 0, gx: 50, gy: 50 })

  useEffect(() => {
    const el = ref.current
    if (!el || getPrefersReducedMotion()) return

    const animate = () => {
      const c = current.current
      const t = target.current
      c.rx += (t.rx - c.rx) * 0.12
      c.ry += (t.ry - c.ry) * 0.12
      c.gx += (t.gx - c.gx) * 0.12
      c.gy += (t.gy - c.gy) * 0.12

      el.style.transform = `perspective(900px) rotateX(${c.rx}deg) rotateY(${c.ry}deg)`
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${c.gx}% ${c.gy}%, rgba(255,255,255,0.45), transparent 55%)`
      }
      frame.current = requestAnimationFrame(animate)
    }

    frame.current = requestAnimationFrame(animate)

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      target.current = {
        rx: (0.5 - py) * maxTilt * 2,
        ry: (px - 0.5) * maxTilt * 2,
        gx: px * 100,
        gy: py * 100,
      }
    }

    const onLeave = () => {
      target.current = { rx: 0, ry: 0, gx: 50, gy: 50 }
    }

    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)

    return () => {
      cancelAnimationFrame(frame.current)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
    }
  }, [maxTilt])

  return (
    <div
      ref={ref}
      className={cn(
        "relative transform-gpu will-change-transform [transform-style:preserve-3d]",
        className,
      )}
      style={style}
    >
      {children}
      {glare ? (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay"
        />
      ) : null}
    </div>
  )
}
