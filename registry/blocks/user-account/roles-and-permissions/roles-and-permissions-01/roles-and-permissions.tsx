"use client"

import * as React from "react"
import { InfoIcon, RotateCcwIcon, SaveIcon, ShieldCheckIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Card } from "@sonojs/ui/components/card"
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
    description: "Full access to all resources.",
  },
  {
    id: "manager",
    name: "Manager",
    description: "Can manage users and billing, but cannot delete projects.",
  },
  {
    id: "editor",
    name: "Editor",
    description: "Can create and edit content.",
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access to most resources.",
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

export default function RolesAndPermissions01() {
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
      <div className="min-h-svh w-full bg-canvas px-4 py-10 text-foreground sm:px-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                <ShieldCheckIcon
                  className="size-6 text-primary"
                  aria-hidden
                />
                Role Permissions
              </h1>
              <p className="mt-1 text-muted-foreground">
                Configure granular access control for each role across the
                platform.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={handleReset}
                disabled={!isDirty}
              >
                <RotateCcwIcon className="size-4" aria-hidden />
                Discard Changes
              </Button>
              <Button
                type="button"
                className="gap-2"
                onClick={handleSave}
                disabled={!isDirty}
              >
                <SaveIcon className="size-4" aria-hidden />
                Save Changes
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden border-border/70 shadow-soft">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow className="border-b-2 border-border/70 hover:bg-transparent">
                    <TableHead className="w-[300px] text-base font-semibold text-foreground">
                      Resource / Permission
                    </TableHead>
                    {ROLES.map((role) => (
                      <TableHead
                        key={role.id}
                        className="min-w-[150px] text-center"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-semibold text-foreground">
                            {role.name}
                          </span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className="inline-flex cursor-help"
                                aria-label={`${role.name} role details`}
                              >
                                <Badge
                                  variant="outline"
                                  className="pointer-events-none gap-1 font-normal"
                                >
                                  Info
                                  <InfoIcon className="size-3" aria-hidden />
                                </Badge>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs text-start">
                              {role.description}
                            </TooltipContent>
                          </Tooltip>
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
                          className="border-y border-border/70 py-3 font-semibold"
                        >
                          {resource.name}
                        </TableCell>
                      </TableRow>
                      {resource.permissions.map((perm) => (
                        <TableRow
                          key={`${resource.id}-${perm.id}`}
                          className="hover:bg-muted/20"
                        >
                          <TableCell className="ps-8 text-sm text-muted-foreground">
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
                                    className={cn(isAdmin && "opacity-60")}
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
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
