import type { ReactNode } from "react"

import { GuideCode } from "./guide-code"

import {
  SNIPPET_API_ROUTE,
  SNIPPET_CLIENT_FORM,
  SNIPPET_ENV,
  SNIPPET_FORM_IMPORT,
  SNIPPET_INSTALL,
  SNIPPET_VERIFY,
} from "./guide-snippets"

export async function CaptchaGuide() {
  return (
    <section className="captcha-tool-guide space-y-10 border-t border-border/70 pt-10">
      <Block className="space-y-4">
        <h2 className="text-h4 tracking-tight text-foreground">Installation</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Install the package from npm, then import the React component and
          default styles in your client UI.
        </p>
        <div className="space-y-3">
          <GuideCode title="terminal" lang="bash" code={SNIPPET_INSTALL} />
          <GuideCode title="form.tsx" lang="tsx" code={SNIPPET_FORM_IMPORT} />
        </div>
      </Block>

      <Block className="space-y-6">
        <h2 className="text-h4 tracking-tight text-foreground">Quick start</h2>

        <Block className="space-y-3">
          <h3 className="text-base font-medium text-foreground">
            1. Add your secret
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Create <code className="text-foreground">.env.local</code> in your
            Next.js project. Keep this value server-side only.
          </p>
          <GuideCode title=".env.local" lang="bash" code={SNIPPET_ENV} />
        </Block>

        <Block className="space-y-3">
          <h3 className="text-base font-medium text-foreground">
            2. Add the CAPTCHA API
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Create <code className="text-foreground">app/api/captcha/route.ts</code>.
            CaptchaKit uses <code className="text-foreground">/api/captcha</code>{" "}
            by default.
          </p>
          <GuideCode
            title="app/api/captcha/route.ts"
            lang="tsx"
            code={SNIPPET_API_ROUTE}
          />
        </Block>

        <Block className="space-y-3">
          <h3 className="text-base font-medium text-foreground">
            3. Add CAPTCHA to your form
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            When the user solves the CAPTCHA,{" "}
            <code className="text-foreground">onVerify</code> gives you a proof
            token. Send that token with the action you want to protect.
          </p>
          <GuideCode title="app/form.tsx" lang="tsx" code={SNIPPET_CLIENT_FORM} />
        </Block>

        <Block className="space-y-3">
          <h3 className="text-base font-medium text-foreground">
            4. Verify on your server
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Do not trust <code className="text-foreground">onVerify</code> on the
            client alone. Always verify the proof token on your server before
            performing the protected action.
          </p>
          <GuideCode
            title="app/api/register/route.ts"
            lang="tsx"
            code={SNIPPET_VERIFY}
          />
        </Block>
      </Block>
    </section>
  )
}

function Block({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={className}>{children}</div>
}