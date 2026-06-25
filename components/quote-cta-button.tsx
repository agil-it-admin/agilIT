"use client"

import { Button } from "@/components/ui/button"
import { useQuoteModal } from "@/components/quote-modal-provider"
import type { ComponentProps } from "react"

type QuoteCtaButtonProps = ComponentProps<typeof Button>

export function QuoteCtaButton({
  onClick,
  ...props
}: QuoteCtaButtonProps) {
  const { openQuoteModal } = useQuoteModal()

  return (
    <Button
      {...props}
      onClick={(event) => {
        openQuoteModal()
        onClick?.(event)
      }}
    />
  )
}
