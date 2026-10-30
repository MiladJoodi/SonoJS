"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import {
  CheckIcon,
  DownloadIcon,
  EyeIcon,
  FileCodeIcon,
  Maximize2Icon,
  Minimize2Icon,
  MoreHorizontalIcon,
  PenLineIcon,
  PrinterIcon,
  RotateCcwIcon,
} from "lucide-react"

import { SoftButton, SoftGroup } from "@/components/docs/soft-toolbar"
import { CopyButton } from "@/components/docs/copy-button"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import type { MarkdownEditorHandle } from "./editor"
import { PreviewPane } from "./preview-pane"
import { copyText, downloadTextFile, suggestFilename } from "./lib/download"
import { markdownToHtml, wrapHtmlDocument } from "./lib/markdown-html"
import { computeStats } from "./lib/stats"
import {
  clearDraft,
  getInitialMarkdown,
  SAMPLE_MARKDOWN,
  saveDraft,
} from "./lib/storage"

const MarkdownEditor = dynamic(
  () => import("./editor").then((m) => m.MarkdownEditor),
  {
    ssr: false,
    loading: () => (
      <div className="border-border/70 bg-card text-muted-foreground flex h-full min-h-48 items-center justify-center rounded-[12px] border text-sm sm:min-h-80">
        Loading editor…
      </div>
    ),
  }
)

type SurfaceMode = "write" | "preview"

