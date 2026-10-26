"use client"

import type * as React from "react"
import { ArrowRightIcon, MailIcon } from "lucide-react"

import { FacebookIcon } from "@/registry/icons/facebook"
import { LinkedinIcon } from "@/registry/icons/linkedin"
import { XIcon } from "@/registry/icons/x"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Textarea } from "@sonojs/ui/components/textarea"

const social = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
  { label: "X", href: "#", Icon: XIcon },
] as const

const socialClass = cn(
  "inline-flex size-10 cursor-pointer items-center justify-center rounded-full",
  "border border-border/70 bg-card text-muted-foreground shadow-soft",
  "transition-colors hover:border-primary/30 hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
  "[&_path]:fill-current"
)

export default function ContactForm({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full px-4 md:px-6", className)}
      aria-labelledby="contact-form-heading"
      {...props}
    >
      <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-2 md:gap-14">
        <div className="text-start">
          <div className="mb-10 border-s-2 border-primary ps-5">
            <p className="mb-3 text-sm font-medium tracking-wide text-primary">
              Let&apos;s talk
            </p>
            <h2
              id="contact-form-heading"
              className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              Tell us about your next idea
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Have a brand to develop or a product to ship? We&apos;d love to
              hear about your project and help you move forward.
            </p>
          </div>

          <div className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Email
            </h3>
            <a
              href="mailto:info@example.com"
              className="mt-4 flex cursor-pointer items-center gap-4 rounded-[12px] p-1 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MailIcon className="size-4" aria-hidden="true" />
              </div>
              <span className="text-start">
                <span className="block text-sm text-muted-foreground">Mail</span>
                <span className="font-semibold text-primary" dir="ltr">
                  info@example.com
                </span>
              </span>
            </a>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Socials
            </h3>
            <ul className="mt-4 flex flex-wrap gap-3">
              {social.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} className={socialClass} aria-label={label}>
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form
          className="space-y-5 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-05-name">Name</Label>
              <Input
                id="contact-05-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jordan Lee"
                required
                className="shadow-none"
              />
            </div>
            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-05-email">Email</Label>
              <Input
                id="contact-05-email"
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
            <Label htmlFor="contact-05-phone">Phone</Label>
            <Input
              id="contact-05-phone"
              name="phone"
              type="tel"
              dir="ltr"
              autoComplete="tel"
              placeholder="+1 800 259 854"
              className="shadow-none"
            />
          </div>

          <div className="grid gap-2 text-start">
            <Label htmlFor="contact-05-message">Message</Label>
            <Textarea
              id="contact-05-message"
              name="message"
              rows={6}
              placeholder="What are you working on?"
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
    </section>
  )
}
