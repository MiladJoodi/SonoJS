/** Country name search (aligned with `@sonojs/geo` search semantics). */

const graphemeSegmenter = new Intl.Segmenter(undefined, {
  granularity: "grapheme",
})

const defaultCollator = new Intl.Collator(undefined, {
  usage: "search",
  sensitivity: "base",
  ignorePunctuation: true,
})

export function normalizeQuery(query: string) {
  return query.normalize("NFC").trim()
}

function graphemes(text: string) {
  return [...graphemeSegmenter.segment(text)].map((s) => s.segment)
}

function stripPunctuationGraphemes(text: string) {
  return graphemes(text)
    .filter((g) => !/[\p{P}\p{S}]/u.test(g))
    .join("")
}

function collatorContains(haystack: string, needle: string) {
  const n = normalizeQuery(needle)
  if (!n) return false
  const h = haystack.normalize("NFC")
  const hCmp = stripPunctuationGraphemes(h)
  const nCmp = stripPunctuationGraphemes(n)
  const hG = graphemes(hCmp)
  const nG = graphemes(nCmp)
  const win = nG.length
  if (win === 0 || hG.length < win) return false
  for (let i = 0; i <= hG.length - win; i++) {
    const slice = hG.slice(i, i + win).join("")
    if (defaultCollator.compare(slice, nCmp) === 0) return true
  }
  return false
}

export function matchesCountryFields(
  fields: (string | null | undefined)[],
  query: string
) {
  const q = normalizeQuery(query)
  if (!q) return false
  for (const f of fields) {
    if (f != null && f !== "" && collatorContains(f, q)) return true
  }
  return false
}