export function Workspace() {
  const { resolvedTheme } = useTheme()
  const editorHandleRef = React.useRef<MarkdownEditorHandle | null>(null)

  const [ready, setReady] = React.useState(false)
  const [themeReady, setThemeReady] = React.useState(false)
  const [markdown, setMarkdown] = React.useState(SAMPLE_MARKDOWN)
  const [diffBaseline, setDiffBaseline] = React.useState(SAMPLE_MARKDOWN)
  const [dirty, setDirty] = React.useState(false)
  const [editorKey, setEditorKey] = React.useState(0)
  const [surface, setSurface] = React.useState<SurfaceMode>("write")
  const [zen, setZen] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [actionHint, setActionHint] = React.useState<string | null>(null)

  const theme: "light" | "dark" =
    resolvedTheme === "dark" ? "dark" : "light"

  const stats = React.useMemo(() => computeStats(markdown), [markdown])

  const handleEditorReady = React.useCallback((handle: MarkdownEditorHandle) => {
    editorHandleRef.current = handle
  }, [])

  React.useEffect(() => {
    setThemeReady(true)
  }, [])

  React.useEffect(() => {
    const initial = getInitialMarkdown()
    setMarkdown(initial)
    setDiffBaseline(initial)
    setDirty(false)
    setReady(true)
  }, [])

  /** Latest text from the editor, kept in React state only. */
  const syncFromEditor = React.useCallback(() => {
    const latest = editorHandleRef.current?.getMarkdown()
    if (typeof latest === "string") setMarkdown(latest)
    return latest ?? markdown
  }, [markdown])

  /** Write to localStorage once — never on every keystroke. */
  const persist = React.useCallback(
    (source?: string) => {
      const latest =
        source ?? editorHandleRef.current?.getMarkdown() ?? markdown
      setMarkdown(latest)
      const next = saveDraft(latest)
      setDirty(false)
      return next
    },
    [markdown]
  )

  const handleChange = React.useCallback((value: string) => {
    setMarkdown(value)
    setDirty(true)
    setError(null)
  }, [])

  React.useEffect(() => {
    function onVisibility() {
      if (document.visibilityState === "hidden" && dirty) persist()
    }
    function onBeforeUnload(event: BeforeUnloadEvent) {
      if (!dirty) return
      persist()
      event.preventDefault()
      event.returnValue = ""
    }
    document.addEventListener("visibilitychange", onVisibility)
    window.addEventListener("beforeunload", onBeforeUnload)
    return () => {
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("beforeunload", onBeforeUnload)
    }
  }, [dirty, persist])

  React.useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && zen) setZen(false)
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault()
        persist()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [persist, zen])

  function flashHint(message: string) {
    setActionHint(message)
    window.setTimeout(() => setActionHint(null), 1600)
  }

  function handleReset() {
    clearDraft()
    setMarkdown(SAMPLE_MARKDOWN)
    setDiffBaseline(SAMPLE_MARKDOWN)
    setDirty(false)
    setError(null)
    setSurface("write")
    setEditorKey((k) => k + 1)
    flashHint("Sample restored")
  }

  async function handleCopyHtml() {
    const latest = syncFromEditor()
    const ok = await copyText(markdownToHtml(latest))
    flashHint(ok ? "HTML copied" : "Copy failed")
  }

  function handleDownloadMarkdown() {
    const latest = syncFromEditor()
    downloadTextFile(
      `${suggestFilename(latest)}.md`,
      latest,
      "text/markdown;charset=utf-8"
    )
    flashHint("Markdown downloaded")
  }

  function handleDownloadHtml() {
    const latest = syncFromEditor()
    const name = suggestFilename(latest)
    const doc = wrapHtmlDocument(name, markdownToHtml(latest))
    downloadTextFile(`${name}.html`, doc, "text/html;charset=utf-8")
    flashHint("HTML downloaded")
  }

  function handlePrint() {
    const latest = syncFromEditor()
    const name = suggestFilename(latest)
    const doc = wrapHtmlDocument(name, markdownToHtml(latest))
    const frame = document.createElement("iframe")
    frame.setAttribute("aria-hidden", "true")
    Object.assign(frame.style, {
      position: "fixed",
      insetInlineStart: "-10000px",
      width: "0",
      height: "0",
      border: "0",
    })
    document.body.appendChild(frame)
    const win = frame.contentWindow
    if (!win) {
      frame.remove()
      return
    }
    win.document.open()
    win.document.write(doc)
    win.document.close()
    win.focus()
    win.print()
    window.setTimeout(() => frame.remove(), 1000)
  }

  const showEditor = ready && themeReady

  return (
    <div
      className={cn(
        "bg-canvas flex h-full min-h-0 flex-col",
        zen && "markdown-editor-zen bg-background"
      )}
    >
      {!zen ? (
        <header
          className={cn(
            "border-border/70 bg-background flex shrink-0 items-center justify-between gap-2 border-b px-3 py-2.5 sm:gap-3 sm:px-4",
            /* Mobile: no second bar — actions sit on the Tools ListIndex row */
            "max-lg:h-0 max-lg:min-h-0 max-lg:overflow-visible max-lg:border-0 max-lg:p-0"
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden max-lg:hidden">
            <h1 className="sr-only">Markdown Editor</h1>
            {error || actionHint ? (
              <p
                className={cn(
                  "text-caption truncate",
                  error ? "text-destructive" : "text-muted-foreground"
                )}
                aria-live="polite"
              >
                {error ?? actionHint}
              </p>
            ) : null}
          </div>
          <h1 className="sr-only lg:hidden">Markdown Editor</h1>

          <div
            className={cn(
              "flex shrink-0 items-center justify-end gap-1",
              "max-lg:fixed max-lg:top-(--header-height) max-lg:end-3 max-lg:start-auto max-lg:z-50 max-lg:h-11 max-lg:w-max max-lg:items-center"
            )}
          >
            <SoftGroup label="Surface" className="h-8">
              <SoftButton
                label="Write"
                pressed={surface === "write"}
                onClick={() => setSurface("write")}
                className="h-full gap-1.5 px-2 sm:px-2.5"
              >
                <PenLineIcon className="size-4 shrink-0" aria-hidden />
                <span className="hidden sm:inline">Write</span>
              </SoftButton>
              <SoftButton
                label="Preview"
                pressed={surface === "preview"}
                onClick={() => {
                  persist()
                  setSurface("preview")
                }}
                className="h-full gap-1.5 px-2 sm:px-2.5"
              >
                <EyeIcon className="size-4 shrink-0" aria-hidden />
                <span className="hidden sm:inline">Preview</span>
              </SoftButton>
            </SoftGroup>

            <CopyButton
              value={markdown}
              tone="chrome"
              tooltipIdle="Copy Markdown"
              tooltipCopied="Copied"
              className="size-8 border border-border bg-card"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-8 shrink-0"
                  aria-label="More actions"
                >
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={6}
                className="w-56 rounded-[12px] border border-border/70 bg-card p-1.5 shadow-soft ring-0"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Draft</DropdownMenuLabel>
                  <DropdownMenuItem
                    className="gap-2 px-2.5 py-2"
                    onClick={() => persist()}
                  >
                    <CheckIcon className="size-3.5 text-muted-foreground" />
                    Save draft
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Export</DropdownMenuLabel>
                  <DropdownMenuItem
                    className="gap-2 px-2.5 py-2"
                    onClick={() => void handleCopyHtml()}
                  >
                    <FileCodeIcon className="size-3.5 text-muted-foreground" />
                    Copy HTML
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="gap-2 px-2.5 py-2"
                    onClick={handleDownloadMarkdown}
                  >
                    <DownloadIcon className="size-3.5 text-muted-foreground" />
                    Download Markdown
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="gap-2 px-2.5 py-2"
                    onClick={handleDownloadHtml}
                  >
                    <DownloadIcon className="size-3.5 text-muted-foreground" />
                    Download HTML
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="gap-2 px-2.5 py-2"
                    onClick={handlePrint}
                  >
                    <PrinterIcon className="size-3.5 text-muted-foreground" />
                    Print…
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>View</DropdownMenuLabel>
                  <DropdownMenuItem
                    className="gap-2 px-2.5 py-2"
                    onClick={() => setZen(true)}
                  >
                    <Maximize2Icon className="size-3.5 text-muted-foreground" />
                    Zen mode
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    className="gap-2 px-2.5 py-2"
                    onClick={handleReset}
                  >
                    <RotateCcwIcon className="size-3.5" />
                    Reset to sample
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      ) : (
        /* Own chrome row — never float over Rich / Source / Diff */
        <div className="border-border/70 bg-background flex shrink-0 items-center justify-end border-b px-3 py-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="cursor-pointer gap-1.5"
            onClick={() => setZen(false)}
          >
            <Minimize2Icon className="size-4" />
            Exit Zen
          </Button>
        </div>
      )}

      <div
        className={cn(
          "flex min-h-0 flex-1",
          zen ? "p-0" : "p-2 sm:p-3 md:p-4"
        )}
      >
        <div className="relative flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          {showEditor && surface === "write" ? (
            <MarkdownEditor
              key={editorKey}
              initialValue={markdown}
              diffMarkdown={diffBaseline}
              theme={theme}
              onChange={handleChange}
              onReady={handleEditorReady}
              onError={setError}
            />
          ) : null}
          {showEditor && surface === "preview" ? (
            <PreviewPane markdown={markdown} className="h-full" />
          ) : null}
          {!showEditor ? (
            <div className="border-border/70 bg-card text-muted-foreground flex h-full min-h-48 items-center justify-center rounded-[12px] border text-sm sm:min-h-80">
              Loading editor…
            </div>
          ) : null}
        </div>
      </div>

      {!zen ? (
        <footer className="border-border/70 bg-background text-muted-foreground flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-t px-3 py-2 text-xs sm:px-4">
          <span className="tabular-nums">
            {stats.words} {stats.words === 1 ? "word" : "words"}
          </span>
          <span className="text-border" aria-hidden>
            ·
          </span>
          <span className="tabular-nums">{stats.characters} chars</span>
          <span className="text-border" aria-hidden>
            ·
          </span>
          <span className="tabular-nums">
            {stats.readingMinutes === 0
              ? "—"
              : `${stats.readingMinutes} min read`}
          </span>
          <span className="text-muted-foreground/80 ms-auto hidden sm:inline">
            Ctrl/Cmd+S save · Ctrl/Cmd+F find · Esc exits Zen
          </span>
        </footer>
      ) : null}
    </div>
  )
}
