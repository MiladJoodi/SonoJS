"use client"

import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Textarea } from "@sonojs/ui/components/textarea"

import teamImage from "./images/team.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

function TeamPanel({ className }: { className?: string }) {
  const [missing, setMissing] = React.useState(false)

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-muted",
        "lg:aspect-auto lg:h-[42rem] lg:max-w-md lg:flex-none",
        className
      )}
    >
      {missing ? null : (
        <img
          src={assetSrc(teamImage)}
          alt="Team collaborating at a desk"
          className="absolute inset-0 size-full object-cover object-top"
          onError={() => setMissing(true)}
        />
      )}
    </div>
  )
}

export default function ContactForm({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "flex w-full items-center justify-center bg-canvas px-4 py-10 md:px-8",
        className
      )}
      aria-labelledby="contact-form-heading"
      {...props}
    >
      <div className="flex w-full max-w-5xl flex-col items-stretch gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-10">
        <div className="mx-auto w-full max-w-xl lg:mx-0 lg:flex-1">
          <div className="mb-8 text-start">
            <p className="mb-3 text-sm font-medium tracking-wide text-primary">
              Contact
            </p>
            <h2
              id="contact-form-heading"
              className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              Work with our team
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
              Have a question, need support, or want to discuss your next
              project? We&apos;re here to help you ship with confidence.
            </p>
          </div>

          <form
            className="grid gap-5 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:grid-cols-2 sm:p-8"
            onSubmit={(event) => event.preventDefault()}

              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-06-name">Name</Label>
              <Input
                id="contact-06-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jordan Lee"
                required
                className="shadow-none"
              />
            </div>

            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-06-email">Email</Label>
              <Input
                id="contact-06-email"
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
              <Label htmlFor="contact-06-phone">Phone</Label>
              <Input
                id="contact-06-phone"
                name="phone"
                type="tel"
                dir="ltr"
                autoComplete="tel"
                placeholder="+1 800 259 854"
                className="shadow-none"
              />
            </div>

            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-06-company">Company</Label>
              <Input
                id="contact-06-company"
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="Acme Inc."
                className="shadow-none"
              />
            </div>

            <div className="col-span-full">
              <div className="grid gap-2 text-start">
                <Label htmlFor="contact-06-message">Message</Label>
                <Textarea
                  id="contact-06-message"
                  name="message"
                  rows={6}
                  placeholder="Tell us what you need…"
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

        <TeamPanel className="order-first mx-auto max-w-xl lg:order-last lg:mx-0" />
      </div>
    </section>
  )
}
