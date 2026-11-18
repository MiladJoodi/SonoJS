"use client"

import * as React from "react"
import type { Editor } from "@tiptap/react"
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BaselineIcon,
  BoldIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CodeIcon,
  CodeXmlIcon,
  EraserIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  HighlighterIcon,
  ImageIcon,
  IndentDecreaseIcon,
  IndentIncreaseIcon,
  ItalicIcon,
  LinkIcon,
  ListChecksIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PilcrowIcon,
  QuoteIcon,
  RedoIcon,
  RemoveFormattingIcon,
  SquareSplitHorizontalIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  TableIcon,
  UnderlineIcon,
  UndoIcon,
} from "lucide-react"
import { cn } from "@sonojs/ui/lib/utils"

import {
  isAllowedRichTextUrl,
  normalizeRichTextUrl,
  type RichTextEditorVariant,
} from "./lib"
import {
  RICH_TEXT_FONT_FAMILIES,
  RICH_TEXT_FONT_SIZES,
  RICH_TEXT_HIGHLIGHT_COLORS,
  RICH_TEXT_TEXT_COLORS,
} from "./presets"
import { Button } from "@sonojs/ui/components/button"
import {
  Dialog,
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
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
import { Separator } from "@sonojs/ui/components/separator"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@sonojs/ui/components/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@sonojs/ui/components/tooltip"

const toolbarControlClassName = "cursor-pointer"
const toolbarDropdownContentClassName =
  "[&_[data-slot=dropdown-menu-item]]:cursor-pointer"

/** Wrap on phone; keep groups intact. Desktop: single scrollable row. */
const toolbarRowClassName = cn(
  "flex w-full min-w-0 flex-wrap items-center gap-1",
  "md:flex-nowrap md:overflow-x-auto md:overscroll-x-contain md:touch-pan-x md:scrollbar-none"
)

const toolbarRadiusClassName = "rounded-md!"
/** 44px mobile / 32px desktop — WCAG touch + dense desktop. */
const toolbarIconButtonClassName = cn(
  "size-11! shrink-0 p-0! md:size-8!",
  toolbarRadiusClassName,
  toolbarControlClassName
)
const toolbarDropdownTriggerClassName = cn(
  "h-11 shrink-0 gap-1 px-2.5 text-xs md:h-8 md:gap-0.5 md:px-1.5",
  toolbarRadiusClassName,
  toolbarControlClassName
)
const toolbarToggleItemClassName = cn(
  // Separate chips (not a glued segmented control) — gap comes from ToggleGroup spacing.
  "size-11! min-w-11! shrink-0 rounded-md! border border-border/70 px-0! py-0! shadow-none",
  "md:size-8! md:min-w-8!",
  "data-[spacing=1]:rounded-md! data-[spacing=1]:border-s! data-[spacing=1]:border-border/70!"
)

function ToolbarGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex shrink-0 items-center gap-1"
    >
      {children}
    </div>
  )
}

function ToolbarDivider() {
  return (
    <Separator
      orientation="vertical"
      className="mx-1 h-7 shrink-0 self-center bg-border/60 md:mx-1.5 md:h-5"
    />
  )
}

function ToolbarIconButton({
  label,
  disabled,
  pressed,
  onClick,
  children,
  className,
}: {
  label: string
  disabled?: boolean
  pressed?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant={pressed ? "secondary" : "ghost"}
          size="icon-sm"
          disabled={disabled}
          aria-label={label}
          aria-pressed={pressed}
          className={cn(toolbarIconButtonClassName, className)}
          onClick={onClick}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  )
}

