import type { Metadata } from "next"
import { Suspense } from "react"

import {
  CaptchaDemo,
  CaptchaGuide,
  CaptchaScrollShell,
} from "@/components/tools/captcha"
import { noindexMetadata } from "@/lib/seo"

export const metadata: Metadata = noindexMetadata({
  title: "Captcha",
  description:
    "Try CaptchaKit — self-hosted CAPTCHA for React and Next.js with server-signed tokens.",
  path: "/tools/captcha",
})

export default function CaptchaToolPage() {
  return (
    <CaptchaScrollShell>
      <CaptchaDemo />
      <Suspense
        fallback={
          <div className="py-12 text-center text-sm text-muted-foreground">
            Loading guide…
          </div>
        }
      >
        <CaptchaGuide />
      </Suspense>
    </CaptchaScrollShell>
  )
}