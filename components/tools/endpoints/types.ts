export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

export type AuthType = "none" | "bearer" | "basic" | "apiKey";

export type ApiKeyLocation = "header" | "query";

export type BodyType = "none" | "json" | "form" | "urlencoded" | "raw";

export type ThemePreference = "dark" | "light";

export interface KeyValuePair {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface AuthConfig {
  type: AuthType;
  bearerToken?: string;
  basicUsername?: string;
  basicPassword?: string;
  apiKeyName?: string;
  apiKeyValue?: string;
  apiKeyLocation?: ApiKeyLocation;
}

export interface RequestBody {
  type: BodyType;
  json?: string;
  form?: KeyValuePair[];
  urlencoded?: KeyValuePair[];
  raw?: string;
}

export type Assertion =
  | { id: string; type: "status"; equals: number; enabled: boolean }
  | { id: string; type: "jsonPath"; path: string; equals: string; enabled: boolean }
  | { id: string; type: "maxDuration"; ms: number; enabled: boolean };

export interface AssertionResult {
  id: string;
  passed: boolean;
  message: string;
}

export interface HttpRequest {
  id: string;
  name: string;
  method: HttpMethod;
  url: string;
  params: KeyValuePair[];
  headers: KeyValuePair[];
  auth: AuthConfig;
  body: RequestBody;
  collectionId?: string;
  folderId?: string;
  assertions?: Assertion[];
  createdAt: number;
  updatedAt: number;
}

/** In-memory editor tab — requestId always equals request.id; never duplicates IDB rows. */
export interface EditorTab {
  id: string;
  requestId: string;
  request: HttpRequest;
  response: ProxyResponsePayload | null;
  sendError: { message: string; details?: string } | null;
  assertionResults?: AssertionResult[];
}

export interface CollectionFolder {
  id: string;
  name: string;
  order: number;
}

export interface Collection {
  id: string;
  name: string;
  folders: CollectionFolder[];
  collapsed?: boolean;
  order: number;
  createdAt: number;
  updatedAt: number;
}

export interface EnvironmentVariable {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface Environment {
  id: string;
  name: string;
  variables: EnvironmentVariable[];
  createdAt: number;
  updatedAt: number;
}

export interface HistoryItem {
  id: string;
  method: HttpMethod;
  url: string;
  requestSnapshot: HttpRequest;
  status?: number;
  statusText?: string;
  durationMs?: number;
  sizeBytes?: number;
  error?: string;
  /** Cached response so reopening history does not require re-send */
  responseSnapshot?: ProxyResponsePayload | null;
  createdAt: number;
}

export interface ProxyRequestPayload {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
  body?: string | null;
  timeoutMs: number;
}

export interface ProxyResponsePayload {
  ok: boolean;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  bodyEncoding: "text" | "base64";
  contentType: string | null;
  durationMs: number;
  sizeBytes: number;
  truncated?: boolean;
  error?: ProxyErrorPayload;
}

export interface ProxyErrorPayload {
  code:
    | "invalid_url"
    | "ssrf_blocked"
    | "timeout"
    | "rate_limited"
    | "body_too_large"
    | "response_too_large"
    | "network_error"
    | "redirect_blocked"
    | "unsupported_scheme"
    | "aborted"
    | "unknown";
  message: string;
  details?: string;
}

export interface AppPreferences {
  theme: ThemePreference;
  timeoutMs: number;
  sidebarCollapsed: boolean;
  activeEnvironmentId: string | null;
  lastCollectionId: string | null;
}

export const HTTP_METHODS: HttpMethod[] = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
];

export const DEFAULT_TIMEOUT_MS = 30_000;

export const LARGE_RESPONSE_RENDER_BYTES = 1_500_000;
