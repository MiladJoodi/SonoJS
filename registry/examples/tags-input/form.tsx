import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { TagsInput } from "@sonojs/ui/components/tags-input"

export function TagsInputForm() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="article-tags">Tags</FieldLabel>
        <TagsInput
          id="article-tags"
          defaultValue={["docs", "release"]}
          placeholder="Add tags…"
        />
        <FieldDescription>
          Shown on the article card and used for search filters.
        </FieldDescription>
      </Field>
    </FieldGroup>
  )
}
