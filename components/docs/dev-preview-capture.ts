/**
 * Dev-only: capture a preview as a transparent PNG and download it.
 *
 * Paths (never FO + SVG restamp — that caused ghost icons):
 * - Canvas-dominant demos → composite canvas bitmaps only
 * - CSS 3D / image galleries → visual bitmap (getBoundingClientRect + drawImage)
 * - Other DOM → foreignObject (sanitized, no external url())
 *
 * WebGL canvases are snapshotted synchronously right after a forced render
 * so preserveDrawingBuffer:false buffers are not cleared before readback.
 */

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.rel = "noopener"
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function rAF(): Promise<void> {
  return new Promise((r) => requestAnimationFrame(() => r()))
}

function resolveCaptureRoot(frame: HTMLElement): HTMLElement {
  const marked = frame.querySelector<HTMLElement>("[data-sono-capture-root]")
  if (!marked) return frame
  const rect = marked.getBoundingClientRect()
  if (rect.width >= 1 && rect.height >= 1) return marked
  // display:contents / collapsed — fall back to first sized child, else frame
  for (const child of marked.children) {
    if (!(child instanceof HTMLElement)) continue
    const r = child.getBoundingClientRect()
    if (r.width >= 1 && r.height >= 1) return child
  }
  return frame
}

/** Only opt-in chrome — never blanket `button` (hides Button / Toggle demos). */
const IGNORE_SELECTOR = "[data-sono-capture-ignore]"

function hideCaptureChrome(root: HTMLElement): () => void {
  const hidden: Array<{
    el: HTMLElement
    visibility: string
    pointerEvents: string
  }> = []
  for (const node of root.querySelectorAll(IGNORE_SELECTOR)) {
    if (!(node instanceof HTMLElement)) continue
    hidden.push({
      el: node,
      visibility: node.style.visibility,
      pointerEvents: node.style.pointerEvents,
    })
    node.style.setProperty("visibility", "hidden", "important")
    node.style.setProperty("pointer-events", "none", "important")
  }
  return () => {
    for (const item of hidden) {
      item.el.style.visibility = item.visibility
      item.el.style.pointerEvents = item.pointerEvents
    }
  }
}

function forceTransparentStage(root: HTMLElement): () => void {
  const touched: Array<{
    el: HTMLElement
    background: string
    backgroundColor: string
    backgroundImage: string
    animationPlayState: string
    removed: string[]
  }> = []

  const visit = (el: HTMLElement) => {
    const removed: string[] = []
    for (const cls of [...el.classList]) {
      if (
        cls === "bg-card" ||
        cls === "bg-canvas" ||
        cls === "bg-background" ||
        cls === "bg-muted" ||
        cls.startsWith("bg-muted/") ||
        cls.startsWith("bg-card/") ||
        cls.startsWith("bg-canvas/") ||
        cls.startsWith("bg-background/")
      ) {
        el.classList.remove(cls)
        removed.push(cls)
      }
    }
    touched.push({
      el,
      background: el.style.background,
      backgroundColor: el.style.backgroundColor,
      backgroundImage: el.style.backgroundImage,
      animationPlayState: el.style.animationPlayState,
      removed,
    })
    el.style.setProperty("background", "transparent", "important")
    el.style.setProperty("background-color", "transparent", "important")
    el.style.setProperty("background-image", "none", "important")
    el.style.setProperty("animation-play-state", "paused", "important")
  }

  visit(root)
  for (const child of root.children) {
    if (child instanceof HTMLElement) visit(child)
  }

  return () => {
    for (const item of touched) {
      item.el.style.background = item.background
      item.el.style.backgroundColor = item.backgroundColor
      item.el.style.backgroundImage = item.backgroundImage
      item.el.style.animationPlayState = item.animationPlayState
      for (const cls of item.removed) item.el.classList.add(cls)
    }
  }
}

