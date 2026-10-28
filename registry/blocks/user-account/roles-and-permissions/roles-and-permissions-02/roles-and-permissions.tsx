"use client"

import type * as React from "react"
import { CopyIcon, PencilIcon, ShieldCheckIcon, UsersIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const ROLES = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full platform access. Cannot be narrowed without demoting.",
    members: 3,
    scopes: ["Users", "Billing", "Projects", "Roles"],
    accent: true,
  },
  {
    id: "manager",
    name: "Manager",
    description: "Team and billing control without destructive project deletes.",
    members: 12,
    scopes: ["Users", "Billing", "Projects"],
    accent: false,
  },
  {
    id: "editor",
    name: "Editor",
    description: "Create and edit projects. No billing or role management.",
    members: 48,
    scopes: ["Projects"],
    accent: false,
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only across shared resources. Ideal for stakeholders.",
    members: 126,
    scopes: ["Users", "Projects"],
    accent: false,
  },
] as const

export default function RolesAndPermissions({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-8 text-foreground sm:px-6 sm:py-10",
        className
      )}
      aria-labelledby="roles-and-permissions-02-heading"
      {...props}
    >
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-start">
            <p className="mb-1 text-xs font-medium tracking-wide text-primary uppercase">
              Access control
            </p>
            <h1
              id="roles-and-permissions-02-heading"
              className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl"
            >
              <ShieldCheckIcon className="size-5 text-primary" aria-hidden />
              Roles
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Four workspace roles with scoped access. Edit or duplicate to
              tailor policies.
            </p>
          </div>
          <Button type="button" className="cursor-pointer self-start sm:self-auto">
            Create role
          </Button>
        </header>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ROLES.map((role) => (
            <li key={role.id}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-[12px] border border-border/70 bg-card p-5",
                  role.accent && "border-primary/30 bg-primary/5"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 text-start">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold tracking-tight">
                        {role.name}
                      </h2>
                      {role.accent ? (
                        <Badge
                          variant="outline"
                          className="rounded-full border-transparent bg-primary/15 text-primary"
                        >
                          System
                        </Badge>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {role.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <UsersIcon className="size-3.5" aria-hidden />
                  <span dir="ltr" className="tabular-nums">
                    {role.members} members
                  </span>
                </div>

                <Separator className="my-4" />

                <div className="flex flex-wrap gap-1.5">
                  {role.scopes.map((scope) => (
                    <Badge
                      key={scope}
                      variant="outline"
                      className="rounded-full border-border/70 font-normal"
                    >
                      {scope}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  <Button
                    type="button"
                    size="sm"
                    className="cursor-pointer"
                  >
                    <PencilIcon className="size-3.5" aria-hidden />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="cursor-pointer"
                  >
                    <CopyIcon className="size-3.5" aria-hidden />
                    Duplicate
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
