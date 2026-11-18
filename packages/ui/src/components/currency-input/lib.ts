export type CurrencyDisplay = "symbol" | "narrowSymbol" | "code" | "name"

export type CurrencyFormatOptions = {
  locale: string
  currency: string
  currencyDisplay?: CurrencyDisplay
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

function safeNumberFormat(
  locale: string,
  options: Intl.NumberFormatOptions
): Intl.NumberFormat {
  try {
    return new Intl.NumberFormat(locale, options)
  } catch {
    return new Intl.NumberFormat("en-US", options)
  }
}

/** Digit + separator meta for a locale. */
export function getNumberSeparators(locale: string) {
  const parts = safeNumberFormat(locale, {
    useGrouping: true,
    minimumFractionDigits: 1,
  }).formatToParts(12345.6)
  return {
    group: parts.find((p) => p.type === "group")?.value ?? ",",
    decimal: parts.find((p) => p.type === "decimal")?.value ?? ".",
  }
}

export function getCurrencyMeta(
  locale: string,
  currency: string,
  currencyDisplay: CurrencyDisplay = "symbol"
) {
  const parts = safeNumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay,
  }).formatToParts(1)

  const currencyIndex = parts.findIndex((p) => p.type === "currency")
  const currencyLabel = parts[currencyIndex]?.value ?? currency
  const firstNumberIndex = parts.findIndex(
    (p) =>
      p.type === "integer" ||
      p.type === "group" ||
      p.type === "decimal" ||
      p.type === "fraction"
  )

  const addonAlign: "inline-start" | "inline-end" =
    currencyIndex !== -1 &&
    (firstNumberIndex === -1 || currencyIndex < firstNumberIndex)
      ? "inline-start"
      : "inline-end"

  return { currencyLabel, addonAlign }
}

export function resolveFractionDigits(
  locale: string,
  currency: string,
  minimumFractionDigits?: number,
  maximumFractionDigits?: number
) {
  const resolved = safeNumberFormat(locale, {
    style: "currency",
    currency,
  }).resolvedOptions()
  const min =
    minimumFractionDigits ?? resolved.minimumFractionDigits ?? 2
  const max =
    maximumFractionDigits ?? resolved.maximumFractionDigits ?? Math.max(min, 2)
  return { min, max: Math.max(min, max) }
}

/** Blur / idle display (grouped + fixed fraction digits). */
export function formatCurrencyAmount(
  value: number | null | undefined,
  options: CurrencyFormatOptions
): string {
  if (value == null || Number.isNaN(value)) return ""
  const { min, max } = resolveFractionDigits(
    options.locale,
    options.currency,
    options.minimumFractionDigits,
    options.maximumFractionDigits
  )
  return safeNumberFormat(options.locale, {
    style: "decimal",
    useGrouping: true,
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  }).format(value)
}

const EASTERN_DIGITS = /[۰-۹]/g
const ARABIC_DIGITS = /[٠-٩]/g

export function normalizeDigits(input: string): string {
  return input
    .replace(EASTERN_DIGITS, (d) =>
      String(d.charCodeAt(0) - "۰".charCodeAt(0))
    )
    .replace(ARABIC_DIGITS, (d) =>
      String(d.charCodeAt(0) - "٠".charCodeAt(0))
    )
}

function isDigitChar(ch: string) {
  return ch >= "0" && ch <= "9"
}

/**
 * Strip to a typable draft: optional `-`, digits, one locale decimal.
 * Group separators are removed.
 */
export function sanitizeMoneyDraft(raw: string, locale: string): string {
  const { decimal, group } = getNumberSeparators(locale)
  let s = normalizeDigits(raw)
  if (group) s = s.split(group).join("")
  // Map the other common decimal onto this locale's decimal.
  if (decimal === ",") s = s.replace(/\./g, ",")
  else s = s.replace(/,/g, ".")

  let out = ""
  let seenDecimal = false
  for (let i = 0; i < s.length; i++) {
    const ch = s[i]!
    if (ch === "-" && out.length === 0) {
      out += ch
      continue
    }
    if (isDigitChar(ch)) {
      out += ch
      continue
    }
    if (ch === decimal && !seenDecimal) {
      out += decimal
      seenDecimal = true
    }
  }
  return out
}

/**
 * Live grouped display while typing.
 * Keeps a trailing decimal if the user just typed it (e.g. `1,234.`).
 */