type R3fState = {
  gl: {
    setClearColor?: (c: number, a: number) => void
    render?: (scene: unknown, camera: unknown) => void
    domElement?: HTMLCanvasElement
  }
  scene?: unknown
  camera?: unknown
  invalidate?: () => void
  advance?: (timestamp?: number, runGlobalEffects?: boolean) => void
}

function readR3fState(canvas: HTMLCanvasElement): R3fState | null {
  try {
    const fiber = (
      canvas as unknown as {
        __r3f?: { root?: { getState?: () => R3fState } | R3fState }
      }
    ).__r3f
    const root = fiber?.root
    if (!root) return null
    if (typeof (root as { getState?: () => R3fState }).getState === "function") {
      return (root as { getState: () => R3fState }).getState()
    }
    return root as R3fState
  } catch {
    return null
  }
}

/** Force transparent clear + one present where possible (R3F / raw WebGL). */
function prepareWebglAlpha(root: HTMLElement): () => void {
  const restores: Array<() => void> = []

  for (const canvas of root.querySelectorAll("canvas")) {
    const gl =
      (canvas.getContext("webgl2", {
        preserveDrawingBuffer: true,
      } as WebGLContextAttributes) as WebGL2RenderingContext | null) ||
      (canvas.getContext("webgl", {
        preserveDrawingBuffer: true,
      } as WebGLContextAttributes) as WebGLRenderingContext | null)
    // Existing context ignores new attrs — still returns the live context.
    if (!gl) continue

    const prev = new Float32Array(
      gl.getParameter(gl.COLOR_CLEAR_VALUE) as Float32Array
    )
    gl.clearColor(0, 0, 0, 0)

    const state = readR3fState(canvas)
    if (state?.gl?.setClearColor) {
      try {
        state.gl.setClearColor(0x000000, 0)
        if (state.gl.render && state.scene && state.camera) {
          state.gl.render(state.scene, state.camera)
        } else {
          state.invalidate?.()
          state.advance?.(performance.now(), true)
        }
      } catch {
        /* ignore */
      }
    }

    restores.push(() => {
      gl.clearColor(prev[0]!, prev[1]!, prev[2]!, prev[3]!)
    })
  }

  return () => {
    for (const fn of restores) fn()
  }
}

/**
 * Synchronously copy each canvas into a PNG data URL before the browser
 * clears a preserveDrawingBuffer:false backbuffer.
 */
function snapshotCanvases(root: HTMLElement): Map<HTMLCanvasElement, string> {
  const map = new Map<HTMLCanvasElement, string>()
  for (const canvas of root.querySelectorAll("canvas")) {
    if (canvas.width < 1 || canvas.height < 1) continue
    try {
      const state = readR3fState(canvas)
      if (state?.gl?.render && state.scene && state.camera) {
        state.gl.setClearColor?.(0x000000, 0)
        state.gl.render(state.scene, state.camera)
      }
    } catch {
      /* ignore */
    }
    try {
      map.set(canvas, canvas.toDataURL("image/png"))
      continue
    } catch {
      /* try 2d blit */
    }
    try {
      const tmp = document.createElement("canvas")
      tmp.width = canvas.width
      tmp.height = canvas.height
      const ctx = tmp.getContext("2d", { alpha: true })
      if (!ctx) continue
      ctx.clearRect(0, 0, tmp.width, tmp.height)
      ctx.drawImage(canvas, 0, 0)
      map.set(canvas, tmp.toDataURL("image/png"))
    } catch {
      /* skip */
    }
  }
  return map
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  const img = new Image()
  img.decoding = "async"
  img.src = src
  await img.decode()
  return img
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("PNG encode failed"))),
        "image/png"
      )
    } catch (err) {
      reject(err)
    }
  })
}

function isSafeImageSrc(src: string): boolean {
  if (src.startsWith("data:")) return true
  if (src.startsWith("blob:")) return false
  try {
    return new URL(src, window.location.href).origin === window.location.origin
  } catch {
    return false
  }
}

