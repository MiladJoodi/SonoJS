/** `age-check-05` → `AgeCheck05` (matches default export of the installed wrapper). */
export function popupComponentName(registryName: string) {
  return registryName
    .split(/[-_/]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

/**
 * Docs / install Usage snippet - always import the variant wrapper default export
 * (`age-check-05/age-check`), never the shared `*-card` source (that defaults to look 01).
 */
export function popupUsageSnippet(
  registryName: string,
  fileBase: string,
  jsxProps: string
) {
  const Comp = popupComponentName(registryName)
  const props = jsxProps.replace(/^\n+|\n+$/g, "")
  const open =
    props.length === 0
      ? `<${Comp} />`
      : props.includes("\n")
        ? `<${Comp}\n${props}\n      />`
        : `<${Comp} ${props.trim()} />`

  return `import ${Comp} from "@/components/${registryName}/${fileBase}"

export default function Page() {
  return (
    <div className="relative min-h-svh w-full">
      ${open}
    </div>
  )
}`
}
