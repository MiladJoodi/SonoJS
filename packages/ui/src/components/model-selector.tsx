"use client"

import * as React from "react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@sonojs/ui/components/command"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@sonojs/ui/components/dialog"
import { cn } from "@sonojs/ui/lib/utils"

export type ModelSelectorProps = React.ComponentProps<typeof Dialog>

function ModelSelector(props: ModelSelectorProps) {
  return <Dialog data-slot="model-selector" {...props} />
}

export type ModelSelectorTriggerProps = React.ComponentProps<
  typeof DialogTrigger
>

function ModelSelectorTrigger(props: ModelSelectorTriggerProps) {
  return <DialogTrigger data-slot="model-selector-trigger" {...props} />
}

export type ModelSelectorContentProps = React.ComponentProps<
  typeof DialogContent
> & {
  title?: React.ReactNode
}

function ModelSelectorContent({
  className,
  children,
  title = "Model Selector",
  showCloseButton = false,
  ...props
}: ModelSelectorContentProps) {
  return (
    <DialogContent
      aria-describedby={undefined}
      data-slot="model-selector-content"
      showCloseButton={showCloseButton}
      className={cn("overflow-hidden border-border/70 p-0", className)}
      {...props}
    >
      <DialogTitle className="sr-only">{title}</DialogTitle>
      <Command className="**:data-[slot=command-input-wrapper]:h-auto">
        {children}
      </Command>
    </DialogContent>
  )
}

export type ModelSelectorDialogProps = React.ComponentProps<
  typeof CommandDialog
>

function ModelSelectorDialog(props: ModelSelectorDialogProps) {
  return <CommandDialog data-slot="model-selector-dialog" {...props} />
}

export type ModelSelectorInputProps = React.ComponentProps<typeof CommandInput>

function ModelSelectorInput({ className, ...props }: ModelSelectorInputProps) {
  return (
    <CommandInput
      data-slot="model-selector-input"
      className={cn("h-auto py-3.5", className)}
      {...props}
    />
  )
}

export type ModelSelectorListProps = React.ComponentProps<typeof CommandList>

function ModelSelectorList({ className, ...props }: ModelSelectorListProps) {
  return (
    <CommandList
      data-slot="model-selector-list"
      className={cn("max-h-80", className)}
      {...props}
    />
  )
}

export type ModelSelectorEmptyProps = React.ComponentProps<typeof CommandEmpty>

function ModelSelectorEmpty(props: ModelSelectorEmptyProps) {
  return <CommandEmpty data-slot="model-selector-empty" {...props} />
}

export type ModelSelectorGroupProps = React.ComponentProps<typeof CommandGroup>

function ModelSelectorGroup(props: ModelSelectorGroupProps) {
  return <CommandGroup data-slot="model-selector-group" {...props} />
}

export type ModelSelectorItemProps = React.ComponentProps<typeof CommandItem>

function ModelSelectorItem({ className, ...props }: ModelSelectorItemProps) {
  return (
    <CommandItem
      data-slot="model-selector-item"
      className={cn("[&>svg:last-child]:hidden", className)}
      {...props}
    />
  )
}

export type ModelSelectorShortcutProps = React.ComponentProps<
  typeof CommandShortcut
>

function ModelSelectorShortcut(props: ModelSelectorShortcutProps) {
  return <CommandShortcut data-slot="model-selector-shortcut" {...props} />
}

export type ModelSelectorSeparatorProps = React.ComponentProps<
  typeof CommandSeparator
>

function ModelSelectorSeparator(props: ModelSelectorSeparatorProps) {
  return <CommandSeparator data-slot="model-selector-separator" {...props} />
}

export type ModelSelectorLogoProps = Omit<
  React.ComponentProps<"img">,
  "src" | "alt"
> & {
  provider:
    | "moonshotai-cn"
    | "lucidquery"
    | "moonshotai"
    | "zai-coding-plan"
    | "alibaba"
    | "xai"
    | "vultr"
    | "nvidia"
    | "upstage"
    | "groq"
    | "github-copilot"
    | "mistral"
    | "vercel"
    | "nebius"
    | "deepseek"
    | "alibaba-cn"
    | "google-vertex-anthropic"
    | "venice"
    | "chutes"
    | "cortecs"
    | "github-models"
    | "togetherai"
    | "azure"
    | "baseten"
    | "huggingface"
    | "opencode"
    | "fastrouter"
    | "google"
    | "google-vertex"
    | "cloudflare-workers-ai"
    | "inception"
    | "wandb"
    | "openai"
    | "zhipuai-coding-plan"
    | "perplexity"
    | "openrouter"
    | "zenmux"
    | "v0"
    | "iflowcn"
    | "synthetic"
    | "deepinfra"
    | "zhipuai"
    | "submodel"
    | "zai"
    | "inference"
    | "requesty"
    | "morph"
    | "lmstudio"
    | "anthropic"
    | "aihubmix"
    | "fireworks-ai"
    | "modelscope"
    | "llama"
    | "scaleway"
    | "amazon-bedrock"
    | "cerebras"
    | (string & {})
}

function ModelSelectorLogo({
  provider,
  className,
  ...props
}: ModelSelectorLogoProps) {
  return (
    <img
      {...props}
      alt={`${provider} logo`}
      data-slot="model-selector-logo"
      className={cn("size-3 dark:invert", className)}
      height={12}
      src={`https://models.dev/logos/${provider}.svg`}
      width={12}
    />
  )
}

export type ModelSelectorLogoGroupProps = React.ComponentProps<"div">

function ModelSelectorLogoGroup({
  className,
  ...props
}: ModelSelectorLogoGroupProps) {
  return (
    <div
      data-slot="model-selector-logo-group"
      className={cn(
        "flex shrink-0 items-center -space-x-1 rtl:space-x-reverse [&>img]:rounded-full [&>img]:bg-background [&>img]:p-px [&>img]:ring-1 dark:[&>img]:bg-foreground",
        className
      )}
      {...props}
    />
  )
}

export type ModelSelectorNameProps = React.ComponentProps<"span">

function ModelSelectorName({ className, ...props }: ModelSelectorNameProps) {
  return (
    <span
      data-slot="model-selector-name"
      className={cn("min-w-0 flex-1 truncate text-start", className)}
      {...props}
    />
  )
}

export {
  ModelSelector,
  ModelSelectorTrigger,
  ModelSelectorContent,
  ModelSelectorDialog,
  ModelSelectorInput,
  ModelSelectorList,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorItem,
  ModelSelectorShortcut,
  ModelSelectorSeparator,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
}
