"use client"

import { AppleIcon } from "@/registry/icons/apple"
import { GoogleIcon } from "@/registry/icons/google"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"

const controlClass =
  "h-[46px] rounded-[12px] border-zinc-700 bg-zinc-900 text-zinc-50 shadow-none placeholder:text-zinc-500"

export default function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "dark flex min-h-[36rem] w-full items-center justify-center bg-zinc-950 px-6 py-10 text-zinc-50",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "[--login-card-padding:1.5rem] sm:[--login-card-padding:2rem]",
          "flex w-full max-w-md flex-col gap-8 rounded-[12px] border border-zinc-800 bg-zinc-900 p-(--login-card-padding)",
          "shadow-[0_2px_4px_-1px_rgba(0,0,0,0.4),0_28px_56px_-28px_rgba(0,0,0,0.65)]"
        )}
      >
        <header className="flex flex-col items-start gap-3">
          <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
          <div className="space-y-1.5">
            <h1 className="text-h3 text-zinc-50">Create an account</h1>
            <p className="text-sm text-zinc-400">
              Dark workspace. Email and password to get started.
            </p>
          </div>
        </header>

        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-2">
            <Label htmlFor="signup-06-name" className="text-zinc-200">
              Name
            </Label>
            <Input
              id="signup-06-name"
              autoComplete="name"
              placeholder="Lila Reyes"
              required
              className={controlClass}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="signup-06-email" className="text-zinc-200">
              Email
            </Label>
            <Input
              id="signup-06-email"
              type="email"
              dir="ltr"
              autoComplete="email"
              placeholder="name@example.com"
              required
              className={controlClass}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="signup-06-password" className="text-zinc-200">
              Password
            </Label>
            <Input
              id="signup-06-password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              required
              className={controlClass}
            />
          </div>
          <Button
            type="submit"
            className="mt-1 h-[46px] w-full rounded-[12px] shadow-none"
          >
            Create account
          </Button>
        </form>

        <div className="flex items-center gap-3">
          <Separator className="flex-1 bg-zinc-800" />
          <span className="text-xs text-zinc-500">or</span>
          <Separator className="flex-1 bg-zinc-800" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-[46px] rounded-[12px] border-zinc-700 bg-zinc-900 text-zinc-50 shadow-none hover:bg-zinc-800 hover:text-zinc-50"
          >
            <GoogleIcon />
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-[46px] rounded-[12px] border-zinc-700 bg-zinc-900 text-zinc-50 shadow-none hover:bg-zinc-800 hover:text-zinc-50"
          >
            <AppleIcon />
            Apple
          </Button>
        </div>

        <p className="text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <a
            href="#"
            className="cursor-pointer font-medium text-zinc-50 underline-offset-4 hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
