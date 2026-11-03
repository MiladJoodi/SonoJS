// Garments, hangers and the rail for the Clothes Rack, built in three.js.
//
// How a garment is made: each kind (a tee, a crewneck, a camp shirt) is a real sewing pattern, a front and a back
// panel with the sleeves cut on, sewn along the shoulders, the sleeves and the sides. A cloth simulation drops the
// sewn garment onto the hanger and lets it settle under gravity, so the shoulders rest on the hanger, the sleeves
// droop and the folds come from the cloth itself (scripts/clothes-rack/drape.ts). That draped shape is baked into
// garment-drapes.ts, so nothing is simulated in the browser: the page only decodes it. On top of the shape: a
// physical cloth material with sheen, a fine knit normal map, fold shading from the shape's curvature, a rib collar
// round the neck, and a colour texture drawn on a canvas in the pattern's own coordinates (the fabric, the
// stitching and the print), so a print sits on the chest the way it was placed on the flat pattern. The vertex shader
// bends the cloth with the rows of cloth-motion.ts while the garment moves.
//
// Units: the rail's centre line is the x axis at y = 0, z = 0. A garment hangs about 0.85 units below the rail and
// its front faces +z when its turn group has rotation.y = 0. The hook is a swivel: it stays across the rail while
// the hanger and garment turn under it.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";
import { CLOTH_ROWS } from "./cloth-motion";
import { DRAPES, DRAPE_HANGER, DRAPE_SCALE, type DrapeData, type DrapePanel, type DrapeSleeve } from "./garment-drapes";

export type GarmentKind = "tee" | "crewneck" | "shirt";

export type GarmentPrint =
  /** A big flowing script word or two across the chest. */
  | { kind: "script"; text: string; ink: string }
  /** Stacked bold serif lines across the chest, like a college crewneck. */
  | { kind: "serif"; lines: string[]; ink: string }
  /** A cluster of simple flowers, with an optional script word over it. */
  | { kind: "flowers"; text?: string; ink: string }
  /** A small wordmark on the left chest. */
  | { kind: "chest"; text: string; ink: string }
  /** A sewn-on chest pocket in the same fabric. */
  | { kind: "pocket" }
  /** An all-over leaf pattern in a few colours (the shirt). */
  | { kind: "pattern"; colours: string[] };

export type GarmentSpec = {
  kind: GarmentKind;
  /** The fabric colour, as a hex string. */
  colour: string;
  print?: GarmentPrint;
  /** A transparent PNG or WebP drawn over the front panel instead of the print. */
  image?: string;
};

export type HangerFinish = "wood" | "black" | "chrome";

/**
 * Photographic cloth and light, each optional: tiling scans of knitted cloth (normal and roughness maps; jersey for the
 * tees and the shirt, fleece for the crewneck), a greyscale heather grain (strong on a grey marl, faint on any other
 * colour), and an equirect .hdr studio that lights the cloth and shows in its sheen. Without them the knit is drawn in
 * code and the light is a plain room.
 */
export type GarmentTextures = {
  jerseyNormal?: string;
  jerseyRoughness?: string;
  fleeceNormal?: string;
  fleeceRoughness?: string;
  heatherGrain?: string;
  studio?: string;
};
export type RailFinish = "chrome" | "black" | "brass";

export type Garment = {
  /** Put this on the rail at (x, 0, 0). Its rotation.x swings the hanger on the rail (a pendulum toward or away from you). */
  object: THREE.Group;
  /** The hanger and garment on their swivel hook. rotation.y turns the garment (0 faces the camera). The hook itself does not turn. */
  turn: THREE.Group;
  /** The chrome hook. On the rail it stays across the rail; turn it (rotation.y = PI / 2) to show its curve, e.g. off the rail. */
  hook: THREE.Object3D;
  /** Width of the garment seen from the front, sleeves included. */
  width: number;
  /** Width of the body alone (no sleeves). */
  bodyWidth: number;
  /** Thickness of the garment seen from the side, at the hem where it hangs open widest. */
  depth: number;
  /** Height from the rail to the hem. */
  height: number;
  setHanger(finish: HangerFinish): void;
  /**
   * Bends the cloth like fabric (see cloth-motion.ts). Call it every frame while anything moves, after setting
   * turn.rotation.y. twist: radians each row of cloth has turned past the hanger, from the shoulders (row 0) to the
   * hem; sway: how far each row trails along the rail (garment units, in the rail's frame whatever way the garment is
   * turned); ripple: 0 - 1, a faint wave that runs down the cloth while it moves; time: seconds, for the ripple.
   */
  setCloth(cloth: { twist: ArrayLike<number>; sway: ArrayLike<number>; ripple: number; time: number }): void;
  /**
   * Only for a garment made with { fadeable: true }: "solid" is the normal look; "depth" draws only its depth; "fade"
   * then draws its colour at this opacity on top of that depth, so the whole garment fades as one piece and its own
   * hidden parts (the back, the inside) never show through.
   */
  setPass(pass: "solid" | "depth" | "fade", opacity?: number): void;
  dispose(): void;
};

export type Rail = {
  object: THREE.Object3D;
  setLength(length: number): void;
  setFinish(finish: RailFinish): void;
  dispose(): void;
};

export type Wardrobe = {
  /** fadeable: the garment's materials are made so it can fade in and out with setPass (the detail view's swaps). */
  garment(spec: GarmentSpec, hanger: HangerFinish, options?: { fadeable?: boolean }): Garment;
  rail(length: number, finish: RailFinish): Rail;
  /** The light the cloth is seen in: the studio when one was given and has loaded, else a plain room. Set it as
   * scene.environment once `ready` has settled. */
  readonly environment: THREE.Texture;
  /** Settles when every texture asked for has loaded (or failed). Garments made before then use the drawn knit. */
  ready: Promise<void>;
  /** Adds the house lights (soft key, fill and sky) to a scene. */
  addLights(scene: THREE.Scene): void;
  dispose(): void;
};

type Pt = [number, number];
type Pattern = DrapeData["pattern"];

// ---------------------------------------------------------------- photographic cloth and light

// Each address is loaded once per page and shared: a texture's picture can be uploaded by several renderers (the rack
// and the detail view have one each), so the detail view opens with everything already here. They are small (about
// 460 KB in all) and kept for the life of the page.
const LOADING = new Map<string, Promise<THREE.Texture | null>>();
const LOADED = new Map<string, THREE.Texture>();
function loadOnce(url: string, hdr: boolean): Promise<THREE.Texture | null> {
  let pending = LOADING.get(url);
  if (!pending) {
    pending = new Promise((resolve) => {
      const done = (t: THREE.Texture) => {
        LOADED.set(url, t);
        resolve(t);
      };
      // a file that fails to load leaves the drawn knit or the plain room in its place, and is tried again by the
      // next wardrobe (a rebuild, the detail view) instead of failing for the rest of the page
      const failed = () => {
        LOADING.delete(url);
        resolve(null);
      };
      if (hdr) {
        new HDRLoader().load(
          url,
          (t) => {
            t.mapping = THREE.EquirectangularReflectionMapping;
            done(t);
          },
          undefined,
          failed,
        );
      } else {
        new THREE.TextureLoader().load(
          url,
          (t) => {
            t.wrapS = t.wrapT = THREE.RepeatWrapping;
            t.colorSpace = THREE.NoColorSpace;
            done(t);
          },
          undefined,
          failed,
        );
      }
    });
    LOADING.set(url, pending);
  }
  return pending;
}

// One scan covers about 27 cm of real cloth, a little under a third of a garment unit
const SCAN_TILE = 0.3;
// The scanned studio (a white cyclorama wall on one side, two softboxes and a dark room on the other) is turned so
// the wall is behind the viewer and off to one side: it lights the fronts in the detail view and the sides the rail
// shows, as a big soft source does in a product shot
const STUDIO_TURN = new THREE.Euler(0, 4.2, 0);
// how far a side-on garment's sleeves are blended from open toward hanging down its side (see setCloth)
const HANG_AT_REST = 0.55;
// without the scan, the plain room is turned a quarter so its brightest panel is not straight in front of the cloth
const ROOM_TURN = new THREE.Euler(0, Math.PI / 2, 0);

// ---------------------------------------------------------------- the draped shapes

// One panel: where each point sits on the flat pattern (x, y pairs), where it ended up on the hanger (x, y, z), and
// the triangles
type Panel = { pat: Float32Array; pos: Float32Array; tri: Uint16Array; ao: Uint8Array };

function bytes(b64: string): ArrayBuffer {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
}

// outward: 1 for the front (its pattern is seen from the front), -1 for the back (seen from behind)
function decodePanel(p: DrapePanel, outward: 1 | -1): Panel {
  const pat = Float32Array.from(new Int16Array(bytes(p.pat)), (v) => v / DRAPE_SCALE);
  const pos = Float32Array.from(new Int16Array(bytes(p.pos)), (v) => v / DRAPE_SCALE);
  const tri = new Uint16Array(bytes(p.tri));
  const ao = new Uint8Array(bytes(p.ao));
  // wind every triangle so its face points out of the garment: then the normals agree across the panel, and the
  // inside of the cloth is always the back face
  for (let i = 0; i < tri.length; i += 3) {
    const a = tri[i]!;
    const b = tri[i + 1]!;
    const c = tri[i + 2]!;
    const area = (pat[b * 2]! - pat[a * 2]!) * (pat[c * 2 + 1]! - pat[a * 2 + 1]!) - (pat[c * 2]! - pat[a * 2]!) * (pat[b * 2 + 1]! - pat[a * 2 + 1]!);
    if (area * outward < 0) {
      tri[i + 1] = c;
      tri[i + 2] = b;
    }
  }
  return { pat, pos, tri, ao };
}

// One sleeve: its draped grid, its texture coordinates (round the sleeve, along it from the armhole), its triangles
// and its baked occlusion
function decodeSleeve(sl: DrapeSleeve) {
  const pos = Float32Array.from(new Int16Array(bytes(sl.pos)), (v) => v / DRAPE_SCALE);
  const hang = Float32Array.from(new Int16Array(bytes(sl.hang)), (v) => v / DRAPE_SCALE);
  const uv = Float32Array.from(new Uint16Array(bytes(sl.uv)), (v) => v / 65535);
  return { pos, hang, uv, tri: new Uint16Array(bytes(sl.tri)), ao: new Uint8Array(bytes(sl.ao)), rings: sl.rings, around: sl.around };
}

