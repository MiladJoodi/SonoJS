import type { Metadata } from "next"
import Link from "next/link"

import { LegalPage, SupportEmail } from "@/components/legal"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SonoJS collects, uses, and protects personal information for accounts, billing, and downloads.",
  alternates: { canonical: "/legal/privacy" },
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" pathname="/legal/privacy">
      <p>
        This Privacy Policy explains how SonoJS collects, uses, and protects
        your personal information when you use our website and services.
      </p>

      <h2>1. Information we collect</h2>
      <p>Depending on how you use SonoJS, we may collect:</p>
      <ul>
        <li>
          <strong>Account information:</strong> Your email address, account
          details, and authentication data.
        </li>
        <li>
          <strong>Payment information:</strong> Payment status, transaction
          details, and billing records. Payments are processed by Stripe. We do
          not store your full card details.
        </li>
        <li>
          <strong>Subscription information:</strong> Plan type (for example Pro
          Monthly or Pro Yearly), subscription status, period start and end
          dates, renewal history, and related Stripe identifiers needed to
          manage access.
        </li>
        <li>
          <strong>Download and product access:</strong> Records needed to grant
          Free or Pro downloads, such as product identifiers, access checks
          against your plan, and delivery of downloadable archives. We do not
          use download history for advertising.
        </li>
        <li>
          <strong>Usage information:</strong> Information needed to manage
          subscriptions, provide downloads, and maintain account access.
        </li>
        <li>
          <strong>Support messages:</strong> Information you provide when
          contacting us.
        </li>
      </ul>

      <h2>2. How we use your information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Create and manage your account.</li>
        <li>Process payments and manage Pro subscriptions.</li>
        <li>Provide access to Free and Pro products.</li>
        <li>Respond to support requests.</li>
        <li>Protect the service against fraud and unauthorized access.</li>
        <li>Meet applicable legal and accounting obligations.</li>
      </ul>

      <h2>3. Data sharing</h2>
      <p>We do not sell your personal information.</p>
      <p>
        We only share information when necessary to operate SonoJS, process
        payments, provide support, protect our service, or comply with legal
        obligations.
      </p>

      <h2>4. Data retention</h2>
      <p>
        We keep personal information for as long as necessary to provide our
        services, maintain relevant records, comply with legal requirements,
        and resolve disputes.
      </p>
      <p>
        Subscription and payment records may be retained after a plan ends or
        an account is closed, where needed for accounting, tax, fraud
        prevention, or dispute resolution. Download access checks stop when
        your account or Pro period ends; we do not keep separate marketing
        profiles based on what you downloaded.
      </p>

      <h2>5. Account deletion</h2>
      <p>
        You can delete your account from{" "}
        <Link href="/account">Account settings</Link>. Deleting your account
        removes your ability to sign in and ends remaining Pro download access
        tied to that account.
      </p>
      <p>
        After deletion, we remove or unlink personal account data we control
        where reasonably possible. Some billing, subscription, and payment
        records may be retained by us or by Stripe for legal, tax, or
        accounting purposes. Files you already downloaded to your own devices
        remain under the applicable{" "}
        <Link href={siteConfig.legal.license}>Pro License Agreement</Link> or
        free-product license terms.
      </p>
      <p>
        If you cannot use Account settings, email us from the address on your
        account and ask for deletion:
      </p>
      <p>
        <SupportEmail />
      </p>

      <h2>6. Your rights</h2>
      <p>
        Depending on your location and applicable law, you may have the right
        to:
      </p>
      <ul>
        <li>Request access to your personal information.</li>
        <li>Ask us to correct inaccurate information.</li>
        <li>Request deletion of your information.</li>
        <li>Object to or restrict certain processing.</li>
        <li>Request a copy of your information.</li>
      </ul>
      <p>To exercise these rights, email:</p>
      <p>
        <SupportEmail />
      </p>

      <h2>7. Cookies</h2>
      <p>
        SonoJS may use essential cookies and similar technologies to support
        authentication, account sessions, and core website functionality.
      </p>
      <p>
        Any non-essential analytics or marketing cookies will be handled in
        accordance with applicable consent requirements.
      </p>

      <h2>8. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy when our services or data practices
        change. The latest version will be published on this page.
      </p>

      <h2>9. Contact</h2>
      <p>For privacy-related questions or requests, email:</p>
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
