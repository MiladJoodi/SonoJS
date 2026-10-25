import { describe, expect, it } from "vitest";
import { openApiToEndpoints } from "@/components/tools/endpoints/lib/import/openapi";
import { generateCode } from "@/components/tools/endpoints/lib/export/codegen";
import { createEmptyRequest } from "@/components/tools/endpoints/lib/http/request";
import { parseImportJson } from "@/components/tools/endpoints/lib/export/postman";

describe("openApiToEndpoints", () => {
  it("maps paths and methods into a collection", () => {
    const result = openApiToEndpoints({
      openapi: "3.0.3",
      info: { title: "Demo API" },
      servers: [{ url: "https://api.example.com" }],
      paths: {
        "/users": {
          get: { summary: "List users", tags: ["Users"] },
          post: {
            summary: "Create user",
            tags: ["Users"],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: { name: { type: "string", example: "Ada" } },
                  },
                },
              },
            },
          },
        },
      },
    });

    expect(result.collections).toHaveLength(1);
    expect(result.collections[0].name).toBe("Demo API");
    expect(result.collections[0].folders).toHaveLength(1);
    expect(result.requests).toHaveLength(2);
    expect(result.requests.every((r) => r.collectionId === result.collections[0].id)).toBe(
      true,
    );
    expect(result.requests.some((r) => r.method === "POST" && r.body.type === "json")).toBe(
      true,
    );
  });

  it("is detected by parseImportJson", () => {
    const raw = JSON.stringify({
      openapi: "3.0.0",
      info: { title: "X" },
      paths: { "/ping": { get: { summary: "Ping" } } },
    });
    const result = parseImportJson(raw);
    expect(result.requests).toHaveLength(1);
    expect(result.label).toBe("X");
  });
});

describe("generateCode", () => {
  it("generates fetch and python snippets", () => {
    const req = createEmptyRequest({
      method: "POST",
      url: "https://api.example.com/items",
      headers: [
        { id: "1", key: "Content-Type", value: "application/json", enabled: true },
      ],
      body: { type: "json", json: '{"a":1}' },
    });
    expect(generateCode(req, "fetch")).toContain("fetch(");
    expect(generateCode(req, "axios")).toContain("axios");
    expect(generateCode(req, "go")).toContain("http.NewRequest");
    expect(generateCode(req, "python")).toContain("requests.post");
  });
});
