import { ProButton } from "@/components/pro"

export function ProButtonDefault() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <ProButton>Primary</ProButton>
      <ProButton variant="secondary">Secondary</ProButton>
      <ProButton variant="outline">Outline</ProButton>
    </div>
  )
}
