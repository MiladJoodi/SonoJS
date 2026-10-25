import { describe, expect, it } from "vitest";
import { jsonToTypeScript, jsonTextToTypeScript } from "@/components/tools/endpoints/lib/export/json-to-ts";

describe("jsonToTypeScript", () => {
  it("merges nested objects across array items into one type", () => {
    const out = jsonToTypeScript(
      [
        {
          id: 1,
          name: "A",
          address: { city: "X", geo: { lat: "1", lng: "2" } },
          company: { name: "C1", bs: "b" },
        },
        {
          id: 2,
          name: "B",
          address: { city: "Y", geo: { lat: "3", lng: "4" } },
          company: { name: "C2", bs: "c" },
        },
      ],
      "Root",
    );

    expect(out).toContain("export interface RootItem");
    expect(out).toContain("export interface Address");
    expect(out).toContain("export interface Geo");
    expect(out).toContain("export interface Company");
    expect(out).not.toContain("Address2");
    expect(out).not.toContain("Company2");
    expect(out).not.toContain("Geo2");
    expect(out).toContain("export type Root = RootItem[]");
    expect(out.match(/export interface Address/g)?.length).toBe(1);
    expect(out.match(/export interface Company/g)?.length).toBe(1);
  });

  it("converts a single object", () => {
    const out = jsonToTypeScript({ id: 1, name: "Ada" }, "User");
    expect(out).toContain("export interface User");
    expect(out).toContain("id: number");
    expect(out).toContain("name: string");
  });

  it("handles invalid json text", () => {
    const out = jsonTextToTypeScript("not-json", "Root");
    expect(out).toContain("not valid JSON");
  });
});
