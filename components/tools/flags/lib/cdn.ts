/** jsDelivr CDN for SonoJS-flags SVGs (keeps the tools page light). */
export const FLAGS_CDN_BASE =
  "https://cdn.jsdelivr.net/gh/SonoJS/SonoJS-flags@main/flags"

export function flagSrc(code: string, base: string = FLAGS_CDN_BASE) {
  return `${base.replace(/\/$/, "")}/${code.toLowerCase()}.svg`
}

export function flagImgSnippet(code: string, name: string, base?: string) {
  const src = flagSrc(code, base)
  return `<img src="${src}" alt="${name}" width="20" height="20" />`
}
