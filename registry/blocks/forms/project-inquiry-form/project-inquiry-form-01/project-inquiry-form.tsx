"use client"

import * as React from "react"
import {
  ArrowRightIcon,
  CheckIcon,
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  LightbulbIcon,
  LoaderCircleIcon,
  MailIcon,
  PaletteIcon,
  PencilIcon,
  PhoneIcon,
  RotateCcwIcon,
  ShapesIcon,
  ShoppingCartIcon,
  SmartphoneIcon,
  UploadIcon,
  VideoIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
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
import { RadioGroup, RadioGroupItem } from "@sonojs/ui/components/radio-group"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/* Sample data                                                                */
/* -------------------------------------------------------------------------- */

type ExtraConfig =
  | {
      kind: "choice"
      label: string
      description: string
      options: readonly string[]
    }
  | {
      kind: "number"
      label: string
      description: string
      placeholder: string
      min: number
      max: number
    }
  | {
      kind: "text"
      label: string
      description: string
      placeholder: string
      min: number
      max: number
    }

const PROJECT_TYPES: ReadonlyArray<{
  id: string
  label: string
  description: string
  icon: LucideIcon
  extra: ExtraConfig
}> = [
  {
    id: "website",
    label: "Website Development",
    description: "Marketing sites, portals and web apps.",
    icon: GlobeIcon,
    extra: {
      kind: "number",
      label: "Estimated page count",
      description: "A rough number is fine — templates count once.",
      placeholder: "12",
      min: 1,
      max: 500,
    },
  },
  {
    id: "mobile",
    label: "Mobile Application",
    description: "Native or cross-platform apps.",
    icon: SmartphoneIcon,
    extra: {
      kind: "choice",
      label: "Target platform",
      description: "Which platforms should launch first?",
      options: ["iOS", "Android", "iOS & Android"],
    },
  },
  {
    id: "design",
    label: "UI/UX Design",
    description: "Research, flows, prototypes and systems.",
    icon: PaletteIcon,
    extra: {
      kind: "number",
      label: "Approximate screen count",
      description: "Include states you expect to design (empty, error…).",
      placeholder: "30",
      min: 1,
      max: 500,
    },
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    description: "Storefronts, checkout and catalogs.",
    icon: ShoppingCartIcon,
    extra: {
      kind: "choice",
      label: "Commerce platform",
      description: "Pick what you use today, or what you're leaning toward.",
      options: ["Shopify", "WooCommerce", "Headless / custom", "Not sure yet"],
    },
  },
  {
    id: "consulting",
    label: "Consulting",
    description: "Audits, architecture and team advice.",
    icon: LightbulbIcon,
    extra: {
      kind: "choice",
      label: "Focus area",
      description: "Where do you want the most help?",
      options: [
        "Architecture review",
        "Performance",
        "Accessibility",
        "Team augmentation",
      ],
    },
  },
  {
    id: "other",
    label: "Other",
    description: "Something that doesn't fit above.",
    icon: ShapesIcon,
    extra: {
      kind: "text",
      label: "What kind of project is it?",
      description: "A few words is enough — you can expand below.",
      placeholder: "Internal tooling, data pipeline…",
      min: 3,
      max: 80,
    },
  },
]

const BUDGETS = [
  { id: "lt-5k", label: "Under $5k", hint: "Small scoped work" },
  { id: "5-15k", label: "$5k – $15k", hint: "Focused project" },
  { id: "15-40k", label: "$15k – $40k", hint: "Full build" },
  { id: "40-100k", label: "$40k – $100k", hint: "Multi-phase" },
  { id: "100k+", label: "$100k+", hint: "Long-term partnership" },
  { id: "unsure", label: "Not sure yet", hint: "Help me scope it" },
] as const

const TIMELINES = [
  { id: "asap", label: "ASAP", hint: "Within a month" },
  { id: "1-3", label: "1–3 months", hint: "Near term" },
  { id: "3-6", label: "3–6 months", hint: "Planned launch" },
  { id: "6+", label: "6+ months", hint: "Longer horizon" },
  { id: "flexible", label: "Flexible", hint: "No fixed date" },
] as const

const FEATURES = [
  "User accounts & authentication",
  "Payments & subscriptions",
  "Admin dashboard",
  "Content management (CMS)",
  "Analytics & reporting",
  "Third-party integrations / API",
  "Multi-language & RTL support",
  "Accessibility (WCAG AA)",
] as const

const CONTACT_METHODS = [
  {
    id: "email",
    label: "Email",
    hint: "Reply within 1 business day",
    icon: MailIcon,
  },
  {
    id: "phone",
    label: "Phone call",
    hint: "We'll call at a time you choose",
    icon: PhoneIcon,
  },
  {
    id: "video",
    label: "Video call",
    hint: "30-minute intro session",
    icon: VideoIcon,
  },
] as const

const LIMITS = {
  descriptionMin: 40,
  descriptionMax: 1000,
  maxFiles: 5,
  maxFileBytes: 5 * 1024 * 1024,
  accept: ".pdf,.png,.jpg,.jpeg,.webp",
}

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
])

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

type FormErrors = Partial<
  Record<
    | "name"
    | "email"
    | "company"
    | "website"
    | "type"
    | "extra"
    | "budget"
    | "timeline"
    | "description"
    | "phone"
    | "consent",
    string
  >
