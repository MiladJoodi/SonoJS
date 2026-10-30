"use client"

import * as React from "react"
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands"
import { markdown } from "@codemirror/lang-markdown"
import { EditorState } from "@codemirror/state"
import {
  EditorView,
  keymap,
  lineNumbers,
  placeholder as cmPlaceholder,
} from "@codemirror/view"

import { cn } from "@/lib/utils"

import { useSourceCm } from "./source-cm-context"

type MarkdownSourcePaneProps = {
  value: string
  onChange: (markdown: string) => void
  theme: "light" | "dark"
  className?: string
  /** Scroll host for the Display (rich) pane — enables proportional sync. */
  peerScrollRef?: React.RefObject<HTMLElement | null>
  label?: string
}

function syncScrollPair(
  source: HTMLElement,
  peer: HTMLElement,
  lock: { current: boolean }
) {
  if (lock.current) return
  lock.current = true
  const maxS = source.scrollHeight - source.clientHeight
  const maxP = peer.scrollHeight - peer.clientHeight
  if (maxS > 0 && maxP > 0) {
    peer.scrollTop = (source.scrollTop / maxS) * maxP
  } else {
    peer.scrollTop = source.scrollTop
  }
  requestAnimationFrame(() => {
    lock.current = false
  })
}

/** Pixel height of leading YAML frontmatter lines in the CodeMirror pane. */
function measureFrontmatterBlockHeight(cmHost: HTMLElement): number {
  const lines = [
    ...cmHost.querySelectorAll<HTMLElement>(".cm-content .cm-line"),
  ]
  if (lines.length === 0) return 0
  if ((lines[0].textContent ?? "").trim() !== "---") return 0

  let end = -1
  for (let i = 1; i < lines.length; i++) {
    if ((lines[i].textContent ?? "").trim() === "---") {
      end = i
      break
    }
  }
  if (end < 0) return 0

  // Include the blank line after the closing fence so `# Welcome` lines up.
  if (
    end + 1 < lines.length &&
    (lines[end + 1].textContent ?? "").trim() === ""
  ) {
    end += 1
  }

  const top = lines[0].getBoundingClientRect().top
  const bottom = lines[end].getBoundingClientRect().bottom
  return Math.max(0, bottom - top)
}

function displayFrontmatterChromeHeight(peer: HTMLElement | null): number {
  if (!peer) return 0
  const rich = peer.querySelector(".markdown-mdx-content")
  const first = rich?.firstElementChild as HTMLElement | null
  if (!first) return 0
  // Lexical frontmatter decorator — only count real chrome, not body text.
  if (
    first.getAttribute("data-lexical-decorator") === "true" ||
    first.querySelector("[data-editor-type='frontmatter']")
  ) {
    return first.getBoundingClientRect().height
  }
  return 0
}

function applyDiffFrontmatterPad(
  cmHost: HTMLElement,
  peer: HTMLElement | null
) {
  const root = cmHost.closest(".markdown-editor-root") as HTMLElement | null
  if (!root) return
  const fm = measureFrontmatterBlockHeight(cmHost)
  const chrome = displayFrontmatterChromeHeight(peer)
  const pad = Math.max(0, Math.round(fm - chrome))
  root.style.setProperty("--diff-fm-pad", `${pad}px`)
}

