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
          "flex min-h-55 items-center justify-center bg-canvas px-4",
          className
        )}
        {...props}
      >
        <Button type="button" variant="outline" onClick={() => setVisible(true)}>
          Show cookie banner
        </Button>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative flex min-h-80 items-end bg-canvas sm:min-h-70",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-50 p-4 sm:p-5"
        role="region"
        aria-label="Cookie consent"
      >
        {!manage ? (
          <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col gap-4 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:flex-row sm:items-center sm:gap-5 sm:p-5">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <CookieIcon className="size-4 text-primary" aria-hidden />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We use cookies to keep the site working and to understand how
                it&apos;s used. See our{" "}
                <a
                  href="#"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setManage(true)}
              >
                Manage
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={dismiss}
              >
                Reject
              </Button>
              <Button type="button" size="sm" onClick={dismiss}>
                Accept
              </Button>
            </div>
          </div>
        ) : (
          <div className="pointer-events-auto mx-auto w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
            <header className="mb-5 flex items-start justify-between gap-3">
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
                className="shrink-0"
                onClick={() => setManage(false)}
                aria-label="Close preferences"
              >
                <XIcon className="size-4" aria-hidden />
              </Button>
            </header>

            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3 rounded-lg border border-border/70 bg-muted/30 p-3">
                <Checkbox
                  id="cookie-necessary"
                  checked
                  disabled
                  className="mt-0.5"
                />
                <div className="min-w-0 flex-1">
                  <Label
                    htmlFor="cookie-necessary"
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
                  id="cookie-analytics"
                  checked={prefs.analytics}
                  onCheckedChange={(v) =>
                    setPrefs((p) => ({ ...p, analytics: v === true }))
                  }
                  className="mt-0.5"
                />
                <div className="min-w-0 flex-1">
                  <Label
                    htmlFor="cookie-analytics"
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
                  id="cookie-marketing"
                  checked={prefs.marketing}
                  onCheckedChange={(v) =>
                    setPrefs((p) => ({ ...p, marketing: v === true }))
                  }
                  className="mt-0.5"
                />
                <div className="min-w-0 flex-1">
                  <Label
                    htmlFor="cookie-marketing"
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
                className="flex-1"
                onClick={() => {
                  setPrefs({ analytics: false, marketing: false })
                  dismiss()
                }}
              >
                Reject optional
              </Button>
              <Button type="button" className="flex-1" onClick={dismiss}>
                Save preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
