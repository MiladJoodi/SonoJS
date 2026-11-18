"use client"

import * as React from "react"
import { EditorContent, type Editor, type JSONContent } from "@tiptap/react"
import { cn } from "@sonojs/ui/lib/utils"

import { DirectionContextProvider } from "@sonojs/ui/hooks/use-direction"
import type { Direction } from "@sonojs/ui/lib/direction"

import type {
  RichTextEditorContent,
  RichTextEditorVariant,
} from "./lib"
import { RichTextEditorToolbar } from "./toolbar"
import { useKeyboardInset } from "./use-keyboard-inset"
import { useRichTextEditor } from "./use-rich-text-editor"

const editorSurfaceClassName = cn(
  "rounded-b-md border border-border/70 bg-card shadow-xs",
  "aria-invalid:border-destructive",
  // Only the real editor root — never [contenteditable] alone (matches
  // task-item labels with contenteditable="false" and blows min-height up).
  "[&_.ProseMirror]:min-h-[var(--rte-min-height,16rem)]",
  "[&_.ProseMirror]:px-3 [&_.ProseMirror]:py-2",
  "[&_.ProseMirror]:outline-none",
  // 16px on mobile avoids iOS input zoom; denser on desktop.
  "[&_.ProseMirror]:text-base [&_.ProseMirror]:leading-relaxed md:[&_.ProseMirror]:text-sm",
  "[&_.ProseMirror_h1]:mt-4 [&_.ProseMirror_h1]:mb-2 [&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-bold",
  "[&_.ProseMirror_h2]:mt-3 [&_.ProseMirror_h2]:mb-2 [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-semibold",
  "[&_.ProseMirror_h3]:mt-2 [&_.ProseMirror_h3]:mb-1 [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-semibold",
  "[&_.ProseMirror_p]:my-1.5",
  "[&_.ProseMirror_ul]:my-1.5 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ps-6",
  "[&_.ProseMirror_ol]:my-1.5 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ps-6",
  "[&_.ProseMirror_li]:my-0 [&_.ProseMirror_li_p]:my-0",
  // Task list — compact checkbox + text on one line rhythm
  "[&_.ProseMirror_ul[data-type=taskList]]:my-1.5 [&_.ProseMirror_ul[data-type=taskList]]:list-none [&_.ProseMirror_ul[data-type=taskList]]:ps-0",
  "[&_.ProseMirror_ul[data-type=taskList]_li]:m-0 [&_.ProseMirror_ul[data-type=taskList]_li]:flex [&_.ProseMirror_ul[data-type=taskList]_li]:items-start [&_.ProseMirror_ul[data-type=taskList]_li]:gap-2 [&_.ProseMirror_ul[data-type=taskList]_li]:py-0.5",
  "[&_.ProseMirror_ul[data-type=taskList]_li_label]:m-0 [&_.ProseMirror_ul[data-type=taskList]_li_label]:flex [&_.ProseMirror_ul[data-type=taskList]_li_label]:h-[1.375rem] [&_.ProseMirror_ul[data-type=taskList]_li_label]:shrink-0 [&_.ProseMirror_ul[data-type=taskList]_li_label]:items-center [&_.ProseMirror_ul[data-type=taskList]_li_label]:p-0",
  "[&_.ProseMirror_ul[data-type=taskList]_li_label_input]:size-3.5 [&_.ProseMirror_ul[data-type=taskList]_li_label_input]:accent-primary",
  "[&_.ProseMirror_ul[data-type=taskList]_li>div]:min-w-0 [&_.ProseMirror_ul[data-type=taskList]_li>div]:flex-1",
  "[&_.ProseMirror_ul[data-type=taskList]_li_p]:my-0 [&_.ProseMirror_ul[data-type=taskList]_li_p]:leading-relaxed",
  "[&_.ProseMirror_blockquote]:my-2 [&_.ProseMirror_blockquote]:border-s-4 [&_.ProseMirror_blockquote]:border-border [&_.ProseMirror_blockquote]:ps-4 [&_.ProseMirror_blockquote]:text-muted-foreground",
  "[&_.ProseMirror_pre]:my-2 [&_.ProseMirror_pre]:overflow-x-auto [&_.ProseMirror_pre]:rounded-md [&_.ProseMirror_pre]:bg-muted [&_.ProseMirror_pre]:p-3 [&_.ProseMirror_pre]:font-mono [&_.ProseMirror_pre]:text-sm",
  "[&_.ProseMirror_code]:rounded-sm [&_.ProseMirror_code]:bg-muted [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:py-0.5 [&_.ProseMirror_code]:font-mono [&_.ProseMirror_code]:text-[0.9em]",
  "[&_.ProseMirror_hr]:my-4 [&_.ProseMirror_hr]:border-border",
  "[&_.ProseMirror_table]:my-3 [&_.ProseMirror_table]:w-full [&_.ProseMirror_table]:border-collapse [&_.ProseMirror_table]:overflow-hidden [&_.ProseMirror_table]:rounded-md [&_.ProseMirror_table]:border [&_.ProseMirror_table]:border-border",
  "[&_.ProseMirror_th]:border [&_.ProseMirror_th]:border-border [&_.ProseMirror_th]:bg-muted/50 [&_.ProseMirror_th]:px-2 [&_.ProseMirror_th]:py-1.5 [&_.ProseMirror_th]:text-start [&_.ProseMirror_th]:font-medium",
  "[&_.ProseMirror_td]:border [&_.ProseMirror_td]:border-border [&_.ProseMirror_td]:px-2 [&_.ProseMirror_td]:py-1.5",
  "[&_.ProseMirror_mark]:rounded-sm [&_.ProseMirror_mark]:px-0.5",
  "[&_.ProseMirror_a]:text-primary [&_.ProseMirror_a]:underline",
  "[&_.ProseMirror_img]:my-2 [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:rounded-md",
  "data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50"
)

