"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import avatarAsset from "./images/avatar.webp"
import logoAsset from "./images/logo.svg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const logoSrc = assetSrc(logoAsset)
const avatarSrc = assetSrc(avatarAsset)

function Icon({
  className,
  children,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4 shrink-0", className)}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

function HomeIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
    </Icon>
  )
}

function UsersIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8" r="3.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M2.5 19a6.5 6.5 0 0 1 13 0" />
      <path d="M14 19a5 5 0 0 1 7.5-4.3" />
    </Icon>
  )
}

function FileIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
    </Icon>
  )
}

function CalendarIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </Icon>
  )
}

function WalletIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <rect x="2" y="6" width="20" height="14" rx="2" />
      <path d="M2 10h20M16 14h2" />
    </Icon>
  )
}

function RefreshIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 21v-5h5" />
    </Icon>
  )
}

function UserIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </Icon>
  )
}

function SettingsIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Icon>
  )
}

function SearchIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Icon>
  )
}

function BellIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </Icon>
  )
}

function LogoutIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Icon className={cn("icon-dir", className)} {...props}>
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
    </Icon>
  )
}

function MenuIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  )
}

const NAV = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", icon: HomeIcon, active: true }],
  },
  {
    title: "Audience",
    items: [
      { label: "People", icon: UsersIcon },
      { label: "Posts", icon: FileIcon },
      { label: "Schedules", icon: CalendarIcon },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Earnings", icon: WalletIcon },
      { label: "Refunds", icon: RefreshIcon },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Profile", icon: UserIcon },
      { label: "Settings", icon: SettingsIcon },
    ],
  },
] as const

const KPIS = [
  { label: "Revenue", value: "$48.2k", delta: "+12.4%", up: true },
  { label: "Active users", value: "12,847", delta: "+3.1%", up: true },
  { label: "Sessions", value: "84.2k", delta: "-1.8%", up: false },
  { label: "Conversion", value: "4.6%", delta: "+0.4%", up: true },
] as const

const PANELS = [
  {
    title: "Traffic overview",
    subtitle: "Last 30 days",
    bars: [42, 58, 36, 72, 64, 88, 54, 76, 48, 90, 68, 82],
  },
  {
    title: "Audience mix",
    subtitle: "By channel",
    rows: [
      { name: "Organic", value: "42%", tone: "bg-primary" },
      { name: "Paid", value: "28%", tone: "bg-primary/60" },
      { name: "Referral", value: "18%", tone: "bg-primary/35" },
      { name: "Social", value: "12%", tone: "bg-primary/20" },
    ],
  },
  {
    title: "Recent activity",
    subtitle: "Live feed",
    events: [
      { title: "New subscriber", meta: "2m ago · Growth" },
      { title: "Invoice paid", meta: "18m ago · Billing" },
      { title: "Campaign launched", meta: "1h ago · Marketing" },
      { title: "Seat upgraded", meta: "3h ago · Workspace" },
    ],
  },
] as const

