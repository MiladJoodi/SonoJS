import * as THREE from "three"

let cached: THREE.TubeGeometry | null = null

/** One shared chrome hanger geometry — classic dry-cleaner silhouette */
export function getHangerGeometry() {
  if (cached && (cached.parameters as { radius?: number }).radius === 0.014) {
    return cached
  }
  if (cached) {
    cached.dispose()
    cached = null
  }

  const pts: THREE.Vector3[] = []

  const hr = 0.052
  const hy = 0.108
  for (let i = 0; i <= 40; i++) {
    const t = i / 40
    const a = Math.PI * 0.25 + t * Math.PI * 1.8
    pts.push(
      new THREE.Vector3(
        Math.cos(a) * hr * 0.48,
        hy + Math.sin(a) * hr,
        Math.sin(a) * hr * 0.18
      )
    )
  }

  pts.push(new THREE.Vector3(0.008, 0.05, 0))
  pts.push(new THREE.Vector3(0, 0.0, 0))
  pts.push(new THREE.Vector3(0, -0.06, 0))

  pts.push(new THREE.Vector3(-0.16, -0.26, 0))
  pts.push(new THREE.Vector3(-0.34, -0.5, 0))
  pts.push(new THREE.Vector3(-0.4, -0.6, 0))

  pts.push(new THREE.Vector3(-0.2, -0.618, 0))
  pts.push(new THREE.Vector3(0, -0.62, 0))
  pts.push(new THREE.Vector3(0.2, -0.618, 0))
  pts.push(new THREE.Vector3(0.4, -0.6, 0))

  pts.push(new THREE.Vector3(0.34, -0.5, 0))
  pts.push(new THREE.Vector3(0.16, -0.26, 0))
  pts.push(new THREE.Vector3(0, -0.06, 0))

  const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.18)
  cached = new THREE.TubeGeometry(curve, 200, 0.014, 14, false)
  return cached
}

export const HANGER_BAR_Y = -0.62
