/** Client-side image pick → data URL (no upload server). */
export async function imageToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result)
      else reject(new Error("Could not read image"))
    }
    reader.onerror = () => reject(reader.error ?? new Error("Could not read image"))
    reader.readAsDataURL(file)
  })
}