export function formatLiveMoneyDraft(
  rawDraft: string,
  locale: string,
  maxFractionDigits: number
): string {
  const { decimal } = getNumberSeparators(locale)
  if (!rawDraft) return ""

  const negative = rawDraft.startsWith("-")
  const body = negative ? rawDraft.slice(1) : rawDraft
  const hasDecimal = body.includes(decimal)
  const [intRaw = "", fracRaw = ""] = body.split(decimal)
  const intDigits = intRaw.replace(/\D/g, "")
  const fracDigits = fracRaw.replace(/\D/g, "").slice(0, maxFractionDigits)

  let intFormatted = ""
  if (intDigits.length > 0) {
    // Avoid scientific notation; group with Intl.
    intFormatted = safeNumberFormat(locale, {
      useGrouping: true,
      maximumFractionDigits: 0,
    }).format(Number(intDigits))
  }

  let out = (negative ? "-" : "") + intFormatted
  if (hasDecimal) out += decimal + fracDigits
  return out
}

/** Focus entry: grouped integers, no forced trailing zeros. */
export function toEditableAmount(
  value: number | null | undefined,
  locale: string,
  maximumFractionDigits: number
): string {
  if (value == null || Number.isNaN(value)) return ""
  const { decimal } = getNumberSeparators(locale)
  let raw = String(value)
  if (/e/i.test(raw)) {
    raw = value.toFixed(Math.min(maximumFractionDigits, 12))
  }
  if (raw.includes(".")) {
    raw = raw.replace(/(\.\d*?[1-9])0+$/u, "$1").replace(/\.0*$/u, "")
  }
  const withLocaleDecimal = raw.replace(".", decimal)
  return formatLiveMoneyDraft(
    sanitizeMoneyDraft(withLocaleDecimal, locale),
    locale,
    maximumFractionDigits
  )
}

export function parseMoneyDraft(
  draft: string,
  locale: string
): number | null {
  const { decimal, group } = getNumberSeparators(locale)
  let trimmed = normalizeDigits(draft.trim())
  if (group) trimmed = trimmed.split(group).join("")
  if (!trimmed || trimmed === "-" || trimmed === decimal) return null

  const normalized = trimmed
    .replace(decimal === "." ? /\./g : new RegExp(escapeRegExp(decimal), "g"), ".")
    .replace(/[^\d.-]/g, "")

  let cleaned = ""
  let seenDot = false
  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i]!
    if (ch === "-" && cleaned.length === 0) cleaned += ch
    else if (ch === "." && !seenDot) {
      cleaned += ch
      seenDot = true
    } else if (isDigitChar(ch)) cleaned += ch
  }
  if (!cleaned || cleaned === "-" || cleaned === ".") return null
  const n = Number(cleaned)
  return Number.isFinite(n) ? n : null
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function clampMoney(
  value: number,
  min?: number,
  max?: number
): number {
  let next = value
  if (typeof min === "number" && Number.isFinite(min)) {
    next = Math.max(min, next)
  }
  if (typeof max === "number" && Number.isFinite(max)) {
    next = Math.min(max, next)
  }
  return next
}

/** Digits (0-9) before caret, ignoring group/symbol noise. */
export function countDigitsBefore(
  text: string,
  caret: number
): number {
  const slice = normalizeDigits(text.slice(0, Math.max(0, caret)))
  let n = 0
  for (let i = 0; i < slice.length; i++) {
    if (isDigitChar(slice[i]!)) n++
  }
  return n
}

/** Map a digit-count caret back onto a formatted string. */
export function caretFromDigitCount(
  formatted: string,
  digitCount: number
): number {
  if (digitCount <= 0) {
    // Keep caret after a leading minus if present.
    return formatted.startsWith("-") ? 1 : 0
  }
  let seen = 0
  const normalized = normalizeDigits(formatted)
  for (let i = 0; i < normalized.length; i++) {
    if (isDigitChar(normalized[i]!)) {
      seen++
      if (seen >= digitCount) return i + 1
    }
  }
  return formatted.length
}

/**
 * If the user caret sat on/after the decimal with no fraction digits yet,
 * park it right after the decimal in the formatted string.
 */
export function adjustCaretForTrailingDecimal(
  previous: string,
  previousCaret: number,
  formatted: string,
  locale: string
): number | null {
  const { decimal } = getNumberSeparators(locale)
  const before = previous.slice(0, previousCaret)
  const endsAtDecimal =
    normalizeDigits(before).endsWith(decimal) ||
    before.endsWith(decimal)
  if (!endsAtDecimal) return null
  const idx = formatted.indexOf(decimal)
  if (idx === -1) return null
  return idx + 1
}
