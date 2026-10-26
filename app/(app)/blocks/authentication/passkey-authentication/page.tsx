import { BlockExample } from "@/components/blocks"
import PasskeyFirstForm from "@/registry/blocks/authentication/passkey/passkey-01/passkey-form"
import PasskeyPasswordForm from "@/registry/blocks/authentication/passkey/passkey-02/passkey-form"
import PasskeySetupForm from "@/registry/blocks/authentication/passkey/passkey-03/passkey-form"

const firstSource = `import PasskeyForm from "@/components/blocks/authentication/passkey-01/passkey-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <PasskeyForm />
      </div>
    </div>
  )
}`

const passwordSource = `import PasskeyForm from "@/components/blocks/authentication/passkey-02/passkey-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <PasskeyForm />
      </div>
    </div>
  )
}`

const setupSource = `import PasskeyForm from "@/components/blocks/authentication/passkey-03/passkey-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
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

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center bg-canvas px-10 py-10">
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}

export default function BlockPasskeyDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">Passkey Authentication</h1>
        <p className="text-muted-foreground">
          Passkey sign-in and setup layouts. Each example has its own name and
          install command.
        </p>
      </header>

      <div className="flex flex-col gap-8">
        <BlockExample
          name="passkey-01"
          usage={[{ title: "app/passkey/page.tsx", code: firstSource }]}
        >
          <Center>
            <PasskeyFirstForm />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="passkey-02"
          usage={[{ title: "app/passkey/page.tsx", code: passwordSource }]}
        >
          <Center>
            <PasskeyPasswordForm />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="passkey-03"
          usage={[{ title: "app/passkey/page.tsx", code: setupSource }]}
        >
          <Center>
            <PasskeySetupForm />
          </Center>
        </BlockExample>
      </div>
    </article>
  )
}
