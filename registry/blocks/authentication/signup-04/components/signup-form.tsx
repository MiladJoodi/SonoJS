"use client"

import { CheckIcon } from "lucide-react"

import { AppleIcon } from "@/registry/icons/apple"
import { GoogleIcon } from "@/registry/icons/google"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"

const points = [
  "Start with an email. Nothing else is required yet.",
  "Google and Apple stay optional.",
  "You can sign in again from the same address.",
]

function BrandPanel() {
  return (
    <aside className="flex flex-1 flex-col justify-between gap-10 bg-primary p-8 text-primary-foreground md:p-10">
      <p className="text-sm font-medium tracking-wide">Sono</p>
      <div className="space-y-6">
        <h2 className="max-w-sm text-h3 text-start">
          Open an account without leaving the brand.
        </h2>
        <ul className="space-y-3">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-start text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
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
        "flex min-h-[36rem] w-full flex-col bg-background md:flex-row",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <header className="space-y-1.5 text-start">
            <h1 className="text-h3 text-foreground">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email, or continue with Google or Apple.
            </p>
          </header>

          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-2">
              <Label htmlFor="signup-04-email">Email</Label>
              <Input
                id="signup-04-email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                required
                className="h-[46px]"
              />
            </div>
            <Button type="submit" className="h-[46px] w-full">
              Continue
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <div className="grid gap-2">
            <Button type="button" variant="outline" className="h-[46px] w-full">
              <GoogleIcon />
              Continue with Google
            </Button>
            <Button type="button" variant="outline" className="h-[46px] w-full">
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
      <BrandPanel />
    </div>
  )
}
