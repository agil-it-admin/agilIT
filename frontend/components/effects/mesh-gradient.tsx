"use client"

import { useEffect, useRef } from "react"
import { getPrefersReducedMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Blob = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  color: string
}

const BLOBS: Omit<Blob, "x" | "y" | "vx" | "vy">[] = [
  { r: 0.42, color: "rgba(82, 183, 136, 0.55)" },
  { r: 0.38, color: "rgba(116, 198, 157, 0.5)" },
  { r: 0.35, color: "rgba(64, 145, 108, 0.45)" },
  { r: 0.3, color: "rgba(183, 228, 199, 0.6)" },
  { r: 0.28, color: "rgba(45, 106, 79, 0.35)" },
]

type MeshGradientProps = {
  className?: string
  interactive?: boolean
}

export function MeshGradient({
  className,
  interactive = true,
}: MeshGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerRef = useRef({ x: 0.55, y: 0.4 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const reduced = getPrefersReducedMotion()
    let raf = 0
    let width = 0
    let height = 0
    let dpr = 1

    const blobs: Blob[] = BLOBS.map((b, i) => {
      const angle = (i / BLOBS.length) * Math.PI * 2
      return {
        ...b,
        x: 0.5 + Math.cos(angle) * 0.18,
        y: 0.42 + Math.sin(angle) * 0.14,
        vx: Math.cos(angle + 1) * 0.00025,
        vy: Math.sin(angle + 1) * 0.0002,
      }
    })

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "#f6fbf7"
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeOperation = "multiply"
      for (const blob of blobs) {
        const gx = blob.x * width
        const gy = blob.y * height
        const radius = blob.r * Math.max(width, height)
        const gradient = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius)
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(1, "rgba(255,255,255,0)")
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(gx, gy, radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = "source-over"

      // Soft light wash so text stays readable
      const wash = ctx.createLinearGradient(0, 0, width, height)
      wash.addColorStop(0, "rgba(255,255,255,0.35)")
      wash.addColorStop(0.45, "rgba(255,255,255,0.08)")
      wash.addColorStop(1, "rgba(216,243,220,0.25)")
      ctx.fillStyle = wash
      ctx.fillRect(0, 0, width, height)
    }

    const tick = () => {
      const pointer = pointerRef.current
      for (let i = 0; i < blobs.length; i++) {
        const blob = blobs[i]
        blob.x += blob.vx
        blob.y += blob.vy

        if (blob.x < 0.15 || blob.x > 0.9) blob.vx *= -1
        if (blob.y < 0.1 || blob.y > 0.85) blob.vy *= -1

        if (interactive) {
          const dx = pointer.x - blob.x
          const dy = pointer.y - blob.y
          blob.vx += dx * 0.00003
          blob.vy += dy * 0.00003
        }

        const speed = Math.hypot(blob.vx, blob.vy)
        const max = 0.0009
        if (speed > max) {
          blob.vx = (blob.vx / speed) * max
          blob.vy = (blob.vy / speed) * max
        }
      }
      draw()
      raf = requestAnimationFrame(tick)
    }

    resize()
    draw()

    const onPointer = (e: PointerEvent) => {
      if (!interactive) return
      const rect = canvas.getBoundingClientRect()
      pointerRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }

    window.addEventListener("resize", resize)
    if (interactive) {
      canvas.parentElement?.addEventListener("pointermove", onPointer)
    }

    if (!reduced) {
      raf = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      canvas.parentElement?.removeEventListener("pointermove", onPointer)
    }
  }, [interactive])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  )
}