function extractCssUrls(value: string): string[] {
  const out: string[] = []
  const re = /url\(\s*(['"]?)([^)'"]+)\1\s*\)/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(value))) {
    const raw = m[2]?.trim()
    if (raw) out.push(raw)
  }
  return out
}

async function inlineSafeUrls(value: string): Promise<string> {
  if (!/url\s*\(/i.test(value)) return value
  let next = value
  for (const raw of extractCssUrls(value)) {
    if (raw.startsWith("data:")) continue
    if (!isSafeImageSrc(raw)) {
      next = next.replace(
        new RegExp(
          `url\\(\\s*(['"]?)${raw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\1\\s*\\)`,
          "gi"
        ),
        "none"
      )
      continue
    }
    try {
      const abs = new URL(raw, window.location.href).href
      const res = await fetch(abs)
      if (!res.ok) throw new Error(String(res.status))
      const blob = await res.blob()
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result))
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(blob)
      })
      next = next.split(raw).join(dataUrl)
    } catch {
      next = next.replace(
        new RegExp(
          `url\\(\\s*(['"]?)${raw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\1\\s*\\)`,
          "gi"
        ),
        "none"
      )
    }
  }
  return next
}

async function safeCssValue(prop: string, value: string): Promise<string> {
  if (!value) return value
  if (/url\s*\(/i.test(value)) {
    if (prop.startsWith("background") || prop === "border-image") {
      if (prop.includes("color")) return "transparent"
      return inlineSafeUrls(value)
    }
    if (prop.includes("font")) return "system-ui, sans-serif"
  }
  return value
}

function canvasCoverage(root: HTMLElement): number {
  const rootRect = root.getBoundingClientRect()
  const area = Math.max(1, rootRect.width * rootRect.height)
  let covered = 0
  for (const c of root.querySelectorAll("canvas")) {
    const r = c.getBoundingClientRect()
    covered += Math.max(0, r.width) * Math.max(0, r.height)
  }
  return covered / area
}

/**
 * FO cannot paint CSS 3D (image-marquee perspective / rotateX / rotateZ).
 * Do NOT key off "many imgs" alone — card strips like scroll-trigger have
 * lots of avatars but need FO so text / borders / bg-card stay in the shot.
 */
function needsVisualDomCapture(root: HTMLElement): boolean {
  const styleBlob = (el: HTMLElement) =>
    `${el.getAttribute("style") ?? ""} ${el.className}`

  for (const node of [root, ...root.querySelectorAll("*")]) {
    if (!(node instanceof HTMLElement)) continue
    if (
      /perspective|preserve-3d|rotateX|rotateY|rotateZ|matrix3d/i.test(
        styleBlob(node)
      )
    ) {
      return true
    }
    try {
      const cs = getComputedStyle(node)
      if (cs.perspective !== "none") return true
      if (cs.transformStyle === "preserve-3d") return true
      if (cs.transform.includes("matrix3d")) return true
    } catch {
      /* ignore */
    }
  }
  return false
}

/**
 * True cylinder / ring (cards stacked in one cell with translateZ).
 * Row marquees with mild rotateY (angled-slider) are NOT orbital.
 */
function isOrbitalCss3dStage(root: HTMLElement): boolean {
  if (root.querySelectorAll("img").length < 4) return false
  let perspective = false
  let translateZ = false
  let stackedCell = false
  for (const node of [root, ...root.querySelectorAll("*")]) {
    if (!(node instanceof HTMLElement)) continue
    const blob = `${node.getAttribute("style") ?? ""} ${node.className}`
    if (/translateZ\(/i.test(blob)) translateZ = true
    if (/col-start-1|row-start-1/.test(blob)) stackedCell = true
    try {
      const cs = getComputedStyle(node)
      if (cs.perspective !== "none") perspective = true
      if (/translateZ\(/i.test(cs.transform)) translateZ = true
    } catch {
      /* ignore */
    }
  }
  return perspective && translateZ && stackedCell
}

type BoxQuad = {
  p1: { x: number; y: number }
  p2: { x: number; y: number }
  p3: { x: number; y: number }
  p4: { x: number; y: number }
}

function readBoxQuad(
  el: HTMLElement,
  relativeTo: HTMLElement
): BoxQuad | null {
  const host = el as HTMLElement & {
    getBoxQuads?: (opts?: { relativeTo?: Element }) => BoxQuad[]
  }
  if (typeof host.getBoxQuads !== "function") return null
  try {
    const quads = host.getBoxQuads({ relativeTo })
    const q = quads?.[0]
    if (!q?.p1 || !q?.p2 || !q?.p3 || !q?.p4) return null
    return q
  } catch {
    return null
  }
}

/** Affine-map an image onto one triangle of a projected CSS 3D face. */
function fillTexTriangle(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  // destination
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  // source
  u0: number,
  v0: number,
  u1: number,
  v1: number,
  u2: number,
  v2: number
) {
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.closePath()
  ctx.clip()

  // Solve affine map from uv → xy for the triangle.
  const denom =
    u0 * (v1 - v2) + u1 * (v2 - v0) + u2 * (v0 - v1)
  if (Math.abs(denom) < 1e-6) {
    ctx.restore()
    return
  }
  const a = (x0 * (v1 - v2) + x1 * (v2 - v0) + x2 * (v0 - v1)) / denom
  const b = (x0 * (u2 - u1) + x1 * (u0 - u2) + x2 * (u1 - u0)) / denom
  const c =
    (x0 * (u1 * v2 - u2 * v1) +
      x1 * (u2 * v0 - u0 * v2) +
      x2 * (u0 * v1 - u1 * v0)) /
    denom
  const d = (y0 * (v1 - v2) + y1 * (v2 - v0) + y2 * (v0 - v1)) / denom
  const e = (y0 * (u2 - u1) + y1 * (u0 - u2) + y2 * (u1 - u0)) / denom
  const f =
    (y0 * (u1 * v2 - u2 * v1) +
      y1 * (u2 * v0 - u0 * v2) +
      y2 * (u0 * v1 - u1 * v0)) /
    denom

  ctx.setTransform(a, d, b, e, c, f)
  ctx.drawImage(img, 0, 0)
  ctx.restore()
}

function drawImageOnQuad(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  quad: BoxQuad,
  scale: number,
  iw: number,
  ih: number
) {
  const s = (p: { x: number; y: number }) => ({
    x: p.x * scale,
    y: p.y * scale,
  })
  const p1 = s(quad.p1)
  const p2 = s(quad.p2)
  const p3 = s(quad.p3)
  const p4 = s(quad.p4)
  // p1→p2→p3→p4 typically TL→TR→BR→BL
  fillTexTriangle(
    ctx,
    img,
    p1.x,
    p1.y,
    p2.x,
    p2.y,
    p4.x,
    p4.y,
    0,
    0,
    iw,
    0,
    0,
    ih
  )
  fillTexTriangle(
    ctx,
    img,
    p2.x,
    p2.y,
    p3.x,
    p3.y,
    p4.x,
    p4.y,
    iw,
    0,
    iw,
    ih,
    0,
    ih
  )
}

/** Pause hover-driven motion (e.g. 3d-image-slider) for a stable frame. */
function pauseHoverMotion(root: HTMLElement): () => void {
  const targets = new Set<HTMLElement>([root])
  for (const el of root.querySelectorAll(
    '[aria-label*="cylinder" i], [aria-label*="carousel" i], [style*="perspective"]'
  )) {
    if (el instanceof HTMLElement) targets.add(el)
  }
  for (const el of targets) {
    el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }))
  }
  return () => {
    for (const el of targets) {
      el.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }))
    }
  }
}

