"use client"

import type * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const faqs = [
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
] as const

export default function Faq({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full bg-card px-4 py-12 md:px-8 md:py-16", className)}
      aria-labelledby="faq-heading"
      {...props}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 max-w-3xl md:mb-10">
          <h2
            id="faq-heading"
            className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          >
            Frequently Asked Questions
          </h2>
        </div>

        <ul className="space-y-8 md:space-y-10">
          {faqs.map((faq) => (
            <li key={faq.question} className="flex items-start gap-4">
              <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center text-[#16a34a] dark:text-[#4ade80]">
                <CheckIcon className="size-6" strokeWidth={2} aria-hidden />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-foreground">
                  {faq.question}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground md:mt-4">
                  {faq.answer}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
