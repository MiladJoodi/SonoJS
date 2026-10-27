import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import MinimalSignupForm from "@/registry/blocks/authentication/signup/signup-01/signup-form"
import SocialSignupForm from "@/registry/blocks/authentication/signup/signup-02/signup-form"
import SignupForm from "@/registry/blocks/authentication/signup/signup-03/signup-form"
import BrandedSignupForm from "@/registry/blocks/authentication/signup/signup-04/signup-form"
import TestimonialSignupForm from "@/registry/blocks/authentication/signup/signup-05/signup-form"
import DarkSignupForm from "@/registry/blocks/authentication/signup/signup-06/signup-form"
import MultiStepSignupForm from "@/registry/blocks/authentication/signup/signup-07/signup-form"
import SaasSignupForm from "@/registry/blocks/authentication/signup/signup-08/signup-form"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/authentication/signup", "Signup", "Ready-to-use Signup UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const minimalSource = `import SignupForm from "@/components/blocks/authentication/signup-01/signup-form"

export default function Page() {
  return <SignupForm />
}`

const socialSource = `import SignupForm from "@/components/blocks/authentication/signup-02/signup-form"

export default function Page() {
  return <SignupForm />
}`

const blockSource = `import SignupForm from "@/components/blocks/authentication/signup-03/signup-form"

export default function Page() {
  return <SignupForm />
}`

const brandedSource = `import SignupForm from "@/components/blocks/authentication/signup-04/signup-form"

export default function Page() {
  return <SignupForm />
}`

const testimonialSource = `import SignupForm from "@/components/blocks/authentication/signup-05/signup-form"

export default function Page() {
  return <SignupForm />
}`

const darkSource = `import SignupForm from "@/components/blocks/authentication/signup-06/signup-form"

export default function Page() {
  return <SignupForm />
}`

const multiStepSource = `import SignupForm from "@/components/blocks/authentication/signup-07/signup-form"

export default function Page() {
  return <SignupForm />
}`

const saasSource = `import SignupForm from "@/components/blocks/authentication/signup-08/signup-form"

export default function Page() {
  return <SignupForm />
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

export default function BlockSignupDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Signup"
        pathname="/blocks/authentication/signup"
        description="Sign-up layouts. Each example has its own name and install command."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="signup-01"
          usage={[{ title: "app/signup/page.tsx", code: minimalSource }]}
        >
          <MinimalSignupForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="signup-02"
          usage={[{ title: "app/signup/page.tsx", code: socialSource }]}
        >
          <SocialSignupForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="signup-03"
          usage={[{ title: "app/signup/page.tsx", code: blockSource }]}
        >
          <SignupForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="signup-04"
          usage={[{ title: "app/signup/page.tsx", code: brandedSource }]}
        >
          <BrandedSignupForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="signup-05"
          usage={[{ title: "app/signup/page.tsx", code: testimonialSource }]}
        >
          <TestimonialSignupForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="signup-06"
          usage={[{ title: "app/signup/page.tsx", code: darkSource }]}
        >
          <DarkSignupForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="signup-07"
          usage={[{ title: "app/signup/page.tsx", code: multiStepSource }]}
        >
          <MultiStepSignupForm />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="signup-08"
          usage={[{ title: "app/signup/page.tsx", code: saasSource }]}
        >
          <SaasSignupForm />
        </BlockExample>
      </div>
    </article>
  )
}
