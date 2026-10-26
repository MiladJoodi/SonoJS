"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { AppleIcon } from "@/registry/icons/apple"
import { GoogleIcon } from "@/registry/icons/google"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"

/** Optional product screenshot for the marketing column. */
const productSrc = "/images/blocks/authentication/signup/signup-08/product.webp"

const controlClass = "shadow-none"

const points = [
  "Start free. Invite your team when you're ready.",
  "Company workspace with roles and audit trails.",
  "Billing stays optional until you scale.",
]

function BrandColumn() {
  const [missingProduct, setMissingProduct] = React.useState(false)

  return (
    <aside
      className={cn(
        "flex flex-1 flex-col justify-between gap-6 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft",
        "md:gap-10 md:p-8 lg:p-10"
      )}
    >
      <div className="space-y-4 md:space-y-6">
        <span className="text-sm font-semibold tracking-wide text-foreground">
          Sono
        </span>
        <div className="space-y-3">
          <h2 className="max-w-sm text-h3 text-start text-foreground">
            Open a workspace for your product team.
          </h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Company name and work email. Google and Apple stay optional.
          </p>
        </div>
        <ul className="hidden space-y-3 sm:block">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2 text-start text-sm text-foreground"
            >
              <CheckIcon
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {!missingProduct ? (
        <div className="hidden overflow-hidden rounded-[12px] border border-border/70 bg-muted sm:block">
          <img
            src={productSrc}
            alt=""
            className="aspect-[16/10] w-full object-cover object-top"
            onError={() => setMissingProduct(true)}
          />
        </div>
      ) : (
        <div className="hidden aspect-[16/10] w-full items-center justify-center rounded-[12px] border border-dashed border-border/70 bg-muted/50 px-4 text-center text-sm text-muted-foreground sm:flex">
          Add product.webp here
        </div>
      )}
    </aside>
  )
}

export default function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-canvas px-4 py-8",
        className
      )}
      {...props}
    >
      <div className="flex w-full max-w-5xl flex-col gap-6 md:flex-row md:items-stretch md:gap-8">
        <div className="order-2 md:order-1 md:flex-1">
          <BrandColumn />
        </div>

        <div
          className={cn(
            "[--login-card-padding:1.5rem] sm:[--login-card-padding:2rem]",
            "order-1 mx-auto flex w-full max-w-md flex-col justify-center gap-6 rounded-[12px] border border-border/70 bg-card p-(--login-card-padding) md:order-2 md:mx-0 md:shrink-0",
            "shadow-soft",
            ""
          )}
        >
          <header className="flex flex-col items-start gap-3">
            <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
            <div className="space-y-1.5">
              <h1 className="text-h3 text-foreground">Start your trial</h1>
              <p className="text-sm text-muted-foreground">
                Company details and a work email.
              </p>
            </div>
          </header>

          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-2">
              <Label htmlFor="signup-08-company">Company</Label>
              <Input
                id="signup-08-company"
                autoComplete="organization"
                placeholder="Cove Studio"
                required
                className={controlClass}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-08-email">Work email</Label>
              <Input
                id="signup-08-email"
                type="email"
                dir="ltr"
                autoComplete="email"
                placeholder="you@company.com"
                required
                className={controlClass}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-08-password">Password</Label>
              <Input
                id="signup-08-password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                required
                className={controlClass}
              />
            </div>
            <Button
              type="submit"
              className="mt-1 w-full shadow-none"
            >
              Create workspace
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <div className="grid gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-[46px] w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted"
            >
              <GoogleIcon />
              Continue with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-[46px] w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted"
            >
              <AppleIcon />
              Continue with Apple
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="#"
              className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
