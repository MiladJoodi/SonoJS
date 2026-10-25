import { describe, expect, it } from "vitest";
import {
  isBlockedHostname,
  isBlockedIp,
  isPrivateIpv4,
  isPrivateIpv6,
  validateUrlScheme,
} from "@/components/tools/endpoints/lib/security/ssrf";

describe("SSRF protection", () => {
  it("allows public https URLs", () => {
    expect(validateUrlScheme("https://api.github.com/users").allowed).toBe(true);
  });

  it("blocks non-http schemes", () => {
    const r = validateUrlScheme("ftp://example.com");
    expect(r.allowed).toBe(false);
  });

  it("blocks localhost hostnames", () => {
    expect(isBlockedHostname("localhost")).toBe(true);
    expect(isBlockedHostname("foo.localhost")).toBe(true);
    expect(validateUrlScheme("http://localhost:3000").allowed).toBe(false);
  });

  it("blocks private IPv4 ranges", () => {
    expect(isPrivateIpv4("10.0.0.1")).toBe(true);
    expect(isPrivateIpv4("192.168.1.1")).toBe(true);
    expect(isPrivateIpv4("127.0.0.1")).toBe(true);
    expect(isPrivateIpv4("172.16.5.1")).toBe(true);
    expect(isPrivateIpv4("8.8.8.8")).toBe(false);
    expect(isBlockedIp("169.254.169.254")).toBe(true);
  });

  it("blocks private IPv6", () => {
    expect(isPrivateIpv6("::1")).toBe(true);
    expect(isPrivateIpv6("fe80::1")).toBe(true);
    expect(isPrivateIpv6("fc00::1")).toBe(true);
  });

  it("blocks .internal and metadata hosts", () => {
    expect(isBlockedHostname("metadata.google.internal")).toBe(true);
    expect(isBlockedHostname("service.internal")).toBe(true);
  });
});
