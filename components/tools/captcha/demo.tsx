"use client"

import * as React from "react"
import {
  Captcha,
  type CaptchaErrorCode,
  type CaptchaType,
  type Difficulty,
  type Theme,
} from "captchakit"
import "captchakit/styles.css"
import { useTheme } from "next-themes"
import { CheckIcon } from "lucide-react"

import { CopyButton } from "@/components/docs/copy-button"
import { SoftButton, SoftGroup } from "@/components/docs/soft-toolbar"
import { cn } from "@/lib/utils"

import { CAPTCHA_CLASS_NAMES } from "./lib/class-names"
import "./styles/captcha-tool.css"

const CAPTCHA_TYPES: { value: CaptchaType; label: string }[] = [
  { value: "math", label: "Math" },
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "image", label: "Image" },
]

const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
]

export function CaptchaDemo() {
  const { resolvedTheme } = useTheme()
  const [type, setType] = React.useState<CaptchaType>("math")
  const [difficulty, setDifficulty] = React.useState<Difficulty>("medium")
  const [proofToken, setProofToken] = React.useState<string | null>(null)
  const [errorCode, setErrorCode] = React.useState<CaptchaErrorCode | null>(null)

  const captchaTheme: Theme =
    resolvedTheme === "dark" ? "dark" : "light"

  const captchaKey = `${type}-${difficulty}-${captchaTheme}`

  React.useEffect(() => {
    setProofToken(null)
    setErrorCode(null)
  }, [captchaKey])

  return (
    <>
      <header className="space-y-2">
        <h1 className="text-h3 tracking-tight text-foreground">Captcha</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Self-hosted CAPTCHA for React and Next.js — server-signed challenges,
          no Redis or third-party provider. Try the live widget below, then
          follow the install steps at the bottom of the page. Package:{" "}
          <a
            href="https://www.npmjs.com/package/captchakit"
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="font-medium text-foreground underline underline-offset-3 hover:text-primary"
          >
            captchakit
          </a>
          {" · "}
          <a
            href="https://github.com/MiladJoodi/CaptchaKit"
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="font-medium text-foreground underline underline-offset-3 hover:text-primary"
          >
            GitHub
          </a>
        </p>
      </header>

      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6">
        <fieldset className="flex w-full flex-col items-center gap-2 border-0 p-0">
          <legend className="text-sm font-medium text-foreground">Type</legend>
          <SoftGroup
            label="Captcha type"
            className="h-10 w-full max-w-md border-border/70 bg-card"
          >
            {CAPTCHA_TYPES.map((opt) => (
              <SoftButton
                key={opt.value}
                label={opt.label}
                pressed={type === opt.value}
                onClick={() => setType(opt.value)}
                className="h-full min-w-0 flex-1 px-2 text-sm sm:px-3"
              >
                {opt.label}
              </SoftButton>
            ))}
          </SoftGroup>
        </fieldset>

        <fieldset className="flex w-full flex-col items-center gap-2 border-0 p-0">
          <legend className="text-sm font-medium text-foreground">
            Difficulty
          </legend>
          <SoftGroup
            label="Difficulty"
            className="h-10 w-full max-w-md border-border/70 bg-card"
          >
            {DIFFICULTIES.map((opt) => (
              <SoftButton
                key={opt.value}
                label={opt.label}
                pressed={difficulty === opt.value}
                onClick={() => setDifficulty(opt.value)}
                className="h-full min-w-0 flex-1 px-2 text-sm sm:px-3"
              >
                {opt.label}
              </SoftButton>
            ))}
          </SoftGroup>
        </fieldset>
      </div>

      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4">
        <div
          className={cn(
            "captcha-tool-widget w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft"
          )}
        >
          <Captcha
            key={captchaKey}
            type={type}
            locale="en"
            difficulty={difficulty}
            theme={captchaTheme}
            endpoint="/api/captcha"
            classNames={CAPTCHA_CLASS_NAMES}
            onVerify={(token) => {
              setProofToken(token)
              setErrorCode(null)
            }}
            onError={(code) => {
              setErrorCode(code)
              setProofToken(null)
            }}
          />
        </div>

        {proofToken ? (
          <div
            className="flex w-full max-w-md flex-col gap-2 rounded-[12px] border border-border/70 bg-card p-4 text-sm shadow-soft"
            role="status"
          >
            <p className="flex items-center gap-2 font-medium text-foreground">
              <CheckIcon
                className="size-4 text-emerald-600 dark:text-emerald-400"
                aria-hidden
              />
              Verified — proof token
            </p>
            <div className="flex items-start gap-2">
              <code className="min-w-0 flex-1 break-all rounded-md border border-border/70 bg-muted/40 px-2 py-1.5 font-mono text-xs text-foreground">
                {proofToken}
              </code>
              <CopyButton value={proofToken} />
            </div>
          </div>
        ) : null}

        {errorCode ? (
          <p className="text-sm text-destructive" role="alert">
            {errorCode.replaceAll("_", " ").toLowerCase()}
          </p>
        ) : null}
      </div>
    </>
  )
}