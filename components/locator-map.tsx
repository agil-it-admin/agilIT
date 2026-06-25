"use client";

import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { facilities, regions, type Facility } from "@/lib/data";
import { QuoteCtaButton } from "@/components/quote-cta-button";
import {
  MapPin,
  Zap,
  Building2,
  ShieldCheck,
  Gauge,
  ChevronRight,
  Award,
} from "lucide-react";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MAP_COLORS = {
  land: "#f9fafb",
  landHover: "#f3f4f6",
  stroke: "#e5e7eb",
  markerInactive: "#74c69d",
  markerActive: "#2d6a4f",
  markerRing: "#40916c",
} as const;

export function LocatorMap() {
  const [region, setRegion] = useState<(typeof regions)[number]>("All Regions");
  const [activeId, setActiveId] = useState<string>(facilities[0].id);

  const filtered = useMemo(
    () =>
      region === "All Regions"
        ? facilities
        : facilities.filter((f) => f.region === region),
    [region],
  );

  const active: Facility | undefined =
    filtered.find((f) => f.id === activeId) ?? filtered[0];

  function handleRegionChange(next: (typeof regions)[number]) {
    setRegion(next);
    const nextFiltered =
      next === "All Regions"
        ? facilities
        : facilities.filter((f) => f.region === next);
    if (!nextFiltered.some((f) => f.id === activeId)) {
      setActiveId(nextFiltered[0]?.id ?? facilities[0].id);
    }
  }

  return (
    <section id="locations" className=" py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium tracking-wide text-sea-green">
            Location finder
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Explore data centers across the country
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Filter by region and select a facility to view power, space, tier,
            and compliance details before you request a quote.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {/* Region filters */}
          <div className="border-b border-border bg-muted/40 px-4 py-4 sm:px-6">
            <div
              className="flex gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Filter by region"
            >
              {regions.map((r) => {
                const isActive = region === r;
                return (
                  <button
                    key={r}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleRegionChange(r)}
                    className={`shrink-0 rounded-lg px-3.5 py-2 text-sm font-medium transition-all sm:px-4 ${
                      isActive
                        ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                        : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,280px)_1fr] xl:grid-cols-[minmax(0,300px)_1fr]">
            {/* Facility list sidebar */}
            <aside className="order-2 border-t border-border lg:order-1 lg:border-r lg:border-t-0">
              <div className="flex items-center justify-between border-b border-border px-4 py-3.5 sm:px-5">
                <h3 className="text-sm font-semibold text-foreground">
                  Facilities
                </h3>
                <span className="rounded-full bg-frosted-mint px-2.5 py-0.5 text-xs font-medium text-dark-emerald">
                  {filtered.length}
                </span>
              </div>
              <ul className="max-h-64 divide-y divide-border overflow-y-auto lg:max-h-[520px]">
                {filtered.map((f) => {
                  const isSelected = active?.id === f.id;
                  return (
                    <li key={f.id}>
                      <button
                        type="button"
                        onClick={() => setActiveId(f.id)}
                        className={`group flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors sm:px-5 ${
                          isSelected
                            ? "bg-frosted-mint/50"
                            : "hover:bg-muted/60"
                        }`}
                      >
                        <span
                          className={`mt-0.5 h-2 w-2 shrink-0 rounded-full transition-colors ${
                            isSelected
                              ? "bg-dark-emerald ring-4 ring-dark-emerald/15"
                              : "bg-celadon group-hover:bg-sea-green"
                          }`}
                          aria-hidden="true"
                        />
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block truncate text-sm font-medium ${
                              isSelected
                                ? "text-foreground"
                                : "text-foreground/90"
                            }`}
                          >
                            {f.name}
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                            {f.metro} · {f.provider}
                          </span>
                        </span>
                        <span className="flex shrink-0 flex-col items-end gap-0.5">
                          <span
                            className={`text-xs font-semibold tabular-nums ${
                              isSelected
                                ? "text-dark-emerald"
                                : "text-muted-foreground"
                            }`}
                          >
                            {f.powerMw} MW
                          </span>
                          <ChevronRight
                            className={`h-3.5 w-3.5 transition-opacity ${
                              isSelected
                                ? "text-dark-emerald opacity-100"
                                : "text-muted-foreground opacity-0 group-hover:opacity-60"
                            }`}
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Map + floating detail */}
            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-[5/3] w-full bg-gradient-to-b from-muted/30 to-muted/10 sm:aspect-[16/10] lg:aspect-auto lg:min-h-[520px]">
                <ComposableMap
                  projection="geoAlbersUsa"
                  projectionConfig={{ scale: 1000 }}
                  width={800}
                  height={500}
                  className="h-full w-full"
                  style={{ width: "100%", height: "100%" }}
                >
                  <Geographies geography={GEO_URL}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={MAP_COLORS.land}
                          stroke={MAP_COLORS.stroke}
                          strokeWidth={0.5}
                          style={{
                            default: { outline: "none" },
                            hover: {
                              fill: MAP_COLORS.landHover,
                              outline: "none",
                            },
                            pressed: { outline: "none" },
                          }}
                        />
                      ))
                    }
                  </Geographies>
                  {filtered.map((f) => {
                    const isActive = active?.id === f.id;
                    return (
                      <Marker
                        key={f.id}
                        coordinates={f.coordinates}
                        onClick={() => setActiveId(f.id)}
                        style={{ default: { cursor: "pointer" } }}
                      >
                        {isActive && (
                          <circle
                            r={18}
                            fill="none"
                            stroke={MAP_COLORS.markerRing}
                            strokeWidth={1.5}
                            opacity={0.3}
                          />
                        )}
                        <circle
                          r={isActive ? 8 : 5.5}
                          fill={
                            isActive
                              ? MAP_COLORS.markerActive
                              : MAP_COLORS.markerInactive
                          }
                          stroke="#ffffff"
                          strokeWidth={isActive ? 2.5 : 1.5}
                          opacity={isActive ? 1 : 0.85}
                        />
                      </Marker>
                    );
                  })}
                </ComposableMap>

                {/* Floating detail card — desktop */}
                {active && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden p-4 sm:p-5 lg:block">
                    <FacilityDetailCard
                      facility={active}
                      className="pointer-events-auto ml-auto max-w-sm shadow-lg"
                    />
                  </div>
                )}
              </div>

              {/* Detail card — mobile & tablet */}
              {active && (
                <div className="border-t border-border p-4 sm:p-5 lg:hidden">
                  <FacilityDetailCard facility={active} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FacilityDetailCard({
  facility,
  className = "",
}: {
  facility: Facility;
  className?: string;
}) {
  return (
    <article
      className={`rounded-xl border border-border bg-card/95 p-5 backdrop-blur-sm sm:p-6 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-snug text-foreground">
            {facility.name}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">
              {facility.metro} · {facility.provider}
            </span>
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-dark-emerald/20 bg-frosted-mint px-2.5 py-1 text-xs font-semibold text-dark-emerald">
          {facility.tier}
        </span>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
        <Spec
          icon={<Zap className="h-3.5 w-3.5" />}
          label="Power"
          value={`${facility.powerMw} MW`}
        />
        <Spec
          icon={<Building2 className="h-3.5 w-3.5" />}
          label="Space"
          value={facility.spaceSqft}
        />
        <Spec
          icon={<Gauge className="h-3.5 w-3.5" />}
          label="PUE"
          value={facility.pue.toFixed(2)}
        />
        <Spec
          icon={<ShieldCheck className="h-3.5 w-3.5" />}
          label="Region"
          value={facility.region}
        />
      </dl>

      <div className="mt-5 border-t border-border pt-4">
        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <Award className="h-3.5 w-3.5" aria-hidden="true" />
          Certifications
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {facility.certifications.map((c) => (
            <span
              key={c}
              className="rounded-md border border-border bg-muted/80 px-2 py-0.5 text-xs font-medium text-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <QuoteCtaButton className="mt-5 w-full" size="default">
        Request a quote for this facility
      </QuoteCtaButton>
    </article>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border/80 bg-muted/40 px-3 py-2.5">
      <dt className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        <span className="text-sea-green">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold tabular-nums text-foreground">
        {value}
      </dd>
    </div>
  );
}
