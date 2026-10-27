"use client"

import type * as React from "react"
import { ArrowRightIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

import { FacebookIcon } from "@/registry/icons/facebook"
import { LinkedinIcon } from "@/registry/icons/linkedin"
import { XIcon } from "@/registry/icons/x"
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
    title: "Mail us",
    detail: "info@example.com",
    icon: MailIcon,
    dir: "ltr" as const,
  },
] as const

const social = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
  { label: "X", href: "#", Icon: XIcon },
] as const

const socialClass = cn(
  "inline-flex size-9 cursor-pointer items-center justify-center rounded-full",
  "bg-primary-foreground/95 text-primary transition-transform hover:scale-105",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50",
  "[&_path]:fill-current"
)

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
      <div className="mx-auto max-w-5xl max-lg:max-w-3xl">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <p className="mb-3 text-sm font-medium tracking-wide text-primary">
            Contact
          </p>
          <h2
            id="contact-form-heading"
            className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Connect with our studio
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Prefer a call, email, or a short brief? Use the form — or reach us
            directly from the panel.
          </p>
        </div>

        <div className="grid items-stretch gap-y-2 rounded-[12px] border border-border/70 bg-card p-2 shadow-soft lg:grid-cols-5"
              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
          <div className="relative h-full max-lg:order-1 overflow-hidden rounded-[10px] bg-primary px-6 py-8 text-primary-foreground sm:px-8 sm:py-10 lg:col-span-2">
            <div className="relative z-10 flex h-full flex-col">
              <p className="mb-8 text-sm font-medium text-primary-foreground/75">
                Direct lines
              </p>
              <ul className="space-y-10">
                {contactDetails.map((item) => (
                  <li key={item.title} className="flex items-start gap-3.5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-primary-foreground/15">
                      <item.icon
                        className="size-4 text-primary-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="text-start">
                      <h3 className="text-sm font-semibold text-primary-foreground">
                        {item.title}
                      </h3>
                      <p
                        className="mt-1.5 text-sm leading-relaxed text-primary-foreground/80"
                        dir={"dir" in item ? item.dir : undefined}
                      >
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <ul className="mt-auto flex flex-wrap gap-3 pt-14">
                {social.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a href={href} className={socialClass} aria-label={label}>
                      <Icon className="size-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="pointer-events-none absolute -bottom-20 -end-20 size-56 rounded-full bg-primary-foreground/15"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -top-16 -start-10 size-40 rounded-full bg-primary-foreground/10"
              aria-hidden="true"
            />
          </div>

          <div className="flex flex-col justify-center px-4 py-6 lg:col-span-3 lg:px-8 lg:py-8">
            <form
              className="grid gap-5 sm:grid-cols-2"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid gap-2 text-start">
                <Label htmlFor="contact-07-name">Name</Label>
                <Input
                  id="contact-07-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jordan Lee"
                  required
                  className="shadow-none"
                />
              </div>

              <div className="grid gap-2 text-start">
                <Label htmlFor="contact-07-email">Email</Label>
                <Input
                  id="contact-07-email"
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
                <Label htmlFor="contact-07-phone">Phone</Label>
                <Input
                  id="contact-07-phone"
                  name="phone"
                  type="tel"
                  dir="ltr"
                  autoComplete="tel"
                  placeholder="+1 800 259 854"
                  className="shadow-none"
                />
              </div>

              <div className="grid gap-2 text-start">
                <Label htmlFor="contact-07-company">Company</Label>
                <Input
                  id="contact-07-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Acme Inc."
                  className="shadow-none"
                />
              </div>

              <div className="col-span-full">
                <div className="grid gap-2 text-start">
                  <Label htmlFor="contact-07-message">Message</Label>
                  <Textarea
                    id="contact-07-message"
                    name="message"
                    rows={6}
                    placeholder="Write your message"
                    required
                    className="min-h-32 w-full resize-none shadow-none [field-sizing:fixed]"
                  />
                </div>
                <Button
                  type="submit"
                  className="mt-6 h-[46px] w-full rounded-[12px] shadow-none"
                >
                  Send message
                  <ArrowRightIcon
                    className="size-4 icon-dir"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
