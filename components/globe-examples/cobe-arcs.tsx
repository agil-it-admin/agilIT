"use client"

import createGlobe from "cobe"
import { useEffect, useMemo, useRef } from "react"

const SIZE = 520
/** Very slow drift — roughly one full turn every ~10+ minutes */
const PHI_SPEED = 0.0001

type Hub = {
  id: string
  /** [lat, lng] — cobe marker format */
  location: [number, number]
  /** Major market hubs get the dual-ring “selected” treatment */
  tier: "hub" | "market"
}

/**
 * Global capacity footprint for the homepage globe.
 * Hubs = primary metros; markets = additional coverage cities.
 */
const NETWORK_HUBS: Hub[] = [
  // Americas
  { id: "ashburn", location: [39.04, -77.49], tier: "hub" },
  { id: "newyork", location: [40.71, -74.01], tier: "hub" },
  { id: "chicago", location: [41.88, -87.63], tier: "hub" },
  { id: "dallas", location: [32.78, -96.8], tier: "hub" },
  { id: "santaclara", location: [37.35, -121.96], tier: "hub" },
  { id: "seattle", location: [47.61, -122.33], tier: "market" },
  { id: "phoenix", location: [33.45, -112.07], tier: "market" },
  { id: "miami", location: [25.76, -80.19], tier: "market" },
  { id: "toronto", location: [43.65, -79.38], tier: "hub" },
  { id: "sao-paulo", location: [-23.55, -46.63], tier: "hub" },
  { id: "santiago", location: [-33.45, -70.67], tier: "market" },
  { id: "mexico-city", location: [19.43, -99.13], tier: "market" },

  // EMEA
  { id: "london", location: [51.51, -0.13], tier: "hub" },
  { id: "amsterdam", location: [52.37, 4.9], tier: "hub" },
  { id: "frankfurt", location: [50.11, 8.68], tier: "hub" },
  { id: "paris", location: [48.86, 2.35], tier: "hub" },
  { id: "dublin", location: [53.35, -6.26], tier: "market" },
  { id: "stockholm", location: [59.33, 18.07], tier: "market" },
  { id: "madrid", location: [40.42, -3.7], tier: "market" },
  { id: "milan", location: [45.46, 9.19], tier: "market" },
  { id: "zurich", location: [47.38, 8.54], tier: "market" },
  { id: "warsaw", location: [52.23, 21.01], tier: "market" },
  { id: "dubai", location: [25.2, 55.27], tier: "hub" },
  { id: "johannesburg", location: [-26.2, 28.05], tier: "hub" },
  { id: "lagos", location: [6.52, 3.38], tier: "market" },

  // APAC
  { id: "singapore", location: [1.35, 103.82], tier: "hub" },
  { id: "tokyo", location: [35.68, 139.69], tier: "hub" },
  { id: "hong-kong", location: [22.32, 114.17], tier: "hub" },
  { id: "sydney", location: [-33.87, 151.21], tier: "hub" },
  { id: "mumbai", location: [19.08, 72.88], tier: "hub" },
  { id: "seoul", location: [37.57, 126.98], tier: "market" },
  { id: "osaka", location: [34.69, 135.5], tier: "market" },
  { id: "jakarta", location: [-6.21, 106.85], tier: "market" },
  { id: "melbourne", location: [-37.81, 144.96], tier: "market" },
  { id: "taipei", location: [25.03, 121.57], tier: "market" },
]

/** Long-haul + regional routes so coverage reads as a worldwide network */
const NETWORK_ARCS: [string, string][] = [
  ["ashburn", "london"],
  ["ashburn", "frankfurt"],
  ["ashburn", "sao-paulo"],
  ["newyork", "amsterdam"],
  ["santaclara", "tokyo"],
  ["santaclara", "singapore"],
  ["chicago", "toronto"],
  ["dallas", "mexico-city"],
  ["miami", "sao-paulo"],
  ["london", "dubai"],
  ["frankfurt", "singapore"],
  ["amsterdam", "mumbai"],
  ["dubai", "singapore"],
  ["dubai", "johannesburg"],
  ["singapore", "sydney"],
  ["singapore", "hong-kong"],
  ["tokyo", "sydney"],
  ["tokyo", "seoul"],
  ["hong-kong", "mumbai"],
  ["paris", "madrid"],
  ["london", "dublin"],
  ["sydney", "melbourne"],
]

/**
 * Worldwide capacity markers — dual-ring hubs, smaller market dots,
 * and thin intercontinental arcs. No large wash circles.
 */
export function CobeArcsGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { markers, arcs } = useMemo(() => {
    const byId = Object.fromEntries(NETWORK_HUBS.map((h) => [h.id, h]))

    const markers = NETWORK_HUBS.flatMap((hub) => {
      if (hub.tier === "hub") {
        return [
          {
            location: hub.location,
            size: 0.042,
            color: [0.55, 0.82, 0.68] as [number, number, number],
          },
          {
            location: hub.location,
            size: 0.02,
            color: [0.18, 0.48, 0.36] as [number, number, number],
          },
        ]
      }
      return [
        {
          location: hub.location,
          size: 0.016,
          color: [0.3, 0.58, 0.45] as [number, number, number],
        },
      ]
    })

    const arcs = NETWORK_ARCS.flatMap(([fromId, toId]) => {
      const from = byId[fromId]
      const to = byId[toId]
      if (!from || !to) return []
      return [
        {
          from: from.location,
          to: to.location,
          color: [0.4, 0.68, 0.55] as [number, number, number],
        },
      ]
    })

    return { markers, arcs }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let phi = 0.3
    let frame = 0

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: SIZE * 2,
      height: SIZE * 2,
      phi,
      theta: 0.22,
      dark: 0,
      diffuse: 1.15,
      mapSamples: 18000,
      mapBrightness: 5,
      baseColor: [0.9, 0.96, 0.92],
      markerColor: [0.2, 0.5, 0.38],
      glowColor: [0.8, 0.92, 0.86],
      markers,
      arcs,
      arcColor: [0.4, 0.68, 0.55],
      arcWidth: 0.32,
      arcHeight: 0.28,
      markerElevation: 0.015,
      scale: 1.05,
    })

    const tick = () => {
      phi += PHI_SPEED
      globe.update({ phi })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      globe.destroy()
    }
  }, [markers, arcs])

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <canvas
        ref={canvasRef}
        width={SIZE * 2}
        height={SIZE * 2}
        className="h-full w-full"
        aria-label="Slowly rotating globe showing worldwide network capacity"
      />
    </div>
  )
}
