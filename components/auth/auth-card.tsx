import { cn } from "@/lib/utils"

export type AuthFormLayout = "card" | "plain"

type AuthCardProps = React.ComponentProps<"div"> & {
  /** `card` = page surface; `plain` = inside Dialog (no second card chrome). */
  layout?: AuthFormLayout
}

/** Shared elevated auth surface — same chrome as login-01. */
export function AuthCard({
  className,
  children,
  layout = "card",
  style,
  ...props
}: AuthCardProps) {
  const isCard = layout === "card"

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-6 sm:gap-8",
        isCard &&
          "[--login-card-padding:1.25rem] sm:[--login-card-padding:1.5rem] md:[--login-card-padding:2rem] max-w-md rounded-[12px] border border-border/70 bg-card p-(--login-card-padding) shadow-soft",
        className
      )}
      style={
        isCard
          ? {
              backgroundColor: "var(--card, #ffffff)",
              boxShadow:
                "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              ...style,
            }
          : style
      }
      {...props}
    >
      {children}
    </div>
  )
}

export type AuthFormProps = {
  layout?: AuthFormLayout
  /** When set, footer switches mode in-place (dialog) instead of routing. */
  onSwitchMode?: () => void
  /** After a successful session (e.g. close dialog). */
  onSuccess?: () => void
  /** Switch to forgot-password mode in the dialog (else route to `/forgot-password`). */
  onForgotPassword?: () => void
  /** Return to sign-in from forgot-password (dialog). */
  onBackToSignIn?: () => void
}

export function AuthCardHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <header className="flex flex-col items-start gap-3">
      <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
      <div className="space-y-1.5">
        <h1 className="text-h3 text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </header>
  )
}

export function AuthPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-canvas px-4 py-10">
      {children}
    </div>
  )
}

export function AuthFieldError({ message }: { message?: string | null }) {
  if (!message) return null
  return <p className="text-sm text-destructive">{message}</p>
}
