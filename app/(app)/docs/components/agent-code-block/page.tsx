import { redirect } from "next/navigation"

/** Canonical AI Code Block docs live at `/ai/code-block`. */
export default function AgentCodeBlockDocsRedirect() {
  redirect("/ai/code-block")
}
