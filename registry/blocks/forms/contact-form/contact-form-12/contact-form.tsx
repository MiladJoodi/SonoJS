"use client"

import type * as React from "react"
import { ArrowRightIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Textarea } from "@sonojs/ui/components/textarea"

const contactInfo = [
  {
    title: "Our Location",
    lines: ["123 Business Street", "New York, NY 10001"],
    icon: MapPinIcon,
  },
  {
    title: "Phone Number",
    lines: ["+1 (555) 123-4567"],
    icon: PhoneIcon,
    dir: "ltr" as const,
  },
  {
    title: "Email Address",
    lines: ["contact@business.com"],
    icon: MailIcon,
    dir: "ltr" as const,
  },
] as const

const hours = [
  { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
  { day: "Saturday", time: "10:00 AM - 4:00 PM" },
  { day: "Sunday", time: "Closed" },
] as const

const cardClass = cn(
  "rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-7"
)

const cardSurfaceStyle = {
  backgroundColor: "var(--card, #ffffff)",
  boxShadow:
    "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
} as const

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
      <div className="mx-auto grid max-w-7xl items-start gap-6 max-lg:max-w-3xl lg:grid-cols-2 lg:gap-8">
        <div className={cardClass} style={cardSurfaceStyle}>
          <p className="mb-3 text-sm font-medium tracking-wide text-primary">
            Message us
          </p>
          <h2
            id="contact-form-heading"
            className="mb-3 text-3xl font-bold tracking-tight text-foreground"
          >
            Get in touch
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Feel free to contact us — we&apos;ll get back to you as soon as
            possible, usually within one business day.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2 text-start">
                <Label htmlFor="contact-12-name">Name</Label>
                <Input
                  id="contact-12-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jordan Lee"
                  required
                  className="shadow-none"
                />
              </div>
              <div className="grid gap-2 text-start">
                <Label htmlFor="contact-12-email">Email</Label>
                <Input
                  id="contact-12-email"
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

            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-12-phone">Phone</Label>
              <Input
                id="contact-12-phone"
                name="phone"
                type="tel"
                dir="ltr"
                autoComplete="tel"
                placeholder="+1 800 259 854"
                className="shadow-none"
              />
            </div>

            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-12-message">Message</Label>
              <Textarea
                id="contact-12-message"
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
        </div>

        <div className="flex flex-col gap-6">
          <div className={cardClass} style={cardSurfaceStyle}>
            <h3 className="mb-6 text-lg font-semibold tracking-tight text-foreground">
              Contact Information
            </h3>
            <div className="space-y-5">
              {contactInfo.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-[12px] bg-muted/60 p-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-primary/10 text-primary">
                    <item.icon className="size-5" aria-hidden="true" />
                  </div>
                  <div className="text-start">
                    <h4 className="mb-1.5 text-sm font-semibold text-primary">
                      {item.title}
                    </h4>
                    {item.lines.map((line) => (
                      <p
                        key={line}
                        className="text-sm leading-relaxed text-muted-foreground"
                        dir={"dir" in item ? item.dir : undefined}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={cardClass} style={cardSurfaceStyle}>
            <h3 className="mb-6 text-lg font-semibold tracking-tight text-foreground">
              Hours of Operation
            </h3>
            <div className="divide-y divide-border/70">
              {hours.map((row) => (
                <div
                  key={row.day}
                  className="flex flex-wrap items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0"
                >
                  <span className="text-sm text-muted-foreground">
                    {row.day}
                  </span>
                  <span
                    className="text-sm font-medium text-foreground"
                    dir="ltr"
                  >
                    {row.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
