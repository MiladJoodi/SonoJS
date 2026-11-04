import { Fragment } from "react"

import {
  LoginDemoLazy,
  type LoginDemoLayout,
} from "@/app/(app)/blocks/authentication/login/login-demo-lazy"
import type { LoginDemoId } from "@/app/(app)/blocks/authentication/login/login-demo-loaders"
import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import { blocksPageMetadata } from "@/lib/seo"
import LoginForm from "@/registry/blocks/authentication/login/login-01/login-form"

export const metadata = blocksPageMetadata(
  "/blocks/authentication/login",
  "Login",
  "Ready-to-use Login UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

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

type LoginExample = {
  name: LoginDemoId
  code: string
  layout: LoginDemoLayout
  /** Above-the-fold: static SSR + hydrate immediately. */
  eager?: boolean
}

const examples: LoginExample[] = [
  { name: "login-01", code: blockSource, layout: "card", eager: true },
  { name: "login-02", code: socialSource, layout: "card" },
  { name: "login-03", code: passwordlessSource, layout: "card" },
  { name: "login-04", code: photoSource, layout: "full" },
  { name: "login-05", code: quoteSource, layout: "full" },
  { name: "login-06", code: darkSource, layout: "full" },
  { name: "login-07", code: glassSource, layout: "full" },
  { name: "login-08", code: illustrationSource, layout: "full" },
  { name: "login-09", code: saasSource, layout: "full" },
  { name: "login-10", code: brandMarkSource, layout: "canvas" },
  { name: "login-11", code: splitIllustrationSource, layout: "full" },
  { name: "login-12", code: welcomeBackSource, layout: "canvas" },
  { name: "login-13", code: splitPhotoSource, layout: "full" },
  { name: "login-14", code: welcomePhotoSource, layout: "full" },
  { name: "login-15", code: illustratedBrandSource, layout: "full" },
  { name: "login-16", code: gradientAccessSource, layout: "full" },
]

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

function LoginExamplePreview({ example }: { example: LoginExample }) {
  // login-01: static import for SSR of the first demo + immediate hydrate.
  if (example.eager && example.name === "login-01") {
    return (
      <div className="flex w-full items-center justify-center bg-canvas px-3 py-6 sm:px-4 md:px-10 md:py-10">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    )
  }

  return (
    <LoginDemoLazy
      name={example.name}
      layout={example.layout}
      eager={false}
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
        {examples.map((example, index) => (
          <Fragment key={example.name}>
            {index > 0 ? <ExampleRule /> : null}
            <BlockExample
              name={example.name}
              usage={[{ title: "app/login/page.tsx", code: example.code }]}
            >
              <LoginExamplePreview example={example} />
            </BlockExample>
          </Fragment>
        ))}
      </div>
    </article>
  )
}