// The part of the flat pattern a kind's texture covers, in pattern units (the neck corners are at y = 0), and the
// texture's size: about 1180 texels per unit, so a print reads sharp in the detail view
type Box = { x0: number; y0: number; y1: number; w: number; h: number; texW: number; texH: number };
function boxFor(p: Pattern): Box {
  const x1 = Math.max(p.half, p.shoulderX) + 0.02;
  const y1 = 0.03;
  const y0 = -p.length - 0.02;
  const w = 2 * x1;
  const h = y1 - y0;
  const texW = Math.min(1536, Math.round(1180 * w));
  return { x0: -x1, y0, y1, w, h, texW, texH: Math.round((texW * h) / w) };
}

// One panel as geometry: the draped positions, UVs from the flat pattern, and shading baked in as a vertex colour:
// the occlusion baked with the drape, a little more in the hollows between folds, a touch more along the seams
function panelGeometry(panel: Panel, box: Box) {
  const n = panel.pos.length / 3;
  const uv = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    uv[i * 2] = (panel.pat[i * 2]! - box.x0) / box.w;
    uv[i * 2 + 1] = (panel.pat[i * 2 + 1]! - box.y0) / box.h;
  }
  return shadedGeometry(panel.pos, uv, panel.tri, panel.ao);
}

// A piece of cloth as geometry: the draped positions, its texture coordinates, and shading baked in as a vertex colour
function shadedGeometry(P: Float32Array, uv: Float32Array, tri: Uint16Array, ao: Uint8Array) {
  const n = P.length / 3;
  const panel = { tri, ao };
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
  geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  geo.setIndex(new THREE.BufferAttribute(tri, 1));
  geo.computeVertexNormals();
  const normal = geo.attributes.normal as THREE.BufferAttribute;
  // each point's neighbours (for the curvature), and the edges only one triangle uses (the panel's outline)
  const neighbours: number[][] = Array.from({ length: n }, () => []);
  const edgeUse = new Map<number, number>();
  for (let t = 0; t < panel.tri.length; t += 3) {
    for (let k = 0; k < 3; k++) {
      const a = panel.tri[t + k]!;
      const b = panel.tri[t + ((k + 1) % 3)]!;
      const key = a < b ? a * 65536 + b : b * 65536 + a;
      const uses = (edgeUse.get(key) ?? 0) + 1;
      edgeUse.set(key, uses);
      if (uses === 1) {
        neighbours[a]!.push(b);
        neighbours[b]!.push(a);
      }
    }
  }
  const rim = new Uint8Array(n);
  for (const [key, uses] of edgeUse) {
    if (uses !== 1) continue;
    rim[Math.floor(key / 65536)] = 1;
    rim[key % 65536] = 1;
  }
  // how deep each point sits in a hollow: its neighbours' average, measured along its outward normal
  const hollow = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const ns = neighbours[i]!;
    if (!ns.length) continue;
    let lx = 0;
    let ly = 0;
    let lz = 0;
    for (const j of ns) {
      lx += P[j * 3]!;
      ly += P[j * 3 + 1]!;
      lz += P[j * 3 + 2]!;
    }
    lx = lx / ns.length - P[i * 3]!;
    ly = ly / ns.length - P[i * 3 + 1]!;
    lz = lz / ns.length - P[i * 3 + 2]!;
    hollow[i] = Math.max(0, lx * normal.getX(i) + ly * normal.getY(i) + lz * normal.getZ(i));
  }
  // three passes of blur so the shading follows the folds, never the points of the mesh (one pass left the lattice
  // showing as a faint grid of dots on white cloth)
  let depthOf = hollow;
  for (let pass = 0; pass < 3; pass++) {
    const next = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const ns = neighbours[i]!;
      let sum = depthOf[i]! * 2;
      for (const j of ns) sum += depthOf[j]!;
      next[i] = sum / (ns.length + 2);
    }
    depthOf = next;
  }
  // The simulation leaves tiny bumps at the scale of its mesh. They do not change the shape, but a light grazing
  // across white cloth shows them as a grid of dots, so the normals are smoothed over their neighbours.
  const N = normal.array as Float32Array;
  for (let pass = 0; pass < 2; pass++) {
    const next = new Float32Array(N.length);
    for (let i = 0; i < n; i++) {
      let x = N[i * 3]! * 2;
      let y = N[i * 3 + 1]! * 2;
      let z = N[i * 3 + 2]! * 2;
      for (const j of neighbours[i]!) {
        x += N[j * 3]!;
        y += N[j * 3 + 1]!;
        z += N[j * 3 + 2]!;
      }
      const l = Math.hypot(x, y, z) || 1;
      next[i * 3] = x / l;
      next[i * 3 + 1] = y / l;
      next[i * 3 + 2] = z / l;
    }
    N.set(next);
  }
  normal.needsUpdate = true;
  const colors = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const depth = depthOf[i]!;
    // the baked occlusion (under the sleeves, deep in the folds), softened so it never goes black
    let s = (1 - 0.55 * (1 - Math.max(0.2, panel.ao[i]! / 255))) * (1 - Math.min(0.16, depth * 55));
    if (rim[i]) s *= 0.93;
    // shade on cloth in a daylight studio is a touch cool, never warm (warm shade made white cotton read cream)
    colors[i * 3] = s * (0.99 + 0.01 * s);
    colors[i * 3 + 1] = s * (0.995 + 0.005 * s);
    colors[i * 3 + 2] = s;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geo;
}

// Where a point of the flat front pattern ended up on the draped cloth, and which way the cloth faces there
function surfaceAt(panel: Panel, normals: THREE.BufferAttribute, q: Pt): { p: THREE.Vector3; n: THREE.Vector3 } {
  const { pat, pos, tri } = panel;
  const p = new THREE.Vector3();
  const nv = new THREE.Vector3(0, 0, 1);
  let best = Infinity;
  for (let t = 0; t < tri.length; t += 3) {
    const a = tri[t]!;
    const b = tri[t + 1]!;
    const c = tri[t + 2]!;
    const ax = pat[a * 2]!;
    const ay = pat[a * 2 + 1]!;
    const bx = pat[b * 2]!;
    const by = pat[b * 2 + 1]!;
    const cx = pat[c * 2]!;
    const cy = pat[c * 2 + 1]!;
    const d = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy);
    if (Math.abs(d) < 1e-14) continue;
    let u = ((by - cy) * (q[0] - cx) + (cx - bx) * (q[1] - cy)) / d;
    let v = ((cy - ay) * (q[0] - cx) + (ax - cx) * (q[1] - cy)) / d;
    let w = 1 - u - v;
    const outside = Math.max(0, -u) + Math.max(0, -v) + Math.max(0, -w);
    if (outside >= best) continue;
    best = outside;
    u = Math.max(0, u);
    v = Math.max(0, v);
    w = Math.max(0, w);
    const s = u + v + w;
    u /= s;
    v /= s;
    w /= s;
    p.set(u * pos[a * 3]! + v * pos[b * 3]! + w * pos[c * 3]!, u * pos[a * 3 + 1]! + v * pos[b * 3 + 1]! + w * pos[c * 3 + 1]!, u * pos[a * 3 + 2]! + v * pos[b * 3 + 2]! + w * pos[c * 3 + 2]!);
    nv.set(
      u * normals.getX(a) + v * normals.getX(b) + w * normals.getX(c),
      u * normals.getY(a) + v * normals.getY(b) + w * normals.getY(c),
      u * normals.getZ(a) + v * normals.getZ(b) + w * normals.getZ(c),
    ).normalize();
    if (outside === 0) break;
  }
  return { p, n: nv };
}

// The collar: a rib band round the draped neckline (the front's neck edge, then the back's, meeting at the shoulders)
function collarGeometry(front: Panel, back: Panel, neck: number[], kind: GarmentKind) {
  const nF = front.pos.length / 3;
  const pts: THREE.Vector3[] = [];
  for (const i of neck) {
    const src = i < nF ? front.pos : back.pos;
    const j = i < nF ? i : i - nF;
    const v = new THREE.Vector3(src[j * 3]!, src[j * 3 + 1]!, src[j * 3 + 2]!);
    // the two panels meet at the shoulders, so a corner can come twice
    if (!pts.length || v.distanceTo(pts[pts.length - 1]!) > 1e-3) pts.push(v);
  }
  if (pts.length > 2 && pts[0]!.distanceTo(pts[pts.length - 1]!) < 1e-3) pts.pop();
  // The loop turns sharply at the two neck corners, where the front's neckline meets the back's: a curve drawn
  // through them overshot and stood up as two little ears beside the hanger. A few passes of easing round the loop
  // take the corners off.
  for (let pass = 0; pass < 4; pass++) {
    const prev = pts.map((v) => v.clone());
    const n = prev.length;
    for (let i = 0; i < n; i++) pts[i]!.copy(prev[(i + n - 1) % n]!).multiplyScalar(0.25).addScaledVector(prev[i]!, 0.5).addScaledVector(prev[(i + 1) % n]!, 0.25);
  }
  const curve = new THREE.CatmullRomCurve3(pts, true, "centripetal");
  // only the rolled edge of the rib: thin, so seen side-on it never stands up off the shoulders like a hood
  return new THREE.TubeGeometry(curve, 160, kind === "crewneck" ? 0.0058 : kind === "shirt" ? 0.0062 : 0.0046, 10, true);
}

// The right armhole, from the shoulder point down to the armpit, cut as drape.ts cuts it
function armholeLine(p: Pattern): Pt[] {
  const c: Pt = [p.shoulderX - 0.004, -(0.25 * p.shoulderDrop + 0.75 * p.armpit)];
  const pts: Pt[] = [];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    pts.push([(1 - t) * (1 - t) * p.shoulderX + 2 * (1 - t) * t * c[0] + t * t * p.half, -(1 - t) * (1 - t) * p.shoulderDrop + 2 * (1 - t) * t * c[1] - t * t * p.armpit]);
  }
  return pts;
}

// A point on the front neckline, t from the middle (0) to the neck corner (1), cut as drape.ts cuts it
function neckPoint(p: Pattern, t: number): Pt {
  if (p.vNeck) {
    const cx = 0.8 * p.neckHalf;
    const cy = -0.3 * p.neckFront;
    return [2 * (1 - t) * t * cx + t * t * p.neckHalf, -(1 - t) * (1 - t) * p.neckFront + 2 * (1 - t) * t * cy];
  }
  const a = t * (Math.PI / 2);
  return [Math.sin(a) * p.neckHalf, -Math.cos(a) * p.neckFront];
}

