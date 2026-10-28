import type { ReactNode } from "react"

import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import AccountRecovery01 from "@/registry/blocks/authentication/account-recovery/account-recovery-01/account-recovery-form"
import AccountRecovery02 from "@/registry/blocks/authentication/account-recovery/account-recovery-02/account-recovery-form"
import AccountRecovery03 from "@/registry/blocks/authentication/account-recovery/account-recovery-03/account-recovery-form"
import AccountRecovery04 from "@/registry/blocks/authentication/account-recovery/account-recovery-04/account-recovery-form"
import AccountRecovery05 from "@/registry/blocks/authentication/account-recovery/account-recovery-05/account-recovery-form"
import AccountRecovery06 from "@/registry/blocks/authentication/account-recovery/account-recovery-06/account-recovery-form"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/authentication/account-recovery",
  "Account Recovery",
  "Ready-to-use Account Recovery UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string, maxW = "max-w-md") =>
  `import AccountRecoveryForm from "@/components/blocks/authentication/${name}/account-recovery-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-6 py-10">
      <div className="w-full ${maxW}">
        <AccountRecoveryForm />
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

export default function BlockAccountRecoveryDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Account Recovery"
        pathname="/blocks/authentication/account-recovery"
        description="Email request, phone, check inbox, backup codes, method chooser, and brand-split locked recovery."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="account-recovery-01"
          usage={[
            { title: "app/recovery/page.tsx", code: usage("account-recovery-01") },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <AccountRecovery01 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="account-recovery-02"
          usage={[
            { title: "app/recovery/page.tsx", code: usage("account-recovery-02") },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <AccountRecovery02 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="account-recovery-03"
          usage={[
            { title: "app/recovery/page.tsx", code: usage("account-recovery-03") },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <AccountRecovery03 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="account-recovery-04"
          usage={[
            { title: "app/recovery/page.tsx", code: usage("account-recovery-04") },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <AccountRecovery04 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="account-recovery-05"
          usage={[
            { title: "app/recovery/page.tsx", code: usage("account-recovery-05") },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <AccountRecovery05 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="account-recovery-06"
          usage={[
            {
              title: "app/recovery/page.tsx",
              code: usage("account-recovery-06", "max-w-4xl"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Center className="max-w-4xl px-4 py-8 sm:px-6">
            <AccountRecovery06 />
          </Center>
        </BlockExample>
      </div>
    </article>
  )
}
