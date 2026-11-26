import type { CaptchaClassNames } from "captchakit"

/** Tailwind slots aligned with SonoJS Input / Button chrome. */
export const CAPTCHA_CLASS_NAMES: CaptchaClassNames = {
  container: "gap-3",
  challenge: "",
  input:
    "h-[46px] rounded-md border border-border/70 bg-card px-3 text-sm shadow-xs outline-none focus-visible:border-ring disabled:opacity-50",
  button:
    "h-[46px] w-full cursor-pointer rounded-md bg-primary text-sm font-medium !text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  error: "text-sm text-destructive",
}