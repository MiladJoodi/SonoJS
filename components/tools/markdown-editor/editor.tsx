"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import {
  AdmonitionDirectiveDescriptor,
  ALL_HEADING_LEVELS,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  quotePlugin,
  searchPlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor"

import "@mdxeditor/editor/style.css"
import "./styles/editor.css"
import {
  EditorLayoutProvider,
  type EditorLayoutMode,
} from "./editor-layout"
import { imageToDataUrl } from "./lib/image-upload"
import { MarkdownSourcePane } from "./markdown-source-pane"
import { SourceCmProvider } from "./source-cm-context"
import { MarkdownToolbar } from "./toolbar"

export type MarkdownEditorHandle = {
  getMarkdown: () => string
  setMarkdown: (markdown: string) => void
  focus: () => void
}

type MarkdownEditorProps = {
  initialValue: string
  /** Baseline kept for plugin init (Diff uses live Display | Markdown split). */
  diffMarkdown: string
  theme: "light" | "dark"
  onChange: (markdown: string) => void
  onReady?: (handle: MarkdownEditorHandle) => void
  onError?: (message: string) => void
}

/** Lean list — duplicates (yml/sh/empty) dropped so the mobile picker stays short. */
const CODE_BLOCK_LANGUAGES = {
  txt: "Plain text",
  js: "JavaScript",
  jsx: "JSX",
  ts: "TypeScript",
  tsx: "TSX",
  css: "CSS",
  html: "HTML",
  json: "JSON",
  md: "Markdown",
  py: "Python",
  go: "Go",
  rust: "Rust",
  sql: "SQL",
  bash: "Bash",
  yaml: "YAML",
  xml: "XML",
  graphql: "GraphQL",
}

function SourcePanePortal({
  layout,
  rootRef,
  markdown,
  onSourceChange,
  theme,
  peerScrollRef,
}: {
  layout: EditorLayoutMode
  rootRef: React.RefObject<HTMLDivElement | null>
  markdown: string
  onSourceChange: (md: string) => void
  theme: "light" | "dark"
  peerScrollRef: React.RefObject<HTMLElement | null>
}) {
  const [host, setHost] = React.useState<HTMLElement | null>(null)

  React.useLayoutEffect(() => {
    if (layout !== "diff" && layout !== "source") {
      setHost(null)
      return
    }
    let cancelled = false
    const tryFind = () => {
      if (cancelled) return
      const wrapper = rootRef.current?.querySelector(
        ".mdxeditor-diff-source-wrapper"
      ) as HTMLElement | null
      if (wrapper) {
        setHost(wrapper)
        return
      }
      requestAnimationFrame(tryFind)
    }
    tryFind()
    return () => {
      cancelled = true
    }
  }, [layout, rootRef])

  if (!host || (layout !== "diff" && layout !== "source")) return null

  return createPortal(
    <MarkdownSourcePane
      value={markdown}
      onChange={onSourceChange}
      theme={theme}
      peerScrollRef={layout === "diff" ? peerScrollRef : undefined}
      label="Markdown"
      className={
        layout === "source"
          ? "markdown-source-pane--solo"
          : "markdown-source-pane--split"
      }
    />,
    host
  )
}

