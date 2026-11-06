import { siteConfig } from "@/lib/config"

/** Mailto link for the public support inbox — never follow with a period in prose. */
export function SupportEmail() {
  const email = siteConfig.links.supportEmail || "info@sonojs.com"
  return <a href={`mailto:${email}`}>{email}</a>
}
