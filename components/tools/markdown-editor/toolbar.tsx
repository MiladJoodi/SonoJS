"use client"

import * as React from "react"
import { usePublisher, viewMode$ } from "@mdxeditor/editor"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { SoftButton, SoftGroup } from "@/components/docs/soft-toolbar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import {
  type EditorLayoutMode,
  useEditorLayout,
} from "./editor-layout"
import { FormatToolbar } from "./format-toolbar"

const VIEW_OPTIONS: {
  value: EditorLayoutMode
  label: string
  short: string
}[] = [
  { value: "rich-text", label: "Rich text", short: "Rich" },
  { value: "source", label: "Source", short: "Source" },
  { value: "diff", label: "Diff", short: "Diff" },
]

function useSetEditorMode() {
  const { setLayout } = useEditorLayout()
  const setViewMode = usePublisher(viewMode$)

  return React.useCallback(
    (mode: EditorLayoutMode) => {
      setLayout(mode)
      // Always keep Lexical rich-text so the formatting toolbar works in
      // Rich, Source, and Diff. Source/Diff add a custom Markdown pane.
      setViewMode("rich-text")
    },
    [setLayout, setViewMode]
  )
}

/** Compact View menu — mobile only; sits in the end-sticky tabs slot. */
function ViewModeMenu() {
  const { layout } = useEditorLayout()
  const setMode = useSetEditorMode()
  const current =
    VIEW_OPTIONS.find((o) => o.value === layout)?.short ?? "View"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="markdown-view-menu h-[2.375rem] shrink-0 cursor-pointer gap-1 px-2.5 lg:hidden"
          aria-label={`View: ${current}`}
        >
          {current}
          <ChevronDownIcon className="size-3.5 opacity-70" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {VIEW_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className="cursor-pointer"
            onClick={() => setMode(option.value)}
          >
            <CheckIcon
              className={cn(
                "size-4",
                layout === option.value ? "opacity-100" : "opacity-0"
              )}
              aria-hidden
            />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * SoftButton + Lucide strip is shared across Rich / Source / Diff.
 */
export function MarkdownToolbar() {
  const { layout } = useEditorLayout()
  const setMode = useSetEditorMode()

  return (
    <>
      <FormatToolbar />

      <div className="markdown-view-tabs">
        <ViewModeMenu />
        <SoftGroup
          label="Editor view"
          className="hidden h-[2.375rem] gap-0.5 divide-x-0 p-0.5 lg:inline-flex"
        >
          {VIEW_OPTIONS.map((option) => (
            <SoftButton
              key={option.value}
              label={option.label}
              pressed={layout === option.value}
              onClick={() => setMode(option.value)}
              className={cn(
                "h-full min-w-0 rounded-[6px] px-3 text-[13px] shadow-none",
                layout === option.value && "border border-border"
              )}
            >
              {option.short}
            </SoftButton>
          ))}
        </SoftGroup>
      </div>
    </>
  )
}
