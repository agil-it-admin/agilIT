"use client"

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react"

import { IntakeFormContent } from "@/components/intake-form"
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

type QuoteModalContextValue = {
  openQuoteModal: () => void
  closeQuoteModal: () => void
}

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null)

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)

  const openQuoteModal = useCallback(() => setOpen(true), [])
  const closeQuoteModal = useCallback(() => setOpen(false), [])

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) {
      setFormKey((key) => key + 1)
    }
  }

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal, closeQuoteModal }}>
      {children}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogPortal>
          <DialogBackdrop />
          <DialogViewport>
            <DialogPopup>
              <DialogHeader>
                <div>
                  <DialogTitle>Request a quote</DialogTitle>
                  <DialogDescription className="mt-1">
                    Answer four quick questions and an advisor returns matched
                    facilities within one business day.
                  </DialogDescription>
                </div>
                <DialogClose />
              </DialogHeader>
              <DialogBody>
                <IntakeFormContent key={formKey} />
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
