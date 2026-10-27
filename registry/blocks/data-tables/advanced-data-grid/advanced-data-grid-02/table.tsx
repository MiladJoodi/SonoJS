"use client"

import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
  UserRoundIcon,
  XIcon,
} from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

import team1 from "./images/team-1.webp"
import team2 from "./images/team-2.webp"
import team3 from "./images/team-3.webp"
import team4 from "./images/team-4.webp"
import team5 from "./images/team-5.webp"
import team6 from "./images/team-6.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type UserRow = {
  key: string
  id: string
  name: string
  avatar: string
  email: string
  jobTitle: string
  role: "Admin" | "Manager" | "Member"
  status: "Active" | "Inactive"
  joinedDate: string
}

const DEFAULT_USERS: UserRow[] = [
  {
    key: "u1",
    id: "#9901",
    name: "Tim Jones",
    avatar: assetSrc(team1),
    email: "john@example.com",
    jobTitle: "Product Designer",
    role: "Admin",
    status: "Active",
    joinedDate: "Apr 4, 2025",
  },
  {
    key: "u2",
    id: "#9801",
    name: "Jane Smith",
    avatar: assetSrc(team2),
    email: "jane@example.com",
    jobTitle: "Frontend Engineer",
    role: "Member",
    status: "Active",
    joinedDate: "Mar 12, 2025",
  },
  {
    key: "u3",
    id: "#9701",
    name: "Alex Brown",
    avatar: assetSrc(team3),
    email: "alex@example.com",
    jobTitle: "Backend Engineer",
    role: "Member",
    status: "Inactive",
    joinedDate: "Apr 1, 2025",
  },
  {
    key: "u4",
    id: "#9601",
    name: "Priya Patel",
    avatar: assetSrc(team4),
    email: "priya@example.com",
    jobTitle: "Marketing Lead",
    role: "Manager",
    status: "Active",
    joinedDate: "Mar 22, 2025",
  },
  {
    key: "u5",
    id: "#9602",
    name: "Michael Lee",
    avatar: assetSrc(team5),
    email: "michael@example.com",
    jobTitle: "QA Engineer",
    role: "Member",
    status: "Active",
    joinedDate: "Apr 10, 2025",
  },
  {
    key: "u6",
    id: "#9501",
    name: "Sara Khan",
    avatar: assetSrc(team6),
    email: "sara@example.com",
    jobTitle: "Content Writer",
    role: "Member",
    status: "Active",
    joinedDate: "Mar 17, 2025",
  },
  {
    key: "u7",
    id: "#9502",
    name: "Daniel Wong",
    avatar: assetSrc(team1),
    email: "daniel@example.com",
    jobTitle: "DevOps Engineer",
    role: "Admin",
    status: "Inactive",
    joinedDate: "Mar 28, 2025",
  },
  {
    key: "u8",
    id: "#9201",
    name: "Kim Johnson",
    avatar: assetSrc(team2),
    email: "kim@example.com",
    jobTitle: "DevOps Engineer",
    role: "Admin",
    status: "Inactive",
    joinedDate: "Mar 28, 2025",
  },
]

const ROLE_STYLES: Record<UserRow["role"], string> = {
  Admin: "bg-primary/10 text-primary",
  Manager: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  Member: "bg-muted text-muted-foreground",
}

const PAGES = [1, 2, 3, 4, 5, 6] as const

