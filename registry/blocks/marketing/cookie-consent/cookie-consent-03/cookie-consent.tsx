"use client"

import * as React from "react"
import { CookieIcon, XIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Label } from "@sonojs/ui/components/label"
import { Switch } from "@sonojs/ui/components/switch"
import { cn } from "@/lib/utils"

type Prefs = {
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const DEFAULT_PREFS: Prefs = {
  analytics: false,
  marketing: false,
  functional: false,
}

export default function CookieConsent03({
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
      className={cn(
        "relative flex w-full items-center justify-center bg-canvas px-4 py-8",
        className
      )}
      {...props}
    >
      <div aria-hidden className="absolute inset-0 bg-black/40" />

      <div
        className="relative z-10 w-full max-w-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-03-heading"
      >
        <div className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
          {!customize ? (
            <>
              <div className="flex items-start gap-3 text-start">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <CookieIcon className="size-5 text-primary" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <h2
                    id="cookie-03-heading"
                    className="text-lg font-semibold tracking-tight text-foreground"
                  >
                    We value your privacy
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    We use cookies to keep the site secure and to measure how
                    people use it. You can accept all, reject optional cookies,
                    or choose categories.{" "}
                    <a
                      href="#"
                      className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <Button
                  type="button"
                  className="h-[46px] w-full cursor-pointer"
                  onClick={dismiss}
                >
                  Accept all
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-[46px] w-full cursor-pointer"
                  onClick={dismiss}
                >
                  Reject all
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-[46px] w-full cursor-pointer"
                  onClick={() => setCustomize(true)}
                >
                  Customize
                </Button>
              </div>
            </>
          ) : (
            <>
              <header className="mb-5 flex items-start justify-between gap-3 text-start">
                <div>
                  <h2
                    id="cookie-03-heading"
                    className="text-base font-semibold tracking-tight"
                  >
                    Cookie preferences
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Necessary cookies stay on. Everything else is optional.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  className="shrink-0 cursor-pointer"
                  onClick={() => setCustomize(false)}
                  aria-label="Back to consent options"
                >
                  <XIcon className="size-4" aria-hidden />
                </Button>
              </header>

              <ul className="flex flex-col gap-1">
                <li className="flex items-center justify-between gap-4 rounded-lg px-1 py-3">
                  <div className="min-w-0 flex-1 text-start">
                    <p className="text-sm font-semibold text-foreground">
                      Necessary
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Always on — security and core features.
                    </p>
                  </div>
                  <Switch checked disabled aria-label="Necessary cookies" />
                </li>

                <li className="flex items-center justify-between gap-4 rounded-lg px-1 py-3">
                  <div className="min-w-0 flex-1 text-start">
                    <Label
                      htmlFor="cookie-03-functional"
                      className="cursor-pointer text-sm font-semibold"
                    >
                      Functional
                    </Label>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Remember choices and improve UX.
                    </p>
                  </div>
                  <Switch
                    id="cookie-03-functional"
                    checked={prefs.functional}
                    onCheckedChange={(v) =>
                      setPrefs((p) => ({ ...p, functional: v }))
                    }
                    aria-label="Functional cookies"
                  />
                </li>

                <li className="flex items-center justify-between gap-4 rounded-lg px-1 py-3">
                  <div className="min-w-0 flex-1 text-start">
                    <Label
                      htmlFor="cookie-03-analytics"
                      className="cursor-pointer text-sm font-semibold"
                    >
                      Analytics
                    </Label>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Measure traffic and product usage.
                    </p>
                  </div>
                  <Switch
                    id="cookie-03-analytics"
                    checked={prefs.analytics}
                    onCheckedChange={(v) =>
                      setPrefs((p) => ({ ...p, analytics: v }))
                    }
                    aria-label="Analytics cookies"
                  />
                </li>

                <li className="flex items-center justify-between gap-4 rounded-lg px-1 py-3">
                  <div className="min-w-0 flex-1 text-start">
                    <Label
                      htmlFor="cookie-03-marketing"
                      className="cursor-pointer text-sm font-semibold"
                    >
                      Marketing
                    </Label>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Ads and campaign measurement.
                    </p>
                  </div>
                  <Switch
                    id="cookie-03-marketing"
                    checked={prefs.marketing}
                    onCheckedChange={(v) =>
                      setPrefs((p) => ({ ...p, marketing: v }))
                    }
                    aria-label="Marketing cookies"
                  />
                </li>
              </ul>

              <div className="mt-5 flex flex-col gap-2 border-t border-border/70 pt-5">
                <Button
                  type="button"
                  className="h-[46px] w-full cursor-pointer"
                  onClick={dismiss}
                >
                  Save preferences
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-[46px] w-full cursor-pointer"
                  onClick={() => {
                    setPrefs({
                      analytics: false,
                      marketing: false,
                      functional: false,
                    })
                    dismiss()
                  }}
                >
                  Reject optional
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
