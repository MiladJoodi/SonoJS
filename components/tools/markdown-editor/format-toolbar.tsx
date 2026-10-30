"use client"

import * as React from "react"
import { redo, undo } from "@codemirror/commands"
import type { EditorView } from "@codemirror/view"
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text"
import { mergeRegister } from "@lexical/utils"
import {
  activeEditor$,
  applyFormat$,
  applyListType$,
  convertSelectionToNode$,
  currentBlockType$,
  currentFormat$,
  insertCodeBlock$,
  insertTable$,
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  openLinkEditDialog$,
  openNewImageDialog$,
} from "@mdxeditor/editor"
import { useCellValue, usePublisher } from "@mdxeditor/gurx"
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  $createParagraphNode,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical"
import {
  BoldIcon,
  CodeIcon,
  HeadingIcon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  Redo2Icon,
  SquareCodeIcon,
  StrikethroughIcon,
  TableIcon,
  Undo2Icon,
} from "lucide-react"

import { SoftButton } from "@/components/docs/soft-toolbar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import { useEditorLayout } from "./editor-layout"
import { useSourceCm } from "./source-cm-context"

function wrapSelection(
  view: EditorView,
  before: string,
  after: string = before
) {
  const sel = view.state.selection.main
  const text = view.state.sliceDoc(sel.from, sel.to)
  const insert = `${before}${text}${after}`
  const anchor = sel.from + before.length
  const head = anchor + text.length
  view.dispatch({
    changes: { from: sel.from, to: sel.to, insert },
    selection: { anchor, head },
  })
  view.focus()
}

function prefixLines(view: EditorView, prefix: string) {
  const sel = view.state.selection.main
  const doc = view.state.doc
  const fromLine = doc.lineAt(sel.from)
  const toLine = doc.lineAt(sel.to)
  const chunks: string[] = []
  for (let n = fromLine.number; n <= toLine.number; n++) {
    const line = doc.line(n)
    chunks.push(
      line.text.startsWith(prefix) ? line.text : `${prefix}${line.text}`
    )
  }
  const insert = chunks.join("\n")
  view.dispatch({
    changes: { from: fromLine.from, to: toLine.to, insert },
  })
  view.focus()
}

function insertBlock(view: EditorView, block: string) {
  const sel = view.state.selection.main
  const needsLead =
    sel.from > 0 && view.state.sliceDoc(sel.from - 1, sel.from) !== "\n"
  const insert = `${needsLead ? "\n\n" : "\n"}${block}\n`
  view.dispatch({
    changes: { from: sel.from, to: sel.to, insert },
    selection: { anchor: sel.from + insert.length },
  })
  view.focus()
}