export default function AdvancedDataGrid({
  users = DEFAULT_USERS,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  users?: UserRow[]
}) {
  const searchId = React.useId()
  const masterId = React.useId()
  const [query, setQuery] = React.useState("")
  const [page, setPage] = React.useState(1)
  const [selected, setSelected] = React.useState<Record<string, boolean>>({})

  const filtered = !query.trim()
    ? users
    : users.filter((user) =>
        [user.name, user.email, user.jobTitle, user.role, user.status, user.id]
          .join(" ")
          .toLowerCase()
          .includes(query.trim().toLowerCase())
      )

  const selectedCount = Object.values(selected).filter(Boolean).length
  const allSelected =
    filtered.length > 0 && filtered.every((user) => selected[user.key])

  const toggleMaster = (checked: boolean) => {
    setSelected((prev) => {
      const next = { ...prev }
      for (const user of filtered) next[user.key] = checked
      return next
    })
  }

  const setRowSelected = (key: string, checked: boolean) => {
    setSelected((prev) => ({ ...prev, [key]: checked }))
  }

  const rowActions = (user: UserRow) => (
    <div className="flex gap-1">
      <button
        type="button"
        aria-label={`Edit ${user.name}`}
        className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        <PencilIcon className="size-4" />
      </button>
      <button
        type="button"
        aria-label={`Delete ${user.name}`}
        className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-destructive/10 hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Trash2Icon className="size-4" />
      </button>
      <button
        type="button"
        aria-label={`More actions for ${user.name}`}
        className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        <MoreHorizontalIcon className="size-4" />
      </button>
    </div>
  )

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-card px-4 py-8 sm:py-12 md:px-8 md:py-16",
        className
      )}
      aria-label="Team directory"
      {...props}
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <div className="mb-5 flex flex-col gap-5 sm:mb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 text-start">
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <UserRoundIcon className="size-3.5 shrink-0" aria-hidden />
              People · Workspace
            </div>
            <h2 className="text-h3 font-semibold tracking-tight text-foreground">
              Team directory
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Manage seats, roles, and access for everyone on the account.
            </p>
          </div>

          <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:w-auto">
            <form
              className="w-full min-w-0 sm:max-w-xs sm:flex-1 lg:flex-none"
              role="search"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="flex h-[46px] items-center gap-2.5 rounded-md border border-border/70 bg-background px-3 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40">
                <SearchIcon
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <label htmlFor={searchId} className="sr-only">
                  Search people
                </label>
                <input
                  type="search"
                  id={searchId}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search people…"
                  className="min-w-0 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
            </form>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <button
                type="button"
                className="inline-flex h-[46px] cursor-pointer items-center justify-center gap-2 rounded-md border border-border/70 bg-background px-3.5 text-sm font-semibold text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              >
                <DownloadIcon className="size-4 shrink-0" aria-hidden />
                Export
              </button>
              <button
                type="button"
                className="inline-flex h-[46px] cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-3.5 text-sm font-semibold text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <PlusIcon className="size-4 shrink-0" aria-hidden />
                Invite
              </button>
            </div>
          </div>
        </div>

        {selectedCount > 0 ? (
          <div className="mb-4 flex flex-col gap-3 rounded-[12px] border border-primary/25 bg-primary/5 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center">
            <p className="text-sm font-medium text-foreground">
              <span className="tabular-nums">{selectedCount}</span> selected
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:ms-auto">
              <button
                type="button"
                className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md border border-border/70 bg-background px-3 text-xs font-semibold text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              >
                <DownloadIcon className="size-3.5" aria-hidden />
                Export
              </button>
              <button
                type="button"
                className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md border border-destructive/30 bg-destructive/10 px-3 text-xs font-semibold text-destructive outline-none hover:bg-destructive/15 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Trash2Icon className="size-3.5" aria-hidden />
                Remove
              </button>
              <button
                type="button"
                aria-label="Clear selection"
                onClick={() => setSelected({})}
                className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-background focus-visible:ring-2 focus-visible:ring-ring"
              >
                <XIcon className="size-4" />
              </button>
            </div>
          </div>
        ) : null}

        {filtered.length === 0 ? (
          <div className="rounded-[12px] border border-border/70 px-4 py-12 text-center text-sm text-muted-foreground shadow-soft">
            No people found.
          </div>
        ) : (
          <>
            <ul className="flex flex-col gap-3 md:hidden">
              {filtered.map((user) => {
                const isChecked = Boolean(selected[user.key])
                return (
                  <li
                    key={user.key}
                    className={cn(
                      "rounded-[12px] border border-border/70 bg-background p-4 shadow-soft",
                      isChecked && "border-primary/30 bg-primary/5"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={isChecked}
                        aria-label={`Select ${user.name}`}
                        onCheckedChange={(value) =>
                          setRowSelected(user.key, value === true)
                        }
                        className="mt-1"
                      />
                      <div className="relative shrink-0">
                        <img
                          src={user.avatar}
                          alt=""
                          className="size-11 rounded-full object-cover ring-2 ring-background"
                          loading="lazy"
                        />
                        <span
                          className={cn(
                            "absolute end-0 bottom-0 size-2.5 rounded-full ring-2 ring-card",
                            user.status === "Active"
                              ? "bg-emerald-500"
                              : "bg-muted-foreground/40"
                          )}
                          aria-hidden
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-start">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate font-semibold text-foreground">
                            {user.name}
                          </p>
                          <span
                            className={cn(
                              "inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold",
                              ROLE_STYLES[user.role]
                            )}
                          >
                            {user.role}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {user.jobTitle}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-3">
                          <span className="inline-flex items-center gap-2 text-xs font-medium text-foreground">
                            <span
                              className={cn(
                                "size-1.5 rounded-full",
                                user.status === "Active"
                                  ? "bg-emerald-500"
                                  : "bg-muted-foreground/50"
                              )}
                            />
                            {user.status}
                            <span className="text-muted-foreground">·</span>
                            <span className="text-muted-foreground tabular-nums">
                              {user.joinedDate}
                            </span>
                          </span>
                          {rowActions(user)}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="hidden overflow-hidden rounded-[12px] border border-border/70 shadow-soft md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[880px] border-collapse text-start">
                  <thead className="border-b border-border/70 bg-muted/40 text-xs font-semibold tracking-wide text-muted-foreground uppercase dark:bg-muted/30">
                    <tr>
                      <th scope="col" className="w-12 py-3.5 ps-4">
                        <Checkbox
                          id={masterId}
                          checked={allSelected}
                          aria-label="Select all people"
                          onCheckedChange={(value) =>
                            toggleMaster(value === true)
                          }
                        />
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-start">
                        Member
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-start">
                        Role
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-start">
                        Title
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-start">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-start">
                        Joined
                      </th>
                      <th scope="col" className="px-3 py-3.5 pe-4 text-end">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/70 text-sm">
                    {filtered.map((user) => {
                      const isChecked = Boolean(selected[user.key])
                      return (
                        <tr
                          key={user.key}
                          className={cn(
                            "group transition-colors hover:bg-muted/30",
                            isChecked && "bg-primary/5"
                          )}
                        >
                          <td className="py-3.5 ps-4">
                            <Checkbox
                              checked={isChecked}
                              aria-label={`Select ${user.name}`}
                              onCheckedChange={(value) =>
                                setRowSelected(user.key, value === true)
                              }
                            />
                          </td>
                          <td className="px-3 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="relative shrink-0">
                                <img
                                  src={user.avatar}
                                  alt=""
                                  className="size-10 rounded-full object-cover ring-2 ring-background"
                                  loading="lazy"
                                />
                                <span
                                  className={cn(
                                    "absolute end-0 bottom-0 size-2.5 rounded-full ring-2 ring-card",
                                    user.status === "Active"
                                      ? "bg-emerald-500"
                                      : "bg-muted-foreground/40"
                                  )}
                                  aria-hidden
                                />
                              </div>
                              <div className="min-w-0 text-start">
                                <p className="truncate font-semibold text-foreground">
                                  {user.name}
                                </p>
                                <p className="truncate text-xs text-muted-foreground">
                                  {user.email} · {user.id}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3.5">
                            <span
                              className={cn(
                                "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                                ROLE_STYLES[user.role]
                              )}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-3 py-3.5 text-muted-foreground">
                            {user.jobTitle}
                          </td>
                          <td className="px-3 py-3.5">
                            <span className="inline-flex items-center gap-2 text-xs font-medium text-foreground">
                              <span
                                className={cn(
                                  "size-1.5 rounded-full",
                                  user.status === "Active"
                                    ? "bg-emerald-500"
                                    : "bg-muted-foreground/50"
                                )}
                              />
                              {user.status}
                            </span>
                          </td>
                          <td className="px-3 py-3.5 whitespace-nowrap text-muted-foreground tabular-nums">
                            {user.joinedDate}
                          </td>
                          <td className="px-3 py-3.5 pe-4">
                            <div className="flex justify-end opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                              {rowActions(user)}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground tabular-nums">
              {filtered.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground tabular-nums">60</span>{" "}
            people
          </p>
          <nav
            aria-label="Pagination"
            className="flex flex-wrap items-center gap-1"
          >
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md border border-border/70 bg-background outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <ChevronLeftIcon className="icon-dir size-4" />
            </button>
            {PAGES.map((item) => (
              <button
                key={item}
                type="button"
                aria-current={item === page ? "page" : undefined}
                onClick={() => setPage(item)}
                className={cn(
                  "inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  item === page
                    ? "bg-foreground text-background"
                    : "hidden text-foreground hover:bg-muted sm:inline-flex"
                )}
              >
                {item}
              </button>
            ))}
            <span className="px-1 text-sm text-muted-foreground tabular-nums sm:hidden">
              {page}/{PAGES.length}
            </span>
            <button
              type="button"
              aria-label="Next page"
              onClick={() => setPage((p) => Math.min(PAGES.length, p + 1))}
              disabled={page >= PAGES.length}
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md border border-border/70 bg-background outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <ChevronRightIcon className="icon-dir size-4" />
            </button>
          </nav>
        </div>
      </div>
    </section>
  )
}
