"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import avatarAsset from "./images/avatar.webp"
import logoAsset from "./images/logo.svg"
import sidebarAvatarAsset from "./images/avatar-sidebar.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const logoSrc = assetSrc(logoAsset)
const avatarSrc = assetSrc(avatarAsset)
const sidebarAvatarSrc = assetSrc(sidebarAvatarAsset)

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

function MenuIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
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

function ChevronIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <Icon className={cn("icon-dir", className)} {...props}>
      <path d="m9 6 6 6-6 6" />
    </Icon>
  )
}

function GridIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </Icon>
  )
}

function InfoIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 8h.01" />
    </Icon>
  )
}

function DollarIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </Icon>
  )
}

function ZapIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </Icon>
  )
}

function BookIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 0-2 2V5Z" />
      <path d="M8 7h8M8 11h8" />
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

function LogoutIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Icon className={cn("icon-dir", className)} {...props}>
      <path d="M10 17l5-5-5-5M15 12H3M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
    </Icon>
  )
}

function PlusIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  )
}

const NAVIGATION = [
  {
    id: "ops",
    label: "Operations",
    icon: GridIcon,
    badge: "3",
    items: [
      { label: "Command center", active: true },
      { label: "Logistics", active: false },
      { label: "Academy", active: false },
    ],
  },
  {
    id: "intel",
    label: "Intelligence",
    icon: InfoIcon,
    badge: null,
    items: [
      { label: "Audience", active: false },
      { label: "Signals", active: false },
      { label: "Schedules", active: false },
    ],
  },
  {
    id: "money",
    label: "Revenue",
    icon: DollarIcon,
    badge: "New",
    items: [
      { label: "Earnings", active: false },
      { label: "Refunds", active: false },
    ],
  },
  {
    id: "actions",
    label: "Actions",
    icon: ZapIcon,
    badge: null,
    items: [
      { label: "Automations", active: false },
      { label: "Playbooks", active: false },
    ],
  },
  {
    id: "docs",
    label: "Knowledge",
    icon: BookIcon,
    badge: null,
    items: [
      { label: "Help center", active: false },
      { label: "Articles", active: false },
    ],
  },
] as const

const QUEUE = [
  {
    id: "INC-204",
    title: "Checkout latency spike",
    owner: "Maya Chen",
    status: "Investigating",
    tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    eta: "12m",
  },
  {
    id: "INC-198",
    title: "Webhook retries elevated",
    owner: "Sam Ortiz",
    status: "Watching",
    tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    eta: "34m",
  },
  {
    id: "TSK-881",
    title: "Rotate staging secrets",
    owner: "Jordan Lee",
    status: "Queued",
    tone: "bg-muted text-muted-foreground",
    eta: "2h",
  },
  {
    id: "REL-44",
    title: "Ship billing v2.4",
    owner: "Ava Brooks",
    status: "Ready",
    tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    eta: "Today",
  },
] as const

const PULSE = [
  { label: "API health", value: "99.98%", hint: "p99 184ms" },
  { label: "Open incidents", value: "2", hint: "−1 vs yesterday" },
  { label: "Deploys today", value: "7", hint: "3 pending review" },
] as const

