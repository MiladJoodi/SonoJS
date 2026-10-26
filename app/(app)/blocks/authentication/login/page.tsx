import { BlockExample } from "@/components/blocks"
import LoginForm from "@/registry/blocks/authentication/login/login-01/login-form"
import SocialLoginForm from "@/registry/blocks/authentication/login/login-02/login-form"
import PasswordlessLoginForm from "@/registry/blocks/authentication/login/login-03/login-form"
import PhotoLoginForm from "@/registry/blocks/authentication/login/login-04/login-form"
import QuoteLoginForm from "@/registry/blocks/authentication/login/login-05/login-form"
import DarkLoginForm from "@/registry/blocks/authentication/login/login-06/login-form"
import GlassLoginForm from "@/registry/blocks/authentication/login/login-07/login-form"
import IllustrationLoginForm from "@/registry/blocks/authentication/login/login-08/login-form"
import SaasLoginForm from "@/registry/blocks/authentication/login/login-09/login-form"

const blockSource = `import LoginForm from "@/components/blocks/authentication/login-01/login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}`

const socialSource = `import LoginForm from "@/components/blocks/authentication/login-02/login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}`

const passwordlessSource = `import LoginForm from "@/components/blocks/authentication/login-03/login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}`

const photoSource = `import LoginForm from "@/components/blocks/authentication/login-04/login-form"

export default function Page() {
  return <LoginForm />
}`

const quoteSource = `import LoginForm from "@/components/blocks/authentication/login-05/login-form"

export default function Page() {
  return <LoginForm />
}`

const darkSource = `import LoginForm from "@/components/blocks/authentication/login-06/login-form"

export default function Page() {
  return <LoginForm />
}`

const glassSource = `import LoginForm from "@/components/blocks/authentication/login-07/login-form"

export default function Page() {
  return <LoginForm />
}`

const illustrationSource = `import LoginForm from "@/components/blocks/authentication/login-08/login-form"

export default function Page() {
  return <LoginForm />
}`

const saasSource = `import LoginForm from "@/components/blocks/authentication/login-09/login-form"

export default function Page() {
  return <LoginForm />
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

export default function BlockLoginDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">Login</h1>
        <p className="text-muted-foreground">
          Sign-in layouts. Each example has its own name and install command.
        </p>
      </header>

      <div className="flex flex-col gap-8">
        <BlockExample
          name="login-01"
          usage={[{ title: "app/login/page.tsx", code: blockSource }]}
        >
          <div className="flex w-full items-center justify-center bg-canvas px-10 py-10">
            <div className="w-full max-w-md">
              <LoginForm />
            </div>
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="login-02"
          usage={[{ title: "app/login/page.tsx", code: socialSource }]}
        >
          <div className="flex w-full items-center justify-center bg-canvas px-10 py-10">
            <div className="w-full max-w-md">
              <SocialLoginForm />
            </div>
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="login-03"
          usage={[{ title: "app/login/page.tsx", code: passwordlessSource }]}
        >
          <div className="flex w-full items-center justify-center bg-canvas px-10 py-10">
            <div className="w-full max-w-md">
              <PasswordlessLoginForm />
            </div>
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="login-04"
          usage={[{ title: "app/login/page.tsx", code: photoSource }]}
        >
          <PhotoLoginForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="login-05"
          usage={[{ title: "app/login/page.tsx", code: quoteSource }]}
        >
          <QuoteLoginForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="login-06"
          usage={[{ title: "app/login/page.tsx", code: darkSource }]}
        >
          <DarkLoginForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="login-07"
          usage={[{ title: "app/login/page.tsx", code: glassSource }]}
        >
          <GlassLoginForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="login-08"
          usage={[{ title: "app/login/page.tsx", code: illustrationSource }]}
        >
          <IllustrationLoginForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="login-09"
          usage={[{ title: "app/login/page.tsx", code: saasSource }]}
        >
          <SaasLoginForm />
        </BlockExample>
      </div>
    </article>
  )
}
