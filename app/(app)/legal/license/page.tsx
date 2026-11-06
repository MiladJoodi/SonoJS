import type { Metadata } from "next"

import { LegalPage, SupportEmail } from "@/components/legal"

export const metadata: Metadata = {
  title: "Pro License Agreement",
  description:
    "How you may use SonoJS Pro components, blocks, and source code under an active subscription.",
  alternates: { canonical: "/legal/license" },
}

export default function LicensePage() {
  return (
    <LegalPage title="Pro License Agreement" pathname="/legal/license">
      <p>
        This agreement explains how you can use components, blocks, and source
        code available through a SonoJS Pro subscription.
      </p>
      <p>
        By purchasing or accessing Pro materials, you agree to the terms below.
        Free products may have separate license terms, as indicated on their
        respective pages or repositories.
      </p>

      <h2>1. License grant</h2>
      <p>
        SonoJS grants you a non-exclusive, non-transferable license to use Pro
        materials downloaded during an active paid subscription.
      </p>
      <p>
        This license allows you to use the materials in your own projects,
        subject to the restrictions below.
      </p>

      <h2>2. What you&apos;re allowed to do</h2>
      <p>You may:</p>
      <ul>
        <li>Use Pro materials in personal and commercial projects.</li>
        <li>Use them in projects you build for clients.</li>
        <li>Use them in unlimited projects and end products.</li>
        <li>Modify, customize, and adapt the source code.</li>
        <li>
          Include them in websites, applications, and products you build,
          including paid products.
        </li>
      </ul>

      <h2>3. Client and team usage</h2>
      <p>
        <strong>Clients:</strong> You may deliver finished websites,
        applications, or products that include Pro materials to your clients.
        Clients may use those finished products as end users. Clients do not
        receive a SonoJS Pro license of their own unless they purchase Pro
        separately. You may not give clients the original Pro source as a
        substitute for their own subscription, or leave them with a reusable
        Pro component library to ship in other projects without their own
        license.
      </p>
      <p>
        <strong>Teams:</strong> This license is for the purchasing account
        holder (and that person&apos;s own work for clients or employers).
        Colleagues, contractors, or teammates who need to download Pro materials
        from SonoJS must use their own Pro subscription. You may collaborate on
        a shared project that already includes Pro code you downloaded and
        integrated, but you may not share login credentials or redistribute Pro
        zip archives so others can obtain the source without a license.
      </p>

      <h2>4. What you&apos;re not allowed to do</h2>
      <p>You may not:</p>
      <ul>
        <li>
          Sell, rent, or distribute SonoJS components or blocks as standalone
          products, packages, or add-ons (for example, listing individual
          components or blocks on a marketplace, or selling a zip of Pro
          sources).
        </li>
        <li>
          Publish or share Pro source code publicly, including public GitHub
          repositories, gists, blog posts, or file-sharing links that expose the
          original or lightly modified Pro source.
        </li>
        <li>
          Redistribute the original Pro source—or a thin wrapper around it—as a
          competing component library, template collection, starter kit, or UI
          kit.
        </li>
        <li>
          Share your account, download links, or Pro archives so others can
          access Pro materials in place of buying their own license.
        </li>
        <li>
          Repackage SonoJS materials and offer them as your own competing
          product, whether free or paid.
        </li>
      </ul>
      <p>
        Shipping an application that <em>embeds</em> Pro code as part of a
        larger product you built is allowed. Shipping Pro code so others can
        extract and reuse it as components or templates is not.
      </p>

      <h2>5. Ownership</h2>
      <p>
        SonoJS retains ownership of its original Pro materials, source code, and
        branding. This agreement gives you permission to use those materials; it
        does not transfer ownership to you.
      </p>
      <p>
        Your own work, modifications, and projects remain yours, subject to the
        rights in the original materials.
      </p>

      <h2>6. Subscription and continued use</h2>
      <p>
        Pro materials can be downloaded while your subscription is active.
      </p>
      <p>
        Renewal is manual. No automatic charges are made when your subscription
        period ends.
      </p>
      <p>
        You may continue using copies downloaded during your active
        subscription in your own projects, even after the subscription expires.
        However, further Pro downloads require a new active subscription.
      </p>
      <p>
        Your existing usage rights are not automatically revoked just because
        your subscription expires.
      </p>

      <h2>7. Contact</h2>
      <p>For questions about this license, email:</p>
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
