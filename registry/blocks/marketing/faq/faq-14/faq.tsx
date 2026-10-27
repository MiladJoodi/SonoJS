"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const tabs = [
  { id: "general", label: "General" },
  { id: "community", label: "Community" },
  { id: "pricing", label: "Pricing" },
] as const

type TabId = (typeof tabs)[number]["id"]

const faqByTab: Record<
  TabId,
  ReadonlyArray<{ question: string; answer: string }>
> = {
  general: [
    {
      question: "What is the platform? What is it for?",
      answer:
        "It is a workspace for building and shipping product UI faster. Use it to browse components, assemble pages, and keep your design system consistent across teams.",
    },
    {
      question: "What steps do I need to take to join?",
      answer:
        "Create a free account, confirm your email, then invite teammates from Settings. You can start on the free plan and upgrade when you need more seats or features.",
    },
    {
      question: "Do you facilitate any regular events or offer rooms for group discussions?",
      answer:
        "Yes. We host office hours and community meetups. Paid plans also include shared discussion rooms so your team can collaborate in one place.",
    },
    {
      question: "Is there a particular subject I should focus on learning?",
      answer:
        "Start with the Getting Started guide, then explore layout patterns and form components. From there, dig into theming and accessibility best practices.",
    },
    {
      question: "Can I make it a fun group study session by inviting my buddies?",
      answer:
        "Absolutely. Invite friends or classmates to a shared workspace, assign roles, and learn together with the same component library and docs.",
    },
  ],
  community: [
    {
      question: "How do I join the community?",
      answer:
        "Sign in, open Community from the sidebar, and introduce yourself in the welcome channel. You can also join scheduled events from the calendar.",
    },
    {
      question: "Are there guidelines for posting?",
      answer:
        "Keep questions focused, search before posting, and share reproducible examples when reporting issues. Be respectful and constructive with feedback.",
    },
    {
      question: "Can I share my projects with others?",
      answer:
        "Yes. Publish a public showcase link or share a private invite with selected members. You control visibility from project settings.",
    },
    {
      question: "Do mentors answer questions live?",
      answer:
        "Mentors drop into weekly office hours and async threads. Response times vary, but active topics usually get replies within a day.",
    },
    {
      question: "How do I report spam or abuse?",
      answer:
        "Use the Report action on any post or message, or email trust@example.com. Our team reviews reports and takes action when needed.",
    },
  ],
  pricing: [
    {
      question: "Is there a free plan?",
      answer:
        "Yes. The free plan covers core components and a small team. Upgrade when you need higher limits, private support, or advanced collaboration tools.",
    },
    {
      question: "Can I switch plans later?",
      answer:
        "You can upgrade or downgrade anytime from Billing. Changes apply on the next renewal unless you choose to prorate immediately.",
    },
    {
      question: "Do annual plans include a discount?",
      answer:
        "Annual billing saves compared with monthly. The exact rate is shown at checkout and on the Pricing page for each plan.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "Major credit and debit cards are supported worldwide. Invoices for company accounts are available on business plans.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "Contact support within 14 days of your first paid charge if the product is not a fit. Eligible refunds go back to the original payment method.",
    },
  ],
}

function PlusCircleIcon({
  open,
  className,
}: {
  open: boolean
  className?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn(
        "size-8 shrink-0 text-primary transition-transform duration-200",
        open && "rotate-45",
        className
      )}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 2.66669C8.63586 2.66669 2.66663 8.63592 2.66663 16C2.66663 23.3641 8.63586 29.3334 16 29.3334C23.3641 29.3334 29.3333 23.3641 29.3333 16C29.3333 8.63592 23.3641 2.66669 16 2.66669ZM17.0256 11.8975C17.0256 11.6254 16.9175 11.3646 16.7252 11.1722C16.5329 10.9799 16.272 10.8718 16 10.8718C15.7279 10.8718 15.4671 10.9799 15.2747 11.1722C15.0824 11.3646 14.9743 11.6254 14.9743 11.8975V14.9744H11.8974C11.6254 14.9744 11.3645 15.0824 11.1722 15.2748C10.9798 15.4671 10.8718 15.728 10.8718 16C10.8718 16.272 10.9798 16.5329 11.1722 16.7253C11.3645 16.9176 11.6254 17.0257 11.8974 17.0257H14.9743V20.1026C14.9743 20.3746 15.0824 20.6355 15.2747 20.8278C15.4671 21.0202 15.7279 21.1282 16 21.1282C16.272 21.1282 16.5329 21.0202 16.7252 20.8278C16.9175 20.6355 17.0256 20.3746 17.0256 20.1026V17.0257H20.1025C20.3745 17.0257 20.6354 16.9176 20.8278 16.7253C21.0201 16.5329 21.1282 16.272 21.1282 16C21.1282 15.728 21.0201 15.4671 20.8278 15.2748C20.6354 15.0824 20.3745 14.9744 20.1025 14.9744H17.0256V11.8975Z"
        fill="currentColor"
      />
    </svg>
  )
}

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: { question: string; answer: string }
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const uid = React.useId()
  const headingId = `${uid}-heading-${index}`
  const panelId = `${uid}-panel-${index}`

  return (
    <div className="mb-3 rounded-3xl border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:gap-6"
      >
        <h3
          id={headingId}
          className="min-w-0 flex-1 text-lg font-semibold text-foreground"
        >
          {item.question}
        </h3>
        <PlusCircleIcon open={isOpen} />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out"
      >
        <div className="min-h-0 overflow-hidden">
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Faq({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const uid = React.useId()

  const [tab, setTab] = React.useState<TabId>("general")
  const [openIndexes, setOpenIndexes] = React.useState<number[]>([])

  const items = faqByTab[tab]

  const selectTab = (next: TabId) => {
    setTab(next)
    setOpenIndexes([])
  }

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <section
      className={cn("px-4 py-16 md:px-8 md:py-24", className)}
      aria-labelledby={`${uid}-title`}
      {...props}
    >
      <div className="mx-auto w-full max-w-4xl">
        <h2
          id={`${uid}-title`}
          className="mb-3 text-center text-4xl font-bold uppercase tracking-tight text-foreground md:mb-4 lg:text-6xl"
        >
          FAQ
        </h2>
        <p className="mb-10 text-center text-lg text-muted-foreground md:mb-16">
          Here you will find the answers to the frequently asked questions.
        </p>

        <div
          role="tablist"
          aria-label="FAQ categories"
          className="mb-8 flex flex-wrap justify-center gap-3 sm:gap-6 md:mb-10"
        >
          {tabs.map((item) => {
            const selected = tab === item.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => selectTab(item.id)}
                className={cn(
                  "inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-full border px-6 text-center text-base font-bold shadow-soft transition-colors duration-200 sm:h-14 sm:w-auto",
                  selected
                    ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/30"
                    : "border-border/70 bg-card text-foreground hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary/30"
                )}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        <div role="tabpanel">
          {items.map((item, index) => (
            <FaqItem
              key={`${tab}-${item.question}`}
              item={item}
              index={index}
              isOpen={openIndexes.includes(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