export type RichTextEditorProps = {
  value?: RichTextEditorContent
  defaultValue?: RichTextEditorContent
  onChange?: (payload: { html: string; json: JSONContent }) => void
  dir?: "rtl" | "ltr" | "auto"
  lang?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  "aria-invalid"?: boolean
  className?: string
  editorClassName?: string
  minHeight?: number | string
  onUploadImage?: (file: File) => Promise<string>
  hideToolbar?: boolean
  /** `simple` day-to-day toolbar; `advanced` unlocks the full two-row set */
  variant?: RichTextEditorVariant
  /**
   * When true on `advanced`, the second toolbar row toggles behind Expand.
   * Default false — advanced always shows both rows.
   */
  toolbarCollapsible?: boolean
  id?: string
}

function RichTextEditor({
  value,
  defaultValue,
  onChange,
  dir = "ltr",
  lang = "en",
  placeholder = "Write something…",
  disabled = false,
  readOnly = false,
  "aria-invalid": ariaInvalid,
  className,
  editorClassName,
  minHeight = "16rem",
  onUploadImage,
  hideToolbar = false,
  variant = "simple",
  toolbarCollapsible = false,
  id,
}: RichTextEditorProps) {
  // TipTap's useEditor calls Math.random() — only mount it after hydration.
  const ready = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  if (!ready) {
    return (
      <RichTextEditorShell
        dir={dir}
        lang={lang}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={ariaInvalid}
        className={className}
        editorClassName={editorClassName}
        minHeight={minHeight}
        hideToolbar={hideToolbar}
        variant={variant}
        toolbarCollapsible={toolbarCollapsible}
        id={id}
        editor={null}
        onUploadImage={onUploadImage}
      />
    )
  }

  return (
    <RichTextEditorMounted
      key={`${variant}-${toolbarCollapsible}`}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      dir={dir}
      lang={lang}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      aria-invalid={ariaInvalid}
      className={className}
      editorClassName={editorClassName}
      minHeight={minHeight}
      onUploadImage={onUploadImage}
      hideToolbar={hideToolbar}
      variant={variant}
      toolbarCollapsible={toolbarCollapsible}
      id={id}
    />
  )
}

function RichTextEditorMounted({
  value,
  defaultValue,
  onChange,
  dir = "ltr",
  lang = "en",
  placeholder = "Write something…",
  disabled = false,
  readOnly = false,
  "aria-invalid": ariaInvalid,
  className,
  editorClassName,
  minHeight = "16rem",
  onUploadImage,
  hideToolbar = false,
  variant = "simple",
  toolbarCollapsible = false,
  id,
}: RichTextEditorProps) {
  const editable = !disabled && !readOnly
  const editor = useRichTextEditor({
    value,
    defaultValue,
    onChange,
    placeholder,
    editable,
    immediatelyRender: false,
    variant,
  })

  return (
    <RichTextEditorShell
      dir={dir}
      lang={lang}
      disabled={disabled}
      readOnly={readOnly}
      aria-invalid={ariaInvalid}
      className={className}
      editorClassName={editorClassName}
      minHeight={minHeight}
      hideToolbar={hideToolbar}
      variant={variant}
      toolbarCollapsible={toolbarCollapsible}
      id={id}
      editor={editor}
      onUploadImage={onUploadImage}
    />
  )
}

