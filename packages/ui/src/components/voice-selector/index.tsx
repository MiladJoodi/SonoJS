"use client"

import * as React from "react"
import {
  CircleSmallIcon,
  MarsIcon,
  MarsStrokeIcon,
  NonBinaryIcon,
  PauseIcon,
  PlayIcon,
  TransgenderIcon,
  VenusAndMarsIcon,
  VenusIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
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
import { Spinner } from "@sonojs/ui/components/spinner"
import { cn } from "@sonojs/ui/lib/utils"

export * from "./demo-previews"

function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: {
  prop?: T
  defaultProp?: T
  onChange?: (value: T) => void
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultProp)
  const isControlled = prop !== undefined
  const value = isControlled ? prop : uncontrolled

  const setValue = React.useCallback(
    (next: T | ((prev: T | undefined) => T)) => {
      const resolved =
        typeof next === "function"
          ? (next as (prev: T | undefined) => T)(value)
          : next
      if (!isControlled) setUncontrolled(resolved)
      onChange?.(resolved)
    },
    [isControlled, onChange, value]
  )

  return [value, setValue] as const
}

type VoiceSelectorContextValue = {
  value: string | undefined
  setValue: (value: string | undefined) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const VoiceSelectorContext =
  React.createContext<VoiceSelectorContextValue | null>(null)

function useVoiceSelector() {
  const context = React.useContext(VoiceSelectorContext)
  if (!context) {
    throw new Error(
      "VoiceSelector components must be used within VoiceSelector"
    )
  }
  return context
}

export type VoiceSelectorProps = React.ComponentProps<typeof Dialog> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string | undefined) => void
}

function VoiceSelector({
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  ...props
}: VoiceSelectorProps) {
  const [value, setValue] = useControllableState<string | undefined>({
    defaultProp: defaultValue,
    onChange: onValueChange,
    prop: valueProp,
  })

  const [open, setOpen] = useControllableState<boolean>({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  })

  const voiceSelectorContext = React.useMemo(
    () => ({
      open: !!open,
      setOpen: setOpen as (open: boolean) => void,
      setValue: setValue as (value: string | undefined) => void,
      value,
    }),
    [value, setValue, open, setOpen]
  )

  return (
    <VoiceSelectorContext.Provider value={voiceSelectorContext}>
      <Dialog
        data-slot="voice-selector"
        onOpenChange={setOpen}
        open={open}
        {...props}
      >
        {children}
      </Dialog>
    </VoiceSelectorContext.Provider>
  )
}

export type VoiceSelectorTriggerProps = React.ComponentProps<
  typeof DialogTrigger
>

function VoiceSelectorTrigger(props: VoiceSelectorTriggerProps) {
  return <DialogTrigger data-slot="voice-selector-trigger" {...props} />
}

export type VoiceSelectorContentProps = React.ComponentProps<
  typeof DialogContent
> & {
  title?: React.ReactNode
}

