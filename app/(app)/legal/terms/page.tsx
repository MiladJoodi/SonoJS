import type { Metadata } from "next"
import Link from "next/link"

import { LegalPage, SupportEmail } from "@/components/legal"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Rules for using SonoJS, including accounts, Pro purchases, and product access.",
  alternates: { canonical: "/legal/terms" },
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" pathname="/legal/terms">
      <p>
        By using SonoJS, you agree to these Terms and our{" "}
        <Link href={siteConfig.legal.privacy}>Privacy Policy</Link>.
      </p>

      <h2>1. Service</h2>
      <p>
        SonoJS provides downloadable React components, UI blocks, and related
        digital products. Some products are free, while Pro products require an
        active paid subscription.
      </p>

      <h2>2. Accounts</h2>
      <p>
        You are responsible for maintaining the security of your account and
        any activity carried out through it.
      </p>

      <h2>3. Payments and subscriptions</h2>
      <p>
        SonoJS offers monthly and yearly Pro plans. Payments are processed
        through Stripe.
      </p>
      <p>
        Subscriptions do not renew automatically. Each renewal requires a new
        purchase initiated by the customer.
      </p>
      <p>
        Pro access remains active until the end of the purchased period. After
        expiration, access to Pro downloads is removed.
      </p>

      <h2>4. License</h2>
      <p>
        Use of Pro products is governed by our{" "}
        <Link href={siteConfig.legal.license}>Pro License Agreement</Link>. Free
        products may be subject to their own license terms.
      </p>

      <h2>5. Acceptable use</h2>
      <p>
        You may not bypass access restrictions, access protected content
        without authorization, share Pro source code publicly, or redistribute
        Pro products as standalone materials.
      </p>

      <h2>6. Refunds</h2>
      <p>
        Refund requests are handled according to our{" "}
        <Link href={siteConfig.legal.refund}>Refund Policy</Link> and applicable
        consumer protection laws.
      </p>

      <h2>7. Availability</h2>
      <p>
        We do not guarantee uninterrupted access to SonoJS. Nothing in these
        Terms limits rights or guarantees that cannot be excluded under
        applicable law.
      </p>

      <h2>8. Contact</h2>
      <p>For questions about these Terms or your purchases, email:</p>
      <p>
        <SupportEmail />
      </p>
      <p>
        <strong>Last updated:</strong>{" "}
        <time dateTime="2026-11-06">November 6, 2026</time>
      </p>
    </LegalPage>
  )
}
