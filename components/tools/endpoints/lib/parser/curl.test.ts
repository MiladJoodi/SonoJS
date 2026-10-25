import { describe, expect, it } from "vitest";
import { parseCurl } from "@/components/tools/endpoints/lib/parser/curl";
import { syncUrlWithParams, validateJson } from "@/components/tools/endpoints/lib/http/request";
import { createPair } from "@/components/tools/endpoints/lib/id";

describe("cURL parser", () => {
  it("parses a common GET", () => {
    const req = parseCurl("curl https://api.example.com/users");
    expect(req.method).toBe("GET");
    expect(req.url).toBe("https://api.example.com/users");
  });

  it("parses headers and JSON body", () => {
    const req = parseCurl(`curl https://api.example.com/users \\
  -X POST \\
  -H "Authorization: Bearer token" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Ada"}'`);
    expect(req.method).toBe("POST");
    expect(req.headers.some((h) => h.key === "Authorization")).toBe(true);
    expect(req.body.type).toBe("json");
    expect(req.body.json).toContain("Ada");
  });
});

describe("request helpers", () => {
  it("syncs params into URL", () => {
    const url = syncUrlWithParams("https://api.example.com/users", [
      createPair("page", "1", true),
      createPair("q", "a b", true),
      createPair("x", "1", false),
    ]);
    expect(url).toBe("https://api.example.com/users?page=1&q=a%20b");
  });

  it("validates JSON", () => {
    expect(validateJson('{"a":1}').ok).toBe(true);
    expect(validateJson("{").ok).toBe(false);
  });
});
