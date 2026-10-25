"use client";

import { useWorkspace } from "@/components/tools/endpoints/workspace/workspace-provider";
import { KeyValueEditor } from "@/components/tools/endpoints/request/key-value-editor";
import {
  COMMON_HEADERS,
  formatJson,
  minifyJson,
  syncUrlWithParams,
  validateJson,
} from "@/components/tools/endpoints/lib/http/request";
import type { Assertion, AuthType, BodyType } from "@/components/tools/endpoints/types";
import { Button } from "@/components/tools/endpoints/ui/button";
import { Input } from "@/components/tools/endpoints/ui/input";
import { Label } from "@/components/tools/endpoints/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/tools/endpoints/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tools/endpoints/ui/tabs";
import { Textarea } from "@/components/tools/endpoints/ui/textarea";
import { createId } from "@/components/tools/endpoints/lib/id";
import { useMemo, useState } from "react";

function createAssertion(
  type: Assertion["type"] = "status",
): Assertion {
  if (type === "jsonPath") {
    return { id: createId(), type: "jsonPath", path: "", equals: "", enabled: true };
  }
  if (type === "maxDuration") {
    return { id: createId(), type: "maxDuration", ms: 1000, enabled: true };
  }
  return { id: createId(), type: "status", equals: 200, enabled: true };
}