function parseRadiusPx(value: string, fallback = 8): number {
  const m = /^([\d.]+)px/.exec(value.trim())
  if (!m) return fallback
  return Math.max(0, Number(m[1]) || fallback)
}

function isPlausibleOrbitalCard(r: DOMRectReadOnly, root: DOMRectReadOnly) {
  if (r.width < 28 || r.height < 36) return false
  // Edge-on / back faces project to extreme AABBs — drop them.
  if (r.width > root.width * 0.7) return false
  if (r.height > root.height * 0.92) return false
  const aspect = r.width / r.height
  // Cards are portrait (~3/4); perspective may squeeze width a bit.
  if (aspect < 0.38 || aspect > 1.35) return false
  return true
}

/**
 * Composite visible imgs at their *screen* boxes (post-transform).
 * Correct for CSS 3D stages where foreignObject collapses to a corner.
 * Orbital cylinders: keep front-ish cards and preserve native aspect (no AABB stretch).
 */
async function captureVisualDom(
  root: HTMLElement,
  width: number,
  height: number,
  scale: number
): Promise<HTMLCanvasElement> {
  const rootRect = root.getBoundingClientRect()
  const out = document.createElement("canvas")
  out.width = Math.max(1, Math.round(width * scale))
  out.height = Math.max(1, Math.round(height * scale))
  const ctx = out.getContext("2d", { alpha: true })
  if (!ctx) throw new Error("2d context unavailable")
  ctx.clearRect(0, 0, out.width, out.height)

  const orbital = isOrbitalCss3dStage(root)

  let imgs = Array.from(root.querySelectorAll("img")).filter((img) => {
    if (!(img instanceof HTMLImageElement)) return false
    const r = img.getBoundingClientRect()
    if (r.width < 2 || r.height < 2) return false
    const cs = getComputedStyle(img)
    if (cs.visibility === "hidden" || cs.display === "none") return false
    if (Number(cs.opacity) < 0.05) return false
    if (orbital && !isPlausibleOrbitalCard(r, rootRect)) return false
    return true
  })

  if (orbital) {
    // Farther (smaller) first, nearer on top.
    imgs = imgs.sort((a, b) => {
      const ra = a.getBoundingClientRect()
      const rb = b.getBoundingClientRect()
      return ra.width * ra.height - rb.width * rb.height
    })
  }

  for (const img of imgs) {
    const r = img.getBoundingClientRect()
    const card =
      img.closest<HTMLElement>("[class*='rounded']") ?? img.parentElement
    const nativeW = Math.max(
      1,
      card?.offsetWidth || img.offsetWidth || r.width
    )
    const nativeH = Math.max(
      1,
      card?.offsetHeight || img.offsetHeight || r.height
    )
    const nativeAspect = nativeW / nativeH
    const src = img.currentSrc || img.src
    if (!src || !isSafeImageSrc(src)) continue

    let bitmap: CanvasImageSource = img
    try {
      if (!(img.complete && img.naturalWidth > 0)) {
        bitmap = await loadImage(src)
      }
    } catch {
      continue
    }

    // Prefer projected quads so rotateY / bend keep their angle (Firefox; some Chromium).
    const quadEl = card ?? img
    const quad = readBoxQuad(quadEl, root)
    if (quad) {
      const iw =
        bitmap instanceof HTMLImageElement
          ? bitmap.naturalWidth || nativeW
          : nativeW
      const ih =
        bitmap instanceof HTMLImageElement
          ? bitmap.naturalHeight || nativeH
          : nativeH
      try {
        drawImageOnQuad(ctx, bitmap, quad, scale, iw, ih)
        continue
      } catch {
        /* fall through to AABB */
      }
    }

    let w: number
    let h: number
    let x: number
    let y: number

    if (orbital) {
      h = r.height * scale
      w = h * nativeAspect
      if (w > r.width * scale * 1.08) {
        w = r.width * scale
        h = w / nativeAspect
      }
      x = (r.left - rootRect.left) * scale + (r.width * scale - w) / 2
      y = (r.top - rootRect.top) * scale + (r.height * scale - h) / 2
    } else {
      x = (r.left - rootRect.left) * scale
      y = (r.top - rootRect.top) * scale
      w = r.width * scale
      h = r.height * scale
    }

    if (x + w < 0 || y + h < 0 || x > out.width || y > out.height) continue

    const radiusCs = card ? getComputedStyle(card) : getComputedStyle(img)
    const radius =
      parseRadiusPx(radiusCs.borderRadius, orbital ? 12 : 8) * scale

    const pathRound = () => {
      ctx.beginPath()
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(x, y, w, h, radius)
      } else {
        ctx.rect(x, y, w, h)
      }
      ctx.closePath()
    }

    ctx.save()
    ctx.shadowColor = "rgba(15, 23, 42, 0.28)"
    ctx.shadowBlur = (orbital ? 22 : 18) * scale
    ctx.shadowOffsetY = (orbital ? 10 : 8) * scale
    pathRound()
    ctx.fillStyle = "rgba(15, 23, 42, 0.06)"
    ctx.fill()
    ctx.restore()

    ctx.save()
    pathRound()
    ctx.clip()
    try {
      ctx.drawImage(bitmap, x, y, w, h)
    } catch {
      /* skip */
    }
    ctx.restore()
  }

  for (const canvas of root.querySelectorAll("canvas")) {
    const r = canvas.getBoundingClientRect()
    if (r.width < 2 || r.height < 2) continue
    try {
      ctx.drawImage(
        canvas,
        (r.left - rootRect.left) * scale,
        (r.top - rootRect.top) * scale,
        r.width * scale,
        r.height * scale
      )
    } catch {
      /* skip */
    }
  }

  ctx.getImageData(0, 0, 1, 1)
  return out
}

