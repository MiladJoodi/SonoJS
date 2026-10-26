import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import MinimalResetPasswordForm from "@/registry/blocks/authentication/reset-password/reset-password-01/reset-password-form"
import StrengthResetPasswordForm from "@/registry/blocks/authentication/reset-password/reset-password-02/reset-password-form"
import SplitResetPasswordForm from "@/registry/blocks/authentication/reset-password/reset-password-03/reset-password-form"
import SuccessResetPasswordForm from "@/registry/blocks/authentication/reset-password/reset-password-04/reset-password-form"

const minimalSource = `import ResetPasswordForm from "@/components/blocks/authentication/reset-password-01/reset-password-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <ResetPasswordForm />
      </div>
    </div>
  )
}`

const strengthSource = `import ResetPasswordForm from "@/components/blocks/authentication/reset-password-02/reset-password-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <ResetPasswordForm />
      </div>
    </div>
  )
}`

const splitSource = `import ResetPasswordForm from "@/components/blocks/authentication/reset-password-03/reset-password-form"

export default function Page() {
  return <ResetPasswordForm />
}`

const successSource = `import ResetPasswordForm from "@/components/blocks/authentication/reset-password-04/reset-password-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <ResetPasswordForm />
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

export default function BlockResetPasswordDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Reset Password"
        pathname="/blocks/authentication/reset-password"
        description="Password reset layouts. Each example has its own name and install command."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="reset-password-01"
          usage={[{ title: "app/reset-password/page.tsx", code: minimalSource }]}
        >
          <div className="flex w-full items-center justify-center bg-canvas px-10 py-10">
            <div className="w-full max-w-md">
              <MinimalResetPasswordForm />
            </div>
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="reset-password-02"
          usage={[
            { title: "app/reset-password/page.tsx", code: strengthSource },
          ]}
        >
          <div className="flex w-full items-center justify-center bg-canvas px-10 py-10">
            <div className="w-full max-w-md">
              <StrengthResetPasswordForm />
            </div>
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="reset-password-03"
          usage={[{ title: "app/reset-password/page.tsx", code: splitSource }]}
        >
          <SplitResetPasswordForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="reset-password-04"
          usage={[{ title: "app/reset-password/page.tsx", code: successSource }]}
        >
          <div className="flex w-full items-center justify-center bg-canvas px-10 py-10">
            <div className="w-full max-w-md">
              <SuccessResetPasswordForm />
            </div>
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
