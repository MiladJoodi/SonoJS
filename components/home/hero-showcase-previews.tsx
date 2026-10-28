"use client"

import { AppleIcon } from "@/registry/icons/apple"
import { GoogleIcon } from "@/registry/icons/google"
import { TinyAreaChart } from "@/registry/charts/area/tiny-area-chart"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { cn } from "@/lib/utils"

export function ShowcaseLoginPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[380px] rounded-[12px] border border-border/70 bg-card p-5 shadow-soft",
        className
      )}
    >
      <header className="mb-4 space-y-1 text-start">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          Welcome back
        </h3>
        <p className="text-sm text-muted-foreground">Sign in to your account</p>
      </header>

      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid gap-1.5 text-start">
          <Label htmlFor="hero-showcase-email" className="text-[13px]">
            Email
          </Label>
          <Input
            id="hero-showcase-email"
            type="email"
            placeholder="name@example.com"
            autoComplete="off"
            tabIndex={-1}
            className="h-11 shadow-none"
            readOnly
            defaultValue=""
          />
        </div>
        <div className="grid gap-1.5 text-start">
          <Label htmlFor="hero-showcase-password" className="text-[13px]">
            Password
          </Label>
          <Input
            id="hero-showcase-password"
            type="password"
            placeholder="••••••••"
            autoComplete="off"
            tabIndex={-1}
            className="h-11 shadow-none"
            readOnly
            defaultValue=""
          />
        </div>
        <Button
          type="submit"
          className="mt-1 h-11 w-full shadow-none"
          tabIndex={-1}
        >
          Sign in
        </Button>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            className="h-11 border-border/70 bg-card shadow-none hover:bg-muted"
            tabIndex={-1}
          >
            <GoogleIcon className="size-4" />
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 border-border/70 bg-card shadow-none hover:bg-muted"
            tabIndex={-1}
          >
            <AppleIcon className="size-4" />
            Apple
          </Button>
        </div>
      </form>
    </div>
  )
}

export function ShowcaseChartPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[420px] overflow-hidden rounded-[12px] border border-border/70 bg-card p-1 shadow-soft sm:p-2",
        className
      )}
    >
      <TinyAreaChart
        title="Weekly active"
        subtitle="Last 6 months"
        className="max-w-none border-0 shadow-none"
      />
    </div>
  )
}
