import type {
  Assertion,
  AssertionResult,
  ProxyResponsePayload,
} from "@/components/tools/endpoints/types";

function getByDotPath(data: unknown, path: string): unknown {
  const parts = path
    .trim()
    .split(".")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length === 0) return data;

  let current: unknown = data;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    if (Array.isArray(current)) {
      const index = Number(part);
      if (!Number.isInteger(index) || index < 0 || index >= current.length) {
        return undefined;
      }
      current = current[index];
      continue;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

function valueToCompareString(value: unknown): string {
  if (value === undefined) return "";
  if (value === null) return "null";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function decodeBody(body: string, encoding: "text" | "base64"): string {
  if (encoding === "text") return body;
  try {
    if (typeof atob === "function") return atob(body);
    return Buffer.from(body, "base64").toString("utf8");
  } catch {
    return body;
  }
}

export function runAssertions(
  assertions: Assertion[] | undefined,
  response: ProxyResponsePayload | null,
  options?: { includeStatusOnError?: boolean; sendFailed?: boolean },
): AssertionResult[] {
  const list = assertions ?? [];
  if (list.length === 0) return [];

  const sendFailed = Boolean(options?.sendFailed);
  let parsedJson: unknown = undefined;
  let jsonParseError: string | null = null;

  if (response && response.bodyEncoding === "text") {
    const text = decodeBody(response.body, response.bodyEncoding).trim();
    if (text) {
      try {
        parsedJson = JSON.parse(text) as unknown;
      } catch (e) {
        jsonParseError = e instanceof Error ? e.message : "Invalid JSON";
      }
    }
  }

  return list
    .filter((a) => a.enabled)
    .map((assertion): AssertionResult => {
      if (assertion.type === "status") {
        if (sendFailed && !response) {
          return {
            id: assertion.id,
            passed: false,
            message: `Expected status ${assertion.equals}, but the request failed`,
          };
        }
        if (!response) {
          return {
            id: assertion.id,
            passed: false,
            message: `Expected status ${assertion.equals}, but there is no response`,
          };
        }
        const passed = response.status === assertion.equals;
        return {
          id: assertion.id,
          passed,
          message: passed
            ? `Status is ${response.status}`
            : `Expected status ${assertion.equals}, got ${response.status}`,
        };
      }

      if (assertion.type === "maxDuration") {
        if (!response) {
          return {
            id: assertion.id,
            passed: false,
            message: `Expected duration ≤ ${assertion.ms} ms, but there is no response`,
          };
        }
        const passed = response.durationMs <= assertion.ms;
        return {
          id: assertion.id,
          passed,
          message: passed
            ? `Duration ${Math.round(response.durationMs)} ms ≤ ${assertion.ms} ms`
            : `Duration ${Math.round(response.durationMs)} ms exceeded ${assertion.ms} ms`,
        };
      }

      // jsonPath
      if (!response) {
        return {
          id: assertion.id,
          passed: false,
          message: `Path ${assertion.path}: no response body`,
        };
      }
      if (jsonParseError || parsedJson === undefined) {
        return {
          id: assertion.id,
          passed: false,
          message: `Path ${assertion.path}: response is not JSON${
            jsonParseError ? ` (${jsonParseError})` : ""
          }`,
        };
      }
      const actual = getByDotPath(parsedJson, assertion.path);
      if (actual === undefined) {
        return {
          id: assertion.id,
          passed: false,
          message: `Path ${assertion.path} not found`,
        };
      }
      const actualStr = valueToCompareString(actual);
      const passed = actualStr === assertion.equals;
      return {
        id: assertion.id,
        passed,
        message: passed
          ? `${assertion.path} equals ${JSON.stringify(assertion.equals)}`
          : `Expected ${assertion.path} === ${JSON.stringify(assertion.equals)}, got ${JSON.stringify(actualStr)}`,
      };
    });
}
