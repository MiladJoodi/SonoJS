"use client"

import * as React from "react"
import { FolderTreeIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
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

export function TreeCheckboxGallery() {
  const [value, setValue] = React.useState<string[]>(["photos-product"])
  const [expanded, setExpanded] = React.useState<string[]>([
    "documents",
    "photos",
    "settings",
    "documents-reports",
  ])

  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <FolderTreeIcon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Folder access
          </h3>
          <p className="text-xs text-muted-foreground">
            Toggle <span className="font-medium text-foreground">Documents</span>{" "}
            to cascade children — parents show indeterminate when partial.
          </p>
        </div>
        <Badge variant="secondary" className="ms-auto shrink-0 font-normal">
          {value.length} selected
        </Badge>
      </div>
      <TreeCheckbox
        data={data}
        value={value}
        onValueChange={setValue}
        expanded={expanded}
        onExpandedChange={setExpanded}
      />
    </div>
  )
}
