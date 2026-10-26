import { BlockExample } from "@/components/blocks"
import EmailRecoveryForm from "@/registry/blocks/authentication/account-recovery/account-recovery-01/account-recovery-form"
import PhoneRecoveryForm from "@/registry/blocks/authentication/account-recovery/account-recovery-02/account-recovery-form"
import IdentityRecoveryForm from "@/registry/blocks/authentication/account-recovery/account-recovery-03/account-recovery-form"
import CodesRecoveryForm from "@/registry/blocks/authentication/account-recovery/account-recovery-04/account-recovery-form"

const emailSource = `import AccountRecoveryForm from "@/components/blocks/authentication/account-recovery-01/account-recovery-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <AccountRecoveryForm />
      </div>
    </div>
  )
}`

const phoneSource = `import AccountRecoveryForm from "@/components/blocks/authentication/account-recovery-02/account-recovery-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <AccountRecoveryForm />
      </div>
    </div>
  )
}`

const identitySource = `import AccountRecoveryForm from "@/components/blocks/authentication/account-recovery-03/account-recovery-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <AccountRecoveryForm />
      </div>
    </div>
  )
}`

const codesSource = `import AccountRecoveryForm from "@/components/blocks/authentication/account-recovery-04/account-recovery-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
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

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center bg-canvas px-10 py-10">
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}

export default function BlockAccountRecoveryDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">Account Recovery</h1>
        <p className="text-muted-foreground">
          Account recovery layouts. Each example has its own name and install
          command.
        </p>
      </header>

      <div className="flex flex-col gap-8">
        <BlockExample
          name="account-recovery-01"
          usage={[{ title: "app/recovery/page.tsx", code: emailSource }]}
        >
          <Center>
            <EmailRecoveryForm />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="account-recovery-02"
          usage={[{ title: "app/recovery/page.tsx", code: phoneSource }]}
        >
          <Center>
            <PhoneRecoveryForm />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="account-recovery-03"
          usage={[{ title: "app/recovery/page.tsx", code: identitySource }]}
        >
          <Center>
            <IdentityRecoveryForm />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="account-recovery-04"
          usage={[{ title: "app/recovery/page.tsx", code: codesSource }]}
        >
          <Center>
            <CodesRecoveryForm />
          </Center>
        </BlockExample>
      </div>
    </article>
  )
}
