"use client"

import * as React from "react"
import { CodeIcon } from "lucide-react"

import { CodePanel } from "@/components/docs/code-panel"
import { DocsInstallationTabs } from "@/components/docs/docs-installation-tabs"
import { LoadingRing } from "@/components/sono-loader"
import { Button } from "@sonojs/ui/components/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@sonojs/ui/components/drawer"
import { highlightBlockInstall } from "@/lib/highlight-install-action"

/** Same baseline skip as docs install hints — keep lucide and the rest. */
const NPM_SKIP = new Set([
  "clsx",
  "tailwind-merge",
  "radix-ui",
  "class-variance-authority",
])

type InstallFile = { title: string; content: string }

type InstallMeta = {
  dependencies: string[]
  registryDependencies: string[]
  files: InstallFile[]
}

type HighlightedInstall = {
  cliHtml: string
  files: { title: string; code: string; html: string }[]
  usage: { title: string; code: string; html: string }[]
}

export type BlockInstallUsage = {
  title: string
  code: string
}

const metaCache = new Map<string, InstallMeta>()
const highlightCache = new Map<string, HighlightedInstall>()

function npmPackageName(spec: string) {
  if (spec.startsWith("@")) {
    const at = spec.indexOf("@", 1)
    return at === -1 ? spec : spec.slice(0, at)
  }
  const at = spec.indexOf("@")
  return at === -1 ? spec : spec.slice(0, at)
}

function notableNpm(deps: string[]) {
  return [...new Set(deps)]
    .filter((dep) => !NPM_SKIP.has(npmPackageName(dep)))
    .sort()
}

function parseMeta(json: {
  dependencies?: string[]
  registryDependencies?: string[]
  files?: { path?: string; target?: string; content?: string }[]
}): InstallMeta {
  const files: InstallFile[] = []
  for (const file of json.files ?? []) {
    if (!file.content) continue
    const title = file.target || file.path
    if (!title) continue
    files.push({ title, content: file.content })
  }
  return {
    dependencies: json.dependencies ?? [],
    registryDependencies: json.registryDependencies ?? [],
    files,
  }
}

function highlightKey(name: string, usage: BlockInstallUsage[]) {
  return `${name}\0${usage.map((item) => `${item.title}\0${item.code}`).join("\0")}`
}

async function loadMeta(name: string): Promise<InstallMeta> {
  const cached = metaCache.get(name)
  if (cached) return cached
  const response = await fetch(`/r/${encodeURIComponent(name)}.json`)
  if (!response.ok) throw new Error("missing")
  const json = (await response.json()) as Parameters<typeof parseMeta>[0]
  const next = parseMeta(json)
  metaCache.set(name, next)
  return next
}

const highlightInflight = new Map<string, Promise<HighlightedInstall>>()

async function loadHighlighted(
  name: string,
  usage: BlockInstallUsage[]
): Promise<HighlightedInstall> {
  const key = highlightKey(name, usage)
  const cached = highlightCache.get(key)
  if (cached) return cached

  const pending = highlightInflight.get(key)
  if (pending) return pending

  const task = highlightBlockInstall(name, usage)
    .then((next) => {
      highlightCache.set(key, next)
      return next
    })
    .finally(() => {
      highlightInflight.delete(key)
    })

  highlightInflight.set(key, task)
  return task
}

/** Warm registry JSON + highlight so the Code tab does not flash empty. */
export function prefetchBlockInstall(
  name: string,
  usage: BlockInstallUsage[] = []
) {
  void Promise.all([loadMeta(name), loadHighlighted(name, usage)]).catch(
    () => {}
  )
}

const drawerWidthClass = "overflow-x-hidden"

/** Fixed panel width. Long lines scroll inside; they must not grow the drawer. */
const drawerSizeStyle = {
  width: "min(42rem, calc(100vw - 1rem))",
  maxWidth: "min(42rem, calc(100vw - 1rem))",
} as const

