import type { ReactNode } from "react"

import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Otp01 from "@/registry/blocks/authentication/otp-verification/otp-verification-01/otp-verification-form"
import Otp02 from "@/registry/blocks/authentication/otp-verification/otp-verification-02/otp-verification-form"
import Otp03 from "@/registry/blocks/authentication/otp-verification/otp-verification-03/otp-verification-form"
import Otp04 from "@/registry/blocks/authentication/otp-verification/otp-verification-04/otp-verification-form"
import Otp05 from "@/registry/blocks/authentication/otp-verification/otp-verification-05/otp-verification-form"
import Otp06 from "@/registry/blocks/authentication/otp-verification/otp-verification-06/otp-verification-form"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/authentication/otp-verification",
  "OTP Verification",
  "Ready-to-use OTP Verification UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import OtpVerificationForm from "@/components/blocks/authentication/${name}/otp-verification-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-md">
        <OtpVerificationForm />
      </div>
    </div>
  )
}`

const usageSplit = `import OtpVerificationForm from "@/components/blocks/authentication/otp-verification-03/otp-verification-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-4xl">
        <OtpVerificationForm />
      </div>
    </div>
  )
}`

function ExampleRule() {
  return (
    <div
      role="separator"
      className="h-px w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, color-mix(in oklab, var(--foreground) 18%, transparent) 0 8px, transparent 8px 16px)",
      }}
    />
  )
}

function Center({
  children,
  className = "max-w-md",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <div className={`w-full ${className}`}>{children}</div>
    </div>
  )
}

export default function BlockOtpVerificationDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="OTP Verification"
        pathname="/blocks/authentication/otp-verification"
        description="Email, SMS, split brand, error recovery, trust-device, and onboarding-step verification flows."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="otp-verification-01"
          usage={[{ title: "app/otp/page.tsx", code: usage("otp-verification-01") }]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <Otp01 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="otp-verification-02"
          usage={[{ title: "app/otp/page.tsx", code: usage("otp-verification-02") }]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <Otp02 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="otp-verification-03"
          usage={[{ title: "app/otp/page.tsx", code: usageSplit }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Center className="max-w-4xl px-4 py-8 sm:px-6">
            <Otp03 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="otp-verification-04"
          usage={[{ title: "app/otp/page.tsx", code: usage("otp-verification-04") }]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <Otp04 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="otp-verification-05"
          usage={[{ title: "app/otp/page.tsx", code: usage("otp-verification-05") }]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <Otp05 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="otp-verification-06"
          usage={[{ title: "app/otp/page.tsx", code: usage("otp-verification-06") }]}
          previewAlign="center"
          previewClassName="bg-white dark:bg-background"
        >
          <Center>
            <Otp06 />
          </Center>
        </BlockExample>
      </div>
    </article>
  )
}
