"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowLeft } from "lucide-react";
import {
  COBE_MINIMAL_STYLES,
  type CobeStyle,
} from "@/components/globe-examples/cobe-markers";

const CobeMarkersGlobe = dynamic(
  () =>
    import("@/components/globe-examples/cobe-markers").then(
      (m) => m.CobeMarkersGlobe,
    ),
  { ssr: false, loading: () => <GlobeSkeleton /> },
);

const CobeStyleGlobe = dynamic(
  () =>
    import("@/components/globe-examples/cobe-markers").then(
      (m) => m.CobeStyleGlobe,
    ),
  { ssr: false, loading: () => <GlobeSkeleton compact /> },
);

const CobeArcsGlobe = dynamic(
  () =>
    import("@/components/globe-examples/cobe-arcs").then((m) => m.CobeArcsGlobe),
  { ssr: false, loading: () => <GlobeSkeleton /> },
);

const GlobeGlArcs = dynamic(
  () =>
    import("@/components/globe-examples/globe-gl-arcs").then(
      (m) => m.GlobeGlArcs,
    ),
  { ssr: false, loading: () => <GlobeSkeleton dark={false} /> },
);

const GlobeGlNight = dynamic(
  () =>
    import("@/components/globe-examples/globe-gl-night").then(
      (m) => m.GlobeGlNight,
    ),
  { ssr: false, loading: () => <GlobeSkeleton dark /> },
);

function GlobeSkeleton({
  dark = false,
  compact = false,
}: {
  dark?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex w-full items-center justify-center ${
        compact ? "aspect-square max-h-[320px]" : "aspect-square max-h-[560px]"
      } ${
        dark ? "bg-[#060f0c] text-mint-leaf" : "bg-muted text-muted-foreground"
      }`}
    >
      <p className="text-sm">Loading globe…</p>
    </div>
  );
}

type Example = {
  id: string;
  library: string;
  title: string;
  blurb: string;
  sizeNote: string;
  bestFor: string;
  Component: ComponentType;
  dark?: boolean;
};

const examples: Example[] = [
  {
    id: "cobe-markers",
    library: "cobe",
    title: "Markers + auto-rotate",
    blurb:
      "Tiny WebGL particle globe (~5KB). Facility pins from lib/data. Fastest option if you only need spin + dots.",
    sizeNote: "~5KB · zero deps",
    bestFor: "Hero accents, marketing pages",
    Component: CobeMarkersGlobe,
  },
  {
    id: "cobe-minimal",
    library: "cobe · styles",
    title: "Minimalist styles",
    blurb:
      "Quiet palette and density variations of the same markers globe — pick a look without changing libraries.",
    sizeNote: "~5KB · same engine",
    bestFor: "Brand-neutral heroes, editorial layouts",
    Component: CobeMinimalGallery,
  },
  {
    id: "cobe-arcs",
    library: "cobe v2",
    title: "Arcs + CSS-anchored labels",
    blurb:
      "Same lightweight engine with connection arcs and DOM labels pinned via CSS anchor positioning (when the browser supports it).",
    sizeNote: "~5KB · arcs built-in",
    bestFor: "Closest lightweight match to the fintech look",
    Component: CobeArcsGlobe,
  },
  {
    id: "globe-gl-arcs",
    library: "react-globe.gl",
    title: "Arcs, rings & HTML popovers",
    blurb:
      "Full Three.js stack: dashed animated arcs, pulse rings, blue-marble texture, and HTML labels. Closest to the screenshot.",
    sizeNote: "Heavier · three + globe.gl",
    bestFor: "Product demos, interactive network maps",
    Component: GlobeGlArcs,
  },
  {
    id: "globe-gl-night",
    library: "react-globe.gl",
    title: "Night earth + pulse rings",
    blurb:
      "Dark night texture with mint rings at every facility. Strong “global network” vibe; drag to orbit.",
    sizeNote: "Heavier · three + globe.gl",
    bestFor: "Dark sections, ops / status dashboards",
    Component: GlobeGlNight,
    dark: true,
  },
];

function CobeMinimalGallery() {
  return (
    <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
      {COBE_MINIMAL_STYLES.map((style) => (
        <MinimalCard key={style.id} style={style} />
      ))}
    </div>
  );
}

function MinimalCard({ style }: { style: CobeStyle }) {
  return (
    <article className={`${style.panelClassName} p-4 sm:p-5`}>
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-evergreen">{style.name}</h3>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
          {style.blurb}
        </p>
      </div>
      <div className="flex justify-center">
        <CobeStyleGlobe
          style={{ ...style, size: style.size ?? 280 }}
          className="aspect-square w-full max-w-[280px]"
        />
      </div>
      <p className="mt-3 font-mono text-[10px] text-muted-foreground">
        samples {style.options.mapSamples} · bright{" "}
        {style.options.mapBrightness} · dark {style.options.dark}
      </p>
    </article>
  );
}

export default function GlobeExamplesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div>
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              Back to site
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight text-evergreen sm:text-3xl">
              3D globe examples
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Side-by-side demos of libraries that can produce a rotating Earth
              with markers and arcs — wired to your facility coordinates.
            </p>
          </div>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 pb-4 sm:px-6">
          {examples.map((ex) => (
            <a
              key={ex.id}
              href={`#${ex.id}`}
              className="shrink-0 rounded-full border border-dark-emerald/20 bg-frosted-mint px-3 py-1 text-xs font-semibold text-dark-emerald transition-colors hover:bg-celadon"
            >
              {ex.title}
            </a>
          ))}
        </nav>
      </header>

      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 py-10 sm:px-6 sm:py-14">
        {examples.map((ex) => (
          <section
            key={ex.id}
            id={ex.id}
            className="scroll-mt-8 border-b border-border pb-16 last:border-0 last:pb-0"
          >
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-sea-green">
                  {ex.library}
                </p>
                <h2 className="mt-1 text-xl font-semibold text-evergreen">
                  {ex.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {ex.blurb}
                </p>
              </div>
              <dl className="flex flex-col gap-1 text-right text-xs text-muted-foreground">
                <div>
                  <dt className="inline font-medium text-foreground">Bundle: </dt>
                  <dd className="inline">{ex.sizeNote}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-foreground">Best for: </dt>
                  <dd className="inline">{ex.bestFor}</dd>
                </div>
              </dl>
            </div>

            <div
              className={`overflow-hidden border border-border ${
                ex.id === "cobe-minimal"
                  ? ""
                  : ex.dark
                    ? "bg-[#060f0c]"
                    : "bg-muted/40"
              }`}
            >
              <ex.Component />
            </div>
          </section>
        ))}

        <aside className="rounded-none border border-border bg-muted/50 p-5 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Notes</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              All demos are client-only (<code className="text-xs">ssr: false</code>)
              because WebGL is unavailable on the server.
            </li>
            <li>
              Marker coordinates come from{" "}
              <code className="text-xs">lib/data.ts</code> facilities (
              <code className="text-xs">[lng, lat]</code> → converted where needed).
            </li>
            <li>
              Minimalist styles only change cobe options (
              <code className="text-xs">baseColor</code>,{" "}
              <code className="text-xs">mapSamples</code>,{" "}
              <code className="text-xs">glowColor</code>, etc.) — same component.
            </li>
            <li>
              CSS-anchored labels in the cobe arcs demo need a browser with{" "}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning"
                className="text-sea-green underline underline-offset-2"
                target="_blank"
                rel="noreferrer"
              >
                CSS anchor positioning
              </a>
              ; the globe still rotates without it.
            </li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
