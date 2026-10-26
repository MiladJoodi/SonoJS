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
      className={cn("w-full", className)}
      aria-labelledby="contact-form-heading"
      {...props}
    >
      <div className="mx-auto max-w-6xl overflow-hidden px-4 max-lg:max-w-2xl md:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8 md:p-10">
            <p className="mb-3 text-sm font-medium tracking-wide text-primary">
              Get in touch
            </p>
            <h2
              id="contact-form-heading"
              className="text-3xl font-bold tracking-tight text-foreground"
            >
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Have a specific inquiry? Our team is ready to engage — share a few
              details and we&apos;ll follow up promptly.
            </p>

            <form
              className="mt-8 flex flex-1 flex-col space-y-5"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid gap-2 text-start">
                <Label htmlFor="contact-11-name">Name</Label>
                <Input
                  id="contact-11-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jordan Lee"
                  required
                  className="shadow-none"
                />
              </div>

              <div className="grid gap-2 text-start">
                <Label htmlFor="contact-11-email">Email</Label>
                <Input
                  id="contact-11-email"
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
                <Label htmlFor="contact-11-phone">Phone</Label>
                <Input
                  id="contact-11-phone"
                  name="phone"
                  type="tel"
                  dir="ltr"
                  autoComplete="tel"
                  placeholder="+1 800 259 854"
                  className="shadow-none"
                />
              </div>

              <div className="grid gap-2 text-start">
                <Label htmlFor="contact-11-message">Message</Label>
                <Textarea
                  id="contact-11-message"
                  name="message"
                  rows={6}
                  placeholder="Write your message"
                  required
                  className="min-h-32 w-full resize-none shadow-none [field-sizing:fixed]"
                />
              </div>

              <Button
                type="submit"
                className="mt-auto h-[46px] w-full rounded-[12px] shadow-none"
              >
                Send message
                <ArrowRightIcon
                  className="size-4 icon-dir"
                  aria-hidden="true"
                />
              </Button>
            </form>
          </div>

          <div className="relative min-h-[400px] overflow-hidden rounded-[12px] border border-border/70 shadow-soft lg:min-h-full">
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