function ColorSwatchPopover({
  label,
  icon,
  disabled,
  colors,
  value,
  onSelect,
}: {
  label: string
  icon: React.ReactNode
  disabled?: boolean
  colors: readonly { label: string; value: string }[]
  value?: string
  onSelect: (color: string) => void
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          disabled={disabled}
          aria-label={label}
          title={label}
          className={toolbarIconButtonClassName}
        >
          {icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="start">
        <div className="grid grid-cols-5 gap-1.5">
          {colors.map((color) => (
            <button
              key={color.label}
              type="button"
              title={color.label}
              aria-label={color.label}
              className={cn(
                "size-9 cursor-pointer rounded-md border border-border transition-transform hover:scale-105 md:size-7",
                !color.value &&
                  "relative overflow-hidden bg-background after:absolute after:inset-x-0 after:top-1/2 after:h-px after:-rotate-45 after:bg-destructive",
                value === color.value && "ring-2 ring-ring"
              )}
              style={
                color.value ? { backgroundColor: color.value } : undefined
              }
              onClick={() => onSelect(color.value)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function LinkDialog({
  open,
  onOpenChange,
  initialUrl,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialUrl: string
  onSubmit: (url: string) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open ? (
        <LinkDialogForm
          key={initialUrl}
          initialUrl={initialUrl}
          onOpenChange={onOpenChange}
          onSubmit={onSubmit}
        />
      ) : null}
    </Dialog>
  )
}

function LinkDialogForm({
  initialUrl,
  onOpenChange,
  onSubmit,
}: {
  initialUrl: string
  onOpenChange: (open: boolean) => void
  onSubmit: (url: string) => void
}) {
  const [url, setUrl] = React.useState(initialUrl)
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const normalized = normalizeRichTextUrl(url)
    if (!isAllowedRichTextUrl(normalized)) {
      setError("URL must start with http:// or https://.")
      return
    }
    onSubmit(normalized)
    onOpenChange(false)
  }

  return (
    <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Insert link</DialogTitle>
          <DialogDescription>Enter the destination URL.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="grid gap-1.5">
            <Label htmlFor="rte-link-url">URL</Label>
            <Input
              id="rte-link-url"
              dir="ltr"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                setError(null)
              }}
              aria-invalid={error ? true : undefined}
            />
            {error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : null}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className={toolbarControlClassName}>
            Apply
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

function ImageDialog({
  open,
  onOpenChange,
  onSubmitUrl,
  onUploadImage,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmitUrl: (url: string) => void
  onUploadImage?: (file: File) => Promise<string>
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open ? (
        <ImageDialogForm
          onOpenChange={onOpenChange}
          onSubmitUrl={onSubmitUrl}
          onUploadImage={onUploadImage}
        />
      ) : null}
    </Dialog>
  )
}

function ImageDialogForm({
  onOpenChange,
  onSubmitUrl,
  onUploadImage,
}: {
  onOpenChange: (open: boolean) => void
  onSubmitUrl: (url: string) => void
  onUploadImage?: (file: File) => Promise<string>
}) {
  const [url, setUrl] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [uploading, setUploading] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const insertUrl = () => {
    const normalized = normalizeRichTextUrl(url)
    if (!isAllowedRichTextUrl(normalized)) {
      setError("Image URL must start with http:// or https://.")
      return
    }
    onSubmitUrl(normalized)
    onOpenChange(false)
  }

  const handleFile = async (file: File | undefined) => {
    if (!file || !onUploadImage) return
    setUploading(true)
    setError(null)
    try {
      const uploaded = await onUploadImage(file)
      if (!isAllowedRichTextUrl(normalizeRichTextUrl(uploaded))) {
        setError("Upload returned an invalid URL.")
        return
      }
      onSubmitUrl(normalizeRichTextUrl(uploaded))
      onOpenChange(false)
    } catch {
      setError("Image upload failed.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Insert image</DialogTitle>
        <DialogDescription>
          Paste an image URL or choose a file.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-3 py-2">
        <div className="grid gap-1.5">
          <Label htmlFor="rte-image-url">Image URL</Label>
          <Input
            id="rte-image-url"
            dir="ltr"
            placeholder="https://example.com/image.jpg"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
              setError(null)
            }}
            aria-invalid={error ? true : undefined}
          />
        </div>
        {onUploadImage ? (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => void handleFile(e.target.files?.[0])}
            />
            <Button
              type="button"
              variant="outline"
              disabled={uploading}
              className={toolbarControlClassName}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? "Uploading…" : "Choose file"}
            </Button>
          </>
        ) : null}
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </div>
      <DialogFooter>
        <Button
          type="button"
          className={toolbarControlClassName}
          onClick={insertUrl}
        >
          Insert from URL
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export function RichTextEditorToolbar({
  editor,
  disabled,
  className,
  onUploadImage,
  variant = "simple",
  toolbarCollapsible = false,
  mobileDock = false,
  keyboardInset = 0,
  dir = "ltr",
}: {
  editor: Editor | null
  disabled?: boolean
  className?: string
  onUploadImage?: (file: File) => Promise<string>
  variant?: RichTextEditorVariant
  /** When true on advanced, row 2 toggles behind Expand. */
  toolbarCollapsible?: boolean
  /** Pin toolbar above the keyboard on narrow viewports. */
  mobileDock?: boolean
  keyboardInset?: number
  dir?: "rtl" | "ltr" | "auto"
}) {
  const [linkOpen, setLinkOpen] = React.useState(false)
  const [imageOpen, setImageOpen] = React.useState(false)
  const [row2Open, setRow2Open] = React.useState(false)
  const [, setTick] = React.useState(0)
  const tooltipDelay = React.useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia("(pointer: coarse)")
      media.addEventListener("change", onStoreChange)
      return () => media.removeEventListener("change", onStoreChange)
    },
    () => (window.matchMedia("(pointer: coarse)").matches ? 100_000 : 700),
    () => 700
  )
  const isAdvanced = variant === "advanced"
  const isRtl = dir === "rtl"

  React.useEffect(() => {
    if (!editor) return
    const refresh = () => setTick((n) => n + 1)
    editor.on("selectionUpdate", refresh)
    editor.on("transaction", refresh)
    return () => {
      editor.off("selectionUpdate", refresh)
      editor.off("transaction", refresh)
    }
  }, [editor])

  if (!editor) return null

  const isDisabled = disabled || !editor.isEditable
  const currentLink =
    (editor.getAttributes("link").href as string | undefined) ?? ""
  const textStyle = isAdvanced
    ? editor.getAttributes("textStyle")
    : ({} as Record<string, string | undefined>)
  const currentColor = (textStyle.color as string | undefined) ?? ""
  const currentHighlight = isAdvanced
    ? ((editor.getAttributes("highlight").color as string | undefined) ?? "")
    : ""
  const currentFontFamily = (textStyle.fontFamily as string | undefined) ?? ""
  const currentFontSize = (textStyle.fontSize as string | undefined) ?? ""

  const canSinkListItem = editor.can().sinkListItem("listItem")
  const canLiftListItem = editor.can().liftListItem("listItem")
  const canSinkTaskItem =
    isAdvanced && editor.can().sinkListItem("taskItem")
  const canLiftTaskItem =
    isAdvanced && editor.can().liftListItem("taskItem")
  const canSink = canSinkListItem || canSinkTaskItem
  const canLift = canLiftListItem || canLiftTaskItem

  const sinkList = () => {
    if (canSinkTaskItem) {
      editor.chain().focus().sinkListItem("taskItem").run()
      return
    }
    editor.chain().focus().sinkListItem("listItem").run()
  }

  const liftList = () => {
    if (canLiftTaskItem) {
      editor.chain().focus().liftListItem("taskItem").run()
      return
    }
    editor.chain().focus().liftListItem("listItem").run()
  }

  const showRow2 = isAdvanced && (!toolbarCollapsible || row2Open)

  return (
    <TooltipProvider delayDuration={tooltipDelay}>
      <div
        data-slot="rich-text-editor-toolbar"
        data-variant={variant}
        data-dock={mobileDock ? "bottom" : "top"}
        role="toolbar"
        aria-label="Editor toolbar"
        aria-orientation="horizontal"
        aria-disabled={isDisabled || undefined}
        className={cn(
          "flex w-full flex-col gap-1 border-border/70 bg-card p-1.5 touch-manipulation",
          "[&_button]:cursor-pointer [&_button]:rounded-md!",
          "[&_[data-slot=toggle-group-item]]:rounded-md!",
          "[&_svg:not([class*='size-'])]:size-4 md:[&_svg:not([class*='size-'])]:size-3.5",
          mobileDock
            ? "fixed inset-x-0 z-50 rounded-t-xl border border-b-0 shadow-soft md:static md:inset-auto md:z-10 md:rounded-none md:border-0 md:shadow-none"
            : "sticky top-0 z-10",
          isDisabled && "pointer-events-none opacity-50",
          className
        )}
        style={
          mobileDock
            ? ({
                bottom: `calc(${keyboardInset}px + env(safe-area-inset-bottom, 0px))`,
                paddingBottom: "max(0.375rem, env(safe-area-inset-bottom, 0px))",
              } as React.CSSProperties)
            : undefined
        }
      >
        {/* Row 1 — History | Heading | Marks | Align | Lists | Insert */}
        <div className={toolbarRowClassName}>
          <ToolbarGroup label="History">
            <ToolbarIconButton
              label="Undo"
              disabled={isDisabled || !editor.can().undo()}
              onClick={() => editor.chain().focus().undo().run()}
            >
              <UndoIcon className="size-4" />
            </ToolbarIconButton>
            <ToolbarIconButton
              label="Redo"
              disabled={isDisabled || !editor.can().redo()}
              onClick={() => editor.chain().focus().redo().run()}
            >
              <RedoIcon className="size-4" />
            </ToolbarIconButton>
          </ToolbarGroup>

          <ToolbarDivider />

          <ToolbarGroup label="Block style">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={isDisabled}
                  className={toolbarDropdownTriggerClassName}
                  aria-label="Paragraph style"
                >
                  Heading
                  <ChevronDownIcon className="size-3.5 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className={toolbarDropdownContentClassName}
              >
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                >
                  <Heading1Icon className="size-4" />
                  Heading 1
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                >
                  <Heading2Icon className="size-4" />
                  Heading 2
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                >
                  <Heading3Icon className="size-4" />
                  Heading 3
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().setParagraph().run()}
                >
                  <PilcrowIcon className="size-4" />
                  Paragraph
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ToolbarGroup>

          <ToolbarDivider />

          <ToolbarGroup label="Text format">
            <ToggleGroup
              type="multiple"
              variant="outline"
              size="sm"
              spacing={1}
              aria-label="Text style"
              className="gap-1 rounded-none! shadow-none!"
            >
              <ToggleGroupItem
                value="bold"
                aria-label="Bold"
                disabled={isDisabled}
                className={toolbarToggleItemClassName}
                data-state={editor.isActive("bold") ? "on" : "off"}
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <BoldIcon className="size-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="italic"
                aria-label="Italic"
                disabled={isDisabled}
                className={toolbarToggleItemClassName}
                data-state={editor.isActive("italic") ? "on" : "off"}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <ItalicIcon className="size-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="underline"
                aria-label="Underline"
                disabled={isDisabled}
                className={toolbarToggleItemClassName}
                data-state={editor.isActive("underline") ? "on" : "off"}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                <UnderlineIcon className="size-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="strike"
                aria-label="Strikethrough"
                disabled={isDisabled}
                className={toolbarToggleItemClassName}
                data-state={editor.isActive("strike") ? "on" : "off"}
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <StrikethroughIcon className="size-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </ToolbarGroup>

          {isAdvanced ? (
            <>
              <ToolbarDivider />
              <ToolbarGroup label="Align">
                <ToggleGroup
                  type="single"
                  variant="outline"
                  size="sm"
                  spacing={1}
                  aria-label="Text alignment"
                  className="gap-1 rounded-none! shadow-none!"
                >
                  {(isRtl
                    ? ([
                        ["right", "Align right", AlignRightIcon],
                        ["center", "Align center", AlignCenterIcon],
                        ["left", "Align left", AlignLeftIcon],
                        ["justify", "Justify", AlignJustifyIcon],
                      ] as const)
                    : ([
                        ["left", "Align left", AlignLeftIcon],
                        ["center", "Align center", AlignCenterIcon],
                        ["right", "Align right", AlignRightIcon],
                        ["justify", "Justify", AlignJustifyIcon],
                      ] as const)
                  ).map(([value, label, Icon]) => (
                    <ToggleGroupItem
                      key={value}
                      value={value}
                      aria-label={label}
                      disabled={isDisabled}
                      className={toolbarToggleItemClassName}
                      data-state={
                        editor.isActive({ textAlign: value }) ? "on" : "off"
                      }
                      onClick={() =>
                        editor.chain().focus().setTextAlign(value).run()
                      }
                    >
                      <Icon className="size-4" />
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </ToolbarGroup>
            </>
          ) : null}

          <ToolbarDivider />

          <ToolbarGroup label="Lists">
            <ToolbarIconButton
              label="Bullet list"
              disabled={isDisabled}
              pressed={editor.isActive("bulletList")}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <ListIcon className="size-4" />
            </ToolbarIconButton>
            <ToolbarIconButton
              label="Numbered list"
              disabled={isDisabled}
              pressed={editor.isActive("orderedList")}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrderedIcon className="size-4" />
            </ToolbarIconButton>
            {isAdvanced ? (
              <ToolbarIconButton
                label="Task list"
                disabled={isDisabled}
                pressed={editor.isActive("taskList")}
                onClick={() => editor.chain().focus().toggleTaskList().run()}
              >
                <ListChecksIcon className="size-4" />
              </ToolbarIconButton>
            ) : null}
          </ToolbarGroup>

          <ToolbarDivider />

          <ToolbarGroup label="Insert">
            <ToolbarIconButton
              label="Link"
              disabled={isDisabled}
              pressed={editor.isActive("link")}
              onClick={() => setLinkOpen(true)}
            >
              <LinkIcon className="size-4" />
            </ToolbarIconButton>
            <ToolbarIconButton
              label="Image"
              disabled={isDisabled}
              onClick={() => setImageOpen(true)}
            >
              <ImageIcon className="size-4" />
            </ToolbarIconButton>
            <ToolbarIconButton
              label="Quote"
              disabled={isDisabled}
              pressed={editor.isActive("blockquote")}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <QuoteIcon className="size-4" />
            </ToolbarIconButton>
          </ToolbarGroup>

          {isAdvanced && toolbarCollapsible ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={isDisabled}
              className={cn(
                "ms-auto shrink-0 text-muted-foreground hover:text-foreground",
                toolbarIconButtonClassName,
                row2Open && "bg-muted/50 text-foreground"
              )}
              aria-label={row2Open ? "Collapse toolbar" : "Expand toolbar"}
              aria-expanded={row2Open}
              aria-controls="rich-text-editor-toolbar-row-2"
              onClick={() => setRow2Open((open) => !open)}
            >
              {row2Open ? (
                <ChevronUpIcon className="size-4" />
              ) : (
                <ChevronDownIcon className="size-4" />
              )}
            </Button>
          ) : null}
        </div>

        {/* Row 2 — advanced: Font | Color/marks | Indent | Table/blocks */}
        {showRow2 ? (
          <div
            id="rich-text-editor-toolbar-row-2"
            className={cn(
              toolbarRowClassName,
              "border-t border-border/60 pt-1"
            )}
          >
            <ToolbarGroup label="Font">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isDisabled}
                    className={toolbarDropdownTriggerClassName}
                  >
                    Font
                    <ChevronDownIcon className="size-3.5 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className={toolbarDropdownContentClassName}
                >
                  {RICH_TEXT_FONT_FAMILIES.map((font) => (
                    <DropdownMenuItem
                      key={font.label}
                      onClick={() => {
                        if (!font.value) {
                          editor.chain().focus().unsetFontFamily().run()
                          return
                        }
                        editor.chain().focus().setFontFamily(font.value).run()
                      }}
                    >
                      <span
                        style={
                          font.value ? { fontFamily: font.value } : undefined
                        }
                      >
                        {font.label}
                        {currentFontFamily === font.value ? " ✓" : ""}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isDisabled}
                    className={toolbarDropdownTriggerClassName}
                  >
                    Size
                    <ChevronDownIcon className="size-3.5 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className={toolbarDropdownContentClassName}
                >
                  <DropdownMenuItem
                    onClick={() =>
                      editor.chain().focus().unsetFontSize().run()
                    }
                  >
                    Default{!currentFontSize ? " ✓" : ""}
                  </DropdownMenuItem>
                  {RICH_TEXT_FONT_SIZES.map((size) => (
                    <DropdownMenuItem
                      key={size.value}
                      onClick={() =>
                        editor.chain().focus().setFontSize(size.value).run()
                      }
                    >
                      <span style={{ fontSize: size.value }}>
                        {size.label}
                        {currentFontSize === size.value ? " ✓" : ""}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </ToolbarGroup>

            <ToolbarDivider />

            <ToolbarGroup label="Color & marks">
              <ColorSwatchPopover
                label="Text color"
                disabled={isDisabled}
                icon={<BaselineIcon className="size-4" />}
                colors={RICH_TEXT_TEXT_COLORS}
                value={currentColor}
                onSelect={(color) => {
                  if (!color) {
                    editor.chain().focus().unsetColor().run()
                    return
                  }
                  editor.chain().focus().setColor(color).run()
                }}
              />
              <ColorSwatchPopover
                label="Highlight"
                disabled={isDisabled}
                icon={<HighlighterIcon className="size-4" />}
                colors={RICH_TEXT_HIGHLIGHT_COLORS}
                value={currentHighlight}
                onSelect={(color) => {
                  if (!color) {
                    editor.chain().focus().unsetHighlight().run()
                    return
                  }
                  editor.chain().focus().toggleHighlight({ color }).run()
                }}
              />
              <ToolbarIconButton
                label="Clear formatting"
                disabled={isDisabled}
                onClick={() => editor.chain().focus().unsetAllMarks().run()}
              >
                <RemoveFormattingIcon className="size-4" />
              </ToolbarIconButton>
              <ToolbarIconButton
                label="Inline code"
                disabled={isDisabled}
                pressed={editor.isActive("code")}
                onClick={() => editor.chain().focus().toggleCode().run()}
              >
                <CodeIcon className="size-4" />
              </ToolbarIconButton>
              <ToolbarIconButton
                label="Subscript"
                disabled={isDisabled}
                pressed={editor.isActive("subscript")}
                onClick={() => editor.chain().focus().toggleSubscript().run()}
              >
                <SubscriptIcon className="size-4" />
              </ToolbarIconButton>
              <ToolbarIconButton
                label="Superscript"
                disabled={isDisabled}
                pressed={editor.isActive("superscript")}
                onClick={() =>
                  editor.chain().focus().toggleSuperscript().run()
                }
              >
                <SuperscriptIcon className="size-4" />
              </ToolbarIconButton>
            </ToolbarGroup>

            <ToolbarDivider />

            <ToolbarGroup label="Indent">
              <ToolbarIconButton
                label="Decrease indent"
                disabled={isDisabled || !canLift}
                onClick={liftList}
              >
                <IndentDecreaseIcon className="size-4" />
              </ToolbarIconButton>
              <ToolbarIconButton
                label="Increase indent"
                disabled={isDisabled || !canSink}
                onClick={sinkList}
              >
                <IndentIncreaseIcon className="size-4" />
              </ToolbarIconButton>
            </ToolbarGroup>

            <ToolbarDivider />

            <ToolbarGroup label="Insert & blocks">
              <ToolbarIconButton
                label="Insert 3×3 table"
                disabled={isDisabled}
                pressed={editor.isActive("table")}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({
                      rows: 3,
                      cols: 3,
                      withHeaderRow: true,
                    })
                    .run()
                }
              >
                <TableIcon className="size-4" />
              </ToolbarIconButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isDisabled || !editor.isActive("table")}
                    className={toolbarDropdownTriggerClassName}
                    aria-label="Edit table"
                  >
                    Table
                    <ChevronDownIcon className="size-3.5 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className={toolbarDropdownContentClassName}
                >
                  <DropdownMenuLabel>Edit table</DropdownMenuLabel>
                  <DropdownMenuItem
                    disabled={!editor.can().addColumnBefore()}
                    onClick={() =>
                      editor.chain().focus().addColumnBefore().run()
                    }
                  >
                    Column before
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={!editor.can().addColumnAfter()}
                    onClick={() =>
                      editor.chain().focus().addColumnAfter().run()
                    }
                  >
                    Column after
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={!editor.can().deleteColumn()}
                    onClick={() =>
                      editor.chain().focus().deleteColumn().run()
                    }
                  >
                    Delete column
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={!editor.can().addRowBefore()}
                    onClick={() =>
                      editor.chain().focus().addRowBefore().run()
                    }
                  >
                    Row before
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={!editor.can().addRowAfter()}
                    onClick={() =>
                      editor.chain().focus().addRowAfter().run()
                    }
                  >
                    Row after
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={!editor.can().deleteRow()}
                    onClick={() => editor.chain().focus().deleteRow().run()}
                  >
                    Delete row
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={!editor.can().mergeCells()}
                    onClick={() =>
                      editor.chain().focus().mergeCells().run()
                    }
                  >
                    <SquareSplitHorizontalIcon className="size-4" />
                    Merge cells
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={!editor.can().splitCell()}
                    onClick={() => editor.chain().focus().splitCell().run()}
                  >
                    Split cell
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={!editor.can().toggleHeaderRow()}
                    onClick={() =>
                      editor.chain().focus().toggleHeaderRow().run()
                    }
                  >
                    Header row
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={!editor.can().deleteTable()}
                    onClick={() =>
                      editor.chain().focus().deleteTable().run()
                    }
                  >
                    <EraserIcon className="size-4" />
                    Delete table
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ToolbarIconButton
                label="Code block"
                disabled={isDisabled}
                pressed={editor.isActive("codeBlock")}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              >
                <CodeXmlIcon className="size-4" />
              </ToolbarIconButton>
              <ToolbarIconButton
                label="Horizontal rule"
                disabled={isDisabled}
                onClick={() =>
                  editor.chain().focus().setHorizontalRule().run()
                }
              >
                <MinusIcon className="size-4" />
              </ToolbarIconButton>
            </ToolbarGroup>
          </div>
        ) : null}
      </div>

      <LinkDialog
        open={linkOpen}
        onOpenChange={setLinkOpen}
        initialUrl={currentLink}
        onSubmit={(href) => {
          if (!href) {
            editor.chain().focus().extendMarkRange("link").unsetLink().run()
            return
          }
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href })
            .run()
        }}
      />

      <ImageDialog
        open={imageOpen}
        onOpenChange={setImageOpen}
        onUploadImage={onUploadImage}
        onSubmitUrl={(src) => {
          editor.chain().focus().setImage({ src }).run()
        }}
      />
    </TooltipProvider>
  )
}
