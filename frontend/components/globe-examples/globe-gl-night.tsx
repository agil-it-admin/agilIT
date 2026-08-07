"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import { facilities } from "@/lib/data";

/** Night-earth globe with pulse rings — dense “network” look without extra map deps. */
export function GlobeGlNight() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 640, h: 480 });

  const { points, rings } = useMemo(() => {
    const points = facilities.map((f) => ({
      lat: f.coordinates[1],
      lng: f.coordinates[0],
      metro: f.metro,
      powerMw: f.powerMw,
    }));
    return { points, rings: points };
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
    globe.controls().autoRotateSpeed = 0.5;
    globe.controls().enableZoom = false;
    globe.pointOfView({ lat: 25, lng: -90, altitude: 1.9 }, 0);
  }, []);

  return (
    <div ref={containerRef} className="h-[min(70vh,560px)] w-full overflow-hidden bg-[#060f0c]">
      <Globe
        ref={globeRef}
        width={size.w}
        height={size.h}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
        atmosphereColor="#74c69d"
        atmosphereAltitude={0.2}
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => "#95d5b2"}
        pointAltitude={0.01}
        pointRadius={0.45}
        pointLabel={(d) => {
          const p = d as { metro: string; powerMw: number };
          return `${p.metro} · ${p.powerMw} MW`;
        }}
        ringsData={rings}
        ringColor={() => (t: number) => `rgba(116,198,157,${1 - t})`}
        ringMaxRadius={2.5}
        ringPropagationSpeed={1.8}
        ringRepeatPeriod={1600}
      />
    </div>
  );
}
