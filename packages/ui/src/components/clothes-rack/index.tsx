"use client";

import { flushSync } from "react-dom";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type FocusEvent, type KeyboardEvent } from "react";
import * as THREE from "three";
import { ClothMotion } from "./cloth-motion";
import { createWardrobe, type Garment, type GarmentSpec, type GarmentTextures, type HangerFinish, type RailFinish, type Wardrobe } from "./garment";

// A shop rail of real 3D garments, built to move like the reference shop page.
// At rest every garment hangs side-on on its swivel hook, perfectly still. Point at one and it swivels to
// face you while only its neighbours slide apart along the rail: the facing garment's hook never moves,
// the nearest neighbour moves the most, the next ones less and less, and far ones not at all.
// Two signals drive it. "open" is the spacing: each garment's share eases out like a first-order lag
// (time constant 0.18 s), and every position is a plain sum of the open amounts, so nothing overshoots.
// "t" is the turn: a critically damped spring that settles in about the chosen duration.
// The cloth itself moves too (cloth-motion.ts): its lower part lags a turn or a push, swings through once and
// settles, with a faint ripple running down the fabric, then everything is still again.
// A click on the facing garment fades a detail view in over the page. Its arrows swap garments the way you flip
// through a rail: the one on show slides aside turning side-on and fades, the next swings in to face you.
// three.js only renders while something moves, and stops when offscreen or the tab is hidden.

export type ClothesRackItem = GarmentSpec & {
  /** The product name: the caption under the facing garment and the title in the detail view. */
  name: string;
};

export type ClothesRackProps = {
  /** The garments on the rail, in order. Defaults to ten garments of our own design: eight tees, a crewneck and a shirt. */
  items?: ClothesRackItem[];
  /** How far each garment is turned away at rest, in degrees. 90 would be edge-on. Default 80. */
  restAngle?: number;
  /** The clear air between side-on garments, as a percentage of a garment's body width. Default 7. */
  gap?: number;
  /** How much the facing garment grows, from 1 (not at all) to 1.2. Default 1. */
  activeScale?: number;
  /** The peak tilt in degrees a pushed hanger leans against the push, as a rigid tilt. 0 keeps every hanger still. Default 0. */
  swing?: number;
  /** How long a garment takes to turn to face you, in seconds. Default 0.25. */
  duration?: number;
  /** How much the fabric moves: its hem lags a turn and trails a push, then swings back and settles. 0 keeps the cloth stiff, 2 is very loose. Default 1. */
  flow?: number;
  /**
   * A soft draught along the rail, so the rack moves on its own: each garment turns a few degrees back and forth, a
   * slow wave running down the rail, and its cloth sways. 0 keeps everything still until it is pointed at, 1 is a
   * gentle breeze. A garment turned to face you is out of it. Off with reduced motion. Default 0.
   */
  breeze?: number;
  /** The finish of the rail. Default "chrome". */
  rail?: RailFinish;
  /** The finish of the hangers. Default "wood". */
  hanger?: HangerFinish;
  /** Show the product name under the facing garment. Default true. */
  showCaption?: boolean;
  /** Open a detail view when the facing garment is clicked (or Enter is pressed). Default true. */
  detail?: boolean;
  /** How much of the box height a garment takes, from 0.25 to 0.62. Default 0.55. */
  size?: number;
  /**
   * Photographic cloth and light: URL strings for tiling fabric scans (normal and roughness maps of jersey for the tees
   * and the shirt and of fleece for the crewneck), a greyscale heather grain, and an equirect .hdr studio. All
   * optional; without them the knit is drawn in code and the light is a plain room. Demo scans ship next to the
   * component under `textures/` (Poly Haven CC0) - import them and pass `.src` / string URLs here.
   */
  textures?: GarmentTextures;
  /** Extra classes for the outer box. Give it a size: the rack fills it. */
  className?: string;
};

export const defaultItems: ClothesRackItem[] = [
  { name: "Field Shirt", kind: "shirt", colour: "#2f3631", print: { kind: "pattern", colours: ["#20251f", "#e6dcc4", "#c7a46c", "#9fae86", "#bf7350"] } },
  { name: "Heavy Tee, Black", kind: "tee", colour: "#1b1b1d" },
  { name: "Heavy Tee, White", kind: "tee", colour: "#f2f2f3" },
  { name: "Made Slowly Tee", kind: "tee", colour: "#18181a", print: { kind: "script", text: "Made Slowly", ink: "#f4f1ea" } },
  { name: "Field Notes Crewneck", kind: "crewneck", colour: "#2c4844", print: { kind: "serif", lines: ["Field", "Notes", "Club"], ink: "#f1ede2" } },
  { name: "Night Shift Tee", kind: "tee", colour: "#1d1a1f", print: { kind: "chest", text: "Night Shift", ink: "#e9e4dc" } },
  { name: "Bloom Tee", kind: "tee", colour: "#f4f4f5", print: { kind: "flowers", text: "Bloom", ink: "#1f1f24" } },
  { name: "Studio Tee", kind: "tee", colour: "#f5f5f6", print: { kind: "chest", text: "SonoJS Studio", ink: "#22252b" } },
  { name: "Pocket Tee", kind: "tee", colour: "#f3f3f4", print: { kind: "pocket" } },
  { name: "Grey Marl Tee", kind: "tee", colour: "#7d7f84" },
];

// ---------- page theme and motion preference, live, without any site context ----------

function pageIsDark(): boolean {
  const root = document.documentElement;
  const picked = root.getAttribute("data-theme");
  if (picked === "dark") return true;
  if (picked === "light") return false;
  if (root.classList.contains("dark")) return true;
  if (root.classList.contains("light")) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function watchPageTheme(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  query.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    query.removeEventListener("change", onChange);
  };
}