// One side of the shirt's open camp collar on the flat front, as two edges from the neck corner down: the inner
// edge along the V, the outer edge out over the chest to the collar point. dir 1 is the side on your right.
const FLAP_STEPS = 14;
function flapEdges(p: Pattern, dir: number): { inner: Pt[]; outer: Pt[] } {
  const inner: Pt[] = [];
  const outer: Pt[] = [];
  const o0: Pt = [p.neckHalf + 0.035, -0.015];
  const o1: Pt = [p.neckHalf + 0.065, -0.1];
  const o2: Pt = [p.neckHalf - 0.005, -p.neckFront + 0.035];
  for (let i = 0; i <= FLAP_STEPS; i++) {
    const s = i / FLAP_STEPS;
    const [ix, iy] = neckPoint(p, 1 - s);
    inner.push([dir * ix, iy]);
    const a = (1 - s) * (1 - s);
    const b = 2 * (1 - s) * s;
    const c = s * s;
    outer.push([dir * (a * o0[0] + b * o1[0] + c * o2[0]), a * o0[1] + b * o1[1] + c * o2[1]]);
  }
  return { inner, outer };
}

// The shirt's camp collar, two soft flaps lying open on the chest either side of the V, and a row of buttons. Both
// are placed on the draped front, so they follow its folds, and both sit at their real place in the geometry (not
// moved by a mesh position), so the cloth shader, which bends by height, carries them along with the fabric.
function shirtParts(p: Pattern, box: Box, front: Panel, normals: THREE.BufferAttribute) {
  const flaps: THREE.BufferGeometry[] = [];
  for (const dir of [1, -1]) {
    const { inner, outer } = flapEdges(p, dir);
    const verts: number[] = [];
    const uvs: number[] = [];
    const idx: number[] = [];
    for (let i = 0; i <= FLAP_STEPS; i++) {
      for (const q of [inner[i]!, outer[i]!]) {
        const s = surfaceAt(front, normals, q);
        s.p.addScaledVector(s.n, 0.0035);
        verts.push(s.p.x, s.p.y, s.p.z);
        uvs.push((q[0] - box.x0) / box.w, (q[1] - box.y0) / box.h);
      }
      if (i < FLAP_STEPS) {
        const k = i * 2;
        idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    // face the flap out of the chest, whichever way its strip happened to wind
    if ((g.attributes.normal as THREE.BufferAttribute).getZ(FLAP_STEPS) < 0) {
      for (let i = 0; i < idx.length; i += 3) [idx[i + 1], idx[i + 2]] = [idx[i + 2]!, idx[i + 1]!];
      g.setIndex(idx);
      g.computeVertexNormals();
    }
    // the same cloth as the body, a shade darker, so the collar reads as a layer lying on the chest
    g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(verts.length).fill(0.9), 3));
    flaps.push(g);
  }
  const buttons: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 5; i++) {
    const s = surfaceAt(front, normals, [0.007, -p.neckFront - 0.025 - i * 0.115]);
    const b = new THREE.CylinderGeometry(0.0062, 0.0062, 0.003, 16);
    // the button's axis along the cloth's normal, standing a hair off the surface
    b.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), s.n));
    b.translate(s.p.x + s.n.x * 0.003, s.p.y + s.n.y * 0.003, s.p.z + s.n.z * 0.003);
    buttons.push(b);
  }
  return { flaps, buttons };
}

// ---------------------------------------------------------------- textures

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

function parse(hex: string) {
  return new THREE.Color(hex);
}
function shade(hex: string, amount: number) {
  const c = parse(hex);
  const t = amount < 0 ? new THREE.Color(0, 0, 0) : new THREE.Color(1, 1, 1);
  return "#" + c.lerp(t, Math.abs(amount)).getHexString();
}
// a grey marl: hardly any colour, neither dark nor light
function isMarl(hex: string) {
  const hsl = { h: 0, s: 0, l: 0 };
  parse(hex).getHSL(hsl);
  return hsl.s < 0.08 && hsl.l > 0.3 && hsl.l < 0.7;
}
function lum(hex: string) {
  const c = parse(hex);
  return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
}

const SCRIPT = "'Snell Roundhand', 'Segoe Script', 'Brush Script MT', 'Apple Chancery', cursive";
const SERIF = "'Didot', 'Bodoni 72', 'Bodoni MT', 'Playfair Display', Georgia, serif";

function rand(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
}

function hash(x: number, y: number, seed: number) {
  const h = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return h - Math.floor(h);
}

// A screen print is never perfectly solid: knock tiny specks out of it so the cloth shows through.
function grain(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, seed: number) {
  const r = rand(seed);
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  for (let i = 0; i < (w * h) / 170; i++) {
    ctx.fillStyle = `rgba(0,0,0,${0.12 + r() * 0.28})`;
    ctx.fillRect(x + r() * w, y + r() * h, 1 + r() * 1.5, 1 + r() * 1.5);
  }
  ctx.restore();
}

// Pattern units to texture pixels for one kind's texture, and how many pixels make a unit
function painter(box: Box) {
  const unit = box.texW / box.w;
  const toPx = (x: number, y: number): Pt => [(x - box.x0) * unit, (box.y1 - y) * unit];
  return { toPx, unit };
}

function drawPrint(ctx: CanvasRenderingContext2D, print: GarmentPrint, kind: GarmentKind, p: Pattern, box: Box, colour: string) {
  const { toPx, unit } = painter(box);
  // a chest print sits about a fifth of the body below the front of the neck
  const [cx, chestY] = toPx(0, -p.neckFront - (kind === "crewneck" ? 0.2 : 0.17));
  // prints are sized to the chest they sit on
  const bodyW = 2 * p.half * 0.8 * unit;
  const fit = bodyW / (0.5 * unit);
  const layer = canvas(box.texW, box.texH);
  const g = layer.getContext("2d")!;
  g.textAlign = "center";
  g.textBaseline = "middle";
  if (print.kind === "script") {
    const words = print.text.split(" ");
    const lines = words.length > 1 ? [words.slice(0, Math.ceil(words.length / 2)).join(" "), words.slice(Math.ceil(words.length / 2)).join(" ")] : words;
    g.save();
    g.translate(cx, chestY);
    g.rotate(-0.12);
    g.fillStyle = print.ink;
    lines.forEach((line, i) => {
      let size = 150;
      g.font = `700 ${size}px ${SCRIPT}`;
      const w = g.measureText(line).width;
      size = Math.min(170 * fit, (size * bodyW * 0.74) / Math.max(1, w));
      g.font = `700 ${size}px ${SCRIPT}`;
      g.fillText(line, (i ? 0.08 : -0.06) * bodyW, (i - (lines.length - 1) / 2) * size * 0.78);
    });
    g.restore();
    grain(g, cx - bodyW / 2, chestY - 160 * fit, bodyW, 320 * fit, 7);
  } else if (print.kind === "serif") {
    g.fillStyle = print.ink;
    const size = (bodyW * 0.235) | 0;
    print.lines.forEach((line, i) => {
      g.font = `700 ${size}px ${SERIF}`;
      g.fillText(line, cx, chestY - size * 0.95 + i * size * 0.92);
    });
    g.font = `600 ${Math.round(size * 0.16)}px ${SERIF}`;
    g.fillText("SONOJS GOODS  ·  MMXXVI", cx, chestY - size * 0.95 + print.lines.length * size * 0.92 - size * 0.12);
    grain(g, cx - bodyW / 2, chestY - size * 1.6, bodyW, size * 3.6, 9);
  } else if (print.kind === "flowers") {
    const r = rand(23);
    const palette = ["#e8364f", "#f58a1f", "#6a4cf0", "#11a58a", "#ec3f8c", "#f7c21b", "#2f7ff0"];
    const cy = chestY + 30 * fit;
    for (let i = 0; i < 34; i++) {
      const a = r() * Math.PI * 2;
      const rr = Math.sqrt(r()) * bodyW * 0.3;
      const fx = cx + Math.cos(a) * rr * 1.05;
      const fy = cy + Math.sin(a) * rr * 0.92;
      const petals = 5 + ((r() * 4) | 0);
      const size = (20 + r() * 30) * fit;
      const col = palette[(r() * palette.length) | 0] ?? "#e85d75";
      // leaf
      g.save();
      g.translate(fx, fy);
      g.rotate(r() * Math.PI * 2);
      g.fillStyle = r() > 0.5 ? "#2f7a46" : "#4b9a5a";
      g.beginPath();
      g.ellipse(size * 1.1, 0, size * 0.7, size * 0.26, 0.3, 0, Math.PI * 2);
      g.fill();
      for (let k = 0; k < petals; k++) {
        g.rotate((Math.PI * 2) / petals);
        g.fillStyle = col;
        g.beginPath();
        g.ellipse(size * 0.55, 0, size * 0.55, size * 0.3, 0, 0, Math.PI * 2);
        g.fill();
      }
      g.fillStyle = r() > 0.5 ? "#2b2b33" : "#ffd84d";
      g.beginPath();
      g.arc(0, 0, size * 0.24, 0, Math.PI * 2);
      g.fill();
      g.restore();
    }
    if (print.text) {
      g.save();
      g.translate(cx, cy - bodyW * 0.12);
      g.rotate(-0.1);
      g.fillStyle = print.ink;
      g.font = `700 ${Math.round(150 * fit)}px ${SCRIPT}`;
      g.strokeStyle = colour;
      g.lineWidth = 14 * fit;
      g.strokeText(print.text, 0, 0);
      g.fillText(print.text, 0, 0);
      g.restore();
    }
    // flowers are printed solid: no knock-out grain, so the colours stay bright
  } else if (print.kind === "chest") {
    // the wearer's left chest, which is on your right when it faces you
    const [x, y] = toPx(p.neckHalf + 0.015, -p.neckFront - 0.045);
    g.fillStyle = print.ink;
    g.font = `italic 600 30px ${SERIF}`;
    const w = g.measureText(print.text).width;
    const size = Math.min(34, (30 * 0.09 * unit) / Math.max(1, w));
    g.font = `italic 600 ${size}px ${SERIF}`;
    g.fillText(print.text, x, y);
  } else if (print.kind === "pocket") {
    // a sewn-on patch pocket on the wearer's left chest: a slightly darker patch with a soft shadow under it, a
    // shadow just inside its open top, a folded top hem and a row of stitches round it
    const [x, y] = toPx(0.05, -p.neckFront - 0.06);
    const w = 0.1 * unit;
    const h = 0.115 * unit;
    g.fillStyle = "rgba(0,0,0,0.16)";
    g.beginPath();
    g.roundRect(x + 3, y + 5, w, h, [2, 2, 8, 8]);
    g.fill();
    g.fillStyle = shade(colour, -0.09);
    g.beginPath();
    g.roundRect(x, y, w, h, [2, 2, 8, 8]);
    g.fill();
    const lip = g.createLinearGradient(0, y, 0, y + 24);
    lip.addColorStop(0, "rgba(0,0,0,0.22)");
    lip.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = lip;
    g.fillRect(x, y, w, 24);
    g.strokeStyle = shade(colour, -0.3);
    g.lineWidth = 1.6;
    g.setLineDash([5, 4]);
    g.beginPath();
    g.moveTo(x + 5, y + 15);
    g.lineTo(x + w - 5, y + 15);
    g.stroke();
    g.beginPath();
    g.roundRect(x + 5, y + 5, w - 10, h - 10, [1, 1, 5, 5]);
    g.stroke();
    g.setLineDash([]);
    g.strokeStyle = shade(colour, -0.24);
    g.lineWidth = 1.4;
    g.beginPath();
    g.roundRect(x, y, w, h, [2, 2, 8, 8]);
    g.stroke();
  }
  if (print.kind !== "pattern") ctx.drawImage(layer, 0, 0);
}

