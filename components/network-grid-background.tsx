"use client"

import { useEffect, useRef } from "react"

const SUB_GRID_SIZE = 30
const MAIN_GRID_MULTIPLIER = 4
const MAIN_GRID_SIZE = SUB_GRID_SIZE * MAIN_GRID_MULTIPLIER

/** pine_teal #1b4332 — subtle grid lines on frosted_mint background */
const GRID_RGB = "27, 67, 50"
/** frosted_mint wash over the left edge */
const WASH_RGB = "240, 250, 242"

type ActivePixel = {
  x: number
  y: number
  life: number
  maxLife: number
  reset: (width: number, height: number) => void
  update: () => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

type DataStream = {
  x: number
  y: number
  isVertical: boolean
  dir: number
  speed: number
  length: number
  reset: (width: number, height: number) => void
  update: (width: number, height: number) => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

function createActivePixel(width: number, height: number): ActivePixel {
  const pixel: ActivePixel = {
    x: 0,
    y: 0,
    life: 0,
    maxLife: 0,
    reset(w, h) {
      this.x =
        Math.floor(Math.random() * (w / SUB_GRID_SIZE)) * SUB_GRID_SIZE
      this.y =
        Math.floor(Math.random() * (h / SUB_GRID_SIZE)) * SUB_GRID_SIZE
      this.life = 0
      this.maxLife = Math.random() * 150 + 80
    },
    update() {
      this.life++
      if (this.life > this.maxLife) this.reset(width, height)
    },
    draw(ctx) {
      const progress = this.life / this.maxLife
      const opacity = Math.sin(progress * Math.PI) * 0.08
      ctx.fillStyle = `rgba(${GRID_RGB}, ${opacity})`
      ctx.fillRect(this.x + 1, this.y + 1, SUB_GRID_SIZE - 2, SUB_GRID_SIZE - 2)
    },
  }
  pixel.reset(width, height)
  pixel.life = Math.random() * pixel.maxLife
  return pixel
}

function createDataStream(width: number, height: number): DataStream {
  const stream: DataStream = {
    x: 0,
    y: 0,
    isVertical: false,
    dir: 1,
    speed: 0,
    length: 0,
    reset(w, h) {
      this.isVertical = Math.random() > 0.5
      this.dir = Math.random() > 0.5 ? 1 : -1
      this.speed = Math.random() * 1.5 + 0.5
      this.length = Math.random() * 150 + 50

      if (this.isVertical) {
        this.x =
          Math.floor(Math.random() * (w / MAIN_GRID_SIZE)) * MAIN_GRID_SIZE
        this.y = this.dir === 1 ? -this.length : h + this.length
      } else {
        this.y =
          Math.floor(Math.random() * (h / MAIN_GRID_SIZE)) * MAIN_GRID_SIZE
        this.x = this.dir === 1 ? -this.length : w + this.length
      }
    },
    update(w, h) {
      if (this.isVertical) {
        this.y += this.speed * this.dir
        if (
          (this.dir === 1 && this.y - this.length > h) ||
          (this.dir === -1 && this.y + this.length < 0)
        ) {
          this.reset(w, h)
        }
      } else {
        this.x += this.speed * this.dir
        if (
          (this.dir === 1 && this.x - this.length > w) ||
          (this.dir === -1 && this.x + this.length < 0)
        ) {
          this.reset(w, h)
        }
      }
    },
    draw(ctx) {
      const tailX = this.isVertical
        ? this.x
        : this.x - this.length * this.dir
      const tailY = this.isVertical
        ? this.y - this.length * this.dir
        : this.y

      const grad = ctx.createLinearGradient(this.x, this.y, tailX, tailY)
      grad.addColorStop(0, `rgba(${GRID_RGB}, 0.35)`)
      grad.addColorStop(1, `rgba(${GRID_RGB}, 0)`)

      ctx.beginPath()
      ctx.moveTo(tailX, tailY)
      ctx.lineTo(this.x, this.y)
      ctx.strokeStyle = grad
      ctx.lineWidth = 2
      ctx.stroke()
    },
  }
  stream.reset(width, height)
  if (stream.isVertical) {
    stream.y = Math.random() * height
  } else {
    stream.x = Math.random() * width
  }
  return stream
}

function drawStaticGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  ctx.beginPath()
  for (let x = 0; x <= width; x += SUB_GRID_SIZE) {
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
  }
  for (let y = 0; y <= height; y += SUB_GRID_SIZE) {
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
  }
  ctx.strokeStyle = `rgba(${GRID_RGB}, 0.04)`
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.beginPath()
  for (let x = 0; x <= width; x += MAIN_GRID_SIZE) {
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
  }
  for (let y = 0; y <= height; y += MAIN_GRID_SIZE) {
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
  }
  ctx.strokeStyle = `rgba(${GRID_RGB}, 0.08)`
  ctx.lineWidth = 1
  ctx.stroke()

  const crossSize = 4
  ctx.beginPath()
  for (let x = 0; x <= width; x += MAIN_GRID_SIZE) {
    for (let y = 0; y <= height; y += MAIN_GRID_SIZE) {
      ctx.moveTo(x - crossSize, y)
      ctx.lineTo(x + crossSize, y)
      ctx.moveTo(x, y - crossSize)
      ctx.lineTo(x, y + crossSize)
    }
  }
  ctx.strokeStyle = `rgba(${GRID_RGB}, 0.12)`
  ctx.lineWidth = 1
  ctx.stroke()
}

function drawLeftWash(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const gradient = ctx.createLinearGradient(0, 0, width * 0.5, 0)
  gradient.addColorStop(0, `rgba(${WASH_RGB}, 0.85)`)
  gradient.addColorStop(1, `rgba(${WASH_RGB}, 0)`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
}

/**
 * Top-down schematic pixel grid for the header shell.
 * Fine sub-grid, main routing grid, crosshairs, pulsing cells, and data streams.
 */
export function NetworkGridBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    let width = 0
    let height = 0
    let dpr = 1
    let pixels: ActivePixel[] = []
    let streams: DataStream[] = []
    let rafId = 0

    function seedAnimation() {
      pixels = []
      const numPixels = Math.floor((width * height) / 10000)
      for (let i = 0; i < numPixels; i++) {
        pixels.push(createActivePixel(width, height))
      }

      streams = []
      const numStreams = Math.floor((width * height) / 30000)
      for (let i = 0; i < numStreams; i++) {
        streams.push(createDataStream(width, height))
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!prefersReduced) seedAnimation()
    }

    function paint() {
      ctx.clearRect(0, 0, width, height)
      drawStaticGrid(ctx, width, height)

      if (!prefersReduced) {
        for (const pixel of pixels) {
          pixel.update()
          pixel.draw(ctx)
        }
        for (const stream of streams) {
          stream.update(width, height)
          stream.draw(ctx)
        }
      }

      drawLeftWash(ctx, width, height)
    }

    function frame() {
      paint()
      rafId = requestAnimationFrame(frame)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    paint()
    if (!prefersReduced) {
      rafId = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  )
}
