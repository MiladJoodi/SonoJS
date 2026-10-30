/** Posted from `/sso-callback` when OAuth finishes inside a popup. */
export const SSO_DONE = "sonojs-clerk-sso-done"

export type SsoDoneMessage = {
  type: typeof SSO_DONE
  url?: string
}

export function isSsoDoneMessage(data: unknown): data is SsoDoneMessage {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    (data as SsoDoneMessage).type === SSO_DONE
  )
}