// An all-over print of small sprigs, like a vintage resort shirt: five-petal flowers, pairs of leaves on a stem and
// the odd dot, set on a jittered grid so the print is even (pure random clumps), the same size on every kind. The
// first colour is the flowers' centres and the stems.
function drawPattern(ctx: CanvasRenderingContext2D, colours: string[], seed: number, box: Box) {
  const r = rand(seed);
  const unit = box.texW / box.w;
  const cell = 0.052 * unit;
  const pick = () => colours[1 + ((r() * (colours.length - 1)) | 0)] ?? colours[0] ?? "#ddd";
  for (let j = 0; j * cell < box.texH + cell; j++) {
    for (let i = 0; i * cell < box.texW + cell; i++) {
      const x = (i + (j % 2) * 0.5 + (r() - 0.5) * 0.55) * cell;
      const y = (j + (r() - 0.5) * 0.55) * cell;
      const what = r();
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(r() * Math.PI * 2);
      if (what < 0.46) {
        const s = (0.0075 + r() * 0.004) * unit;
        ctx.fillStyle = pick();
        for (let k = 0; k < 5; k++) {
          ctx.rotate((Math.PI * 2) / 5);
          ctx.beginPath();
          ctx.ellipse(s * 0.95, 0, s * 0.78, s * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = colours[0] ?? "#333";
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.36, 0, Math.PI * 2);
        ctx.fill();
      } else if (what < 0.88) {
        const s = (0.008 + r() * 0.004) * unit;
        ctx.strokeStyle = colours[0] ?? "#333";
        ctx.lineWidth = Math.max(1, s * 0.12);
        ctx.beginPath();
        ctx.moveTo(-s * 1.4, 0);
        ctx.quadraticCurveTo(0, -s * 0.25, s * 1.4, 0);
        ctx.stroke();
        ctx.fillStyle = pick();
        for (const [lx, side] of [[-0.55, 1], [0.15, -1], [0.85, 1]] as const) {
          ctx.save();
          ctx.translate(lx * s, 0);
          ctx.rotate(side * 0.75);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.quadraticCurveTo(s * 0.45, -s * 0.38 * side, s * 0.95, 0);
          ctx.quadraticCurveTo(s * 0.45, s * 0.38 * side, 0, 0);
          ctx.fill();
          ctx.restore();
        }
      } else {
        ctx.fillStyle = pick();
        ctx.beginPath();
        ctx.arc(0, 0, (0.0022 + r() * 0.0016) * unit, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }
}

const SPECKS: { fine?: HTMLCanvasElement; marl?: HTMLCanvasElement } = {};
function speckTile(marl: boolean) {
  const key = marl ? "marl" : "fine";
  let tile = SPECKS[key];
  if (!tile) {
    tile = canvas(256, 256);
    const ctx = tile.getContext("2d")!;
    const r = rand(marl ? 41 : 42);
    for (let i = 0; i < (marl ? 3300 : 1450); i++) {
      ctx.fillStyle = r() > 0.5 ? `rgba(255,255,255,${marl ? 0.16 : 0.035})` : `rgba(0,0,0,${marl ? 0.16 : 0.045})`;
      ctx.fillRect(r() * 256, r() * 256, marl ? 2.4 : 1.6, marl ? 1.2 : 1.6);
    }
    SPECKS[key] = tile;
  }
  return tile;
}

// The fabric colour, its knit, the stitching, seams and rib bands, and the print, all drawn on the flat pattern.
function fabricTexture(spec: GarmentSpec, p: Pattern, box: Box, front: boolean, speck: boolean) {
  // the back is mostly hidden, so it is drawn at half size (a quarter of the work); everything below is drawn in
  // full-size coordinates and the context scale shrinks it
  const k = front ? 1 : 0.5;
  const c = canvas(Math.round(box.texW * k), Math.round(box.texH * k));
  const ctx = c.getContext("2d")!;
  ctx.scale(k, k);
  const { toPx } = painter(box);
  const { kind } = spec;
  // white cotton is never paper white (about 85% reflectance), or it melts into a light page
  const colour = lum(spec.colour) > 0.8 ? shade(spec.colour, -0.07) : spec.colour;
  ctx.fillStyle = colour;
  ctx.fillRect(0, 0, box.texW, box.texH);
  if (spec.print?.kind === "pattern") drawPattern(ctx, spec.print.colours, front ? 5 : 6, box);
  // knit: fine speckle, much stronger for a grey marl
  const col = parse(colour);
  const hsl = { h: 0, s: 0, l: 0 };
  col.getHSL(hsl);
  const marl = hsl.s < 0.08 && hsl.l > 0.3 && hsl.l < 0.7;
  // the knit speckle is one small tile drawn once and repeated: tens of thousands of single dots per texture
  // were most of the time it took to build a rack. Scanned cloth has its own knit: only a marl keeps its flecks.
  const pattern = speck || marl ? ctx.createPattern(speckTile(marl), "repeat") : null;
  if (pattern) {
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, box.texW, box.texH);
  }
  const dark = lum(colour) < 0.25;
  const line = (pts: Pt[]) => {
    ctx.beginPath();
    pts.forEach(([x, y], i) => {
      const [px, py] = toPx(x, y);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
  };
  const hemY = -p.length;
  if (kind === "crewneck") {
    // the rib waistband: a shade darker with fine ribs running down it, and a seam where it joins the body
    const rib = 0.065;
    const [x0, y0] = toPx(-p.half - 0.02, hemY + rib);
    const [x1, y1] = toPx(p.half + 0.02, hemY - 0.02);
    ctx.fillStyle = shade(colour, -0.09);
    ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    ctx.fillStyle = "rgba(0,0,0,0.16)";
    for (let x = x0; x < x1; x += 3) ctx.fillRect(x, y0, 1.2, y1 - y0);
    ctx.strokeStyle = shade(colour, -0.22);
    ctx.lineWidth = 1.4;
    line([[-p.half - 0.02, hemY + rib], [p.half + 0.02, hemY + rib]]);
  } else {
    // a turned-up hem: the doubled cloth reads a touch darker, closed by a quiet twin-needle stitch in the cloth's
    // own colour
    const [x0, y0] = toPx(-p.half - 0.02, hemY + 0.022);
    const [x1, y1] = toPx(p.half + 0.02, hemY - 0.02);
    ctx.fillStyle = dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.035)";
    ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    ctx.strokeStyle = dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.1)";
    ctx.lineWidth = 1.1;
    for (const off of [0.019, 0.024]) line([[-p.half - 0.02, hemY + off], [p.half + 0.02, hemY + off]]);
  }
  // the armhole seams, where the sleeves are sewn in: a soft shadow just inside the body's edge and the stitch line
  for (const s of [1, -1]) {
    const edge = armholeLine(p).map(([x, y]) => [s * (x - 0.006), y] as Pt);
    ctx.strokeStyle = dark ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.05)";
    ctx.lineWidth = 7;
    line(edge);
    ctx.strokeStyle = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.09)";
    ctx.lineWidth = 1.1;
    line(edge.map(([x, y]) => [x - s * 0.004, y] as Pt));
  }
  // shoulder seams, just inside the pattern's edge
  ctx.strokeStyle = dark ? "rgba(255,255,255,0.06)" : `rgba(0,0,0,${spec.print?.kind === "pattern" ? 0.04 : 0.08})`;
  ctx.lineWidth = 1.2;
  for (const s of [1, -1]) line([[s * p.neckHalf, -0.004], [s * p.shoulderX, -p.shoulderDrop - 0.004]]);
  // the neck rib: a band round the neckline a shade darker than the body, ribbed across, with its seam under it
  if (kind !== "shirt") {
    const ribW = kind === "crewneck" ? 0.024 : 0.017;
    // the neckline grown outward by inset: the same quarter ellipses the pattern is cut with
    const neck = (inset: number): Pt[] => {
      const pts: Pt[] = [];
      const drop = front ? p.neckFront : p.neckBack;
      for (let i = 0; i <= 32; i++) {
        const a = (-1 + (2 * i) / 32) * (Math.PI / 2);
        pts.push([Math.sin(a) * (p.neckHalf + inset), -Math.cos(a) * (drop + inset)]);
      }
      return pts;
    };
    ctx.strokeStyle = shade(colour, dark ? 0.012 : -0.05);
    ctx.lineWidth = ribW * painter(box).unit;
    line(neck(ribW / 2));
    ctx.strokeStyle = dark ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.12)";
    ctx.lineWidth = 1.2;
    line(neck(ribW));
  }
  // the shirt's placket: a slightly darker band down the button column, stitched on both edges; and the soft
  // shadow the open collar casts on the chest round its edges
  if (kind === "shirt" && front) {
    for (const dir of [1, -1]) {
      const { inner, outer } = flapEdges(p, dir);
      const edge = [...outer, inner[inner.length - 1]!];
      for (const [width, alpha] of [
        [16, 0.05],
        [10, 0.07],
        [5, 0.09],
      ] as const) {
        ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
        ctx.lineWidth = width;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.beginPath();
        edge.forEach(([x, y], i) => {
          const [px, py] = toPx(x, y);
          if (i === 0) ctx.moveTo(px + 2, py + 4);
          else ctx.lineTo(px + 2, py + 4);
        });
        ctx.stroke();
      }
    }
  }
  if (kind === "shirt") {
    // the placket: the button band, a doubled strip a touch darker with a fine stitch down each edge
    const [px0, py0] = toPx(-0.012, -p.neckFront);
    const [px1, py1] = toPx(0.026, hemY - 0.02);
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(px0, py0, px1 - px0, py1 - py0);
    ctx.strokeStyle = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.14)";
    ctx.lineWidth = 1.1;
    for (const x of [px0 + 3, px1 - 3]) {
      ctx.beginPath();
      ctx.moveTo(x, py0);
      ctx.lineTo(x, py1);
      ctx.stroke();
    }
  }
  if (front && spec.print) drawPrint(ctx, spec.print, kind, p, box, colour);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// A sleeve's fabric: the same cloth, knit and print as the body at the same scale, with the cuff finished like the