function setHeading(view: EditorView, level: number) {
  const sel = view.state.selection.main
  const line = view.state.doc.lineAt(sel.from)
  const stripped = line.text.replace(/^#{1,6}\s+/, "")
  const hashes = "#".repeat(level)
  const insert = `${hashes} ${stripped}`
  view.dispatch({
    changes: { from: line.from, to: line.to, insert },
    selection: { anchor: line.from + insert.length },
  })
  view.focus()
}

const iconBtn =
  "inline-flex size-[2.375rem] shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent p-0 text-foreground shadow-none hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"

/**
 * Shared SoftButton + Lucide strip for Rich, Source, and Diff.
 * Source → CodeMirror wraps; Rich/Diff → Lexical via MDX signals.
 */
export function FormatToolbar() {
  const { layout } = useEditorLayout()
  const isSource = layout === "source"
  const { view } = useSourceCm()

  const applyFormat = usePublisher(applyFormat$)
  const applyListType = usePublisher(applyListType$)
  const convertSelectionToNode = usePublisher(convertSelectionToNode$)
  const insertTable = usePublisher(insertTable$)
  const insertCodeBlock = usePublisher(insertCodeBlock$)
  const openLinkDialog = usePublisher(openLinkEditDialog$)
  const openImageDialog = usePublisher(openNewImageDialog$)
  const activeEditor = useCellValue(activeEditor$)
  const currentFormat = useCellValue(currentFormat$)
  const currentBlockType = useCellValue(currentBlockType$)

  const [canUndo, setCanUndo] = React.useState(false)
  const [canRedo, setCanRedo] = React.useState(false)

  React.useEffect(() => {
    if (!activeEditor || isSource) {
      setCanUndo(false)
      setCanRedo(false)
      return
    }
    return mergeRegister(
      activeEditor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      )
    )
  }, [activeEditor, isSource])

  const runSource = React.useCallback(
    (fn: (v: EditorView) => void) => {
      if (!view) return
      fn(view)
    },
    [view]
  )

  const disabled = isSource ? !view : !activeEditor
  const btnClass = cn(iconBtn, disabled && "pointer-events-none opacity-40")

  const onUndo = () => {
    if (isSource) runSource((v) => undo(v))
    else activeEditor?.dispatchCommand(UNDO_COMMAND, undefined)
  }
  const onRedo = () => {
    if (isSource) runSource((v) => redo(v))
    else activeEditor?.dispatchCommand(REDO_COMMAND, undefined)
  }

  return (
    <>
      <SoftButton
        label="Undo"
        onClick={onUndo}
        className={cn(
          btnClass,
          !isSource && !canUndo && "pointer-events-none opacity-40"
        )}
      >
        <Undo2Icon className="size-5" strokeWidth={2.5} />
      </SoftButton>
      <SoftButton
        label="Redo"
        onClick={onRedo}
        className={cn(
          btnClass,
          !isSource && !canRedo && "pointer-events-none opacity-40"
        )}
      >
        <Redo2Icon className="size-5" strokeWidth={2.5} />
      </SoftButton>
      <SoftButton
        label="Bold"
        pressed={!isSource && (currentFormat & IS_BOLD) !== 0}
        onClick={() =>
          isSource
            ? runSource((v) => wrapSelection(v, "**"))
            : applyFormat("bold")
        }
        className={btnClass}
      >
        <BoldIcon className="size-5" strokeWidth={2.5} />
      </SoftButton>
      <SoftButton
        label="Italic"
        pressed={!isSource && (currentFormat & IS_ITALIC) !== 0}
        onClick={() =>
          isSource
            ? runSource((v) => wrapSelection(v, "*"))
            : applyFormat("italic")
        }
        className={btnClass}
      >
        <ItalicIcon className="size-5" strokeWidth={2.5} />
      </SoftButton>
      <SoftButton
        label="Create link"
        onClick={() => {
          if (isSource) {
            runSource((v) => {
              const sel = v.state.selection.main
              const text = v.state.sliceDoc(sel.from, sel.to) || "link"
              const insert = `[${text}](https://)`
              v.dispatch({
                changes: { from: sel.from, to: sel.to, insert },
                selection: {
                  anchor: sel.from + text.length + 3,
                  head: sel.from + insert.length - 1,
                },
              })
              v.focus()
            })
          } else {
            openLinkDialog()
          }
        }}
        className={btnClass}
      >
        <LinkIcon className="size-5" strokeWidth={2.5} />
      </SoftButton>
      <SoftButton
        label="Insert image"
        onClick={() => {
          if (isSource) {
            runSource((v) => insertBlock(v, "![alt](https://)"))
          } else {
            openImageDialog()
          }
        }}
        className={btnClass}
      >
        <ImageIcon className="size-5" strokeWidth={2.5} />
      </SoftButton>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              btnClass,
              "h-[2.375rem] w-auto max-w-[5.25rem] gap-1 px-2 text-[0.6875rem] font-bold lg:max-w-[11rem] lg:px-2.5 lg:text-sm",
              !isSource &&
                currentBlockType &&
                currentBlockType !== "paragraph" &&
                "bg-muted"
            )}
            aria-label="Block type"
          >
            <HeadingIcon className="size-4 shrink-0" strokeWidth={2.5} />
            <span className="min-w-0 truncate">
              {!isSource && currentBlockType?.startsWith("h")
                ? `Heading ${currentBlockType.slice(1)}`
                : !isSource && currentBlockType === "quote"
                  ? "Quote"
                  : "Block type"}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-44">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              if (isSource) {
                runSource((v) => {
                  const line = v.state.doc.lineAt(v.state.selection.main.from)
                  const stripped = line.text.replace(/^#{1,6}\s+/, "")
                  v.dispatch({
                    changes: {
                      from: line.from,
                      to: line.to,
                      insert: stripped,
                    },
                  })
                  v.focus()
                })
              } else {
                convertSelectionToNode(() => $createParagraphNode())
              }
            }}
          >
            Paragraph
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              if (isSource) runSource((v) => prefixLines(v, "> "))
              else convertSelectionToNode(() => $createQuoteNode())
            }}
          >
            Quote
          </DropdownMenuItem>
          {(
            [
              [1, "h1"],
              [2, "h2"],
              [3, "h3"],
              [4, "h4"],
              [5, "h5"],
              [6, "h6"],
            ] as const
          ).map(([level, tag]) => (
            <DropdownMenuItem
              key={tag}
              className="cursor-pointer"
              onClick={() => {
                if (isSource) runSource((v) => setHeading(v, level))
                else convertSelectionToNode(() => $createHeadingNode(tag))
              }}
            >
              Heading {level}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <SoftButton
        label="Strikethrough"
        pressed={!isSource && (currentFormat & IS_STRIKETHROUGH) !== 0}
        onClick={() =>
          isSource
            ? runSource((v) => wrapSelection(v, "~~"))
            : applyFormat("strikethrough")
        }
        className={btnClass}
      >
        <StrikethroughIcon className="size-5" strokeWidth={2.5} />
      </SoftButton>
      <SoftButton
        label="Bulleted list"
        onClick={() =>
          isSource
            ? runSource((v) => prefixLines(v, "- "))
            : applyListType("bullet")
        }
        className={btnClass}
      >
        <ListIcon className="size-5" strokeWidth={2.5} />
      </SoftButton>
      <SoftButton
        label="Numbered list"
        onClick={() =>
          isSource
            ? runSource((v) => prefixLines(v, "1. "))
            : applyListType("number")
        }
        className={btnClass}
      >
        <ListOrderedIcon className="size-5" strokeWidth={2.5} />
      </SoftButton>
      <SoftButton
        label="Check list"
        onClick={() =>
          isSource
            ? runSource((v) => prefixLines(v, "- [ ] "))
            : applyListType("check")
        }
        className={btnClass}
      >
        <ListTodoIcon className="size-5" strokeWidth={2.5} />
      </SoftButton>
      <SoftButton
        label="Inline code"
        pressed={!isSource && (currentFormat & IS_CODE) !== 0}
        onClick={() =>
          isSource
            ? runSource((v) => wrapSelection(v, "`"))
            : applyFormat("code")
        }
        className={btnClass}
      >
        <CodeIcon className="size-5" strokeWidth={2.5} />
      </SoftButton>
      <SoftButton
        label="Insert code block"
        onClick={() => {
          if (isSource) {
            runSource((v) => {
              const sel = v.state.selection.main
              const text = v.state.sliceDoc(sel.from, sel.to)
              insertBlock(v, `\`\`\`txt\n${text || ""}\n\`\`\``)
            })
          } else {
            insertCodeBlock({ language: "txt", code: "" })
          }
        }}
        className={btnClass}
      >
        <SquareCodeIcon className="size-5" strokeWidth={2.5} />
      </SoftButton>
      <SoftButton
        label="Insert table"
        onClick={() => {
          if (isSource) {
            runSource((v) =>
              insertBlock(
                v,
                "| Column | Column |\n| --- | --- |\n| Cell | Cell |"
              )
            )
          } else {
            insertTable({ rows: 3, columns: 3 })
          }
        }}
        className={btnClass}
      >
        <TableIcon className="size-5" strokeWidth={2.5} />
      </SoftButton>
    </>
  )
}
