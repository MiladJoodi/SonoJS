import { permanentRedirect } from "next/navigation"

export default async function LegacyCursorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  permanentRedirect(`/cursors/${id}`)
}
