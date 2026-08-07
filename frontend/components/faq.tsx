"use client"

import { useState } from "react"
import { defaultHomePage, type CmsFaq } from "@/lib/cms/site"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export function Faq({
  content = defaultHomePage.faq,
}: {
  content?: CmsFaq
}) {
  const [open, setOpen] = useState<number | null>(0)
  const faqs = content.items

  return (
    <section id="faq" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-frosted-mint/45 via-background to-background"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-16 h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(116,198,157,0.22),transparent_70%)] blur-2xl"
      />
      <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="text-center">
          <p className="text-sm font-medium text-sea-green">{content.eyebrow}</p>
          <h2 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-evergreen sm:text-5xl">
            {content.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-lg leading-relaxed text-pine-teal/75">
            {content.body}
          </p>
        </div>

        <div className="mt-14 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.question}
                className={cn(
                  "overflow-hidden rounded-[18px] border border-transparent bg-white/70 shadow-[0_18px_40px_-28px_rgba(8,28,21,0.35)] ring-1 ring-black/4 backdrop-blur-sm transition-shadow",
                  isOpen && "shadow-[0_24px_50px_-24px_rgba(8,28,21,0.4)]",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className="text-base font-semibold tracking-tight text-evergreen">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors",
                      isOpen
                        ? "bg-sea-green text-white"
                        : "bg-frosted-mint text-dark-emerald",
                    )}
                  >
                    {isOpen ? (
                      <Minus className="size-4" />
                    ) : (
                      <Plus className="size-4" />
                    )}
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-pretty leading-relaxed text-muted-foreground sm:px-6">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
