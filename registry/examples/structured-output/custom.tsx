import { DataTable } from "@sonojs/ui/components/structured-output"

export function StructuredOutputCustom() {
  return (
    <div className="mx-auto flex w-full max-w-xl justify-center py-4">
      <DataTable
        rows={[
          { model: "gpt-4.1", context: "1M", price: "$2.00" },
          { model: "claude-4", context: "200k", price: "$3.00" },
          { model: "llama-4", context: "128k", price: "$0.40" },
        ]}
      />
    </div>
  )
}
