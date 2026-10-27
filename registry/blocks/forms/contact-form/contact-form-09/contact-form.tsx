"use client"

import type * as React from "react"
import {
  ArrowRightIcon,
  MapPinIcon,
  MessagesSquareIcon,
  PhoneIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Textarea } from "@sonojs/ui/components/textarea"

const contactDetails = [
  {
    title: "Visit office",
    detail: "123 Main Street, City, Country",
    icon: MapPinIcon,
  },
  {
    title: "Call us",
    detail: "+158 996 888",
    icon: PhoneIcon,
    dir: "ltr" as const,
  },
  {
    title: "Chat to us",
    detail: "info@example.com",
    icon: MessagesSquareIcon,
    dir: "ltr" as const,
  },
] as const

export default function ContactForm({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full bg-muted px-4 py-10 md:px-8 md:py-14", className)}
      aria-labelledby="contact-form-heading"
      {...props}
    >
      <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
        <p className="mb-3 text-sm font-medium tracking-wide text-primary">
          Contact
        </p>
        <h2
          id="contact-form-heading"
          className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          We&apos;d love to hear from you
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Have a question, need support, or want to discuss your next project?
          Send a note and we&apos;ll take it from there.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <form
          className="grid gap-5 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft md:grid-cols-2 md:p-8"
          onSubmit={(event) => event.preventDefault()}

              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
          <div className="grid gap-2 text-start">
            <Label htmlFor="contact-09-name">Name</Label>
            <Input
              id="contact-09-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jordan Lee"
              required
              className="shadow-none"
            />
          </div>

          <div className="grid gap-2 text-start">
            <Label htmlFor="contact-09-email">Email</Label>
            <Input
              id="contact-09-email"
              name="email"
              type="email"
              dir="ltr"
              autoComplete="email"
              placeholder="jordan@company.com"
              required
              className="shadow-none"
            />
          </div>

          <div className="grid gap-2 text-start">
            <Label htmlFor="contact-09-phone">Phone</Label>
            <Input
              id="contact-09-phone"
              name="phone"
              type="tel"
              dir="ltr"
              autoComplete="tel"
              placeholder="+1 800 259 854"
              className="shadow-none"
            />
          </div>

          <div className="grid gap-2 text-start">
            <Label htmlFor="contact-09-company">Company</Label>
            <Input
              id="contact-09-company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Acme Inc."
              className="shadow-none"
            />
          </div>

          <div className="col-span-full">
            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-09-message">Message</Label>
              <Textarea
                id="contact-09-message"
                name="message"
                rows={6}
                placeholder="Write your message"
                required
                className="min-h-32 w-full resize-none shadow-none [field-sizing:fixed]"
              />
            </div>
            <Button
              type="submit"
              className="mt-6 h-[46px] w-full rounded-[12px] shadow-none sm:w-auto"
            >
              Send message
              <ArrowRightIcon className="size-4 icon-dir" aria-hidden="true" />
            </Button>
          </div>
        </form>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {contactDetails.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center gap-4 rounded-[12px] border border-border/70 bg-card px-4 py-6 text-center shadow-soft"

              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p
                  className="mt-1.5 text-sm leading-relaxed text-muted-foreground"
                  dir={"dir" in item ? item.dir : undefined}
                >
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
