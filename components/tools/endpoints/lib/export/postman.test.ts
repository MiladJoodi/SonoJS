import { describe, expect, it } from "vitest";
import {
  collectionToPostman,
  collectionsToPostman,
  parseImportJson,
  postmanToEndpoints,
  stringifyPretty,
} from "@/components/tools/endpoints/lib/export/postman";
import { createEmptyRequest } from "@/components/tools/endpoints/lib/http/request";
import type { Collection } from "@/components/tools/endpoints/types";

describe("postman export/import", () => {
  it("round-trips a collection through Postman v2.1 JSON", () => {
    const collection: Collection = {
      id: "col-1",
      name: "Demo",
      folders: [],
      order: 1,
      createdAt: 1,
      updatedAt: 1,
    };
    const request = createEmptyRequest({
      name: "List users",
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/users",
      collectionId: "col-1",
      headers: [
        { id: "h1", key: "Accept", value: "application/json", enabled: true },
      ],
      auth: { type: "bearer", bearerToken: "secret" },
    });

    const postman = collectionToPostman(collection, [request]);
    expect(postman.info?.schema).toContain("postman");
    expect(postman.item?.[0]?.name).toBe("List users");

    const imported = postmanToEndpoints(postman);
    expect(imported.collections).toHaveLength(1);
    expect(imported.requests).toHaveLength(1);
    expect(imported.requests[0].url).toBe(
      "https://jsonplaceholder.typicode.com/users",
    );
    expect(imported.requests[0].auth.type).toBe("bearer");
    expect(imported.requests[0].auth.bearerToken).toBe("secret");
  });

  it("round-trips multiple collections through Postman export folders", () => {
    const collections: Collection[] = [
      {
        id: "col-a",
        name: "Alpha",
        folders: [],
        order: 1,
        createdAt: 1,
        updatedAt: 1,
      },
      {
        id: "col-b",
        name: "Beta",
        folders: [],
        order: 2,
        createdAt: 2,
        updatedAt: 2,
      },
    ];
    const requests = [
      createEmptyRequest({
        name: "A1",
        url: "https://example.com/a",
        collectionId: "col-a",
      }),
      createEmptyRequest({
        name: "B1",
        url: "https://example.com/b",
        collectionId: "col-b",
      }),
    ];

    const postman = collectionsToPostman(collections, requests);
    expect(postman.info?.name).toBe("Endpoints export");
    expect(postman.item).toHaveLength(2);

    const imported = postmanToEndpoints(postman);
    expect(imported.collections.map((c) => c.name).sort()).toEqual(["Alpha", "Beta"]);
    expect(imported.requests).toHaveLength(2);
    const alpha = imported.collections.find((c) => c.name === "Alpha")!;
    const beta = imported.collections.find((c) => c.name === "Beta")!;
    expect(imported.requests.filter((r) => r.collectionId === alpha.id)).toHaveLength(1);
    expect(imported.requests.filter((r) => r.collectionId === beta.id)).toHaveLength(1);
  });

  it("parses Endpoints backup JSON", () => {
    const raw = stringifyPretty({
      format: "endpoints.ir",
      version: 1,
      exportedAt: Date.now(),
      collections: [
        {
          id: "c1",
          name: "Backup Col",
          folders: [],
          order: 0,
          createdAt: 1,
          updatedAt: 1,
        },
      ],
      requests: [
        createEmptyRequest({
          id: "r1",
          name: "Ping",
          url: "https://example.com",
          collectionId: "c1",
        }),
      ],
      environments: [],
    });
    const result = parseImportJson(raw);
    expect(result.collections[0].name).toBe("Backup Col");
    expect(result.requests[0].url).toBe("https://example.com");
    expect(result.collections[0].id).not.toBe("c1");
  });
});
