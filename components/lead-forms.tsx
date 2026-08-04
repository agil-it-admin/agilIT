"use client"

import { useId, useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  CheckCircle2,
  FileUp,
  Loader2,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const inputClass =
  "mt-1.5 w-full rounded-[12px] border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/25"

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}: {
  id: string
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required ? null : (
          <span className="text-muted-foreground"> (optional)</span>
        )}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  )
}

function SuccessState({
  title,
  body,
  onReset,
}: {
  title: string
  body: string
  onReset: () => void
}) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-frosted-mint text-dark-emerald">
        <CheckCircle2 className="size-7" />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-muted-foreground">{body}</p>
      <Button variant="outline" className="mt-6" onClick={onReset}>
        Submit another
      </Button>
    </div>
  )
}

/** Talk to an advisor — contact + short brief */
export function AdvisorLeadForm({ className }: { className?: string }) {
  const formId = useId()
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle")
  const [data, setData] = useState({
    name: "",
    email: "",
    company: "",
    topic: "",
    details: "",
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!data.name.trim() || !data.email.trim() || !data.company.trim()) return
    setStatus("submitting")
    setTimeout(() => setStatus("done"), 1000)
  }

  if (status === "done") {
    return (
      <SuccessState
        title="Advisor request received"
        body={`Thanks, ${data.name.split(" ")[0] || "there"}. An advisor will reach out at ${data.email} within one business day.`}
        onReset={() => {
          setData({ name: "", email: "", company: "", topic: "", details: "" })
          setStatus("idle")
        }}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <Field
        id={`${formId}-name`}
        label="Full name"
        required
        value={data.name}
        onChange={(v) => setData((d) => ({ ...d, name: v }))}
        placeholder="Jordan Lee"
      />
      <Field
        id={`${formId}-email`}
        label="Work email"
        type="email"
        required
        value={data.email}
        onChange={(v) => setData((d) => ({ ...d, email: v }))}
        placeholder="jordan@company.com"
      />
      <Field
        id={`${formId}-company`}
        label="Company"
        required
        value={data.company}
        onChange={(v) => setData((d) => ({ ...d, company: v }))}
        placeholder="Acme Corp"
      />
      <div>
        <label
          htmlFor={`${formId}-topic`}
          className="block text-sm font-medium text-foreground"
        >
          What do you want to discuss?
        </label>
        <select
          id={`${formId}-topic`}
          value={data.topic}
          onChange={(e) => setData((d) => ({ ...d, topic: e.target.value }))}
          className={inputClass}
        >
          <option value="">Select a topic</option>
          <option value="new-deployment">New deployment / RFP</option>
          <option value="renewal">Renewal or expansion</option>
          <option value="hybrid">Hybrid / interconnect design</option>
          <option value="ai">AI / high-density capacity</option>
          <option value="other">Something else</option>
        </select>
      </div>
      <div>
        <label
          htmlFor={`${formId}-details`}
          className="block text-sm font-medium text-foreground"
        >
          Context <span className="text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id={`${formId}-details`}
          rows={3}
          value={data.details}
          onChange={(e) => setData((d) => ({ ...d, details: e.target.value }))}
          placeholder="Metros, power, timeline, compliance…"
          className={inputClass}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="mt-2 w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Talk to an advisor
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>
    </form>
  )
}

/** Request the pricing benchmark report */
export function ReportLeadForm({ className }: { className?: string }) {
  const formId = useId()
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle")
  const [data, setData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!data.name.trim() || !data.email.trim() || !data.company.trim()) return
    setStatus("submitting")
    setTimeout(() => setStatus("done"), 1000)
  }

  if (status === "done") {
    return (
      <SuccessState
        title="Report on the way"
        body={`We’ll email the 2026 Enterprise Colocation Pricing Benchmark Report to ${data.email} shortly.`}
        onReset={() => {
          setData({ name: "", email: "", company: "", role: "" })
          setStatus("idle")
        }}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <Field
        id={`${formId}-name`}
        label="Full name"
        required
        value={data.name}
        onChange={(v) => setData((d) => ({ ...d, name: v }))}
        placeholder="Jordan Lee"
      />
      <Field
        id={`${formId}-email`}
        label="Work email"
        type="email"
        required
        value={data.email}
        onChange={(v) => setData((d) => ({ ...d, email: v }))}
        placeholder="jordan@company.com"
      />
      <Field
        id={`${formId}-company`}
        label="Company"
        required
        value={data.company}
        onChange={(v) => setData((d) => ({ ...d, company: v }))}
        placeholder="Acme Corp"
      />
      <Field
        id={`${formId}-role`}
        label="Role"
        value={data.role}
        onChange={(v) => setData((d) => ({ ...d, role: v }))}
        placeholder="VP Infrastructure, Procurement…"
      />
      <p className="text-xs leading-relaxed text-muted-foreground">
        We’ll send the PDF to your work email. No spam — just the report and an
        optional follow-up from an advisor.
      </p>
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Request the report
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>
    </form>
  )
}

/** Free contract / MSA review with optional file upload */
export function ContractReviewLeadForm({ className }: { className?: string }) {
  const formId = useId()
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle")
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState({
    name: "",
    email: "",
    company: "",
    renewal: "",
    notes: "",
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!data.name.trim() || !data.email.trim() || !data.company.trim()) return
    setStatus("submitting")
    setTimeout(() => setStatus("done"), 1100)
  }

  if (status === "done") {
    return (
      <SuccessState
        title="Review request received"
        body={`Thanks, ${data.name.split(" ")[0] || "there"}. An advisor will review ${file ? file.name : "your contract details"} and follow up at ${data.email}.`}
        onReset={() => {
          setData({ name: "", email: "", company: "", renewal: "", notes: "" })
          setFile(null)
          setStatus("idle")
        }}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <Field
        id={`${formId}-name`}
        label="Full name"
        required
        value={data.name}
        onChange={(v) => setData((d) => ({ ...d, name: v }))}
        placeholder="Jordan Lee"
      />
      <Field
        id={`${formId}-email`}
        label="Work email"
        type="email"
        required
        value={data.email}
        onChange={(v) => setData((d) => ({ ...d, email: v }))}
        placeholder="jordan@company.com"
      />
      <Field
        id={`${formId}-company`}
        label="Company"
        required
        value={data.company}
        onChange={(v) => setData((d) => ({ ...d, company: v }))}
        placeholder="Acme Corp"
      />
      <Field
        id={`${formId}-renewal`}
        label="Renewal / notice date"
        type="date"
        value={data.renewal}
        onChange={(v) => setData((d) => ({ ...d, renewal: v }))}
      />

      <div>
        <p className="block text-sm font-medium text-foreground">
          Upload MSA or renewal notice{" "}
          <span className="text-muted-foreground">(optional)</span>
        </p>
        <label
          htmlFor={`${formId}-file`}
          className={cn(
            "mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] border border-dashed border-border bg-muted/40 px-4 py-6 text-center transition-colors hover:border-sea-green/40 hover:bg-frosted-mint/30",
            file && "border-sea-green/50 bg-frosted-mint/25",
          )}
        >
          <FileUp className="size-5 text-sea-green" />
          {file ? (
            <span className="flex items-center gap-2 text-sm font-medium text-evergreen">
              {file.name}
              <button
                type="button"
                className="inline-flex size-6 items-center justify-center rounded-full text-muted-foreground hover:bg-background hover:text-foreground"
                onClick={(e) => {
                  e.preventDefault()
                  setFile(null)
                }}
                aria-label="Remove file"
              >
                <X className="size-3.5" />
              </button>
            </span>
          ) : (
            <>
              <span className="text-sm font-medium text-evergreen">
                Drop a PDF or click to browse
              </span>
              <span className="text-xs text-muted-foreground">
                PDF, DOC, or DOCX · up to 20 MB
              </span>
            </>
          )}
          <input
            id={`${formId}-file`}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf"
            className="sr-only"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      <div>
        <label
          htmlFor={`${formId}-notes`}
          className="block text-sm font-medium text-foreground"
        >
          Anything we should focus on?{" "}
          <span className="text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id={`${formId}-notes`}
          rows={3}
          value={data.notes}
          onChange={(e) => setData((d) => ({ ...d, notes: e.target.value }))}
          placeholder="Escalators, power commits, early termination, co-term…"
          className={inputClass}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            Request free contract review
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>
    </form>
  )
}
