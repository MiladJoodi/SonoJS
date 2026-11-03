// How the cloth of a garment on a hanger moves, for the Clothes Rack.
//
// A hanging garment is a column of rows, from the shoulders (held by the hanger) down to the hem. Each row can twist
// about the hook's upright axis and trail sideways along the rail, and each is tied to the row above and the row below,
// like a damped string fixed at the top and free at the bottom. When the hanger swivels or is pushed along the rail,
// the rows feel its acceleration (the cloth is heavy, the hanger is not), so the lower cloth lags, swings through once
// and settles: a wave that runs down the fabric instead of a stiff board turning. Nothing here knows about three.js;
// the garment's vertex shader bends the cloth with these numbers.

/** Rows below the shoulders. Row 0 is the shoulders and never moves. */
export const CLOTH_ROWS = 6;

// Tuned offline against the rack's 0.25 s critically damped turn: the hem lags about 9 degrees while the garment
// turns, swings back about 6 and is still again after about 0.8 s. A neighbour pushed by a pitch trails its hem by
// about 3% of its length.
const K = 1100;
const DAMP = 6.5;
// damping of rows moving against each other: it calms the fast, jittery shapes of the string and leaves the slow sway
const DAMP_BETWEEN = 2;
const TWIST_GAIN = 0.32;
const SWAY_GAIN = 0.4;
const MAX_TWIST = 0.5;
const MAX_SWAY = 0.09;
// stepping at 240 a second keeps the string stable however long a frame is
const STEP = 1 / 240;

export class ClothMotion {
  /** The twist of each row, radians, row 0 at the shoulders. */
  readonly twist = new Float32Array(CLOTH_ROWS + 1);
  /** How far each row trails sideways along the rail, garment units. */
  readonly sway = new Float32Array(CLOTH_ROWS + 1);
  /** 0 - 1: how lively the cloth is, for the faint ripple that runs down it while it moves. */
  ripple = 0;
  private readonly twistV = new Float32Array(CLOTH_ROWS + 1);
  private readonly swayV = new Float32Array(CLOTH_ROWS + 1);

  /**
   * Moves the cloth on by dt seconds. turnAccel is the hanger's angular acceleration about its hook (rad/s²) and
   * slideAccel its acceleration along the rail (units/s²); amount scales both (0 keeps the cloth still).
   * Returns true while the cloth is still moving.
   */
  step(dt: number, turnAccel: number, slideAccel: number, amount = 1): boolean {
    let left = Math.min(dt, 0.05);
    while (left > 1e-9) {
      const h = Math.min(STEP, left);
      this.integrate(this.twist, this.twistV, -TWIST_GAIN * amount * turnAccel, MAX_TWIST, h);
      this.integrate(this.sway, this.swayV, -SWAY_GAIN * amount * slideAccel, MAX_SWAY, h);
      left -= h;
    }
    const n = CLOTH_ROWS;
    const energy = Math.min(1, Math.abs(this.twistV[n]!) * 0.22 + Math.abs(this.swayV[n]!) * 5);
    // the ripple rises quickly with the motion and dies away slowly after it
    this.ripple += (energy - this.ripple) * (1 - Math.exp(-dt / (energy > this.ripple ? 0.06 : 0.5)));
    let moving = this.ripple > 2e-3;
    for (let k = 1; k <= n; k++) {
      if (Math.abs(this.twist[k]!) > 3e-4 || Math.abs(this.twistV[k]!) > 3e-3 || Math.abs(this.sway[k]!) > 6e-5 || Math.abs(this.swayV[k]!) > 1e-3) moving = true;
    }
    if (!moving) this.reset();
    return moving;
  }

  /** Gives the cloth a push, as when it is hung or lifted: twist in rad/s, sway in units/s at the hem. */
  kick(twist: number, sway: number) {
    for (let k = 1; k <= CLOTH_ROWS; k++) {
      this.twistV[k] = this.twistV[k]! + (twist * k) / CLOTH_ROWS;
      this.swayV[k] = this.swayV[k]! + (sway * k) / CLOTH_ROWS;
    }
  }

  /** Still, hanging straight. */
  reset() {
    this.twist.fill(0);
    this.twistV.fill(0);
    this.sway.fill(0);
    this.swayV.fill(0);
    this.ripple = 0;
  }

  // One step of the string: each row is pulled toward its neighbours, damped, and pushed by the drive, which grows
  // toward the hem (a row far down has more cloth hanging off it, so it lags more)
  private integrate(x: Float32Array, v: Float32Array, drive: number, limit: number, h: number) {
    const n = CLOTH_ROWS;
    for (let k = 1; k <= n; k++) {
      const below = k === n ? x[k]! : x[k + 1]!;
      const belowV = k === n ? v[k]! : v[k + 1]!;
      const accel = K * (x[k - 1]! - 2 * x[k]! + below) - DAMP * v[k]! + DAMP_BETWEEN * (v[k - 1]! - 2 * v[k]! + belowV) + (drive * k) / n;
      v[k] = v[k]! + accel * h;
    }
    for (let k = 1; k <= n; k++) {
      x[k] = Math.max(-limit, Math.min(limit, x[k]! + v[k]! * h));
    }
  }
}