export function BlockInstallBody({
  name,
  usage,
}: {
  name: string
  usage: BlockInstallUsage[]
}) {
  const key = highlightKey(name, usage)
  const [meta, setMeta] = React.useState<InstallMeta | null>(
    () => metaCache.get(name) ?? null
  )
  const [highlighted, setHighlighted] = React.useState<HighlightedInstall | null>(
    () => highlightCache.get(key) ?? null
  )
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    setError(null)

    const cachedMeta = metaCache.get(name)
    if (cachedMeta) setMeta(cachedMeta)
    else setMeta(null)

    const cachedHighlight = highlightCache.get(key)
    if (cachedHighlight) setHighlighted(cachedHighlight)
    else setHighlighted(null)

    Promise.all([loadMeta(name), loadHighlighted(name, usage)])
      .then(([nextMeta, nextHighlight]) => {
        if (cancelled) return
        setMeta(nextMeta)
        setHighlighted(nextHighlight)
      })
      .catch(() => {
        if (!cancelled) {
          setError("Install details are not available for this block.")
        }
      })

    return () => {
      cancelled = true
    }
    // `key` already encodes usage title+code — omit `usage` identity churn.
  // eslint-disable-next-line react-hooks/exhaustive-deps -- usage via key
  }, [key, name])

  if (error) {
    return (
      <div className="flex min-h-[28rem] w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    )
  }

  if (!meta || !highlighted) {
    return (
      <div
        className="flex min-h-[28rem] w-full items-center justify-center"
        role="status"
        aria-label="Loading install details"
      >
        <LoadingRing size={40} showLabel label="Loading…" />
      </div>
    )
  }

  const cli = `npx @sonojs/ui@latest add ${name}`
  const registry = meta.registryDependencies
    .filter((dep) => dep !== name)
    .sort()
  const npm = notableNpm(meta.dependencies)
  const manualNpm = npm.length > 0 ? `npm i ${npm.join(" ")}` : null
  const showAliasNote = meta.files.some((file) => file.content.includes("@/"))

  return (
    <div className="w-full min-w-0 max-w-full space-y-6">
      <div className="min-w-0 max-w-full">
        <DocsInstallationTabs
          cliCode={cli}
          cliHtml={highlighted.cliHtml}
          alsoNeedsRegistry={registry}
          alsoNeedsNpm={npm}
          manualNpmCommand={manualNpm}
          files={highlighted.files}
          showAliasNote={showAliasNote}
          copyTooltip={false}
        />
      </div>

      {highlighted.usage.length > 0 ? (
        <section className="min-w-0 space-y-3">
          <h3 className="text-sm font-medium text-foreground">Usage</h3>
          {highlighted.usage.map((item) => (
            <CodePanel
              key={item.title}
              title={item.title}
              code={item.code}
              html={item.html}
              className="min-w-0 max-w-full rounded-(--radius-code) border border-(--code-border)"
              copyTooltip={false}
            />
          ))}
        </section>
      ) : null}
    </div>
  )
}

export function BlockInstallDrawer({
  name,
  title,
  usage = [],
}: {
  /** Registry item name passed to `sonojs add`. */
  name: string
  title: string
  usage?: BlockInstallUsage[]
}) {
  const [open, setOpen] = React.useState(false)
  const [shownTitle, setShownTitle] = React.useState(title)
  if (title && title !== shownTitle) setShownTitle(title)

  return (
    <Drawer direction="end" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" className="shadow-none">
          <CodeIcon />
          Code
        </Button>
      </DrawerTrigger>
      <DrawerContent className={drawerWidthClass} style={drawerSizeStyle}>
        <DrawerHeader className="min-w-0 border-b border-border/60">
          <DrawerTitle>{shownTitle}</DrawerTitle>
          <DrawerDescription>
            Install command, source, and usage.
          </DrawerDescription>
        </DrawerHeader>
        <div className="scrollbar-soft min-h-0 w-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-4">
          {open ? <BlockInstallBody key={name} name={name} usage={usage} /> : null}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