/** Composite WebGL/2d canvases (+ same-origin imgs) onto a transparent bitmap. */
async function captureCanvasDominant(
  root: HTMLElement,
  width: number,
  height: number,
  scale: number,
  canvasSnaps: Map<HTMLCanvasElement, string>
): Promise<HTMLCanvasElement> {
  const rootRect = root.getBoundingClientRect()
  const out = document.createElement("canvas")
  out.width = Math.max(1, Math.round(width * scale))
  out.height = Math.max(1, Math.round(height * scale))
  const ctx = out.getContext("2d", { alpha: true })
  if (!ctx) throw new Error("2d context unavailable")
  ctx.clearRect(0, 0, out.width, out.height)

  const drawSrc = async (
    src: string,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    const image = await loadImage(src)
    ctx.drawImage(image, x * scale, y * scale, w * scale, h * scale)
  }

  for (const canvas of root.querySelectorAll("canvas")) {
    const r = canvas.getBoundingClientRect()
    if (r.width < 1 || r.height < 1) continue
    const snap = canvasSnaps.get(canvas)
    if (!snap) continue
    try {
      await drawSrc(
        snap,
        r.left - rootRect.left,
        r.top - rootRect.top,
        r.width,
        r.height
      )
    } catch {
      /* skip */
    }
  }

  for (const img of root.querySelectorAll("img")) {
    const r = img.getBoundingClientRect()
    if (r.width < 1 || r.height < 1) continue
    const src = img.currentSrc || img.src
    if (!src || !isSafeImageSrc(src)) continue
    try {
      await drawSrc(
        src,
        r.left - rootRect.left,
        r.top - rootRect.top,
        r.width,
        r.height
      )
    } catch {
      /* skip */
    }
  }

  ctx.getImageData(0, 0, 1, 1)
  return out
}