export default function DashboardLayout({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // Mobile-first: closed until md+ (set after mount to avoid hydration mismatch).
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [profileOpen, setProfileOpen] = React.useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false)
  const profileRef = React.useRef<HTMLDivElement>(null)
  const searchRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const sync = () => setSidebarOpen(window.innerWidth >= 768)
    sync()
    window.addEventListener("resize", sync)
    return () => window.removeEventListener("resize", sync)
  }, [])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setProfileOpen(false)
        setMobileSearchOpen(false)
        if (window.matchMedia("(max-width: 767px)").matches) {
          setSidebarOpen(false)
        }
      }
    }
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(target)) {
        setMobileSearchOpen(false)
      }
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onClick)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onClick)
    }
  }, [])

  return (
    <div
      className={cn(
        "relative flex h-full min-h-0 w-full overflow-hidden bg-canvas text-foreground",
        className
      )}
      {...props}
    >
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          className="absolute inset-0 z-30 cursor-pointer bg-foreground/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        aria-hidden={!sidebarOpen}
        className={cn(
          "z-40 h-full flex-col border-e border-border/70 bg-card",
          "absolute inset-y-0 start-0 w-[min(16.25rem,88vw)] md:relative md:shrink-0 md:transition-[width] md:duration-300",
          sidebarOpen
            ? "flex shadow-soft md:w-[260px] md:shadow-none"
            : "hidden md:flex md:w-0 md:border-e-0 md:overflow-hidden"
        )}
      >
        <div className="flex h-full w-full min-w-[min(16.25rem,88vw)] flex-col md:min-w-[260px]">
          <div className="flex h-16 items-center gap-2.5 px-5">
            <img src={logoSrc} alt="" className="size-8 shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight">
                Sono Studio
              </p>
              <p className="truncate text-caption text-muted-foreground">
                Analytics workspace
              </p>
            </div>
          </div>

          <nav
            className="flex-1 space-y-5 overflow-y-auto px-3 pb-8"
            aria-label="Primary"
          >
            {NAV.map((group) => (
              <div key={group.title}>
                <p className="mb-1.5 px-3 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                  {group.title}
                </p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const ItemIcon = item.icon
                    const active = "active" in item && item.active
                    return (
                      <li key={item.label}>
                        <a
                          href="#"
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex cursor-pointer items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                            active
                              ? "bg-primary text-primary-foreground shadow-soft"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <ItemIcon />
                          {item.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="border-t border-border/70 p-3">
            <div className="rounded-[12px] border border-border/70 bg-canvas p-3">
              <p className="text-sm font-medium">Pro plan</p>
              <p className="mt-0.5 text-caption text-muted-foreground">
                3 seats left this cycle
              </p>
              <a
                href="#"
                className="mt-3 inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-[12px] bg-primary text-sm font-medium text-primary-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Upgrade
              </a>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border/70 bg-card px-4 md:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
            className="flex size-10 cursor-pointer items-center justify-center rounded-[12px] outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MenuIcon />
          </button>

          <form
            role="search"
            className="ms-1 hidden min-w-0 max-w-md flex-1 items-center gap-2 rounded-[12px] border border-border/70 bg-canvas px-3 py-2 focus-within:ring-2 focus-within:ring-ring md:flex"
          >
            <SearchIcon className="text-muted-foreground" />
            <input
              type="search"
              placeholder="Search reports, people, invoices…"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="hidden rounded-md border border-border/70 bg-card px-1.5 py-0.5 text-[10px] text-muted-foreground lg:inline">
              ⌘K
            </kbd>
          </form>

          <div className="ms-auto flex items-center gap-1.5">
            <div className="relative md:hidden" ref={searchRef}>
              <button
                type="button"
                onClick={() => setMobileSearchOpen((v) => !v)}
                aria-label="Toggle search"
                aria-expanded={mobileSearchOpen}
                className="flex size-10 cursor-pointer items-center justify-center rounded-[12px] outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              >
                <SearchIcon />
              </button>
              {mobileSearchOpen ? (
                <form
                  role="search"
                  className="absolute end-0 top-full z-30 mt-2 flex w-[min(18rem,calc(100vw-2rem))] items-center gap-2 rounded-[12px] border border-border/70 bg-card p-2.5 shadow-soft"
                >
                  <SearchIcon className="text-muted-foreground" />
                  <input
                    autoFocus
                    type="search"
                    placeholder="Search…"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </form>
              ) : null}
            </div>

            <button
              type="button"
              aria-label="Notifications"
              className="relative flex size-10 cursor-pointer items-center justify-center rounded-[12px] outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            >
              <BellIcon />
              <span className="absolute end-2 top-2 size-2 rounded-full bg-destructive" />
            </button>

            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((v) => !v)}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                className="flex cursor-pointer items-center gap-2 rounded-[12px] py-1 ps-1 pe-1 sm:pe-2 outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={avatarSrc}
                  alt=""
                  className="size-9 rounded-full object-cover"
                />
                <span className="hidden text-start sm:block">
                  <span className="block text-sm font-medium leading-tight">
                    Alex Rivera
                  </span>
                  <span className="block text-caption text-muted-foreground">
                    Admin
                  </span>
                </span>
              </button>
              {profileOpen ? (
                <ul
                  role="menu"
                  className="absolute end-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-[12px] border border-border/70 bg-card p-1.5 text-sm shadow-soft"
                >
                  {[
                    ["My profile", UserIcon],
                    ["Settings", SettingsIcon],
                    ["Log out", LogoutIcon],
                  ].map(([label, Item]) => {
                    const Comp = Item as typeof UserIcon
                    return (
                      <li key={label as string}>
                        <a
                          href="#"
                          role="menuitem"
                          className="flex cursor-pointer items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Comp />
                          {label as string}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              ) : null}
            </div>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-auto p-3 sm:p-4 md:p-6">
          <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-caption font-medium text-muted-foreground">
                Monday, Oct 27
              </p>
              <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-h3">
                Overview
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex h-10 items-center rounded-[12px] border border-border/70 bg-card px-3 text-sm text-muted-foreground">
                Last 30 days
              </span>
              <a
                href="#"
                className="inline-flex h-10 cursor-pointer items-center rounded-[12px] bg-primary px-3 text-sm font-medium text-primary-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Export
              </a>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3 sm:mb-6 xl:grid-cols-4">
            {KPIS.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-[12px] border border-border/70 bg-card p-3.5 shadow-soft sm:p-4"
              >
                <p className="text-caption text-muted-foreground">{kpi.label}</p>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {kpi.value}
                  </p>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-caption font-medium",
                      kpi.up
                        ? "bg-primary/10 text-primary"
                        : "bg-destructive/10 text-destructive"
                    )}
                  >
                    {kpi.delta}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <section className="rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5 lg:col-span-2">
              <div className="mb-4 flex items-start justify-between gap-3 sm:mb-5">
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold">{PANELS[0].title}</h2>
                  <p className="text-caption text-muted-foreground">
                    {PANELS[0].subtitle}
                  </p>
                </div>
              </div>
              <div className="flex h-36 items-end gap-1 sm:h-44 sm:gap-2">
                {PANELS[0].bars.map((h, i) => (
                  <div
                    key={i}
                    className="min-w-0 flex-1 rounded-t-md bg-primary/15"
                    style={{ height: `${h}%` }}
                  >
                    <div
                      className="w-full rounded-t-md bg-primary"
                      style={{ height: `${Math.max(28, h - 18)}%` }}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5">
              <div className="mb-4">
                <h2 className="text-sm font-semibold">{PANELS[1].title}</h2>
                <p className="text-caption text-muted-foreground">
                  {PANELS[1].subtitle}
                </p>
              </div>
              <ul className="space-y-3">
                {PANELS[1].rows.map((row) => (
                  <li key={row.name}>
                    <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
                      <span className="text-muted-foreground">{row.name}</span>
                      <span className="shrink-0 font-medium tabular-nums">
                        {row.value}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full", row.tone)}
                        style={{ width: row.value }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5 lg:col-span-3">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold">{PANELS[2].title}</h2>
                  <p className="text-caption text-muted-foreground">
                    {PANELS[2].subtitle}
                  </p>
                </div>
                <a
                  href="#"
                  className="shrink-0 cursor-pointer text-sm font-medium text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  View all
                </a>
              </div>
              <ul className="divide-y divide-border/70">
                {PANELS[2].events.map((event) => (
                  <li
                    key={event.title}
                    className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="size-2.5 shrink-0 rounded-full bg-primary" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {event.title}
                        </p>
                        <p className="truncate text-caption text-muted-foreground">
                          {event.meta}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 text-caption text-muted-foreground">
                      Open
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
