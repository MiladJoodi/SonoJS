import { cn } from "@/lib/utils"

export function NovaLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={cn("size-4", className)}
    >
      <rect width="16" height="16" rx="4" className="fill-foreground/90" />
      <path
        d="M4.2 11.2 8 3.8l3.8 7.4H9.9L8 7.4 6.1 11.2H4.2Z"
        className="fill-background"
      />
    </svg>
  )
}

export function AtlasLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={cn("size-4", className)}
    >
      <rect width="16" height="16" rx="4" className="fill-foreground/90" />
      <circle
        cx="8"
        cy="8"
        r="3.2"
        className="fill-none stroke-background"
        strokeWidth="1.6"
      />
      <path
        d="M8 4.8v6.4M5.2 8h5.6"
        className="stroke-background"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

const logos = {
  nova: NovaLogo,
  atlas: AtlasLogo,
} as const

export function ModelLogo({
  vendor,
  className,
}: {
  vendor: string
  className?: string
}) {
  const Icon = logos[vendor as keyof typeof logos] ?? NovaLogo
  return <Icon className={className} />
}
