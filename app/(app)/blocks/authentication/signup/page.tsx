import { BlockExample } from "@/components/blocks"
import SignupForm from "@/registry/blocks/authentication/signup-03/components/signup-form"
import BrandedSignupForm from "@/registry/blocks/authentication/signup-04/components/signup-form"
import TestimonialSignupForm from "@/registry/blocks/authentication/signup-05/components/signup-form"

const blockSource = `import SignupForm from "@/blocks/signup-03/components/signup-form"

export default function Page() {
  return <SignupForm />
}`

const brandedSource = `import SignupForm from "@/blocks/signup-04/components/signup-form"

export default function Page() {
  return <SignupForm />
}`

const testimonialSource = `import SignupForm from "@/blocks/signup-05/components/signup-form"

export default function Page() {
  return <SignupForm />
}`

export default function BlockSignupDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">Signup</h1>
        <p className="text-muted-foreground">
          Sign-up layouts. Each example has its own name and install command.
        </p>
      </header>

      <BlockExample
        name="signup-03"
        usage={[{ title: "app/signup/page.tsx", code: blockSource }]}
      >
        <SignupForm />
      </BlockExample>

      <BlockExample
        name="signup-04"
        usage={[{ title: "app/signup/page.tsx", code: brandedSource }]}
      >
        <BrandedSignupForm />
      </BlockExample>

      <BlockExample
        name="signup-05"
        usage={[{ title: "app/signup/page.tsx", code: testimonialSource }]}
      >
        <TestimonialSignupForm />
      </BlockExample>
    </article>
  )
}
