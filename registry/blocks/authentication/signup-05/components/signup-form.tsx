"use client"

import * as React from "react"
import { StarIcon } from "lucide-react"

import { AppleIcon } from "@/registry/icons/apple"
import { GoogleIcon } from "@/registry/icons/google"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"

const panelImage = "/blocks/signup-05/01.webp"
const profileImage = "/blocks/signup-05/02.webp"

function QuotePanel() {
  const [missing, setMissing] = React.useState(false)

  return (
    <aside className="relative h-[42rem] w-full max-w-md shrink-0 overflow-hidden rounded-3xl bg-muted">
      {missing ? null : (
        <img
          src={panelImage}
          alt=""
          className="absolute inset-0 size-full object-cover"
          onError={() => setMissing(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
      <figure className="relative flex h-full w-full flex-col justify-end gap-4 p-6 text-start text-white">
        <div className="flex gap-1" aria-label="5 out of 5">
          {Array.from({ length: 5 }, (_, index) => (
            <StarIcon
              key={index}
              className="size-4 fill-current"
              aria-hidden="true"
            />
          ))}
        </div>
        <blockquote className="text-h4">
          The account was ready before the rest of the team finished reading
          the invite.
        </blockquote>
        <figcaption className="flex items-center gap-3">
          <Avatar size="lg" className="ring-2 ring-white/30">
            <AvatarImage src={profileImage} alt="" />
            <AvatarFallback className="bg-white/20 text-white">NH</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium">Nora Hale</p>
            <p className="text-sm text-white/80">Founder, Northwind</p>
          </div>
        </figcaption>
      </figure>
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
        "flex w-full items-center justify-center bg-background px-4 py-8",
        className
      )}
      {...props}
    >
      <div className="flex w-full max-w-4xl flex-col items-center gap-8 lg:flex-row lg:justify-center">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <header className="space-y-1.5 text-start">
            <h1 className="text-h3 text-foreground">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Name, email, and a password. Google and Apple are optional.
            </p>
          </header>

          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-2">
              <Label htmlFor="signup-05-name">Name</Label>
              <Input
                id="signup-05-name"
                autoComplete="name"
                placeholder="Nora Hale"
                required
                className="h-[46px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-05-email">Email</Label>
              <Input
                id="signup-05-email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                required
                className="h-[46px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-05-password">Password</Label>
              <Input
                id="signup-05-password"
                type="password"
                autoComplete="new-password"
                required
                className="h-[46px]"
              />
            </div>
            <Button type="submit" className="h-[46px] w-full">
              Create account
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
        <QuotePanel />
      </div>
    </div>
  )
}