// body's hem (a turned-up hem on a tee or a shirt, a rib cuff on the crewneck) and a stitch line along the armhole.
// u runs round the sleeve from the fold over the top, v from the armhole (the canvas's bottom) to the cuff (its top).
function sleeveTexture(spec: GarmentSpec, size: { around: number; along: number }, speck: boolean) {
  const W = Math.min(1024, Math.round(1180 * size.around));
  const H = Math.min(1024, Math.round(1180 * size.along));
  const c = canvas(W, H);
  const ctx = c.getContext("2d")!;
  const colour = lum(spec.colour) > 0.8 ? shade(spec.colour, -0.07) : spec.colour;
  ctx.fillStyle = colour;
  ctx.fillRect(0, 0, W, H);
  if (spec.print?.kind === "pattern") drawPattern(ctx, spec.print.colours, 7, { x0: 0, y0: 0, y1: 0, w: size.around, h: size.along, texW: W, texH: H });
  const col = parse(colour);
  const hsl = { h: 0, s: 0, l: 0 };
  col.getHSL(hsl);
  const marl = hsl.s < 0.08 && hsl.l > 0.3 && hsl.l < 0.7;
  const knit = speck || marl ? ctx.createPattern(speckTile(marl), "repeat") : null;
  if (knit) {
    ctx.fillStyle = knit;
    ctx.fillRect(0, 0, W, H);
  }
  const dark = lum(colour) < 0.25;
  const unit = H / size.along;
  if (spec.kind === "crewneck") {
    const rib = 0.065 * unit;
    ctx.fillStyle = shade(colour, -0.09);
    ctx.fillRect(0, 0, W, rib);
    ctx.fillStyle = "rgba(0,0,0,0.16)";
    for (let x = 0; x < W; x += 3) ctx.fillRect(x, 0, 1.2, rib);
    ctx.fillStyle = shade(colour, -0.22);
    ctx.fillRect(0, rib, W, 1.4);
  } else {
    ctx.fillStyle = dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.035)";
    ctx.fillRect(0, 0, W, 0.022 * unit);
    ctx.fillStyle = dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.1)";
    for (const off of [0.019, 0.024]) ctx.fillRect(0, off * unit, W, 1.1);
  }
  ctx.fillStyle = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.09)";
  ctx.fillRect(0, H - 0.007 * unit, W, 1.1);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// A tiny jersey knit as a normal map, tiled across the cloth.
function knitNormal() {
  const N = 64;
  const hgt = new Float32Array(N * N);
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const u = x / N;
      const v = y / N;
      const row = Math.floor(v * 8);
      const k = Math.abs(Math.sin(Math.PI * (u * 8 + (row % 2) * 0.5 + (v * 8 - row) * 0.6)));
      hgt[y * N + x] = 0.6 * k + 0.4 * (hash(x, y, 9) - 0.5) * 0.4;
    }
  const c = canvas(N, N);
  const ctx = c.getContext("2d")!;
  const img = ctx.createImageData(N, N);
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const H = (k: number) => hgt[k] ?? 0;
      const hx = H(y * N + ((x + 1) % N)) - H(y * N + ((x + N - 1) % N));
      const hy = H(((y + 1) % N) * N + x) - H(((y + N - 1) % N) * N + x);
      const n = new THREE.Vector3(-hx * 2, -hy * 2, 1).normalize();
      const i = (y * N + x) * 4;
      img.data[i] = (n.x * 0.5 + 0.5) * 255;
      img.data[i + 1] = (n.y * 0.5 + 0.5) * 255;
      img.data[i + 2] = (n.z * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.NoColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// ---------------------------------------------------------------- hanger, hook, rail

// A tiny studio for the chrome to reflect: a ring of light and dark bands round it (a bright strip just above eye
// level, a dark horizon, a pale floor bounce) and a softbox overhead. Built as a scene and prefiltered like the room.
function studioScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0.3, 0.3, 0.31);
  const R = 10;
  const band = (from: number, to: number, value: number) => {
    // a band between two elevations (degrees) on a cylinder round the middle, seen from inside
    const y0 = R * Math.tan((from * Math.PI) / 180);
    const y1 = R * Math.tan((to * Math.PI) / 180);
    const geo = new THREE.CylinderGeometry(R, R, y1 - y0, 48, 1, true);
    const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: new THREE.Color(value, value * 1.01, value * 1.03), side: THREE.BackSide }));
    mesh.position.y = (y0 + y1) / 2;
    scene.add(mesh);
  };
  band(-62, -30, 0.24);
  band(-30, -6, 0.5);
  band(-6, 6, 0.08);
  band(6, 10, 0.5);
  band(10, 17, 2.6);
  band(17, 24, 0.7);
  band(24, 55, 0.45);
  const box = new THREE.Mesh(new THREE.CircleGeometry(R * 0.9, 48), new THREE.MeshBasicMaterial({ color: new THREE.Color(1.9, 1.9, 1.95), side: THREE.DoubleSide }));
  box.rotation.x = Math.PI / 2;
  box.position.y = R * 1.35;
  scene.add(box);
  return scene;
}

function disposeScene(scene: THREE.Scene) {
  scene.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.geometry.dispose();
    (mesh.material as THREE.Material).dispose();
  });
}

// The wooden bar follows the hanger the garments were draped on (its tips end inside the shoulders), a little
// thinner than the room the cloth left round it, so it never shows through
function hangerGeometry(): [THREE.BufferGeometry, THREE.BufferGeometry] {
  // drawn a touch shorter than the hanger the cloth was draped on, so its tips never poke out at the shoulders
  const pts = DRAPE_HANGER.map(([x, y]) => new THREE.Vector3(x * 0.9, y, 0));
  // a flat bar: round tube squashed front to back (the curve lies at z 0, so only the section flattens)
  const bar = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 64, 0.0165, 14, false);
  bar.scale(1, 1, 0.46);
  const block = new THREE.CylinderGeometry(0.0105, 0.012, 0.02, 16);
  block.translate(0, -0.104, 0);
  return [bar, block];
}

// the rail's radius (a 25 mm tube on a garment about 80 cm long); the hook wraps round it
const RAIL_R = 0.023;

function hookGeometry() {
  const R = RAIL_R + 0.0045 + 0.0012;
  const pts: THREE.Vector3[] = [new THREE.Vector3(0, -0.104, 0), new THREE.Vector3(0, -0.075, 0.004), new THREE.Vector3(0, -0.04, 0.015), new THREE.Vector3(0, -0.012, R * 0.98)];
  for (let i = 0; i <= 14; i++) {
    const a = (i / 14) * (Math.PI * 1.16);
    pts.push(new THREE.Vector3(0, Math.sin(a) * R, Math.cos(a) * R));
  }
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 96, 0.0045, 10, false);
}

const HANGER_LOOK: Record<HangerFinish, { color: number; metalness: number; roughness: number }> = {
  wood: { color: 0x5b2a18, metalness: 0, roughness: 0.34 },
  black: { color: 0x141416, metalness: 0, roughness: 0.38 },
  chrome: { color: 0xe3e6ea, metalness: 1, roughness: 0.16 },
};
const RAIL_LOOK: Record<RailFinish, { color: number; metalness: number; roughness: number }> = {
  chrome: { color: 0xe8ebef, metalness: 1, roughness: 0.12 },
  black: { color: 0x18181a, metalness: 0.6, roughness: 0.32 },
  brass: { color: 0xc9a15a, metalness: 1, roughness: 0.22 },
};

// ---------------------------------------------------------------- cloth motion

type FlowUniforms = {
  uTwist: { value: Float32Array };
  uSway: { value: Float32Array };
  uSwayAxis: { value: THREE.Vector2 };
  uRows: { value: THREE.Vector2 };
  uRipple: { value: number };
  uTime: { value: number };
  /** Fold/vertex-colour strength (may be > 1 on light cloth). */
  uClothAo: { value: number };
  uInside: { value: number };
  uHang: { value: number };
  uGrain: { value: THREE.Texture };
  uGrainAmt: { value: number };
};

// Bends the cloth in the vertex shader with the rows of cloth-motion.ts: each row of cloth, from the shoulders down
// to the hem, twists about the hook and trails along the rail by its own amount, blended smoothly between rows, so a
// turn or a push runs down the fabric as a wave. While it moves, a faint ripple travels from the shoulders to the hem
// (a small bend in the cloth and in its light). Above the first row, where the hanger holds the cloth, nothing moves.
// Soft drape folds on a garment's body, drawn into its shading as a height over the flat pattern (the baked drape is
// too coarse to hold them): two from where the hanger holds each shoulder, running in toward the chest; one from
// under each arm, down and in; a few slow waves across the lower body, more toward the hem. Mirrored left to right.
const FOLDS_GLSL = /* glsl */ `
uniform vec4 uBox;
uniform vec4 uShape;
uniform float uDrop;
uniform float uFolds;
float clothRidge(vec2 p, vec2 a, vec2 b, float w) {
  vec2 ab = b - a;
  float t = clamp(dot(p - a, ab) / dot(ab, ab), 0.0, 1.0);
  vec2 d = p - a - ab * t;
  return exp(-dot(d, d) / (w * w)) * sin(3.14159 * t);
}
float clothHeight(vec2 q) {
  vec2 p = vec2(abs(q.x), q.y);
  float hw = uShape.x;
  float pit = uShape.y;
  float len = uShape.z;
  float sx = uShape.w;
  float h = 0.9 * clothRidge(p, vec2(sx - 0.05, -uDrop - 0.02), vec2(0.07, -pit + 0.03), 0.024);
  h += 0.5 * clothRidge(p, vec2(sx - 0.02, -uDrop - 0.07), vec2(0.15, -pit - 0.07), 0.02);
  h += 0.7 * clothRidge(p, vec2(hw - 0.01, -pit - 0.01), vec2(hw - 0.12, -pit - 0.17), 0.018);
  h += 0.45 * smoothstep(-len * 0.5, -len * 0.95, q.y) * cos(6.2832 * q.x / 0.17);
  return h;
}
vec2 clothFolds(vec2 uv) {
  vec2 q = uBox.xy + uv * uBox.zw;
  float e = 0.004;
  float hx = clothHeight(q + vec2(e, 0.0)) - clothHeight(q - vec2(e, 0.0));
  float hy = clothHeight(q + vec2(0.0, e)) - clothHeight(q - vec2(0.0, e));
  return -uFolds * vec2(hx, hy) / (2.0 * e);
}
`;

