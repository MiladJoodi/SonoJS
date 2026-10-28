let ctx: AudioContext | null = null
let soundOn = true

export function setShowcaseSound(on: boolean) {
  soundOn = on
}

export function getShowcaseSound() {
  return soundOn
}

function getCtx() {
  if (typeof window === "undefined") return null
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext
  if (!AC) return null
  ctx = ctx ?? new AC()
  if (ctx.state === "suspended") void ctx.resume()
  return ctx
}

export function tone(f: number, t = 0, d = 0.2, v = 0.05) {
  if (!soundOn) return
  try {
    const audio = getCtx()
    if (!audio) return
    const o = audio.createOscillator()
    const g = audio.createGain()
    const s = audio.currentTime + t
    o.type = "sine"
    o.frequency.value = f
    g.gain.setValueAtTime(0, s)
    g.gain.linearRampToValueAtTime(v, s + 0.015)
    g.gain.exponentialRampToValueAtTime(0.0001, s + d)
    o.connect(g)
    g.connect(audio.destination)
    o.start(s)
    o.stop(s + d + 0.05)
  } catch {
    /* ignore autoplay / AudioContext errors */
  }
}

export function chime() {
  tone(659.25, 0, 0.25, 0.045)
  tone(880, 0.07, 0.25, 0.04)
  tone(1318.5, 0.14, 0.4, 0.03)
}

export function tick() {
  tone(520, 0, 0.07, 0.03)
}
