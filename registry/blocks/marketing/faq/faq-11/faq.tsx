"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const tabs = [
  { id: "general", label: "General" },
  { id: "payments", label: "Payments" },
  { id: "returns", label: "Returns" },
  { id: "refunds", label: "Refunds" },
] as const

type TabId = (typeof tabs)[number]["id"]

const faqByTab: Record<
  TabId,
  ReadonlyArray<{ question: string; answer: string }>
> = {
  general: [
    {
      question: "How do I create an account?",
      answer:
        "Click Sign Up in the header, enter your email and password, then confirm via the link we send you. You can start exploring the free plan right away.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Yes. Our apps for iOS and Android are free to download from the App Store and Google Play. Sign in with the same account you use on the web.",
    },
    {
      question: "How do I contact support?",
      answer:
        "Use the Contact Us form in the footer, or email support@example.com. We typically reply within one business day on weekdays.",
    },
    {
      question: "Can I invite teammates to my workspace?",
      answer:
        "Yes. Open Settings → Members, invite by email, and choose a role. Invited teammates get access once they accept the invitation.",
    },
    {
      question: "Where can I find tutorials and guides?",
      answer:
        "Visit the Help Center for walkthroughs, short videos, and troubleshooting tips. New guides are added regularly based on common questions.",
    },
  ],
  payments: [
    {
      question: "Which payment methods do you accept?",
      answer:
        "We accept major credit and debit cards, and selected regional payment methods depending on your billing country. All charges appear on your invoice.",
    },
    {
      question: "When am I billed?",
      answer:
        "Subscriptions renew on the same day each month or year, based on the plan you chose. You can view upcoming charges in Billing settings.",
    },
    {
      question: "Can I change my payment method?",
      answer:
        "Yes. Go to Billing → Payment methods, add a new card, and set it as default. The next renewal uses your updated method.",
    },
    {
      question: "Do you offer invoices for accounting?",
      answer:
        "Every successful payment generates a downloadable PDF invoice with tax details where applicable. Find them under Billing → Invoices.",
    },
    {
      question: "What happens if a payment fails?",
      answer:
        "We retry a few times and email you a notice. Update your card to keep access. If payment stays unpaid, the plan may pause until resolved.",
    },
  ],
  returns: [
    {
      question: "What is your return window?",
      answer:
        "Most physical products can be returned within 30 days of delivery if unused and in original packaging. Digital purchases follow a separate policy.",
    },
    {
      question: "How do I start a return?",
      answer:
        "Open Orders, select the item, and choose Request return. Print the prepaid label if provided, then drop the package at an approved carrier.",
    },
    {
      question: "Who pays for return shipping?",
      answer:
        "If the item is defective or we made an error, return shipping is covered. Otherwise standard return shipping rates may apply.",
    },
    {
      question: "How long until my return is processed?",
      answer:
        "Once we receive the package, inspection usually takes 3–5 business days. You will get an email when the return is approved.",
    },
    {
      question: "Can I exchange an item instead?",
      answer:
        "Exchanges are available for size or color when stock allows. Request an exchange from the same Orders flow as a return.",
    },
  ],
  refunds: [
    {
      question: "When will I receive my refund?",
      answer:
        "Approved refunds are issued to the original payment method within 5–10 business days, depending on your bank or card issuer.",
    },
    {
      question: "Are shipping fees refundable?",
      answer:
        "Original shipping is refunded when the return is due to our error or a defective product. Otherwise shipping fees are usually non-refundable.",
    },
    {
      question: "Can I get a partial refund?",
      answer:
        "Yes, for incomplete orders or missing items. Support will adjust the refund amount after reviewing your order details.",
    },
    {
      question: "What if my refund does not appear?",
      answer:
        "Confirm the approval email first, then check with your bank. If it has been more than 10 business days, contact support with your order number.",
    },
    {
      question: "Do subscription cancellations refund unused time?",
      answer:
        "Monthly plans typically end at the billing period. Annual plans may qualify for a prorated credit depending on your plan terms.",
    },
  ],
}

function ChevronIcon({
  open,
  className,
}: {
  open: boolean
  className?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn(
        "size-4 shrink-0 text-zinc-100 transition-transform duration-200",
        open && "rotate-180",
        className
      )}
    >
      <path d="M19 9l-7 7-7-7" />
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
    <li className="border-b border-zinc-800 px-4 py-6 last:border-b-0 md:px-6 md:py-8">
      <h3 id={headingId}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full cursor-pointer items-center justify-between gap-3 text-start outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          <span className="bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-300 bg-clip-text text-base font-medium text-transparent transition-opacity duration-200 group-hover:opacity-90 md:text-lg">
            {item.question}
          </span>
          <ChevronIcon open={isOpen} />
        </button>
      </h3>

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
          <p className="mt-2 text-base leading-relaxed text-zinc-300 md:text-lg md:leading-loose">
            {item.answer}
          </p>
        </div>
      </div>
    </li>
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
      className={cn(
        "w-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 px-4 py-16 md:px-8 md:py-20",
        className
      )}
      aria-labelledby={`${uid}-title`}
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto mb-10 max-w-lg text-center md:mb-12 lg:max-w-2xl">
          <p className="text-sm font-medium text-zinc-300">
            Frequently Asked Questions
          </p>
          <h2
            id={`${uid}-title`}
            className="mt-3 bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-300 bg-clip-text text-3xl font-medium leading-tight text-transparent md:mt-4 md:text-4xl lg:text-5xl"
          >
            Answers for every step of your journey
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="FAQ categories"
          className="mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:mb-8 md:gap-x-8 lg:gap-x-12"
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
                  "cursor-pointer border-b-4 pb-2 text-base transition-colors duration-200 md:text-lg",
                  selected
                    ? "border-zinc-50 text-zinc-50"
                    : "border-transparent text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                )}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        <div className="relative mx-auto max-w-2xl">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-zinc-700/40 via-zinc-600/30 to-zinc-700/40 opacity-40 blur-3xl"
          />
          <ul className="relative" role="tabpanel">
            {items.map((item, index) => (
              <FaqItem
                key={`${tab}-${item.question}`}
                item={item}
                index={index}
                isOpen={openIndexes.includes(index)}
                onToggle={() => toggleItem(index)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
