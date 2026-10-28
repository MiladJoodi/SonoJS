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

function BellIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </Icon>
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

function FolderIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
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

function CalendarIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </Icon>
  )
}

function InboxIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M4 6h16v12H4z" />
      <path d="m4 10 4 4h8l4-4" />
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

function UserIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
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

function FilterIcon(props: React.ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z" />
    </Icon>
  )
}

const NAV_ITEMS = [
  { label: "Home", icon: HomeIcon, active: true },
  { label: "Projects", icon: FolderIcon, active: false, count: 18 },
  { label: "Team", icon: UsersIcon, active: false },
  { label: "Inbox", icon: InboxIcon, active: false, count: 5 },
  { label: "Calendar", icon: CalendarIcon, active: false },
  { label: "Settings", icon: SettingsIcon, active: false },
] as const

const FILTERS = ["All", "Active", "In review", "Blocked"] as const

const PROJECTS = [
  {
    name: "Nova Checkout",
    team: "Commerce",
    status: "Active",
    progress: 72,
    updated: "2h ago",
    tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  {
    name: "Atlas Docs",
    team: "Platform",
    status: "In review",
    progress: 91,
    updated: "Yesterday",
    tone: "bg-muted text-muted-foreground",
  },
  {
    name: "Pulse Mobile",
    team: "Growth",
    status: "Active",
    progress: 44,
    updated: "4h ago",
    tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  {
    name: "Ledger API",
    team: "Finance",
    status: "Blocked",
    progress: 28,
    updated: "1d ago",
    tone: "bg-destructive/10 text-destructive",
  },
  {
    name: "Orbit Onboarding",
    team: "Design",
    status: "Active",
    progress: 63,
    updated: "3h ago",
    tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
] as const

const SIDE_STATS = [
  { label: "Open tasks", value: "34" },
  { label: "Due this week", value: "11" },
  { label: "Team online", value: "8" },
] as const

export default function DashboardLayout({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [profileOpen, setProfileOpen] = React.useState(false)
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>("All")
  const profileRef = React.useRef<HTMLDivElement>(null)

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
        if (window.matchMedia("(max-width: 767px)").matches) {
          setSidebarOpen(false)
        }
      }
    }
    const onClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onClick)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onClick)
    }
  }, [])

  const visibleProjects =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.status === filter)

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
          "absolute inset-y-0 start-0 w-[min(16.75rem,88vw)] md:relative md:shrink-0 md:transition-[width] md:duration-300",
          sidebarOpen
            ? "flex shadow-soft md:w-[268px] md:shadow-none"
            : "hidden md:flex md:w-0 md:overflow-hidden md:border-e-0"
        )}
      >
        <div className="flex h-full w-full min-w-[min(16.75rem,88vw)] flex-col md:min-w-[268px]">
          <div className="flex h-16 items-center gap-2.5 border-b border-border/70 px-5">
            <img src={logoSrc} alt="" className="size-8 shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Sono Workspace</p>
              <p className="truncate text-caption text-muted-foreground">
                Product team
              </p>
            </div>
          </div>

          <form
            role="search"
            className="mx-3 mt-3 flex items-center gap-2 rounded-[12px] border border-border/70 bg-canvas px-3 py-2.5 focus-within:ring-2 focus-within:ring-ring"
          >
            <SearchIcon className="text-muted-foreground" />
            <input
              type="search"
              placeholder="Search workspace…"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </form>

          <nav
            className="mt-3 flex-1 space-y-0.5 overflow-y-auto px-3 pb-8"
            aria-label="Workspace"
          >
            {NAV_ITEMS.map((item) => {
              const ItemIcon = item.icon
              return (
                <a
                  key={item.label}
                  href="#"
                  aria-current={item.active ? "page" : undefined}
                  className={cn(
                    "flex cursor-pointer items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                    item.active
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  )}
                >
                  <ItemIcon />
                  <span className="flex-1">{item.label}</span>
                  {"count" in item && item.count ? (
                    <span className="rounded-full bg-card px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground ring-1 ring-border/70">
                      {item.count}
                    </span>
                  ) : null}
                </a>
              )
            })}
          </nav>

          <div className="border-t border-border/70 p-3">
            <a
              href="#"
              className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-border/70 bg-canvas p-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                <span className="mt-0.5 inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  Pro seat
                </span>
              </span>
            </a>
          </div>
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
              Workspace / Projects
            </p>
            <h1 className="truncate text-sm font-semibold md:text-base">
              Project board
            </h1>
          </div>

          <div className="ms-auto flex shrink-0 items-center gap-1.5">
            <a
              href="#"
              aria-label="Notifications"
              className="relative flex size-10 cursor-pointer items-center justify-center rounded-[12px] outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            >
              <BellIcon />
              <span className="absolute end-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-primary-foreground">
                3
              </span>
            </a>

            <div className="relative" ref={profileRef}>
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
                  className="size-10 rounded-full object-cover ring-2 ring-border/70"
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
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-auto p-3 sm:p-4 md:p-6">
          <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div className="-mx-1 flex max-w-full items-center gap-2 overflow-x-auto px-1 pb-1">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[12px] border border-border/70 bg-card text-muted-foreground">
                <FilterIcon />
              </span>
              {FILTERS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={cn(
                    "h-10 shrink-0 cursor-pointer rounded-[12px] px-3 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                    filter === item
                      ? "bg-primary text-primary-foreground"
                      : "border border-border/70 bg-card text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
            <a
              href="#"
              className="inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-[12px] bg-primary px-3 text-sm font-medium text-primary-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
            >
              New project
            </a>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1fr_240px]">
            <section className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
              <div className="hidden grid-cols-[1.4fr_0.8fr_0.7fr_0.9fr_0.6fr] gap-2 border-b border-border/70 bg-canvas/80 px-4 py-3 text-caption font-medium text-muted-foreground lg:grid">
                <span>Project</span>
                <span>Team</span>
                <span>Status</span>
                <span>Progress</span>
                <span className="text-end">Updated</span>
              </div>
              <ul className="divide-y divide-border/70">
                {visibleProjects.map((project) => (
                  <li
                    key={project.name}
                    className="flex flex-col gap-3 px-4 py-3.5 lg:grid lg:grid-cols-[1.4fr_0.8fr_0.7fr_0.9fr_0.6fr] lg:items-center lg:gap-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {project.name}
                      </p>
                      <p className="text-caption text-muted-foreground lg:hidden">
                        {project.team} · {project.updated}
                      </p>
                    </div>
                    <p className="hidden text-sm text-muted-foreground lg:block">
                      {project.team}
                    </p>
                    <div>
                      <span
                        className={cn(
                          "inline-flex shrink-0 rounded-full px-2 py-0.5 text-xs font-medium leading-4 whitespace-nowrap",
                          project.tone
                        )}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="w-8 shrink-0 text-end text-caption tabular-nums text-muted-foreground">
                        {project.progress}%
                      </span>
                    </div>
                    <p className="hidden text-end text-caption text-muted-foreground lg:block">
                      {project.updated}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <aside className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[12px] border border-border/70 bg-card p-4 shadow-soft">
                <h2 className="text-sm font-semibold">This week</h2>
                <ul className="mt-3 space-y-3">
                  {SIDE_STATS.map((stat) => (
                    <li
                      key={stat.label}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="text-sm text-muted-foreground">
                        {stat.label}
                      </span>
                      <span className="text-sm font-semibold tabular-nums">
                        {stat.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[12px] border border-border/70 bg-card p-4 shadow-soft">
                <h2 className="text-sm font-semibold">Upcoming</h2>
                <ul className="mt-3 space-y-2.5">
                  {[
                    ["Design critique", "Wed · 11:00"],
                    ["Sprint planning", "Thu · 09:30"],
                    ["Launch freeze", "Fri · All day"],
                  ].map(([title, when]) => (
                    <li
                      key={title}
                      className="rounded-[12px] border border-border/70 bg-canvas px-3 py-2.5"
                    >
                      <p className="text-sm font-medium">{title}</p>
                      <p className="text-caption text-muted-foreground">{when}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