function VoiceSelectorContent({
  className,
  children,
  title = "Voice Selector",
  showCloseButton = false,
  ...props
}: VoiceSelectorContentProps) {
  return (
    <DialogContent
      aria-describedby={undefined}
      data-slot="voice-selector-content"
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

export type VoiceSelectorDialogProps = React.ComponentProps<
  typeof CommandDialog
>

function VoiceSelectorDialog(props: VoiceSelectorDialogProps) {
  return <CommandDialog data-slot="voice-selector-dialog" {...props} />
}

export type VoiceSelectorInputProps = React.ComponentProps<typeof CommandInput>

function VoiceSelectorInput({ className, ...props }: VoiceSelectorInputProps) {
  return (
    <CommandInput
      data-slot="voice-selector-input"
      className={cn("h-auto py-3.5", className)}
      {...props}
    />
  )
}

export type VoiceSelectorListProps = React.ComponentProps<typeof CommandList>

function VoiceSelectorList({ className, ...props }: VoiceSelectorListProps) {
  return (
    <CommandList
      data-slot="voice-selector-list"
      className={cn("max-h-80", className)}
      {...props}
    />
  )
}

export type VoiceSelectorEmptyProps = React.ComponentProps<typeof CommandEmpty>

function VoiceSelectorEmpty(props: VoiceSelectorEmptyProps) {
  return <CommandEmpty data-slot="voice-selector-empty" {...props} />
}

export type VoiceSelectorGroupProps = React.ComponentProps<typeof CommandGroup>

function VoiceSelectorGroup(props: VoiceSelectorGroupProps) {
  return <CommandGroup data-slot="voice-selector-group" {...props} />
}

export type VoiceSelectorItemProps = React.ComponentProps<typeof CommandItem>

function VoiceSelectorItem({ className, ...props }: VoiceSelectorItemProps) {
  return (
    <CommandItem
      data-slot="voice-selector-item"
      className={cn(
        "items-start gap-2 px-4 py-2.5 [&>svg:last-child]:hidden",
        className
      )}
      {...props}
    />
  )
}

export type VoiceSelectorShortcutProps = React.ComponentProps<
  typeof CommandShortcut
>

function VoiceSelectorShortcut(props: VoiceSelectorShortcutProps) {
  return <CommandShortcut data-slot="voice-selector-shortcut" {...props} />
}

export type VoiceSelectorSeparatorProps = React.ComponentProps<
  typeof CommandSeparator
>

function VoiceSelectorSeparator(props: VoiceSelectorSeparatorProps) {
  return <CommandSeparator data-slot="voice-selector-separator" {...props} />
}

export type VoiceSelectorGenderProps = React.ComponentProps<"span"> & {
  value?:
    | "male"
    | "female"
    | "transgender"
    | "androgyne"
    | "non-binary"
    | "intersex"
}

function VoiceSelectorGender({
  className,
  value,
  children,
  ...props
}: VoiceSelectorGenderProps) {
  let icon: React.ReactNode = <CircleSmallIcon className="size-4" />

  switch (value) {
    case "male":
      icon = <MarsIcon className="size-4" />
      break
    case "female":
      icon = <VenusIcon className="size-4" />
      break
    case "transgender":
      icon = <TransgenderIcon className="size-4" />
      break
    case "androgyne":
      icon = <MarsStrokeIcon className="size-4" />
      break
    case "non-binary":
      icon = <NonBinaryIcon className="size-4" />
      break
    case "intersex":
      icon = <VenusAndMarsIcon className="size-4" />
      break
  }

  return (
    <span
      data-slot="voice-selector-gender"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    >
      {children ?? icon}
    </span>
  )
}

export type VoiceSelectorAccentProps = React.ComponentProps<"span"> & {
  value?:
    | "american"
    | "british"
    | "australian"
    | "canadian"
    | "irish"
    | "scottish"
    | "indian"
    | "south-african"
    | "new-zealand"
    | "spanish"
    | "french"
    | "german"
    | "italian"
    | "portuguese"
    | "brazilian"
    | "mexican"
    | "argentinian"
    | "japanese"
    | "chinese"
    | "korean"
    | "russian"
    | "arabic"
    | "dutch"
    | "swedish"
    | "norwegian"
    | "danish"
    | "finnish"
    | "polish"
    | "turkish"
    | "greek"
    | (string & {})
}

function VoiceSelectorAccent({
  className,
  value,
  children,
  ...props
}: VoiceSelectorAccentProps) {
  const emojiByAccent: Record<string, string> = {
    american: "🇺🇸",
    british: "🇬🇧",
    australian: "🇦🇺",
    canadian: "🇨🇦",
    irish: "🇮🇪",
    scottish: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    indian: "🇮🇳",
    "south-african": "🇿🇦",
    "new-zealand": "🇳🇿",
    spanish: "🇪🇸",
    french: "🇫🇷",
    german: "🇩🇪",
    italian: "🇮🇹",
    portuguese: "🇵🇹",
    brazilian: "🇧🇷",
    mexican: "🇲🇽",
    argentinian: "🇦🇷",
    japanese: "🇯🇵",
    chinese: "🇨🇳",
    korean: "🇰🇷",
    russian: "🇷🇺",
    arabic: "🇸🇦",
    dutch: "🇳🇱",
    swedish: "🇸🇪",
    norwegian: "🇳🇴",
    danish: "🇩🇰",
    finnish: "🇫🇮",
    polish: "🇵🇱",
    turkish: "🇹🇷",
    greek: "🇬🇷",
  }

  const emoji = value ? (emojiByAccent[value] ?? null) : null

  return (
    <span
      data-slot="voice-selector-accent"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    >
      {children ?? emoji}
    </span>
  )
}

export type VoiceSelectorAgeProps = React.ComponentProps<"span">

function VoiceSelectorAge({ className, ...props }: VoiceSelectorAgeProps) {
  return (
    <span
      data-slot="voice-selector-age"
      className={cn(
        "text-xs text-muted-foreground tabular-nums",
        className
      )}
      {...props}
    />
  )
}

export type VoiceSelectorNameProps = React.ComponentProps<"span">

function VoiceSelectorName({ className, ...props }: VoiceSelectorNameProps) {
  return (
    <span
      data-slot="voice-selector-name"
      className={cn(
        "min-w-0 flex-1 truncate text-start font-medium",
        className
      )}
      {...props}
    />
  )
}

export type VoiceSelectorDescriptionProps = React.ComponentProps<"span">

function VoiceSelectorDescription({
  className,
  ...props
}: VoiceSelectorDescriptionProps) {
  return (
    <span
      data-slot="voice-selector-description"
      className={cn(
        "min-w-0 truncate text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export type VoiceSelectorAttributesProps = React.ComponentProps<"div">

function VoiceSelectorAttributes({
  className,
  children,
  ...props
}: VoiceSelectorAttributesProps) {
  return (
    <div
      data-slot="voice-selector-attributes"
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export type VoiceSelectorBulletProps = React.ComponentProps<"span">

function VoiceSelectorBullet({
  className,
  ...props
}: VoiceSelectorBulletProps) {
  return (
    <span
      aria-hidden="true"
      data-slot="voice-selector-bullet"
      className={cn("select-none text-border", className)}
      {...props}
    >
      &bull;
    </span>
  )
}

export type VoiceSelectorPreviewProps = Omit<
  React.ComponentProps<"button">,
  "children"
> & {
  playing?: boolean
  loading?: boolean
  onPlay?: () => void
}

function VoiceSelectorPreview({
  className,
  playing,
  loading,
  onPlay,
  onClick,
  ...props
}: VoiceSelectorPreviewProps) {
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      onClick?.(event)
      onPlay?.()
    },
    [onClick, onPlay]
  )

  let icon = <PlayIcon className="size-3" />
  if (loading) icon = <Spinner className="size-3" />
  else if (playing) icon = <PauseIcon className="size-3" />

  return (
    <Button
      aria-label={playing ? "Pause preview" : "Play preview"}
      data-slot="voice-selector-preview"
      className={cn("shrink-0", className)}
      disabled={loading}
      onClick={handleClick}
      size="icon-xs"
      type="button"
      variant="outline"
      {...props}
    >
      {icon}
    </Button>
  )
}

export {
  VoiceSelector,
  VoiceSelectorTrigger,
  VoiceSelectorContent,
  VoiceSelectorDialog,
  VoiceSelectorInput,
  VoiceSelectorList,
  VoiceSelectorEmpty,
  VoiceSelectorGroup,
  VoiceSelectorItem,
  VoiceSelectorShortcut,
  VoiceSelectorSeparator,
  VoiceSelectorGender,
  VoiceSelectorAccent,
  VoiceSelectorAge,
  VoiceSelectorName,
  VoiceSelectorDescription,
  VoiceSelectorAttributes,
  VoiceSelectorBullet,
  VoiceSelectorPreview,
  useVoiceSelector,
}
