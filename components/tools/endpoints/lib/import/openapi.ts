import type {
  Collection,
  HttpMethod,
  HttpRequest,
  KeyValuePair,
} from "@/components/tools/endpoints/types";
import { createEmptyRequest } from "@/components/tools/endpoints/lib/http/request";
import { createId, createPair } from "@/components/tools/endpoints/lib/id";
import { HTTP_METHODS } from "@/components/tools/endpoints/types";
import type { ImportResult } from "@/components/tools/endpoints/lib/export/postman";

interface OpenApiDocument {
  openapi?: string;
  swagger?: string;
  info?: { title?: string; version?: string };
  servers?: Array<{ url?: string }>;
  paths?: Record<string, Record<string, OpenApiOperation | undefined>>;
  components?: {
    securitySchemes?: Record<string, OpenApiSecurityScheme>;
  };
}

interface OpenApiOperation {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  parameters?: OpenApiParameter[];
  requestBody?: {
    content?: Record<
      string,
      {
        schema?: unknown;
        example?: unknown;
      }
    >;
  };
  security?: Array<Record<string, string[]>>;
}

interface OpenApiParameter {
  name?: string;
  in?: string;
  required?: boolean;
  schema?: { type?: string; default?: unknown; example?: unknown };
  example?: unknown;
}

interface OpenApiSecurityScheme {
  type?: string;
  name?: string;
  in?: string;
  scheme?: string;
}

function isHttpMethod(value: string): value is HttpMethod {
  return (HTTP_METHODS as string[]).includes(value.toUpperCase());
}

function serverBase(doc: OpenApiDocument): string {
  const url = doc.servers?.[0]?.url?.trim() ?? "";
  if (!url) return "https://api.example.com";
  return url.replace(/\/$/, "");
}

function joinUrl(base: string, path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const b = base.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

function exampleFromSchema(schema: unknown): string {
  if (!schema || typeof schema !== "object") return "{\n  \n}";
  const s = schema as {
    example?: unknown;
    default?: unknown;
    type?: string;
    properties?: Record<string, unknown>;
  };
  if (s.example !== undefined) {
    try {
      return JSON.stringify(s.example, null, 2);
    } catch {
      /* fall through */
    }
  }
  if (s.default !== undefined) {
    try {
      return JSON.stringify(s.default, null, 2);
    } catch {
      /* fall through */
    }
  }
  if (s.type === "object" && s.properties) {
    const obj: Record<string, unknown> = {};
    for (const [key, prop] of Object.entries(s.properties)) {
      const p = prop as { example?: unknown; default?: unknown; type?: string };
      if (p.example !== undefined) obj[key] = p.example;
      else if (p.default !== undefined) obj[key] = p.default;
      else if (p.type === "string") obj[key] = "";
      else if (p.type === "number" || p.type === "integer") obj[key] = 0;
      else if (p.type === "boolean") obj[key] = false;
      else obj[key] = null;
    }
    return JSON.stringify(obj, null, 2);
  }
  return "{\n  \n}";
}

function paramValue(param: OpenApiParameter): string {
  if (param.example !== undefined) return String(param.example);
  if (param.schema?.example !== undefined) return String(param.schema.example);
  if (param.schema?.default !== undefined) return String(param.schema.default);
  return "";
}

function operationName(
  method: string,
  path: string,
  op: OpenApiOperation,
): string {
  if (op.summary?.trim()) return op.summary.trim();
  if (op.operationId?.trim()) return op.operationId.trim();
  return `${method.toUpperCase()} ${path}`;
}

export function isOpenApiDocument(data: unknown): data is OpenApiDocument {
  if (!data || typeof data !== "object") return false;
  const obj = data as Record<string, unknown>;
  if (typeof obj.openapi === "string" && obj.openapi.startsWith("3.")) {
    return true;
  }
  if (typeof obj.swagger === "string") return true;
  return false;
}

/**
 * Parse OpenAPI 3.x JSON into a new Collection + HttpRequests.
 * Swagger 2.x is accepted when a `swagger` field is present (paths mapped similarly).
 */
export function openApiToEndpoints(doc: OpenApiDocument): ImportResult {
  const now = Date.now();
  const collectionId = createId();
  const title = doc.info?.title?.trim() || "OpenAPI import";
  const base = serverBase(doc);

  const foldersByTag = new Map<string, { id: string; name: string; order: number }>();
  const requests: HttpRequest[] = [];
  let order = 0;

  const paths = doc.paths ?? {};
  for (const [pathKey, pathItem] of Object.entries(paths)) {
    if (!pathItem || typeof pathItem !== "object") continue;

    for (const [methodKey, operation] of Object.entries(pathItem)) {
      if (!isHttpMethod(methodKey)) continue;
      if (!operation || typeof operation !== "object") continue;
      const method = methodKey.toUpperCase() as HttpMethod;
      const op = operation as OpenApiOperation;

      const queryParams: KeyValuePair[] = [];
      const headers: KeyValuePair[] = [];
      let urlPath = pathKey;

      for (const param of op.parameters ?? []) {
        if (!param?.name) continue;
        const value = paramValue(param);
        if (param.in === "query") {
          queryParams.push(createPair(param.name, value, true));
        } else if (param.in === "header") {
          headers.push(createPair(param.name, value, true));
        } else if (param.in === "path") {
          urlPath = urlPath.replace(
            `{${param.name}}`,
            encodeURIComponent(value || param.name),
          );
        }
      }

      let bodyType: HttpRequest["body"]["type"] = "none";
      let jsonBody = "{\n  \n}";
      const content = op.requestBody?.content;
      if (content) {
        const jsonContent =
          content["application/json"] ??
          content["application/json; charset=utf-8"] ??
          Object.entries(content).find(([k]) => k.includes("json"))?.[1];
        if (jsonContent) {
          bodyType = "json";
          if (jsonContent.example !== undefined) {
            jsonBody = JSON.stringify(jsonContent.example, null, 2);
          } else {
            jsonBody = exampleFromSchema(jsonContent.schema);
          }
          if (!headers.some((h) => h.key.toLowerCase() === "content-type")) {
            headers.push(createPair("Content-Type", "application/json", true));
          }
        }
      }

      let folderId: string | undefined;
      const tag = op.tags?.[0]?.trim();
      if (tag) {
        let folder = foldersByTag.get(tag);
        if (!folder) {
          folder = { id: createId(), name: tag, order: foldersByTag.size };
          foldersByTag.set(tag, folder);
        }
        folderId = folder.id;
      }

      const url = joinUrl(base, urlPath);
      const req = createEmptyRequest({
        id: createId(),
        name: operationName(method, pathKey, op),
        method,
        url,
        params: queryParams.length > 0 ? queryParams : [createPair()],
        headers: headers.length > 0 ? headers : [createPair()],
        body: {
          type: bodyType,
          json: jsonBody,
          form: [createPair()],
          urlencoded: [createPair()],
          raw: "",
        },
        collectionId,
        folderId,
        createdAt: now + order,
        updatedAt: now + order,
      });
      requests.push(req);
      order += 1;
    }
  }

  const folders = Array.from(foldersByTag.values());
  const collection: Collection = {
    id: collectionId,
    name: title,
    folders,
    order: now,
    createdAt: now,
    updatedAt: now,
  };

  return {
    collections: [collection],
    requests,
    environments: [],
    label: title,
  };
}
