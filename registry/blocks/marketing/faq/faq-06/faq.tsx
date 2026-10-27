"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const faqCategories = [
  {
    title: "Getting Started",
    id: "cat-getting-started",
    items: [
      {
        q: "How do I create a new workspace?",
        a: 'To create a new workspace, click the "+" button in your dashboard sidebar or navigate to Settings Workspaces Create New. You can customize your workspace name, invite team members, and set permissions during the setup process.',
      },
      {
        q: "Can I use the platform without a credit card?",
        a: "Yes! You can start with our free tier that doesn't require a credit card. The free plan includes basic features and limited storage. You'll only need to add payment information when upgrading to a paid plan.",
      },
      {
        q: "Is onboarding available for teams?",
        a: "Absolutely! We offer comprehensive onboarding sessions for teams of 5 or more users. This includes personalized training, best practices workshops, and dedicated support during your first month.",
      },
      {
        q: "Do I need to install anything?",
        a: "No, you don't need to install anything. Our platform is entirely web-based, so you can access it from any device with a modern browser. Just sign up for an account and you're ready to go!",
      },
      {
        q: "Can I invite collaborators to my project?",
        a: 'Yes, you can invite collaborators to your project. Simply go to your project settings and select the "Invite Collaborators" option. You can then add team members by their email addresses and assign them specific roles and permissions.',
      },
    ],
  },
  {
    title: "Billing & Subscriptions",
    id: "cat-billing-subscriptions",
    items: [
      {
        q: "How does the free trial work?",
        a: "Our free trial allows you to explore all premium features for a limited time without requiring a credit card. You can sign up for the trial directly from our website, and you'll receive a notification before the trial ends.",
      },
      {
        q: "Where can I update my payment method?",
        a: 'Yes! You can update your payment method at any time by going to your account settings and navigating to the "Billing" section.',
      },
      {
        q: "Do you offer refunds?",
        a: "We offer refunds on a case-by-case basis. If you are unsatisfied with our service, please contact our support team within 30 days of your purchase.",
      },
      {
        q: "What happens if I cancel my subscription?",
        a: "If you cancel your subscription, you will still have access to the platform until the end of your current billing period.",
      },
    ],
  },
  {
    title: "Features & Usage",
    id: "cat-features-usage",
    items: [
      {
        q: "Can I connect third-party apps or tools?",
        a: "Absolutely! We integrate with over 50 popular tools including Slack, Google Workspace, Microsoft 365, Trello, Asana, and more.",
      },
      {
        q: "How do I restore a deleted item?",
        a: 'Yes! You can restore deleted items from the "Trash" or "Deleted Items" section in your account settings.',
      },
      {
        q: "Is version history available?",
        a: 'Yes, version history is available for all your files. You can access it by navigating to the "Versions" tab in the file details view.',
      },
      {
        q: "How do notifications work?",
        a: "Notifications are sent to your email address and can be managed in your account settings. You can choose which types of notifications you want to receive.",
      },
    ],
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
      className={cn("size-3.5 shrink-0 overflow-visible fill-current", className)}
      aria-hidden
    >
      <path d="M40.421 215.579H471.579C493.868 215.579 512 233.711 512 256s-18.132 40.421-40.421 40.421H40.421C18.132 296.421 0 278.289 0 256s18.132-40.421 40.421-40.421z" />
      <path
        className={cn(
          "origin-center transition-all duration-300",
          open ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
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

  const [openItems, setOpenItems] = React.useState<Set<string>>(() => new Set())

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <section
      className={cn("w-full bg-card px-4 py-12 md:px-8 md:py-16", className)}
      aria-labelledby={`${uid}-title`}
      {...props}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 max-w-3xl md:mb-10">
          <h2
            id={`${uid}-title`}
            className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:mt-4">
            Last updated July 2025
          </p>
        </div>

        <div className="space-y-10 md:space-y-12">
          {faqCategories.map((category, catIdx) => (
            <div key={category.id} aria-labelledby={category.id}>
              <h3
                id={category.id}
                className="mb-2 text-lg font-semibold text-foreground md:text-xl"
              >
                {category.title}
              </h3>

              <div className="divide-y divide-border">
                {category.items.map((item, itemIdx) => {
                  const itemKey = `${catIdx}-${itemIdx}`
                  const isOpen = openItems.has(itemKey)
                  const buttonId = `${uid}-button-${itemKey}`
                  const panelId = `${uid}-panel-${itemKey}`

                  return (
                    <div key={itemKey}>
                      <h4>
                        <button
                          type="button"
                          id={buttonId}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => toggleItem(itemKey)}
                          className="flex w-full cursor-pointer items-center gap-4 py-5 text-start text-base font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring md:py-6"
                        >
                          <PlusMinusIcon
                            open={isOpen}
                            className="text-foreground"
                          />
                          <span className="min-w-0 flex-1">{item.q}</span>
                        </button>
                      </h4>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        aria-hidden={!isOpen}
                        inert={!isOpen ? true : undefined}
                        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out"
                      >
                        <div className="min-h-0 overflow-hidden">
                          <p className="ps-8 pb-5 text-base leading-relaxed text-muted-foreground md:pb-6">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
