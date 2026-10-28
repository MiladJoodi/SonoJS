import type { ReactNode } from "react"

import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Passkey01 from "@/registry/blocks/authentication/passkey/passkey-01/passkey-form"
import Passkey02 from "@/registry/blocks/authentication/passkey/passkey-02/passkey-form"
import Passkey03 from "@/registry/blocks/authentication/passkey/passkey-03/passkey-form"
import Passkey04 from "@/registry/blocks/authentication/passkey/passkey-04/passkey-form"
import Passkey05 from "@/registry/blocks/authentication/passkey/passkey-05/passkey-form"
import Passkey06 from "@/registry/blocks/authentication/passkey/passkey-06/passkey-form"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/authentication/passkey-authentication",
  "Passkey Authentication",
  "Ready-to-use Passkey Authentication UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string, maxW = "max-w-md") =>
  `import PasskeyForm from "@/components/blocks/authentication/${name}/passkey-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-6 py-10">
      <div className="w-full ${maxW}">
        <PasskeyForm />
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

export default function BlockPasskeyDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Passkey Authentication"
        pathname="/blocks/authentication/passkey-authentication"
        description="Passkey-first sign-in, conditional email, setup, manage keys, cross-device QR, and brand split."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="passkey-01"
          usage={[{ title: "app/passkey/page.tsx", code: usage("passkey-01") }]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <Passkey01 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="passkey-02"
          usage={[{ title: "app/passkey/page.tsx", code: usage("passkey-02") }]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <Passkey02 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="passkey-03"
          usage={[{ title: "app/passkey/page.tsx", code: usage("passkey-03") }]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <Passkey03 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="passkey-04"
          usage={[{ title: "app/passkey/page.tsx", code: usage("passkey-04") }]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <Passkey04 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="passkey-05"
          usage={[
            {
              title: "app/passkey/page.tsx",
              code: usage("passkey-05", "max-w-4xl"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Center className="max-w-4xl px-4 py-8 sm:px-6">
            <Passkey05 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="passkey-06"
          usage={[
            {
              title: "app/passkey/page.tsx",
              code: usage("passkey-06", "max-w-4xl"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Center className="max-w-4xl px-4 py-8 sm:px-6">
            <Passkey06 />
          </Center>
        </BlockExample>
      </div>
    </article>
  )
}
