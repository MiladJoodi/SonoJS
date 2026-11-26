import type { ReactNode } from "react"

import "./styles/captcha-tool.css"

export function CaptchaScrollShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-canvas">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1200px] space-y-10 px-4 pt-6 pb-16 sm:px-6 sm:pt-8 sm:pb-20">
          {children}
        </div>
      </div>
    </div>
  )
}