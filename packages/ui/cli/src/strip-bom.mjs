/** Remove UTF-8 BOM so JSON.parse / CSS tooling never see a leading U+FEFF. */
export function stripBom(text) {
  if (typeof text !== "string" || text.length === 0) return text
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text
}

export function parseJsonText(text, label = "JSON") {
  try {
    return JSON.parse(stripBom(text))
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    throw new Error(`${label}: ${msg}`)
  }
}
