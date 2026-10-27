"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@sonojs/ui/components/dialog"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { cn } from "@/lib/utils"

export default function Newsletter({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [open, setOpen] = React.useState(true)
  const [subscribed, setSubscribed] = React.useState(false)

  return (
    <section
      className={cn(
        "flex min-h-[560px] w-full min-w-0 items-center justify-center bg-canvas p-6 text-foreground",
        className
      )}
      {...props}
    >
      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) setSubscribed(false)
        }}
      >
        <div className="max-w-sm text-center">
          <p className="mb-3 text-sm font-medium text-primary">
            The monthly edition
          </p>
          <h1 className="text-h1 font-semibold tracking-tight text-foreground">
            A little more perspective.
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Notes on design, development, and the products we use.
          </p>
          <DialogTrigger asChild>
            <Button type="button" className="mt-6">
              Subscribe to updates
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent
          className="gap-0 p-0 sm:max-w-md"
          style={{ maxWidth: "min(28rem, calc(100% - 2rem))" }}
        >
          <DialogHeader className="border-b border-border/70 px-6 py-5 text-start">
            <DialogTitle>
              {subscribed
                ? "You're on the list."
                : "Good ideas, once a month."}
            </DialogTitle>
            <DialogDescription>
              {subscribed
                ? "Thanks for subscribing. Look out for the next edition in your inbox."
                : "A short collection of useful articles, practical resources, and things worth trying."}
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-5">
            {subscribed ? (
              <p
                role="status"
                className="text-sm leading-relaxed text-muted-foreground"
              >
                You’re subscribed. We’ll send the next edition when it’s ready.
              </p>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  setSubscribed(true)
                }}
                className="space-y-5"
              >
                <div className="grid gap-2 text-start">
                  <Label htmlFor="newsletter-10-email">Email address</Label>
                  <Input
                    id="newsletter-10-email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
                <p className="text-xs text-muted-foreground">
                  No spam. Unsubscribe whenever you like.
                </p>
              </form>
            )}
          </div>

          <DialogFooter className="border-t border-border/70 px-6 py-4 sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                {subscribed ? "Done" : "Maybe later"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
