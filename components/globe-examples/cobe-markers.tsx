"use client";

import createGlobe, { type COBEOptions } from "cobe";
import { useEffect, useRef } from "react";
import { facilities } from "@/lib/data";

export type CobeStyle = {
  id: string;
  name: string;
  blurb: string;
  /** Panel background behind the canvas */
  panelClassName: string;
  size?: number;
  markerSize?: number;
  speed?: number;
  options: Omit<
    COBEOptions,
    "width" | "height" | "devicePixelRatio" | "markers" | "phi"
  > & { phi?: number };
};

const facilityMarkers = (size: number) =>
  facilities.map((f) => ({
    location: [f.coordinates[1], f.coordinates[0]] as [number, number],
    size,
  }));

/** Shared cobe canvas — style via preset options. */
export function CobeStyleGlobe({
  style,
  className,
}: {
  style: CobeStyle;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = style.size ?? 420;
  const markerSize = style.markerSize ?? 0.035;
  const speed = style.speed ?? 0.004;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = style.options.phi ?? 0;
    let frame = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi,
      theta: style.options.theta ?? 0.15,
      dark: style.options.dark,
      diffuse: style.options.diffuse,
      mapSamples: style.options.mapSamples,
      mapBrightness: style.options.mapBrightness,
      mapBaseBrightness: style.options.mapBaseBrightness,
      baseColor: style.options.baseColor,
      markerColor: style.options.markerColor,
      glowColor: style.options.glowColor,
      opacity: style.options.opacity,
      offset: style.options.offset,
      scale: style.options.scale,
      markerElevation: style.options.markerElevation,
      markers: facilityMarkers(markerSize),
    });

    const tick = () => {
      phi += speed;
      globe.update({ phi });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      globe.destroy();
    };
  }, [style, size, markerSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      width={size * 2}
      height={size * 2}
      className={className ?? "mx-auto aspect-square w-full max-w-full"}
      style={{ width: size, height: size, maxWidth: "100%" }}
      aria-label={`${style.name} rotating globe`}
    />
  );
}

/** Original brand-tinted markers demo. */
export const COBE_ORIGINAL: CobeStyle = {
  id: "cobe-markers",
  name: "Markers + auto-rotate",
  blurb:
    "Tiny WebGL particle globe (~5KB). Facility pins from lib/data. Fastest option if you only need spin + dots.",
  panelClassName: "bg-muted/40",
  size: 520,
  markerSize: 0.04,
  options: {
    theta: 0.15,
    dark: 0,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 4,
    baseColor: [0.85, 0.95, 0.88],
    markerColor: [0.25, 0.57, 0.44],
    glowColor: [0.85, 0.95, 0.9],
    scale: 1.05,
  },
};

