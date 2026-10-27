"use client"

import type * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Textarea } from "@sonojs/ui/components/textarea"

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
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-8 text-start md:mb-10">
          <p className="mb-3 text-sm font-medium tracking-wide text-primary">
            Contact
          </p>
          <h2
            id="contact-form-heading"
            className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Let&apos;s build something great
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Have a question, need support, or want to discuss your next project?
            We typically reply within one business day.
          </p>
        </div>

        <form
          className="rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8"
          onSubmit={(event) => event.preventDefault()}

              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jordan Lee"
                required
                className="shadow-none"
              />
            </div>

            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
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
              <Label htmlFor="contact-phone">Phone</Label>
              <Input
                id="contact-phone"
                name="phone"
                type="tel"
                dir="ltr"
                autoComplete="tel"
                placeholder="+1 800 259 854"
                className="shadow-none"
              />
            </div>

            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-company">Company</Label>
              <Input
                id="contact-company"
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="Acme Inc."
                className="shadow-none"
              />
            </div>

            <div className="grid gap-2 text-start sm:col-span-2">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                name="message"
                rows={6}
                placeholder="Tell us about your goals, timeline, and anything we should know…"
                required
                className="min-h-32 w-full resize-none shadow-none [field-sizing:fixed]"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="mt-6 h-[46px] w-full rounded-[12px] shadow-none sm:w-auto"
          >
            Send message
            <ArrowRightIcon className="size-4 icon-dir" aria-hidden="true" />
          </Button>
        </form>
      </div>
    </section>
  )
}