function RichTextEditorShell({
  dir = "ltr",
  lang = "en",
  disabled = false,
  readOnly = false,
  "aria-invalid": ariaInvalid,
  className,
  editorClassName,
  minHeight = "16rem",
  hideToolbar = false,
  variant = "simple",
  toolbarCollapsible = false,
  id,
  editor,
  onUploadImage,
}: RichTextEditorProps & { editor: Editor | null }) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [focused, setFocused] = React.useState(false)
  const isNarrow = React.useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(max-width: 767px)")
      mq.addEventListener("change", onStoreChange)
      return () => mq.removeEventListener("change", onStoreChange)
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false
  )
  const editable = !disabled && !readOnly

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const onFocusIn = () => setFocused(true)
    const onFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null
      if (next && root.contains(next)) return
      setFocused(false)
    }

    root.addEventListener("focusin", onFocusIn)
    root.addEventListener("focusout", onFocusOut)
    return () => {
      root.removeEventListener("focusin", onFocusIn)
      root.removeEventListener("focusout", onFocusOut)
    }
  }, [])

  const mobileDock = Boolean(focused && isNarrow && !hideToolbar && editable)
  const keyboardInset = useKeyboardInset(mobileDock)

  const minHeightValue =
    typeof minHeight === "number" ? `${minHeight}px` : minHeight
  const usesDefaultMinHeight = minHeightValue === "16rem"

  const resolvedDir: Direction | null =
    dir === "rtl" || dir === "ltr" ? dir : null

  const shell = (
    <div
      ref={rootRef}
      data-slot="rich-text-editor"
      data-variant={variant}
      data-disabled={disabled || undefined}
      data-focused={focused || undefined}
      dir={dir}
      lang={lang}
      className={cn(
        "relative flex w-full flex-col rounded-md",
        // Extra bottom padding when the toolbar docks over the keyboard.
        mobileDock && "pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))]",
        // Invalid state only — no focus ring/border on the editor chrome.
        "has-[[aria-invalid=true]]:[&_[data-slot=rich-text-editor-toolbar]]:border-destructive",
        "has-[[aria-invalid=true]]:[&_[data-slot=rich-text-editor-surface]]:border-destructive",
        className
      )}
      style={
        {
          ...(usesDefaultMinHeight
            ? null
            : { "--rte-min-height": minHeightValue }),
          "--rte-keyboard-inset": `${keyboardInset}px`,
        } as React.CSSProperties
      }
    >
      {!hideToolbar ? (
        <RichTextEditorToolbar
          editor={editor}
          disabled={disabled || readOnly}
          onUploadImage={onUploadImage}
          variant={variant}
          toolbarCollapsible={toolbarCollapsible}
          mobileDock={mobileDock}
          keyboardInset={keyboardInset}
          dir={dir}
          className={cn(
            "border border-b-0 border-border/70 bg-card",
            mobileDock ? "rounded-t-xl" : "rounded-t-md"
          )}
        />
      ) : null}
      <div
        id={id}
        data-slot="rich-text-editor-surface"
        role="textbox"
        aria-multiline="true"
        aria-invalid={ariaInvalid}
        aria-readonly={readOnly || undefined}
        aria-disabled={disabled || undefined}
        data-dir={dir}
        className={cn(
          editorSurfaceClassName,
          "min-h-[var(--rte-min-height,16rem)]",
          hideToolbar && "rounded-t-md",
          dir === "rtl" &&
            "[&_.ProseMirror]:text-right [&_.ProseMirror]:[unicode-bidi:plaintext]",
          dir === "ltr" &&
            "[&_.ProseMirror]:text-left [&_.ProseMirror]:[unicode-bidi:plaintext]",
          editorClassName
        )}
      >
        {editor ? <EditorContent editor={editor} /> : null}
      </div>
    </div>
  )

  // Scope Radix portals (dropdowns, popovers) to this editor's writing direction.
  if (resolvedDir) {
    return (
      <DirectionContextProvider dir={resolvedDir}>
        {shell}
      </DirectionContextProvider>
    )
  }

  return shell
}

export { RichTextEditor }
