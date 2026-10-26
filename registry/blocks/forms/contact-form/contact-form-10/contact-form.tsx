"use client"

import type * as React from "react"
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

export default function ContactForm({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("flex w-full flex-1 flex-col bg-background lg:flex-row", className)}
      aria-labelledby="contact-form-heading"
      {...props}
    >
      <div className="relative hidden self-stretch overflow-hidden lg:block lg:w-1/2 lg:min-h-full">
        <img
          src={assetSrc(teamImage)}
          alt="Team collaborating in a modern office"
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-primary/10"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 p-8">
          <div className="max-w-sm rounded-[12px] border border-white/20 bg-background/90 p-5 shadow-soft backdrop-blur-sm">
            <p className="text-sm font-medium text-primary">On-site & remote</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Meet the team in person or collaborate online — same care either
              way.
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-4 py-10 md:px-8 lg:w-1/2 lg:py-16 xl:px-16">
        <div className="mx-auto w-full max-w-xl">
          <div className="mb-10 text-start">
            <p className="mb-3 text-sm font-medium tracking-wide text-primary">
              Contact
            </p>
            <h2
              id="contact-form-heading"
              className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              Let&apos;s get started
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Have a question, need support, or want to discuss your next
              project? Share a few details and we&apos;ll respond soon.
            </p>
          </div>

          <form
            className="grid gap-5 sm:grid-cols-2"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-10-name">Name</Label>
              <Input
                id="contact-10-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jordan Lee"
                required
                className="shadow-none"
              />
            </div>

            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-10-email">Email</Label>
              <Input
                id="contact-10-email"
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
              <Label htmlFor="contact-10-phone">Phone</Label>
              <Input
                id="contact-10-phone"
                name="phone"
                type="tel"
                dir="ltr"
                autoComplete="tel"
                placeholder="+1 800 259 854"
                className="shadow-none"
              />
            </div>

            <div className="grid gap-2 text-start">
              <Label htmlFor="contact-10-company">Company</Label>
              <Input
                id="contact-10-company"
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="Acme Inc."
                className="shadow-none"
              />
            </div>

            <div className="col-span-full">
              <div className="grid gap-2 text-start">
                <Label htmlFor="contact-10-message">Message</Label>
                <Textarea
                  id="contact-10-message"
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
    </section>
  )
}
