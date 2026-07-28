"use client";

import createGlobe from "cobe";
import { useEffect, useMemo, useRef } from "react";
import { facilities } from "@/lib/data";

const SIZE = 520;

function toLatLng(coords: [number, number]): [number, number] {
  return [coords[1], coords[0]];
}

/** Cobe v2 globe with arcs between hubs — closest lightweight match to the fintech look. */
export function CobeArcsGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { markers, arcs, labels } = useMemo(() => {
    const byId = Object.fromEntries(facilities.map((f) => [f.id, f]));
    const hubIds = ["ashburn-1", "santa-clara-1", "dallas-1", "chicago-1", "miami-1"];
    const hubs = hubIds.map((id) => byId[id]).filter(Boolean);

    const markers = hubs.map((f) => ({
      location: toLatLng(f.coordinates),
      size: 0.05,
      id: f.id,
      color: [0.32, 0.57, 0.44] as [number, number, number],
    }));

    const arcs = [
      { from: toLatLng(byId["ashburn-1"].coordinates), to: toLatLng(byId["santa-clara-1"].coordinates), id: "ash-sc" },
      { from: toLatLng(byId["ashburn-1"].coordinates), to: toLatLng(byId["dallas-1"].coordinates), id: "ash-dal" },
      { from: toLatLng(byId["ashburn-1"].coordinates), to: toLatLng(byId["chicago-1"].coordinates), id: "ash-chi" },
      { from: toLatLng(byId["santa-clara-1"].coordinates), to: toLatLng(byId["miami-1"].coordinates), id: "sc-mia" },
      { from: toLatLng(byId["dallas-1"].coordinates), to: toLatLng(byId["chicago-1"].coordinates), id: "dal-chi" },
    ];

    const labels = hubs.slice(0, 3).map((f) => ({
      id: f.id,
      title: f.metro,
      subtitle: `${f.powerMw} MW`,
    }));

    return { markers, arcs, labels };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = -0.4;
    let frame = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: SIZE * 2,
      height: SIZE * 2,
      phi,
      theta: 0.2,
      dark: 0,
      diffuse: 1.15,
      mapSamples: 18000,
      mapBrightness: 5,
      baseColor: [0.9, 0.96, 0.92],
      markerColor: [0.25, 0.57, 0.44],
      glowColor: [0.8, 0.92, 0.86],
      markers,
      arcs,
      arcColor: [0.32, 0.57, 0.44],
      arcWidth: 0.6,
      arcHeight: 0.35,
      markerElevation: 0.02,
      scale: 1.08,
    });

    const tick = () => {
      phi += 0.0035;
      globe.update({ phi });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      globe.destroy();
    };
  }, [markers, arcs]);

  return (
    <div ref={wrapperRef} className="relative mx-auto aspect-square w-full max-w-[520px]">
      <canvas
        ref={canvasRef}
        width={SIZE * 2}
        height={SIZE * 2}
        className="h-full w-full"
        aria-label="Rotating globe with connection arcs"
      />
      {labels.map((label) => (
        <div
          key={label.id}
          className="pointer-events-none absolute z-10 rounded-md border border-border bg-white px-2.5 py-1.5 shadow-sm"
          style={{
            positionAnchor: `--cobe-${label.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% -8px",
            opacity: `var(--cobe-visible-${label.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${label.id}, 0)) * 6px))`,
            transition: "opacity 0.25s, filter 0.25s",
          }}
        >
          <p className="text-xs font-semibold text-evergreen">{label.title}</p>
          <p className="text-[11px] text-muted-foreground">{label.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
