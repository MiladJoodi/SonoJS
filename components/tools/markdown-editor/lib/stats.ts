export type DocStats = {
  words: number
  characters: number
  charactersNoSpaces: number
  readingMinutes: number
}

/** Rough reading pace for technical / mixed docs. */
const WORDS_PER_MINUTE = 220

export function computeStats(markdown: string): DocStats {
  const text = markdown
    .replace(/^---[\s\S]*?---\s*/m, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, "$1")
    .replace(/[#>*_~=\-|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  const characters = markdown.length
  const charactersNoSpaces = markdown.replace(/\s/g, "").length
  const words = text ? text.split(" ").filter(Boolean).length : 0
  const readingMinutes = words === 0 ? 0 : Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))

  return { words, characters, charactersNoSpaces, readingMinutes }
}