/** DOM-only path (beam-circle etc.) — FO once, no SVG restamp. */
async function captureDomOnly(
  root: HTMLElement,
  width: number,
  height: number,
  scale: number,
  canvasSnaps: Map<HTMLCanvasElement, string>
): Promise<HTMLCanvasElement> {
  const clone = root.cloneNode(true) as HTMLElement

  const liveCanvases = Array.from(root.querySelectorAll("canvas"))
  const cloneCanvases = Array.from(clone.querySelectorAll("canvas"))
  for (let i = 0; i < liveCanvases.length; i++) {
    const live = liveCanvases[i]
    const dead = cloneCanvases[i]
    if (!live || !(dead instanceof HTMLCanvasElement)) continue
    const snap = canvasSnaps.get(live)
    if (!snap) {
      dead.remove()
      continue
    }
    const img = document.createElement("img")
    img.src = snap
    img.style.cssText = `width:${live.clientWidth}px;height:${live.clientHeight}px;display:block;`
    dead.replaceWith(img)
  }

  const liveImgs = Array.from(root.querySelectorAll("img"))
  const cloneImgs = Array.from(clone.querySelectorAll("img"))
  for (let i = 0; i < liveImgs.length; i++) {
    const live = liveImgs[i]
    const dead = cloneImgs[i]
    if (!live || !(dead instanceof HTMLImageElement)) continue
    const src = live.currentSrc || live.src
    if (!isSafeImageSrc(src)) {
      dead.remove()
      continue
    }
    if (src.startsWith("data:")) continue
    try {
      const c = document.createElement("canvas")
      c.width = live.naturalWidth || live.clientWidth
      c.height = live.naturalHeight || live.clientHeight
      const cctx = c.getContext("2d")
      if (!cctx || c.width < 1 || c.height < 1) {
        dead.remove()
        continue
      }
      cctx.drawImage(live, 0, 0)
      dead.src = c.toDataURL("image/png")
      dead.removeAttribute("srcset")
    } catch {
      dead.remove()
    }
  }

  const walkLive: HTMLElement[] = []
  const walkClone: HTMLElement[] = []
  const collect = (live: HTMLElement, cloned: HTMLElement) => {
    walkLive.push(live)
    walkClone.push(cloned)
    const liveKids = Array.from(live.children) as HTMLElement[]
    const cloneKids = Array.from(cloned.children) as HTMLElement[]
    for (let i = 0; i < Math.min(liveKids.length, cloneKids.length); i++) {
      collect(liveKids[i]!, cloneKids[i]!)
    }
  }
  collect(root, clone)

  const props = [
    "color",
    "opacity",
    "font-size",
    "font-weight",
    "font-family",
    "line-height",
    "letter-spacing",
    "text-align",
    "border",
    "border-top",
    "border-right",
    "border-bottom",
    "border-left",
    "border-radius",
    "box-shadow",
    "padding",
    "margin",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "display",
    "flex-direction",
    "align-items",
    "justify-content",
    "flex-wrap",
    "gap",
    "row-gap",
    "column-gap",
    "transform",
    "transform-origin",
    "filter",
    "overflow",
    "position",
    "top",
    "left",
    "right",
    "bottom",
    "inset",
    "z-index",
    "object-fit",
    "background-color",
    "background",
    "background-image",
    "border-style",
    "border-width",
    "border-color",
    "outline",
  ] as const

  for (let i = 0; i < walkLive.length; i++) {
    const live = walkLive[i]!
    const cloned = walkClone[i]!
    const cs = getComputedStyle(live)
    for (const prop of props) {
      cloned.style.setProperty(
        prop,
        await safeCssValue(prop, cs.getPropertyValue(prop))
      )
    }
    cloned.style.setProperty(
      "font-family",
      "system-ui, -apple-system, Segoe UI, sans-serif"
    )
  }

  // After style copy — drop chrome so FO has no arrows/buttons.
  for (const node of clone.querySelectorAll(IGNORE_SELECTOR)) {
    node.remove()
  }

  clone.style.setProperty("background", "transparent", "important")
  clone.style.setProperty("background-color", "transparent", "important")
  clone.style.setProperty("width", `${width}px`)
  clone.style.setProperty("height", `${height}px`)

  const xhtml = new XMLSerializer().serializeToString(clone)
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width * scale}" height="${height * scale}">` +
    `<foreignObject x="0" y="0" width="${width}" height="${height}" transform="scale(${scale})">` +
    `<div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;height:${height}px;background:transparent;">` +
    xhtml +
    `</div></foreignObject></svg>`

  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  const img = await loadImage(url)
  const out = document.createElement("canvas")
  out.width = Math.max(1, Math.round(width * scale))
  out.height = Math.max(1, Math.round(height * scale))
  const ctx = out.getContext("2d", { alpha: true })
  if (!ctx) throw new Error("2d context unavailable")
  ctx.clearRect(0, 0, out.width, out.height)
  ctx.drawImage(img, 0, 0)
  ctx.getImageData(0, 0, 1, 1)
  return out
}

