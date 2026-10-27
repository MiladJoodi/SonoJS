import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import AuthenticatorTwoFactorForm from "@/registry/blocks/authentication/two-factor/two-factor-01/two-factor-form"
import SmsTwoFactorForm from "@/registry/blocks/authentication/two-factor/two-factor-02/two-factor-form"
import BackupTwoFactorForm from "@/registry/blocks/authentication/two-factor/two-factor-03/two-factor-form"
import ChooseTwoFactorForm from "@/registry/blocks/authentication/two-factor/two-factor-04/two-factor-form"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/authentication/two-factor-authentication", "Two Factor Authentication", "Ready-to-use Two Factor Authentication UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const authenticatorSource = `import TwoFactorForm from "@/components/blocks/authentication/two-factor-01/two-factor-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <TwoFactorForm />
      </div>
    </div>
  )
}`

const smsSource = `import TwoFactorForm from "@/components/blocks/authentication/two-factor-02/two-factor-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <TwoFactorForm />
      </div>
    </div>
  )
}`

const backupSource = `import TwoFactorForm from "@/components/blocks/authentication/two-factor-03/two-factor-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <TwoFactorForm />
      </div>
    </div>
  )
}`

const chooseSource = `import TwoFactorForm from "@/components/blocks/authentication/two-factor-04/two-factor-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
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

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center bg-canvas px-10 py-10">
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}

export default function BlockTwoFactorDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Two-Factor Authentication"
        pathname="/blocks/authentication/two-factor-authentication"
        description="2FA challenge layouts. Each example has its own name and install command."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="two-factor-01"
          usage={[{ title: "app/two-factor/page.tsx", code: authenticatorSource }]}
        >
          <Center>
            <AuthenticatorTwoFactorForm />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="two-factor-02"
          usage={[{ title: "app/two-factor/page.tsx", code: smsSource }]}
        >
          <Center>
            <SmsTwoFactorForm />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="two-factor-03"
          usage={[{ title: "app/two-factor/page.tsx", code: backupSource }]}
        >
          <Center>
            <BackupTwoFactorForm />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="two-factor-04"
          usage={[{ title: "app/two-factor/page.tsx", code: chooseSource }]}
        >
          <Center>
            <ChooseTwoFactorForm />
          </Center>
        </BlockExample>
      </div>
    </article>
  )
}
