"use client"

import {
  TreeCheckbox,
  type TreeCheckboxNode,
} from "@sonojs/ui/components/tree-checkbox"

const data: TreeCheckboxNode[] = [
  {
    id: "documents",
    label: "Documents",
    children: [
      { id: "documents-contracts", label: "Contracts" },
      { id: "documents-invoices", label: "Invoices" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    children: [
      { id: "settings-profile", label: "Profile" },
      { id: "settings-billing", label: "Billing", disabled: true },
      { id: "settings-security", label: "Security" },
    ],
  },
]

export function TreeCheckboxDisabled() {
  return (
    <div className="w-full max-w-sm rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <p className="mb-3 text-xs text-muted-foreground">
        Billing is disabled in the tree. The whole control can also use{" "}
        <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
          disabled
        </code>
        .
      </p>
      <TreeCheckbox
        data={data}
        defaultExpanded={["settings", "documents"]}
        defaultValue={["settings-profile"]}
      />
    </div>
  )
}
