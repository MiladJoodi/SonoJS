"use client"

import * as React from "react"
import {
  CheckCircle2Icon,
  DatabaseIcon,
  PaletteIcon,
  Settings2Icon,
  SettingsIcon,
  StoreIcon,
  UserRoundIcon,
  WalletIcon,
  WorkflowIcon,
  WrenchIcon,
  XIcon,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@sonojs/ui/components/dialog"
import { cn } from "@/lib/utils"

import { SettingsGeneral } from "./settings-general"
import { SettingsProfile } from "./settings-profile"
import { SettingsStorage } from "./settings-storage"
import { SettingsTools } from "./settings-tools"

export type SettingsPage = "general" | "profile" | "storage" | "tools"

export interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultPage?: SettingsPage
  planArtSrc?: string
}

type NavItem = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  page?: SettingsPage
}

const NAV_GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: "Settings",
    items: [
      { label: "General", icon: Settings2Icon, page: "general" },
      { label: "Profile", icon: UserRoundIcon, page: "profile" },
      { label: "Appearance", icon: PaletteIcon },
      { label: "Billing", icon: WalletIcon },
      { label: "Rules", icon: WorkflowIcon },
      { label: "Tools", icon: WrenchIcon, page: "tools" },
      { label: "Storage", icon: DatabaseIcon, page: "storage" },
      { label: "Marketplace", icon: StoreIcon },
    ],
  },
  {
    label: "Desktop",
    items: [{ label: "General", icon: SettingsIcon }],
  },
]

const PAGE_TITLES: Record<SettingsPage, string> = {
  general: "General",
  profile: "Profile",
  storage: "Storage",
  tools: "Tools",
}

export function SettingsModal({
  open,
  onOpenChange,
  defaultPage = "general",
  planArtSrc,
}: SettingsModalProps) {
  const [page, setPage] = React.useState<SettingsPage>(defaultPage)
  const [savedPhase, setSavedPhase] = React.useState<
    "hidden" | "shown" | "leaving"
  >("hidden")
  const [contentScrolled, setContentScrolled] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const savedTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    if (!open) return
    setPage(defaultPage)
    setContentScrolled(false)
    scrollRef.current?.scrollTo({ top: 0 })
  }, [open, defaultPage])

  const showSavedToast = React.useCallback(() => {
    if (savedTimer.current) clearTimeout(savedTimer.current)
    setSavedPhase("shown")
    savedTimer.current = setTimeout(() => {
      setSavedPhase("leaving")
      savedTimer.current = setTimeout(() => setSavedPhase("hidden"), 220)
    }, 1800)
  }, [])

  React.useEffect(
    () => () => {
      if (savedTimer.current) clearTimeout(savedTimer.current)
    },
    []
  )

  const goTo = (next: SettingsPage) => {
    setPage(next)
    setContentScrolled(false)
    scrollRef.current?.scrollTo({ top: 0 })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "flex h-[min(614px,calc(100dvh-2rem))] w-full gap-0 overflow-clip border-border/70 bg-card p-0 shadow-soft",
          "rounded-[12px] sm:rounded-[12px]"
        )}
        style={{ maxWidth: "min(54rem, calc(100vw - 2rem))" }}
      >
        <DialogTitle className="sr-only">Settings</DialogTitle>

        <nav
          aria-label="Settings sections"
          className="flex w-14 shrink-0 flex-col gap-5 overflow-y-auto border-e border-border/70 bg-muted/30 p-2 sm:w-52 lg:w-56 dark:bg-muted/20"
        >
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="flex flex-col gap-0.5">
              <p className="mb-1 hidden px-2.5 text-[11px] font-medium tracking-[0.06em] text-muted-foreground uppercase sm:block">
                {group.label}
              </p>
              {group.items.map((item) => {
                const selected = item.page !== undefined && item.page === page
                const Icon = item.icon
                const available = Boolean(item.page)
                return (
                  <button
                    key={`${group.label}:${item.label}`}
                    type="button"
                    title={item.label}
                    aria-label={item.label}
                    aria-current={selected ? "page" : undefined}
                    disabled={!available}
                    onClick={() => {
                      if (!item.page) return
                      goTo(item.page)
                    }}
                    className={cn(
                      "group flex w-full items-center gap-2.5 rounded-[10px] px-2 py-2 text-start outline-none transition-colors",
                      "focus-visible:ring-2 focus-visible:ring-ring",
                      available
                        ? "cursor-pointer"
                        : "cursor-default opacity-45",
                      selected
                        ? "bg-card text-foreground shadow-xs ring-1 ring-border/60"
                        : available
                          ? "text-muted-foreground hover:bg-card/70 hover:text-foreground"
                          : "text-muted-foreground"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-[18px] shrink-0 transition-colors",
                        selected
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                      aria-hidden
                    />
                    <span className="hidden min-w-0 flex-1 truncate text-sm font-medium sm:block">
                      {item.label}
                    </span>
                    {!available ? (
                      <span className="ms-auto hidden rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase sm:inline">
                        Soon
                      </span>
                    ) : null}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="relative flex min-w-0 flex-1 flex-col bg-card">
          <div className="relative z-10 flex shrink-0 items-center justify-between gap-3 bg-card/95 px-5 pt-5 pb-3 backdrop-blur-sm sm:px-7 sm:pt-6">
            <h2 className="text-[17px] font-semibold tracking-tight text-foreground">
              {PAGE_TITLES[page]}
            </h2>
            <button
              type="button"
              aria-label="Close settings"
              onClick={() => onOpenChange(false)}
              className="flex size-7 cursor-pointer items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors outline-none hover:bg-muted/80 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <XIcon className="size-3.5" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="scrollbar-soft min-h-0 flex-1 overflow-y-auto px-5 pb-8 sm:px-7"
            onScroll={(e) =>
              setContentScrolled(e.currentTarget.scrollTop > 2)
            }
          >
            <div
              key={page}
              className="animate-in fade-in-0 slide-in-from-bottom-1 duration-200"
            >
              {page === "profile" ? (
                <SettingsProfile onSaved={showSavedToast} />
              ) : page === "storage" ? (
                <SettingsStorage />
              ) : page === "tools" ? (
                <SettingsTools />
              ) : (
                <SettingsGeneral planArtSrc={planArtSrc} />
              )}
            </div>
          </div>

          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-x-0 top-[3.25rem] h-8 bg-gradient-to-b from-card to-transparent transition-opacity duration-200",
              contentScrolled ? "opacity-100" : "opacity-0"
            )}
          />
        </div>

        <div
          aria-live="polite"
          className={cn(
            "pointer-events-none absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5",
            "rounded-full border border-border/70 bg-card py-1.5 pe-3 ps-2 shadow-soft",
            "transition-[opacity,transform,filter] duration-200 ease-out",
            savedPhase === "shown" &&
              "translate-y-1/2 scale-100 opacity-100 blur-0",
            savedPhase === "hidden" &&
              "translate-y-[calc(50%+14px)] scale-90 opacity-0 blur-[2px]",
            savedPhase === "leaving" &&
              "translate-y-[calc(50%-8px)] scale-95 opacity-0 blur-[1px]"
          )}
        >
          <CheckCircle2Icon className="size-4 text-emerald-500" aria-hidden />
          <span className="text-xs font-medium text-foreground">Saved</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
