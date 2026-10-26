import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import LoginForm from "@/registry/blocks/authentication/login/login-01/login-form"
import SocialLoginForm from "@/registry/blocks/authentication/login/login-02/login-form"
import PasswordlessLoginForm from "@/registry/blocks/authentication/login/login-03/login-form"
import PhotoLoginForm from "@/registry/blocks/authentication/login/login-04/login-form"
import QuoteLoginForm from "@/registry/blocks/authentication/login/login-05/login-form"
import DarkLoginForm from "@/registry/blocks/authentication/login/login-06/login-form"
import GlassLoginForm from "@/registry/blocks/authentication/login/login-07/login-form"
import IllustrationLoginForm from "@/registry/blocks/authentication/login/login-08/login-form"
import SaasLoginForm from "@/registry/blocks/authentication/login/login-09/login-form"
import BrandMarkLoginForm from "@/registry/blocks/authentication/login/login-10/login-form"
import SplitIllustrationLoginForm from "@/registry/blocks/authentication/login/login-11/login-form"
import WelcomeBackLoginForm from "@/registry/blocks/authentication/login/login-12/login-form"
import SplitPhotoLoginForm from "@/registry/blocks/authentication/login/login-13/login-form"
import WelcomePhotoLoginForm from "@/registry/blocks/authentication/login/login-14/login-form"
import IllustratedBrandLoginForm from "@/registry/blocks/authentication/login/login-15/login-form"
import GradientAccessLoginForm from "@/registry/blocks/authentication/login/login-16/login-form"

const blockSource = `import LoginForm from "@/components/blocks/authentication/login-01/login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-3 py-6 sm:px-4 md:px-10 md:py-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}`

const socialSource = `import LoginForm from "@/components/blocks/authentication/login-02/login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-3 py-6 sm:px-4 md:px-10 md:py-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}`

const passwordlessSource = `import LoginForm from "@/components/blocks/authentication/login-03/login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-3 py-6 sm:px-4 md:px-10 md:py-10">
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

const brandMarkSource = `import LoginForm from "@/components/blocks/authentication/login-10/login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-3 py-6 sm:px-4 md:px-10 md:py-10">
      <LoginForm />
    </div>
  )
}`

const splitIllustrationSource = `import LoginForm from "@/components/blocks/authentication/login-11/login-form"

export default function Page() {
  return <LoginForm />
}`

const welcomeBackSource = `import LoginForm from "@/components/blocks/authentication/login-12/login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-3 py-6 sm:px-4 md:px-10 md:py-10">
      <LoginForm />
    </div>
  )
}`

const splitPhotoSource = `import LoginForm from "@/components/blocks/authentication/login-13/login-form"

export default function Page() {
  return <LoginForm />
}`

const welcomePhotoSource = `import LoginForm from "@/components/blocks/authentication/login-14/login-form"

export default function Page() {
  return <LoginForm />
}`

const illustratedBrandSource = `import LoginForm from "@/components/blocks/authentication/login-15/login-form"

export default function Page() {
  return <LoginForm />
}`

const gradientAccessSource = `import LoginForm from "@/components/blocks/authentication/login-16/login-form"

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
      <BlocksPageHeader
        title="Login"
        pathname="/blocks/authentication/login"
        description="Sign-in layouts. Each example has its own name and install command."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="login-01"
          usage={[{ title: "app/login/page.tsx", code: blockSource }]}
        >
          <div className="flex w-full items-center justify-center bg-canvas px-3 py-6 sm:px-4 md:px-10 md:py-10">
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
          <div className="flex w-full items-center justify-center bg-canvas px-3 py-6 sm:px-4 md:px-10 md:py-10">
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
          <div className="flex w-full items-center justify-center bg-canvas px-3 py-6 sm:px-4 md:px-10 md:py-10">
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

        <ExampleRule />

        <BlockExample
          name="login-10"
          usage={[{ title: "app/login/page.tsx", code: brandMarkSource }]}
        >
          <div className="flex w-full items-center justify-center bg-canvas px-3 py-6 sm:px-4 md:px-10 md:py-10">
            <BrandMarkLoginForm />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="login-11"
          usage={[
            { title: "app/login/page.tsx", code: splitIllustrationSource },
          ]}
        >
          <SplitIllustrationLoginForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="login-12"
          usage={[{ title: "app/login/page.tsx", code: welcomeBackSource }]}
        >
          <div className="flex w-full items-center justify-center bg-canvas px-3 py-6 sm:px-4 md:px-10 md:py-10">
            <WelcomeBackLoginForm />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="login-13"
          usage={[{ title: "app/login/page.tsx", code: splitPhotoSource }]}
        >
          <SplitPhotoLoginForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="login-14"
          usage={[{ title: "app/login/page.tsx", code: welcomePhotoSource }]}
        >
          <WelcomePhotoLoginForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="login-15"
          usage={[
            { title: "app/login/page.tsx", code: illustratedBrandSource },
          ]}
        >
          <IllustratedBrandLoginForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="login-16"
          usage={[{ title: "app/login/page.tsx", code: gradientAccessSource }]}
        >
          <GradientAccessLoginForm />
        </BlockExample>
      </div>
    </article>
  )
}
