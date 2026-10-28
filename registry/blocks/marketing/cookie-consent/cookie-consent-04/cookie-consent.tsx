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
}

const DEFAULT_PREFS: Prefs = {
  analytics: false,
  marketing: false,
}

export default function CookieConsent04({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [visible, setVisible] = React.useState(true)
  const [prefsOpen, setPrefsOpen] = React.useState(false)
  const [prefs, setPrefs] = React.useState<Prefs>(DEFAULT_PREFS)

  const dismiss = () => {
    setVisible(false)
    setPrefsOpen(false)
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
        "flex w-full justify-center bg-canvas px-4 py-6 sm:px-6",
        className
      )}
      role="region"
      aria-label="Cookie consent"
      {...props}
    >
      <div className="relative w-full max-w-sm overflow-hidden rounded-[12px] border border-white/10 bg-zinc-950 text-zinc-50 shadow-soft">
        <div
          aria-hidden
          className="absolute inset-y-0 start-0 w-1 bg-primary"
        />

        <div className="ps-4 pe-3 pt-3.5 pb-3 sm:ps-5">
          <div className="flex items-start gap-2.5 text-start">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/20">
              <CookieIcon className="size-3.5 text-primary" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">Cookies</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                We use essential cookies and optional analytics.{" "}
                <a
                  href="#"
                  className="cursor-pointer font-medium text-zinc-200 underline-offset-4 hover:underline"
                >
                  Privacy
                </a>
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="shrink-0 cursor-pointer text-zinc-400 hover:bg-white/10 hover:text-white"
              onClick={dismiss}
              aria-label="Dismiss cookie banner"
            >
              <XIcon className="size-3.5" aria-hidden />
            </Button>
          </div>

          {prefsOpen ? (
            <ul className="mt-3 space-y-2 border-t border-white/10 pt-3">
              <li className="flex items-center justify-between gap-3">
                <Label
                  htmlFor="cookie-04-analytics"
                  className="cursor-pointer text-xs font-medium text-zinc-200"
                >
                  Analytics
                </Label>
                <Switch
                  id="cookie-04-analytics"
                  checked={prefs.analytics}
                  onCheckedChange={(v) =>
                    setPrefs((p) => ({ ...p, analytics: v }))
                  }
                  aria-label="Analytics cookies"
                />
              </li>
              <li className="flex items-center justify-between gap-3">
                <Label
                  htmlFor="cookie-04-marketing"
                  className="cursor-pointer text-xs font-medium text-zinc-200"
                >
                  Marketing
                </Label>
                <Switch
                  id="cookie-04-marketing"
                  checked={prefs.marketing}
                  onCheckedChange={(v) =>
                    setPrefs((p) => ({ ...p, marketing: v }))
                  }
                  aria-label="Marketing cookies"
                />
              </li>
            </ul>
          ) : null}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button
              type="button"
              size="sm"
              className="h-9 cursor-pointer rounded-lg px-3"
              onClick={dismiss}
            >
              Accept
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-9 cursor-pointer rounded-lg px-3 text-zinc-300 hover:bg-white/10 hover:text-white"
              onClick={dismiss}
            >
              Reject
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-9 cursor-pointer rounded-lg px-3 text-zinc-300 hover:bg-white/10 hover:text-white"
              onClick={() => (prefsOpen ? dismiss() : setPrefsOpen(true))}
            >
              {prefsOpen ? "Save" : "Preferences"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
