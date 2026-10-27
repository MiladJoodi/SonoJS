"use client"

import * as React from "react"
import {
  CheckCircle2Icon,
  DatabaseIcon,
  PackageIcon,
  SlidersHorizontalIcon,
  TerminalIcon,
  type LucideIcon,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@sonojs/ui/components/accordion"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

type Step = {
  id: string
  title: string
  subtitle: string
  icon: LucideIcon
  description: string
  buttonText: string
}

const STEPS: Step[] = [
  {
    id: "environment",
    title: "Configure your environment",
    subtitle: "Tokens & theme",
    icon: SlidersHorizontalIcon,
    description:
      "Point your app at SonoJS tokens, set the primary color, and confirm light/dark themes.",
    buttonText: "Edit settings",
  },
  {
    id: "project",
    title: "Connect your project",
    subtitle: "CLI ready",
    icon: TerminalIcon,
    description:
      "Install the SonoJS CLI and run init so components land in the right folder.",
    buttonText: "View CLI setup",
  },
  {
    id: "components",
    title: "Add your first components",
    subtitle: "Registry install",
    icon: PackageIcon,
    description:
      "Pull Button, Card, and Field with `npx @sonojs/ui@latest add` into your UI kit.",
    buttonText: "Browse components",
  },
  {
    id: "data",
    title: "Wire a real screen",
    subtitle: "Ship a block",
    icon: DatabaseIcon,
    description:
      "Drop in a workspace or settings block and hook it to your app’s routes.",
    buttonText: "Browse blocks",
  },
]

export default function ProgressChecklist({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [activeStep, setActiveStep] = React.useState(1)
  const [openItem, setOpenItem] = React.useState(
    () => (activeStep < STEPS.length ? STEPS[activeStep].id : "")
  )

  const handleComplete = () => {
    const next = activeStep + 1
    setActiveStep(next)
    setOpenItem(next < STEPS.length ? STEPS[next].id : "")
  }

  return (
    <section
      className={cn(
        "relative isolate flex w-full min-w-0 items-center justify-center overflow-hidden bg-white dark:bg-background px-4 py-10 text-foreground sm:py-12",
        className
      )}
      aria-labelledby="progress-checklist-04-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-18%] size-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full min-w-0 max-w-sm">
        <header className="text-start">
          <h2
            id="progress-checklist-04-heading"
            className="text-lg font-semibold text-foreground"
          >
            Quick start
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Set up SonoJS in your app in four simple steps.
          </p>
        </header>

        <Accordion
          type="single"
          collapsible
          className="mt-6 space-y-2"
          value={openItem}
          onValueChange={setOpenItem}
        >
          {STEPS.map((step, index) => {
            let status: "complete" | "current" | "upcoming" = "upcoming"
            if (index < activeStep) status = "complete"
            else if (index === activeStep) status = "current"

            const Icon = step.icon

            return (
              <AccordionItem
                key={step.id}
                value={step.id}
                className="rounded-[12px] border !border-b border-border/70 bg-card shadow-soft last:!border-b"
              >
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center gap-2">
                    {status === "complete" ? (
                      <span
                        aria-hidden
                        className="flex size-5 items-center justify-center"
                      >
                        <CheckCircle2Icon className="size-6 shrink-0 text-foreground" />
                      </span>
                    ) : (
                      <span
                        aria-hidden
                        className="size-5 shrink-0 rounded-full border border-border/70"
                      />
                    )}
                    <span
                      className={cn(
                        "text-sm font-medium",
                        status === "upcoming"
                          ? "text-muted-foreground/60"
                          : "text-foreground"
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="flex items-center justify-center rounded-md bg-muted/60 px-4 py-5 ring-1 ring-border/70 ring-inset">
                    <div className="max-w-xs text-center">
                      <Icon
                        aria-hidden
                        className="mx-auto size-7 shrink-0 text-muted-foreground"
                      />
                      <p className="mt-4 text-sm font-semibold text-muted-foreground">
                        {step.subtitle}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {step.description}
                      </p>
                      {status === "complete" ? (
                        <Button
                          type="button"
                          className="mt-6"
                          size="sm"
                          variant="outline"
                        >
                          {step.buttonText}
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          className="mt-6"
                          size="sm"
                          disabled={status === "upcoming"}
                          onClick={() => {
                            if (status === "current") handleComplete()
                          }}
                        >
                          {step.buttonText}
                        </Button>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}
