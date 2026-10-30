"use client"

import * as React from "react"
import {
  BuildingIcon,
  CheckIcon,
  CircleCheckIcon,
  ClockIcon,
  FileSignatureIcon,
  FileTextIcon,
  MapPinIcon,
  PencilIcon,
  TimerIcon,
  UploadIcon,
  WalletIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@sonojs/ui/components/attachment"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import { Progress } from "@sonojs/ui/components/progress"
import {
  RadioGroup,
  RadioGroupItem,
} from "@sonojs/ui/components/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Separator } from "@sonojs/ui/components/separator"
import { Spinner } from "@sonojs/ui/components/spinner"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/* Config                                                                      */
/* -------------------------------------------------------------------------- */

const POSTING = {
  company: "Meridian Labs",
  team: "Product Design",
  title: "Senior Product Designer",
  location: "Remote · EU time zones",
  type: "Full-time",
  band: "$110k – $145k",
  requisition: "DES-2041",
} as const

const STEPS = [
  { id: 1, label: "Personal", description: "Who you are" },
  { id: 2, label: "Experience", description: "Your background" },
  { id: 3, label: "Documents", description: "Resume and extras" },
  { id: 4, label: "Review", description: "Check and submit" },
] as const

type StepId = (typeof STEPS)[number]["id"]

const YEARS = [
  { value: "lt1", label: "Less than 1 year" },
  { value: "1-3", label: "1–3 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "5-8", label: "5–8 years" },
  { value: "8-12", label: "8–12 years" },
  { value: "12+", label: "12+ years" },
] as const

const EMPLOYMENT: ReadonlyArray<{
  value: "full-time" | "part-time" | "contract"
  label: string
  description: string
  icon: LucideIcon
}> = [
  {
    value: "full-time",
    label: "Full-time",
    description: "Around 40 hours a week",
    icon: ClockIcon,
  },
  {
    value: "part-time",
    label: "Part-time",
    description: "Reduced weekly hours",
    icon: TimerIcon,
  },
  {
    value: "contract",
    label: "Contract",
    description: "Fixed-term engagement",
    icon: FileSignatureIcon,
  },
]

type EmploymentId = (typeof EMPLOYMENT)[number]["value"]

const MAX_FILE_BYTES = 5 * 1024 * 1024
const PDF_TYPE = "application/pdf"
const MIN_EXPERIENCE_CHARS = 30
const MAX_SKILLS = 15

type FileKey = "resume" | "coverLetter" | "portfolioFile"

type FormData = {
  fullName: string
  email: string
  phone: string
  location: string
  linkedin: string
  portfolio: string
  jobTitle: string
  years: string
  employment: "" | EmploymentId
  salary: string
  skills: string
  experience: string
  resume: File | null
  coverLetter: File | null
  portfolioFile: File | null
  terms: boolean
}

type FieldKey = keyof FormData
type Errors = Partial<Record<FieldKey, string>>
type Status = "idle" | "loading" | "success"

const INITIAL: FormData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  portfolio: "",
  jobTitle: "",
  years: "",
  employment: "",
  salary: "",
  skills: "",
  experience: "",
  resume: null,
  coverLetter: null,
  portfolioFile: null,
  terms: false,
}

const FIELD_STEP: Record<FieldKey, StepId> = {
  fullName: 1,
  email: 1,
  phone: 1,
  location: 1,
  linkedin: 1,
  portfolio: 1,
  jobTitle: 2,
  years: 2,
  employment: 2,
  salary: 2,
  skills: 2,
  experience: 2,
  resume: 3,
  coverLetter: 3,
  portfolioFile: 3,
  terms: 4,
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function parseUrl(value: string): URL | null {
  const v = value.trim()
  if (!v || /\s/.test(v)) return null
  try {
    const url = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`)
    if (!url.hostname.includes(".")) return null
    return url
  } catch {
    return null
  }
}

function isLinkedIn(url: URL) {
  return url.hostname === "linkedin.com" || url.hostname.endsWith(".linkedin.com")
}

function parseSkills(value: string) {
  const seen = new Set<string>()
  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter((item) => {
      const key = item.toLowerCase()
      if (!item || seen.has(key)) return false
      seen.add(key)
      return true
    })
}

function parseSalary(value: string) {
  const digits = value.replace(/[,\s]/g, "")
  return /^\d+$/.test(digits) ? Number(digits) : NaN
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function checkFile(file: File): string | null {
  if (file.type !== PDF_TYPE) {
    return "Only PDF files are accepted."
  }
  if (file.size === 0) {
    return "That file is empty."
  }
  if (file.size > MAX_FILE_BYTES) {
    return `File is ${formatBytes(file.size)}. The limit is ${formatBytes(MAX_FILE_BYTES)}.`
  }
  return null
}

const salaryFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  const first = parts[0][0] ?? ""
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : ""
  return `${first}${last}`.toUpperCase()
}

function validate(data: FormData): Errors {
  const errors: Errors = {}

  // Step 1 — personal
  if (!data.fullName.trim()) {
    errors.fullName = "Enter your full name."
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = "Name looks too short."
  }

  if (!data.email.trim()) {
    errors.email = "Enter your email address."
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = "Enter a valid email address."
  }

  const phone = data.phone.trim()
  const phoneDigits = phone.replace(/\D/g, "")
  if (!phone) {
    errors.phone = "Enter a phone number."
  } else if (
    !/^\+?[\d\s().-]+$/.test(phone) ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 15
  ) {
    errors.phone = "Enter a valid phone number (7–15 digits)."
  }

  if (!data.location.trim()) {
    errors.location = "Tell us where you're based."
  }

  if (data.linkedin.trim()) {
    const url = parseUrl(data.linkedin)
    if (!url) errors.linkedin = "Enter a valid URL."
    else if (!isLinkedIn(url)) {
      errors.linkedin = "Use a linkedin.com profile link."
    }
  }

  if (data.portfolio.trim() && !parseUrl(data.portfolio)) {
    errors.portfolio = "Enter a valid URL, like https://yoursite.com."
  }

  // Step 2 — experience
  if (!data.jobTitle.trim()) {
    errors.jobTitle = "Enter your current or most recent job title."
  }
  if (!data.years) {
    errors.years = "Select your years of experience."
  }
  if (!data.employment) {
    errors.employment = "Choose an employment type."
  }

  if (!data.salary.trim()) {
    errors.salary = "Enter your expected annual salary."
  } else {
    const salary = parseSalary(data.salary)
    if (Number.isNaN(salary) || salary <= 0) {
      errors.salary = "Use numbers only, e.g. 90000."
    } else if (salary > 10_000_000) {
      errors.salary = "That amount looks too high."
    }
  }

  const skills = parseSkills(data.skills)
  if (skills.length === 0) {
    errors.skills = "Add at least one skill, then press Enter or comma."
  } else if (skills.length > MAX_SKILLS) {
    errors.skills = `List up to ${MAX_SKILLS} skills.`
  }

  if (data.experience.trim().length < MIN_EXPERIENCE_CHARS) {
    errors.experience = `Share a bit more — at least ${MIN_EXPERIENCE_CHARS} characters.`
  }

  // Step 3 — documents
  if (!data.resume) {
    errors.resume = "Upload your resume as a PDF."
  }

  // Step 4 — consent
  if (!data.terms) {
    errors.terms = "Please confirm before submitting."
  }

  return errors
}

function makeReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let code = ""
  for (let i = 0; i < 4; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return `JOB-${code}`
}

/* -------------------------------------------------------------------------- */
/* Small building blocks                                                       */
/* -------------------------------------------------------------------------- */

function RequiredMark() {
  return (
    <span className="text-destructive" aria-hidden>
      *
    </span>
  )
}

function OptionalMark() {
  return (
    <span className="font-normal text-muted-foreground">(optional)</span>
  )
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {children}
      </span>
      <span aria-hidden className="h-px flex-1 bg-border/70" />
    </div>
  )
}

type TextFieldProps = Omit<React.ComponentProps<"input">, "id"> & {
  id: string
  label: string
  required?: boolean
  optional?: boolean
  hint?: string
  error?: string
}

function TextField({
  id,
  label,
  required,
  optional,
  hint,
  error,
  ...inputProps
}: TextFieldProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={id}>
        {label} {required ? <RequiredMark /> : null}
        {optional ? <OptionalMark /> : null}
      </FieldLabel>
      <Input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...inputProps}
      />
      {error ? (
        <FieldError id={`${id}-error`}>{error}</FieldError>
      ) : hint ? (
        <FieldDescription id={`${id}-hint`}>{hint}</FieldDescription>
      ) : null}
    </Field>
  )
}

function FileChip({
  file,
  onRemove,
}: {
  file: File
  onRemove?: () => void
}) {
  return (
    <Attachment className="w-full flex-nowrap bg-card">
      <AttachmentMedia>
        <FileTextIcon aria-hidden />
      </AttachmentMedia>
      <AttachmentContent className="text-start">
        <AttachmentTitle>{file.name}</AttachmentTitle>
        <AttachmentDescription>
          PDF · {formatBytes(file.size)}
        </AttachmentDescription>
      </AttachmentContent>
      {onRemove ? (
        <AttachmentActions>
          <AttachmentAction
            type="button"
            aria-label={`Remove ${file.name}`}
            className="relative after:absolute after:-inset-1.5"
            onClick={onRemove}
          >
            <XIcon aria-hidden />
          </AttachmentAction>
        </AttachmentActions>
      ) : null}
    </Attachment>
  )
}

function DocumentField({
  id,
  label,
  description,
  required,
  large,
  file,
  error,
  disabled,
  onSelect,
  onRemove,
}: {
  id: string
  label: string
  description: string
  required?: boolean
  large?: boolean
  file: File | null
  error?: string
  disabled?: boolean
  onSelect: (file: File) => void
  onRemove: () => void
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)

  function pick(files: FileList | null) {
    const next = files?.[0]
    if (next) onSelect(next)
  }

  return (
    <Field data-invalid={error ? true : undefined} className="h-full">
      <div className="flex items-center justify-between gap-3">
        <FieldLabel htmlFor={`${id}-trigger`}>
          {label} {required ? <RequiredMark /> : null}
        </FieldLabel>
        <Badge variant={required ? "default" : "outline"}>
          {required ? "Required" : "Optional"}
        </Badge>
      </div>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={PDF_TYPE}
        hidden
        tabIndex={-1}
        disabled={disabled}
        onChange={(event) => {
          pick(event.target.files)
          // Allow choosing the same file again after removing it.
          event.target.value = ""
        }}
      />

      {file ? (
        <div className="flex flex-1 flex-col justify-center gap-2 rounded-[12px] border border-border bg-muted/30 p-3">
          <FileChip file={file} onRemove={disabled ? undefined : onRemove} />
        </div>
      ) : (
        <div
          onDragOver={(event) => {
            event.preventDefault()
            if (!disabled) setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault()
            setDragging(false)
            if (!disabled) pick(event.dataTransfer.files)
          }}
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-3 rounded-[12px] border-2 border-dashed border-border bg-muted/30 px-4 text-center transition-colors",
            large ? "py-12" : "py-8",
            dragging && "border-primary bg-primary/5",
            error && "border-destructive/60"
          )}
        >
          <span
            className={cn(
              "flex items-center justify-center rounded-full bg-background text-muted-foreground ring-1 ring-border/70",
              large ? "size-14" : "size-11"
            )}
          >
            <UploadIcon className={large ? "size-6" : "size-5"} aria-hidden />
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-foreground">
              Drag a PDF here
            </span>
            <span className="text-xs text-muted-foreground">
              or browse · PDF only · up to {formatBytes(MAX_FILE_BYTES)}
            </span>
          </div>
          <Button
            id={`${id}-trigger`}
            type="button"
            variant="outline"
            className="cursor-pointer"
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={`${id}-description${error ? ` ${id}-error` : ""}`}
            onClick={() => inputRef.current?.click()}
          >
            Choose file
          </Button>
        </div>
      )}

      <FieldDescription id={`${id}-description`}>{description}</FieldDescription>
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </Field>
  )
}

function SkillsInput({
  id,
  skills,
  error,
  disabled,
  onChange,
  onBlur,
}: {
  id: string
  skills: string[]
  error?: string
  disabled?: boolean
  onChange: (skills: string[]) => void
  onBlur: () => void
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [draft, setDraft] = React.useState("")
  const full = skills.length >= MAX_SKILLS

  function commit(raw: string) {
    const next = parseSkills([...skills, ...raw.split(/[,\n]/)].join(","))
    onChange(next.slice(0, MAX_SKILLS))
    setDraft("")
  }

  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={id}>
        Skills <RequiredMark />
      </FieldLabel>
      <div
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "flex min-h-[46px] cursor-text flex-wrap items-center gap-1.5 rounded-md border border-border/70 bg-background px-2 py-1.5 transition-colors focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/30",
          error && "border-destructive",
          disabled && "pointer-events-none opacity-60"
        )}
      >
        {skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="h-8 gap-1 overflow-visible ps-2.5 pe-1"
          >
            {skill}
            <button
              type="button"
              aria-label={`Remove ${skill}`}
              className="relative flex size-6 cursor-pointer items-center justify-center rounded-full after:absolute after:-inset-2 after:content-[''] text-muted-foreground outline-none transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
              onClick={(event) => {
                event.stopPropagation()
                onChange(skills.filter((item) => item !== skill))
                inputRef.current?.focus()
              }}
            >
              <XIcon className="size-3" aria-hidden />
            </button>
          </Badge>
        ))}
        <input
          ref={inputRef}
          id={id}
          name="skills"
          value={draft}
          disabled={disabled || full}
          placeholder={
            skills.length === 0
              ? "Figma, Design systems, Prototyping"
              : full
                ? ""
                : "Add another…"
          }
          aria-invalid={error ? true : undefined}
          aria-describedby={`${id}-hint`}
          className="min-w-32 flex-1 bg-transparent px-1 py-1 text-base outline-none placeholder:text-muted-foreground md:text-sm"
          onChange={(event) => {
            const value = event.target.value
            if (/[,\n]/.test(value)) commit(value)
            else setDraft(value)
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              // Never submit or advance the form from this input.
              event.preventDefault()
              if (draft.trim()) commit(draft)
            } else if (event.key === "Backspace" && !draft && skills.length) {
              onChange(skills.slice(0, -1))
            }
          }}
          onBlur={() => {
            if (draft.trim()) commit(draft)
            onBlur()
          }}
        />
      </div>
      {error ? (
        <FieldError id={`${id}-hint`}>{error}</FieldError>
      ) : (
        <FieldDescription id={`${id}-hint`}>
          Press Enter or comma to add a skill ({skills.length}/{MAX_SKILLS}).
        </FieldDescription>
      )}
    </Field>
  )
}

function DossierSection({
  index,
  title,
  step,
  onEdit,
  children,
}: {
  index: string
  title: string
  step: StepId
  onEdit: (step: StepId) => void
  children: React.ReactNode
}) {
  return (
    <section className="overflow-hidden rounded-[12px] border border-border/70 bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border/70 bg-muted/40 px-4 py-2">
        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
          <span className="font-mono text-muted-foreground">{index}</span>
          {title}
        </h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="-my-1.5 h-11 cursor-pointer"
          onClick={() => onEdit(step)}
        >
          <PencilIcon aria-hidden />
          Edit
          <span className="sr-only"> {title.toLowerCase()}</span>
        </Button>
      </div>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-4 p-4 text-sm sm:grid-cols-2">
        {children}
      </dl>
    </section>
  )
}

function ReviewItem({
  label,
  children,
  wide,
}: {
  label: string
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1", wide && "sm:col-span-2")}>
      <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="min-w-0 break-words font-medium">
        {children || (
          <span className="font-normal text-muted-foreground">Not provided</span>
        )}
      </dd>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Form                                                                        */
/* -------------------------------------------------------------------------- */

export default function JobApplicationForm({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const uid = React.useId()
  const cardRef = React.useRef<HTMLDivElement>(null)
  const formRef = React.useRef<HTMLFormElement>(null)
  const headingRef = React.useRef<HTMLHeadingElement>(null)
  const didMount = React.useRef(false)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const [step, setStep] = React.useState<StepId>(1)
  const [data, setData] = React.useState<FormData>(INITIAL)
  const [touched, setTouched] = React.useState<Partial<Record<FieldKey, boolean>>>({})
  const [attempted, setAttempted] = React.useState<Partial<Record<StepId, boolean>>>({})
  const [fileErrors, setFileErrors] = React.useState<Partial<Record<FileKey, string>>>({})
  const [status, setStatus] = React.useState<Status>("idle")
  const [reference, setReference] = React.useState("")
  const [receivedAt, setReceivedAt] = React.useState("")

  const errors = React.useMemo(() => validate(data), [data])
  const loading = status === "loading"
  const skills = React.useMemo(() => parseSkills(data.skills), [data.skills])

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  // Move focus to the step heading whenever the step changes.
  React.useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }
    headingRef.current?.focus({ preventScroll: true })
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [step, status])

  function set<K extends FieldKey>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  function touch(key: FieldKey) {
    setTouched((prev) => (prev[key] ? prev : { ...prev, [key]: true }))
  }

  function errorFor(key: FieldKey): string | undefined {
    if (key === "resume" || key === "coverLetter" || key === "portfolioFile") {
      const fileError = fileErrors[key]
      if (fileError) return fileError
    }
    const show = touched[key] || attempted[FIELD_STEP[key]]
    return show ? errors[key] : undefined
  }

  function bind(key: Exclude<FieldKey, FileKey | "terms" | "employment">) {
    return {
      id: `${uid}-${key}`,
      name: key,
      value: data[key] as string,
      error: errorFor(key),
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => set(key, event.target.value as never),
      onBlur: () => touch(key),
    }
  }

  function stepErrorKeys(target: StepId) {
    return (Object.keys(errors) as FieldKey[]).filter(
      (key) => FIELD_STEP[key] === target
    )
  }

  function focusFirstInvalid() {
    requestAnimationFrame(() => {
      const invalid = formRef.current?.querySelector<HTMLElement>(
        "[aria-invalid='true']"
      )
      if (!invalid) return
      if (invalid.getAttribute("role") === "radiogroup") {
        invalid.querySelector<HTMLElement>("[role='radio']")?.focus()
      } else {
        invalid.focus()
      }
    })
  }

  function goTo(target: StepId) {
    setStep(target)
  }

  function next() {
    setAttempted((prev) => ({ ...prev, [step]: true }))
    if (stepErrorKeys(step).length > 0) {
      focusFirstInvalid()
      return
    }
    if (step < 4) setStep((step + 1) as StepId)
  }

  function back() {
    if (step > 1) setStep((step - 1) as StepId)
  }

  function acceptFile(key: FileKey, file: File) {
    const problem = checkFile(file)
    if (problem) {
      setFileErrors((prev) => ({ ...prev, [key]: `${file.name}: ${problem}` }))
      set(key, null)
      return
    }
    setFileErrors((prev) => ({ ...prev, [key]: undefined }))
    set(key, file)
  }

  function removeFile(key: FileKey) {
    setFileErrors((prev) => ({ ...prev, [key]: undefined }))
    set(key, null)
    touch(key)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading) return

    if (step < 4) {
      next()
      return
    }

    setAttempted({ 1: true, 2: true, 3: true, 4: true })
    const invalidKeys = Object.keys(errors) as FieldKey[]
    if (invalidKeys.length > 0) {
      const firstStep = Math.min(
        ...invalidKeys.map((key) => FIELD_STEP[key])
      ) as StepId
      if (firstStep !== step) setStep(firstStep)
      focusFirstInvalid()
      return
    }

    setStatus("loading")
    timerRef.current = setTimeout(() => {
      setReference(makeReference())
      setReceivedAt(
        new Date().toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      )
      setStatus("success")
    }, 1600)
  }

  function handleReset() {
    setData(INITIAL)
    setTouched({})
    setAttempted({})
    setFileErrors({})
    setReference("")
    setReceivedAt("")
    setStep(1)
    setStatus("idle")
  }

  const headingId = `${uid}-heading`
  const success = status === "success"
  const progress = success ? 100 : (step / STEPS.length) * 100
  const currentStep = STEPS[step - 1]
  const employment = EMPLOYMENT.find((item) => item.value === data.employment)
  const yearsLabel = YEARS.find((item) => item.value === data.years)?.label
  const salaryValue = parseSalary(data.salary)
  const documentCount = [data.resume, data.coverLetter, data.portfolioFile].filter(
    Boolean
  ).length

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby={headingId}
      {...props}
    >
      <div
        ref={cardRef}
        className="mx-auto w-full max-w-5xl scroll-mt-6 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
      >
        {/* --------------------------- Job posting header --------------------------- */}
        <header className="flex flex-col gap-5 bg-muted/30 px-5 py-6 text-start sm:flex-row sm:items-start sm:justify-between sm:px-8">
          <div className="flex min-w-0 items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-[12px] border border-border/70 bg-background text-foreground">
              <BuildingIcon className="size-6" aria-hidden />
            </span>
            <div className="flex min-w-0 flex-col gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground">
                  {POSTING.company} · {POSTING.team}
                </p>
                <h1
                  id={headingId}
                  className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
                >
                  {POSTING.title}
                </h1>
              </div>
              <ul className="flex flex-wrap items-center gap-2">
                <li>
                  <Badge variant="outline" className="h-6 gap-1.5 px-2.5">
                    <MapPinIcon aria-hidden />
                    {POSTING.location}
                  </Badge>
                </li>
                <li>
                  <Badge variant="outline" className="h-6 gap-1.5 px-2.5">
                    <ClockIcon aria-hidden />
                    {POSTING.type}
                  </Badge>
                </li>
                <li>
                  <Badge variant="secondary" className="h-6 gap-1.5 px-2.5">
                    <WalletIcon aria-hidden />
                    {POSTING.band} / year
                  </Badge>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-1 text-xs text-muted-foreground sm:items-end sm:text-end">
            <span className="font-mono" dir="ltr">
              Req. {POSTING.requisition}
            </span>
            <span className="max-w-56 leading-5">
              Demo form — nothing is submitted or stored.
            </span>
          </div>
        </header>

        <Progress
          value={progress}
          aria-label={
            success
              ? "Application complete"
              : `Application progress, step ${step} of ${STEPS.length}`
          }
          className="h-1 rounded-none rtl:-scale-x-100"
        />

        {success ? (
          /* ------------------------------- Received ------------------------------- */
          <div
            role="status"
            className="flex flex-col gap-8 p-6 text-start sm:p-10 lg:flex-row"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CircleCheckIcon className="size-6" aria-hidden />
                </span>
                <div className="flex flex-col gap-1">
                  <h2
                    ref={headingRef}
                    tabIndex={-1}
                    className="text-xl font-semibold tracking-tight outline-none"
                  >
                    Application received
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Thanks, {data.fullName.trim().split(/\s+/)[0]}. This is a
                    simulated confirmation — nothing was submitted and no email
                    was sent to {data.email.trim()}.
                  </p>
                </div>
              </div>

              <dl className="divide-y divide-border/70 overflow-hidden rounded-[12px] border border-border/70 text-sm">
                {[
                  ["Reference", reference],
                  ["Position", `${POSTING.title} (${POSTING.requisition})`],
                  ["Candidate", data.fullName.trim()],
                  ["Documents", `${documentCount} attached`],
                  ["Received", receivedAt],
                ].map(([term, value]) => (
                  <div
                    key={term}
                    className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4"
                  >
                    <dt className="text-muted-foreground">{term}</dt>
                    <dd
                      dir={term === "Reference" ? "ltr" : undefined}
                      className={cn(
                        "min-w-0 break-words font-medium",
                        term === "Reference" &&
                          "font-mono text-base tracking-wider text-start"
                      )}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <Button
                type="button"
                variant="outline"
                className="cursor-pointer self-start"
                onClick={handleReset}
              >
                Start another demo application
              </Button>
            </div>

            <aside
              aria-label="What happens next"
              className="flex w-full flex-col gap-4 rounded-[12px] border border-border/70 bg-muted/30 p-5 lg:w-72"
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                What happens next
              </h3>
              <ol className="flex flex-col gap-4 text-sm">
                {[
                  ["Application review", "Within 5 business days"],
                  ["Recruiter screen", "30-minute intro call"],
                  ["Portfolio interview", "Panel with the design team"],
                ].map(([title, hint], index) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold">
                      {index + 1}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-medium">{title}</span>
                      <span className="text-xs text-muted-foreground">
                        {hint}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="text-xs leading-5 text-muted-foreground">
                Sample timeline for illustration only.
              </p>
            </aside>
          </div>
        ) : (
          <form
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-[232px_minmax(0,1fr)]"
          >
            {/* ------------------------------ Step rail ------------------------------ */}
            <nav
              aria-label="Application steps"
              className="border-b border-border/70 bg-muted/20 md:border-b-0 md:border-e"
            >
              {/* Mobile: compact horizontal progress */}
              <div className="flex flex-col gap-2 px-5 py-4 md:hidden">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="font-semibold">
                    Step {step} of {STEPS.length}
                  </span>
                  <span className="text-muted-foreground">
                    {currentStep.label}
                  </span>
                </div>
                <ol className="flex items-center gap-1.5">
                  {STEPS.map((item) => (
                    <li
                      key={item.id}
                      aria-current={step === item.id ? "step" : undefined}
                      className={cn(
                        "h-1.5 flex-1 rounded-full",
                        step >= item.id ? "bg-primary" : "bg-border"
                      )}
                    >
                      <span className="sr-only">
                        {item.label}
                        {step > item.id ? " (completed)" : ""}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Desktop: vertical rail */}
              <ol className="hidden flex-col p-6 md:flex">
                {STEPS.map((item, index) => {
                  const done = step > item.id
                  const current = step === item.id
                  const last = index === STEPS.length - 1
                  const body = (
                    <>
                      <span
                        className={cn(
                          "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                          (done || current) &&
                            "border-primary bg-primary text-primary-foreground",
                          current && "ring-4 ring-primary/15",
                          !done && !current &&
                            "border-border bg-card text-muted-foreground"
                        )}
                      >
                        {done ? (
                          <CheckIcon className="size-3.5" aria-hidden />
                        ) : (
                          item.id
                        )}
                      </span>
                      <span className="flex min-w-0 flex-col pt-0.5 text-start">
                        <span
                          className={cn(
                            "text-sm font-medium",
                            current ? "text-foreground" : "text-muted-foreground"
                          )}
                        >
                          {item.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      </span>
                    </>
                  )
                  return (
                    <li
                      key={item.id}
                      className={cn("relative", !last && "pb-8")}
                    >
                      {!last ? (
                        <span
                          aria-hidden
                          className={cn(
                            "absolute start-4 top-8 bottom-0 w-px -translate-x-1/2 rtl:translate-x-1/2",
                            done ? "bg-primary" : "bg-border"
                          )}
                        />
                      ) : null}
                      {done && !loading ? (
                        <button
                          type="button"
                          onClick={() => goTo(item.id)}
                          aria-label={`Go back to ${item.label}`}
                          className="flex w-full cursor-pointer items-start gap-3 rounded-md text-start outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                        >
                          {body}
                        </button>
                      ) : (
                        <span
                          aria-current={current ? "step" : undefined}
                          className="flex items-start gap-3"
                        >
                          {body}
                        </span>
                      )}
                    </li>
                  )
                })}
              </ol>
            </nav>

            {/* ------------------------------- Content ------------------------------- */}
            <div className="flex min-w-0 flex-col">
              <fieldset
                disabled={loading}
                className="flex min-w-0 flex-col gap-6 p-5 sm:p-8"
              >
                <legend className="sr-only">{currentStep.label}</legend>
                <div className="flex flex-col gap-1 text-start">
                  <span className="font-mono text-xs text-muted-foreground">
                    STEP {String(step).padStart(2, "0")} /{" "}
                    {String(STEPS.length).padStart(2, "0")}
                  </span>
                  <h2
                    ref={headingRef}
                    tabIndex={-1}
                    className="text-xl font-semibold tracking-tight outline-none"
                  >
                    {step === 1 && "Personal details"}
                    {step === 2 && "Experience"}
                    {step === 3 && "Documents"}
                    {step === 4 && "Review your application"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {step === 1 && "How can we reach you?"}
                    {step === 2 && "Tell us about your work so far."}
                    {step === 3 &&
                      "Upload your resume and anything else that helps."}
                    {step === 4 && "Check everything, then confirm to submit."}
                  </p>
                </div>

                {/* ------------------------- Step 1 — Personal ------------------------- */}
                {step === 1 ? (
                  <div className="flex flex-col gap-6">
                    <GroupLabel>Contact</GroupLabel>
                    <FieldGroup className="gap-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <TextField
                          label="Full name"
                          required
                          autoComplete="name"
                          placeholder="Alex Morgan"
                          {...bind("fullName")}
                        />
                        <TextField
                          label="Email"
                          required
                          type="email"
                          dir="ltr"
                          autoComplete="email"
                          placeholder="alex@example.com"
                          {...bind("email")}
                        />
                        <TextField
                          label="Phone"
                          required
                          type="tel"
                          dir="ltr"
                          autoComplete="tel"
                          placeholder="+1 555 010 2030"
                          {...bind("phone")}
                        />
                        <TextField
                          label="Location"
                          required
                          autoComplete="address-level2"
                          placeholder="Amsterdam, Netherlands"
                          {...bind("location")}
                        />
                      </div>
                    </FieldGroup>

                    <GroupLabel>Online presence</GroupLabel>
                    <FieldGroup className="gap-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <TextField
                          label="LinkedIn URL"
                          optional
                          type="url"
                          dir="ltr"
                          autoComplete="url"
                          placeholder="https://linkedin.com/in/alexmorgan"
                          {...bind("linkedin")}
                        />
                        <TextField
                          label="Portfolio URL"
                          optional
                          type="url"
                          dir="ltr"
                          placeholder="https://alexmorgan.design"
                          {...bind("portfolio")}
                        />
                      </div>
                    </FieldGroup>
                  </div>
                ) : null}

                {/* ------------------------ Step 2 — Experience ------------------------ */}
                {step === 2 ? (
                  <div className="flex flex-col gap-6">
                    <GroupLabel>Current role</GroupLabel>
                    <FieldGroup className="gap-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <TextField
                          label="Current job title"
                          required
                          autoComplete="organization-title"
                          placeholder="Product Designer"
                          {...bind("jobTitle")}
                        />
                        <Field
                          data-invalid={errorFor("years") ? true : undefined}
                        >
                          <FieldLabel htmlFor={`${uid}-years`}>
                            Years of experience <RequiredMark />
                          </FieldLabel>
                          <Select
                            value={data.years}
                            onValueChange={(value) => {
                              set("years", value)
                              touch("years")
                            }}
                          >
                            <SelectTrigger
                              id={`${uid}-years`}
                              className="w-full cursor-pointer"
                              aria-invalid={
                                errorFor("years") ? true : undefined
                              }
                              aria-describedby={
                                errorFor("years")
                                  ? `${uid}-years-error`
                                  : undefined
                              }
                            >
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                              {YEARS.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errorFor("years") ? (
                            <FieldError id={`${uid}-years-error`}>
                              {errorFor("years")}
                            </FieldError>
                          ) : null}
                        </Field>
                      </div>

                      <Field
                        data-invalid={errorFor("employment") ? true : undefined}
                      >
                        <FieldLabel id={`${uid}-employment-label`}>
                          Employment type <RequiredMark />
                        </FieldLabel>
                        <RadioGroup
                          value={data.employment}
                          onValueChange={(value) => {
                            set("employment", value as EmploymentId)
                            touch("employment")
                          }}
                          aria-labelledby={`${uid}-employment-label`}
                          aria-invalid={
                            errorFor("employment") ? true : undefined
                          }
                          aria-describedby={
                            errorFor("employment")
                              ? `${uid}-employment-error`
                              : undefined
                          }
                          className="grid grid-cols-1 gap-3 sm:grid-cols-3"
                        >
                          {EMPLOYMENT.map((item) => {
                            const inputId = `${uid}-employment-${item.value}`
                            const selected = data.employment === item.value
                            const Icon = item.icon
                            return (
                              <label
                                key={item.value}
                                htmlFor={inputId}
                                className={cn(
                                  "flex min-h-32 cursor-pointer flex-col justify-between gap-4 rounded-[12px] border border-border/70 bg-card p-4 text-start transition-colors hover:bg-muted/40 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40",
                                  selected &&
                                    "border-primary bg-primary/5 ring-2 ring-primary hover:bg-primary/5"
                                )}
                              >
                                <span className="flex items-start justify-between gap-2">
                                  <span
                                    className={cn(
                                      "flex size-10 items-center justify-center rounded-md",
                                      selected
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground"
                                    )}
                                  >
                                    <Icon className="size-5" aria-hidden />
                                  </span>
                                  <RadioGroupItem
                                    id={inputId}
                                    value={item.value}
                                    className="mt-0.5 cursor-pointer"
                                  />
                                </span>
                                <span className="flex flex-col gap-0.5">
                                  <span className="text-sm font-semibold">
                                    {item.label}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {item.description}
                                  </span>
                                </span>
                              </label>
                            )
                          })}
                        </RadioGroup>
                        {errorFor("employment") ? (
                          <FieldError id={`${uid}-employment-error`}>
                            {errorFor("employment")}
                          </FieldError>
                        ) : null}
                      </Field>
                    </FieldGroup>

                    <GroupLabel>Compensation and skills</GroupLabel>
                    <FieldGroup className="gap-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <TextField
                          label="Expected salary (USD / year)"
                          required
                          inputMode="numeric"
                          autoComplete="off"
                          placeholder="90,000"
                          hint={`Gross annual figure. Posted band: ${POSTING.band}.`}
                          {...bind("salary")}
                          onChange={(event) =>
                            set(
                              "salary",
                              event.target.value.replace(/[^\d,\s]/g, "")
                            )
                          }
                        />
                      </div>

                      <SkillsInput
                        id={`${uid}-skills`}
                        skills={skills}
                        error={errorFor("skills")}
                        disabled={loading}
                        onChange={(next) => set("skills", next.join(", "))}
                        onBlur={() => touch("skills")}
                      />

                      <Field
                        data-invalid={errorFor("experience") ? true : undefined}
                      >
                        <FieldLabel htmlFor={`${uid}-experience`}>
                          Previous work experience <RequiredMark />
                        </FieldLabel>
                        <Textarea
                          id={`${uid}-experience`}
                          name="experience"
                          rows={6}
                          placeholder="Roles, teams, and the work you're proudest of…"
                          value={data.experience}
                          aria-invalid={
                            errorFor("experience") ? true : undefined
                          }
                          aria-describedby={`${uid}-experience-hint`}
                          onChange={(event) =>
                            set("experience", event.target.value)
                          }
                          onBlur={() => touch("experience")}
                        />
                        <div
                          id={`${uid}-experience-hint`}
                          className="flex items-start justify-between gap-3"
                        >
                          {errorFor("experience") ? (
                            <FieldError>{errorFor("experience")}</FieldError>
                          ) : (
                            <FieldDescription>
                              Highlights are fine — no need to repeat your
                              resume.
                            </FieldDescription>
                          )}
                          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                            {data.experience.trim().length}
                          </span>
                        </div>
                      </Field>
                    </FieldGroup>
                  </div>
                ) : null}

                {/* ------------------------ Step 3 — Documents ------------------------ */}
                {step === 3 ? (
                  <div className="flex flex-col gap-6">
                    <DocumentField
                      id={`${uid}-resume`}
                      label="Resume"
                      required
                      large
                      description="PDF only, up to 5 MB."
                      file={data.resume}
                      error={errorFor("resume")}
                      disabled={loading}
                      onSelect={(file) => acceptFile("resume", file)}
                      onRemove={() => removeFile("resume")}
                    />
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <DocumentField
                        id={`${uid}-cover-letter`}
                        label="Cover letter"
                        description="A short note on why this role is a fit."
                        file={data.coverLetter}
                        error={errorFor("coverLetter")}
                        disabled={loading}
                        onSelect={(file) => acceptFile("coverLetter", file)}
                        onRemove={() => removeFile("coverLetter")}
                      />
                      <DocumentField
                        id={`${uid}-portfolio-file`}
                        label="Portfolio attachment"
                        description="Case studies or work samples exported as a PDF."
                        file={data.portfolioFile}
                        error={errorFor("portfolioFile")}
                        disabled={loading}
                        onSelect={(file) => acceptFile("portfolioFile", file)}
                        onRemove={() => removeFile("portfolioFile")}
                      />
                    </div>
                  </div>
                ) : null}

                {/* -------------------------- Step 4 — Review -------------------------- */}
                {step === 4 ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 rounded-[12px] border border-border/70 bg-muted/30 p-4">
                      <span
                        aria-hidden
                        className="flex size-14 shrink-0 items-center justify-center rounded-[12px] bg-primary text-lg font-semibold text-primary-foreground"
                      >
                        {initialsOf(data.fullName)}
                      </span>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                          Candidate dossier · {POSTING.requisition}
                        </span>
                        <span className="truncate text-lg font-semibold tracking-tight">
                          {data.fullName.trim() || "—"}
                        </span>
                        <span className="truncate text-sm text-muted-foreground">
                          {[data.jobTitle.trim(), yearsLabel]
                            .filter(Boolean)
                            .join(" · ")}
                        </span>
                      </div>
                    </div>

                    <DossierSection
                      index="01"
                      title="Personal"
                      step={1}
                      onEdit={goTo}
                    >
                      <ReviewItem label="Full name">
                        {data.fullName.trim()}
                      </ReviewItem>
                      <ReviewItem label="Email">{data.email.trim()}</ReviewItem>
                      <ReviewItem label="Phone">
                        <span dir="ltr" className="inline-block">
                          {data.phone.trim()}
                        </span>
                      </ReviewItem>
                      <ReviewItem label="Location">
                        {data.location.trim()}
                      </ReviewItem>
                      <ReviewItem label="LinkedIn">
                        {data.linkedin.trim()}
                      </ReviewItem>
                      <ReviewItem label="Portfolio">
                        {data.portfolio.trim()}
                      </ReviewItem>
                    </DossierSection>

                    <DossierSection
                      index="02"
                      title="Experience"
                      step={2}
                      onEdit={goTo}
                    >
                      <ReviewItem label="Job title">
                        {data.jobTitle.trim()}
                      </ReviewItem>
                      <ReviewItem label="Experience">{yearsLabel}</ReviewItem>
                      <ReviewItem label="Employment type">
                        {employment?.label}
                      </ReviewItem>
                      <ReviewItem label="Expected salary">
                        {Number.isNaN(salaryValue)
                          ? ""
                          : `${salaryFormat.format(salaryValue)} / year`}
                      </ReviewItem>
                      <ReviewItem label="Skills" wide>
                        {skills.length > 0 ? (
                          <span className="flex flex-wrap gap-1.5">
                            {skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </span>
                        ) : null}
                      </ReviewItem>
                      <ReviewItem label="Work experience" wide>
                        <span className="whitespace-pre-wrap font-normal">
                          {data.experience.trim()}
                        </span>
                      </ReviewItem>
                    </DossierSection>

                    <DossierSection
                      index="03"
                      title="Documents"
                      step={3}
                      onEdit={goTo}
                    >
                      <ReviewItem label="Resume" wide>
                        {data.resume ? <FileChip file={data.resume} /> : null}
                      </ReviewItem>
                      <ReviewItem label="Cover letter" wide>
                        {data.coverLetter ? (
                          <FileChip file={data.coverLetter} />
                        ) : null}
                      </ReviewItem>
                      <ReviewItem label="Portfolio attachment" wide>
                        {data.portfolioFile ? (
                          <FileChip file={data.portfolioFile} />
                        ) : null}
                      </ReviewItem>
                    </DossierSection>

                    <div className="rounded-[12px] border border-border/70 bg-muted/30 p-4">
                      <Field
                        orientation="horizontal"
                        data-invalid={errorFor("terms") ? true : undefined}
                        className="flex-wrap items-start"
                      >
                        <Checkbox
                          id={`${uid}-terms`}
                          checked={data.terms}
                          aria-invalid={errorFor("terms") ? true : undefined}
                          aria-describedby={
                            errorFor("terms")
                              ? `${uid}-terms-error`
                              : undefined
                          }
                          onCheckedChange={(checked) => {
                            set("terms", checked === true)
                            touch("terms")
                          }}
                          className="mt-0.5 cursor-pointer"
                        />
                        <FieldLabel
                          htmlFor={`${uid}-terms`}
                          className="min-w-0 flex-1 text-sm font-normal leading-relaxed text-muted-foreground"
                        >
                          I confirm the details above are accurate and agree to
                          the hiring privacy notice. This is a demo — nothing is
                          stored.
                        </FieldLabel>
                        {errorFor("terms") ? (
                          <FieldError
                            id={`${uid}-terms-error`}
                            className="basis-full"
                          >
                            {errorFor("terms")}
                          </FieldError>
                        ) : null}
                      </Field>
                    </div>
                  </div>
                ) : null}
              </fieldset>

              <Separator />

              <div className="flex flex-col-reverse gap-3 bg-muted/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  disabled={step === 1 || loading}
                  onClick={back}
                >
                  Back
                </Button>
                {step < 4 ? (
                  <Button
                    type="button"
                    className="cursor-pointer"
                    onClick={next}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="cursor-pointer"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner aria-hidden />
                        Submitting…
                      </>
                    ) : (
                      "Submit application"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
