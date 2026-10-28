"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

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
  analytics: false,
  marketing: false,
}

export default function CookieConsent02({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [visible, setVisible] = React.useState(true)
  const [customize, setCustomize] = React.useState(false)
  const [prefs, setPrefs] = React.useState<Prefs>(DEFAULT_PREFS)

  const dismiss = () => {
    setVisible(false)
    setCustomize(false)
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
      className={cn("w-full bg-canvas", className)}
      role="region"
      aria-label="Cookie consent"
      {...props}
    >
      {customize ? (
        <div className="mx-auto w-full max-w-lg px-4 pt-4 sm:px-6">
          <div className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
            <header className="mb-5 flex items-start justify-between gap-3 text-start">
              <div>
                <h2 className="text-base font-semibold tracking-tight">
                  Customize cookies
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Turn categories on or off, then save.
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="shrink-0 cursor-pointer"
                onClick={() => setCustomize(false)}
                aria-label="Close customize panel"
              >
                <XIcon className="size-4" aria-hidden />
              </Button>
            </header>

            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3 rounded-lg border border-border/70 bg-muted/30 p-3">
                <Checkbox
                  id="cookie-02-necessary"
                  checked
                  disabled
                  className="mt-0.5"
                />
                <div className="min-w-0 flex-1 text-start">
                  <Label
                    htmlFor="cookie-02-necessary"
                    className="flex flex-wrap items-center gap-2 font-semibold"
                  >
                    Necessary
                    <Badge variant="secondary" className="font-medium">
                      Always on
                    </Badge>
                  </Label>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Security, login, and core site features.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3 rounded-lg border border-border/70 p-3">
                <Checkbox
                  id="cookie-02-analytics"
                  checked={prefs.analytics}
                  onCheckedChange={(v) =>
                    setPrefs((p) => ({ ...p, analytics: v === true }))
                  }
                  className="mt-0.5 cursor-pointer"
                />
                <div className="min-w-0 flex-1 text-start">
                  <Label
                    htmlFor="cookie-02-analytics"
                    className="cursor-pointer font-semibold"
                  >
                    Analytics
                  </Label>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Traffic and product usage measurement.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3 rounded-lg border border-border/70 p-3">
                <Checkbox
                  id="cookie-02-marketing"
                  checked={prefs.marketing}
                  onCheckedChange={(v) =>
                    setPrefs((p) => ({ ...p, marketing: v === true }))
                  }
                  className="mt-0.5 cursor-pointer"
                />
                <div className="min-w-0 flex-1 text-start">
                  <Label
                    htmlFor="cookie-02-marketing"
                    className="cursor-pointer font-semibold"
                  >
                    Marketing
                  </Label>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Ads and campaign attribution.
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
                Reject all
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
        </div>
      ) : null}

      <div className="mt-4 border-t border-border/70 bg-card shadow-soft">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-5">
          <p className="min-w-0 flex-1 text-start text-sm leading-relaxed text-muted-foreground">
            We use cookies to run the site and understand how it&apos;s used.
            You can accept all, reject optional cookies, or customize. See our{" "}
            <a
              href="#"
              className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
            >
              Privacy Policy
            </a>
            .
          </p>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              type="button"
              variant="ghost"
              className="h-10 cursor-pointer md:h-[46px]"
              onClick={() => setCustomize(true)}
            >
              Customize
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-10 cursor-pointer md:h-[46px]"
              onClick={dismiss}
            >
              Reject all
            </Button>
            <Button
              type="button"
              className="h-10 cursor-pointer md:h-[46px]"
              onClick={dismiss}
            >
              Accept all
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
