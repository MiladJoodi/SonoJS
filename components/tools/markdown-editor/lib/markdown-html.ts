import { marked } from "marked"

marked.setOptions({
  gfm: true,
  breaks: false,
})

export function markdownToHtml(markdown: string): string {
  try {
    const result = marked.parse(markdown, { async: false })
    return typeof result === "string" ? result : ""
  } catch {
    return `<p>Could not render Markdown.</p>`
  }
}

export function wrapHtmlDocument(title: string, bodyHtml: string): string {
  const safeTitle = title.replace(/[<>&"]/g, "")
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${safeTitle}</title>
<style>
  :root { color-scheme: light dark; }
  body {
    font-family: ui-sans-serif, system-ui, sans-serif;
    line-height: 1.65;
    max-width: 44rem;
    margin: 2rem auto;
    padding: 0 1.25rem;
    color: #18181b;
  }
  @media (prefers-color-scheme: dark) {
    body { color: #fafafa; background: #09090b; }
  }
  pre, code { font-family: ui-monospace, monospace; font-size: 0.9em; }
  pre { overflow-x: auto; padding: 1rem; border-radius: 8px; background: #f4f4f5; }
  @media (prefers-color-scheme: dark) {
    pre { background: #27272a; }
  }
  img { max-width: 100%; height: auto; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #d4d4d8; padding: 0.4rem 0.6rem; text-align: start; }
  blockquote { border-inline-start: 3px solid #d4d4d8; padding-inline-start: 1rem; color: #71717a; }
  @media print {
    body { max-width: none; margin: 0; color: #000; background: #fff; }
  }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`
}
