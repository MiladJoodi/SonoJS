export type CardBrand =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "diners"
  | "jcb"
  | "unionpay"
  | "unknown"

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "")
}

export function luhnCheck(digits: string): boolean {
  if (digits.length < 12) return false
  let sum = 0
  let alt = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = Number(digits[i])
    if (Number.isNaN(n)) return false
    if (alt) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
    alt = !alt
  }
  return sum % 10 === 0
}

export function detectCardBrand(digits: string): CardBrand {
  const d = onlyDigits(digits)
  if (/^4/.test(d)) return "visa"
  if (/^(5[1-5]|2[2-7])/.test(d)) return "mastercard"
  if (/^3[47]/.test(d)) return "amex"
  if (/^6(?:011|5)/.test(d)) return "discover"
  if (/^3(?:0[0-5]|[68])/.test(d)) return "diners"
  if (/^35/.test(d)) return "jcb"
  if (/^62/.test(d)) return "unionpay"
  return "unknown"
}

export function cardBrandLabel(brand: CardBrand): string {
  switch (brand) {
    case "visa":
      return "Visa"
    case "mastercard":
      return "Mastercard"
    case "amex":
      return "Amex"
    case "discover":
      return "Discover"
    case "diners":
      return "Diners"
    case "jcb":
      return "JCB"
    case "unionpay":
      return "UnionPay"
    default:
      return "Card"
  }
}

/** Max digits for the brand (Amex 15, Diners 14, else 16–19). */
export function cardMaxLength(brand: CardBrand): number {
  if (brand === "amex") return 15
  if (brand === "diners") return 14
  return 19
}

/** Group pattern for display. */
export function formatCardNumber(digits: string, brand?: CardBrand): string {
  const d = onlyDigits(digits)
  const b = brand ?? detectCardBrand(d)
  if (b === "amex") {
    const p1 = d.slice(0, 4)
    const p2 = d.slice(4, 10)
    const p3 = d.slice(10, 15)
    return [p1, p2, p3].filter(Boolean).join(" ")
  }
  if (b === "diners") {
    const p1 = d.slice(0, 4)
    const p2 = d.slice(4, 10)
    const p3 = d.slice(10, 14)
    return [p1, p2, p3].filter(Boolean).join(" ")
  }
  return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
}

export function maskCardNumber(digits: string, brand?: CardBrand): string {
  const d = onlyDigits(digits)
  if (d.length <= 4) return formatCardNumber(d, brand)
  const maskedDigits = `${"*".repeat(Math.max(0, d.length - 4))}${d.slice(-4)}`
  const b = brand ?? detectCardBrand(d)
  // formatCardNumber strips non-digits - group the masked string manually.
  if (b === "amex") {
    return [maskedDigits.slice(0, 4), maskedDigits.slice(4, 10), maskedDigits.slice(10, 15)]
      .filter(Boolean)
      .join(" ")
  }
  if (b === "diners") {
    return [maskedDigits.slice(0, 4), maskedDigits.slice(4, 10), maskedDigits.slice(10, 14)]
      .filter(Boolean)
      .join(" ")
  }
  return maskedDigits.replace(/(.{4})(?=.)/g, "$1 ").trim()
}

export function isCardNumberComplete(digits: string): boolean {
  const d = onlyDigits(digits)
  const brand = detectCardBrand(d)
  const min = brand === "amex" ? 15 : brand === "diners" ? 14 : 16
  return d.length >= min && luhnCheck(d)
}

export function formatCardExpiry(digits: string): string {
  const d = onlyDigits(digits).slice(0, 4)
  if (d.length <= 2) return d
  return `${d.slice(0, 2)}/${d.slice(2)}`
}

export function parseCardExpiry(formatted: string): {
  month: string
  year: string
  valid: boolean
} {
  const d = onlyDigits(formatted).slice(0, 4)
  const month = d.slice(0, 2)
  const year = d.slice(2, 4)
  if (d.length < 4) return { month, year, valid: false }
  const m = Number(month)
  if (m < 1 || m > 12) return { month, year, valid: false }
  const now = new Date()
  const yy = now.getFullYear() % 100
  const mm = now.getMonth() + 1
  const y = Number(year)
  const valid = y > yy || (y === yy && m >= mm)
  return { month, year, valid }
}

export function formatIban(raw: string): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()
  return cleaned.replace(/(.{4})(?=.)/g, "$1 ").trim()
}

export function sanitizeIban(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()
}

/** ISO 13616 mod-97 check. */
export function isValidIban(raw: string): boolean {
  const iban = sanitizeIban(raw)
  if (iban.length < 15 || iban.length > 34) return false
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(iban)) return false
  const rearranged = iban.slice(4) + iban.slice(0, 4)
  let expanded = ""
  for (const ch of rearranged) {
    const code = ch.charCodeAt(0)
    if (code >= 65 && code <= 90) expanded += String(code - 55)
    else expanded += ch
  }
  // Chunked mod 97 for big integers
  let rest = 0
  for (let i = 0; i < expanded.length; i += 7) {
    const block = String(rest) + expanded.slice(i, i + 7)
    rest = Number(block) % 97
  }
  return rest === 1
}

export function countDigitsBefore(text: string, caret: number): number {
  const slice = text.slice(0, Math.max(0, caret))
  return (slice.match(/\d/g) ?? []).length
}

export function caretFromDigitCount(formatted: string, digitCount: number): number {
  if (digitCount <= 0) return 0
  let seen = 0
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i]!)) {
      seen++
      if (seen >= digitCount) return i + 1
    }
  }
  return formatted.length
}

export function countAlnumBefore(text: string, caret: number): number {
  const slice = text.slice(0, Math.max(0, caret)).replace(/[^a-zA-Z0-9]/gi, "")
  return slice.length
}

export function caretFromAlnumCount(formatted: string, count: number): number {
  if (count <= 0) return 0
  let seen = 0
  for (let i = 0; i < formatted.length; i++) {
    if (/[a-zA-Z0-9]/i.test(formatted[i]!)) {
      seen++
      if (seen >= count) return i + 1
    }
  }
  return formatted.length
}
