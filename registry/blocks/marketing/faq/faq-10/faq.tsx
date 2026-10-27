import * as React from "react"

import { cn } from "@/lib/utils"

const faqData = [
  {
    question: "How can I create an account?",
    answer:
      'Creating an account is easy! Click on the "Sign Up" button and follow the simple steps to get started.',
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "Yes, we offer a mobile app for both iOS and Android. Visit the App Store or Google Play to download it.",
  },
  {
    question: "How can I reset my password?",
    answer:
      'To reset your password, go to the login page and click on the "Forgot Password" link. Follow the instructions sent to your email.',
  },
  {
    question: "Can I use the platform without a subscription?",
    answer:
      "Yes, we offer a free plan with limited features. You can explore the core tools without any upfront cost.",
  },
  {
    question: "Where can I find tutorials and guides?",
    answer:
      "Visit our Help Center for detailed tutorials, video walkthroughs, and troubleshooting tips to get the most out of the platform.",
  },
  {
    question: "Is my data secure on your platform?",
    answer:
      "Absolutely. We use industry-standard encryption and security practices to ensure your data is always protected and private.",
  },
] as const

export default function Faq({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16", className)}
      aria-labelledby="faq-heading"
      {...props}
    >
      <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="border-b border-border/70 p-5 md:p-6">
          <h2
            id="faq-heading"
            className="mb-3 text-2xl font-semibold tracking-tight text-foreground md:mb-4 md:text-3xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Explore our comprehensive FAQ to find answers to common queries.
          </p>
        </div>

        <div className="grid gap-4 p-5 sm:gap-6 sm:p-6 lg:grid-cols-2">
          {faqData.map((item) => (
            <div
              key={item.question}
              className="rounded-[12px] border border-border/70 bg-muted/50 p-4 sm:p-6"
            >
              <h3 className="mb-3 text-base font-semibold text-foreground md:mb-4">
                {item.question}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
