"use client"

import { useEffect, useRef, useState } from "react"
import { getPrefersReducedMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"

type AnimatedCounterProps = {
  value: string
  className?: string
}

/** Parses values like "1,400+", "200+", "11M+", "48hr", "99.99%" */
function parseStat(value: string): {
  prefix: string
  end: number
  suffix: string
  decimals: number
} {
  const match = value.match(/^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/)
  if (!match) {
    return { prefix: "", end: 0, suffix: value, decimals: 0 }
  }
  const [, prefix, num, suffix] = match
  const decimals = num.includes(".") ? num.split(".")[1].length : 0
  return {
    prefix,
    end: Number(num.replace(/,/g, "")),
    suffix,
    decimals,
  }
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)
  const parsed = parseStat(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (getPrefersReducedMotion() || parsed.end === 0) {
      setDisplay(value)
      return
    }

    let raf = 0
    let started = false

    const run = () => {
      if (started) return
      started = true
      const duration = 1400
      const start = performance.now()

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        const current = parsed.end * eased
        const formatted =
          parsed.decimals > 0
            ? current.toFixed(parsed.decimals)
            : Math.round(current).toLocaleString("en-US")
        setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`)
        if (t < 1) raf = requestAnimationFrame(tick)
        else setDisplay(value)
      }

      raf = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [parsed.decimals, parsed.end, parsed.prefix, parsed.suffix, value])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </span>
  )
}
