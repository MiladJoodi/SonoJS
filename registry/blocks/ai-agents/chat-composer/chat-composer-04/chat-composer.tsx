"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  CameraIcon,
  CirclePlusIcon,
  ClipboardIcon,
  FileUpIcon,
  FrameIcon,
  HistoryIcon,
  LayoutDashboardIcon,
  LinkIcon,
  PaperclipIcon,
  PlayIcon,
  PlusIcon,
  Settings2Icon,
  SparklesIcon,
  LayoutTemplateIcon,
  XIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Label } from "@sonojs/ui/components/label"
import { Switch } from "@sonojs/ui/components/switch"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

type AttachedFile = {
  id: string
  name: string
  file: File
  preview?: string
}

const ACTIONS = [
  { id: "clone-screenshot", icon: CameraIcon, label: "Clone a Screenshot" },
  { id: "import-figma", icon: FrameIcon, label: "Import from Figma" },
  { id: "upload-project", icon: FileUpIcon, label: "Upload a Project" },
  { id: "landing-page", icon: LayoutDashboardIcon, label: "Landing Page" },
] as const

function newFileId() {
  return crypto.randomUUID()
}

export default function ChatComposer04({
  onSubmit,
}: {
  onSubmit?: (prompt: string) => void
} = {}) {
  const [prompt, setPrompt] = React.useState("")
  const [isDragOver, setIsDragOver] = React.useState(false)
  const [attachedFiles, setAttachedFiles] = React.useState<AttachedFile[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [settings, setSettings] = React.useState({
    autoComplete: true,
    streaming: false,
    showHistory: false,
  })

  const processFiles = (files: File[]) => {
    for (const file of files) {
      const fileId = newFileId()
      const attachedFile: AttachedFile = {
        id: fileId,
        name: file.name,
        file,
      }

      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = () => {
          setAttachedFiles((prev) =>
            prev.map((f) =>
              f.id === fileId ? { ...f, preview: reader.result as string } : f
            )
          )
        }
        reader.readAsDataURL(file)
      }

      setAttachedFiles((prev) => [...prev, attachedFile])
    }
  }

  const submitPrompt = () => {
    const text = prompt.trim()
    if (!text) return
    onSubmit?.(text)
    setPrompt("")
  }

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-4 bg-white px-4 py-12 text-foreground dark:bg-background sm:px-6">
      <h1 className="text-balance text-center text-[29px] font-semibold tracking-tighter sm:text-[32px] md:text-[46px]">
        Prompt. Refine. Ship.
      </h1>
      <h2 className="-mt-1 pb-4 text-balance text-center text-xl text-muted-foreground">
        Build real, working software just by describing it
      </h2>

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col content-center">
        <form
          className="relative overflow-visible rounded-xl border border-border/70 bg-card p-2 shadow-soft transition-colors duration-200 focus-within:border-ring"
          onDragLeave={(e) => {
            e.preventDefault()
            setIsDragOver(false)
          }}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragOver(true)
          }}
          onDrop={(e) => {
            e.preventDefault()
            setIsDragOver(false)
            const files = Array.from(e.dataTransfer.files)
            if (files.length > 0) processFiles(files)
          }}
          onSubmit={(e) => {
            e.preventDefault()
            submitPrompt()
          }}
        >
          {attachedFiles.length > 0 ? (
            <div className="relative mb-2 flex w-fit max-w-full flex-wrap items-center gap-2 overflow-hidden">
              {attachedFiles.map((file) => (
                <Badge
                  className="group relative h-6 max-w-30 cursor-default overflow-hidden px-0 text-[13px] transition-colors hover:bg-accent"
                  key={file.id}
                  variant="outline"
                >
                  <span className="flex h-full items-center gap-1.5 overflow-hidden ps-1 font-normal">
                    <span className="relative flex size-4 min-w-4 items-center justify-center">
                      {file.preview ? (
                        <img
                          alt=""
                          className="absolute inset-0 size-4 rounded border object-cover"
                          height={16}
                          src={file.preview}
                          width={16}
                        />
                      ) : (
                        <PaperclipIcon
                          className="size-3 opacity-60"
                          aria-hidden
                        />
                      )}
                    </span>
                    <span className="inline truncate pe-1.5">{file.name}</span>
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    className="absolute inset-e-1 z-10 cursor-pointer rounded-sm p-0.5 text-muted-foreground opacity-0 focus-visible:bg-accent focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring group-hover:opacity-100"
                    onClick={() =>
                      setAttachedFiles((prev) =>
                        prev.filter((f) => f.id !== file.id)
                      )
                    }
                  >
                    <XIcon className="size-3" aria-hidden />
                  </button>
                </Badge>
              ))}
            </div>
          ) : null}

          <Textarea
            className="max-h-50 min-h-12 resize-none rounded-none border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0 dark:bg-transparent"
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                submitPrompt()
              }
            }}
            placeholder="Ask anything"
            aria-label="Ask anything"
            value={prompt}
          />

          <div className="flex items-center gap-1">
            <div className="flex items-end gap-0.5 sm:gap-1">
              <input
                className="sr-only"
                multiple
                onChange={(e) => {
                  processFiles(Array.from(e.target.files ?? []))
                  if (fileInputRef.current) fileInputRef.current.value = ""
                }}
                ref={fileInputRef}
                type="file"
                tabIndex={-1}
                aria-hidden
              />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    aria-label="Add attachments"
                    className="-ms-0.5 rounded-md"
                    size="icon-sm"
                    variant="ghost"
                  >
                    <PlusIcon className="size-4" aria-hidden />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="max-w-xs rounded-2xl p-1.5"
                >
                  <DropdownMenuGroup className="space-y-1">
                    <DropdownMenuItem
                      className="gap-2 rounded-md text-xs"
                      onSelect={() => fileInputRef.current?.click()}
                    >
                      <PaperclipIcon
                        className="size-4 text-muted-foreground"
                        aria-hidden
                      />
                      Attach Files
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 rounded-md text-xs">
                      <LinkIcon
                        className="size-4 text-muted-foreground"
                        aria-hidden
                      />
                      Import from URL
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 rounded-md text-xs">
                      <ClipboardIcon
                        className="size-4 text-muted-foreground"
                        aria-hidden
                      />
                      Paste from Clipboard
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 rounded-md text-xs">
                      <LayoutTemplateIcon
                        className="size-4 text-muted-foreground"
                        aria-hidden
                      />
                      Use Template
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    aria-label="Adjust settings"
                    className="rounded-md"
                    size="icon-sm"
                    variant="ghost"
                  >
                    <Settings2Icon className="size-4" aria-hidden />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-48 rounded-2xl p-3"
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <div className="space-y-3" role="group" aria-label="Settings">
                    <div className="flex items-center justify-between gap-3">
                      <Label
                        htmlFor="composer-autocomplete"
                        className="flex items-center gap-2 text-xs font-normal"
                      >
                        <SparklesIcon
                          className="size-4 text-muted-foreground"
                          aria-hidden
                        />
                        Auto-complete
                      </Label>
                      <Switch
                        id="composer-autocomplete"
                        checked={settings.autoComplete}
                        className="scale-75"
                        onCheckedChange={(value) =>
                          updateSetting("autoComplete", value)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <Label
                        htmlFor="composer-streaming"
                        className="flex items-center gap-2 text-xs font-normal"
                      >
                        <PlayIcon
                          className="size-4 text-muted-foreground"
                          aria-hidden
                        />
                        Streaming
                      </Label>
                      <Switch
                        id="composer-streaming"
                        checked={settings.streaming}
                        className="scale-75"
                        onCheckedChange={(value) =>
                          updateSetting("streaming", value)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <Label
                        htmlFor="composer-history"
                        className="flex items-center gap-2 text-xs font-normal"
                      >
                        <HistoryIcon
                          className="size-4 text-muted-foreground"
                          aria-hidden
                        />
                        Show History
                      </Label>
                      <Switch
                        id="composer-history"
                        checked={settings.showHistory}
                        className="scale-75"
                        onCheckedChange={(value) =>
                          updateSetting("showHistory", value)
                        }
                      />
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="ms-auto flex items-center gap-0.5 sm:gap-1">
              <Button
                type="submit"
                aria-label="Send message"
                className="rounded-md"
                disabled={!prompt.trim()}
                size="icon-sm"
              >
                <ArrowUpIcon className="size-4" aria-hidden />
              </Button>
            </div>
          </div>

          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] border border-dashed border-border bg-muted text-sm text-foreground transition-opacity duration-200",
              isDragOver ? "opacity-100" : "opacity-0"
            )}
            aria-hidden={!isDragOver}
          >
            <span className="flex w-full items-center justify-center gap-1 font-medium">
              <CirclePlusIcon className="size-4 shrink-0" aria-hidden />
              Drop files here to add as attachments
            </span>
          </div>
        </form>
      </div>

      <div className="mx-auto flex min-h-0 max-w-250 shrink-0 flex-wrap items-center justify-center gap-3">
        {ACTIONS.map((action) => {
          const Icon = action.icon
          return (
            <Button
              key={action.id}
              type="button"
              className="gap-2 rounded-full"
              size="sm"
              variant="outline"
            >
              <Icon className="size-4" aria-hidden />
              {action.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