/** Minimalist style board — quiet palettes, sparse or soft land. */
export const COBE_MINIMAL_STYLES: CobeStyle[] = [
  {
    id: "ink-paper",
    name: "Ink on paper",
    blurb: "Near-white land, charcoal dots, almost no glow.",
    panelClassName: "bg-[#fafafa]",
    markerSize: 0.028,
    options: {
      theta: 0.12,
      dark: 0,
      diffuse: 1.4,
      mapSamples: 14000,
      mapBrightness: 2.2,
      mapBaseBrightness: 0.02,
      baseColor: [0.12, 0.12, 0.12],
      markerColor: [0.08, 0.08, 0.08],
      glowColor: [0.97, 0.97, 0.97],
      scale: 1.02,
      opacity: 0.95,
    },
  },
  {
    id: "soft-mist",
    name: "Soft mist",
    blurb: "Pale gray continent speckles; markers barely darker.",
    panelClassName: "bg-[#f5f5f5]",
    markerSize: 0.03,
    options: {
      theta: 0.18,
      dark: 0,
      diffuse: 1.1,
      mapSamples: 12000,
      mapBrightness: 1.6,
      mapBaseBrightness: 0.05,
      baseColor: [0.55, 0.55, 0.55],
      markerColor: [0.35, 0.35, 0.35],
      glowColor: [0.94, 0.94, 0.94],
      scale: 1.04,
    },
  },
  {
    id: "ghost",
    name: "Ghost",
    blurb: "Low opacity + soft glow — reads as a watermark.",
    panelClassName: "bg-white",
    markerSize: 0.032,
    speed: 0.003,
    options: {
      theta: 0.1,
      dark: 0,
      diffuse: 0.9,
      mapSamples: 10000,
      mapBrightness: 1.2,
      baseColor: [0.7, 0.72, 0.74],
      markerColor: [0.45, 0.48, 0.5],
      glowColor: [1, 1, 1],
      opacity: 0.55,
      scale: 1.08,
    },
  },
  {
    id: "sparse",
    name: "Sparse",
    blurb: "Fewer map samples — abstract, dotted continents.",
    panelClassName: "bg-[#f8f8f8]",
    markerSize: 0.045,
    options: {
      theta: 0.2,
      dark: 0,
      diffuse: 1.3,
      mapSamples: 4000,
      mapBrightness: 3.5,
      baseColor: [0.2, 0.2, 0.2],
      markerColor: [0.1, 0.1, 0.1],
      glowColor: [0.96, 0.96, 0.96],
      scale: 1.05,
    },
  },
  {
    id: "dense-whisper",
    name: "Dense whisper",
    blurb: "High sample count, very quiet contrast.",
    panelClassName: "bg-[#fcfcfc]",
    markerSize: 0.022,
    options: {
      theta: 0.14,
      dark: 0,
      diffuse: 1.5,
      mapSamples: 28000,
      mapBrightness: 1.1,
      mapBaseBrightness: 0.08,
      baseColor: [0.62, 0.64, 0.66],
      markerColor: [0.4, 0.42, 0.44],
      glowColor: [0.98, 0.98, 0.98],
      scale: 1.03,
    },
  },
  {
    id: "line-work",
    name: "Line work",
    blurb: "Dark continents on white; tiny markers like pins on a print.",
    panelClassName: "bg-white",
    markerSize: 0.025,
    options: {
      theta: 0.08,
      dark: 1,
      diffuse: 1.6,
      mapSamples: 18000,
      mapBrightness: 6,
      mapBaseBrightness: 0,
      baseColor: [0.05, 0.05, 0.05],
      markerColor: [0.05, 0.05, 0.05],
      glowColor: [1, 1, 1],
      scale: 1.06,
    },
  },
  {
    id: "mint-quiet",
    name: "Mint quiet",
    blurb: "Brand-adjacent but desaturated — soft celadon land.",
    panelClassName: "bg-[#f7fbf8]",
    markerSize: 0.03,
    options: {
      theta: 0.16,
      dark: 0,
      diffuse: 1.25,
      mapSamples: 15000,
      mapBrightness: 2.4,
      baseColor: [0.55, 0.7, 0.62],
      markerColor: [0.3, 0.48, 0.38],
      glowColor: [0.94, 0.97, 0.95],
      scale: 1.04,
    },
  },
  {
    id: "slate",
    name: "Slate",
    blurb: "Cool blue-gray land on a cool panel.",
    panelClassName: "bg-[#f4f6f8]",
    markerSize: 0.032,
    options: {
      theta: 0.22,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 2.8,
      baseColor: [0.4, 0.45, 0.52],
      markerColor: [0.22, 0.28, 0.36],
      glowColor: [0.93, 0.95, 0.97],
      scale: 1.05,
    },
  },
  {
    id: "warm-bone",
    name: "Warm bone",
    blurb: "Warm gray land, sepia markers — editorial feel.",
    panelClassName: "bg-[#f7f5f2]",
    markerSize: 0.03,
    options: {
      theta: 0.11,
      dark: 0,
      diffuse: 1.15,
      mapSamples: 14000,
      mapBrightness: 2,
      baseColor: [0.45, 0.4, 0.35],
      markerColor: [0.28, 0.22, 0.18],
      glowColor: [0.96, 0.94, 0.91],
      scale: 1.04,
    },
  },
  {
    id: "no-glow",
    name: "No glow",
    blurb: "Glow matched to panel — flat disc, no halo.",
    panelClassName: "bg-[#fafafa]",
    markerSize: 0.034,
    options: {
      theta: 0.15,
      dark: 0,
      diffuse: 1.8,
      mapSamples: 16000,
      mapBrightness: 3,
      baseColor: [0.25, 0.25, 0.25],
      markerColor: [0.12, 0.12, 0.12],
      glowColor: [0.98, 0.98, 0.98],
      scale: 1.0,
      opacity: 1,
    },
  },
  {
    id: "horizon-crop",
    name: "Horizon crop",
    blurb: "Offset + scale — globe peeks from the edge.",
    panelClassName: "bg-[#f5f5f5]",
    size: 420,
    markerSize: 0.035,
    options: {
      theta: 0.35,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 14000,
      mapBrightness: 2.5,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.15, 0.15, 0.15],
      glowColor: [0.96, 0.96, 0.96],
      scale: 1.35,
      offset: [0, 120],
    },
  },
  {
    id: "slow-orbit",
    name: "Slow orbit",
    blurb: "Same quiet mono palette, half rotation speed.",
    panelClassName: "bg-white",
    markerSize: 0.03,
    speed: 0.0018,
    options: {
      theta: 0.05,
      dark: 0,
      diffuse: 1.35,
      mapSamples: 16000,
      mapBrightness: 2.2,
      baseColor: [0.22, 0.22, 0.22],
      markerColor: [0.1, 0.1, 0.1],
      glowColor: [1, 1, 1],
      scale: 1.05,
    },
  },
];

export function CobeMarkersGlobe() {
  return <CobeStyleGlobe style={COBE_ORIGINAL} />;
}
