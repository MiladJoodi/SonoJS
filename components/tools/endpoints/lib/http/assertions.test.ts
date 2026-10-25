import { describe, expect, it } from "vitest";
import { runAssertions } from "@/components/tools/endpoints/lib/http/assertions";
import type { ProxyResponsePayload } from "@/components/tools/endpoints/types";

function mockResponse(
  partial: Partial<ProxyResponsePayload>,
): ProxyResponsePayload {
  return {
    ok: true,
    status: 200,
    statusText: "OK",
    headers: {},
    body: "",
    bodyEncoding: "text",
    contentType: "application/json",
    durationMs: 42,
    sizeBytes: 2,
    ...partial,
  };
}

describe("runAssertions", () => {
  it("checks status", () => {
    const results = runAssertions(
      [{ id: "1", type: "status", equals: 200, enabled: true }],
      mockResponse({ status: 200 }),
    );
    expect(results[0]?.passed).toBe(true);
  });

  it("checks json path", () => {
    const results = runAssertions(
      [
        {
          id: "1",
          type: "jsonPath",
          path: "0.name",
          equals: "Ada",
          enabled: true,
        },
      ],
      mockResponse({ body: JSON.stringify([{ name: "Ada" }]) }),
    );
    expect(results[0]?.passed).toBe(true);
  });

  it("checks nested json path", () => {
    const results = runAssertions(
      [
        {
          id: "1",
          type: "jsonPath",
          path: "address.city",
          equals: "Tehran",
          enabled: true,
        },
      ],
      mockResponse({ body: JSON.stringify({ address: { city: "Tehran" } }) }),
    );
    expect(results[0]?.passed).toBe(true);
  });

  it("checks max duration", () => {
    const results = runAssertions(
      [{ id: "1", type: "maxDuration", ms: 100, enabled: true }],
      mockResponse({ durationMs: 250 }),
    );
    expect(results[0]?.passed).toBe(false);
  });

  it("fails status when send failed", () => {
    const results = runAssertions(
      [{ id: "1", type: "status", equals: 200, enabled: true }],
      null,
      { sendFailed: true },
    );
    expect(results[0]?.passed).toBe(false);
  });
});
