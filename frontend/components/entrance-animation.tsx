"use client"

import {
  createElement,
  useLayoutEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react"
import gsap from "gsap"
import { cn } from "@/lib/utils"
import {
  ENTRANCE_EASE,
  ENTRANCE_EASE_OUT,
  ENTRANCE_PREPARE_CLASS,
  ENTRANCE_STAGGER_PREPARE_CLASS,
  entranceStyle,
  getPrefersReducedMotion,
} from "@/lib/motion"

function clearEntranceProps(el: Element) {
  el.classList.remove(ENTRANCE_PREPARE_CLASS)
  gsap.set(el, { clearProps: "opacity,visibility,transform" })
}

type EntranceRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  x?: number
}

export function EntranceReveal({
  children,
  className,
  delay = 0,
  duration = 0.75,
  y = 24,
  x = 0,
}: EntranceRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    if (getPrefersReducedMotion()) {
      clearEntranceProps(el)
      return
    }

    gsap.set(el, { opacity: 0, y, x, visibility: "hidden" })

    const tween = gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      ease: ENTRANCE_EASE,
      onComplete: () => {
        clearEntranceProps(el)
      },
    })

    return () => {
      tween.kill()
    }
  }, [delay, duration, x, y])

  return (
    <div
      ref={ref}
      className={cn(ENTRANCE_PREPARE_CLASS, className)}
      style={entranceStyle(y, x)}
    >
      {children}
    </div>
  )
}

type EntranceStaggerProps = {
  children: ReactNode
  className?: string
  baseDelay?: number
  stagger?: number
  duration?: number
  y?: number
  x?: number
  as?: ElementType
}

export function EntranceStagger({
  children,
  className,
  baseDelay = 0,
  stagger = 0.07,
  duration = 0.65,
  y = 18,
  x = 0,
  as: Tag = "div",
}: EntranceStaggerProps) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const container = ref.current
    if (!container) return

    const targets = Array.from(container.children)
    if (targets.length === 0) return

    if (getPrefersReducedMotion()) {
      container.classList.remove(ENTRANCE_STAGGER_PREPARE_CLASS)
      gsap.set(targets, { clearProps: "opacity,visibility,transform" })
      return
    }

    gsap.set(targets, { opacity: 0, y, x, visibility: "hidden" })

    const tween = gsap.to(targets, {
      autoAlpha: 1,
      y: 0,
      x: 0,
      duration,
      delay: baseDelay,
      stagger,
      ease: ENTRANCE_EASE_OUT,
      onComplete: () => {
        container.classList.remove(ENTRANCE_STAGGER_PREPARE_CLASS)
        gsap.set(targets, { clearProps: "opacity,visibility,transform" })
      },
    })

    return () => {
      tween.kill()
    }
  }, [baseDelay, duration, stagger, x, y])

  return createElement(
    Tag,
    {
      ref,
      className: cn(ENTRANCE_STAGGER_PREPARE_CLASS, className),
      style: entranceStyle(y, x),
    },
    children,
  )
}
