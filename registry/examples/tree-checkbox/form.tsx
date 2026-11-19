"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import {
  TreeCheckbox,
  type TreeCheckboxNode,
} from "@sonojs/ui/components/tree-checkbox"

const data: TreeCheckboxNode[] = [
  {
    id: "fruits",
    label: "Fruits",
    children: [
      { id: "apple", label: "Apple" },
      { id: "banana", label: "Banana" },
      { id: "orange", label: "Orange" },
    ],
  },
  {
    id: "vegetables",
    label: "Vegetables",
    children: [
      { id: "carrot", label: "Carrot" },
      { id: "lettuce", label: "Lettuce" },
    ],
  },
]

export function TreeCheckboxForm() {
  const [value, setValue] = React.useState<string[]>(["carrot"])
  const [submitted, setSubmitted] = React.useState<string[] | null>(null)

  return (
    <form
      className="w-full max-w-sm rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(value)
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel>Categories</FieldLabel>
          <FieldDescription>
            Toggle <span className="font-medium text-foreground">Fruits</span>{" "}
            to select every fruit at once.
          </FieldDescription>
          <TreeCheckbox
            data={data}
            value={value}
            onValueChange={setValue}
            defaultExpanded={["fruits", "vegetables"]}
          />
        </Field>
        <Button type="submit" className="w-full">
          Save selection
        </Button>
        {submitted ? (
          <p className="text-xs text-muted-foreground">
            Saved: {submitted.join(", ") || "none"}
          </p>
        ) : null}
      </FieldGroup>
    </form>
  )
}
