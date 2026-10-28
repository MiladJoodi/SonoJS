import type { ReactNode } from "react"

import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import TwoFactor01 from "@/registry/blocks/authentication/two-factor/two-factor-01/two-factor-form"
import TwoFactor02 from "@/registry/blocks/authentication/two-factor/two-factor-02/two-factor-form"
import TwoFactor03 from "@/registry/blocks/authentication/two-factor/two-factor-03/two-factor-form"
import TwoFactor04 from "@/registry/blocks/authentication/two-factor/two-factor-04/two-factor-form"
import TwoFactor05 from "@/registry/blocks/authentication/two-factor/two-factor-05/two-factor-form"
import TwoFactor06 from "@/registry/blocks/authentication/two-factor/two-factor-06/two-factor-form"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/authentication/two-factor-authentication",
  "Two Factor Authentication",
  "Ready-to-use Two Factor Authentication UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string, maxW = "max-w-md") =>
  `import TwoFactorForm from "@/components/blocks/authentication/${name}/two-factor-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-6 py-10">
      <div className="w-full ${maxW}">
        <TwoFactorForm />
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

export default function BlockTwoFactorDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Two-Factor Authentication"
        pathname="/blocks/authentication/two-factor-authentication"
        description="Authenticator, SMS, backup codes, method chooser, passkey factor, and new-device approval."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="two-factor-01"
          usage={[
            {
              title: "app/two-factor/page.tsx",
              code: usage("two-factor-01"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <TwoFactor01 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="two-factor-02"
          usage={[
            {
              title: "app/two-factor/page.tsx",
              code: usage("two-factor-02"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <TwoFactor02 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="two-factor-03"
          usage={[
            {
              title: "app/two-factor/page.tsx",
              code: usage("two-factor-03"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <TwoFactor03 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="two-factor-04"
          usage={[
            {
              title: "app/two-factor/page.tsx",
              code: usage("two-factor-04", "max-w-lg"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center className="max-w-lg">
            <TwoFactor04 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="two-factor-05"
          usage={[
            {
              title: "app/two-factor/page.tsx",
              code: usage("two-factor-05"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <TwoFactor05 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="two-factor-06"
          usage={[
            {
              title: "app/two-factor/page.tsx",
              code: usage("two-factor-06", "max-w-4xl"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Center className="max-w-4xl px-4 py-8 sm:px-6">
            <TwoFactor06 />
          </Center>
        </BlockExample>
      </div>
    </article>
  )
}
