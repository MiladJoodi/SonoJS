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
] as const

export default function ContactForm({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full bg-canvas px-4 py-12 md:px-8 md:py-16", className)}
      style={{ backgroundColor: "var(--canvas, #f3f3f4)" }}
      aria-labelledby="contact-form-heading"
      {...props}
    >
      <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
        <p className="mb-3 text-sm font-medium tracking-wide text-primary">
          Contact
        </p>
        <h2
          id="contact-form-heading"
          className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          Find us anytime
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Send a message, call the desk, or stop by — the map below points to
          our main office.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-start gap-8 max-lg:max-w-3xl lg:grid-cols-2 lg:gap-10">
        <form
          className="space-y-5 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8"
          onSubmit={(event) => event.preventDefault()}

              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-08-name">Name</Label>
              <Input
                id="contact-08-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jordan Lee"
                required
                className="shadow-none"
              />
            </div>
            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-08-email">Email</Label>
              <Input
                id="contact-08-email"
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
              <Label htmlFor="contact-08-phone">Phone</Label>
              <Input
                id="contact-08-phone"
                name="phone"
                type="tel"
                dir="ltr"
                autoComplete="tel"
                placeholder="+1 800 259 854"
                className="shadow-none"
              />
            </div>
            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-08-company">Company</Label>
              <Input
                id="contact-08-company"
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="Acme Inc."
                className="shadow-none"
              />
            </div>
          </div>

          <div className="grid gap-2 text-start">
            <Label htmlFor="contact-08-message">Message</Label>
            <Textarea
              id="contact-08-message"
              name="message"
              rows={6}
              placeholder="Write your message"
              required
              className="min-h-32 w-full resize-none shadow-none [field-sizing:fixed]"
            />
          </div>

          <Button
            type="submit"
            className="h-[46px] w-full rounded-[12px] shadow-none"
          >
            Send message
            <ArrowRightIcon className="size-4 icon-dir" aria-hidden="true" />
          </Button>
        </form>

        <div className="flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {contactDetails.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft"

              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-primary/10 text-primary">
                  <item.icon className="size-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 text-start">
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p
                    className="mt-1 text-sm leading-relaxed text-muted-foreground"
                    dir={"dir" in item ? item.dir : undefined}
                  >
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-2 h-72 overflow-hidden rounded-[12px] border border-border/70 shadow-soft sm:h-80"
              style={{
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
            <iframe
              title="Office location map"
              src="https://maps.google.com/maps?q=New+York&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 size-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
