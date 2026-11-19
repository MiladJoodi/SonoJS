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
      {
        id: "documents-reports",
        label: "Reports",
        children: [
          { id: "documents-reports-monthly", label: "Monthly" },
          { id: "documents-reports-annual", label: "Annual" },
        ],
      },
    ],
  },
  {
    id: "photos",
    label: "Photos",
    children: [
      { id: "photos-product", label: "Product" },
      { id: "photos-team", label: "Team" },
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

export function TreeCheckboxExpanded() {
  return (
    <div className="w-full max-w-sm rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <TreeCheckbox
        data={data}
        defaultExpanded={[
          "documents",
          "documents-reports",
          "photos",
          "settings",
        ]}
        defaultValue={["documents-contracts", "photos"]}
      />
    </div>
  )
}
