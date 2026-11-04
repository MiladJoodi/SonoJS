import type { ComponentType } from "react"

/**
 * Login docs demos only. Dynamic imports keep login-02…16 out of the initial
 * client graph until near the viewport (see `BlockDemoLazy`).
 */
export const loginDemoLoaders = {
  "login-01": () =>
    import("@/registry/blocks/authentication/login/login-01/login-form"),
  "login-02": () =>
    import("@/registry/blocks/authentication/login/login-02/login-form"),
  "login-03": () =>
    import("@/registry/blocks/authentication/login/login-03/login-form"),
  "login-04": () =>
    import("@/registry/blocks/authentication/login/login-04/login-form"),
  "login-05": () =>
    import("@/registry/blocks/authentication/login/login-05/login-form"),
  "login-06": () =>
    import("@/registry/blocks/authentication/login/login-06/login-form"),
  "login-07": () =>
    import("@/registry/blocks/authentication/login/login-07/login-form"),
  "login-08": () =>
    import("@/registry/blocks/authentication/login/login-08/login-form"),
  "login-09": () =>
    import("@/registry/blocks/authentication/login/login-09/login-form"),
  "login-10": () =>
    import("@/registry/blocks/authentication/login/login-10/login-form"),
  "login-11": () =>
    import("@/registry/blocks/authentication/login/login-11/login-form"),
  "login-12": () =>
    import("@/registry/blocks/authentication/login/login-12/login-form"),
  "login-13": () =>
    import("@/registry/blocks/authentication/login/login-13/login-form"),
  "login-14": () =>
    import("@/registry/blocks/authentication/login/login-14/login-form"),
  "login-15": () =>
    import("@/registry/blocks/authentication/login/login-15/login-form"),
  "login-16": () =>
    import("@/registry/blocks/authentication/login/login-16/login-form"),
} as const satisfies Record<
  string,
  () => Promise<{ default: ComponentType }>
>

export type LoginDemoId = keyof typeof loginDemoLoaders

export function getLoginDemoLoader(id: string) {
  return loginDemoLoaders[id as LoginDemoId]
}
