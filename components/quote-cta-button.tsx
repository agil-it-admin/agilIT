"use client"

import { Button } from "@/components/ui/button"
import {
  useQuoteModal,
  type QuoteIntent,
} from "@/components/quote-modal-provider"
import type { ComponentProps } from "react"

type QuoteCtaButtonProps = ComponentProps<typeof Button> & {
  intent?: QuoteIntent
}

export function QuoteCtaButton({
  onClick,
  intent = "advisor",
  ...props
}: QuoteCtaButtonProps) {
  const { openQuoteModal } = useQuoteModal()

  return (
    <Button
      {...props}
      onClick={(event) => {
        openQuoteModal(intent)
        onClick?.(event)
      }}
    />
  )
}
