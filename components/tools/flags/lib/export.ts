import { flagSrc } from "./cdn"
import type { FlagCountry } from "./countries"

export function countriesToJson(list: FlagCountry[]) {
  return JSON.stringify(list, null, 2)
}

export function countriesToMarkdown(list: FlagCountry[]) {
  return list
    .map(
      (c) =>
        `- ![${c.code}](${flagSrc(c.code)}) **${c.name}** \`${c.code}\` ${c.dial}`
    )
    .join("\n")
}
