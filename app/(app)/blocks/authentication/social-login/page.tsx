import type { ReactNode } from "react"

import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import SocialLogin01 from "@/registry/blocks/authentication/social-login/social-login-01/social-login-form"
import SocialLogin02 from "@/registry/blocks/authentication/social-login/social-login-02/social-login-form"
import SocialLogin03 from "@/registry/blocks/authentication/social-login/social-login-03/social-login-form"
import SocialLogin04 from "@/registry/blocks/authentication/social-login/social-login-04/social-login-form"
import SocialLogin05 from "@/registry/blocks/authentication/social-login/social-login-05/social-login-form"
import SocialLogin06 from "@/registry/blocks/authentication/social-login/social-login-06/social-login-form"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/authentication/social-login",
  "Social Login",
  "Ready-to-use Social Login UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string, maxW = "max-w-md") =>
  `import SocialLoginForm from "@/components/blocks/authentication/${name}/social-login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-6 py-10">
      <div className="w-full ${maxW}">
        <SocialLoginForm />
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

function Center({
  children,
  className = "max-w-md",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <div className={`w-full ${className}`}>{children}</div>
    </div>
  )
}

export default function BlockSocialLoginDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Social Login"
        pathname="/blocks/authentication/social-login"
        description="Provider stack, magic link, icon row, photo split, last-used primary, and brand split."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="social-login-01"
          usage={[{ title: "app/login/page.tsx", code: usage("social-login-01") }]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <SocialLogin01 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="social-login-02"
          usage={[{ title: "app/login/page.tsx", code: usage("social-login-02") }]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <SocialLogin02 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="social-login-03"
          usage={[{ title: "app/login/page.tsx", code: usage("social-login-03") }]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <SocialLogin03 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="social-login-04"
          usage={[
            {
              title: "app/login/page.tsx",
              code: usage("social-login-04", "max-w-4xl"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Center className="max-w-4xl px-4 py-8 sm:px-6">
            <SocialLogin04 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="social-login-05"
          usage={[{ title: "app/login/page.tsx", code: usage("social-login-05") }]}
          previewAlign="center"
          previewClassName="bg-canvas"
        >
          <Center>
            <SocialLogin05 />
          </Center>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="social-login-06"
          usage={[
            {
              title: "app/login/page.tsx",
              code: usage("social-login-06", "max-w-4xl"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Center className="max-w-4xl px-4 py-8 sm:px-6">
            <SocialLogin06 />
          </Center>
        </BlockExample>
      </div>
    </article>
  )
}
