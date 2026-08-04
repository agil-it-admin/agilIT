"use client"

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react"

import {
  AdvisorLeadForm,
  ContractReviewLeadForm,
  ReportLeadForm,
} from "@/components/lead-forms"
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogViewport,
} from "@/components/ui/dialog"

export type QuoteIntent = "advisor" | "report" | "contract-review"

type QuoteModalContextValue = {
  openQuoteModal: (intent?: QuoteIntent) => void
  closeQuoteModal: () => void
}

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null)

const intentCopy: Record<
  QuoteIntent,
  { title: string; description: string }
> = {
  advisor: {
    title: "Talk to an advisor",
    description:
      "Share a bit about your footprint and an advisor will follow up within one business day — free and vendor-neutral.",
  },
  report: {
    title: "Request the report",
    description:
      "Get the 2026 Enterprise Colocation Pricing Benchmark Report delivered to your inbox.",
  },
  "contract-review": {
    title: "Request a free contract review",
    description:
      "Share your MSA or renewal notice. We’ll flag uplift risk, escalator exposure, and where a market check could reset leverage.",
  },
}

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [intent, setIntent] = useState<QuoteIntent>("advisor")
  const [formKey, setFormKey] = useState(0)

  const openQuoteModal = useCallback((nextIntent?: QuoteIntent) => {
    // onClick={openQuoteModal} passes a MouseEvent — ignore non-intent args
    const resolvedIntent =
      typeof nextIntent === "string" && nextIntent in intentCopy
        ? nextIntent
        : "advisor"
    setIntent(resolvedIntent)
    setOpen(true)
  }, [])

  const closeQuoteModal = useCallback(() => setOpen(false), [])

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) {
      setFormKey((key) => key + 1)
    }
  }

  const copy = intentCopy[intent] ?? intentCopy.advisor

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal, closeQuoteModal }}>
      {children}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogPortal>
          <DialogBackdrop />
          <DialogViewport>
            <DialogPopup className="sm:max-w-lg">
              <DialogHeader>
                <div>
                  <DialogTitle>{copy.title}</DialogTitle>
                  <DialogDescription className="mt-1">
                    {copy.description}
                  </DialogDescription>
                </div>
                <DialogClose />
              </DialogHeader>
              <DialogBody>
                {intent === "advisor" ? (
                  <AdvisorLeadForm key={`advisor-${formKey}`} />
                ) : null}
                {intent === "report" ? (
                  <ReportLeadForm key={`report-${formKey}`} />
                ) : null}
                {intent === "contract-review" ? (
                  <ContractReviewLeadForm key={`review-${formKey}`} />
                ) : null}
              </DialogBody>
            </DialogPopup>
          </DialogViewport>
        </DialogPortal>
      </Dialog>
    </QuoteModalContext.Provider>
  )
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext)
  if (!context) {
    throw new Error("useQuoteModal must be used within QuoteModalProvider")
  }
  return context
}
