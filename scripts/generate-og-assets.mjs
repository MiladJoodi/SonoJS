/**
 * Build committed social/share icons from source art.
 * - public/og.png: 1200×630, contain (no stretch/blind crop) on dark hero canvas
 * - public/apple-touch-icon.png: 180×180 from logo.svg
 *
 * Run: node scripts/generate-og-assets.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const sharp = require("sharp")

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const demoPath = path.join(root, "public/images/logos/demo.png")
const logoPath = path.join(root, "public/images/logos/logo.svg")
const ogPath = path.join(root, "public/og.png")
const applePath = path.join(root, "public/apple-touch-icon.png")

/** Matches SonoJS dark hero / OG canvas (not white letterbox). */
const CANVAS = { r: 11, g: 18, b: 32, alpha: 1 }

async function writeOg() {
  const meta = await sharp(demoPath).metadata()
  if (meta.width !== 1200 || meta.height !== 807) {
    console.warn(
      `demo.png is ${meta.width}×${meta.height}; expected 1200×807 — continuing with contain`
    )
  }

  // Full artwork fits inside 1200×630 without distortion; dark bars fill the gap.
  await sharp(demoPath)
    .resize(1200, 630, {
      fit: "contain",
      background: CANVAS,
      withoutEnlargement: false,
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(ogPath)

  const out = await sharp(ogPath).metadata()
  if (out.width !== 1200 || out.height !== 630) {
    throw new Error(`og.png must be 1200×630, got ${out.width}×${out.height}`)
  }
  const size = fs.statSync(ogPath).size
  console.log(`wrote public/og.png (${out.width}×${out.height}, ${size} bytes)`)
}

async function writeAppleTouch() {
  const svg = fs.readFileSync(logoPath)
  const icon = await sharp(svg)
    .resize(128, 144, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer()

  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: CANVAS,
    },
  })
    .composite([{ input: icon, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toFile(applePath)

  const out = await sharp(applePath).metadata()
  if (out.width !== 180 || out.height !== 180) {
    throw new Error(
      `apple-touch-icon must be 180×180, got ${out.width}×${out.height}`
    )
  }
  console.log(`wrote public/apple-touch-icon.png (${out.width}×${out.height})`)
}

await writeOg()
await writeAppleTouch()
