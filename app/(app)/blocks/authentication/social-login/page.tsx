import { BlockExample } from "@/components/blocks"
import SocialOnlyForm from "@/registry/blocks/authentication/social-login/social-login-01/social-login-form"
import SocialEmailForm from "@/registry/blocks/authentication/social-login/social-login-02/social-login-form"
import SocialIconsForm from "@/registry/blocks/authentication/social-login/social-login-03/social-login-form"
import SocialSplitForm from "@/registry/blocks/authentication/social-login/social-login-04/social-login-form"

const onlySource = `import SocialLoginForm from "@/components/blocks/authentication/social-login-01/social-login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <SocialLoginForm />
      </div>
    </div>
  )
}`

const emailSource = `import SocialLoginForm from "@/components/blocks/authentication/social-login-02/social-login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <SocialLoginForm />
      </div>
    </div>
  )
}`

const iconsSource = `import SocialLoginForm from "@/components/blocks/authentication/social-login-03/social-login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <SocialLoginForm />
      </div>
    </div>
  )
}`

const splitSource = `import SocialLoginForm from "@/components/blocks/authentication/social-login-04/social-login-form"

export default function Page() {
  return <SocialLoginForm />
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

export default function BlockSocialLoginDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">Social Login</h1>
        <p className="text-muted-foreground">
          Social sign-in layouts. Each example has its own name and install
          command.
        </p>
      </header>

      <div className="flex flex-col gap-8">
        <BlockExample
          name="social-login-01"
          usage={[{ title: "app/login/page.tsx", code: onlySource }]}
        >
          <Center>
            <SocialOnlyForm />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="social-login-02"
          usage={[{ title: "app/login/page.tsx", code: emailSource }]}
        >
          <Center>
            <SocialEmailForm />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="social-login-03"
          usage={[{ title: "app/login/page.tsx", code: iconsSource }]}
        >
          <Center>
            <SocialIconsForm />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="social-login-04"
          usage={[{ title: "app/login/page.tsx", code: splitSource }]}
        >
          <SocialSplitForm />
        </BlockExample>
      </div>
    </article>
  )
}