export function MarkdownSourcePane({
  value,
  onChange,
  theme,
  className,
  peerScrollRef,
  label = "Markdown",
}: MarkdownSourcePaneProps) {
  const hostRef = React.useRef<HTMLDivElement>(null)
  const viewRef = React.useRef<EditorView | null>(null)
  const onChangeRef = React.useRef(onChange)
  const valueRef = React.useRef(value)
  const scrollLock = React.useRef(false)
  const { setView: setSourceView } = useSourceCm()

  React.useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  React.useEffect(() => {
    valueRef.current = value
  }, [value])

  React.useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const view = new EditorView({
      parent: host,
      state: EditorState.create({
        doc: valueRef.current,
        extensions: [
          lineNumbers(),
          history(),
          markdown(),
          cmPlaceholder("Markdown source…"),
          keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
          EditorView.lineWrapping,
          EditorView.updateListener.of((update) => {
            if (!update.docChanged) return
            const next = update.state.doc.toString()
            valueRef.current = next
            onChangeRef.current(next)
          }),
          EditorView.theme({
            "&": {
              height: "100%",
              fontSize: "14px",
            },
            ".cm-scroller": {
              fontFamily: "var(--font-sono-mono), ui-monospace, monospace",
              lineHeight: "1.55",
              overflow: "auto",
            },
            ".cm-content": {
              caretColor: "var(--foreground)",
              paddingBlock: "0.5rem",
              paddingInline: "0.75rem 1rem",
            },
            ".cm-gutters": {
              background: "color-mix(in oklab, var(--muted) 55%, var(--card))",
              borderInlineEnd:
                "1px solid color-mix(in oklab, var(--border) 70%, transparent)",
              color: "var(--muted-foreground)",
            },
          }),
        ],
      }),
    })
    viewRef.current = view
    setSourceView(view)

    return () => {
      setSourceView(null)
      view.destroy()
      viewRef.current = null
    }
    // Mount once — external value sync is handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional
  }, [])

  // Push external markdown into CM when it diverges (rich → source).
  React.useEffect(() => {
    const view = viewRef.current
    if (!view) return
    const current = view.state.doc.toString()
    if (current === value) return
    view.dispatch({
      changes: { from: 0, to: current.length, insert: value },
    })
  }, [value])

  // Theme class on host for dark/light chrome (CM uses CSS vars).
  React.useEffect(() => {
    const host = hostRef.current
    if (!host) return
    host.dataset.theme = theme
  }, [theme])

  // Proportional scroll sync + frontmatter vertical pad for Diff.
  React.useEffect(() => {
    if (!peerScrollRef) return
    const view = viewRef.current
    const cmHost = hostRef.current
    if (!view || !cmHost) return

    let peer: HTMLElement | null = null
    let disposed = false
    let removePeer: (() => void) | null = null
    const scroller = view.scrollDOM

    const realign = () => {
      if (disposed) return
      applyDiffFrontmatterPad(cmHost, peer ?? peerScrollRef.current)
    }

    const onSourceScroll = () => {
      if (!peer) return
      syncScrollPair(scroller, peer, scrollLock)
    }
    scroller.addEventListener("scroll", onSourceScroll, { passive: true })

    const attachPeer = () => {
      if (disposed) return
      const next = peerScrollRef.current
      if (!next || next === peer) {
        if (!next) requestAnimationFrame(attachPeer)
        else realign()
        return
      }
      removePeer?.()
      peer = next
      const onPeerScroll = () => syncScrollPair(peer!, scroller, scrollLock)
      peer.addEventListener("scroll", onPeerScroll, { passive: true })
      removePeer = () => peer?.removeEventListener("scroll", onPeerScroll)
      realign()
    }
    attachPeer()

    const ro = new ResizeObserver(realign)
    ro.observe(cmHost)
    view.requestMeasure()
    requestAnimationFrame(realign)

    return () => {
      disposed = true
      scroller.removeEventListener("scroll", onSourceScroll)
      removePeer?.()
      ro.disconnect()
      const root = cmHost.closest(".markdown-editor-root") as HTMLElement | null
      root?.style.setProperty("--diff-fm-pad", "0px")
    }
  }, [peerScrollRef])

  // Re-measure when Markdown text changes (frontmatter grow/shrink).
  React.useEffect(() => {
    if (!peerScrollRef) return
    const cmHost = hostRef.current
    if (!cmHost) return
    requestAnimationFrame(() =>
      applyDiffFrontmatterPad(cmHost, peerScrollRef.current)
    )
  }, [value, peerScrollRef])

  return (
    <div
      className={cn("markdown-source-pane", className)}
      data-markdown-source-pane=""
    >
      <div className="markdown-pane-label" aria-hidden>
        {label}
      </div>
      <div ref={hostRef} className="markdown-source-pane-host" />
    </div>
  )
}