/** Trim near-transparent padding. */
function trimTransparent(source: HTMLCanvasElement): HTMLCanvasElement {
  const ctx = source.getContext("2d", { alpha: true })
  if (!ctx) return source
  const { width, height } = source
  const data = ctx.getImageData(0, 0, width, height).data
  let top = height
  let left = width
  let right = 0
  let bottom = 0
  const alphaMin = 8

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = data[(y * width + x) * 4 + 3]!
      if (a > alphaMin) {
        if (y < top) top = y
        if (y > bottom) bottom = y
        if (x < left) left = x
        if (x > right) right = x
      }
    }
  }

  if (right < left || bottom < top) return source

  const pad = 4
  left = Math.max(0, left - pad)
  top = Math.max(0, top - pad)
  right = Math.min(width - 1, right + pad)
  bottom = Math.min(height - 1, bottom + pad)

  const tw = right - left + 1
  const th = bottom - top + 1
  const out = document.createElement("canvas")
  out.width = tw
  out.height = th
  const octx = out.getContext("2d", { alpha: true })
  if (!octx) return source
  octx.clearRect(0, 0, tw, th)
  octx.drawImage(source, left, top, tw, th, 0, 0, tw, th)
  return out
}

function nudgeWebglFrames(root: HTMLElement) {
  for (const canvas of root.querySelectorAll("canvas")) {
    const r = canvas.getBoundingClientRect()
    if (r.width < 1 || r.height < 1) continue
    const cx = r.left + r.width * 0.45
    const cy = r.top + r.height * 0.5
    try {
      canvas.dispatchEvent(
        new PointerEvent("pointermove", {
          bubbles: true,
          clientX: cx,
          clientY: cy,
          pointerType: "mouse",
          pointerId: 1,
          isPrimary: true,
        })
      )
    } catch {
      /* ignore */
    }
  }
}

