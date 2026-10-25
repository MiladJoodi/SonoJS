import type {
  AuthConfig,
  Collection,
  Environment,
  HttpMethod,
  HttpRequest,
  KeyValuePair,
  RequestBody,
} from "@/components/tools/endpoints/types";
import { createEmptyRequest } from "@/components/tools/endpoints/lib/http/request";
import { createId, createPair } from "@/components/tools/endpoints/lib/id";
import { openApiToEndpoints } from "@/components/tools/endpoints/lib/import/openapi";
import { HTTP_METHODS } from "@/components/tools/endpoints/types";

const POSTMAN_SCHEMA =
  "https://schema.getpostman.com/json/collection/v2.1.0/collection.json";

type PostmanHeader = { key?: string; value?: string; disabled?: boolean };
type PostmanQuery = { key?: string; value?: string; disabled?: boolean };
type PostmanUrl =
  | string
  | {
      raw?: string;
      protocol?: string;
      host?: string[] | string;
      path?: string[] | string;
      query?: PostmanQuery[];
    };

interface PostmanRequest {
  method?: string;
  header?: PostmanHeader[];
  url?: PostmanUrl;
  body?: {
    mode?: string;
    raw?: string;
    urlencoded?: Array<{ key?: string; value?: string; disabled?: boolean }>;
    formdata?: Array<{
      key?: string;
      value?: string;
      type?: string;
      disabled?: boolean;
    }>;
  };
  auth?: {
    type?: string;
    bearer?: Array<{ key?: string; value?: string }>;
    basic?: Array<{ key?: string; value?: string }>;
    apikey?: Array<{ key?: string; value?: string }>;
  };
}

interface PostmanItem {
  name?: string;
  request?: PostmanRequest | string;
  item?: PostmanItem[];
}

export interface PostmanCollection {
  info?: { name?: string; schema?: string };
  item?: PostmanItem[];
}

export interface EndpointsBackup {
  format: "endpoints.ir";
  version: 1;
  exportedAt: number;
  collections: Collection[];
  requests: HttpRequest[];
  environments?: Environment[];
}

export interface ImportResult {
  collections: Collection[];
  requests: HttpRequest[];
  environments: Environment[];
  label: string;
}

function isHttpMethod(value: string): value is HttpMethod {
  return (HTTP_METHODS as string[]).includes(value);
}

function pairsFromPostmanHeaders(headers: PostmanHeader[] | undefined): KeyValuePair[] {
  const pairs =
    headers?.map((h) =>
      createPair(h.key ?? "", h.value ?? "", !(h.disabled ?? false)),
    ) ?? [];
  return pairs.length > 0 ? pairs : [createPair()];
}

