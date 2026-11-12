import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import {
  MultiSelect,
  type MultiSelectOption,
} from "@sonojs/ui/components/multi-select"

const roles: MultiSelectOption[] = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
  { value: "billing", label: "Billing" },
]

export function MultiSelectForm() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="roles">Roles</FieldLabel>
        <MultiSelect
          id="roles"
          options={roles}
          defaultValue={["editor"]}
          placeholder="Assign roles…"
        />
        <FieldDescription>
          People can hold more than one role on this workspace.
        </FieldDescription>
      </Field>
    </FieldGroup>
  )
}
