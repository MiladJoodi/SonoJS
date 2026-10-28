"use client"

import * as React from "react"
import { MessageSquareIcon, SearchIcon, UserPlusIcon, XIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const ROLES = ["Design", "Engineering", "Product", "Support"] as const
const DEPTS = ["Platform", "Growth", "Ops"] as const

type Role = (typeof ROLES)[number]
type Dept = (typeof DEPTS)[number]
type Status = "online" | "away" | "offline"

interface Person {
  id: string
  name: string
  title: string
  role: Role
  dept: Dept
  status: Status
  initials: string
}

const PEOPLE: Person[] = [
  {
    id: "1",
    name: "Maya Chen",
    title: "Staff Product Designer",
    role: "Design",
    dept: "Platform",
    status: "online",
    initials: "MC",
  },
  {
    id: "2",
    name: "Alex Rivera",
    title: "Senior Frontend Engineer",
    role: "Engineering",
    dept: "Platform",
    status: "online",
    initials: "AR",
  },
  {
    id: "3",
    name: "Jordan Lee",
    title: "Product Manager",
    role: "Product",
    dept: "Growth",
    status: "away",
    initials: "JL",
  },
  {
    id: "4",
    name: "Sam Okonkwo",
    title: "Customer Success Lead",
    role: "Support",
    dept: "Ops",
    status: "online",
    initials: "SO",
  },
  {
    id: "5",
    name: "Priya Nair",
    title: "Backend Engineer",
    role: "Engineering",
    dept: "Growth",
    status: "offline",
    initials: "PN",
  },
  {
    id: "6",
    name: "Chris Tanaka",
    title: "UX Researcher",
    role: "Design",
    dept: "Growth",
    status: "away",
    initials: "CT",
  },
  {
    id: "7",
    name: "Elena Costa",
    title: "Support Specialist",
    role: "Support",
    dept: "Ops",
    status: "online",
    initials: "EC",
  },
  {
    id: "8",
    name: "Noah Berg",
    title: "Engineering Manager",
    role: "Engineering",
    dept: "Platform",
    status: "offline",
    initials: "NB",
  },
]

function toggleInSet<T extends string>(
  set: Set<T>,
  value: T,
  checked: boolean
): Set<T> {
  const next = new Set(set)
  if (checked) next.add(value)
  else next.delete(value)
  return next
}

function statusDot(status: Status) {
  switch (status) {
    case "online":
      return "bg-emerald-500"
    case "away":
      return "bg-amber-500"
    default:
      return "bg-muted-foreground/40"
  }
}

function statusLabel(status: Status) {
  switch (status) {
    case "online":
      return "Online"
    case "away":
      return "Away"
    default:
      return "Offline"
  }
}

export default function SearchResults({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [query, setQuery] = React.useState("")
  const [roles, setRoles] = React.useState<Set<Role>>(new Set())
  const [depts, setDepts] = React.useState<Set<Dept>>(new Set())

  const clearAll = () => {
    setRoles(new Set())
    setDepts(new Set())
  }

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return PEOPLE.filter((p) => {
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.title.toLowerCase().includes(q)
      ) {
        return false
      }
      if (roles.size > 0 && !roles.has(p.role)) return false
      if (depts.size > 0 && !depts.has(p.dept)) return false
      return true
    })
  }, [query, roles, depts])

  return (
    <div
      className={cn(
        "min-h-[min(48rem,100svh)] bg-white text-foreground dark:bg-background",
        className
      )}
      {...props}
    >
      <div className="border-b border-border/70 bg-card shadow-soft">
        <div className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-6">
          <InputGroup className="h-[46px]">
            <InputGroupAddon align="inline-start">
              <SearchIcon aria-hidden />
            </InputGroupAddon>
            <InputGroupInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search people by name or title…"
              aria-label="Search people"
            />
            {query ? (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  size="icon-xs"
                  className="cursor-pointer"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  <XIcon className="size-3.5" aria-hidden />
                </InputGroupButton>
              </InputGroupAddon>
            ) : null}
          </InputGroup>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-8">
          <aside className="w-full shrink-0 lg:w-56">
            <div className="sticky top-6 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
              <div className="flex items-center justify-between gap-2 border-b border-border/70 px-4 py-3.5">
                <h2 className="text-sm font-semibold">Refine</h2>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 cursor-pointer px-2 text-xs"
                  disabled={roles.size === 0 && depts.size === 0}
                  onClick={clearAll}
                >
                  Clear
                </Button>
              </div>
              <div className="space-y-5 px-4 py-4">
                <fieldset>
                  <legend className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Role
                  </legend>
                  <div className="space-y-2.5">
                    {ROLES.map((role) => {
                      const id = `sr-03-role-${role}`
                      return (
                        <div key={role} className="flex items-center gap-2.5">
                          <Checkbox
                            id={id}
                            checked={roles.has(role)}
                            className="cursor-pointer"
                            onCheckedChange={(v) =>
                              setRoles((prev) =>
                                toggleInSet(prev, role, v === true)
                              )
                            }
                          />
                          <Label
                            htmlFor={id}
                            className="cursor-pointer font-normal"
                          >
                            {role}
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                </fieldset>
                <Separator />
                <fieldset>
                  <legend className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Department
                  </legend>
                  <div className="space-y-2.5">
                    {DEPTS.map((dept) => {
                      const id = `sr-03-dept-${dept}`
                      return (
                        <div key={dept} className="flex items-center gap-2.5">
                          <Checkbox
                            id={id}
                            checked={depts.has(dept)}
                            className="cursor-pointer"
                            onCheckedChange={(v) =>
                              setDepts((prev) =>
                                toggleInSet(prev, dept, v === true)
                              )
                            }
                          />
                          <Label
                            htmlFor={id}
                            className="cursor-pointer font-normal"
                          >
                            {dept}
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                </fieldset>
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <p className="mb-5 text-sm text-muted-foreground">
              {filtered.length} people
            </p>

            {filtered.length === 0 ? (
              <div className="rounded-[12px] border border-border/70 bg-card px-6 py-16 text-center shadow-soft">
                <h2 className="mb-2 text-lg font-semibold">No people found</h2>
                <p className="mx-auto mb-6 max-w-xs text-sm text-muted-foreground">
                  Try another name or clear role and department filters.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={clearAll}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <ul className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
                {filtered.map((person, index) => (
                  <li key={person.id}>
                    {index > 0 ? <Separator /> : null}
                    <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5">
                      <div className="flex min-w-0 items-center gap-3 text-start">
                        <div className="relative shrink-0">
                          <Avatar className="size-11">
                            <AvatarFallback>{person.initials}</AvatarFallback>
                          </Avatar>
                          <span
                            className={cn(
                              "absolute end-0 bottom-0 size-2.5 rounded-full border-2 border-card",
                              statusDot(person.status)
                            )}
                            title={statusLabel(person.status)}
                            aria-hidden
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate text-sm font-semibold">
                              {person.name}
                            </p>
                            <Badge variant="secondary" className="text-[10px]">
                              {statusLabel(person.status)}
                            </Badge>
                          </div>
                          <p className="truncate text-sm text-muted-foreground">
                            {person.title}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {person.role} · {person.dept}
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-2 sm:ps-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="cursor-pointer gap-1.5"
                        >
                          <MessageSquareIcon className="size-3.5" aria-hidden />
                          Message
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          className="cursor-pointer gap-1.5"
                        >
                          <UserPlusIcon className="size-3.5" aria-hidden />
                          Invite
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
