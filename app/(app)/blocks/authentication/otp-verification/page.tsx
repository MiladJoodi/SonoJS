import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import DigitsOtpForm from "@/registry/blocks/authentication/otp-verification/otp-verification-01/otp-verification-form"
import AutoFocusOtpForm from "@/registry/blocks/authentication/otp-verification/otp-verification-02/otp-verification-form"
import EmailOtpForm from "@/registry/blocks/authentication/otp-verification/otp-verification-03/otp-verification-form"
import PhoneOtpForm from "@/registry/blocks/authentication/otp-verification/otp-verification-04/otp-verification-form"

const digitsSource = `import OtpVerificationForm from "@/components/blocks/authentication/otp-verification-01/otp-verification-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <OtpVerificationForm />
      </div>
    </div>
  )
}`

const autoFocusSource = `import OtpVerificationForm from "@/components/blocks/authentication/otp-verification-02/otp-verification-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <OtpVerificationForm />
      </div>
    </div>
  )
}`

const emailSource = `import OtpVerificationForm from "@/components/blocks/authentication/otp-verification-03/otp-verification-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <OtpVerificationForm />
      </div>
    </div>
  )
}`

const phoneSource = `import OtpVerificationForm from "@/components/blocks/authentication/otp-verification-04/otp-verification-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <OtpVerificationForm />
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

export default function BlockOtpVerificationDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="OTP Verification"
        pathname="/blocks/authentication/otp-verification"
        description="One-time code layouts. Each example has its own name and install command."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="otp-verification-01"
          usage={[{ title: "app/otp/page.tsx", code: digitsSource }]}
        >
          <Center>
            <DigitsOtpForm />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="otp-verification-02"
          usage={[{ title: "app/otp/page.tsx", code: autoFocusSource }]}
        >
          <Center>
            <AutoFocusOtpForm />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="otp-verification-03"
          usage={[{ title: "app/otp/page.tsx", code: emailSource }]}
        >
          <Center>
            <EmailOtpForm />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="otp-verification-04"
          usage={[{ title: "app/otp/page.tsx", code: phoneSource }]}
        >
          <Center>
            <PhoneOtpForm />
          </Center>
        </BlockExample>
      </div>
    </article>
  )
}
