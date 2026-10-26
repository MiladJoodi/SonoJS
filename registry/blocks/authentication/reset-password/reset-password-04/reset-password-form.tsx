"use client"

import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

export default function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "[--login-card-padding:1.5rem] sm:[--login-card-padding:2rem]",
        "flex w-full flex-col items-center gap-6 rounded-[12px] border border-border/70 bg-card p-(--login-card-padding) text-center",
        "shadow-soft",
        className
      )}
      {...props}
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <CheckIcon className="size-7" />
      </span>
      <div className="space-y-1.5">
        <h1 className="text-h3 text-foreground">Password updated</h1>
        <p className="text-sm text-muted-foreground">
          Your password was reset. You can sign in with the new one.
        </p>
      </div>
      <Button
        type="button"
        className="mt-2 h-[46px] w-full rounded-[12px] shadow-none"
      >
        Back to sign in
      </Button>
    </div>
  )
}
