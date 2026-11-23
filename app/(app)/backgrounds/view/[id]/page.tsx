import { permanentRedirect } from "next/navigation"

export default async function LegacyBackgroundPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  permanentRedirect(`/backgrounds/${id}`)
}
