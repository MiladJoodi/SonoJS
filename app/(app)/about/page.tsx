import Link from "next/link"

import { LegalPage } from "@/components/legal"
import { siteConfig } from "@/lib/config"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "About",
  description:
    "SonoJS is a growing collection of React components, blocks, charts, and templates you can browse and copy into your own project.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <LegalPage title="About SonoJS" pathname="/about">
        <p>
          I built SonoJS as one place to share reusable React UI, so other
          developers can find and use it more easily.
        </p>
        <p>
          It&apos;s a growing collection of components, blocks, charts, and
          templates. You can browse the examples, check how things look, and copy
          what you need into your own project.
        </p>

        <h2>What&apos;s inside</h2>
        <ul>
          <li>
            <strong>Components:</strong>{" "}
            <Link href="/docs/components">Buttons, forms, navigation</Link>, and
            other UI elements.
          </li>
          <li>
            <strong>Blocks:</strong> Larger pieces of UI, from{" "}
            <Link href="/blocks/authentication/login">login forms</Link> to{" "}
            <Link href="/blocks/dashboards-analytics/analytics-dashboard">
              dashboards
            </Link>
            .
          </li>
          <li>
            <strong>Charts:</strong>{" "}
            <Link href="/charts">Chart examples</Link> and reusable React
            components.
          </li>
          <li>
            <strong>Templates:</strong> Complete{" "}
            <Link href="/templates">website</Link> and{" "}
            <Link href="/websites">app layouts</Link>.
          </li>
          <li>
            <strong>More UI:</strong>{" "}
            <Link href="/cursors">Cursors</Link>,{" "}
            <Link href="/backgrounds">backgrounds</Link>,{" "}
            <Link href="/3d">3D elements</Link>,{" "}
            <Link href="/popups">popups</Link>, and interactive demos.
          </li>
        </ul>

        <h2>Using SonoJS</h2>
        <p>
          You can add components to your project with the SonoJS CLI instead of
          copying files manually. The documentation covers{" "}
          <Link href="/docs/installation">installation</Link> and{" "}
          <Link href="/docs/cli">available commands</Link>.
        </p>
        <p>
          If you use AI coding tools, SonoJS also has an{" "}
          <Link href="/docs/mcp">MCP server</Link> that lets agents search the
          component catalog and find the right items.
        </p>

        <h2>Built with</h2>
        <p>
          SonoJS uses React, TypeScript, and Tailwind CSS. These are the same
          tools used throughout the components and examples.
        </p>

        <h2>Follow the project</h2>
        <p>
          You can find the source code on GitHub and follow what I&apos;m working
          on.
        </p>
        <ul>
          <li>
            <a
              href={siteConfig.links.github}
              className="cursor-pointer font-medium text-foreground underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={siteConfig.links.x}
              className="cursor-pointer font-medium text-foreground underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
          </li>
        </ul>

        <h2>Get in touch</h2>
        <p>
          Found a bug, have a question, or want to suggest something? Reach out
          at{" "}
          <a
            href={`mailto:${siteConfig.links.supportEmail}`}
            className="cursor-pointer font-medium text-foreground underline underline-offset-4"
          >
            {siteConfig.links.supportEmail}
          </a>{" "}
          or use the <Link href="/contact">contact page</Link>.
        </p>
        <p>
          For licensing and usage details, see the{" "}
          <Link href={siteConfig.legal.root}>legal pages</Link>.
        </p>
      </LegalPage>
    </div>
  )
}