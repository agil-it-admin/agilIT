import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ReactBitsHeader } from "@/components/floating-nav/react-bits-header"

export const metadata = {
  title: "Floating nav · React Bits–style header | agil.IT",
  description:
    "A floating glass navbar inspired by reactbits.dev — shrinks on scroll, sliding link highlight, animated CTA.",
}

export default function FloatingNavPage() {
  return (
    <div className="min-h-[220vh] bg-[#0a120e] text-frosted-mint">
      <ReactBitsHeader activeHref="/floating-nav" />

      <main className="relative mx-auto max-w-3xl px-4 pt-36 pb-24 sm:px-6 lg:pt-44">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 font-sans text-xs tracking-wide text-mint-leaf/80 uppercase transition-colors hover:text-mint-leaf"
        >
          <ArrowLeft className="size-3.5" />
          Back to site
        </Link>

        <p className="font-sans text-xs tracking-[0.14em] text-mint-leaf uppercase">
          Header demo
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Floating glass nav
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-celadon/90 sm:text-lg">
          Patterned after the{" "}
          <a
            href="https://reactbits.dev/"
            target="_blank"
            rel="noreferrer"
            className="text-mint-leaf underline underline-offset-2 hover:text-white"
          >
            React Bits
          </a>{" "}
          landing header: fixed floating bar, glass blur after scroll, sliding
          pill highlight on nav links, animated CTA, and a compact mobile menu.
        </p>

        <ul className="mt-10 space-y-3 border-t border-white/10 pt-8 font-sans text-sm text-white/70">
          <li className="flex gap-3">
            <span className="text-mint-leaf">01</span>
            Scroll past ~50px — the bar shrinks and gains frosted glass.
          </li>
          <li className="flex gap-3">
            <span className="text-mint-leaf">02</span>
            Hover desktop links — the highlight pill slides to follow.
          </li>
          <li className="flex gap-3">
            <span className="text-mint-leaf">03</span>
            Narrow the viewport — hamburger opens a glass dropdown.
          </li>
        </ul>

        <div className="mt-16 space-y-6 text-sm leading-relaxed text-white/45">
          <p>
            Keep scrolling to feel the scrolled glass state. Content below is
            spacer only.
          </p>
          {Array.from({ length: 8 }).map((_, i) => (
            <p key={i}>
              Section {i + 1} — colo matching, power density, cross-connects,
              and compliance gates across the network. Same dark field React
              Bits uses so the floating header can read clearly.
            </p>
          ))}
        </div>
      </main>
    </div>
  )
}
