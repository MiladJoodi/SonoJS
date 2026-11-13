import * as THREE from "three"

import type { HangingBagItem } from "./projects"

/** High-res so cards stay smooth when close / angled */
const W = 1024
const H = 1440
const S = W / 640

const SANS =
  'Geist, "Geist Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'
const STAMP =
  '"Permanent Marker", "Comic Sans MS", "Segoe Print", cursive'

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const rr = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + rr, y)
  ctx.arcTo(x + w, y, x + w, y + h, rr)
  ctx.arcTo(x + w, y + h, x, y + h, rr)
  ctx.arcTo(x, y + h, x, y, rr)
  ctx.arcTo(x, y, x + w, y, rr)
  ctx.closePath()
}

function drawBarcode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  seed: number
) {
  let cx = x
  let n = seed
  while (cx < x + w) {
    n = (n * 16807) % 2147483647
    const bw = 1 + (n % 3)
    ctx.fillStyle = "#1e293b"
    ctx.fillRect(cx, y, bw * S * 0.7, h)
    n = (n * 16807) % 2147483647
    cx += (bw + 1 + (n % 2)) * S * 0.7
  }
}

export function createCardTexture(project: HangingBagItem) {
  const canvas = document.createElement("canvas")
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext("2d", { alpha: false })!

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"

  ctx.fillStyle = project.color
  ctx.fillRect(0, 0, W, H)

  for (let i = 0; i < 2800; i++) {
    ctx.fillStyle = `rgba(255,255,255,${(i % 6) * 0.003})`
    ctx.fillRect((i * 97) % W, (i * 53) % H, 2, 2)
  }

  ctx.strokeStyle = "rgba(255,255,255,0.35)"
  ctx.lineWidth = 4
  ctx.strokeRect(10, 10, W - 20, H - 20)

  ctx.fillStyle = "#2563eb"
  roundRect(ctx, 52, 52, 236, 64, 16)
  ctx.fill()
  ctx.fillStyle = "#ffffff"
  ctx.font = `700 ${32 * S * 0.55}px ${SANS}`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("PROJECT", 170, 85)

  ctx.fillStyle = "#64748b"
  ctx.font = `500 ${26 * S * 0.55}px ${SANS}`
  ctx.textAlign = "right"
  ctx.fillText(`${project.start} — ${project.end}`, W - 52, 85)

  ctx.fillStyle = "#e11d48"
  ctx.font = `700 ${78 * S * 0.9}px ${SANS}`
  ctx.textAlign = "left"
  ctx.textBaseline = "alphabetic"
  ctx.fillText(project.id, 52, 230)

  ctx.fillStyle = project.ink
  ctx.font = `700 ${28 * S * 0.85}px ${SANS}`
  ctx.fillText(project.name, 52, 300)

  ctx.strokeStyle = "rgba(37, 99, 235, 0.28)"
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(52, 340)
  ctx.lineTo(W - 52, 340)
  ctx.stroke()

  const meta = [
    ["CLIENT", project.client],
    ["LEAD", project.lead],
    ["CLIENT ID", project.id.replace("P ", "C-")],
    ["WORK ORDER", `WO-${project.id.replace(/\D/g, "")}`],
  ] as const

  meta.forEach(([label, value], i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    const x = 52 + col * 450
    const y = 410 + row * 120
    ctx.fillStyle = "#64748b"
    ctx.font = `600 ${20 * S * 0.6}px ${SANS}`
    ctx.textAlign = "left"
    ctx.fillText(label, x, y)
    ctx.fillStyle = "#0f172a"
    ctx.font = `600 ${36 * S * 0.6}px ${SANS}`
    ctx.fillText(value, x, y + 48)
  })

  const tableY = 690
  ctx.fillStyle = "#64748b"
  ctx.font = `600 ${20 * S * 0.6}px ${SANS}`
  ctx.fillText("QTY", 52, tableY)
  ctx.fillText("DESCRIPTION", 170, tableY)
  ctx.textAlign = "right"
  ctx.fillText("AMOUNT", W - 52, tableY)

  ctx.strokeStyle = "rgba(100,116,139,0.35)"
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(52, tableY + 18)
  ctx.lineTo(W - 52, tableY + 18)
  ctx.stroke()

  project.lines.forEach((line, i) => {
    const y = tableY + 70 + i * 64
    ctx.fillStyle = "#0f172a"
    ctx.font = `500 ${30 * S * 0.6}px ${SANS}`
    ctx.textAlign = "left"
    ctx.fillText(line.qty, 52, y)
    ctx.fillText(line.description, 170, y)
    ctx.textAlign = "right"
    ctx.fillText(line.amount, W - 52, y)
  })

  ctx.textAlign = "left"
  ctx.fillStyle = "#94a3b8"
  ctx.font = `600 ${20 * S * 0.6}px ${SANS}`
  ctx.fillText("WORK ORDER", 52, H - 90)
  const seed = Number(project.id.replace(/\D/g, "")) || 1000
  drawBarcode(ctx, W - 340, H - 130, 270, 48, seed)

  ctx.save()
  ctx.translate(W * 0.54, H * 0.58)
  ctx.rotate((project.status.angle * Math.PI) / 180)
  ctx.globalAlpha = 0.78
  ctx.strokeStyle = project.status.color
  ctx.fillStyle = project.status.color
  ctx.lineWidth = 10
  ctx.lineJoin = "round"
  roundRect(ctx, -280, -76, 560, 152, 14)
  ctx.stroke()
  ctx.lineWidth = 3.5
  roundRect(ctx, -260, -60, 520, 120, 10)
  ctx.stroke()
  ctx.font = `700 ${90 * S * 0.55}px ${STAMP}`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(project.status.label, 0, 6)
  ctx.restore()

  const sheen = ctx.createLinearGradient(0, 0, W, H)
  sheen.addColorStop(0, "rgba(255,255,255,0.14)")
  sheen.addColorStop(0.4, "rgba(255,255,255,0)")
  sheen.addColorStop(1, "rgba(255,255,255,0.08)")
  ctx.fillStyle = sheen
  ctx.fillRect(0, 0, W, H)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.anisotropy = 16
  texture.needsUpdate = true
  return texture
}
