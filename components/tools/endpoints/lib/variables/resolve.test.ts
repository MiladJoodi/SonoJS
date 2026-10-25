import { describe, expect, it } from "vitest";
import {
  buildVariableMap,
  findUnresolvedInStrings,
  resolveVariables,
} from "@/components/tools/endpoints/lib/variables/resolve";

describe("environment variables", () => {
  it("resolves variables", () => {
    const { result, unresolved } = resolveVariables(
      "{{baseUrl}}/users/{{userId}}",
      { baseUrl: "https://api.example.com", userId: "42" },
    );
    expect(result).toBe("https://api.example.com/users/42");
    expect(unresolved).toEqual([]);
  });

  it("tracks unresolved variables", () => {
    const { result, unresolved } = resolveVariables("{{baseUrl}}/x", {});
    expect(result).toBe("{{baseUrl}}/x");
    expect(unresolved).toEqual(["baseUrl"]);
  });

  it("builds map from enabled vars only", () => {
    const map = buildVariableMap([
      { key: "a", value: "1", enabled: true },
      { key: "b", value: "2", enabled: false },
    ]);
    expect(map).toEqual({ a: "1" });
  });

  it("finds unresolved across strings", () => {
    const unresolved = findUnresolvedInStrings(
      ["{{a}}", "Bearer {{token}}"],
      { a: "ok" },
    );
    expect(unresolved).toEqual(["token"]);
  });
});