/**
 * @param frameEl - preview frame from VariantPreview (or any ancestor)
 */
export async function downloadTransparentPreviewPng(
  frameEl: HTMLElement,
  filename: string
) {
  const root = resolveCaptureRoot(frameEl)
  const restoreBg = forceTransparentStage(root)
  const restoreChrome = hideCaptureChrome(root)
  const restoreGl = prepareWebglAlpha(root)
  const restoreMotion = pauseHoverMotion(root)

  await rAF()
  nudgeWebglFrames(root)
  await rAF()
  const canvasSnaps = snapshotCanvases(root)

  try {
    const rect = root.getBoundingClientRect()
    const width = Math.max(1, Math.ceil(rect.width))
    const height = Math.max(1, Math.ceil(rect.height))
    const scale = Math.min(2, Math.max(1, window.devicePixelRatio || 1))

    const dominant = canvasCoverage(root) >= 0.4
    const visualDom = !dominant && needsVisualDomCapture(root)
    let captured: HTMLCanvasElement

    if (dominant) {
      captured = await captureCanvasDominant(
        root,
        width,
        height,
        scale,
        canvasSnaps
      )
    } else if (visualDom) {
      try {
        captured = await captureVisualDom(root, width, height, scale)
      } catch {
        captured = await captureDomOnly(
          root,
          width,
          height,
          scale,
          canvasSnaps
        )
      }
    } else {
      try {
        captured = await captureDomOnly(
          root,
          width,
          height,
          scale,
          canvasSnaps
        )
      } catch {
        try {
          captured = await captureVisualDom(root, width, height, scale)
        } catch {
          captured = await captureCanvasDominant(
            root,
            width,
            height,
            scale,
            canvasSnaps
          )
        }
      }
    }

    const trimmed = trimTransparent(captured)
    const blob = await canvasToBlob(trimmed)
    downloadBlob(blob, filename.endsWith(".png") ? filename : `${filename}.png`)
  } finally {
    restoreGl()
    restoreChrome()
    restoreBg()
    restoreMotion()
  }
}
