"use client"

import * as React from "react"
import {
  CheckIcon,
  CopyIcon,
  KeyRoundIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@sonojs/ui/components/alert"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
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
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { cn } from "@/lib/utils"

type ApiKey = {
  id: string
  name: string
  prefix: string
  scopes: string[]
  expires: string
  lastUsed: string
}

const INITIAL_KEYS: ApiKey[] = [
  {
    id: "key_prod",
    name: "Production server",
    prefix: "sk_live_3f8a",
    scopes: ["read", "write"],
    expires: "Never",
    lastUsed: "12 min ago",
  },
  {
    id: "key_ci",
    name: "CI / GitHub Actions",
    prefix: "sk_live_9c21",
    scopes: ["read"],
    expires: "Jan 15, 2027",
    lastUsed: "Yesterday",
  },
  {
    id: "key_local",
    name: "Local development",
    prefix: "sk_test_a04e",
    scopes: ["read", "write"],
    expires: "30 days",
    lastUsed: "Never",
  },
]

function CopySecretButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false)

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="shrink-0 gap-2"
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
      {copied ? "Copied" : "Copy"}
    </Button>
  )
}

export default function ApiKeys({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [keys, setKeys] = React.useState(INITIAL_KEYS)
  const [open, setOpen] = React.useState(false)
  const [step, setStep] = React.useState<"form" | "reveal">("form")
  const [name, setName] = React.useState("")
  const [expires, setExpires] = React.useState("never")
  const [readScope, setReadScope] = React.useState(true)
  const [writeScope, setWriteScope] = React.useState(false)
  const [secret, setSecret] = React.useState<string | null>(null)

  function resetDialog() {
    setStep("form")
    setName("")
    setExpires("never")
    setReadScope(true)
    setWriteScope(false)
    setSecret(null)
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) resetDialog()
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    const scopes = [
      ...(readScope ? ["read"] : []),
      ...(writeScope ? ["write"] : []),
    ]
    const full = `sk_live_${Math.random().toString(36).slice(2, 18)}`
    setKeys((prev) => [
      {
        id: `key_${Date.now()}`,
        name: name.trim() || "Untitled token",
        prefix: full.slice(0, 13),
        scopes: scopes.length ? scopes : ["read"],
        expires:
          expires === "never"
            ? "Never"
            : expires === "30"
              ? "30 days"
              : "90 days",
        lastUsed: "Never",
      },
      ...prev,
    ])
    setSecret(full)
    setStep("reveal")
  }

  return (
    <main
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 text-start">
            <h1 className="text-2xl font-semibold tracking-tight">
              Access tokens
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Create tokens for CI and local tools. The secret is shown once.
            </p>
          </div>
          <Button type="button" onClick={() => setOpen(true)}>
            <PlusIcon className="size-4" aria-hidden />
            New token
          </Button>
        </div>

        <ul className="divide-y divide-border rounded-[12px] border border-border/70 bg-card shadow-soft">
          {keys.map((key) => (
            <li
              key={key.id}
              className="flex items-start gap-3 px-4 py-4 sm:px-5"
            >
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                <KeyRoundIcon
                  className="size-4 text-muted-foreground"
                  aria-hidden
                />
              </div>
              <div className="min-w-0 flex-1 space-y-2 text-start">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-foreground">{key.name}</p>
                  <span
                    className="font-mono text-xs text-muted-foreground"
                    dir="ltr"
                  >
                    {key.prefix}…
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {key.scopes.map((scope) => (
                    <Badge
                      key={scope}
                      variant="secondary"
                      className="capitalize"
                    >
                      {scope}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Expires {key.expires}
                  <span aria-hidden className="mx-1.5">
                    ·
                  </span>
                  Last used {key.lastUsed}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
                aria-label={`Revoke ${key.name}`}
                onClick={() =>
                  setKeys((prev) => prev.filter((k) => k.id !== key.id))
                }
              >
                <Trash2Icon className="size-4" aria-hidden />
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="gap-0 p-0 sm:max-w-md"
          style={{ maxWidth: "min(28rem, calc(100% - 2rem))" }}
        >
          {step === "form" ? (
            <form onSubmit={handleGenerate}>
              <DialogHeader className="border-b border-border/70 px-6 py-5">
                <DialogTitle>New access token</DialogTitle>
                <DialogDescription>
                  You’ll only see the full secret once after creating it.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 px-6 py-5">
                <div className="grid gap-2">
                  <Label htmlFor="api-keys-02-name">Name</Label>
                  <Input
                    id="api-keys-02-name"
                    placeholder="e.g. Production server"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="api-keys-02-expires">Expiration</Label>
                  <Select value={expires} onValueChange={setExpires}>
                    <SelectTrigger id="api-keys-02-expires" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="never">No expiration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium">Scopes</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="api-keys-02-read"
                        checked={readScope}
                        onCheckedChange={(v) => setReadScope(v === true)}
                      />
                      <Label htmlFor="api-keys-02-read" className="font-normal">
                        Read
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="api-keys-02-write"
                        checked={writeScope}
                        onCheckedChange={(v) => setWriteScope(v === true)}
                      />
                      <Label
                        htmlFor="api-keys-02-write"
                        className="font-normal"
                      >
                        Write
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
                <Button type="submit">Create token</Button>
              </DialogFooter>
            </form>
          ) : (
            <>
              <DialogHeader className="border-b border-border/70 px-6 py-5">
                <DialogTitle>Copy your token</DialogTitle>
                <DialogDescription>
                  Store it now — you won’t be able to view it again.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 px-6 py-5">
                <Alert variant="destructive">
                  <AlertTitle>Shown once</AlertTitle>
                  <AlertDescription>
                    If you close without copying, revoke this token and create a
                    new one.
                  </AlertDescription>
                </Alert>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    readOnly
                    dir="ltr"
                    value={secret ?? ""}
                    className="font-mono text-xs sm:text-sm"
                  />
                  <CopySecretButton value={secret ?? ""} />
                </div>
              </div>

              <DialogFooter className="border-t border-border/70 px-6 py-4">
                <Button type="button" onClick={() => handleOpenChange(false)}>
                  Done
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
