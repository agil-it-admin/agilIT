"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { team } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useQuoteModal } from "@/components/quote-modal-provider"

export function Team() {
  const { openQuoteModal } = useQuoteModal()

  return (
    <section id="team" className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(183,228,199,0.35),transparent_55%),radial-gradient(ellipse_50%_40%_at_10%_90%,rgba(216,243,220,0.45),transparent_50%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div className="max-w-lg">
          <p className="text-sm font-medium text-sea-green">Our team</p>
          <h2 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            Advisors who know the market
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-pine-teal/80">
            Seasoned infrastructure specialists who help you navigate
            colocation, cloud, and connectivity decisions with clarity.
          </p>
          <button
            type="button"
            onClick={openQuoteModal}
            className="group/cta mt-9 inline-flex items-center gap-2 text-sm font-semibold text-sea-green transition-colors hover:text-dark-emerald"
          >
            Talk to an advisor
            <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
          </button>
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {team.map((member, i) => (
            <li
              key={member.id}
              className={cn("group", i === 1 && "mt-10 sm:mt-14 lg:mt-16")}
            >
              <div className="relative aspect-3/4 overflow-hidden rounded-[18px] bg-muted shadow-[0_24px_60px_-28px_rgba(8,28,21,0.45)] ring-1 ring-black/4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 45vw, 280px"
                />
              </div>
              <div className="mt-4 px-0.5">
                <h3 className="font-semibold tracking-tight text-evergreen">
                  {member.name}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {member.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
