"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const faqData = [
  {
    question: "Are there any special discounts or early bird offers?",
    answer:
      "Yes! We offer limited-time early bird discounts and bundle packages for group registrations. Be sure to sign up early to grab the best deals.",
  },
  {
    question: "What are the dates and locations for the product launch events?",
    answer:
      "The launch events will take place in New York on July 18th, San Francisco on July 25th, and virtually on August 1st. Detailed schedules will be emailed after registration.",
  },
  {
    question: "Can I bring a guest to the product launch?",
    answer:
      "Yes, you may bring one guest with you. Please ensure that both names are included during registration as seats are limited.",
  },
  {
    question: "How do I register for the event?",
    answer:
      'Simply visit our official website and click the "Register" button at the top of the page. You’ll receive a confirmation email within minutes.',
  },
  {
    question: "Is parking available at the event venue?",
    answer:
      "Yes, most venues have dedicated parking areas for attendees. You’ll receive parking details in your confirmation email.",
  },
  {
    question: "How can I contact the event organizers?",
    answer:
      "For any inquiries, you can email us at events@yourcompany.com or call our support line at +1 (800) 123-4567 between 9 AM – 5 PM.",
  },
] as const

function PlusMinusIcon({
  open,
  className,
}: {
  open: boolean
  className?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={cn("size-3.5 shrink-0 fill-current", className)}
      aria-hidden
    >
      <path d="M40.421 215.579H471.579C493.868 215.579 512 233.711 512 256s-18.132 40.421-40.421 40.421H40.421C18.132 296.421 0 278.289 0 256s18.132-40.421 40.421-40.421z" />
      <path
        className={cn(
          "origin-center transition-opacity duration-300",
          open ? "opacity-0" : "opacity-100"
        )}
        d="M215.579 40.421C215.579 18.132 233.711 0 256 0s40.421 18.132 40.421 40.421v431.158C296.421 493.868 278.289 512 256 512s-40.421-18.132-40.421-40.421V40.421z"
      />
    </svg>
  )
}

export default function Faq({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const uid = React.useId()

  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  return (
    <section
      className={cn("w-full bg-card px-4 py-12 md:px-8 md:py-16", className)}
      aria-labelledby={`${uid}-title`}
      {...props}
    >
      <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
        <h2
          id={`${uid}-title`}
          className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
        >
          Frequently Asked Questions
        </h2>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="divide-y divide-border">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index
            const headingId = `${uid}-heading-${index}`
            const panelId = `${uid}-panel-${index}`

            return (
              <div key={item.question} className="py-5 md:py-6">
                <h3 id={headingId}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full cursor-pointer items-center gap-4 rounded-md text-start text-base font-semibold text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="min-w-0 flex-1">{item.question}</span>
                    <PlusMinusIcon open={isOpen} className="text-foreground" />
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
                    <p className="pt-4 text-base leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
