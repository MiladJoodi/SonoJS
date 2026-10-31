import { describe, expect, it } from "vitest"

describe("highlightBlockInstall", () => {
  it("highlights client-supplied files without reading public/r", async () => {
    const { highlightBlockInstall } = await import(
      "@/lib/highlight-install-action"
    )

    const result = await highlightBlockInstall({
      name: "login-01",
      files: [
        {
          title: "components/login-form.tsx",
          code: 'export function LoginForm() {\n  return <form />\n}\n',
        },
      ],
      usage: [
        {
          title: "page.tsx",
          code: 'import { LoginForm } from "./login-form"\n',
        },
      ],
    })

    expect(result.cliHtml).toContain("npx")
    expect(result.cliHtml.length).toBeGreaterThan(10)
    expect(result.files).toHaveLength(1)
    expect(result.files[0]?.title).toBe("components/login-form.tsx")
    expect(result.files[0]?.code).toContain("LoginForm")
    expect(result.files[0]?.html.length).toBeGreaterThan(10)
    expect(result.usage).toHaveLength(1)
    expect(result.usage[0]?.html.length).toBeGreaterThan(5)
  })

  it("rejects invalid names", async () => {
    const { highlightBlockInstall } = await import(
      "@/lib/highlight-install-action"
    )
    await expect(
      highlightBlockInstall({
        name: "../evil",
        files: [{ title: "a.tsx", code: " cons" }],
      })
    ).rejects.toThrow(/Invalid/)
  })

  it("skips binary-looking titles", async () => {
    const { highlightBlockInstall } = await import(
      "@/lib/highlight-install-action"
    )
    const result = await highlightBlockInstall({
      name: "hero-01",
      files: [
        { title: "thumb.webp", code: "not-shown" },
        { title: "hero.tsx", code: "export const x = 1\n" },
      ],
    })
    expect(result.files.map((f) => f.title)).toEqual(["hero.tsx"])
  })
})