export default function DashboardLayout({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [profileOpen, setProfileOpen] = React.useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false)
  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({
    ops: true,
    intel: false,
    money: false,
    actions: false,
    docs: false,
  })
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
          "z-40 h-full flex-col bg-primary text-primary-foreground",
          "absolute inset-y-0 start-0 w-[min(17rem,88vw)] md:relative md:shrink-0 md:transition-[width] md:duration-300",
          sidebarOpen
            ? "flex shadow-soft md:w-[272px] md:shadow-none"
            : "hidden md:flex md:w-0 md:overflow-hidden"
        )}
      >
        <div className="flex h-full w-full min-w-[min(17rem,88vw)] flex-col md:min-w-[272px]">
          <div className="flex h-16 items-center gap-2.5 px-5">
            <img
              src={logoSrc}
              alt=""
              className="size-8 shrink-0 brightness-0 invert"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Sono Console</p>
              <p className="truncate text-caption text-primary-foreground/70">
                Production ops
              </p>
            </div>
          </div>

          <nav
            className="flex-1 space-y-1 overflow-y-auto px-3 pb-3"
            aria-label="Console navigation"
          >
            {NAVIGATION.map((section) => {
              const open = Boolean(openMenus[section.id])
              const SectionIcon = section.icon
              return (
                <div key={section.id} className="rounded-[12px]">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenus((cur) => ({
                        ...cur,
                        [section.id]: !cur[section.id],
                      }))
                    }
                    aria-expanded={open}
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-sm text-primary-foreground/85 outline-none transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary-foreground/40"
                  >
                    <SectionIcon />
                    <span className="flex-1 text-start font-medium">
                      {section.label}
                    </span>
                    {section.badge ? (
                      <span className="rounded-full bg-primary-foreground/15 px-1.5 py-0.5 text-[10px] font-semibold">
                        {section.badge}
                      </span>
                    ) : null}
                    <ChevronIcon
                      className={cn(
                        "size-3.5 opacity-70 transition-transform",
                        open ? "rotate-90" : ""
                      )}
                    />
                  </button>
                  <ul
                    className="overflow-hidden transition-[max-height] duration-300"
                    style={{
                      maxHeight: open ? `${section.items.length * 40}px` : "0px",
                    }}
                  >
                    {section.items.map((item) => (
                      <li key={item.label}>
                        <a
                          href="#"
                          aria-current={item.active ? "page" : undefined}
                          className={cn(
                            "ms-4 flex cursor-pointer items-center rounded-[10px] border-s-2 py-2 ps-3 pe-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary-foreground/40",
                            item.active
                              ? "border-primary-foreground bg-primary-foreground/15 font-medium text-primary-foreground"
                              : "border-transparent text-primary-foreground/60 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                          )}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </nav>

          <a
            href="#"
            className="m-3 flex cursor-pointer items-center gap-3 rounded-[12px] bg-primary-foreground/10 p-3 outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/40"
          >
            <img
              src={sidebarAvatarSrc}
              alt=""
              className="size-10 rounded-full object-cover"
            />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">
                John Doe
              </span>
              <span className="block truncate text-caption text-primary-foreground/65">
                On-call · Tier 1
              </span>
            </span>
          </a>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/70 bg-card px-3 sm:gap-3 sm:px-4 md:px-5">
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-[12px] outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MenuIcon />
          </button>

          <div className="min-w-0 flex-1">
            <p className="hidden text-caption text-muted-foreground sm:block">
              Ops / Command center
            </p>
            <h1 className="truncate text-sm font-semibold md:text-base">
              Live operations board
            </h1>
          </div>

          <form
            role="search"
            className="ms-auto hidden max-w-xs flex-1 items-center gap-2 rounded-[12px] border border-border/70 bg-canvas px-3 py-2 focus-within:ring-2 focus-within:ring-ring lg:flex"
          >
            <SearchIcon className="text-muted-foreground" />
            <input
              type="search"
              placeholder="Find incidents, services…"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </form>

          <div className="relative lg:hidden" ref={searchRef}>
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

          <a
            href="#"
            className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[12px] bg-primary text-sm font-medium text-primary-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-10 sm:w-auto sm:px-3"
          >
            <PlusIcon className="size-3.5" />
            <span className="hidden sm:inline">New runbook</span>
          </a>

          <div className="relative shrink-0" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((v) => !v)}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img
                src={avatarSrc}
                alt=""
                className="size-10 rounded-full object-cover"
              />
            </button>
            {profileOpen ? (
              <ul
                role="menu"
                className="absolute end-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-[12px] border border-border/70 bg-card p-1.5 text-sm shadow-soft"
              >
                {[
                  ["Profile", UserIcon],
                  ["Settings", SettingsIcon],
                  ["Log out", LogoutIcon],
                ].map(([label, Comp]) => {
                  const Item = Comp as typeof UserIcon
                  return (
                    <li key={label as string}>
                      <a
                        href="#"
                        role="menuitem"
                        className="flex cursor-pointer items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Item />
                        {label as string}
                      </a>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-auto p-3 sm:p-4 md:p-6">
          <div className="mb-4 grid grid-cols-1 gap-3 sm:mb-5 sm:grid-cols-3">
            {PULSE.map((item) => (
              <div
                key={item.label}
                className="rounded-[12px] border border-border/70 bg-card p-3.5 shadow-soft sm:p-4"
              >
                <p className="text-caption text-muted-foreground">{item.label}</p>
                <p className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                  {item.value}
                </p>
                <p className="mt-1 text-caption text-muted-foreground">
                  {item.hint}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
            <section className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
              <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3.5 sm:px-5 sm:py-4">
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold">Active queue</h2>
                  <p className="text-caption text-muted-foreground">
                    Prioritized by severity
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-caption font-medium text-muted-foreground">
                  {QUEUE.length} open
                </span>
              </div>
              <ul className="divide-y divide-border/70">
                {QUEUE.map((row) => (
                  <li
                    key={row.id}
                    className="flex flex-col gap-2 px-4 py-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:px-5"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-caption text-muted-foreground">
                          {row.id}
                        </span>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[11px] font-normal leading-4",
                            row.tone
                          )}
                        >
                          {row.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium sm:truncate">
                        {row.title}
                      </p>
                      <p className="text-caption text-muted-foreground">
                        Owner · {row.owner}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:block sm:text-end">
                      <p className="text-caption text-muted-foreground">ETA</p>
                      <p className="text-sm font-medium">{row.eta}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-4">
              <div className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft">
                <h2 className="text-sm font-semibold">Shift notes</h2>
                <p className="mt-1 text-caption text-muted-foreground">
                  Handoff · Night → Day
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Keep checkout canary at 5% until p99 < 200ms",
                    "Billing webhooks: retry storm cooled after key rotate",
                    "Staging secrets rotation blocked on vault lease",
                  ].map((note) => (
                    <li
                      key={note}
                      className="rounded-[12px] border border-border/70 bg-canvas px-3 py-2.5 text-sm text-muted-foreground"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft">
                <h2 className="text-sm font-semibold">Service map</h2>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {["API", "Workers", "Billing", "Edge"].map((svc, i) => (
                    <div
                      key={svc}
                      className="rounded-[12px] border border-border/70 bg-canvas p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{svc}</span>
                        <span
                          className={cn(
                            "size-2 rounded-full",
                            i === 1 ? "bg-destructive" : "bg-primary"
                          )}
                        />
                      </div>
                      <p className="mt-2 text-caption text-muted-foreground">
                        {i === 1 ? "Degraded" : "Healthy"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
