import * as THREE from "three"

/** Elongated oval matching the dry-cleaning conveyor */
export const RACK_RX = 3.1
export const RACK_RZ = 1.7
export const RACK_Y = 2.35

export function ellipsePoint(angle: number, rx = RACK_RX, rz = RACK_RZ) {
  return new THREE.Vector3(Math.cos(angle) * rx, 0, Math.sin(angle) * rz)
}

export function ellipseTangent(angle: number, rx = RACK_RX, rz = RACK_RZ) {
  const tx = -Math.sin(angle) * rx
  const tz = Math.cos(angle) * rz
  return new THREE.Vector3(tx, 0, tz).normalize()
}

export function makeEllipseTube(radius: number, y = 0, tubularSegments = 200) {
  const curve = new THREE.EllipseCurve(
    0,
    0,
    RACK_RX,
    RACK_RZ,
    0,
    Math.PI * 2,
    false,
    0
  )
  const pts = curve
    .getPoints(tubularSegments)
    .map((p) => new THREE.Vector3(p.x, y, p.y))
  const path = new THREE.CatmullRomCurve3(pts, true)
  return new THREE.TubeGeometry(path, tubularSegments, radius, 20, true)
}
