import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import MinimalForgotPasswordForm from "@/registry/blocks/authentication/forgot-password/forgot-password-01/forgot-password-form"
import SplitForgotPasswordForm from "@/registry/blocks/authentication/forgot-password/forgot-password-02/forgot-password-form"
import OtpForgotPasswordForm from "@/registry/blocks/authentication/forgot-password/forgot-password-03/forgot-password-form"
import MultiStepForgotPasswordForm from "@/registry/blocks/authentication/forgot-password/forgot-password-04/forgot-password-form"

const minimalSource = `import ForgotPasswordForm from "@/components/blocks/authentication/forgot-password-01/forgot-password-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}`

const splitSource = `import ForgotPasswordForm from "@/components/blocks/authentication/forgot-password-02/forgot-password-form"

export default function Page() {
  return <ForgotPasswordForm />
}`

const otpSource = `import ForgotPasswordForm from "@/components/blocks/authentication/forgot-password-03/forgot-password-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}`

const multiStepSource = `import ForgotPasswordForm from "@/components/blocks/authentication/forgot-password-04/forgot-password-form"

export default function Page() {
  return <ForgotPasswordForm />
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

export default function BlockForgotPasswordDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Forgot Password"
        pathname="/blocks/authentication/forgot-password"
        description="Password recovery layouts. Each example has its own name and install command."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="forgot-password-01"
          usage={[{ title: "app/forgot-password/page.tsx", code: minimalSource }]}
        >
          <div className="flex w-full items-center justify-center bg-canvas px-10 py-10">
            <div className="w-full max-w-md">
              <MinimalForgotPasswordForm />
            </div>
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="forgot-password-02"
          usage={[{ title: "app/forgot-password/page.tsx", code: splitSource }]}
        >
          <SplitForgotPasswordForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="forgot-password-03"
          usage={[{ title: "app/forgot-password/page.tsx", code: otpSource }]}
        >
          <div className="flex w-full items-center justify-center bg-canvas px-10 py-10">
            <div className="w-full max-w-md">
              <OtpForgotPasswordForm />
            </div>
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="forgot-password-04"
          usage={[
            { title: "app/forgot-password/page.tsx", code: multiStepSource },
          ]}
        >
          <MultiStepForgotPasswordForm />
        </BlockExample>
      </div>
    </article>
  )
}
