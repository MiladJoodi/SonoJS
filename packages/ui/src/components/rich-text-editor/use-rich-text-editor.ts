"use client"

import { useEffect, useMemo, useRef } from "react"
import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import { TableKit } from "@tiptap/extension-table"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyleKit } from "@tiptap/extension-text-style"
import Typography from "@tiptap/extension-typography"
import Underline from "@tiptap/extension-underline"
import { useEditor, type Editor, type JSONContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import {
  normalizeRichTextContent,
  richTextContentsEqual,
  type RichTextEditorContent,
  type RichTextEditorOutput,
  type RichTextEditorVariant,
} from "./lib"

export type UseRichTextEditorOptions = {
  value?: RichTextEditorContent
  defaultValue?: RichTextEditorContent
  onChange?: (payload: RichTextEditorOutput) => void
  placeholder?: string
  editable?: boolean
  immediatelyRender?: boolean
  variant?: RichTextEditorVariant
}

function createPlaceholderExtension(placeholder?: string) {
  return Placeholder.configure({
    placeholder: placeholder ?? "",
    emptyEditorClass:
      "before:text-muted-foreground before:content-[attr(data-placeholder)] before:pointer-events-none before:float-start before:h-0",
  })
}

function createLinkExtension() {
  return Link.configure({
    openOnClick: false,
    autolink: true,
    HTMLAttributes: {
      class: "text-primary underline underline-offset-2",
    },
  })
}

function createImageExtension() {
  return Image.configure({
    HTMLAttributes: {
      class: "my-2 max-h-80 max-w-full rounded-md",
    },
  })
}

export function createRichTextExtensions(
  placeholder?: string,
  variant: RichTextEditorVariant = "simple"
) {
  const starter = StarterKit.configure({
    heading: { levels: [1, 2, 3] },
    link: false,
    underline: false,
  })

  if (variant === "simple") {
    return [
      starter,
      Underline,
      createLinkExtension(),
      createImageExtension(),
      createPlaceholderExtension(placeholder),
    ]
  }

  return [
    starter,
    TextStyleKit,
    Underline,
    Subscript,
    Superscript,
    Highlight.configure({
      multicolor: true,
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
      alignments: ["left", "center", "right", "justify"],
    }),
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    TableKit.configure({
      table: {
        resizable: true,
      },
    }),
    createLinkExtension(),
    createImageExtension(),
    Typography,
    createPlaceholderExtension(placeholder),
  ]
}

export function useRichTextEditor({
  value,
  defaultValue,
  onChange,
  placeholder,
  editable = true,
  immediatelyRender = false,
  variant = "simple",
}: UseRichTextEditorOptions): Editor | null {
  const onChangeRef = useRef(onChange)
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  const initialContent = useMemo(
    () =>
      normalizeRichTextContent(value ?? defaultValue) ?? "<p></p>",
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initial mount only
    []
  )

  const editor = useEditor({
    extensions: createRichTextExtensions(placeholder, variant),
    content: initialContent,
    editable,
    immediatelyRender,
    editorProps: {
      attributes: {
        class: "rich-text-editor-prose",
      },
    },
    onUpdate: ({ editor: current }) => {
      onChangeRef.current?.({
        html: current.getHTML(),
        json: current.getJSON(),
      })
    },
  })

  useEffect(() => {
    if (!editor) return
    editor.setEditable(editable)
  }, [editor, editable])

  useEffect(() => {
    if (!editor || value === undefined) return
    const html = editor.getHTML()
    if (typeof value === "string" && richTextContentsEqual(value, html)) {
      return
    }
    if (typeof value !== "string") {
      const currentJson = JSON.stringify(editor.getJSON())
      const nextJson = JSON.stringify(value)
      if (currentJson === nextJson) return
      editor.commands.setContent(value)
      return
    }
    editor.commands.setContent(value)
  }, [editor, value])

  return editor
}

export type { Editor, JSONContent }