export function RequestConfig() {
  const { request, setRequest } = useWorkspace();
  const [jsonError, setJsonError] = useState<string | null>(null);

  const jsonValidation = useMemo(() => {
    if (request.body.type !== "json" || !request.body.json?.trim()) return null;
    const result = validateJson(request.body.json);
    return result.ok ? null : result.message;
  }, [request.body.type, request.body.json]);

  return (
    <Tabs defaultValue="params" className="flex min-h-0 min-w-0 flex-1 flex-col gap-0! overflow-x-hidden">
      <TabsList variant="line" className="shrink-0 pt-3">
        <TabsTrigger value="params">Params</TabsTrigger>
        <TabsTrigger value="auth">Auth</TabsTrigger>
        <TabsTrigger value="headers">Headers</TabsTrigger>
        <TabsTrigger value="body">Body</TabsTrigger>
        <TabsTrigger value="tests">Tests</TabsTrigger>
      </TabsList>

      <TabsContent value="params" className="mt-0 min-w-0 overflow-x-hidden overflow-y-auto px-3 py-3">
        <KeyValueEditor
          pairs={request.params}
          onChange={(params) =>
            setRequest((prev) => ({
              ...prev,
              params,
              url: syncUrlWithParams(prev.url, params),
            }))
          }
        />
      </TabsContent>

      <TabsContent value="auth" className="mt-0 min-w-0 space-y-3 overflow-x-hidden overflow-y-auto px-3 py-3">
        <div className="max-w-xs space-y-1.5">
          <Label htmlFor="auth-type">Type</Label>
          <Select
            value={request.auth.type}
            items={{
              none: "No Auth",
              bearer: "Bearer Token",
              basic: "Basic Auth",
              apiKey: "API Key",
            }}
            onValueChange={(value) => {
              if (!value) return;
              setRequest((prev) => ({
                ...prev,
                auth: { ...prev.auth, type: value as AuthType },
              }));
            }}
          >
            <SelectTrigger id="auth-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Auth</SelectItem>
              <SelectItem value="bearer">Bearer Token</SelectItem>
              <SelectItem value="basic">Basic Auth</SelectItem>
              <SelectItem value="apiKey">API Key</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {request.auth.type === "bearer" ? (
          <div className="max-w-lg space-y-1.5">
            <Label htmlFor="bearer">Token</Label>
            <Input
              id="bearer"
              type="password"
              className="font-mono"
              value={request.auth.bearerToken ?? ""}
              onChange={(e) =>
                setRequest((prev) => ({
                  ...prev,
                  auth: { ...prev.auth, bearerToken: e.target.value },
                }))
              }
              placeholder="{{token}}"
              autoComplete="off"
            />
          </div>
        ) : null}

        {request.auth.type === "basic" ? (
          <div className="grid max-w-lg gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="basic-user">Username</Label>
              <Input
                id="basic-user"
                value={request.auth.basicUsername ?? ""}
                onChange={(e) =>
                  setRequest((prev) => ({
                    ...prev,
                    auth: { ...prev.auth, basicUsername: e.target.value },
                  }))
                }
                autoComplete="off"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="basic-pass">Password</Label>
              <Input
                id="basic-pass"
                type="password"
                value={request.auth.basicPassword ?? ""}
                onChange={(e) =>
                  setRequest((prev) => ({
                    ...prev,
                    auth: { ...prev.auth, basicPassword: e.target.value },
                  }))
                }
                autoComplete="off"
              />
            </div>
          </div>
        ) : null}

        {request.auth.type === "apiKey" ? (
          <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="api-key-name">Key</Label>
              <Input
                id="api-key-name"
                className="font-mono"
                value={request.auth.apiKeyName ?? ""}
                onChange={(e) =>
                  setRequest((prev) => ({
                    ...prev,
                    auth: { ...prev.auth, apiKeyName: e.target.value },
                  }))
                }
                placeholder="X-Api-Key"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="api-key-value">Value</Label>
              <Input
                id="api-key-value"
                type="password"
                className="font-mono"
                value={request.auth.apiKeyValue ?? ""}
                onChange={(e) =>
                  setRequest((prev) => ({
                    ...prev,
                    auth: { ...prev.auth, apiKeyValue: e.target.value },
                  }))
                }
                autoComplete="off"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Add to</Label>
              <Select
                value={request.auth.apiKeyLocation ?? "header"}
                items={{
                  header: "Header",
                  query: "Query Parameter",
                }}
                onValueChange={(value) => {
                  if (!value) return;
                  setRequest((prev) => ({
                    ...prev,
                    auth: {
                      ...prev.auth,
                      apiKeyLocation: value as "header" | "query",
                    },
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="header">Header</SelectItem>
                  <SelectItem value="query">Query Parameter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : null}
      </TabsContent>

      <TabsContent value="headers" className="mt-0 min-w-0 overflow-x-hidden overflow-y-auto px-3 py-3">
        <KeyValueEditor
          pairs={request.headers}
          onChange={(headers) => setRequest((prev) => ({ ...prev, headers }))}
          suggestions={COMMON_HEADERS}
        />
      </TabsContent>

      <TabsContent value="body" className="mt-0 min-w-0 space-y-3 overflow-x-hidden overflow-y-auto px-3 py-3">
        <div className="max-w-xs space-y-1.5">
          <Label>Body type</Label>
          <Select
            value={request.body.type}
            items={{
              none: "None",
              json: "JSON",
              form: "Form Data",
              urlencoded: "URL Encoded",
              raw: "Raw Text",
            }}
            onValueChange={(value) => {
              if (!value) return;
              setRequest((prev) => ({
                ...prev,
                body: { ...prev.body, type: value as BodyType },
              }));
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="form">Form Data</SelectItem>
              <SelectItem value="urlencoded">URL Encoded</SelectItem>
              <SelectItem value="raw">Raw Text</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {request.body.type === "json" ? (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  try {
                    setRequest((prev) => ({
                      ...prev,
                      body: { ...prev.body, json: formatJson(prev.body.json ?? "") },
                    }));
                    setJsonError(null);
                  } catch (e) {
                    setJsonError(e instanceof Error ? e.message : "Invalid JSON");
                  }
                }}
              >
                Format
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  try {
                    setRequest((prev) => ({
                      ...prev,
                      body: { ...prev.body, json: minifyJson(prev.body.json ?? "") },
                    }));
                    setJsonError(null);
                  } catch (e) {
                    setJsonError(e instanceof Error ? e.message : "Invalid JSON");
                  }
                }}
              >
                Minify
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  void navigator.clipboard.writeText(request.body.json ?? "");
                }}
              >
                Copy
              </Button>
            </div>
            <Textarea
              value={request.body.json ?? ""}
              onChange={(e) =>
                setRequest((prev) => ({
                  ...prev,
                  body: { ...prev.body, json: e.target.value },
                }))
              }
              className="font-mono min-h-[180px] text-xs leading-relaxed"
              spellCheck={false}
              aria-invalid={Boolean(jsonValidation || jsonError)}
              aria-label="JSON body"
            />
            {(jsonValidation || jsonError) && (
              <p className="text-xs text-destructive" role="alert">
                The JSON body is invalid. {jsonValidation || jsonError}
              </p>
            )}
          </div>
        ) : null}

        {request.body.type === "raw" ? (
          <Textarea
            value={request.body.raw ?? ""}
            onChange={(e) =>
              setRequest((prev) => ({
                ...prev,
                body: { ...prev.body, raw: e.target.value },
              }))
            }
            className="font-mono min-h-[180px] text-xs"
            aria-label="Raw body"
          />
        ) : null}

        {request.body.type === "form" ? (
          <KeyValueEditor
            pairs={request.body.form ?? []}
            onChange={(form) =>
              setRequest((prev) => ({
                ...prev,
                body: { ...prev.body, form },
              }))
            }
          />
        ) : null}

        {request.body.type === "urlencoded" ? (
          <KeyValueEditor
            pairs={request.body.urlencoded ?? []}
            onChange={(urlencoded) =>
              setRequest((prev) => ({
                ...prev,
                body: { ...prev.body, urlencoded },
              }))
            }
          />
        ) : null}
      </TabsContent>

      <TabsContent value="tests" className="mt-0 min-w-0 space-y-3 overflow-x-hidden overflow-y-auto px-3 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Run after each send. JSON path uses dots, e.g. <code>0.name</code> or{" "}
            <code>address.city</code>.
          </p>
          <div className="flex gap-1.5">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>
                setRequest((prev) => ({
                  ...prev,
                  assertions: [...(prev.assertions ?? []), createAssertion("status")],
                }))
              }
            >
              Status
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>
                setRequest((prev) => ({
                  ...prev,
                  assertions: [...(prev.assertions ?? []), createAssertion("jsonPath")],
                }))
              }
            >
              JSON path
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>
                setRequest((prev) => ({
                  ...prev,
                  assertions: [
                    ...(prev.assertions ?? []),
                    createAssertion("maxDuration"),
                  ],
                }))
              }
            >
              Max duration
            </Button>
          </div>
        </div>

        {(request.assertions ?? []).length === 0 ? (
          <p className="py-6 text-center text-xs text-muted-foreground">
            No tests yet. Add a status, JSON path, or duration check.
          </p>
        ) : (
          <ul className="space-y-2">
            {(request.assertions ?? []).map((assertion, index) => (
              <li
                key={assertion.id}
                className="flex flex-wrap items-end gap-2 rounded-md border border-border/70 p-2"
              >
                <label className="flex items-center gap-1.5 self-center text-xs">
                  <input
                    type="checkbox"
                    checked={assertion.enabled}
                    onChange={(e) =>
                      setRequest((prev) => ({
                        ...prev,
                        assertions: (prev.assertions ?? []).map((a, i) =>
                          i === index ? { ...a, enabled: e.target.checked } : a,
                        ),
                      }))
                    }
                  />
                  On
                </label>

                <div className="w-[7.5rem] space-y-1">
                  <Label className="text-[10px]">Type</Label>
                  <Select
                    value={assertion.type}
                    items={{
                      status: "Status",
                      jsonPath: "JSON path",
                      maxDuration: "Max duration",
                    }}
                    onValueChange={(value) => {
                      if (!value) return;
                      setRequest((prev) => ({
                        ...prev,
                        assertions: (prev.assertions ?? []).map((a, i) => {
                          if (i !== index) return a;
                          return createAssertion(value as Assertion["type"]);
                        }),
                      }));
                    }}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="status">Status</SelectItem>
                      <SelectItem value="jsonPath">JSON path</SelectItem>
                      <SelectItem value="maxDuration">Max duration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {assertion.type === "status" ? (
                  <div className="w-24 space-y-1">
                    <Label className="text-[10px]">Equals</Label>
                    <Input
                      type="number"
                      className="h-8 font-mono text-xs"
                      value={assertion.equals}
                      onChange={(e) =>
                        setRequest((prev) => ({
                          ...prev,
                          assertions: (prev.assertions ?? []).map((a, i) =>
                            i === index && a.type === "status"
                              ? { ...a, equals: Number(e.target.value) || 0 }
                              : a,
                          ),
                        }))
                      }
                    />
                  </div>
                ) : null}

                {assertion.type === "jsonPath" ? (
                  <>
                    <div className="min-w-[8rem] flex-1 space-y-1">
                      <Label className="text-[10px]">Path</Label>
                      <Input
                        className="h-8 font-mono text-xs"
                        value={assertion.path}
                        placeholder="address.city"
                        onChange={(e) =>
                          setRequest((prev) => ({
                            ...prev,
                            assertions: (prev.assertions ?? []).map((a, i) =>
                              i === index && a.type === "jsonPath"
                                ? { ...a, path: e.target.value }
                                : a,
                            ),
                          }))
                        }
                      />
                    </div>
                    <div className="min-w-[8rem] flex-1 space-y-1">
                      <Label className="text-[10px]">Equals</Label>
                      <Input
                        className="h-8 font-mono text-xs"
                        value={assertion.equals}
                        onChange={(e) =>
                          setRequest((prev) => ({
                            ...prev,
                            assertions: (prev.assertions ?? []).map((a, i) =>
                              i === index && a.type === "jsonPath"
                                ? { ...a, equals: e.target.value }
                                : a,
                            ),
                          }))
                        }
                      />
                    </div>
                  </>
                ) : null}

                {assertion.type === "maxDuration" ? (
                  <div className="w-28 space-y-1">
                    <Label className="text-[10px]">Max ms</Label>
                    <Input
                      type="number"
                      className="h-8 font-mono text-xs"
                      value={assertion.ms}
                      onChange={(e) =>
                        setRequest((prev) => ({
                          ...prev,
                          assertions: (prev.assertions ?? []).map((a, i) =>
                            i === index && a.type === "maxDuration"
                              ? { ...a, ms: Number(e.target.value) || 0 }
                              : a,
                          ),
                        }))
                      }
                    />
                  </div>
                ) : null}

                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="ms-auto text-destructive"
                  onClick={() =>
                    setRequest((prev) => ({
                      ...prev,
                      assertions: (prev.assertions ?? []).filter(
                        (_, i) => i !== index,
                      ),
                    }))
                  }
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </TabsContent>
    </Tabs>
  );
}
