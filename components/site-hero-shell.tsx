import { Hero } from "@/components/hero";
import { NetworkGridBackground } from "@/components/network-grid-background";

export function SiteHeroShell() {
  return (
    <div
      id="top"
      className="relative -mt-16 flex min-h-dvh flex-col overflow-hidden "
    >
      <NetworkGridBackground className="pointer-events-none absolute inset-0 h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 82%, var(--background) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex min-h-dvh flex-col pt-16">
        <Hero />
      </div>
    </div>
  );
}
