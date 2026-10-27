"use client"

import * as React from "react"
import {
  ActivityIcon,
  AlertCircleIcon,
  CheckIcon,
  CopyIcon,
  EllipsisVerticalIcon,
  KeyRoundIcon,
  PlusIcon,
  ShieldAlertIcon,
  Trash2Icon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@sonojs/ui/components/alert"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
} from "@sonojs/ui/components/card"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@sonojs/ui/components/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { cn } from "@/lib/utils"

const API_KEYS = [
  {
    id: "key_1",
    name: "Production API Key",
    token: "sk_live_••••••••••••••••••••3f8a",
    environment: "live" as const,
    lastUsed: "10 mins ago",
    created: "Oct 12, 2026",
  },
  {
    id: "key_2",
    name: "Staging Webhooks",
    token: "sk_test_••••••••••••••••••••9d2c",
    environment: "test" as const,
    lastUsed: "2 days ago",
    created: "Oct 15, 2026",
  },
  {
    id: "key_3",
    name: "Developer Sandbox - Alex",
    token: "sk_test_••••••••••••••••••••1b4e",
    environment: "test" as const,
    lastUsed: "Never",
    created: "Oct 24, 2026",
  },
]

function CopyTokenButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false)

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      className="size-8 shrink-0 text-muted-foreground"
      aria-label={copied ? "Copied" : "Copy token"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1500)
        } catch {
          /* ignore */
        }
      }}
    >
      {copied ? (
        <CheckIcon className="size-3.5" aria-hidden />
      ) : (
        <CopyIcon className="size-3.5" aria-hidden />
      )}
    </Button>
  )
}

export default function ApiKeys({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [createOpen, setCreateOpen] = React.useState(false)

  return (
    <main
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="min-w-0 text-start">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              API Keys
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your API keys for programmatic access to the platform.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" variant="outline">
              <ShieldAlertIcon className="size-4" aria-hidden />
              Roll All Keys
            </Button>
            <Button type="button" onClick={() => setCreateOpen(true)}>
              <PlusIcon className="size-4" aria-hidden />
              Create new key
            </Button>
          </div>
        </div>

        <Alert className="border-primary/20 bg-primary/5 text-foreground">
          <AlertCircleIcon className="text-primary" aria-hidden />
          <AlertTitle className="text-foreground">
            Secret API keys should be kept secure
          </AlertTitle>
          <AlertDescription>
            Do not share your secret API keys in publicly accessible areas such
            as GitHub, client-side code, and so forth.
          </AlertDescription>
        </Alert>

        <Card className="overflow-hidden border-border/70 bg-card shadow-soft">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-11 px-4">Name</TableHead>
                  <TableHead className="h-11 px-4">Token</TableHead>
                  <TableHead className="h-11 px-4">Environment</TableHead>
                  <TableHead className="h-11 px-4">Last Used</TableHead>
                  <TableHead className="h-11 px-4 text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {API_KEYS.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell className="px-4 py-3">
                      <div className="flex min-w-0 flex-col gap-0.5 text-start">
                        <span className="font-medium text-foreground">
                          {key.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Created {key.created}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex min-w-0 items-center gap-2 font-mono text-sm text-foreground">
                        <KeyRoundIcon
                          className="size-4 shrink-0 text-muted-foreground"
                          aria-hidden
                        />
                        <span className="min-w-0 truncate" dir="ltr">
                          {key.token}
                        </span>
                        <CopyTokenButton value={key.token} />
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge
                        variant={
                          key.environment === "live" ? "default" : "secondary"
                        }
                        className="uppercase tracking-wider"
                      >
                        {key.environment}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-muted-foreground">
                      {key.lastUsed}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="size-8"
                            aria-label={`Actions for ${key.name}`}
                          >
                            <EllipsisVerticalIcon
                              className="size-4"
                              aria-hidden
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>
                            <ActivityIcon className="size-4" aria-hidden />
                            View Usage Logs
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive">
                            <Trash2Icon className="size-4" aria-hidden />
                            Revoke Key
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent
          className="gap-0 p-0 sm:max-w-md"
          style={{ maxWidth: "min(28rem, calc(100% - 2rem))" }}
        >
          <DialogHeader className="border-b border-border/70 px-6 py-5">
            <DialogTitle>Create API Key</DialogTitle>
            <DialogDescription>
              Generate a new secret key for API access.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 px-6 py-5">
            <div className="grid gap-2">
              <Label htmlFor="api-keys-01-name">
                Key Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="api-keys-01-name"
                placeholder="e.g. Production Billing"
                autoComplete="off"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="api-keys-01-env">
                Environment <span className="text-destructive">*</span>
              </Label>
              <Select defaultValue="test">
                <SelectTrigger id="api-keys-01-env" className="w-full">
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="test">Test / Sandbox</SelectItem>
                  <SelectItem value="live">Live / Production</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Permissions</p>
              <div className="space-y-3 rounded-lg border border-border/70 bg-muted/40 p-4">
                <div className="flex items-start gap-3">
                  <Checkbox id="api-keys-01-perm-read" defaultChecked />
                  <Label
                    htmlFor="api-keys-01-perm-read"
                    className="font-normal leading-snug"
                  >
                    Read access to all resources
                  </Label>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox id="api-keys-01-perm-write" />
                  <Label
                    htmlFor="api-keys-01-perm-write"
                    className="font-normal leading-snug"
                  >
                    Write access to all resources
                  </Label>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox id="api-keys-01-perm-billing" />
                  <Label
                    htmlFor="api-keys-01-perm-billing"
                    className="font-normal leading-snug"
                  >
                    Access to Billing &amp; Invoices
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-border/70 px-6 py-4">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={() => setCreateOpen(false)}>
              Generate Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
