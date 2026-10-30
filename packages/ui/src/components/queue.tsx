"use client"

import * as React from "react"
import { ChevronDownIcon, PaperclipIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@sonojs/ui/components/collapsible"
import { ScrollArea } from "@sonojs/ui/components/scroll-area"
import { cn } from "@sonojs/ui/lib/utils"

export interface QueueMessagePart {
  type: string
  text?: string
  url?: string
  filename?: string
  mediaType?: string
}

export interface QueueMessage {
  id: string
  parts: QueueMessagePart[]
}

export interface QueueTodo {
  id: string
  title: string
  description?: string
  status?: "pending" | "completed"
}

export type QueueItemProps = React.ComponentProps<"li">

function QueueItem({ className, ...props }: QueueItemProps) {
  return (
    <li
      data-slot="queue-item"
      className={cn(
        "group/queue-item flex min-w-0 flex-col gap-1 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted/70 sm:px-3",
        className
      )}
      {...props}
    />
  )
}

export type QueueItemIndicatorProps = React.ComponentProps<"span"> & {
  completed?: boolean
}

function QueueItemIndicator({
  completed = false,
  className,
  ...props
}: QueueItemIndicatorProps) {
  return (
    <span
      data-slot="queue-item-indicator"
      data-completed={completed || undefined}
      aria-hidden
      className={cn(
        "mt-0.5 inline-block size-2.5 shrink-0 rounded-full border",
        completed
          ? "border-muted-foreground/25 bg-muted-foreground/15"
          : "border-muted-foreground/55 bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export type QueueItemContentProps = React.ComponentProps<"span"> & {
  completed?: boolean
}

function QueueItemContent({
  completed = false,
  className,
  ...props
}: QueueItemContentProps) {
  return (
    <span
      data-slot="queue-item-content"
      data-completed={completed || undefined}
      className={cn(
        "line-clamp-1 min-w-0 grow break-words",
        completed
          ? "text-muted-foreground/50 line-through"
          : "text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export type QueueItemDescriptionProps = React.ComponentProps<"div"> & {
  completed?: boolean
}

function QueueItemDescription({
  completed = false,
  className,
  ...props
}: QueueItemDescriptionProps) {
  return (
    <div
      data-slot="queue-item-description"
      data-completed={completed || undefined}
      className={cn(
        "ms-6 text-xs leading-relaxed",
        completed
          ? "text-muted-foreground/40 line-through"
          : "text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export type QueueItemActionsProps = React.ComponentProps<"div">

function QueueItemActions({ className, ...props }: QueueItemActionsProps) {
  return (
    <div
      data-slot="queue-item-actions"
      className={cn(
        "ms-auto flex shrink-0 items-center gap-0.5 opacity-100 transition-opacity",
        "sm:opacity-0 sm:group-hover/queue-item:opacity-100 sm:group-focus-within/queue-item:opacity-100",
        className
      )}
      {...props}
    />
  )
}

export type QueueItemActionProps = Omit<
  React.ComponentProps<typeof Button>,
  "variant" | "size"
>

function QueueItemAction({ className, ...props }: QueueItemActionProps) {
  return (
    <Button
      data-slot="queue-item-action"
      type="button"
      variant="ghost"
      size="icon-xs"
      className={cn(
        "size-10 shrink-0 rounded-md p-0 text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground sm:size-8",
        className
      )}
      {...props}
    />
  )
}

export type QueueItemAttachmentProps = React.ComponentProps<"div">

function QueueItemAttachment({
  className,
  ...props
}: QueueItemAttachmentProps) {
  return (
    <div
      data-slot="queue-item-attachment"
      className={cn("mt-1 flex flex-wrap gap-2 ps-6", className)}
      {...props}
    />
  )
}

export type QueueItemImageProps = React.ComponentProps<"img">

function QueueItemImage({ className, alt = "", ...props }: QueueItemImageProps) {
  return (
    <img
      data-slot="queue-item-image"
      alt={alt}
      height={32}
      width={32}
      className={cn(
        "size-8 rounded-md border border-border/70 object-cover",
        className
      )}
      {...props}
    />
  )
}

export type QueueItemFileProps = React.ComponentProps<"span">

function QueueItemFile({
  children,
  className,
  ...props
}: QueueItemFileProps) {
  return (
    <span
      data-slot="queue-item-file"
      className={cn(
        "inline-flex max-w-full items-center gap-1 rounded-md border border-border/70 bg-muted px-2 py-1 text-xs text-muted-foreground",
        className
      )}
      {...props}
    >
      <PaperclipIcon className="size-3 shrink-0" aria-hidden />
      <span className="max-w-[100px] truncate">{children}</span>
    </span>
  )
}

export type QueueListProps = React.ComponentProps<typeof ScrollArea>

function QueueList({ children, className, ...props }: QueueListProps) {
  return (
    <ScrollArea
      data-slot="queue-list"
      className={cn("mt-2 max-h-40", className)}
      {...props}
    >
      <ul className="flex flex-col pe-3">{children}</ul>
    </ScrollArea>
  )
}

export type QueueSectionProps = React.ComponentProps<typeof Collapsible>

function QueueSection({
  className,
  defaultOpen = true,
  ...props
}: QueueSectionProps) {
  return (
    <Collapsible
      data-slot="queue-section"
      defaultOpen={defaultOpen}
      className={cn(className)}
      {...props}
    />
  )
}

export type QueueSectionTriggerProps = React.ComponentProps<"button">

function QueueSectionTrigger({
  children,
  className,
  ...props
}: QueueSectionTriggerProps) {
  return (
    <CollapsibleTrigger asChild>
      <button
        type="button"
        data-slot="queue-section-trigger"
        className={cn(
          "group flex min-h-11 w-full cursor-pointer items-center justify-between rounded-md bg-muted/40 px-3 py-2 text-start text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
        {...props}
      >
        {children}
      </button>
    </CollapsibleTrigger>
  )
}

export type QueueSectionLabelProps = React.ComponentProps<"span"> & {
  count?: number
  label: string
  icon?: React.ReactNode
}

function QueueSectionLabel({
  count,
  label,
  icon,
  className,
  ...props
}: QueueSectionLabelProps) {
  return (
    <span
      data-slot="queue-section-label"
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <ChevronDownIcon className="size-4 shrink-0 transition-transform duration-200 group-data-[state=closed]:-rotate-90 rtl:group-data-[state=closed]:rotate-90" />
      {icon}
      <span>
        {count != null ? `${count} ` : null}
        {label}
      </span>
    </span>
  )
}

export type QueueSectionContentProps = React.ComponentProps<
  typeof CollapsibleContent
>

function QueueSectionContent({
  className,
  ...props
}: QueueSectionContentProps) {
  return (
    <CollapsibleContent
      data-slot="queue-section-content"
      className={cn(className)}
      {...props}
    />
  )
}

export type QueueProps = React.ComponentProps<"div">

function Queue({ className, ...props }: QueueProps) {
  return (
    <div
      data-slot="queue"
      className={cn(
        "flex w-full min-w-0 flex-col gap-2 rounded-[12px] border border-border/70 bg-card px-2 py-2 shadow-soft sm:px-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Queue,
  QueueItem,
  QueueItemAction,
  QueueItemActions,
  QueueItemAttachment,
  QueueItemContent,
  QueueItemDescription,
  QueueItemFile,
  QueueItemImage,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
}
