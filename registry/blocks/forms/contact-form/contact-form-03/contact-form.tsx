"use client"

import type * as React from "react"
import {
  ArrowRightIcon,
  MapPinIcon,
  MessagesSquareIcon,
  PhoneIcon,
  PrinterIcon,
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
  {
    title: "Fax",
    detail: "+1 548 2588",
    icon: PrinterIcon,
    dir: "ltr" as const,
  },
]

export default function ContactForm({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full px-4 md:px-8", className)}
      aria-labelledby="contact-form-heading"
      {...props}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-3 text-sm font-medium tracking-wide text-primary">
            Contact
          </p>
          <h2
            id="contact-form-heading"
            className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Start a conversation
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Pick the channel that fits — or send a note and we&apos;ll route it
            to the right person.
          </p>
        </div>

        <div className="space-y-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactDetails.map((item) => (
              <div
                key={item.title}
                className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-[12px] bg-primary/10 text-primary">
                  <item.icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-start text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p
                  className="mt-1.5 text-start text-sm leading-relaxed text-muted-foreground"
                  dir={item.dir}
                >
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <form
            className="max-w-xl space-y-5 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2 text-start">
                <Label htmlFor="contact-03-name">Name</Label>
                <Input
                  id="contact-03-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jordan Lee"
                  required
                  className="shadow-none"
                />
              </div>
              <div className="grid gap-2 text-start">
                <Label htmlFor="contact-03-email">Email</Label>
                <Input
                  id="contact-03-email"
                  name="email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  placeholder="jordan@company.com"
                  required
                  className="shadow-none"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2 text-start">
                <Label htmlFor="contact-03-phone">Phone</Label>
                <Input
                  id="contact-03-phone"
                  name="phone"
                  type="tel"
                  dir="ltr"
                  autoComplete="tel"
                  placeholder="+1 800 259 854"
                  className="shadow-none"
                />
              </div>
              <div className="grid gap-2 text-start">
                <Label htmlFor="contact-03-company">Company</Label>
                <Input
                  id="contact-03-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Acme Inc."
                  className="shadow-none"
                />
              </div>
            </div>

            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-03-message">Message</Label>
              <Textarea
                id="contact-03-message"
                name="message"
                rows={6}
                placeholder="Share a bit of context…"
                required
                className="min-h-32 w-full resize-none shadow-none [field-sizing:fixed]"
              />
            </div>

            <Button type="submit" className="h-[46px] rounded-[12px] shadow-none">
              Send message
              <ArrowRightIcon className="size-4 icon-dir" aria-hidden="true" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
