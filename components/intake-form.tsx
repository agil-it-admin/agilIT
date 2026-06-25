"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
} from "lucide-react"

type FormData = {
  service: string
  region: string
  power: string
  timeline: string
  name: string
  email: string
  company: string
  details: string
}

const initial: FormData = {
  service: "",
  region: "",
  power: "",
  timeline: "",
  name: "",
  email: "",
  company: "",
  details: "",
}

const serviceOptions = [
  "Colocation",
  "Hybrid Cloud",
  "Bare Metal",
  "Connectivity",
]
const regionOptions = [
  "West",
  "Southwest",
  "Midwest",
  "Southeast",
  "Northeast",
  "No preference",
]
const powerOptions = [
  "1–5 racks",
  "Half cage / 6–20 racks",
  "Private suite / 20+ racks",
  "1 MW+ / wholesale",
]
const timelineOptions = [
  "Immediately",
  "1–3 months",
  "3–6 months",
  "Just exploring",
]

const steps = ["Service", "Footprint", "Timeline", "Contact"]

export function IntakeForm() {
  return (
    <section id="intake" className="border-t border-border bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:px-8">
        <div className="lg:sticky lg:top-24">
          <span className="text-sm font-medium text-muted-foreground">
            Get matched
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Tell us what you need. We&apos;ll do the sourcing.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Answer four quick questions and a dedicated advisor returns two to
            four matched facilities within one business day. Always free, always
            vendor-neutral.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "No sales pressure—advice first",
              "Compliance-aware matching",
              "Negotiated pricing across our network",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-muted-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-foreground">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <IntakeFormContent className="rounded-xl border border-border bg-background p-6 text-foreground sm:p-8" />
      </div>
    </section>
  )
}

export function IntakeFormContent({ className }: { className?: string }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(initial)
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle")

  const update = (patch: Partial<FormData>) =>
    setData((d) => ({ ...d, ...patch }))

  const canContinue =
    (step === 0 && data.service) ||
    (step === 1 && data.region && data.power) ||
    (step === 2 && data.timeline) ||
    step === 3

  const contactValid =
    data.name.trim() && data.email.trim() && data.company.trim()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!contactValid) return
    setStatus("submitting")
    // Simulated submission (frontend-only mock)
    setTimeout(() => setStatus("done"), 1200)
  }

  return (
    <div className={className}>
          {status === "done" ? (
            <div className="flex flex-col items-center py-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border text-foreground">
                <CheckCircle2 className="h-8 w-8" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                Request received
              </h3>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Thanks, {data.name.split(" ")[0] || "there"}. An advisor will
                email {data.email || "you"} within one business day with matched
                facilities for your {data.service.toLowerCase() || "deployment"}.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setData(initial)
                  setStep(0)
                  setStatus("idle")
                }}
              >
                Submit another request
              </Button>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div className="flex items-center justify-between">
                {steps.map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                        i < step
                          ? "bg-primary text-primary-foreground"
                          : i === step
                            ? "bg-primary text-primary-foreground ring-4 ring-primary/15"
                            : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </span>
                    <span
                      className={`hidden text-sm font-medium sm:block ${
                        i <= step ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {label}
                    </span>
                    {i < steps.length - 1 && (
                      <span className="mx-1 hidden h-px w-6 bg-border sm:block lg:w-8" />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="mt-8">
                {step === 0 && (
                  <Fieldset
                    legend="Which service are you sourcing?"
                    help="Pick the model that best fits your workload."
                  >
                    <OptionGrid
                      options={serviceOptions}
                      value={data.service}
                      onChange={(v) => update({ service: v })}
                    />
                  </Fieldset>
                )}

                {step === 1 && (
                  <div className="space-y-8">
                    <Fieldset legend="Preferred region">
                      <OptionGrid
                        options={regionOptions}
                        value={data.region}
                        onChange={(v) => update({ region: v })}
                      />
                    </Fieldset>
                    <Fieldset legend="Approximate footprint">
                      <OptionGrid
                        options={powerOptions}
                        value={data.power}
                        onChange={(v) => update({ power: v })}
                      />
                    </Fieldset>
                  </div>
                )}

                {step === 2 && (
                  <Fieldset
                    legend="When do you need to deploy?"
                    help="This helps us prioritize available capacity."
                  >
                    <OptionGrid
                      options={timelineOptions}
                      value={data.timeline}
                      onChange={(v) => update({ timeline: v })}
                    />
                  </Fieldset>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <h3 className="text-base font-semibold text-foreground">
                      Where should we send your matches?
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Full name"
                        value={data.name}
                        onChange={(v) => update({ name: v })}
                        placeholder="Jordan Reyes"
                      />
                      <Field
                        label="Work email"
                        type="email"
                        value={data.email}
                        onChange={(v) => update({ email: v })}
                        placeholder="jordan@company.com"
                      />
                    </div>
                    <Field
                      label="Company"
                      value={data.company}
                      onChange={(v) => update({ company: v })}
                      placeholder="Acme Corp"
                    />
                    <div>
                      <label
                        htmlFor="details"
                        className="block text-sm font-medium text-foreground"
                      >
                        Anything else?{" "}
                        <span className="text-muted-foreground">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="details"
                        rows={3}
                        value={data.details}
                        onChange={(e) => update({ details: e.target.value })}
                        placeholder="Compliance needs, interconnects, redundancy requirements…"
                        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/25"
                      />
                    </div>
                  </div>
                )}

                {/* Controls */}
                <div className="mt-8 flex items-center justify-between gap-3">
                  {step > 0 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep((s) => s - 1)}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                  ) : (
                    <span />
                  )}

                  {step < steps.length - 1 ? (
                    <Button
                      type="button"
                      disabled={!canContinue}
                      onClick={() => setStep((s) => s + 1)}
                    >
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!contactValid || status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Get my matches
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </>
          )}
    </div>
  )
}

function Fieldset({
  legend,
  help,
  children,
}: {
  legend: string
  help?: string
  children: React.ReactNode
}) {
  return (
    <fieldset>
      <legend className="text-base font-semibold text-foreground">
        {legend}
      </legend>
      {help && <p className="mt-1 text-sm text-muted-foreground">{help}</p>}
      <div className="mt-4">{children}</div>
    </fieldset>
  )
}

function OptionGrid({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((opt) => {
        const selected = value === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
              selected
                ? "border-foreground bg-muted text-foreground ring-1 ring-foreground/10"
                : "border-input bg-background text-foreground hover:border-foreground/30"
            }`}
          >
            {opt}
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                selected
                  ? "border-foreground bg-foreground text-background"
                  : "border-muted-foreground/40"
              }`}
            >
              {selected && <Check className="h-3 w-3" />}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-")
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/25"
      />
    </div>
  )
}
