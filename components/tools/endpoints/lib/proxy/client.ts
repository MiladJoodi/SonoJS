import type { ProxyRequestPayload, ProxyResponsePayload } from "@/components/tools/endpoints/types";

export class ProxyClientError extends Error {
  code: ProxyResponsePayload["error"] extends infer E
    ? E extends { code: infer C }
      ? C
      : string
    : string;
  details?: string;

  constructor(code: string, message: string, details?: string) {
    super(message);
    this.name = "ProxyClientError";
    this.code = code;
    this.details = details;
  }
}

export async function sendViaProxy(
  payload: ProxyRequestPayload,
  signal?: AbortSignal,
): Promise<ProxyResponsePayload> {
  const res = await fetch("/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });

  let data: ProxyResponsePayload;
  try {
    data = (await res.json()) as ProxyResponsePayload;
  } catch {
    throw new ProxyClientError(
      "unknown",
      "Couldn't connect to the server.",
      `HTTP ${res.status}`,
    );
  }

  if (!res.ok || data.error) {
    const err = data.error ?? {
      code: "unknown" as const,
      message: "Couldn't connect to the server.",
    };
    throw new ProxyClientError(err.code, err.message, err.details);
  }

  return data;
}
