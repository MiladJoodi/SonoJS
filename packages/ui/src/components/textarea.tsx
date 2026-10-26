import * as React from "react"
import { cn } from "@sonojs/ui/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-[46px] w-full rounded-md border border-border/70 bg-card px-3 py-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive md:text-sm dark:bg-card",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
