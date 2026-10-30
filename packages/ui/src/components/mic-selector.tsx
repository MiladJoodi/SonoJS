"use client"

import * as React from "react"
import { ChevronsUpDownIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@sonojs/ui/components/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
import { cn } from "@sonojs/ui/lib/utils"

const deviceIdRegex = /\(([\da-fA-F]{4}:[\da-fA-F]{4})\)$/

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

type MicSelectorContextType = {
  data: MediaDeviceInfo[]
  value: string | undefined
  onValueChange?: (value: string | undefined) => void
  open: boolean
  onOpenChange?: (open: boolean) => void
  width: number
  setWidth?: (width: number) => void
}

const MicSelectorContext = React.createContext<MicSelectorContextType>({
  data: [],
  onOpenChange: undefined,
  onValueChange: undefined,
  open: false,
  setWidth: undefined,
  value: undefined,
  width: 200,
})

/** Enumerate audio inputs with optional permission for real device labels. */
function useAudioDevices() {
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [hasPermission, setHasPermission] = React.useState(false)

  const loadDevicesWithoutPermission = React.useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices) {
      setLoading(false)
      setError("Media devices are not available in this environment.")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const deviceList = await navigator.mediaDevices.enumerateDevices()
      const audioInputs = deviceList.filter(
        (device) => device.kind === "audioinput"
      )

      setDevices(audioInputs)
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Failed to get audio devices"

      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadDevicesWithPermission = React.useCallback(async () => {
    if (loading) return

    if (typeof navigator === "undefined" || !navigator.mediaDevices) {
      setError("Media devices are not available in this environment.")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const tempStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })

      for (const track of tempStream.getTracks()) {
        track.stop()
      }

      const deviceList = await navigator.mediaDevices.enumerateDevices()
      const audioInputs = deviceList.filter(
        (device) => device.kind === "audioinput"
      )

      setDevices(audioInputs)
      setHasPermission(true)
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Failed to get audio devices"

      setError(message)
    } finally {
      setLoading(false)
    }
  }, [loading])

  React.useEffect(() => {
    void loadDevicesWithoutPermission()
  }, [loadDevicesWithoutPermission])

  React.useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices) return

    const handleDeviceChange = () => {
      if (hasPermission) {
        void loadDevicesWithPermission()
      } else {
        void loadDevicesWithoutPermission()
      }
    }

    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange)

    return () => {
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        handleDeviceChange
      )
    }
  }, [hasPermission, loadDevicesWithPermission, loadDevicesWithoutPermission])

  return {
    devices,
    error,
    hasPermission,
    loadDevices: loadDevicesWithPermission,
    loading,
  }
}

