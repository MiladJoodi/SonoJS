import "server-only"

import { SECRET_ENV_KEY, isValidSecret } from "captchakit/server"

/**
 * Playground fallback when `CAPTCHAKIT_SECRET` is unset (SonoJS /tools demo only).
 * Set a real secret in production for anything beyond the public playground.
 */
const PLAYGROUND_SECRET =
  "sonojs-captchakit-tools-playground-secret-min-32-chars"

export function resolveCaptchaSecret(): string {
  const fromEnv = process.env[SECRET_ENV_KEY]?.trim()
  if (isValidSecret(fromEnv)) return fromEnv
  return PLAYGROUND_SECRET
}