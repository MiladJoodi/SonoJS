"use client"

import { TagsInput } from "@sonojs/ui/components/tags-input"

const isEmail = (raw: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.trim())

export function TagsInputEmails() {
  return (
    <TagsInput
      className="max-w-md"
      defaultValue={["alex@acme.com"]}
      placeholder="Invite by email…"
      validate={isEmail}
      delimiters={["Enter", ",", " "]}
    />
  )
}