type Folds = { box: { x0: number; y0: number; w: number; h: number }; pattern: Pattern; strength: number };

/** Built-in materials expose `defines` at runtime for `onBeforeCompile`; @types/three only types it on ShaderMaterial. */
type FlowMaterial = THREE.Material & {
  defines?: { [key: string]: string | number | boolean };
};

function addFlow(material: FlowMaterial, flow: FlowUniforms, hang = false, folds?: Folds) {
  if (hang) material.defines = { ...material.defines, CLOTH_HANG: "" };
  if (folds) material.defines = { ...material.defines, CLOTH_FOLDS: "" };
  const foldUniforms = folds && {
    uBox: { value: new THREE.Vector4(folds.box.x0, folds.box.y0, folds.box.w, folds.box.h) },
    uShape: { value: new THREE.Vector4(folds.pattern.half, folds.pattern.armpit, folds.pattern.length, folds.pattern.shoulderX) },
    uDrop: { value: folds.pattern.shoulderDrop },
    uFolds: { value: folds.strength },
  };
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, flow, foldUniforms);
    // Prepend fragment uniforms (more reliable than splicing after #include <common>).
    shader.fragmentShader =
      /* glsl */ `
uniform float uClothAo;
uniform float uInside;
uniform sampler2D uGrain;
uniform float uGrainAmt;
` + shader.fragmentShader;
    if (folds) {
      shader.fragmentShader = shader.fragmentShader
        .replace("#include <common>", `#include <common>\n${FOLDS_GLSL}`)
        .replace("#include <normal_fragment_maps>", THREE.ShaderChunk.normal_fragment_maps.replace("mapN.xy *= normalScale;", "mapN.xy *= normalScale;\n\tmapN.xy += clothFolds(vMapUv);"));
    }
    // the baked fold shading (vertex colour) counts for more on light cloth: white needs it to read as cloth. The
    // inside of the cloth (the back face of a two-sided panel) is in the garment's own shadow, seen through the
    // neck and the sleeves.
    // Always use vColor.rgb — Three may declare vColor as vec3 or vec4 under USE_COLOR / USE_COLOR_ALPHA, and
    // some drivers type-check both #if branches. .rgb is valid for either.
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <color_fragment>",
      `#if defined( USE_COLOR_ALPHA ) || defined( USE_COLOR )
  // stronger on light cloth, but never darker than about half: a fold or the shade under a sleeve is a soft grey
  vec3 clothAoTint = vec3(1.0) + (vColor.rgb - vec3(1.0)) * uClothAo;
  clothAoTint.r = max(clothAoTint.r, 0.5);
  clothAoTint.g = max(clothAoTint.g, 0.5);
  clothAoTint.b = max(clothAoTint.b, 0.5);
  diffuseColor.rgb *= clothAoTint;
#endif
#ifdef USE_COLOR_ALPHA
  diffuseColor.a *= vColor.a;
#endif
#ifdef USE_NORMALMAP
  // the heather grain, tiled with the knit (0.513 is the grain's own average, so it shades without darkening)
  // texture2D matches three's chunks (rewritten for WebGL2 by the renderer)
  diffuseColor.rgb *= (1.0 - uGrainAmt) + uGrainAmt * (texture2D( uGrain, vNormalMapUv ).r / 0.513);
#endif
#ifdef DOUBLE_SIDED
  if (!gl_FrontFacing) diffuseColor.rgb *= uInside;
#endif`
    );
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
uniform float uTwist[${CLOTH_ROWS + 1}];
uniform float uSway[${CLOTH_ROWS + 1}];
uniform vec2 uSwayAxis;
uniform vec2 uRows;
uniform float uRipple;
uniform float uTime;
uniform float uHang;
#ifdef CLOTH_HANG
attribute vec3 hangPosition;
attribute vec3 hangNormal;
#endif`,
      )
      .replace(
        "#include <beginnormal_vertex>",
        `#include <beginnormal_vertex>
// a sleeve hangs down the garment's side on the rail and opens out as the garment turns to face you
#ifdef CLOTH_HANG
vec3 clothPos = mix(position, hangPosition, uHang);
objectNormal = normalize(mix(objectNormal, hangNormal, uHang));
#else
vec3 clothPos = position;
#endif
float clothRow = clamp((uRows.x - clothPos.y) / uRows.y, 0.0, 1.0) * ${CLOTH_ROWS}.0;
float clothTwist = 0.0;
float clothSway = 0.0;
for (int k = 0; k <= ${CLOTH_ROWS}; k++) {
  float w = max(0.0, 1.0 - abs(clothRow - float(k)));
  clothTwist += uTwist[k] * w;
  clothSway += uSway[k] * w;
}
float clothC = cos(clothTwist);
float clothS = sin(clothTwist);
objectNormal = vec3(objectNormal.x * clothC + objectNormal.z * clothS, objectNormal.y, -objectNormal.x * clothS + objectNormal.z * clothC);
float clothPhase = uTime * 11.0 - (uRows.x - clothPos.y) * 34.0 + clothPos.x * 5.0;
float clothAmp = uRipple * 0.0032 * smoothstep(0.0, 1.5, clothRow);
objectNormal = normalize(objectNormal - vec3(0.0, clothAmp * 34.0 * cos(clothPhase), 0.0));`,
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
transformed = clothPos;
{
  float x2 = transformed.x * clothC + transformed.z * clothS;
  float z2 = -transformed.x * clothS + transformed.z * clothC;
  transformed.x = x2 + uSwayAxis.x * clothSway;
  transformed.z = z2 + uSwayAxis.y * clothSway;
  transformed += objectNormal * clothAmp * sin(clothPhase);
}`,
      );
  };
  material.customProgramCacheKey = () => (hang ? "clothes-rack-flow-hang" : folds ? "clothes-rack-flow-folds" : "clothes-rack-flow");
}

// ---------------------------------------------------------------- shared cloth geometry

// The cloth geometry is plain data (no WebGL context), so every wardrobe on the page shares it: the detail view's
// own renderer reuses what the rack already built instead of decoding it again on the first click.
type Size = { width: number; bodyWidth: number; depth: number; height: number };
type KindParts = {
  pattern: Pattern;
  box: Box;
  front: THREE.BufferGeometry;
  back: THREE.BufferGeometry;
  collar: THREE.BufferGeometry;
  /** the right sleeve and the left */
  sleeves: THREE.BufferGeometry[];
  /** round the sleeve at its armhole, and its length over the top, for drawing its fabric at the body's scale */
  sleeveSize: { around: number; along: number };
  extras?: { flaps: THREE.BufferGeometry[]; buttons: THREE.BufferGeometry[] };
  size: Size;
};
const SHARED = new Map<GarmentKind, { parts: KindParts; refs: number }>();

// The draped garment's own measurements: sleeve to sleeve, the body alone (across the waist), front to back at the
// hem, and rail to hem
function measure(front: Panel, back: Panel, sleeves: Float32Array[], p: Pattern): Size {
  let width = 0;
  let body = 0;
  let low = 0;
  let zMin = Infinity;
  let zMax = -Infinity;
  for (const P of sleeves) {
    for (let i = 0; i < P.length; i += 3) {
      width = Math.max(width, Math.abs(P[i]!));
      low = Math.min(low, P[i + 1]!);
    }
  }
  for (const panel of [front, back]) {
    for (let i = 0; i < panel.pos.length / 3; i++) {
      const x = Math.abs(panel.pos[i * 3]!);
      const y = panel.pos[i * 3 + 1]!;
      const z = panel.pos[i * 3 + 2]!;
      const px = Math.abs(panel.pat[i * 2]!);
      const py = panel.pat[i * 2 + 1]!;
      width = Math.max(width, x);
      low = Math.min(low, y);
      if (px > p.half) continue;
      if (py < -0.4 && py > -0.5) body = Math.max(body, x);
      if (py < -p.length * 0.75) {
        zMin = Math.min(zMin, z);
        zMax = Math.max(zMax, z);
      }
    }
  }
  return { width: width * 2, bodyWidth: body * 2, depth: zMax - zMin, height: -low };
}

function acquireKind(kind: GarmentKind): KindParts {
  let entry = SHARED.get(kind);
  if (!entry) {
    const data = DRAPES[kind];
    const pattern = data.pattern;
    const box = boxFor(pattern);
    const front = decodePanel(data.front, 1);
    const back = decodePanel(data.back, -1);
    const frontGeo = panelGeometry(front, box);
    const sleeves = data.sleeves.map(decodeSleeve);
    const parts: KindParts = {
      pattern,
      box,
      front: frontGeo,
      back: panelGeometry(back, box),
      collar: collarGeometry(front, back, data.neck, kind),
      sleeves: sleeves.map((sl) => sleeveGeometry(sl)),
      sleeveSize: { around: 2 * (pattern.armpit - pattern.shoulderDrop) + 0.04, along: pattern.sleeve.top },
      size: measure(front, back, sleeves.map((sl) => sl.pos), pattern),
    };
    blendSeams(parts.sleeves, [parts.front, parts.back]);
    // the hanging shape's armhole ring is the same points as the open one's, so it takes the same (blended) normals
    for (const g of parts.sleeves) {
      const uv = g.attributes.uv as THREE.BufferAttribute;
      const n = g.attributes.normal as THREE.BufferAttribute;
      const hn = g.attributes.hangNormal as THREE.BufferAttribute;
      for (let i = 0; i < uv.count; i++) if (uv.getY(i) <= 1e-3) hn.setXYZ(i, n.getX(i), n.getY(i), n.getZ(i));
    }
    if (kind === "shirt") parts.extras = shirtParts(pattern, box, front, frontGeo.attributes.normal as THREE.BufferAttribute);
    entry = { parts, refs: 0 };
    SHARED.set(kind, entry);
  }
  entry.refs++;
  return entry.parts;
}

// A sleeve's geometry carries both of its shapes: open (position, normal) and hanging down its side (hangPosition,
// hangNormal); the cloth shader blends between them as the garment turns (see addFlow)
function sleeveGeometry(sl: ReturnType<typeof decodeSleeve>) {
  const geo = shadedGeometry(sl.pos, sl.uv, sl.tri, sl.ao);
  const hung = shadedGeometry(sl.hang, sl.uv, sl.tri, sl.ao);
  geo.setAttribute("hangPosition", new THREE.BufferAttribute(sl.hang, 3));
  geo.setAttribute("hangNormal", (hung.attributes.normal as THREE.BufferAttribute).clone());
  hung.dispose();
  // culling has to allow for either shape
  const box = new THREE.Box3().setFromArray(sl.pos).union(new THREE.Box3().setFromArray(sl.hang));
  geo.boundingBox = box;
  geo.boundingSphere = box.getBoundingSphere(new THREE.Sphere());
  return geo;
}

// Each sleeve starts on the body's armhole, point for point, but every piece works out its own normals, so the seam
// showed as a bright ridge where the two met at an angle. Points that share a place share one normal.
function blendSeams(sleeves: THREE.BufferGeometry[], body: THREE.BufferGeometry[]) {
  const at = (g: THREE.BufferGeometry) => (g.attributes.position as THREE.BufferAttribute).array as Float32Array;
  const nm = (g: THREE.BufferGeometry) => g.attributes.normal as THREE.BufferAttribute;
  for (const sleeve of sleeves) {
    const P = at(sleeve);
    const SN = nm(sleeve);
    const uv = sleeve.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < P.length / 3; i++) {
      // only the armhole ring (v = 0) is sewn to the body
      if (uv.getY(i) > 1e-3) continue;
      for (const piece of body) {
        const Q = at(piece);
        const BN = nm(piece);
        for (let j = 0; j < Q.length / 3; j++) {
          if (Math.abs(Q[j * 3]! - P[i * 3]!) + Math.abs(Q[j * 3 + 1]! - P[i * 3 + 1]!) + Math.abs(Q[j * 3 + 2]! - P[i * 3 + 2]!) > 1e-4) continue;
          const n = new THREE.Vector3(SN.getX(i) + BN.getX(j), SN.getY(i) + BN.getY(j), SN.getZ(i) + BN.getZ(j)).normalize();
          SN.setXYZ(i, n.x, n.y, n.z);
          BN.setXYZ(j, n.x, n.y, n.z);
        }
      }
    }
  }
}

function releaseKind(kind: GarmentKind) {
  const entry = SHARED.get(kind);
  if (!entry || --entry.refs > 0) return;
  const k = entry.parts;
  k.front.dispose();
  k.back.dispose();
  k.collar.dispose();
  k.sleeves.forEach((g) => g.dispose());
  k.extras?.flaps.forEach((g) => g.dispose());
  k.extras?.buttons.forEach((g) => g.dispose());
  SHARED.delete(kind);
}

// ---------------------------------------------------------------- the wardrobe

export function createWardrobe(renderer: THREE.WebGLRenderer, textures: GarmentTextures = {}): Wardrobe {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const roomLight = pmrem.fromScene(room, 0.04).texture;
  room.dispose();
  // The photographic cloth and light: whatever is already loaded on the page is used at once, the rest loads now.
  // The studio is prefiltered for this renderer when it arrives.
  let disposed = false;
  // once the first garment is made the look is fixed: a scan that arrives later (after the rack gave up waiting)
  // stays in the page cache for the next wardrobe instead of giving the rest of this rack a different cloth
  let fixed = false;
  const scans: Partial<Record<Exclude<keyof GarmentTextures, "studio">, THREE.Texture>> = {};
  let studioLight: THREE.Texture | null = null;
  const take = (key: keyof GarmentTextures, t: THREE.Texture | null | undefined) => {
    if (!t || disposed || fixed) return;
    if (key === "studio") studioLight = pmrem.fromEquirectangular(t).texture;
    else scans[key] = t;
  };
  const waiting: Promise<void>[] = [];
  for (const key of Object.keys(textures) as (keyof GarmentTextures)[]) {
    const url = textures[key];
    if (!url) continue;
    if (LOADED.has(url)) take(key, LOADED.get(url));
    else waiting.push(loadOnce(url, key === "studio").then((t) => take(key, t)));
  }
  const ready = Promise.all(waiting).then(() => undefined);
  // the heather grain is sampled in the cloth's shader; until there is one, a flat grey that changes nothing
  const flatGrain = new THREE.DataTexture(new Uint8Array([131, 131, 131, 255]), 1, 1);
  flatGrain.needsUpdate = true;
  // Chrome needs contrast to read as chrome: the rail, the hooks and the brackets reflect a studio of light and dark
  // bands (a softbox above, a bright strip, a dark horizon, a floor), so a rod gets its bright top, its dark line
  // and its bright lower edge
  const studio = studioScene();
  const strips = pmrem.fromScene(studio, 0).texture;
  disposeScene(studio);

  // shared by every garment of a kind
  const kinds = new Set<GarmentKind>();
  const knit = knitNormal();
  // The knit on each kind, body and sleeves: the scanned cloth tiled at its real size when there is one (jersey for
  // the tees and the shirt, fleece for the crewneck), else the drawn knit at the same stitch size on every kind (each
  // kind's texture covers a different part of the pattern)
  type Fabric = { normal: THREE.Texture; normalScale: number; roughness: THREE.Texture | null; scanned: boolean };
  const fabrics = new Map<GarmentKind, { body: Fabric; sleeve: Fabric }>();
  const tiled: THREE.Texture[] = [];
  const tile = (t: THREE.Texture, w: number, h: number) => {
    const c = t.clone();
    c.repeat.set(w, h);
    tiled.push(c);
    return c;
  };
  function fabricFor(kind: GarmentKind, w: number, h: number): Fabric {
    const fleece = kind === "crewneck";
    const scan = fleece ? scans.fleeceNormal : scans.jerseyNormal;
    const rough = fleece ? scans.fleeceRoughness : scans.jerseyRoughness;
    if (scan) return { normal: tile(scan, w / SCAN_TILE, h / SCAN_TILE), normalScale: fleece ? 0.8 : 0.6, roughness: rough ? tile(rough, w / SCAN_TILE, h / SCAN_TILE) : null, scanned: true };
    return { normal: tile(knit, 88 * w, 87 * h), normalScale: 0.3, roughness: null, scanned: false };
  }
  const [barGeo, blockGeo] = hangerGeometry();
  const hookGeo = hookGeometry();
  const chrome = new THREE.MeshStandardMaterial({ ...RAIL_LOOK.chrome, envMap: strips, envMapIntensity: 1 });
  const buttonMat = new THREE.MeshStandardMaterial({ color: 0xe9e2d4, roughness: 0.35 });

  function parts(kind: GarmentKind): KindParts {
    fixed = true;
    if (!kinds.has(kind)) {
      kinds.add(kind);
      const k = acquireKind(kind);
      fabrics.set(kind, { body: fabricFor(kind, k.box.w, k.box.h), sleeve: fabricFor(kind, k.sleeveSize.around, k.sleeveSize.along) });
      return k;
    }
    return SHARED.get(kind)!.parts;
  }

  function cloth(map: THREE.Texture, fabric: Fabric, colour: string, fleece: boolean) {
    const c = parse(colour);
    // dark cloth gets a much fainter sheen, or a black tee reads grey; light cloth too, or its edges glow and the
    // shirt loses its form
    const L = lum(colour);
    // black cotton barely shines: its reflections lifted a black tee to charcoal grey (fleece keeps its soft sheen)
    const black = L < 0.12 && !fleece;
    const sheen = c.clone().lerp(new THREE.Color(1, 1, 1), L < 0.12 ? 0.1 : 0.3);
    return new THREE.MeshPhysicalMaterial({
      map,
      vertexColors: true,
      // a scanned roughness map carries the knit's own sheen (it is multiplied by this)
      roughness: fabric.roughness ? 1 : fleece ? 0.97 : 0.93,
      roughnessMap: fabric.roughness,
      sheen: fleece ? 0.45 : L > 0.6 ? 0.16 : black ? 0.22 : 0.32,
      sheenRoughness: 0.82,
      sheenColor: sheen,
      normalMap: fabric.normal,
      normalScale: new THREE.Vector2(fabric.normalScale, fabric.normalScale),
      specularIntensity: black ? 0.12 : 0.25,
      // the cloth carries its own light (three ignores envMapIntensity for light taken from scene.environment)
      envMap: studioLight ?? roomLight,
      envMapRotation: studioLight ? STUDIO_TURN : ROOM_TURN,
      envMapIntensity: studioLight ? 1.2 : 0.55,
      // one layer of cloth: its inside shows through the neck and the sleeves
      side: THREE.DoubleSide,
    });
  }

  function garment(spec: GarmentSpec, hangerFinish: HangerFinish, options: { fadeable?: boolean } = {}): Garment {
    const k = parts(spec.kind);
    const fabric = fabrics.get(spec.kind)!;
    const object = new THREE.Group();
    const turn = new THREE.Group();
    object.add(turn);
    const own: { dispose(): void }[] = [];

    const frontMap = fabricTexture(spec, k.pattern, k.box, true, !fabric.body.scanned);
    const backMap = fabricTexture(spec, k.pattern, k.box, false, !fabric.body.scanned);
    own.push(frontMap, backMap);
    // upload now, while this garment is being built, instead of all twenty textures in the first frame
    renderer.initTexture(frontMap);
    renderer.initTexture(backMap);
    let gone = false;
    if (spec.image) {
      new THREE.TextureLoader().load(
        spec.image,
        (t) => {
          if (gone) {
            t.dispose();
            return;
          }
          t.colorSpace = THREE.SRGBColorSpace;
          frontMat.map = t;
          frontMat.needsUpdate = true;
          own.push(t);
        },
        undefined,
        // a photo that fails to load leaves the drawn fabric in place
        () => {},
      );
    }
    const fleece = spec.kind === "crewneck";
    const light = lum(spec.colour);
    // the inside of the cloth is in the garment's own shadow: on white it has to read clearly darker, or a sleeve
    // opening or the open hem looks like more of the outside
    const flow: FlowUniforms = {
      uTwist: { value: new Float32Array(CLOTH_ROWS + 1) },
      uSway: { value: new Float32Array(CLOTH_ROWS + 1) },
      uSwayAxis: { value: new THREE.Vector2(1, 0) },
      // the rows run from just under the hanger's arms to the hem
      uRows: { value: new THREE.Vector2(-0.2, Math.max(0.2, k.size.height - 0.2)) },
      uRipple: { value: 0 },
      uTime: { value: 0 },
      // garments are made side-on on the rail, sleeves down
      uHang: { value: HANG_AT_REST },
      uClothAo: { value: light > 0.6 ? 2.1 : light > 0.25 ? 1.3 : 1 },
      uInside: { value: light > 0.6 ? 0.74 : light > 0.25 ? 0.6 : 0.62 },
      // heather: strong on a grey marl, the faintest unevenness on any other colour, as dyed cotton has
      uGrain: { value: scans.heatherGrain ?? flatGrain },
      uGrainAmt: { value: scans.heatherGrain ? (isMarl(spec.colour) ? 0.42 : 0.06) : 0 },
    };
    const frontMat = cloth(frontMap, fabric.body, spec.colour, fleece);
    const backMat = cloth(backMap, fabric.body, spec.colour, fleece);
    own.push(frontMat, backMat);
    const folds: Folds = { box: k.box, pattern: k.pattern, strength: fleece ? 0.005 : 0.004 };
    addFlow(frontMat, flow, false, folds);
    addFlow(backMat, flow, false, folds);
    turn.add(new THREE.Mesh(k.front, frontMat), new THREE.Mesh(k.back, backMat));
    const sleeveMap = sleeveTexture(spec, k.sleeveSize, !fabric.sleeve.scanned);
    own.push(sleeveMap);
    renderer.initTexture(sleeveMap);
    const sleeveMat = cloth(sleeveMap, fabric.sleeve, spec.colour, fleece);
    own.push(sleeveMat);
    addFlow(sleeveMat, flow, true);
    k.sleeves.forEach((g) => turn.add(new THREE.Mesh(g, sleeveMat)));

    const dark = lum(spec.colour) < 0.12;
    const collarMat = new THREE.MeshPhysicalMaterial({ color: dark ? spec.colour : shade(spec.colour, light > 0.8 ? -0.2 : -0.04), roughness: 0.92, sheen: dark ? 0.2 : 0.6, sheenRoughness: 0.75, sheenColor: parse(spec.colour).lerp(new THREE.Color(1, 1, 1), dark ? 0.1 : 0.4), normalMap: fabric.body.normal, normalScale: new THREE.Vector2(0.4, 0.4), specularIntensity: 0.25, envMap: studioLight ?? roomLight, envMapRotation: studioLight ? STUDIO_TURN : ROOM_TURN, envMapIntensity: studioLight ? 1.2 : 0.55 });
    own.push(collarMat);
    addFlow(collarMat, flow);
    turn.add(new THREE.Mesh(k.collar, collarMat));
    if (k.extras) {
      // the collar is the body's own cloth (same print, same knit, same faint sheen), only a shade darker
      const flapMat = cloth(frontMap, fabric.body, spec.colour, false);
      own.push(flapMat);
      addFlow(flapMat, flow);
      const shirtButtons = buttonMat.clone();
      own.push(shirtButtons);
      addFlow(shirtButtons, flow);
      k.extras.flaps.forEach((g) => turn.add(new THREE.Mesh(g, flapMat)));
      k.extras.buttons.forEach((b) => turn.add(new THREE.Mesh(b, shirtButtons)));
    }

    // a lacquered finish: a clear coat over the wood, so the hanger catches a crisp highlight like the real thing
    const hangerMat = new THREE.MeshPhysicalMaterial({ ...HANGER_LOOK[hangerFinish], clearcoat: hangerFinish === "chrome" ? 0 : 0.7, clearcoatRoughness: 0.18 });
    own.push(hangerMat);
    turn.add(new THREE.Mesh(barGeo, hangerMat), new THREE.Mesh(blockGeo, hangerMat));
    // a garment that fades needs its own hook material (the shared one would fade every hook on the page)
    const hookMat = options.fadeable ? chrome.clone() : chrome;
    if (options.fadeable) own.push(hookMat);
    const hook = new THREE.Mesh(hookGeo, hookMat);
    object.add(hook);
    // every material of this garment, for the fade passes; a fadeable garment is always drawn as transparent (at
    // opacity 1 when solid), so switching passes never needs a new shader
    const materials: THREE.Material[] = [];
    object.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.Material | undefined;
      if (m && !materials.includes(m)) materials.push(m);
    });
    if (options.fadeable) for (const m of materials) m.transparent = true;

    return {
      object,
      turn,
      hook,
      ...k.size,
      setCloth(c) {
        flow.uTwist.value.set(c.twist);
        flow.uSway.value.set(c.sway);
        flow.uRipple.value = c.ripple;
        flow.uTime.value = c.time;
        // the sway is along the rail, but the cloth bends in the garment's own frame, which is turned by
        // turn.rotation.y: the rail's direction seen from inside the garment
        const th = turn.rotation.y;
        flow.uSwayAxis.value.set(Math.cos(th), Math.sin(th));
        // side-on on the rail the sleeves hang half way down (all the way down they read as flat slabs, fully open as
        // pouches sticking out); they open fully within about 20 degrees of facing you
        const a = Math.min(1, Math.max(0, (Math.abs(th) - 0.35) / 0.9));
        flow.uHang.value = HANG_AT_REST * a * a * (3 - 2 * a);
      },
      setPass(pass, opacity = 1) {
        if (!options.fadeable) return;
        for (const m of materials) {
          m.colorWrite = pass !== "depth";
          m.depthWrite = pass !== "fade";
          m.opacity = pass === "fade" ? opacity : 1;
        }
      },
      setHanger(f) {
        const look = HANGER_LOOK[f];
        hangerMat.color.setHex(look.color);
        hangerMat.metalness = look.metalness;
        hangerMat.roughness = look.roughness;
      },
      dispose() {
        gone = true;
        own.forEach((d) => d.dispose());
      },
    };
  }

  function rail(length: number, finish: RailFinish): Rail {
    const object = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ ...RAIL_LOOK[finish], envMap: strips, envMapIntensity: 1 });
    const tubeGeo = new THREE.CylinderGeometry(RAIL_R, RAIL_R, 1, 48, 1, true).rotateZ(Math.PI / 2);
    const tube = new THREE.Mesh(tubeGeo, mat);
    // Each end is held by a wall bracket, like a shop rail: a plate on the wall with two screws, a post out to the
    // rail, a collar round the tube and a domed end cap
    const collarGeo = new THREE.CylinderGeometry(RAIL_R * 1.32, RAIL_R * 1.32, 0.024, 40).rotateZ(Math.PI / 2);
    const domeGeo = new THREE.SphereGeometry(RAIL_R * 1.32, 40, 16, 0, Math.PI * 2, 0, Math.PI / 2).rotateZ(-Math.PI / 2);
    domeGeo.scale(0.4, 1, 1);
    const plateGeo = new THREE.BoxGeometry(0.05, 0.13, 0.008);
    const postGeo = new THREE.CylinderGeometry(0.0105, 0.0105, 0.05, 24).rotateX(Math.PI / 2);
    const screwGeo = new THREE.CylinderGeometry(0.0055, 0.0055, 0.003, 16).rotateX(Math.PI / 2);
    const screwMat = new THREE.MeshStandardMaterial({ color: 0x55585e, metalness: 0.8, roughness: 0.4, envMap: strips, envMapIntensity: 1 });
    // the wall plate is brushed, not mirror-polished: flat and facing you, a mirror would only show the dark horizon
    const plateMat = new THREE.MeshStandardMaterial({ color: 0xdfe2e6, metalness: 1, roughness: 0.42, envMap: strips, envMapIntensity: 1 });
    const end = (side: 1 | -1) => {
      const g = new THREE.Group();
      const collar = new THREE.Mesh(collarGeo, mat);
      const dome = new THREE.Mesh(domeGeo, mat);
      dome.scale.x = side;
      dome.position.x = side * 0.012;
      const plate = new THREE.Mesh(plateGeo, plateMat);
      plate.position.set(side * 0.004, 0, -0.054);
      const post = new THREE.Mesh(postGeo, mat);
      post.position.set(side * 0.004, 0, -0.027);
      g.add(collar, dome, plate, post);
      for (const y of [0.042, -0.042]) {
        const screw = new THREE.Mesh(screwGeo, screwMat);
        screw.position.set(side * 0.004, y, -0.0485);
        g.add(screw);
      }
      return g;
    };
    const left = end(-1);
    const right = end(1);
    object.add(tube, left, right);
    const api: Rail = {
      object,
      setLength(l) {
        tube.scale.x = l;
        left.position.x = -l / 2 - 0.006;
        right.position.x = l / 2 + 0.006;
      },
      setFinish(f) {
        const look = RAIL_LOOK[f];
        mat.color.setHex(look.color);
        mat.metalness = look.metalness;
        mat.roughness = look.roughness;
        plateMat.color.setHex(look.color);
        plateMat.metalness = look.metalness;
        plateMat.roughness = Math.max(0.42, look.roughness);
      },
      dispose() {
        tubeGeo.dispose();
        collarGeo.dispose();
        domeGeo.dispose();
        plateGeo.dispose();
        postGeo.dispose();
        screwGeo.dispose();
        screwMat.dispose();
        plateMat.dispose();
        mat.dispose();
      },
    };
    api.setLength(length);
    return api;
  }

  function addLights(scene: THREE.Scene) {
    // Most of the light is the studio around the cloth. On top of it, a key high on the left, so the cloth turns from
    // light to shade across its folds, and a low side light on the right as strong as the key: the rail shows each
    // garment side-on, and that light is what keeps a white tee white there, as a strip box beside a rail does.
    scene.add(new THREE.HemisphereLight(0xffffff, 0xcfd0d3, 0.05));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(-3.3, 2.5, 1.6);
    const side = new THREE.DirectionalLight(0xf4f6ff, 1);
    side.position.set(2.6, 0.6, 2.2);
    scene.add(key, side);
  }

  return {
    garment,
    rail,
    get environment() {
      return studioLight ?? roomLight;
    },
    ready,
    addLights,
    dispose() {
      disposed = true;
      kinds.forEach(releaseKind);
      kinds.clear();
      // only this wardrobe's tiled copies: the scans themselves are shared by the page
      tiled.forEach((t) => t.dispose());
      tiled.length = 0;
      fabrics.clear();
      flatGrain.dispose();
      studioLight?.dispose();
      knit.dispose();
      barGeo.dispose();
      blockGeo.dispose();
      hookGeo.dispose();
      chrome.dispose();
      buttonMat.dispose();
      roomLight.dispose();
      strips.dispose();
      pmrem.dispose();
    },
  };
}
