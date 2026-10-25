import { BlockExample } from "@/components/blocks"
import LoginForm from "@/registry/blocks/authentication/login-01/components/login-form"
import SocialLoginForm from "@/registry/blocks/authentication/login-02/components/login-form"
import PasswordlessLoginForm from "@/registry/blocks/authentication/login-03/components/login-form"

const blockSource = `import LoginForm from "@/blocks/login-01/components/login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}`

const socialSource = `import LoginForm from "@/blocks/login-02/components/login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}`

const passwordlessSource = `import LoginForm from "@/blocks/login-03/components/login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}`

export default function BlockLoginDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">Login</h1>
        <p className="text-muted-foreground">
          Sign-in layouts. Each example has its own name and install command.
        </p>
      </header>

      <BlockExample
        name="login-01"
        title="Minimal Login"
        usage={[{ title: "app/login/page.tsx", code: blockSource }]}
      >
        <div className="flex w-full items-center justify-center bg-background px-6 py-10">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </BlockExample>

      <BlockExample
        name="login-02"
        title="Social Login"
        usage={[{ title: "app/login/page.tsx", code: socialSource }]}
      >
        <div className="flex w-full items-center justify-center bg-background px-6 py-10">
          <div className="w-full max-w-sm">
            <SocialLoginForm />
          </div>
        </div>
      </BlockExample>

      <BlockExample
        name="login-03"
        title="Passwordless Login"
        usage={[{ title: "app/login/page.tsx", code: passwordlessSource }]}
      >
        <div className="flex w-full items-center justify-center bg-background px-6 py-10">
          <div className="w-full max-w-sm">
            <PasswordlessLoginForm />
          </div>
        </div>
      </BlockExample>
    </article>
  )
}