function urlFromPostman(url: PostmanUrl | undefined): {
  url: string;
  params: KeyValuePair[];
} {
  if (!url) return { url: "", params: [createPair()] };
  if (typeof url === "string") {
    return { url, params: [createPair()] };
  }
  const raw = url.raw?.trim();
  if (raw) {
    const params =
      url.query?.map((q) =>
        createPair(q.key ?? "", q.value ?? "", !(q.disabled ?? false)),
      ) ?? [];
    return { url: raw, params: params.length > 0 ? params : [createPair()] };
  }
  const protocol = url.protocol ?? "https";
  const host = Array.isArray(url.host) ? url.host.join(".") : (url.host ?? "");
  const path = Array.isArray(url.path)
    ? url.path.join("/")
    : (url.path ?? "");
  const query = (url.query ?? [])
    .filter((q) => q.key && !(q.disabled ?? false))
    .map((q) => `${encodeURIComponent(q.key!)}=${encodeURIComponent(q.value ?? "")}`)
    .join("&");
  const built = `${protocol}://${host}${path ? `/${path.replace(/^\//, "")}` : ""}${
    query ? `?${query}` : ""
  }`;
  const params =
    url.query?.map((q) =>
      createPair(q.key ?? "", q.value ?? "", !(q.disabled ?? false)),
    ) ?? [];
  return { url: built, params: params.length > 0 ? params : [createPair()] };
}

function authFromPostman(auth: PostmanRequest["auth"]): AuthConfig {
  if (!auth?.type || auth.type === "noauth") return { type: "none" };
  if (auth.type === "bearer") {
    const token =
      auth.bearer?.find((x) => x.key === "token")?.value ??
      auth.bearer?.[0]?.value ??
      "";
    return { type: "bearer", bearerToken: token };
  }
  if (auth.type === "basic") {
    const username = auth.basic?.find((x) => x.key === "username")?.value ?? "";
    const password = auth.basic?.find((x) => x.key === "password")?.value ?? "";
    return { type: "basic", basicUsername: username, basicPassword: password };
  }
  if (auth.type === "apikey") {
    const key = auth.apikey?.find((x) => x.key === "key")?.value ?? "";
    const value = auth.apikey?.find((x) => x.key === "value")?.value ?? "";
    const loc = auth.apikey?.find((x) => x.key === "in")?.value;
    return {
      type: "apiKey",
      apiKeyName: key,
      apiKeyValue: value,
      apiKeyLocation: loc === "query" ? "query" : "header",
    };
  }
  return { type: "none" };
}

function bodyFromPostman(body: PostmanRequest["body"]): RequestBody {
  if (!body?.mode || body.mode === "none") {
    return { type: "none", json: "{\n  \n}", form: [createPair()], urlencoded: [createPair()], raw: "" };
  }
  if (body.mode === "raw") {
    const raw = body.raw ?? "";
    const looksJson =
      raw.trim().startsWith("{") ||
      raw.trim().startsWith("[") ||
      raw.trim() === "";
    if (looksJson) {
      return {
        type: "json",
        json: raw || "{\n  \n}",
        form: [createPair()],
        urlencoded: [createPair()],
        raw: "",
      };
    }
    return {
      type: "raw",
      raw,
      json: "{\n  \n}",
      form: [createPair()],
      urlencoded: [createPair()],
    };
  }
  if (body.mode === "urlencoded") {
    const pairs =
      body.urlencoded?.map((p) =>
        createPair(p.key ?? "", p.value ?? "", !(p.disabled ?? false)),
      ) ?? [];
    return {
      type: "urlencoded",
      urlencoded: pairs.length > 0 ? pairs : [createPair()],
      form: [createPair()],
      json: "{\n  \n}",
      raw: "",
    };
  }
  if (body.mode === "formdata") {
    const pairs =
      body.formdata
        ?.filter((p) => (p.type ?? "text") === "text")
        .map((p) => createPair(p.key ?? "", p.value ?? "", !(p.disabled ?? false))) ??
      [];
    return {
      type: "form",
      form: pairs.length > 0 ? pairs : [createPair()],
      urlencoded: [createPair()],
      json: "{\n  \n}",
      raw: "",
    };
  }
  return { type: "none", json: "{\n  \n}", form: [createPair()], urlencoded: [createPair()], raw: "" };
}

function postmanRequestToHttp(
  name: string,
  request: PostmanRequest,
  collectionId: string,
): HttpRequest {
  const methodRaw = (request.method ?? "GET").toUpperCase();
  const method = isHttpMethod(methodRaw) ? methodRaw : "GET";
  const { url, params } = urlFromPostman(request.url);
  return createEmptyRequest({
    name: name || "Imported request",
    method,
    url,
    params,
    headers: pairsFromPostmanHeaders(request.header),
    auth: authFromPostman(request.auth),
    body: bodyFromPostman(request.body),
    collectionId,
  });
}

function flattenPostmanItems(
  items: PostmanItem[] | undefined,
  collectionId: string,
  bucket: HttpRequest[],
): void {
  if (!items) return;
  for (const item of items) {
    if (item.item && item.item.length > 0) {
      flattenPostmanItems(item.item, collectionId, bucket);
      continue;
    }
    if (!item.request || typeof item.request === "string") continue;
    bucket.push(postmanRequestToHttp(item.name ?? "Request", item.request, collectionId));
  }
}

export function collectionToPostman(
  collection: Collection,
  requests: HttpRequest[],
): PostmanCollection {
  const items = requests
    .filter((r) => r.collectionId === collection.id)
    .map((r) => httpRequestToPostmanItem(r));
  return {
    info: {
      name: collection.name,
      schema: POSTMAN_SCHEMA,
    },
    item: items,
  };
}

export function collectionsToPostman(
  collections: Collection[],
  requests: HttpRequest[],
): PostmanCollection {
  if (collections.length === 1) {
    return collectionToPostman(collections[0], requests);
  }
  return {
    info: {
      name: "Endpoints export",
      schema: POSTMAN_SCHEMA,
    },
    item: collections.map((col) => ({
      name: col.name,
      item: requests
        .filter((r) => r.collectionId === col.id)
        .map((r) => httpRequestToPostmanItem(r)),
    })),
  };
}

function httpRequestToPostmanItem(request: HttpRequest): PostmanItem {
  const headers = request.headers
    .filter((h) => h.key.trim())
    .map((h) => ({
      key: h.key,
      value: h.value,
      disabled: !h.enabled,
    }));

  const query = request.params
    .filter((p) => p.key.trim())
    .map((p) => ({
      key: p.key,
      value: p.value,
      disabled: !p.enabled,
    }));

  const body = (() => {
    if (request.body.type === "json") {
      return { mode: "raw", raw: request.body.json ?? "" };
    }
    if (request.body.type === "raw") {
      return { mode: "raw", raw: request.body.raw ?? "" };
    }
    if (request.body.type === "urlencoded") {
      return {
        mode: "urlencoded",
        urlencoded: (request.body.urlencoded ?? [])
          .filter((p) => p.key.trim())
          .map((p) => ({
            key: p.key,
            value: p.value,
            disabled: !p.enabled,
          })),
      };
    }
    if (request.body.type === "form") {
      return {
        mode: "formdata",
        formdata: (request.body.form ?? [])
          .filter((p) => p.key.trim())
          .map((p) => ({
            key: p.key,
            value: p.value,
            type: "text",
            disabled: !p.enabled,
          })),
      };
    }
    return undefined;
  })();

  const auth = (() => {
    if (request.auth.type === "bearer") {
      return {
        type: "bearer",
        bearer: [{ key: "token", value: request.auth.bearerToken ?? "" }],
      };
    }
    if (request.auth.type === "basic") {
      return {
        type: "basic",
        basic: [
          { key: "username", value: request.auth.basicUsername ?? "" },
          { key: "password", value: request.auth.basicPassword ?? "" },
        ],
      };
    }
    if (request.auth.type === "apiKey") {
      return {
        type: "apikey",
        apikey: [
          { key: "key", value: request.auth.apiKeyName ?? "" },
          { key: "value", value: request.auth.apiKeyValue ?? "" },
          { key: "in", value: request.auth.apiKeyLocation ?? "header" },
        ],
      };
    }
    return undefined;
  })();

  return {
    name: request.name || "Untitled",
    request: {
      method: request.method,
      header: headers,
      url: {
        raw: request.url,
        query: query.length > 0 ? query : undefined,
      },
      ...(body ? { body } : {}),
      ...(auth ? { auth } : {}),
    },
  };
}

export function postmanToEndpoints(data: PostmanCollection): ImportResult {
  const items = data.item ?? [];
  const topFolders = items.filter(
    (item) => Array.isArray(item.item) && item.item.length > 0 && !item.request,
  );
  const topRequests = items.filter(
    (item) => item.request && typeof item.request !== "string",
  );

  // Multi-collection export: each top-level folder becomes a collection
  if (topFolders.length > 0 && topRequests.length === 0) {
    const collections: Collection[] = [];
    const requests: HttpRequest[] = [];
    topFolders.forEach((folder, index) => {
      const collectionId = createId();
      const now = Date.now() + index;
      collections.push({
        id: collectionId,
        name: folder.name?.trim() || `Collection ${index + 1}`,
        folders: [],
        order: now,
        createdAt: now,
        updatedAt: now,
      });
      flattenPostmanItems(folder.item, collectionId, requests);
    });
    return {
      collections,
      requests,
      environments: [],
      label:
        collections.length === 1
          ? collections[0].name
          : `${collections.length} collections`,
    };
  }

  const collectionId = createId();
  const now = Date.now();
  const collection: Collection = {
    id: collectionId,
    name: data.info?.name?.trim() || "Imported collection",
    folders: [],
    order: now,
    createdAt: now,
    updatedAt: now,
  };
  const requests: HttpRequest[] = [];
  flattenPostmanItems(items, collectionId, requests);
  return {
    collections: [collection],
    requests,
    environments: [],
    label: collection.name,
  };
}

export function createEndpointsBackup(
  collections: Collection[],
  requests: HttpRequest[],
  environments: Environment[] = [],
): EndpointsBackup {
  return {
    format: "endpoints.ir",
    version: 1,
    exportedAt: Date.now(),
    collections,
    requests,
    environments,
  };
}

function remapIds(result: {
  collections: Collection[];
  requests: HttpRequest[];
  environments?: Environment[];
}): ImportResult {
  const colMap = new Map<string, string>();
  const folderMap = new Map<string, string>();
  const collections = result.collections.map((c) => {
    const id = createId();
    colMap.set(c.id, id);
    const now = Date.now();
    const folders = (c.folders ?? []).map((f, index) => {
      const folderId = createId();
      folderMap.set(`${c.id}:${f.id}`, folderId);
      return {
        id: folderId,
        name: f.name,
        order: f.order ?? index,
      };
    });
    return {
      ...c,
      id,
      folders,
      order: now,
      createdAt: now,
      updatedAt: now,
    };
  });
  const requests = result.requests.map((r) => {
    const collectionId = r.collectionId ? colMap.get(r.collectionId) : undefined;
    const folderId =
      r.folderId && r.collectionId
        ? folderMap.get(`${r.collectionId}:${r.folderId}`)
        : undefined;
    return createEmptyRequest({
      ...r,
      id: createId(),
      collectionId,
      folderId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  });
  const environments = (result.environments ?? []).map((env) => ({
    ...env,
    id: createId(),
    variables: env.variables.map((v) =>
      createPair(v.key, v.value, v.enabled),
    ),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }));
  return {
    collections,
    requests,
    environments,
    label:
      collections.length === 1
        ? collections[0].name
        : `${collections.length} collections`,
  };
}

export function parseImportJson(raw: string): ImportResult {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error("File is not valid JSON.");
  }
  if (!data || typeof data !== "object") {
    throw new Error("Unrecognized collection format.");
  }
  const obj = data as Record<string, unknown>;

  // OpenAPI 3.x / Swagger
  if (
    (typeof obj.openapi === "string" && obj.openapi.startsWith("3.")) ||
    typeof obj.swagger === "string"
  ) {
    return openApiToEndpoints(obj as Parameters<typeof openApiToEndpoints>[0]);
  }

  // Postman Collection v2.1
  const schema =
    typeof obj.info === "object" &&
    obj.info &&
    "schema" in obj.info &&
    typeof (obj.info as { schema?: unknown }).schema === "string"
      ? String((obj.info as { schema: string }).schema)
      : "";
  if (schema.includes("getpostman.com") || schema.includes("postman")) {
    return postmanToEndpoints(obj as PostmanCollection);
  }

  // Endpoints backup
  if (obj.format === "endpoints.ir" && Array.isArray(obj.collections)) {
    return remapIds({
      collections: obj.collections as Collection[],
      requests: (obj.requests as HttpRequest[]) ?? [],
      environments: (obj.environments as Environment[]) ?? [],
    });
  }

  // Single Endpoints collection export
  if (obj.collection && typeof obj.collection === "object") {
    return remapIds({
      collections: [obj.collection as Collection],
      requests: (obj.requests as HttpRequest[]) ?? [],
    });
  }

  throw new Error(
    "Unsupported file. Use OpenAPI 3.x JSON, a Postman Collection v2.1, or an Endpoints export.",
  );
}

export function stringifyPretty(value: unknown): string {
  return JSON.stringify(value, null, 2);
}
