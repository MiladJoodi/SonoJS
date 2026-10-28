"use client"

import * as React from "react"
import { PlusIcon, ShieldCheckIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import { Separator } from "@sonojs/ui/components/separator"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

const ROLE_LIST = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full access to all resources.",
    system: true,
  },
  {
    id: "manager",
    name: "Manager",
    description: "Users and billing without project deletes.",
    system: false,
  },
  {
    id: "editor",
    name: "Editor",
    description: "Create and edit project content.",
    system: false,
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only across shared resources.",
    system: false,
  },
] as const

const GROUPS = [
  {
    id: "users",
    label: "Users & Team",
    perms: [
      { id: "users_read", label: "View users" },
      { id: "users_invite", label: "Invite users" },
      { id: "users_remove", label: "Remove users" },
      { id: "users_roles", label: "Manage roles" },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    perms: [
      { id: "billing_read", label: "View invoices" },
      { id: "billing_methods", label: "Manage payment methods" },
      { id: "billing_plan", label: "Change plan" },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    perms: [
      { id: "projects_read", label: "View projects" },
      { id: "projects_create", label: "Create projects" },
      { id: "projects_edit", label: "Edit projects" },
      { id: "projects_delete", label: "Delete projects" },
    ],
  },
] as const

const DEFAULT_CHECKED: Record<string, string[]> = {
  admin: GROUPS.flatMap((g) => g.perms.map((p) => p.id)),
  manager: [
    "users_read",
    "users_invite",
    "billing_read",
    "billing_methods",
    "projects_read",
    "projects_create",
    "projects_edit",
  ],
  editor: ["projects_read", "projects_create", "projects_edit"],
  viewer: ["users_read", "projects_read"],
}

export default function RolesAndPermissions({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [activeId, setActiveId] = React.useState<string>("manager")
  const [name, setName] = React.useState("Manager")
  const [description, setDescription] = React.useState(
    "Users and billing without project deletes."
  )
  const [checked, setChecked] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    for (const id of DEFAULT_CHECKED.manager) initial[id] = true
    return initial
  })

  const active = ROLE_LIST.find((r) => r.id === activeId) ?? ROLE_LIST[1]
  const locked = active.system

  function selectRole(id: string) {
    const role = ROLE_LIST.find((r) => r.id === id)
    if (!role) return
    setActiveId(id)
    setName(role.name)
    setDescription(role.description)
    const next: Record<string, boolean> = {}
    for (const pid of DEFAULT_CHECKED[id] ?? []) next[pid] = true
    setChecked(next)
  }

  function togglePerm(id: string, value: boolean) {
    if (locked) return
    setChecked((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-8 text-foreground sm:px-6 sm:py-10",
        className
      )}
      aria-labelledby="roles-and-permissions-03-heading"
      {...props}
    >
      <div className="mx-auto max-w-5xl space-y-5">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-start">
            <h1
              id="roles-and-permissions-03-heading"
              className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl"
            >
              <ShieldCheckIcon className="size-5 text-primary" aria-hidden />
              Edit role
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Select a role, then adjust name, description, and permissions.
            </p>
          </div>
          <Button type="button" variant="outline" className="cursor-pointer">
            <PlusIcon className="size-4" aria-hidden />
            New role
          </Button>
        </header>

        <div className="flex flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card lg:flex-row">
          <aside className="border-b border-border/70 lg:w-56 lg:shrink-0 lg:border-e lg:border-b-0">
            <p className="px-4 py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Roles
            </p>
            <nav aria-label="Roles" className="space-y-0.5 px-2 pb-3">
              {ROLE_LIST.map((role) => {
                const selected = role.id === activeId
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => selectRole(role.id)}
                    className={cn(
                      "flex w-full cursor-pointer flex-col gap-0.5 rounded-md px-2.5 py-2 text-start transition-colors",
                      selected
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <span className="flex items-center gap-2 text-sm font-medium">
                      {role.name}
                      {role.system ? (
                        <Badge
                          variant="outline"
                          className="rounded-full border-transparent bg-muted px-1.5 py-0 text-[10px] font-normal text-muted-foreground"
                        >
                          System
                        </Badge>
                      ) : null}
                    </span>
                    <span
                      className={cn(
                        "line-clamp-1 text-xs",
                        selected ? "text-primary/80" : "text-muted-foreground"
                      )}
                    >
                      {role.description}
                    </span>
                  </button>
                )
              })}
            </nav>
          </aside>

          <div className="min-w-0 flex-1 space-y-5 p-5 sm:p-6">
            <form
              className="space-y-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <Field>
                <FieldLabel htmlFor="roles-and-permissions-03-name">
                  Role name
                </FieldLabel>
                <Input
                  id="roles-and-permissions-03-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={locked}
                />
                {locked ? (
                  <FieldDescription>
                    System roles keep a fixed name.
                  </FieldDescription>
                ) : null}
              </Field>

              <Field>
                <FieldLabel htmlFor="roles-and-permissions-03-desc">
                  Description
                </FieldLabel>
                <Textarea
                  id="roles-and-permissions-03-desc"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={locked}
                />
              </Field>

              <Separator />

              <div className="space-y-5">
                <p className="text-sm font-semibold">Permissions</p>
                {GROUPS.map((group) => (
                  <div key={group.id} className="space-y-2">
                    <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      {group.label}
                    </p>
                    <ul className="space-y-1.5 rounded-[12px] border border-border/70 p-3">
                      {group.perms.map((perm) => {
                        const isOn = checked[perm.id] === true
                        return (
                          <li key={perm.id}>
                            <label
                              htmlFor={`roles-and-permissions-03-${perm.id}`}
                              className={cn(
                                "flex items-center gap-3 rounded-md px-2 py-2 text-sm",
                                locked
                                  ? "cursor-not-allowed opacity-70"
                                  : "cursor-pointer hover:bg-muted/40"
                              )}
                            >
                              <Checkbox
                                id={`roles-and-permissions-03-${perm.id}`}
                                checked={isOn}
                                disabled={locked}
                                onCheckedChange={(v) =>
                                  togglePerm(perm.id, v === true)
                                }
                                className={cn(!locked && "cursor-pointer")}
                              />
                              <span>{perm.label}</span>
                            </label>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={locked}
                >
                  Save role
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
