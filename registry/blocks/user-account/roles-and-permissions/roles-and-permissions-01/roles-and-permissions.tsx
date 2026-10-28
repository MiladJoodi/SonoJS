"use client"

import * as React from "react"
import {
  CircleHelpIcon,
  LockIcon,
  RotateCcwIcon,
  SaveIcon,
  ShieldCheckIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@sonojs/ui/components/tooltip"
import { cn } from "@/lib/utils"

const ROLES = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full access to all resources. Permissions are locked.",
    locked: true,
  },
  {
    id: "manager",
    name: "Manager",
    description: "Can manage users and billing, but cannot delete projects.",
    locked: false,
  },
  {
    id: "editor",
    name: "Editor",
    description: "Can create and edit content.",
    locked: false,
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access to most resources.",
    locked: false,
  },
] as const

const RESOURCES = [
  {
    id: "res_users",
    name: "Users & Team",
    permissions: [
      { id: "read", label: "View Users" },
      { id: "invite", label: "Invite Users" },
      { id: "delete", label: "Remove Users" },
      { id: "manage_roles", label: "Manage Roles" },
    ],
  },
  {
    id: "res_billing",
    name: "Billing & Subscription",
    permissions: [
      { id: "read", label: "View Invoices" },
      { id: "manage", label: "Manage Payment Methods" },
      { id: "upgrade", label: "Change Plan" },
    ],
  },
  {
    id: "res_projects",
    name: "Projects",
    permissions: [
      { id: "read", label: "View Projects" },
      { id: "create", label: "Create Projects" },
      { id: "edit", label: "Edit Projects" },
      { id: "delete", label: "Delete Projects" },
    ],
  },
] as const

type PermissionMap = Record<string, Record<string, Record<string, boolean>>>

const INITIAL_PERMISSIONS: PermissionMap = {
  admin: {
    res_users: { read: true, invite: true, delete: true, manage_roles: true },
    res_billing: { read: true, manage: true, upgrade: true },
    res_projects: { read: true, create: true, edit: true, delete: true },
  },
  manager: {
    res_users: { read: true, invite: true, delete: false, manage_roles: false },
    res_billing: { read: true, manage: true, upgrade: false },
    res_projects: { read: true, create: true, edit: true, delete: false },
  },
  editor: {
    res_users: {
      read: true,
      invite: false,
      delete: false,
      manage_roles: false,
    },
    res_billing: { read: false, manage: false, upgrade: false },
    res_projects: { read: true, create: true, edit: true, delete: false },
  },
  viewer: {
    res_users: {
      read: true,
      invite: false,
      delete: false,
      manage_roles: false,
    },
    res_billing: { read: false, manage: false, upgrade: false },
    res_projects: { read: true, create: false, edit: false, delete: false },
  },
}

function clonePermissions(source: PermissionMap): PermissionMap {
  return JSON.parse(JSON.stringify(source)) as PermissionMap
}

export default function RolesAndPermissions({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [permissions, setPermissions] = React.useState(() =>
    clonePermissions(INITIAL_PERMISSIONS)
  )
  const [isDirty, setIsDirty] = React.useState(false)

  const handleToggle = (
    roleId: string,
    resourceId: string,
    permId: string,
    checked: boolean
  ) => {
    if (roleId === "admin") return
    setPermissions((prev) => ({
      ...prev,
      [roleId]: {
        ...(prev[roleId] ?? {}),
        [resourceId]: {
          ...(prev[roleId]?.[resourceId] ?? {}),
          [permId]: checked,
        },
      },
    }))
    setIsDirty(true)
  }

  const handleReset = () => {
    setPermissions(clonePermissions(INITIAL_PERMISSIONS))
    setIsDirty(false)
  }

  const handleSave = () => {
    setIsDirty(false)
  }

  return (
    <TooltipProvider>
      <section
        className={cn(
          "w-full min-w-0 bg-canvas px-4 py-8 text-foreground sm:px-6 sm:py-10",
          className
        )}
        aria-labelledby="roles-and-permissions-01-heading"
        {...props}
      >
        <div className="mx-auto max-w-6xl space-y-5">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="text-start">
              <h1
                id="roles-and-permissions-01-heading"
                className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl"
              >
                <ShieldCheckIcon
                  className="size-5 text-primary sm:size-6"
                  aria-hidden
                />
                Role permissions
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Set access for each role across users, billing, and projects.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer gap-2"
                onClick={handleReset}
                disabled={!isDirty}
              >
                <RotateCcwIcon className="size-4" aria-hidden />
                Discard
              </Button>
              <Button
                type="button"
                className="cursor-pointer gap-2"
                onClick={handleSave}
                disabled={!isDirty}
              >
                <SaveIcon className="size-4" aria-hidden />
                Save changes
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-muted/50 backdrop-blur-sm">
                  <TableRow className="border-b border-border/70 hover:bg-transparent">
                    <TableHead className="min-w-[12rem] text-sm font-semibold text-foreground">
                      Resource / Permission
                    </TableHead>
                    {ROLES.map((role) => (
                      <TableHead
                        key={role.id}
                        className="min-w-[8.5rem] text-center"
                      >
                        <div className="flex flex-col items-center gap-1.5 py-1">
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                            {role.name}
                            {role.locked ? (
                              <LockIcon
                                className="size-3 text-muted-foreground"
                                aria-hidden
                              />
                            ) : null}
                          </span>
                          {role.locked ? (
                            <Badge
                              variant="outline"
                              className="rounded-full border-transparent bg-muted px-2 py-0 text-[10px] font-normal text-muted-foreground"
                            >
                              Locked
                            </Badge>
                          ) : (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  type="button"
                                  className="inline-flex size-6 cursor-help items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                  aria-label={`${role.name}: ${role.description}`}
                                >
                                  <CircleHelpIcon
                                    className="size-3.5"
                                    aria-hidden
                                  />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs text-start">
                                {role.description}
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {RESOURCES.map((resource) => (
                    <React.Fragment key={resource.id}>
                      <TableRow className="bg-muted/30 hover:bg-muted/30">
                        <TableCell
                          colSpan={ROLES.length + 1}
                          className="border-y border-border/70 py-2.5 text-sm font-semibold"
                        >
                          {resource.name}
                        </TableCell>
                      </TableRow>
                      {resource.permissions.map((perm) => (
                        <TableRow
                          key={`${resource.id}-${perm.id}`}
                          className="hover:bg-muted/15"
                        >
                          <TableCell className="ps-6 text-sm text-muted-foreground sm:ps-8">
                            {perm.label}
                          </TableCell>
                          {ROLES.map((role) => {
                            const isChecked =
                              permissions[role.id]?.[resource.id]?.[perm.id] ??
                              false
                            const isAdmin = role.id === "admin"

                            return (
                              <TableCell
                                key={`${role.id}-${resource.id}-${perm.id}`}
                                className="text-center"
                              >
                                <div className="flex justify-center">
                                  <Checkbox
                                    id={`chk-${role.id}-${resource.id}-${perm.id}`}
                                    checked={isChecked}
                                    disabled={isAdmin}
                                    onCheckedChange={(checked) =>
                                      handleToggle(
                                        role.id,
                                        resource.id,
                                        perm.id,
                                        checked === true
                                      )
                                    }
                                    aria-label={`Toggle ${perm.label} for ${role.name}`}
                                    className={cn(
                                      !isAdmin && "cursor-pointer",
                                      isAdmin && "opacity-60"
                                    )}
                                  />
                                </div>
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  )
}