function watchMotion(onChange: () => void): () => void {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- numbers ----------

// A long lens: garments at the ends of the rail are seen at almost the same angle as the middle ones
const FOV = 12;
// Where the rail sits on screen, as a fraction of the height from the top
const RAIL_AT = 0.22;
// Stepping at 240 a second keeps the springs stable even with a very short duration
const STEP = 1 / 240;
// How tall the pointer zone is, in garment heights: from just above the rail to just below the hems
const ZONE_TOP = 0.2;
// In the detail view the garment, hook included, takes this much of the box height
const DETAIL_TAKES = 0.57;
const DETAIL_TOP = 0.15;
// How the spacing eases: first-order lags, in seconds (opening, and returning to rest)
const OPEN_TAU = 0.18;
const CLOSE_TAU = 0.2;
// How far each step away from the facing garment is pushed, as a share of the first neighbour's push (measured)
const PUSH_PROFILE = [1, 0.577, 0.309, 0.144, 0.052];
// Empty rail past the end hooks, in pitches, and room kept for the end cap
const RAIL_PAD = 1.1;
const CAP_ROOM = 0.1;

const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Entry = {
  garment: Garment;
  /** Facing amount: 0 turned away at rest, 1 facing you (a critically damped spring) */
  t: number;
  tVelocity: number;
  tGoal: number;
  /** Spacing signal: 0 rest, 1 fully open (a first-order ease), the neighbours' positions are sums of these */
  open: number;
  x: number;
  /** x speed of the last frame, for the optional rigid hanger tilt and the cloth */
  xVelocity: number;
  /** The fabric: rows of cloth that lag the hanger's turns and pushes, then settle (cloth-motion.ts) */
  cloth: ClothMotion;
  lastTVelocity: number;
  lastXVelocity: number;
};

type Engine = {
  setActive(index: number): void;
  openDetail(index: number): void;
  closeDetail(): void;
  stepDetail(direction: 1 | -1): void;
  activeIndex(): number;
  lastIndex(): number;
};

// Moves a spring one step toward its goal without ever overshooting (critically damped)
function spring(value: number, velocity: number, goal: number, omega: number, dt: number): [number, number] {
  let x = value;
  let v = velocity;
  let left = dt;
  while (left > 1e-9) {
    const h = Math.min(STEP, left);
    v += (-2 * omega * v - omega * omega * (x - goal)) * h;
    x += v * h;
    left -= h;
  }
  return [x, v];
}

export function ClothesRack({
  items = defaultItems,
  restAngle = 80,
  gap = 7,
  activeScale = 1,
  swing = 0,
  breeze = 0,
  duration = 0.25,
  flow = 1,
  rail = "chrome",
  hanger = "wood",
  showCaption = true,
  detail = true,
  size = 0.55,
  textures,
  className = "",
}: ClothesRackProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasBoxRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const reducedMotion = useSyncExternalStore(watchMotion, prefersReducedMotion, () => false);
  const dark = useSyncExternalStore(watchPageTheme, pageIsDark, () => false);

  const [failed, setFailed] = useState(false);
  // True while the GPU has taken the WebGL context away; a restore rebuilds the scene (generation bumps the effect)
  const [lost, setLost] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  // The detail layer is on screen from the start of its fade in to the end of its fade out
  const [stageOn, setStageOn] = useState(false);
  const [detailIndex, setDetailIndex] = useState(0);
  // The garment a keyboard (or screen reader) focus is on: the live status follows this, never the mouse
  const [focusIdx, setFocusIdx] = useState(-1);
  const [, setActiveIdx] = useState(-1);
  // Which arrow key looks pressed (the real arrow keys and the buttons move together)
  const [pressed, setPressed] = useState<"prev" | "next" | null>(null);
  const wasOpen = useRef(false);
  const detailIndexRef = useRef(0);
  const garmentButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const pressTimer = useRef(0);
  const pressedAt = useRef(0);

  // The loop reads these every frame, so a slider never rebuilds the scene
  const settings = useRef({ restAngle, gap, activeScale, swing, breeze, duration, flow, rail, hanger, showCaption, detail, size, reducedMotion });
  const refreshRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    settings.current = { restAngle, gap, activeScale, swing, breeze, duration, flow, rail, hanger, showCaption, detail, size, reducedMotion };
    refreshRef.current?.();
  }, [restAngle, gap, activeScale, swing, breeze, duration, flow, rail, hanger, showCaption, detail, size, reducedMotion]);

  // A new array every render must not rebuild the scene: only its content does (the same for the textures)
  const itemsKey = useMemo(() => JSON.stringify(items), [items]);
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const texturesKey = useMemo(() => JSON.stringify(textures ?? {}), [textures]);
  const texturesRef = useRef(textures);
  texturesRef.current = textures;

  useEffect(() => {
    const box = canvasBoxRef.current;
    const host = hostRef.current;
    const stageBox = stageRef.current;
    if (!box || !host || !stageBox) return;
    const list = itemsRef.current;
    if (list.length === 0) return;
    setFailed(false);

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:pan-y";
    box.prepend(canvas);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      canvas.remove();
      setFailed(true);
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // a straight tone curve: the cloth is lit like a product shot, so white stays white and black keeps its folds
    renderer.toneMapping = THREE.LinearToneMapping;
    // Context loss (a GPU reset, too many contexts): keep the canvas, show the overlay, and rebuild everything when it returns
    const onLost = (event: Event) => {
      event.preventDefault();
      setLost(true);
    };
    const onRestored = () => {
      setLost(false);
      setGeneration((g) => g + 1);
    };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    let alive = true;
    let visible = true;
    let raf = 0;
    let buildRaf = 0;
    let last = 0;
    let clock = 0;
    // how strong the breeze is right now: it eases toward the breeze prop, and to nothing while the detail view
    // covers the rack (so the rack can stop drawing under it)
    let airLevel = 0;
    let needsSnap = true;
    let built = false;

    // ----- the rack scene -----
    const fabricScans = texturesRef.current ?? {};
    const wardrobe: Wardrobe = createWardrobe(renderer, fabricScans);
    const scene = new THREE.Scene();
    // the light goes in once the textures have settled (see buildSome)
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 80);
    const railMesh = wardrobe.rail(4, settings.current.rail);
    scene.add(railMesh.object);

    const entries: Entry[] = [];

    // ----- view and layout, derived from the props and the box size -----
    const view = { width: 1, height: 1, aspect: 1, hw: 2.4, camY: 0, railAt: RAIL_AT, panX: 0, panMax: 0, panLimit: 0, railLength: 4, dist: 20 };
    // The angle a garment at x is seen at, left or right of the camera's axis (0 in the middle)
    const viewAngle = (x: number) => Math.atan2(x - view.panX, view.dist);
    // Where a garment brought forward by z must stand so it shows on screen where it would without the lift
    const liftedX = (x: number, z: number) => view.panX + (x - view.panX) * (1 - z / view.dist);
    let appliedRail = settings.current.rail;
    let appliedHanger = settings.current.hanger;
    let appliedLength = 0;

    // Where every garment sits at rest and how far a facing garment pushes its first neighbour (garment units).
    // The first neighbour is pushed about 0.97 of a pitch (measured on the reference) for every garment, and more only when
    // the facing garment is wide enough that its sleeves would otherwise touch it
    type Layout = { rest: number[]; sideHalf: number[]; faceHalf: number[]; pitch: number; push: number[]; railLength: number };
    function computeLayout(): Layout {
      const s = settings.current;
      const a = (s.restAngle * Math.PI) / 180;
      const n = entries.length;
      const sideHalf = entries.map((e) => 0.5 * (lerp(e.garment.bodyWidth, e.garment.width, 0.5) * Math.abs(Math.cos(a)) + e.garment.depth * Math.abs(Math.sin(a))));
      const faceHalf = entries.map((e) => (e.garment.width * s.activeScale) / 2);
      const air = entries.map((e) => (s.gap / 100) * e.garment.bodyWidth);
      const rest: number[] = [0];
      for (let i = 1; i < n; i++) rest.push(rest[i - 1]! + sideHalf[i - 1]! + sideHalf[i]! + (air[i - 1]! + air[i]!) / 2);
      const centre = n > 0 ? (rest[0]! + rest[n - 1]!) / 2 : 0;
      for (let i = 0; i < n; i++) rest[i] = rest[i]! - centre;
      const pitch = n > 1 ? (rest[n - 1]! - rest[0]!) / (n - 1) : (sideHalf[0] ?? 0.2) * 2 + (air[0] ?? 0.1);
      const meanSide = sideHalf.reduce((sum, v) => sum + v, 0) / Math.max(1, n);
      const push = entries.map((e, i) => Math.max(faceHalf[i]! + meanSide + 0.06 * e.garment.bodyWidth - pitch, 0.97 * pitch));
      const railLength = (n > 1 ? rest[n - 1]! - rest[0]! : 0) + 2 * RAIL_PAD * pitch + 2 * CAP_ROOM;
      return { rest, sideHalf, faceHalf, pitch, push, railLength };
    }

    // Every hook position is the rest place plus the pushes of the garments that are open: no spring on x.
    // The facing garment's own hook never moves. The ends are held on the rail, and the order never inverts.
    function goalXs(layout: Layout): number[] {
      const n = entries.length;
      const xs = layout.rest.slice();
      for (let i = 0; i < n; i++) {
        const open = entries[i]!.open;
        if (open < 1e-5) continue;
        for (let d = 1; d <= PUSH_PROFILE.length; d++) {
          const amount = open * layout.push[i]! * PUSH_PROFILE[d - 1]!;
          if (i + d < n) xs[i + d] = xs[i + d]! + amount;
          if (i - d >= 0) xs[i - d] = xs[i - d]! - amount;
        }
      }
      let anchor = 0;
      for (let i = 1; i < n; i++) if (entries[i]!.open > entries[anchor]!.open) anchor = i;
      const lo = -layout.railLength / 2 + CAP_ROOM;
      const hi = layout.railLength / 2 - CAP_ROOM;
      const minGap = layout.sideHalf.reduce((sum, v) => sum + v, 0) / Math.max(1, n);
      for (let i = 0; i < n; i++) if (i !== anchor || xs[i]! < lo || xs[i]! > hi) xs[i] = i === anchor ? xs[i]! : clamp(xs[i]!, lo, hi);
      for (let j = anchor + 1; j < n; j++) xs[j] = Math.max(xs[j]!, xs[j - 1]! + minGap);
      for (let j = anchor - 1; j >= 0; j--) xs[j] = Math.min(xs[j]!, xs[j + 1]! - minGap);
      return xs;
    }

    let layout: Layout = computeLayout();
    // The longest garment on the rail, rail to hem: framing leaves room for the caption under it
    const tallest = () => entries.reduce((most, e) => Math.max(most, e.garment.height), 0.3);

    function frameView() {
      const s = settings.current;
      layout = computeLayout();
      view.railLength = layout.railLength;
      // Tall boxes keep a touch more headroom above the rail; wide boxes sit the rail higher so hems fill the frame
      view.railAt = view.aspect < 1 ? 0.28 : RAIL_AT;
      const faceMax = layout.faceHalf.reduce((m, v) => Math.max(m, v), 0.2);
      // Caption-only margin under the hem (the old pill reserved ~84px; we only need a thin caption band)
      const roomBelow = Math.max(0.2, (view.height - 40) / view.height - view.railAt);
      const natural = Math.max(tallest() / s.size, (s.activeScale * tallest()) / roomBelow);
      // like the reference, the rail spans about 78% of a wide box, with clear page either side
      const fit = view.railLength / (0.78 * view.aspect);
      // Fit the whole rail when that is a reasonable zoom (wide boxes, tablets); a phone keeps the garments big and pans
      // Tall boxes (tablets) zoom out at most 1.5x and pan a little; phones stay big and pan
      view.hw = fit > natural && (view.aspect >= 1.2 || fit <= natural * 3) ? (view.aspect < 1.2 ? clamp(fit, natural, 1.5 * natural) : fit) : natural;
      view.camY = -(0.5 - view.railAt) * view.hw;
      const visibleWidth = view.hw * view.aspect;
      // Panning reaches the rail's end caps; a facing end garment may go a little further
      view.panMax = Math.max(0, view.railLength / 2 + 0.06 - visibleWidth / 2);
      view.panLimit = view.panMax + faceMax + 0.1;
      view.panX = clamp(view.panX, -view.panLimit, view.panLimit);
      if (Math.abs(view.railLength - appliedLength) > 1e-4) {
        railMesh.setLength(view.railLength);
        appliedLength = view.railLength;
      }
      if (s.rail !== appliedRail) {
        railMesh.setFinish(s.rail);
        appliedRail = s.rail;
      }
      if (s.hanger !== appliedHanger) {
        for (const e of entries) e.garment.setHanger(s.hanger);
        appliedHanger = s.hanger;
      }
      camera.fov = FOV;
      const distance = view.hw / 2 / Math.tan((FOV * Math.PI) / 360);
      view.dist = distance;
      camera.position.set(view.panX, view.camY, distance);
      camera.rotation.set(0, 0, 0);
      camera.aspect = view.aspect;
      camera.near = distance * 0.2;
      camera.far = distance * 4;
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld(true);
    }

    function resize() {
      const rect = host!.getBoundingClientRect();
      view.width = Math.max(1, rect.width);
      view.height = Math.max(1, rect.height);
      view.aspect = view.width / view.height;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(view.width, view.height, false);
      if (!built) return;
      frameView();
      renderer.render(scene, camera);
      if (needsSnap) {
        needsSnap = false;
        snapAll();
        // One frame is drawn before the canvas fades in, so there is no flash
        renderer.render(scene, camera);
        updateCaption();
        requestAnimationFrame(() => requestAnimationFrame(() => alive && setReady(true)));
      }
      if (detailState) sizeDetail();
      updateCaption();
      wake();
    }

    // ----- hover, touch, pan -----
    let active = -1;
    let lastActive = -1;
    let panVelocity = 0;
    let panGoal: number | null = null;
    let dragging = false;
    let dragMoved = false;
    let dragStartX = 0;
    let dragLastX = 0;
    let dragLastTime = 0;
    let touchId: number | null = null;
    // The mouse position while it is over the canvas: the garment under it is re-checked every frame
    let hovering = false;
    let hoverX = 0;
    let hoverY = 0;
    // The keyboard (or focus) picked the garment last: a resting pointer does not take it back until it moves
    let keyLead = false;

    const canPan = () => view.panMax > 0.02;

    // A garment that is cut off by the screen edge (tapped, hovered or focused with the keyboard) glides to the middle
    function bringIntoView(index: number) {
      if (!canPan()) return;
      const e = entries[index]!;
      const half = (view.hw * view.aspect) / 2;
      const reach = layout.faceHalf[index]! + 0.08;
      if (Math.abs(e.x - view.panX) + reach <= half) return;
      panGoal = clamp(e.x, -view.panLimit, view.panLimit);
      panVelocity = 0;
      wake();
    }

    function setActive(index: number) {
      if (!built || index === active) return;
      active = index;
      // a hand over a garment says it can be opened
      canvas.style.cursor = index >= 0 && settings.current.detail ? "pointer" : "";
      setActiveIdx(index);
      if (index >= 0) lastActive = index;
      if (index >= 0) bringIntoView(index);
      for (let i = 0; i < entries.length; i++) entries[i]!.tGoal = i === index ? 1 : 0;
      wake();
    }

    // The garment whose silhouette, as it is right now, contains the pointer. Over a gap nothing is picked.
    function pick(clientX: number, clientY: number, slack = 1): number {
      const rect = host!.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = 1 - ((clientY - rect.top) / rect.height) * 2;
      const halfH = view.hw / 2;
      const wx = view.panX + nx * halfH * view.aspect;
      const wy = view.camY + ny * halfH;
      let best = -1;
      let bestDistance = Infinity;
      for (let i = 0; i < entries.length; i++) {
        const e = entries[i]!;
        const scale = lerp(1, settings.current.activeScale, e.t);
        if (wy > ZONE_TOP || wy < -scale * e.garment.height - 0.05) continue;
        const half = lerp(layout.sideHalf[i]!, layout.faceHalf[i]!, e.t) * (i === active ? 1.05 : 1) * slack;
        const distance = Math.abs(wx - e.x);
        if (distance <= half && distance < bestDistance) {
          best = i;
          bestDistance = distance;
        }
      }
      return best;
    }

    // A mouse, or a pen that is hovering with no button down, points; touch and a pen on the glass drag
    const isPointing = (event: PointerEvent) => event.pointerType === "mouse" || (event.pointerType === "pen" && event.buttons === 0);

    function onPointerMove(event: PointerEvent) {
      if (openRef.current || closing) return;
      if (!isPointing(event)) {
        if (touchId !== event.pointerId || !event.isPrimary) return;
        const dx = event.clientX - dragLastX;
        if (Math.abs(event.clientX - dragStartX) > 6) dragMoved = true;
        if (dragMoved && canPan()) {
          const perPixel = (view.hw * view.aspect) / view.width;
          const now = performance.now();
          panVelocity = (-dx * perPixel) / Math.max(0.008, (now - dragLastTime) / 1000);
          view.panX = clamp(view.panX - dx * perPixel, -view.panMax, view.panMax);
          panGoal = null;
          dragLastTime = now;
          frameView();
          wake();
        }
        dragLastX = event.clientX;
        return;
      }
      hovering = true;
      keyLead = false;
      hoverX = event.clientX;
      hoverY = event.clientY;
      setActive(pick(event.clientX, event.clientY));
    }

    function onPointerDown(event: PointerEvent) {
      if (openRef.current) return;
      if (isPointing(event) || event.pointerType === "mouse") return;
      // A second finger must not take over from the first
      if (touchId !== null || !event.isPrimary) return;
      touchId = event.pointerId;
      dragging = true;
      dragMoved = false;
      dragStartX = dragLastX = event.clientX;
      dragLastTime = performance.now();
      panVelocity = 0;
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        // some browsers refuse capture for synthetic pointers: dragging still works without it
      }
    }

    // A cancelled touch (the browser took it for scrolling) never picks, faces or opens anything
    function onPointerCancel(event: PointerEvent) {
      if (touchId === event.pointerId) {
        touchId = null;
        dragging = false;
        wake();
      }
    }

    function onPointerUp(event: PointerEvent) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      const touchLike = event.pointerType === "touch" || (event.pointerType === "pen" && touchId === event.pointerId);
      if (touchLike) {
        if (touchId !== event.pointerId) return;
        touchId = null;
        dragging = false;
        if (dragMoved) {
          wake();
          return;
        }
      }
      if (openRef.current || closing) return;
      // A finger is fatter than a pointer: a tap gets a wider silhouette
      const index = pick(event.clientX, event.clientY, touchLike ? 1.5 : 1);
      if (index < 0) {
        if (touchLike) setActive(-1);
        return;
      }
      // A tap turns a garment to face you, a second tap on it opens the detail view
      if (index === active && (!touchLike || entries[index]!.t > 0.6)) {
        if (settings.current.detail) openDetail(index);
      } else {
        setActive(index);
        if (touchLike && canPan()) {
          // A facing end garment may pass the normal pan end by half its width, so it ends up fully in view
          panGoal = clamp(entries[index]!.x, -view.panLimit, view.panLimit);
          wake();
        }
      }
    }

    function onPointerLeave(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      hovering = false;
      // The detail layer covers the canvas, which fires a leave too - keep the facing garment while the stage is open
      if (!openRef.current && !closing) setActive(-1);
    }

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerCancel);
    canvas.addEventListener("pointerleave", onPointerLeave);

    // ----- caption under the hem of the facing garment -----
    const captionEl = captionRef.current;
    let captionIndex = -1;
    const corner = new THREE.Vector3();
    // depth: how far below the rail the hem is
    const hemPx = (depth: number, z: number) => {
      corner.set(0, -depth, z).project(camera);
      return (-corner.y * 0.5 + 0.5) * view.height;
    };
    // Whether the caption still fits under the hem without colliding with the bottom edge
    function captionFits(): boolean {
      const s = settings.current;
      const lowestHem = hemPx(s.activeScale * tallest(), 0.06);
      return lowestHem + 18 + 16 + 4 <= view.height - 30;
    }
    function updateCaption() {
      const fits = captionFits();
      if (!captionEl) return;
      const s = settings.current;
      const idx = active >= 0 ? active : captionIndex;
      const e = idx >= 0 ? entries[idx] : undefined;
      if (!e || !s.showCaption || openRef.current || !fits) {
        captionEl.style.opacity = "0";
        return;
      }
      if (idx !== captionIndex) {
        captionIndex = idx;
        captionEl.textContent = list[idx]!.name;
      }
      const scale = lerp(1, s.activeScale, e.t);
      const py = hemPx(scale * e.garment.height, e.garment.object.position.z);
      corner.set(e.garment.object.position.x, 0, e.garment.object.position.z).project(camera);
      const px = (corner.x * 0.5 + 0.5) * view.width;
      captionEl.style.transform = `translate(${px.toFixed(1)}px, ${(py + 18).toFixed(1)}px) translateX(-50%)`;
      captionEl.style.opacity = String(clamp(e.t * 1.4 - 0.15, 0, 1) * (active >= 0 ? 1 : e.t));
      if (active < 0 && e.t < 0.02) captionIndex = -1;
    }

    // The first layout puts everything straight at its resting place: nothing slides or turns on load
    function snapAll() {
      const s = settings.current;
      for (const e of entries) {
        e.t = e.tGoal;
        e.open = e.tGoal;
      }
      const goals = goalXs(layout);
      const rest = (s.restAngle * Math.PI) / 180;
      for (const [i, e] of entries.entries()) {
        e.x = goals[i]!;
        Object.assign(e, { tVelocity: 0, xVelocity: 0, lastTVelocity: 0, lastXVelocity: 0 });
        e.cloth.reset();
        e.garment.object.position.set(liftedX(e.x, 0.06 * e.t), 0, 0.06 * e.t);
        e.garment.object.rotation.set(0, 0, 0);
        e.garment.turn.rotation.y = rest * (1 - e.t) - viewAngle(e.x);
        e.garment.turn.scale.setScalar(lerp(1, s.activeScale, e.t));
        e.garment.setCloth({ twist: e.cloth.twist, sway: e.cloth.sway, ripple: 0, time: 0 });
      }
    }

    // ----- one frame of the rack -----
    function stepRack(dt: number): boolean {
      const s = settings.current;
      const reduced = s.reducedMotion;
      const omega = 4.6 / (reduced ? 0.15 : Math.max(0.1, s.duration));
      const tilt = reduced ? 0 : (s.swing * Math.PI) / 180;
      let busy = false;
      clock += dt;
      // the breeze comes up over the first seconds, so nothing jumps when the rack appears, and dies down while the
      // detail view is open
      const airGoal = reduced || openRef.current ? 0 : Math.max(0, Math.min(1, s.breeze)) * Math.min(1, clock / 2.5) ** 2;
      airLevel += (airGoal - airLevel) * (1 - Math.exp(-dt / 0.6));
      if (airGoal === 0 && airLevel < 1e-3) airLevel = 0;
      const air = airLevel;
      if (air > 0 || airGoal > 0) busy = true;

      for (const e of entries) {
        [e.t, e.tVelocity] = spring(e.t, e.tVelocity, e.tGoal, omega, dt);
        if (Math.abs(e.t - e.tGoal) > 5e-4 || Math.abs(e.tVelocity) > 5e-3) busy = true;
        else {
          e.t = e.tGoal;
          e.tVelocity = 0;
        }
        // The spacing eases out like a first-order lag: it starts moving in the very first frame and never overshoots
        const tau = reduced ? 0.04 : e.tGoal > e.open ? OPEN_TAU : CLOSE_TAU;
        e.open += (e.tGoal - e.open) * (1 - Math.exp(-dt / tau));
        if (Math.abs(e.open - e.tGoal) > 1e-3) busy = true;
        else e.open = e.tGoal;
      }

      layout = computeLayout();
      const goals = goalXs(layout);
      const rest = (s.restAngle * Math.PI) / 180;
      for (const [i, e] of entries.entries()) {
        const x = goals[i]!;
        // a jump of the layout (a control dragged) is not a push: the cloth only feels real motion along the rail
        e.xVelocity = dt > 0 && Math.abs(x - e.x) < 0.15 ? (x - e.x) / dt : e.lastXVelocity;
        e.x = x;
        const g = e.garment;
        // The facing garment comes forward a little and is drawn after its neighbours; its x is pulled in by the
        // same amount the lift would push it out on screen, so its hook stays put
        g.object.position.z = 0.06 * e.t;
        g.object.position.x = liftedX(e.x, g.object.position.z);
        g.object.renderOrder = e.t > 0.001 ? 10 : 0;
        // An optional rigid tilt against the push (0 by default): the hanger leans, the cloth does not bend. A
        // breeze rocks each hanger a fraction of a degree on its hook.
        const rock = air * (1 - e.t) * 0.012 * Math.sin(clock * 1.1 - i * 0.5 + 0.7);
        g.object.rotation.z = (tilt > 0 ? tilt * Math.tanh(-e.xVelocity / 2) : 0) + rock;
        // turned by the angle it is seen at, so every garment looks the same wherever it hangs, and the facing one
        // faces you square-on. In a breeze a side-on garment drifts a few degrees back and forth (two slow waves down
        // the rail), and the air pushes its cloth round and along the rail.
        const calm = 1 - e.t;
        const drift = air * calm * 0.026 * (Math.sin(clock * 0.9 - i * 0.55) + 0.35 * Math.sin(clock * 1.53 - i * 0.8 + 1.1));
        const airTurn = air * calm * 18 * Math.sin(clock * 1.46 - i * 0.6 + 0.4);
        const airSlide = air * calm * 7 * Math.sin(clock * 1.23 - i * 0.45 + 2);
        g.turn.rotation.y = rest * (1 - e.t) - viewAngle(e.x) + drift;
        g.turn.scale.setScalar(lerp(1, s.activeScale, e.t));
        // The cloth moves only when the garment does, then settles still: when the hanger swivels the lower cloth
        // lags, swings through once and settles, and when the garment is pushed along the rail its hem trails and
        // swings back, while a faint ripple runs down the fabric. The hanger's turn is rest * (1 - t), so its
        // angular acceleration is -rest times the facing amount's.
        if (reduced || dt <= 0) e.cloth.reset();
        else if (e.cloth.step(dt, (-rest * (e.tVelocity - e.lastTVelocity)) / dt + airTurn, (e.xVelocity - e.lastXVelocity) / dt + airSlide, s.flow)) busy = true;
        e.lastTVelocity = e.tVelocity;
        e.lastXVelocity = e.xVelocity;
        g.setCloth({ twist: e.cloth.twist, sway: e.cloth.sway, ripple: e.cloth.ripple, time: clock });
      }

      // Panning on a phone: inertia after a flick, or a glide to a tapped garment
      if (!dragging) {
        if (panGoal !== null) {
          view.panX += (panGoal - view.panX) * (1 - Math.exp(-8 * dt));
          if (Math.abs(panGoal - view.panX) < 0.002) panGoal = null;
          busy = true;
        } else if (Math.abs(panVelocity) > 0.01) {
          view.panX = clamp(view.panX + panVelocity * dt, -view.panMax, view.panMax);
          panVelocity *= Math.exp(-4 * dt);
          if (view.panX <= -view.panMax || view.panX >= view.panMax) panVelocity = 0;
          busy = true;
        } else panVelocity = 0;
      } else busy = true;
      if (busy || canPan()) frameView();
      return busy;
    }

    // ----- the detail view: a second renderer with its own copy of the wardrobe -----
    // (a WebGL texture can't cross contexts, so the second canvas builds its own environment)
    // A garment on the stage. A swap has two: the one leaving slides aside, turns side-on like on the rail and
    // fades, while the next slides in turning to face you; each one's cloth lags its own turn and slide.
    type Shown = {
      garment: Garment;
      /** Across the stage, garment units, 0 is the middle */
      x: number;
      xVelocity: number;
      xGoal: number;
      /** Facing amount: 1 faces you, 0 is side-on at the rest angle */
      t: number;
      tVelocity: number;
      tGoal: number;
      opacity: number;
      /** How fast the opacity moves toward 1 (or 0 once leaving), per second */
      fade: number;
      leaving: boolean;
      cloth: ClothMotion;
      lastXVelocity: number;
      lastTVelocity: number;
    };
    type DetailState = {
      renderer: THREE.WebGLRenderer;
      wardrobe: Wardrobe;
      scene: THREE.Scene;
      camera: THREE.PerspectiveCamera;
      shown: Shown[];
      /** Garments built ahead of time (the ones either side of the one on show), so an arrow press never waits for a
       *  garment's fabric to be drawn and uploaded: the swap starts on the very next frame */
      ready: Map<number, Garment>;
      canvas: HTMLCanvasElement;
    };
    let detailState: DetailState | null = null;
    let detailIdx = 0;
    let closeTimer = 0;
    let disposeTimer = 0;
    const openRef = { current: false };
    // True during the short fade out of the detail layer
    let closing = false;

    // The detail canvas has its own lost and restored handlers: a loss only drops the detail state, the next open rebuilds it
    const onDetailLost = (event: Event) => {
      event.preventDefault();
      disposeDetail();
      if (openRef.current) closeDetail();
    };

    function fadeStage(to: number, seconds: number, ease: string) {
      // Set from the top each time, so a swap restarts its fade instead of snapping
      // A fade in starts from 0; a fade out starts from wherever the opacity is now (it may still be fading in)
      const from = to === 1 ? "0" : String(parseFloat(getComputedStyle(stageBox!).opacity) || 0);
      stageBox!.style.transition = "none";
      stageBox!.style.opacity = from;
      void stageBox!.offsetWidth;
      stageBox!.style.transition = `opacity ${seconds}s ${ease}`;
      stageBox!.style.opacity = String(to);
    }

    function ensureDetail(): DetailState | null {
      if (detailState) return detailState;
      const c = document.createElement("canvas");
      c.setAttribute("aria-hidden", "true");
      c.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
      stageBox!.prepend(c);
      let r: THREE.WebGLRenderer;
      try {
        r = new THREE.WebGLRenderer({ canvas: c, antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        c.remove();
        return null;
      }
      r.setClearColor(0x000000, 0);
      r.outputColorSpace = THREE.SRGBColorSpace;
      r.toneMapping = THREE.LinearToneMapping;
      // the stage is drawn in passes (solid garments, then each fading one), so it is cleared by hand
      r.autoClear = false;
      c.addEventListener("webglcontextlost", onDetailLost);
      const w = createWardrobe(r, fabricScans);
      const sc = new THREE.Scene();
      sc.environment = w.environment;
      w.addLights(sc);
      detailState = { renderer: r, wardrobe: w, scene: sc, camera: new THREE.PerspectiveCamera(FOV, 1, 0.1, 80), shown: [], ready: new Map(), canvas: c };
      sizeDetail();
      return detailState;
    }

    function dropShown(d: DetailState, s: Shown) {
      d.scene.remove(s.garment.object);
      s.garment.dispose();
      d.shown.splice(d.shown.indexOf(s), 1);
    }

    function disposeDetail() {
      const d = detailState;
      if (!d) return;
      detailState = null;
      d.canvas.removeEventListener("webglcontextlost", onDetailLost);
      for (const s of d.shown.slice()) dropShown(d, s);
      for (const g of d.ready.values()) g.dispose();
      d.ready.clear();
      window.clearTimeout(prepareTimer);
      d.wardrobe.dispose();
      d.renderer.dispose();
      d.renderer.forceContextLoss();
      d.canvas.remove();
    }

    function sizeDetail() {
      const d = detailState;
      if (!d) return;
      d.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      d.renderer.setSize(view.width, view.height, false);
      const widest = entries.reduce((m, e) => Math.max(m, e.garment.width), 0.5);
      // On a short stage the garment shrinks so the title always fits under it
      const takes = clamp((view.height * 0.92 - 150) / view.height, 0.3, DETAIL_TAKES);
      const top = takes >= DETAIL_TAKES ? DETAIL_TOP : 0.08;
      // Narrow screens: the garment shrinks until the two keys fit beside it (at least 16 px clear; 72 px when there is room)
      const hw = Math.max((0.1 + tallest()) / takes, (widest * 1.4) / view.aspect, (widest * view.height) / Math.max(40, view.width - 2 * (16 + 44 + 10)));
      const camY = 0.1 + top * hw - hw / 2;
      const distance = hw / 2 / Math.tan((FOV * Math.PI) / 360);
      d.camera.aspect = view.aspect;
      d.camera.position.set(0, camY, distance);
      d.camera.near = distance * 0.2;
      d.camera.far = distance * 4;
      d.camera.updateProjectionMatrix();
      // The keys sit beside the garment: half its widest width on screen, then the clear space
      const halfPx = (widest / 2 / hw) * view.height;
      dialogRef.current?.style.setProperty("--half", `${Math.round(halfPx)}px`);
      renderDetail();
    }

    // Solid garments are drawn together; a garment that is fading is drawn twice, first only its depth, then its
    // colour at its opacity over that depth, so it fades as one piece and its own back never shows through it
    function renderDetail() {
      const d = detailState;
      if (!d) return;
      const r = d.renderer;
      r.clear();
      const solid = d.shown.filter((s) => s.opacity >= 0.999);
      const fading = d.shown.filter((s) => s.opacity < 0.999 && s.opacity > 0.001);
      for (const s of d.shown) s.garment.object.visible = false;
      if (solid.length) {
        for (const s of solid) {
          s.garment.setPass("solid");
          s.garment.object.visible = true;
        }
        r.render(d.scene, d.camera);
        for (const s of solid) s.garment.object.visible = false;
      }
      for (const s of fading) {
        s.garment.object.visible = true;
        s.garment.setPass("depth");
        r.render(d.scene, d.camera);
        // eased, so a garment comes and goes softly instead of linearly
        s.garment.setPass("fade", s.opacity * s.opacity * (3 - 2 * s.opacity));
        r.render(d.scene, d.camera);
        s.garment.object.visible = false;
      }
      for (const s of d.shown) s.garment.object.visible = true;
    }

    function makeDetailGarment(d: DetailState, index: number): Garment {
      const garment = d.wardrobe.garment(list[index]!, settings.current.hanger, { fadeable: true });
      // no rail here: the hook is turned to show its curve
      garment.hook.rotation.y = Math.PI / 2;
      return garment;
    }

    // While the stage is open, the garments either side of the one on show are built one at a time in idle moments.
    // Any other prepared garment is let go, so at most two wait at a time.
    let prepareTimer = 0;
    function prepareNeighbours() {
      window.clearTimeout(prepareTimer);
      const d = detailState;
      if (!d || !openRef.current || list.length < 2) return;
      const wanted = [(detailIdx + 1) % list.length, (detailIdx - 1 + list.length) % list.length];
      for (const [index, g] of d.ready) {
        if (!wanted.includes(index)) {
          g.dispose();
          d.ready.delete(index);
        }
      }
      const missing = wanted.find((index) => !d.ready.has(index) && index !== detailIdx);
      if (missing === undefined) return;
      // after the swap has had its first frames, and then one garment per pause
      prepareTimer = window.setTimeout(() => {
        const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
        const build = () => {
          const now = detailState;
          if (!now || !openRef.current || now.ready.has(missing)) return;
          const g = makeDetailGarment(now, missing);
          // its shaders are the ones already on screen, so only its textures were new, and those were uploaded as
          // it was built
          now.ready.set(missing, g);
          prepareNeighbours();
        };
        if (idle) idle(build, { timeout: 600 });
        else build();
      }, 180);
    }

    // Puts a garment on the stage: facing you at the middle, or (from a side) side-on, ready to swing in
    function addShown(d: DetailState, index: number, from: number): Shown {
      const garment = d.ready.get(index) ?? makeDetailGarment(d, index);
      d.ready.delete(index);
      garment.object.visible = true;
      d.scene.add(garment.object);
      const s: Shown = { garment, x: from, xVelocity: 0, xGoal: 0, t: from === 0 ? 1 : 0, tVelocity: 0, tGoal: 1, opacity: from === 0 ? 1 : 0, fade: 1 / 0.2, leaving: false, cloth: new ClothMotion(), lastXVelocity: 0, lastTVelocity: 0 };
      d.shown.push(s);
      poseShown(s, 0);
      return s;
    }

    function poseShown(s: Shown, time: number) {
      const rest = (settings.current.restAngle * Math.PI) / 180;
      s.garment.object.position.x = s.x;
      s.garment.turn.rotation.y = rest * (1 - s.t);
      s.garment.setCloth({ twist: s.cloth.twist, sway: s.cloth.sway, ripple: s.cloth.ripple, time });
    }

    // One frame of the stage: each garment's slide and turn are critically damped springs, its opacity eases, and
    // its cloth is driven by both. A garment that has faded out leaves the stage.
    function stepStage(dt: number): boolean {
      const d = detailState;
      if (!d || d.shown.length === 0) return false;
      const s0 = settings.current;
      const reduced = s0.reducedMotion;
      const rest = (s0.restAngle * Math.PI) / 180;
      let busy = false;
      for (const s of d.shown.slice()) {
        const slide = 4.6 / (reduced ? 0.12 : s.leaving ? 0.42 : 0.58);
        const turn = 4.6 / (reduced ? 0.12 : s.leaving ? 0.34 : 0.5);
        [s.x, s.xVelocity] = spring(s.x, s.xVelocity, s.xGoal, slide, dt);
        [s.t, s.tVelocity] = spring(s.t, s.tVelocity, s.tGoal, turn, dt);
        s.opacity = clamp(s.opacity + (s.leaving ? -1 : 1) * s.fade * dt, 0, 1);
        if (s.leaving && s.opacity <= 0) {
          dropShown(d, s);
          continue;
        }
        const settled = Math.abs(s.x - s.xGoal) < 1e-4 && Math.abs(s.xVelocity) < 1e-3 && Math.abs(s.t - s.tGoal) < 5e-4 && Math.abs(s.tVelocity) < 5e-3;
        if (settled) {
          s.x = s.xGoal;
          s.xVelocity = 0;
          s.t = s.tGoal;
          s.tVelocity = 0;
        } else busy = true;
        if (s.opacity > 0 && s.opacity < 1) busy = true;
        if (reduced) s.cloth.reset();
        else if (s.cloth.step(dt, (-rest * (s.tVelocity - s.lastTVelocity)) / dt, (s.xVelocity - s.lastXVelocity) / dt, s0.flow)) busy = true;
        s.lastXVelocity = s.xVelocity;
        s.lastTVelocity = s.tVelocity;
        poseShown(s, clock);
      }
      return busy;
    }

    // Opens the stage on one garment, facing you; its cloth gets a small push, as if it had just been hung there
    function showDetailGarment(index: number): boolean {
      const d = ensureDetail();
      if (!d) return false;
      for (const s of d.shown.slice()) dropShown(d, s);
      const s = addShown(d, index, 0);
      if (!settings.current.reducedMotion) s.cloth.kick(1.6 * settings.current.flow, 0.12 * settings.current.flow);
      renderDetail();
      return true;
    }

    // The rack copy of the garment shown big is hidden once the detail view is in, so no blurred double sits behind it
    let hiddenIndex = -1;
    // the rack under the open detail view needs one more frame after a garment is hidden or shown
    let rackDirty = false;
    let hideTimer = 0;
    function hideRack(index: number) {
      if (hiddenIndex >= 0 && entries[hiddenIndex]) entries[hiddenIndex]!.garment.object.visible = true;
      hiddenIndex = index;
      if (index >= 0 && entries[index]) entries[index]!.garment.object.visible = false;
      rackDirty = true;
      wake();
    }

    function openDetail(index: number) {
      if (!settings.current.detail || openRef.current || !built) return;
      window.clearTimeout(closeTimer);
      window.clearTimeout(disposeTimer);
      closing = false;
      detailIdx = index;
      if (!showDetailGarment(index)) return;
      detailIndexRef.current = index;
      openRef.current = true;
      // The rack stays as it is under the veil, with this garment facing
      setActive(index);
      flushSync(() => {
        setDetailIndex(index);
        setStageOn(true);
        setOpen(true);
      });
      fadeStage(1, 0.25, "ease-out");
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        if (openRef.current) hideRack(detailIdx);
      }, 260);
      wake();
      prepareNeighbours();
    }

    function finishClose() {
      if (!closing) return;
      closing = false;
      flushSync(() => setStageOn(false));
      const d = detailState;
      window.clearTimeout(prepareTimer);
      if (d) {
        for (const s of d.shown.slice()) dropShown(d, s);
        for (const g of d.ready.values()) g.dispose();
        d.ready.clear();
        renderDetail();
      }
      // focus has gone back to the garment's button: it stays facing; otherwise the pointer decides
      const focused = garmentButtons.current.indexOf(document.activeElement as HTMLButtonElement);
      setActive(focused >= 0 ? focused : hovering && !keyLead ? pick(hoverX, hoverY) : -1);
      // The second renderer is not kept for long: it is built again on the next open
      window.clearTimeout(disposeTimer);
      disposeTimer = window.setTimeout(() => {
        if (!openRef.current) disposeDetail();
      }, 1500);
    }

    function closeDetail() {
      if (!openRef.current) return;
      openRef.current = false;
      closing = true;
      setOpen(false);
      window.clearTimeout(hideTimer);
      hideRack(-1);
      // Under the fade the rack shows the garment that was last shown, facing
      setActive(detailIdx);
      fadeStage(0, 0.15, "linear");
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(finishClose, 160);
    }

    // Next and previous: the title and counter swap at once. The garment on show slides aside, turning side-on as it
    // fades; the next one swings in from the other side, turning to face you, and its cloth lags and settles.
    function stepDetail(direction: 1 | -1) {
      if (!openRef.current || list.length < 2) return;
      const d = ensureDetail();
      if (!d) return;
      const next = (detailIdx + direction + list.length) % list.length;
      const reduced = settings.current.reducedMotion;
      for (const s of d.shown) {
        if (s.leaving) continue;
        s.leaving = true;
        s.fade = 1 / (reduced ? 0.12 : 0.3);
        if (!reduced) {
          s.xGoal = -direction * 0.5 * s.garment.width;
          s.tGoal = 0;
        }
      }
      // a quick run of presses never piles up garments: older ones on their way out hurry their fade, and only a
      // fourth one at once is let go
      for (const s of d.shown.slice(0, -1)) s.fade = Math.max(s.fade, 1 / 0.08);
      while (d.shown.length > 2) dropShown(d, d.shown[0]!);
      const entering = addShown(d, next, reduced ? 0 : direction * 0.62 * entries[next]!.garment.width);
      if (reduced) {
        entering.opacity = 0;
        entering.fade = 1 / 0.12;
      }
      detailIdx = next;
      detailIndexRef.current = next;
      setActive(next);
      if (hiddenIndex >= 0) hideRack(next);
      flushSync(() => setDetailIndex(next));
      wake();
      prepareNeighbours();
    }

    engineRef.current = {
      setActive(index: number) {
        keyLead = index >= 0;
        setActive(index);
      },
      openDetail,
      closeDetail,
      stepDetail,
      activeIndex: () => active,
      lastIndex: () => lastActive,
    };

    // ----- the loop: only runs while something moves -----
    function tick(now: number) {
      raf = 0;
      if (!alive) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - (last || now - 16)) / 1000));
      last = now;
      const busy = stepRack(dt);
      const staging = stepStage(dt);
      // Things moved, so the garment under a resting pointer may have changed
      if (hovering && !keyLead && !openRef.current && !closing) setActive(pick(hoverX, hoverY));
      updateCaption();
      // under the open detail view the rack is only drawn again while it still moves
      if (busy || !openRef.current || rackDirty) {
        renderer.render(scene, camera);
        rackDirty = false;
      }
      if (detailState) renderDetail();
      if ((busy || staging) && visible && !document.hidden) raf = requestAnimationFrame(tick);
      else last = 0;
    }
    function wake() {
      if (!built || raf || !alive || !visible || document.hidden) return;
      raf = requestAnimationFrame(tick);
    }
    refreshRef.current = () => {
      if (!built) return;
      frameView();
      wake();
    };

    let resizeObserver: ResizeObserver | null = null;
    let intersection: IntersectionObserver | null = null;
    const onVisibility = () => {
      if (!document.hidden) wake();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Moving the window to another monitor changes the pixel ratio without changing the size
    let dprQuery: MediaQueryList | null = null;
    const onDpr = () => {
      resize();
      armDpr();
    };
    function armDpr() {
      dprQuery?.removeEventListener("change", onDpr);
      dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
      dprQuery.addEventListener("change", onDpr);
    }
    armDpr();

    // The garments are built a couple per animation frame while the canvas is still hidden, so the page never freezes;
    // when the last one is in, the first layout snaps and the canvas fades in
    let nextToBuild = 0;
    function buildSome() {
      buildRaf = 0;
      if (!alive) return;
      for (let k = 0; k < 2 && nextToBuild < list.length; k++, nextToBuild++) {
        const garment = wardrobe.garment(list[nextToBuild]!, settings.current.hanger);
        scene.add(garment.object);
        entries.push({ garment, t: 0, tVelocity: 0, tGoal: 0, open: 0, x: 0, xVelocity: 0, cloth: new ClothMotion(), lastTVelocity: 0, lastXVelocity: 0 });
      }
      if (nextToBuild < list.length) {
        buildRaf = requestAnimationFrame(buildSome);
        return;
      }
      built = true;
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host!);
      intersection = new IntersectionObserver((records) => {
        visible = records[records.length - 1]?.isIntersecting ?? true;
        if (visible) wake();
      });
      intersection.observe(host!);
      // The shaders are compiled before the first visible frame (the canvas stays hidden until then), so there is no stall
      // when the page appears. If compiling fails the first render still works, just later.
      const start = () => {
        if (alive) resize();
      };
      renderer.compileAsync(scene, camera).then(start, start);
    }
    // The fabric scans and the studio arrive before the first garment is made (the canvas is still hidden), so
    // nothing changes look once it shows; if they are slow, the drawn knit and the plain room go ahead after 2.5 s
    let waitTimer = 0;
    const begin = () => {
      window.clearTimeout(waitTimer);
      if (!alive || built || buildRaf || nextToBuild > 0) return;
      scene.environment = wardrobe.environment;
      wardrobe.addLights(scene);
      buildSome();
    };
    waitTimer = window.setTimeout(begin, 2500);
    wardrobe.ready.then(begin, begin);

    return () => {
      dprQuery?.removeEventListener("change", onDpr);
      window.clearTimeout(waitTimer);
      alive = false;
      window.clearTimeout(hideTimer);
      window.clearTimeout(closeTimer);
      window.clearTimeout(disposeTimer);
      window.clearTimeout(prepareTimer);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(buildRaf);
      engineRef.current = null;
      refreshRef.current = null;
      resizeObserver?.disconnect();
      intersection?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerCancel);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      for (const e of entries) e.garment.dispose();
      railMesh.dispose();
      wardrobe.dispose();
      scene.environment = null;
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      disposeDetail();
      setReady(false);
      setOpen(false);
      setStageOn(false);
    };
    // The scene is rebuilt only when the garments themselves change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey, texturesKey, generation]);

  // Focus moves into the dialog on open and back to the garment on close
  useEffect(() => {
    if (open) dialogRef.current?.focus();
    else if (wasOpen.current) (garmentButtons.current[detailIndexRef.current] ?? hostRef.current)?.focus();
    wasOpen.current = open;
  }, [open]);

  // A key looks pressed for at least 120 ms, whether the pointer or the real arrow key did it
  const press = (which: "prev" | "next") => {
    window.clearTimeout(pressTimer.current);
    pressedAt.current = performance.now();
    setPressed(which);
  };
  const release = () => {
    window.clearTimeout(pressTimer.current);
    const wait = Math.max(0, 120 - (performance.now() - pressedAt.current));
    pressTimer.current = window.setTimeout(() => setPressed(null), wait);
  };
  useEffect(() => () => window.clearTimeout(pressTimer.current), []);
  // Closing the detail view clears a key that was still showing as pressed, and its timer
  useEffect(() => {
    if (!open) {
      window.clearTimeout(pressTimer.current);
      setPressed(null);
    }
  }, [open]);

  // While the detail view is open the page behind is out of reach: keys are handled here, wherever focus is,
  // and Tab cycles through the dialog's own buttons
  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      const engine = engineRef.current;
      if (!engine || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "Escape") {
        event.preventDefault();
        engine.closeDetail();
      } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        // holding a key flips once, not at the key repeat rate
        if (event.repeat) return;
        const dir = event.key === "ArrowRight" ? 1 : -1;
        press(dir === 1 ? "next" : "prev");
        engine.stepDetail(dir);
      } else if (event.key === "Tab") {
        const stops = Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
        if (stops.length === 0) return;
        const at = stops.indexOf(document.activeElement as HTMLButtonElement);
        const next = event.shiftKey ? (at <= 0 ? stops.length - 1 : at - 1) : at < 0 || at === stops.length - 1 ? 0 : at + 1;
        event.preventDefault();
        stops[next]!.focus();
      }
    };
    const onKeyUp = (event: globalThis.KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") release();
    };
    // a key let go while the window was away would leave its keycap pressed
    const onWindowBlur = () => release();
    document.addEventListener("keydown", onKey);
    document.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onWindowBlur);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [open]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const engine = engineRef.current;
    if (!engine || open) return;
    const count = itemsRef.current.length;
    const target = event.target as HTMLElement;
    const buttonIndex = garmentButtons.current.indexOf(target as HTMLButtonElement);
    const onButton = buttonIndex >= 0;
    if (target !== hostRef.current && !onButton) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      // From a garment button the walk starts at that button, not at whatever the pointer last faced
      const from = onButton ? buttonIndex : engine.activeIndex() >= 0 ? engine.activeIndex() : event.key === "ArrowRight" ? -1 : count;
      const next = clamp(from + (event.key === "ArrowRight" ? 1 : -1), 0, count - 1);
      engine.setActive(next);
      setFocusIdx(next);
      if (onButton) garmentButtons.current[next]?.focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next = event.key === "Home" ? 0 : count - 1;
      engine.setActive(next);
      setFocusIdx(next);
      if (onButton) garmentButtons.current[next]?.focus();
    } else if (!onButton && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      const index = engine.activeIndex();
      if (index >= 0) engine.openDetail(index);
    } else if (event.key === "Escape") {
      engine.setActive(-1);
      setFocusIdx(-1);
    }
  };

  // Focus leaving the rack lets the garment turn back, so the render loop can stop
  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (open) return;
    const next = event.relatedTarget as Node | null;
    if (next && hostRef.current?.contains(next)) return;
    setFocusIdx(-1);
    engineRef.current?.setActive(-1);
  };

  // Near-monochrome chrome: ink / paper / hairlines that flip with the page theme
  const vars = dark
    ? { ink: "#F5F5F5", paper: "#0B0B0C", line: "#27272A", grey: "#8B8F98" }
    : { ink: "#0A0A0A", paper: "#FAFAFA", line: "#E5E7EB", grey: "#6B7280" };
  const names = itemsRef.current;
  const shown = names[Math.min(detailIndex, names.length - 1)];
  const status = open && shown ? `${shown.name}, ${detailIndex + 1} of ${names.length}` : focusIdx >= 0 && names[focusIdx] ? `${names[focusIdx]!.name}, ${focusIdx + 1} of ${names.length}` : "";
  const unavailable = failed || lost || !ready;

  const ring = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-(--cr-ink)";
  const outlineBtn = `inline-flex h-9 cursor-pointer items-center rounded-full border border-(--cr-line) bg-transparent px-4 text-[13px] font-medium text-(--cr-ink) transition-[background-color,color,border-color] duration-150 hover:border-(--cr-ink) hover:bg-(--cr-ink) hover:text-(--cr-paper) ${ring}`;
  // Soft ink-tinted keycap with a shadow lip; pressed state drops 1px and loses the lip
  const keycap = (isPressed: boolean) =>
    `absolute top-[42%] z-[2] flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl border-0 bg-[color-mix(in_srgb,var(--cr-ink)_7%,transparent)] p-0 text-(--cr-ink) transition-[background-color,box-shadow,transform] duration-100 hover:bg-[color-mix(in_srgb,var(--cr-ink)_13%,transparent)] ${ring} ${
      isPressed ? "translate-y-[calc(-50%+1px)] shadow-none" : "shadow-[0_1px_0_rgba(0,0,0,0.3)]"
    }`;
  const arrowProps = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

  return (
    <div
      ref={hostRef}
      role="group"
      aria-roledescription="clothes rack"
      aria-label="Clothes rack. Use the left and right arrow keys to move along it and Enter to open a garment."
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      className={`relative h-full w-full overflow-hidden outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-solid focus-visible:outline-(--cr-ink) ${className}`}
      style={{
        color: vars.ink,
        fontFamily: "var(--font-sans, ui-sans-serif, system-ui, sans-serif)",
        ["--cr-ink" as string]: vars.ink,
        ["--cr-paper" as string]: vars.paper,
        ["--cr-line" as string]: vars.line,
        ["--cr-grey" as string]: vars.grey,
      }}
    >
      <div ref={canvasBoxRef} className="absolute inset-0" style={{ opacity: ready ? 1 : 0, transition: "opacity 0.5s ease" }} inert={open}>
        <p
          ref={captionRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 m-0 whitespace-nowrap text-[13px] opacity-0"
          style={{ color: "color-mix(in srgb, var(--cr-ink) 70%, transparent)", transition: "opacity 0.35s ease" }}
        />
      </div>

      {failed || lost ? (
        <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center gap-3 text-[13px]" role="alert">
          <span className="text-(--cr-grey)">{lost ? "The graphics context was lost." : "This needs WebGL, which is not available here."}</span>
          <button
            type="button"
            onClick={() => {
              setFailed(false);
              setLost(false);
              setGeneration((g) => g + 1);
            }}
            className={outlineBtn}
          >
            Try again
          </button>
        </div>
      ) : null}

      {/* Real buttons for screen readers: one per garment */}
      <ul className="sr-only" data-garments="" inert={open || unavailable} aria-hidden={unavailable}>
        {names.map((item, index) => (
          <li key={`${item.name}-${index}`}>
            <button
              type="button"
              ref={(node) => {
                garmentButtons.current[index] = node;
              }}
              onFocus={() => {
                setFocusIdx(index);
                engineRef.current?.setActive(index);
              }}
              onBlur={() => setFocusIdx(-1)}
              onClick={() => {
                if (detail) engineRef.current?.openDetail(index);
                else engineRef.current?.setActive(index);
              }}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="sr-only" role="status" aria-live="polite">
        {status}
      </div>

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={shown ? `${shown.name}, garment ${detailIndex + 1} of ${names.length}` : "Garment"}
        aria-hidden={!open}
        inert={!open}
        tabIndex={-1}
        className="absolute inset-0 z-10 outline-none"
        style={{ visibility: stageOn ? "visible" : "hidden", pointerEvents: open ? "auto" : "none", ["--half" as string]: "140px" }}
      >
        {/* The veil and its blur fade in with the garment: one crossfade, no flight */}
        <div
          className="absolute inset-0"
          style={{
            background: dark ? "rgba(11,11,12,0.86)" : "rgba(250,250,250,0.86)",
            opacity: open ? 1 : 0,
            backdropFilter: open ? "blur(12px)" : "blur(0px)",
            WebkitBackdropFilter: open ? "blur(12px)" : "blur(0px)",
            transition: open ? "opacity 0.25s ease-out, backdrop-filter 0.25s ease-out, -webkit-backdrop-filter 0.25s ease-out" : "opacity 0.15s linear, backdrop-filter 0.15s linear, -webkit-backdrop-filter 0.15s linear",
          }}
        />
        <div ref={stageRef} className="absolute inset-0" style={{ opacity: 0, filter: dark ? "drop-shadow(0 28px 36px rgba(0,0,0,0.55))" : "drop-shadow(0 1px 1.5px rgba(15,23,42,0.16)) drop-shadow(0 28px 36px rgba(15,23,42,0.14))" }} />
        <div className="absolute inset-0" style={{ opacity: open ? 1 : 0, transition: open ? "opacity 0.25s ease-out" : "opacity 0.15s linear" }}>
          <button
            type="button"
            onClick={() => engineRef.current?.closeDetail()}
            className={`absolute top-4 right-5 flex cursor-pointer items-center gap-2 rounded-full border-0 bg-transparent px-2 py-1 text-[13px] text-(--cr-ink) transition-opacity duration-150 hover:opacity-60 ${ring}`}
          >
            Close
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M2 2L10 10M10 2L2 10" />
            </svg>
          </button>
          {names.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous garment"
                onClick={() => engineRef.current?.stepDetail(-1)}
                onPointerDown={() => press("prev")}
                onPointerUp={release}
                onPointerLeave={release}
                onPointerCancel={release}
                className={keycap(pressed === "prev")}
                style={{ left: "max(10px, calc(50% - var(--half) - 72px - 44px))" }}
              >
                <svg {...arrowProps}>
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next garment"
                onClick={() => engineRef.current?.stepDetail(1)}
                onPointerDown={() => press("next")}
                onPointerUp={release}
                onPointerLeave={release}
                onPointerCancel={release}
                className={keycap(pressed === "next")}
                style={{ right: "max(10px, calc(50% - var(--half) - 72px - 44px))" }}
              >
                <svg {...arrowProps}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </>
          ) : null}
          <div className="absolute inset-x-0 bottom-[5%] z-[2] flex flex-col items-center gap-2 px-4 text-center">
            <span className="text-[13px] text-(--cr-grey)" style={{ fontVariantNumeric: "tabular-nums" }}>
              {String(detailIndex + 1).padStart(2, "0")} / {String(names.length).padStart(2, "0")}
            </span>
            <h3 className="m-0 text-[32px] leading-[1.1] font-normal tracking-[-0.02em] text-(--cr-ink)">{shown?.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