export type MicSelectorProps = React.ComponentProps<typeof Popover> & {
  defaultValue?: string
  value?: string | undefined
  onValueChange?: (value: string | undefined) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function MicSelector({
  defaultValue,
  value: controlledValue,
  onValueChange: controlledOnValueChange,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  ...props
}: MicSelectorProps) {
  const [value, onValueChange] = useControllableState<string | undefined>({
    defaultProp: defaultValue,
    onChange: controlledOnValueChange,
    prop: controlledValue,
  })
  const [open, onOpenChange] = useControllableState<boolean>({
    defaultProp: defaultOpen,
    onChange: controlledOnOpenChange,
    prop: controlledOpen,
  })
  const [width, setWidth] = React.useState(200)
  const { devices, loading, hasPermission, loadDevices } = useAudioDevices()

  React.useEffect(() => {
    if (open && !hasPermission && !loading) {
      void loadDevices()
    }
  }, [open, hasPermission, loading, loadDevices])

  const contextValue = React.useMemo(
    () => ({
      data: devices,
      onOpenChange,
      onValueChange,
      open: !!open,
      setWidth,
      value,
      width,
    }),
    [devices, onOpenChange, onValueChange, open, value, width]
  )

  return (
    <MicSelectorContext.Provider value={contextValue}>
      <Popover
        data-slot="mic-selector"
        {...props}
        onOpenChange={onOpenChange}
        open={open}
      />
    </MicSelectorContext.Provider>
  )
}

export type MicSelectorTriggerProps = React.ComponentProps<typeof Button>

function MicSelectorTrigger({
  children,
  className,
  ...props
}: MicSelectorTriggerProps) {
  const { setWidth } = React.useContext(MicSelectorContext)
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = (entry.target as HTMLElement).offsetWidth
        if (newWidth) setWidth?.(newWidth)
      }
    })

    if (ref.current) resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect()
  }, [setWidth])

  return (
    <PopoverTrigger asChild>
      <Button
        ref={ref}
        data-slot="mic-selector-trigger"
        variant="outline"
        className={cn(
          "min-w-0 justify-between gap-2 overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
        <ChevronsUpDownIcon
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden
        />
      </Button>
    </PopoverTrigger>
  )
}

export type MicSelectorContentProps = React.ComponentProps<typeof Command> & {
  popoverOptions?: React.ComponentProps<typeof PopoverContent>
}

function MicSelectorContent({
  className,
  popoverOptions,
  ...props
}: MicSelectorContentProps) {
  const { width, onValueChange, value } = React.useContext(MicSelectorContext)

  return (
    <PopoverContent
      data-slot="mic-selector-content"
      {...popoverOptions}
      className={cn("p-0", className, popoverOptions?.className)}
      style={{ width, ...popoverOptions?.style }}
    >
      <Command onValueChange={onValueChange} value={value} {...props} />
    </PopoverContent>
  )
}

export type MicSelectorInputProps = React.ComponentProps<typeof CommandInput>

function MicSelectorInput(props: MicSelectorInputProps) {
  return (
    <CommandInput
      data-slot="mic-selector-input"
      placeholder="Search microphones..."
      {...props}
    />
  )
}

export type MicSelectorListProps = Omit<
  React.ComponentProps<typeof CommandList>,
  "children"
> & {
  children: (devices: MediaDeviceInfo[]) => React.ReactNode
}

function MicSelectorList({ children, ...props }: MicSelectorListProps) {
  const { data } = React.useContext(MicSelectorContext)

  return (
    <CommandList data-slot="mic-selector-list" {...props}>
      {children(data)}
    </CommandList>
  )
}

export type MicSelectorEmptyProps = React.ComponentProps<typeof CommandEmpty>

function MicSelectorEmpty({
  children = "No microphone found.",
  ...props
}: MicSelectorEmptyProps) {
  return (
    <CommandEmpty data-slot="mic-selector-empty" {...props}>
      {children}
    </CommandEmpty>
  )
}

export type MicSelectorItemProps = React.ComponentProps<typeof CommandItem>

function MicSelectorItem({
  className,
  onSelect,
  ...props
}: MicSelectorItemProps) {
  const { onValueChange, onOpenChange } = React.useContext(MicSelectorContext)

  const handleSelect = React.useCallback(
    (currentValue: string) => {
      onValueChange?.(currentValue)
      onOpenChange?.(false)
      onSelect?.(currentValue)
    },
    [onValueChange, onOpenChange, onSelect]
  )

  return (
    <CommandItem
      data-slot="mic-selector-item"
      className={cn("min-w-0 [&>svg:last-child]:hidden", className)}
      onSelect={handleSelect}
      {...props}
    />
  )
}

export type MicSelectorLabelProps = React.ComponentProps<"span"> & {
  device: MediaDeviceInfo
}

function MicSelectorLabel({
  device,
  className,
  ...props
}: MicSelectorLabelProps) {
  const matches = device.label.match(deviceIdRegex)

  if (!matches) {
    return (
      <span
        data-slot="mic-selector-label"
        className={cn("min-w-0 truncate", className)}
        {...props}
      >
        {device.label || "Microphone"}
      </span>
    )
  }

  const [, deviceId] = matches
  const name = device.label.replace(deviceIdRegex, "")

  return (
    <span
      data-slot="mic-selector-label"
      className={cn("min-w-0 truncate", className)}
      {...props}
    >
      <span>{name}</span>
      <span className="text-muted-foreground"> ({deviceId})</span>
    </span>
  )
}

export type MicSelectorValueProps = React.ComponentProps<"span">

function MicSelectorValue({ className, ...props }: MicSelectorValueProps) {
  const { data, value } = React.useContext(MicSelectorContext)
  const currentDevice = data.find((d) => d.deviceId === value)

  if (!currentDevice) {
    return (
      <span
        data-slot="mic-selector-value"
        className={cn("min-w-0 flex-1 truncate text-start", className)}
        {...props}
      >
        Select microphone...
      </span>
    )
  }

  return (
    <MicSelectorLabel
      data-slot="mic-selector-value"
      className={cn("min-w-0 flex-1 truncate text-start", className)}
      device={currentDevice}
      {...props}
    />
  )
}

export {
  MicSelector,
  MicSelectorTrigger,
  MicSelectorContent,
  MicSelectorInput,
  MicSelectorList,
  MicSelectorEmpty,
  MicSelectorItem,
  MicSelectorLabel,
  MicSelectorValue,
  useAudioDevices,
}