>

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fileKey(file: File) {
  return `${file.name}:${file.size}:${file.lastModified}`
}

function isAcceptedFile(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? ""
  return (
    ["pdf", "png", "jpg", "jpeg", "webp"].includes(ext) &&
    (file.type === "" ||
      file.type === "application/pdf" ||
      file.type.startsWith("image/"))
  )
}

function isImage(file: File) {
  return file.type.startsWith("image/")
}

function parseWebsite(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return null
  try {
    const url = new URL(
      /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
    )
    if (!url.hostname.includes(".") || url.hostname.endsWith(".")) return false
    return true
  } catch {
    return false
  }
}

function Required() {
  return (
    <span className="text-destructive" aria-hidden>
      *
    </span>
  )
}

/** Editorial section: small title rail on the start edge, fields on the end. */
function Section({
  id,
  title,
  hint,
  children,
}: {
  id: string
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div
      role="group"
      aria-labelledby={id}
      className="grid grid-cols-1 gap-5 border-t border-border/70 py-10 first:border-t-0 first:pt-0 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12"
    >
      <div className="text-start">
        <h2 id={id} className="text-base font-semibold tracking-tight">
          {title}
        </h2>
        {hint ? (
          <p className="mt-1 text-pretty text-sm leading-6 text-muted-foreground">
            {hint}
          </p>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-col gap-5">{children}</div>
    </div>
  )
}

function DocLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
      {children}
    </h3>
  )
}

const focusWithin =
  "has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/40"

/** Visually hidden control that still receives focus + clicks inside its label. */
const hiddenControl = "absolute inset-0 size-full rounded-[inherit] opacity-0"

/* -------------------------------------------------------------------------- */
/* Block                                                                      */
/* -------------------------------------------------------------------------- */