export function MarkdownEditor({
  initialValue,
  diffMarkdown,
  theme,
  onChange,
  onReady,
  onError,
}: MarkdownEditorProps) {
  const editorRef = React.useRef<MDXEditorMethods>(null)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const peerScrollRef = React.useRef<HTMLElement | null>(null)
  const onChangeRef = React.useRef(onChange)
  const onReadyRef = React.useRef(onReady)
  const onErrorRef = React.useRef(onError)
  const applyingSourceRef = React.useRef(false)

  const [layout, setLayout] = React.useState<EditorLayoutMode>("rich-text")
  const [markdown, setMarkdown] = React.useState(initialValue)

  React.useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  React.useEffect(() => {
    onReadyRef.current = onReady
  }, [onReady])

  React.useEffect(() => {
    onErrorRef.current = onError
  }, [onError])

  React.useEffect(() => {
    onReadyRef.current?.({
      getMarkdown: () => editorRef.current?.getMarkdown() ?? "",
      setMarkdown: (next) => {
        editorRef.current?.setMarkdown(next)
        setMarkdown(next)
      },
      focus: () => {
        editorRef.current?.focus?.(undefined, { defaultSelection: "rootStart" })
      },
    })
  }, [])

  // Resolve Display scroll host for Diff sync.
  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const find = () => {
      const el =
        (root.querySelector(
          ".mdxeditor-root-contenteditable"
        ) as HTMLElement | null) ??
        (root.querySelector(
          '[class*="_rootContentEditableWrapper_"]'
        ) as HTMLElement | null)
      peerScrollRef.current = el
    }
    find()
    const mo = new MutationObserver(find)
    mo.observe(root, { childList: true, subtree: true })
    return () => mo.disconnect()
  }, [layout])

  // Clipboard image paste → insert via data URL (same path as toolbar upload).
  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return

    async function onPaste(event: ClipboardEvent) {
      const items = event.clipboardData?.items
      if (!items) return
      const imageItem = Array.from(items).find((item) =>
        item.type.startsWith("image/")
      )
      if (!imageItem) return
      const file = imageItem.getAsFile()
      if (!file) return
      event.preventDefault()
      try {
        const src = await imageToDataUrl(file)
        const md = editorRef.current?.getMarkdown() ?? ""
        const imageMd = `\n\n![pasted image](${src})\n\n`
        const next = `${md.trimEnd()}${imageMd}`
        editorRef.current?.setMarkdown(next)
        setMarkdown(next)
        onChangeRef.current(next)
      } catch {
        onErrorRef.current?.("Could not paste image from clipboard.")
      }
    }

    root.addEventListener("paste", onPaste, true)
    return () => root.removeEventListener("paste", onPaste, true)
  }, [])

  const handleRichChange = React.useCallback((md: string) => {
    if (applyingSourceRef.current) return
    setMarkdown(md)
    onChangeRef.current(md)
  }, [])

  const handleSourceChange = React.useCallback((md: string) => {
    applyingSourceRef.current = true
    setMarkdown(md)
    editorRef.current?.setMarkdown(md)
    onChangeRef.current(md)
    // setMarkdown may emit onChange async — keep the guard briefly.
    window.setTimeout(() => {
      applyingSourceRef.current = false
    }, 50)
  }, [])

  const plugins = React.useMemo(
    () => [
      toolbarPlugin({
        toolbarContents: () => <MarkdownToolbar />,
      }),
      headingsPlugin({ allowedHeadingLevels: [...ALL_HEADING_LEVELS] }),
      listsPlugin(),
      quotePlugin(),
      thematicBreakPlugin(),
      linkPlugin(),
      linkDialogPlugin(),
      imagePlugin({
        imageUploadHandler: imageToDataUrl,
        allowSetImageDimensions: true,
        // Upload from device (data URL) or paste a Sono / own-host URL — no stock placeholders.
        imageAutocompleteSuggestions: [],
      }),
      tablePlugin(),
      frontmatterPlugin(),
      codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
      codeMirrorPlugin({
        codeBlockLanguages: CODE_BLOCK_LANGUAGES,
      }),
      directivesPlugin({
        directiveDescriptors: [AdmonitionDirectiveDescriptor],
      }),
      searchPlugin(),
      // Keep plugin for wrapper chrome; we never switch to MDX MergeView.
      diffSourcePlugin({
        viewMode: "rich-text",
        diffMarkdown,
      }),
      markdownShortcutPlugin(),
    ],
    [diffMarkdown]
  )

  // Markdown/code island stays LTR; workspace chrome inherits site RTL/LTR.
  return (
    <EditorLayoutProvider layout={layout} setLayout={setLayout}>
      <SourceCmProvider>
        <div
          ref={rootRef}
          className="markdown-editor-root h-full min-h-0 w-full overflow-hidden rounded-[12px] border border-border/70 bg-card"
          dir="ltr"
          data-markdown-editor-root=""
          data-layout={layout}
        >
          <MDXEditor
            ref={editorRef}
            markdown={initialValue}
            onChange={handleRichChange}
            onError={(payload) => {
              onErrorRef.current?.(
                payload.error ||
                  "Markdown parse error — switch to Source mode to fix."
              )
            }}
            className={
              theme === "dark"
                ? "dark-theme dark mdxeditor-full-height markdown-mdx-editor"
                : "light-theme light mdxeditor-full-height markdown-mdx-editor"
            }
            contentEditableClassName="markdown-mdx-content"
            placeholder="Start writing Markdown…"
            plugins={plugins}
          />
          <SourcePanePortal
            layout={layout}
            rootRef={rootRef}
            markdown={markdown}
            onSourceChange={handleSourceChange}
            theme={theme}
            peerScrollRef={peerScrollRef}
          />
        </div>
      </SourceCmProvider>
    </EditorLayoutProvider>
  )
}
