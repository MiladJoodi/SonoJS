"use client"

import * as React from "react"
import {
  CopyIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  ZapIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Switch } from "@sonojs/ui/components/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { cn } from "@/lib/utils"

type WebhookRow = {
  id: string
  url: string
  enabled: boolean
  status: "active" | "failing" | "paused"
  events: number
  lastFired: string
}

const INITIAL: WebhookRow[] = [
  {
    id: "wh_12345",
    url: "https://api.acmecorp.com/webhooks/billing",
    enabled: true,
    status: "active",
    events: 3,
    lastFired: "10 mins ago",
  },
  {
    id: "wh_67890",
    url: "https://hooks.slack.com/services/T01/B02/xyz",
    enabled: true,
    status: "active",
    events: 2,
    lastFired: "2 hours ago",
  },
  {
    id: "wh_11223",
    url: "https://zapier.com/hooks/catch/123/abc",
    enabled: false,
    status: "failing",
    events: 1,
    lastFired: "1 day ago",
  },
  {
    id: "wh_44556",
    url: "https://ops.example.com/hooks/deploy",
    enabled: true,
    status: "active",
    events: 5,
    lastFired: "Just now",
  },
]

function statusBadge(status: WebhookRow["status"]) {
  if (status === "failing") {
    return (
      <Badge variant="destructive" className="capitalize">
        failing
      </Badge>
    )
  }
  if (status === "paused") {
    return (
      <Badge variant="secondary" className="capitalize">
        paused
      </Badge>
    )
  }
  return (
    <Badge
      variant="secondary"
      className="border-transparent bg-emerald-500/15 capitalize text-emerald-700 dark:text-emerald-400"
    >
      active
    </Badge>
  )
}

export default function WebhookManagement({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [rows, setRows] = React.useState(INITIAL)

  const toggle = (id: string, enabled: boolean) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              enabled,
              status: enabled
                ? row.status === "failing"
                  ? "failing"
                  : "active"
                : "paused",
            }
          : row
      )
    )
  }

  return (
    <div
      className={cn(
        "w-full bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-16",
        className
      )}
      {...props}
    >
      <Card className="mx-auto max-w-4xl overflow-hidden border-border/70 shadow-soft">
        <CardHeader className="flex flex-col gap-4 border-b border-border/70 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-start">
            <CardTitle>Endpoints</CardTitle>
            <CardDescription>
              Compact list — enable, test, or edit each webhook.
            </CardDescription>
          </div>
          <Button type="button" size="sm" className="cursor-pointer gap-1.5">
            <PlusIcon className="size-4" aria-hidden />
            Add endpoint
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[4.5rem] ps-5">On</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Events</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Last fired
                  </TableHead>
                  <TableHead className="pe-5 text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="ps-5">
                      <Switch
                        checked={row.enabled}
                        onCheckedChange={(checked) =>
                          toggle(row.id, checked === true)
                        }
                        className="cursor-pointer"
                        aria-label={`Toggle ${row.id}`}
                      />
                    </TableCell>
                    <TableCell className="max-w-[14rem] sm:max-w-xs">
                      <p
                        dir="ltr"
                        className="truncate text-sm font-medium text-foreground"
                        title={row.url}
                      >
                        {row.url}
                      </p>
                      <p
                        dir="ltr"
                        className="mt-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {row.id}
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5 sm:hidden">
                        {statusBadge(row.status)}
                        <span className="text-xs text-muted-foreground">
                          {row.events} events
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {statusBadge(row.status)}
                    </TableCell>
                    <TableCell className="hidden tabular-nums md:table-cell">
                      {row.events}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground lg:table-cell">
                      {row.lastFired}
                    </TableCell>
                    <TableCell className="pe-5">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="hidden h-8 cursor-pointer gap-1 text-xs sm:inline-flex"
                        >
                          <ZapIcon className="size-3.5" aria-hidden />
                          Test
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              className="size-8 cursor-pointer"
                              aria-label={`Actions for ${row.id}`}
                            >
                              <EllipsisVerticalIcon
                                className="size-4"
                                aria-hidden
                              />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem className="cursor-pointer sm:hidden">
                              <ZapIcon className="size-4" aria-hidden />
                              Test
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <PencilIcon className="size-4" aria-hidden />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <CopyIcon className="size-4" aria-hidden />
                              Copy secret
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              className="cursor-pointer"
                            >
                              <Trash2Icon className="size-4" aria-hidden />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
