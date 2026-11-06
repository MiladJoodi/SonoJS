import type { Metadata } from "next"

import { LegalPage, SupportEmail } from "@/components/legal"

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "How SonoJS handles refund requests for Pro digital subscriptions.",
  alternates: { canonical: "/legal/refund" },
}

export default function RefundPage() {
  return (
    <LegalPage title="Refund Policy" pathname="/legal/refund">
      <p>
        This policy explains how refund requests for SonoJS Pro subscriptions
        are handled.
      </p>

      <h2>1. Refund eligibility</h2>
      <p>
        SonoJS provides digital products and subscription-based access to React
        components and UI blocks.
      </p>
      <p>
        We review refund requests individually. You may be eligible for a
        refund in situations such as:
      </p>
      <ul>
        <li>You paid successfully but Pro access was not activated.</li>
        <li>
          A technical issue prevents you from accessing the products you
          purchased and we cannot resolve it.
        </li>
        <li>You were charged incorrectly or more than once.</li>
        <li>
          The product was materially different from what was described.
        </li>
      </ul>
      <p>A change of mind alone does not guarantee a refund.</p>

      <h2>2. How to request a refund</h2>
      <p>To request a refund, email:</p>
      <p>
        <SupportEmail />
      </p>
      <p>Include:</p>
      <ul>
        <li>The email address associated with your account.</li>
        <li>Your approximate purchase date.</li>
        <li>A brief explanation of the issue.</li>
      </ul>
      <p>
        We will review your request and respond as soon as reasonably possible.
      </p>

      <h2>3. Refund processing</h2>
      <p>
        Approved refunds are returned through the original payment method where
        possible. Processing times depend on your payment provider and bank.
      </p>
      <p>
        If a refund is issued, access to the refunded Pro subscription will be
        revoked.
      </p>

      <h2>4. Your legal rights</h2>
      <p>
        This policy does not affect any cancellation, withdrawal, refund, or
        consumer rights you may have under the laws applicable to your purchase.
      </p>
      <p>
        Where applicable law provides additional rights for digital content or
        services, those rights take precedence over this policy.
      </p>

      <h2>5. Contact</h2>
      <p>For refund questions, email:</p>
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
