"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import { facilities } from "@/lib/data";

type Arc = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
};

type Point = {
  lat: number;
  lng: number;
  name: string;
  metro: string;
  powerMw: number;
};

/** Full Three.js globe.gl — arcs, pulse rings, HTML labels (closest to the screenshot). */
export function GlobeGlArcs() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 640, h: 480 });

  const { points, arcs, rings } = useMemo(() => {
    const points: Point[] = facilities.map((f) => ({
      lat: f.coordinates[1],
      lng: f.coordinates[0],
      name: f.name,
      metro: f.metro,
      powerMw: f.powerMw,
    }));

    const hubs = [0, 1, 2, 3, 4, 5];
    const arcs: Arc[] = [];
    for (let i = 0; i < hubs.length; i++) {
      for (let j = i + 1; j < hubs.length; j++) {
        if ((i + j) % 2 === 0) continue;
        const a = points[hubs[i]];
        const b = points[hubs[j]];
        arcs.push({
          startLat: a.lat,
          startLng: a.lng,
          endLat: b.lat,
          endLng: b.lng,
        });
      }
    }

    const rings = points.slice(0, 6).map((p) => ({ lat: p.lat, lng: p.lng }));
    return { points, arcs, rings };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.max(320, width), h: Math.max(360, height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.6;
    globe.controls().enableZoom = false;
    globe.pointOfView({ lat: 28, lng: -95, altitude: 1.85 }, 0);
  }, []);

  return (
    <div ref={containerRef} className="h-[min(70vh,560px)] w-full overflow-hidden">
      <Globe
        ref={globeRef}
        width={size.w}
        height={size.h}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
        atmosphereColor="#74c69d"
        atmosphereAltitude={0.18}
        arcsData={arcs}
        arcColor={() => ["#40916c", "#95d5b2"]}
        arcDashLength={0.45}
        arcDashGap={0.25}
        arcDashAnimateTime={2800}
        arcStroke={0.6}
        arcAltitudeAutoScale={0.45}
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => "#2d6a4f"}
        pointAltitude={0.01}
        pointRadius={0.35}
        pointLabel={(d) => {
          const p = d as Point;
          return `<div style="font-family:system-ui;padding:6px 8px"><strong>${p.metro}</strong><br/>${p.powerMw} MW</div>`;
        }}
        ringsData={rings}
        ringColor={() => (t: number) => `rgba(64,145,108,${Math.sqrt(1 - t)})`}
        ringMaxRadius={3}
        ringPropagationSpeed={2}
        ringRepeatPeriod={1400}
        htmlElementsData={points.slice(0, 2)}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.02}
        htmlElement={(d) => {
          const p = d as Point;
          const el = document.createElement("div");
          el.innerHTML = `<div style="
            pointer-events:none;
            white-space:nowrap;
            background:#fff;
            border:1px solid #e5e7eb;
            border-radius:6px;
            padding:6px 10px;
            box-shadow:0 4px 14px rgba(8,28,21,.08);
            font-family:var(--font-work-sans),system-ui,sans-serif;
          ">
            <div style="font-size:12px;font-weight:600;color:#081c15">${p.metro}</div>
            <div style="font-size:11px;color:#6b7280">${p.powerMw} MW · ${p.name}</div>
          </div>`;
          return el;
        }}
      />
    </div>
  );
}