export default function ProjectInquiryForm({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const uid = React.useId()
  const id = (name: string) => `${uid}-${name}`

  const formRef = React.useRef<HTMLFormElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const topRef = React.useRef<HTMLDivElement>(null)

  const [stage, setStage] = React.useState<"edit" | "review">("edit")

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [company, setCompany] = React.useState("")
  const [website, setWebsite] = React.useState("")
  const [typeId, setTypeId] = React.useState("")
  const [extra, setExtra] = React.useState("")
  const [budget, setBudget] = React.useState("")
  const [timeline, setTimeline] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [features, setFeatures] = React.useState<string[]>([])
  const [files, setFiles] = React.useState<File[]>([])
  const [fileIssues, setFileIssues] = React.useState<string[]>([])
  const [dragging, setDragging] = React.useState(false)
  const [contact, setContact] = React.useState<string>("email")
  const [phone, setPhone] = React.useState("")
  const [consent, setConsent] = React.useState(false)

  const [attempted, setAttempted] = React.useState(false)
  const [consentAttempted, setConsentAttempted] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [reference, setReference] = React.useState<string | null>(null)

  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  const type = PROJECT_TYPES.find((t) => t.id === typeId)
  const budgetItem = BUDGETS.find((b) => b.id === budget)
  const budgetIndex = BUDGETS.findIndex((b) => b.id === budget)
  const timelineItem = TIMELINES.find((t) => t.id === timeline)
  const contactItem = CONTACT_METHODS.find((c) => c.id === contact)

  /* Validation -------------------------------------------------------------- */

  const errors = React.useMemo<FormErrors>(() => {
    const next: FormErrors = {}
    if (name.trim().length < 2) next.name = "Enter your full name."

    const mail = email.trim().toLowerCase()
    if (!EMAIL_RE.test(mail)) next.email = "Enter a valid email address."
    else if (FREE_EMAIL_DOMAINS.has(mail.split("@")[1]))
      next.email = "Please use your work email so we can verify your company."

    if (company.trim().length < 2) next.company = "Enter your company name."

    const site = parseWebsite(website)
    if (site === false)
      next.website = "Enter a valid website, e.g. https://acme.com."

    if (!type) next.type = "Choose the type of project."
    else {
      const cfg = type.extra
      const value = extra.trim()
      if (cfg.kind === "choice" && !value)
        next.extra = `Select an option for “${cfg.label}”.`
      if (cfg.kind === "number") {
        const n = Number(value)
        if (!value || !Number.isInteger(n) || n < cfg.min || n > cfg.max)
          next.extra = `Enter a whole number between ${cfg.min} and ${cfg.max}.`
      }
      if (
        cfg.kind === "text" &&
        (value.length < cfg.min || value.length > cfg.max)
      )
        next.extra = `Use ${cfg.min}–${cfg.max} characters.`
    }

    if (!budget) next.budget = "Select a budget range."
    if (!timeline) next.timeline = "Select a timeline."

    const len = description.trim().length
    if (len < LIMITS.descriptionMin)
      next.description = `Add at least ${LIMITS.descriptionMin} characters (${LIMITS.descriptionMin - len} to go).`
    else if (description.length > LIMITS.descriptionMax)
      next.description = `Keep it under ${LIMITS.descriptionMax} characters.`

    if (contact === "phone") {
      const digits = phone.replace(/\D/g, "")
      if (digits.length < 7 || digits.length > 15)
        next.phone = "Enter a valid phone number (7–15 digits)."
    }
    return next
  }, [
    name,
    email,
    company,
    website,
    type,
    extra,
    budget,
    timeline,
    description,
    contact,
    phone,
  ])

  const hasErrors = Object.values(errors).some(Boolean)
  const show = (key: keyof FormErrors) =>
    attempted && errors[key] ? errors[key] : undefined

  /* Handlers ---------------------------------------------------------------- */

  function handleType(next: string) {
    setTypeId(next)
    setExtra("")
  }

  function toggleFeature(feature: string, checked: boolean) {
    setFeatures((prev) =>
      checked ? [...prev, feature] : prev.filter((f) => f !== feature)
    )
  }

  function addFiles(incoming: FileList | File[]) {
    const issues: string[] = []
    const next = [...files]
    const keys = new Set(next.map(fileKey))

    for (const file of Array.from(incoming)) {
      if (keys.has(fileKey(file))) continue
      if (!isAcceptedFile(file)) {
        issues.push(
          `${file.name}: only PDF, PNG, JPG or WebP files are allowed.`
        )
        continue
      }
      if (file.size > LIMITS.maxFileBytes) {
        issues.push(
          `${file.name}: ${formatBytes(file.size)} exceeds the ${formatBytes(LIMITS.maxFileBytes)} limit.`
        )
        continue
      }
      if (next.length >= LIMITS.maxFiles) {
        issues.push(
          `${file.name}: you can attach up to ${LIMITS.maxFiles} files.`
        )
        continue
      }
      keys.add(fileKey(file))
      next.push(file)
    }
    setFiles(next)
    setFileIssues(issues)
  }

  function removeFile(target: File) {
    setFiles((prev) => prev.filter((f) => f !== target))
    setFileIssues([])
  }

  function scrollTop() {
    requestAnimationFrame(() =>
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    )
  }

  function handleReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttempted(true)
    if (hasErrors) {
      requestAnimationFrame(() => {
        const first = formRef.current?.querySelector<HTMLElement>(
          '[aria-invalid="true"]'
        )
        first?.scrollIntoView({ behavior: "smooth", block: "center" })
        first?.focus({ preventScroll: true })
      })
      return
    }
    setStage("review")
    scrollTop()
  }

  function handleSubmit() {
    setConsentAttempted(true)
    if (!consent || submitting) return
    setSubmitting(true)
    timer.current = setTimeout(() => {
      setSubmitting(false)
      setReference(`INQ-${Math.floor(1000 + Math.random() * 9000)}`)
      scrollTop()
    }, 700)
  }

  function handleReset() {
    if (timer.current) clearTimeout(timer.current)
    setStage("edit")
    setName("")
    setEmail("")
    setCompany("")
    setWebsite("")
    setTypeId("")
    setExtra("")
    setBudget("")
    setTimeline("")
    setDescription("")
    setFeatures([])
    setFiles([])
    setFileIssues([])
    setContact("email")
    setPhone("")
    setConsent(false)
    setAttempted(false)
    setConsentAttempted(false)
    setSubmitting(false)
    setReference(null)
  }

  /* Render ------------------------------------------------------------------ */

  const descLen = description.length
  const descTrimmed = description.trim().length
  const descTooShort = descTrimmed < LIMITS.descriptionMin
  const descOver = descLen > LIMITS.descriptionMax
  const descProgress = Math.min(
    100,
    Math.round((descTrimmed / LIMITS.descriptionMin) * 100)
  )
  const firstName = name.trim().split(" ")[0]

  const replySteps = [
    {
      when: "Today",
      title: "Brief logged",
      body: "Your inquiry is filed and routed to a producer.",
    },
    {
      when: "Within 1 business day",
      title: "First reply",
      body: `A producer reviews your brief and writes back${contactItem ? ` by ${contactItem.label.toLowerCase()}` : ""} with questions.`,
    },
    {
      when: "Within 3 business days",
      title: "Intro call + rough estimate",
      body: "A short call to align on scope, plus a ballpark range.",
    },
    {
      when: "Within 1 week",
      title: "Proposal",
      body: "A written proposal with scope, timeline and fixed fees.",
    },
  ]

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-12 text-foreground sm:px-6 sm:py-16",
        className
      )}
      aria-labelledby={id("heading")}
      {...props}
    >
      <div ref={topRef} className="mx-auto w-full max-w-5xl scroll-mt-6">
        {reference ? (
          /* ------------------------------ Success ------------------------------ */
          <div
            role="status"
            className="mx-auto w-full max-w-2xl rounded-[12px] border border-border/70 bg-card p-6 text-start shadow-soft sm:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Inquiry received
                </p>
                <h2
                  id={id("heading")}
                  dir="ltr"
                  className="mt-2 break-all font-mono text-3xl font-semibold tracking-widest sm:text-4xl"
                >
                  {reference}
                </h2>
              </div>
              <span
                aria-hidden
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <CheckIcon className="size-5" />
              </span>
            </div>
            <p className="mt-4 text-pretty text-sm leading-6 text-muted-foreground">
              Thank you{firstName ? `, ${firstName}` : ""}. This is a demo
              &mdash; nothing was sent and nobody will contact you. The
              reference and timeline below are for illustration only.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {type ? <Badge variant="secondary">{type.label}</Badge> : null}
              {budgetItem ? (
                <Badge variant="outline">
                  <bdi>{budgetItem.label}</bdi>
                </Badge>
              ) : null}
              {timelineItem ? (
                <Badge variant="outline">
                  <bdi>{timelineItem.label}</bdi>
                </Badge>
              ) : null}
            </div>

            <div className="mt-10">
              <DocLabel>We&apos;ll reply within 1 business day</DocLabel>
              <ol className="mt-5 flex flex-col">
                {replySteps.map((step, index) => (
                  <li
                    key={step.title}
                    className="relative flex gap-4 pb-7 last:pb-0"
                  >
                    {index < replySteps.length - 1 ? (
                      <span
                        aria-hidden
                        className="absolute start-[7px] top-4 bottom-0 w-px bg-border"
                      />
                    ) : null}
                    <span
                      aria-hidden
                      className={cn(
                        "relative mt-1 size-[15px] shrink-0 rounded-full border-2",
                        index === 0
                          ? "border-primary bg-primary"
                          : "border-border bg-card"
                      )}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {step.when}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold">
                        {step.title}
                      </p>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <Button
              type="button"
              variant="outline"
              className="mt-10 cursor-pointer"
              onClick={handleReset}
            >
              <RotateCcwIcon aria-hidden />
              Reset &amp; start another inquiry
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {/* Progress line + header */}
            <header className="flex flex-col gap-6 text-start">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em]">
                  <span
                    className={
                      stage === "edit"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    Project details
                  </span>
                  <span
                    className={
                      stage === "review"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    Review &amp; send
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-label="Inquiry progress"
                  aria-valuemin={1}
                  aria-valuemax={2}
                  aria-valuenow={stage === "edit" ? 1 : 2}
                  aria-valuetext={
                    stage === "edit"
                      ? "Step 1 of 2: project details"
                      : "Step 2 of 2: review"
                  }
                  className="h-0.5 w-full overflow-hidden rounded-full bg-border"
                >
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-500"
                    style={{ width: stage === "edit" ? "50%" : "100%" }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h1
                  id={id("heading")}
                  className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  {stage === "edit"
                    ? "Tell us what you want to build."
                    : "Here's the brief we'd receive."}
                </h1>
                <p className="max-w-xl text-pretty text-base leading-7 text-muted-foreground">
                  {stage === "edit"
                    ? "A few honest details are enough. We reply with sharper questions, a rough range and a suggested path."
                    : "Read it through like a proposal. Edit anything before it goes."}
                </p>
              </div>
            </header>

            {stage === "edit" ? (
              <form
                ref={formRef}
                noValidate
                onSubmit={handleReview}
                className="flex min-w-0 flex-col rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-10"
              >
                {/* About you */}
                <Section
                  id={id("s-you")}
                  title="About you"
                  hint="Who should we reply to?"
                >
                  <FieldGroup className="gap-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field data-invalid={!!show("name")}>
                        <FieldLabel htmlFor={id("name")}>
                          Full name <Required />
                        </FieldLabel>
                        <Input
                          id={id("name")}
                          name="name"
                          autoComplete="name"
                          placeholder="Jordan Lee"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          aria-invalid={!!show("name")}
                        />
                        <FieldError>{show("name")}</FieldError>
                      </Field>
                      <Field data-invalid={!!show("email")}>
                        <FieldLabel htmlFor={id("email")}>
                          Work email <Required />
                        </FieldLabel>
                        <Input
                          id={id("email")}
                          name="email"
                          type="email"
                          dir="ltr"
                          autoComplete="email"
                          placeholder="jordan@acme.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          aria-invalid={!!show("email")}
                        />
                        <FieldError>{show("email")}</FieldError>
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field data-invalid={!!show("company")}>
                        <FieldLabel htmlFor={id("company")}>
                          Company <Required />
                        </FieldLabel>
                        <Input
                          id={id("company")}
                          name="company"
                          autoComplete="organization"
                          placeholder="Acme Inc."
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          aria-invalid={!!show("company")}
                        />
                        <FieldError>{show("company")}</FieldError>
                      </Field>
                      <Field data-invalid={!!show("website")}>
                        <FieldLabel htmlFor={id("website")}>
                          Website{" "}
                          <span className="font-normal text-muted-foreground">
                            (optional)
                          </span>
                        </FieldLabel>
                        <Input
                          id={id("website")}
                          name="website"
                          type="url"
                          dir="ltr"
                          inputMode="url"
                          autoComplete="url"
                          placeholder="https://acme.com"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          aria-invalid={!!show("website")}
                        />
                        <FieldError>{show("website")}</FieldError>
                      </Field>
                    </div>
                  </FieldGroup>
                </Section>

                {/* Project type */}
                <Section
                  id={id("s-type")}
                  title="Project type"
                  hint="Pick the closest match — we'll ask one short follow-up."
                >
                  <Field data-invalid={!!show("type")}>
                    <RadioGroup
                      value={typeId}
                      onValueChange={handleType}
                      aria-label="Project type"
                      aria-invalid={!!show("type")}
                      className="grid grid-cols-2 gap-3 sm:grid-cols-3"
                    >
                      {PROJECT_TYPES.map((item) => {
                        const Icon = item.icon
                        const active = item.id === typeId
                        return (
                          <label
                            key={item.id}
                            className={cn(
                              "relative flex min-h-36 cursor-pointer flex-col items-start gap-3 rounded-[12px] border p-4 text-start transition-colors hover:bg-muted/40 sm:p-5",
                              focusWithin,
                              active
                                ? "border-primary/40 bg-primary/10"
                                : "border-border/70 bg-background"
                            )}
                          >
                            <RadioGroupItem
                              value={item.id}
                              aria-label={item.label}
                              className={hiddenControl}
                            />
                            <span
                              aria-hidden
                              className={cn(
                                "flex size-10 items-center justify-center rounded-full transition-colors",
                                active
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-foreground"
                              )}
                            >
                              <Icon className="size-5" />
                            </span>
                            <span className="flex min-w-0 flex-col gap-0.5">
                              <span className="text-sm font-semibold leading-5">
                                {item.label}
                              </span>
                              <span className="text-xs leading-5 text-muted-foreground">
                                {item.description}
                              </span>
                            </span>
                          </label>
                        )
                      })}
                    </RadioGroup>
                    <FieldError>{show("type")}</FieldError>
                  </Field>

                  {/* Conditional follow-up */}
                  {type ? (
                    <div
                      key={type.id}
                      className="border-s-2 border-primary/40 ps-4"
                    >
                      <Field data-invalid={!!show("extra")}>
                        <FieldLabel
                          id={id("extra-label")}
                          htmlFor={
                            type.extra.kind === "choice"
                              ? undefined
                              : id("extra")
                          }
                        >
                          {type.extra.label} <Required />
                        </FieldLabel>

                        {type.extra.kind === "choice" ? (
                          <RadioGroup
                            value={extra}
                            onValueChange={setExtra}
                            aria-labelledby={id("extra-label")}
                            aria-invalid={!!show("extra")}
                            className="flex flex-wrap gap-2"
                          >
                            {type.extra.options.map((option) => (
                              <label
                                key={option}
                                className={cn(
                                  "relative inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-medium transition-colors hover:bg-muted/40",
                                  focusWithin,
                                  extra === option
                                    ? "border-primary/40 bg-primary/10"
                                    : "border-border/70 bg-background"
                                )}
                              >
                                <RadioGroupItem
                                  value={option}
                                  aria-label={option}
                                  className={hiddenControl}
                                />
                                {option}
                              </label>
                            ))}
                          </RadioGroup>
                        ) : (
                          <Input
                            id={id("extra")}
                            name="extra"
                            type={
                              type.extra.kind === "number" ? "number" : "text"
                            }
                            inputMode={
                              type.extra.kind === "number"
                                ? "numeric"
                                : undefined
                            }
                            min={
                              type.extra.kind === "number"
                                ? type.extra.min
                                : undefined
                            }
                            max={
                              type.extra.kind === "number"
                                ? type.extra.max
                                : undefined
                            }
                            maxLength={
                              type.extra.kind === "text"
                                ? type.extra.max
                                : undefined
                            }
                            placeholder={type.extra.placeholder}
                            value={extra}
                            onChange={(e) => setExtra(e.target.value)}
                            aria-invalid={!!show("extra")}
                            className="sm:max-w-xs"
                          />
                        )}
                        <FieldDescription>
                          {type.extra.description}
                        </FieldDescription>
                        <FieldError>{show("extra")}</FieldError>
                      </Field>
                    </div>
                  ) : null}
                </Section>

                {/* Budget */}
                <Section
                  id={id("s-budget")}
                  title="Budget"
                  hint="An honest range helps us propose the right scope."
                >
                  <Field data-invalid={!!show("budget")}>
                    <RadioGroup
                      value={budget}
                      onValueChange={setBudget}
                      aria-label="Budget range"
                      aria-invalid={!!show("budget")}
                      className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-0"
                    >
                      {BUDGETS.map((item, index) => {
                        const active = item.id === budget
                        // Range steps fill up to the selection; "Not sure" sits outside the track.
                        const filled =
                          budgetIndex >= 0 &&
                          budgetIndex < BUDGETS.length - 1 &&
                          index <= budgetIndex &&
                          index < BUDGETS.length - 1
                        const isUnsure = index === BUDGETS.length - 1
                        return (
                          <label
                            key={item.id}
                            className={cn(
                              "group relative flex cursor-pointer flex-col gap-1 rounded-md border p-3 text-start transition-colors hover:bg-muted/40 md:border-0 md:bg-transparent md:px-2 md:pb-3 md:pt-7",
                              focusWithin,
                              active
                                ? "border-primary/40 bg-primary/10 md:bg-primary/10"
                                : "border-border/70 bg-background"
                            )}
                          >
                            <RadioGroupItem
                              value={item.id}
                              aria-label={`${item.label}, ${item.hint}`}
                              className={hiddenControl}
                            />
                            <span
                              aria-hidden
                              className={cn(
                                "absolute inset-x-0 top-[14px] hidden h-0.5 md:block",
                                isUnsure
                                  ? "border-t border-dashed border-border bg-transparent"
                                  : filled
                                    ? "bg-primary"
                                    : "bg-border"
                              )}
                            />
                            <span
                              aria-hidden
                              className={cn(
                                "absolute inset-x-0 top-[8px] mx-auto hidden size-3.5 rounded-full border-2 transition-colors md:block",
                                active
                                  ? "border-primary bg-primary"
                                  : filled
                                    ? "border-primary bg-card"
                                    : "border-border bg-card"
                              )}
                            />
                            <span className="text-sm font-semibold leading-5 tabular-nums md:text-center">
                              <bdi>{item.label}</bdi>
                            </span>
                            <span className="text-xs leading-4 text-muted-foreground md:text-center">
                              {item.hint}
                            </span>
                          </label>
                        )
                      })}
                    </RadioGroup>
                    <FieldError>{show("budget")}</FieldError>
                  </Field>
                </Section>

                {/* Timeline */}
                <Section
                  id={id("s-timeline")}
                  title="Timeline"
                  hint="When would you like to launch?"
                >
                  <Field data-invalid={!!show("timeline")}>
                    <RadioGroup
                      value={timeline}
                      onValueChange={setTimeline}
                      aria-label="Timeline"
                      aria-invalid={!!show("timeline")}
                      className="flex h-[46px] w-full gap-1 overflow-x-auto rounded-md bg-muted p-1"
                    >
                      {TIMELINES.map((item) => (
                        <label
                          key={item.id}
                          className={cn(
                            "relative flex min-w-fit flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-[8px] px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground has-data-[state=checked]:bg-card has-data-[state=checked]:text-foreground has-data-[state=checked]:shadow-sm",
                            focusWithin
                          )}
                        >
                          <RadioGroupItem
                            value={item.id}
                            aria-label={`${item.label}, ${item.hint}`}
                            className={hiddenControl}
                          />
                          <bdi>{item.label}</bdi>
                        </label>
                      ))}
                    </RadioGroup>
                    <FieldDescription>
                      {timelineItem
                        ? timelineItem.hint
                        : "Choose the window that feels closest."}
                    </FieldDescription>
                    <FieldError>{show("timeline")}</FieldError>
                  </Field>
                </Section>

                {/* Brief */}
                <Section
                  id={id("s-brief")}
                  title="The brief"
                  hint="This is the part we read first. Take your time."
                >
                  <Field data-invalid={!!show("description")}>
                    <FieldLabel htmlFor={id("description")}>
                      Describe your project <Required />
                    </FieldLabel>
                    <div
                      className={cn(
                        "overflow-hidden rounded-[12px] border bg-background transition-shadow focus-within:ring-[3px] focus-within:ring-ring/40",
                        show("description") || descOver
                          ? "border-destructive"
                          : "border-border/70"
                      )}
                    >
                      <Textarea
                        id={id("description")}
                        name="description"
                        rows={9}
                        placeholder="What are you trying to achieve? Who is it for? Any existing systems, constraints or deadlines?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        aria-invalid={!!show("description")}
                        className="min-h-56 resize-y rounded-none border-0 bg-transparent px-5 py-4 text-base leading-7 shadow-none focus-visible:ring-0"
                      />
                      <div className="flex items-center justify-between gap-4 border-t border-border/70 bg-muted/30 px-5 py-2.5">
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <div
                            aria-hidden
                            className="h-0.5 w-24 shrink-0 overflow-hidden rounded-full bg-border"
                          >
                            <div
                              className="h-full rounded-full bg-primary transition-[width]"
                              style={{ width: `${descProgress}%` }}
                            />
                          </div>
                          <span className="truncate text-xs text-muted-foreground">
                            {descTooShort
                              ? `${LIMITS.descriptionMin - descTrimmed} more characters to go`
                              : "Looking good"}
                          </span>
                        </div>
                        <span
                          aria-live="polite"
                          className={cn(
                            "shrink-0 text-xs tabular-nums text-muted-foreground",
                            (descOver || (attempted && descTooShort)) &&
                              "text-destructive"
                          )}
                        >
                          {descLen}/{LIMITS.descriptionMax}
                        </span>
                      </div>
                    </div>
                    <FieldError>{show("description")}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel id={id("features-label")}>
                      Features you have in mind{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </FieldLabel>
                    <div
                      role="group"
                      aria-labelledby={id("features-label")}
                      className="flex flex-wrap gap-2"
                    >
                      {FEATURES.map((feature) => {
                        const checked = features.includes(feature)
                        return (
                          <label
                            key={feature}
                            className={cn(
                              "relative inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border px-4 py-1 text-sm transition-colors hover:bg-muted/40",
                              focusWithin,
                              checked
                                ? "border-primary/40 bg-primary/10 font-medium"
                                : "border-border/70 bg-background"
                            )}
                          >
                            <Checkbox
                              checked={checked}
                              aria-label={feature}
                              onCheckedChange={(v) =>
                                toggleFeature(feature, v === true)
                              }
                              className={hiddenControl}
                            />
                            {checked ? (
                              <CheckIcon
                                className="size-3.5 text-primary"
                                aria-hidden
                              />
                            ) : null}
                            {feature}
                          </label>
                        )
                      })}
                    </div>
                  </Field>
                </Section>

                {/* Attachments */}
                <Section
                  id={id("s-files")}
                  title="References"
                  hint={`PDF, PNG, JPG or WebP · up to ${formatBytes(LIMITS.maxFileBytes)} each · max ${LIMITS.maxFiles} files.`}
                >
                  <div
                    onDragOver={(e) => {
                      e.preventDefault()
                      setDragging(true)
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault()
                      setDragging(false)
                      if (e.dataTransfer.files.length)
                        addFiles(e.dataTransfer.files)
                    }}
                    className={cn(
                      "flex flex-col items-start gap-4 rounded-[12px] border border-dashed bg-background p-5 transition-colors sm:flex-row sm:items-center sm:justify-between",
                      dragging
                        ? "border-primary bg-primary/10"
                        : "border-border"
                    )}
                  >
                    <div className="flex items-center gap-4 text-start">
                      <span
                        aria-hidden
                        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-muted text-foreground"
                      >
                        <UploadIcon className="size-5" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">
                          Drop briefs, wireframes or references here
                        </p>
                        <p className="text-xs text-muted-foreground tabular-nums">
                          {files.length}/{LIMITS.maxFiles} attached
                        </p>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      id={id("files")}
                      type="file"
                      multiple
                      accept={LIMITS.accept}
                      className="sr-only"
                      tabIndex={-1}
                      aria-label="Upload attachments"
                      onChange={(e) => {
                        if (e.target.files) addFiles(e.target.files)
                        e.target.value = ""
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="cursor-pointer"
                      disabled={files.length >= LIMITS.maxFiles}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Browse files
                    </Button>
                  </div>

                  {fileIssues.length > 0 ? (
                    <FieldError>
                      <ul className="flex list-disc flex-col gap-1 ps-4">
                        {fileIssues.map((issue) => (
                          <li key={issue}>{issue}</li>
                        ))}
                      </ul>
                    </FieldError>
                  ) : null}

                  {files.length > 0 ? (
                    <AttachmentGroup className="flex-wrap overflow-visible">
                      {files.map((file) => (
                        <Attachment
                          key={fileKey(file)}
                          size="sm"
                          className="w-full rounded-full sm:w-60"
                        >
                          <AttachmentMedia className="rounded-full">
                            {isImage(file) ? (
                              <ImageIcon aria-hidden />
                            ) : (
                              <FileTextIcon aria-hidden />
                            )}
                          </AttachmentMedia>
                          <AttachmentContent>
                            <AttachmentTitle title={file.name}>
                              {file.name}
                            </AttachmentTitle>
                            <AttachmentDescription>
                              {formatBytes(file.size)}
                            </AttachmentDescription>
                          </AttachmentContent>
                          <AttachmentActions>
                            <AttachmentAction
                              type="button"
                              aria-label={`Remove ${file.name}`}
                              className="relative after:absolute after:-inset-1.5"
                              onClick={() => removeFile(file)}
                            >
                              <XIcon aria-hidden />
                            </AttachmentAction>
                          </AttachmentActions>
                        </Attachment>
                      ))}
                    </AttachmentGroup>
                  ) : null}
                </Section>

                {/* Contact method */}
                <Section
                  id={id("s-contact")}
                  title="Reply channel"
                  hint="Choose the channel you check most."
                >
                  <RadioGroup
                    value={contact}
                    onValueChange={setContact}
                    aria-label="Preferred contact method"
                    className="grid grid-cols-1 gap-3 sm:grid-cols-3"
                  >
                    {CONTACT_METHODS.map((item) => {
                      const Icon = item.icon
                      const active = item.id === contact
                      return (
                        <label
                          key={item.id}
                          className={cn(
                            "relative flex cursor-pointer items-start gap-3 rounded-md border p-3.5 text-start transition-colors hover:bg-muted/40",
                            focusWithin,
                            active
                              ? "border-primary/40 bg-primary/10"
                              : "border-border/70 bg-background"
                          )}
                        >
                          <RadioGroupItem
                            value={item.id}
                            aria-label={item.label}
                            className={hiddenControl}
                          />
                          <Icon
                            className="mt-0.5 size-4 shrink-0"
                            aria-hidden
                          />
                          <span className="flex min-w-0 flex-col">
                            <span className="text-sm font-semibold leading-5">
                              {item.label}
                            </span>
                            <span className="text-xs leading-4 text-muted-foreground">
                              {item.hint}
                            </span>
                          </span>
                        </label>
                      )
                    })}
                  </RadioGroup>

                  {contact === "phone" ? (
                    <Field data-invalid={!!show("phone")}>
                      <FieldLabel htmlFor={id("phone")}>
                        Phone number <Required />
                      </FieldLabel>
                      <Input
                        id={id("phone")}
                        name="phone"
                        type="tel"
                        dir="ltr"
                        autoComplete="tel"
                        placeholder="+1 555 0100"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        aria-invalid={!!show("phone")}
                        className="sm:max-w-xs"
                      />
                      <FieldError>{show("phone")}</FieldError>
                    </Field>
                  ) : null}
                </Section>

                {attempted && hasErrors ? (
                  <FieldError className="mb-4">
                    Please fix the highlighted fields to continue.
                  </FieldError>
                ) : null}

                <div className="flex flex-col-reverse items-stretch justify-between gap-3 border-t border-border/70 pt-8 sm:flex-row sm:items-center">
                  <p className="text-xs leading-5 text-muted-foreground">
                    You&apos;ll review everything before it&apos;s sent.
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    className="cursor-pointer"
                  >
                    Preview proposal
                    <ArrowRightIcon className="icon-dir" aria-hidden />
                  </Button>
                </div>
              </form>
            ) : (
              /* -------------------------- Proposal preview -------------------------- */
              <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
                <article
                  aria-label="Project proposal preview"
                  className="rounded-[12px] border border-border/70 bg-card px-5 py-10 text-start shadow-soft sm:px-14 sm:py-14"
                >
                  <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-6">
                    <div>
                      <DocLabel>Project proposal</DocLabel>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Draft · not yet sent
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-11 shrink-0 cursor-pointer"
                      onClick={() => {
                        setStage("edit")
                        scrollTop()
                      }}
                    >
                      <PencilIcon aria-hidden />
                      Edit
                    </Button>
                  </div>

                  <h2 className="mt-8 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                    {type?.label}
                    <span className="text-muted-foreground">
                      {" "}
                      for {company.trim()}
                    </span>
                  </h2>
                  {type && extra.trim() ? (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {type.extra.label}:{" "}
                      <span className="font-medium text-foreground">
                        {extra.trim()}
                      </span>
                    </p>
                  ) : null}

                  <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div>
                      <dt>
                        <DocLabel>Budget</DocLabel>
                      </dt>
                      <dd className="mt-1.5 text-sm font-medium">
                        <bdi>{budgetItem?.label}</bdi>
                        <span className="block text-xs font-normal text-muted-foreground">
                          {budgetItem?.hint}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <DocLabel>Timeline</DocLabel>
                      </dt>
                      <dd className="mt-1.5 text-sm font-medium">
                        <bdi>{timelineItem?.label}</bdi>
                        <span className="block text-xs font-normal text-muted-foreground">
                          {timelineItem?.hint}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <DocLabel>Reply via</DocLabel>
                      </dt>
                      <dd className="mt-1.5 text-sm font-medium">
                        {contactItem?.label}
                        {contact === "phone" ? (
                          <span
                            dir="ltr"
                            className="block text-start text-xs font-normal text-muted-foreground"
                          >
                            {phone.trim()}
                          </span>
                        ) : (
                          <span className="block text-xs font-normal text-muted-foreground">
                            {contactItem?.hint}
                          </span>
                        )}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-10">
                    <DocLabel>Brief</DocLabel>
                    <p className="mt-3 whitespace-pre-wrap border-s-2 border-border ps-5 text-base leading-7">
                      {description.trim()}
                    </p>
                  </div>

                  <div className="mt-10">
                    <DocLabel>Scope</DocLabel>
                    {features.length ? (
                      <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                        {features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckIcon
                              className="mt-0.5 size-4 shrink-0 text-primary"
                              aria-hidden
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 text-sm text-muted-foreground">
                        No specific features listed.
                      </p>
                    )}
                  </div>

                  <div className="mt-10">
                    <DocLabel>References</DocLabel>
                    {files.length ? (
                      <ul className="mt-3 flex flex-col divide-y divide-border/70 rounded-md border border-border/70">
                        {files.map((f) => (
                          <li
                            key={fileKey(f)}
                            className="flex items-center gap-3 px-3 py-2.5 text-sm"
                          >
                            {isImage(f) ? (
                              <ImageIcon
                                className="size-4 shrink-0 text-muted-foreground"
                                aria-hidden
                              />
                            ) : (
                              <FileTextIcon
                                className="size-4 shrink-0 text-muted-foreground"
                                aria-hidden
                              />
                            )}
                            <span className="min-w-0 flex-1 truncate">
                              {f.name}
                            </span>
                            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                              {formatBytes(f.size)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 text-sm text-muted-foreground">
                        No files attached.
                      </p>
                    )}
                  </div>

                  <div className="mt-12 grid grid-cols-1 gap-6 border-t border-border/70 pt-6 sm:grid-cols-2">
                    <div>
                      <DocLabel>Prepared by</DocLabel>
                      <p className="mt-1.5 text-sm font-medium">
                        {name.trim()}
                      </p>
                      <p
                        dir="ltr"
                        className="text-start text-sm text-muted-foreground"
                      >
                        {email.trim()}
                      </p>
                    </div>
                    <div>
                      <DocLabel>Company</DocLabel>
                      <p className="mt-1.5 text-sm font-medium">
                        {company.trim()}
                      </p>
                      {website.trim() ? (
                        <p
                          dir="ltr"
                          className="text-start text-sm text-muted-foreground"
                        >
                          {website.trim()}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </article>

                <div className="flex flex-col gap-5 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
                  <Field data-invalid={consentAttempted && !consent}>
                    <label
                      htmlFor={id("consent")}
                      className="flex cursor-pointer items-start gap-3 text-sm leading-5"
                    >
                      <Checkbox
                        id={id("consent")}
                        checked={consent}
                        onCheckedChange={(v) => setConsent(v === true)}
                        aria-invalid={consentAttempted && !consent}
                        className="mt-0.5 cursor-pointer"
                      />
                      <span className="text-start">
                        I agree to be contacted about this inquiry using my
                        preferred method.
                      </span>
                    </label>
                    <FieldError>
                      {consentAttempted && !consent
                        ? "Please confirm to send your inquiry."
                        : undefined}
                    </FieldError>
                  </Field>

                  <div className="flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
                    <p className="text-xs leading-5 text-muted-foreground">
                      Demo form — nothing is actually sent.
                    </p>
                    <div className="flex flex-col-reverse gap-3 sm:flex-row">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="cursor-pointer"
                        disabled={submitting}
                        onClick={() => {
                          setStage("edit")
                          scrollTop()
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        size="lg"
                        className="cursor-pointer"
                        disabled={submitting}
                        onClick={handleSubmit}
                      >
                        {submitting ? (
                          <>
                            <LoaderCircleIcon
                              className="animate-spin"
                              aria-hidden
                            />
                            Sending…
                          </>
                        ) : (
                          "Send inquiry"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
