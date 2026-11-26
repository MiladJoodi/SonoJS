export const SNIPPET_INSTALL = "npm install captchakit"

export const SNIPPET_FORM_IMPORT = `import { Captcha } from "captchakit";
import "captchakit/styles.css";`

export const SNIPPET_ENV = `CAPTCHAKIT_SECRET=your-long-random-secret-at-least-32-chars`

export const SNIPPET_API_ROUTE = `import { createCaptchaHandlers } from "captchakit/server";

export const { GET, POST } = createCaptchaHandlers();`

export const SNIPPET_CLIENT_FORM = `"use client";

import { useState } from "react";
import { Captcha } from "captchakit";
import "captchakit/styles.css";

export default function Form() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please complete the CAPTCHA first.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        captchaToken,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
      return;
    }

    alert("Form submitted successfully!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        placeholder="you@example.com"
        required
      />

      <Captcha
        type="math"
        locale="en"
        difficulty="easy"
        onVerify={setCaptchaToken}
        onError={() => setCaptchaToken(null)}
      />

      <button type="submit" disabled={!captchaToken}>
        Submit
      </button>
    </form>
  );
}`

export const SNIPPET_VERIFY = `import { verifyCaptcha } from "captchakit/server";

export async function POST(request: Request) {
  const { email, captchaToken } = await request.json();

  const result = await verifyCaptcha({
    token: captchaToken,
  });

  if (!result.success) {
    return Response.json(
      { error: result.error },
      { status: 400 },
    );
  }

  // CAPTCHA is valid — continue with your action.

  return Response.json({
    success: true,
    email,
  });
}`