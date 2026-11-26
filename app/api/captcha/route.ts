import { createCaptchaHandlers } from "captchakit/server"

import { resolveCaptchaSecret } from "@/components/tools/captcha/lib/secret"

export const { GET, POST } = createCaptchaHandlers({
  secret: resolveCaptchaSecret(),
})