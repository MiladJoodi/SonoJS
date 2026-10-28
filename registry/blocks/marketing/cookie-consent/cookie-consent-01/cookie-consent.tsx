"use client"

import * as React from "react"
import { CookieIcon, XIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Label } from "@sonojs/ui/components/label"
import { cn } from "@/lib/utils"

type Prefs = {
  analytics: boolean
  marketing: boolean
}

const DEFAULT_PREFS: Prefs = {
  analytics: true,
  marketing: false,
}

export default function CookieConsent01({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [visible, setVisible] = React.useState(true)
  const [manage, setManage] = React.useState(false)
  const [prefs, setPrefs] = React.useState<Prefs>(DEFAULT_PREFS)

  const dismiss = () => {
    setVisible(false)
    setManage(false)
  }

  if (!visible) {
    return (
      <div
        className={cn(
          "flex w-full items-center justify-center bg-canvas px-4 py-8",
          className
        )}
        {...props}
      >
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={() => setVisible(true)}
        >
          Show cookie banner
        </Button>
      </div>
    )
  }

  return (
    <div
      className={cn("w-full bg-canvas px-4 py-6 sm:px-6", className)}
      role="region"
      aria-label="Cookie consent"
      {...props}
    >
      {!manage ? (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:flex-row sm:items-center sm:gap-5 sm:p-5">
          <div className="flex min-w-0 flex-1 items-start gap-3 text-start">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <CookieIcon className="size-4 text-primary" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                We use cookies
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Necessary cookies keep the site working. Optional ones help us
                improve and measure. Read our{" "}
                <a
                  href="#"
                  className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              type="button"
              variant="ghost"
              className="h-10 cursor-pointer sm:h-[46px]"
              onClick={() => setManage(true)}
            >
              Manage
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-10 cursor-pointer sm:h-[46px]"
              onClick={dismiss}
            >
              Reject
            </Button>
            <Button
              type="button"
              className="h-10 cursor-pointer sm:h-[46px]"
              onClick={dismiss}
            >
              Accept
            </Button>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
          <header className="mb-5 flex items-start justify-between gap-3 text-start">
            <div>
              <h2 className="text-base font-semibold tracking-tight">
                Cookie preferences
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Choose what we can store on this device.
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="shrink-0 cursor-pointer"
              onClick={() => setManage(false)}
              aria-label="Close preferences"
            >
              <XIcon className="size-4" aria-hidden />
            </Button>
          </header>

          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-3 rounded-lg border border-border/70 bg-muted/30 p-3">
              <Checkbox
                id="cookie-01-necessary"
                checked
                disabled
                className="mt-0.5"
              />
              <div className="min-w-0 flex-1 text-start">
                <Label
                  htmlFor="cookie-01-necessary"
                  className="flex flex-wrap items-center gap-2 font-semibold"
                >
                  Necessary
                  <Badge variant="secondary" className="font-medium">
                    Always on
                  </Badge>
                </Label>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Required for security, login, and basic site features.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3 rounded-lg border border-border/70 p-3">
              <Checkbox
                id="cookie-01-analytics"
                checked={prefs.analytics}
                onCheckedChange={(v) =>
                  setPrefs((p) => ({ ...p, analytics: v === true }))
                }
                className="mt-0.5 cursor-pointer"
              />
              <div className="min-w-0 flex-1 text-start">
                <Label
                  htmlFor="cookie-01-analytics"
                  className="cursor-pointer font-semibold"
                >
                  Analytics
                </Label>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Helps us measure traffic and improve the product.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3 rounded-lg border border-border/70 p-3">
              <Checkbox
                id="cookie-01-marketing"
                checked={prefs.marketing}
                onCheckedChange={(v) =>
                  setPrefs((p) => ({ ...p, marketing: v === true }))
                }
                className="mt-0.5 cursor-pointer"
              />
              <div className="min-w-0 flex-1 text-start">
                <Label
                  htmlFor="cookie-01-marketing"
                  className="cursor-pointer font-semibold"
                >
                  Marketing
                </Label>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Used for relevant ads and campaign measurement.
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-5 flex flex-col gap-2 border-t border-border/70 pt-5 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="h-[46px] flex-1 cursor-pointer"
              onClick={() => {
                setPrefs({ analytics: false, marketing: false })
                dismiss()
              }}
            >
              Reject optional
            </Button>
            <Button
              type="button"
              className="h-[46px] flex-1 cursor-pointer"
              onClick={dismiss}
            >
              Save preferences
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
