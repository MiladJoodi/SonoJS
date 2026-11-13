/** Resolve the shipped Permanent Marker file for canvas stamp text. */
export function getStampFontUrl(): string {
  try {
    return new URL("./fonts/PermanentMarker-Regular.ttf", import.meta.url).href
  } catch {
    return "https://fonts.gstatic.com/s/permanentmarker/v16/Fh4uPib9Iyv2ucM6pGQMWimMp004Hao.ttf"
  }
}

export async function ensureBagFontsReady(): Promise<void> {
  if (typeof document === "undefined") return

  try {
    if (!document.fonts.check('12px "Permanent Marker"')) {
      const face = new FontFace(
        "Permanent Marker",
        `url(${getStampFontUrl()})`,
        {
          weight: "400",
          style: "normal",
          display: "swap",
        }
      )
      const loaded = await face.load()
      document.fonts.add(loaded)
    }
    await Promise.all([
      document.fonts.load(`700 64px Geist, "Geist Sans", sans-serif`),
      document.fonts.load(`700 52px "Permanent Marker"`),
    ])
  } catch {
    /* canvas falls back to Comic Sans / system sans */
  }
}
