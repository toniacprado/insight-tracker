import { describe, expect, it } from "vitest";

import { isDevelopmentAuthEnabled } from "@/lib/server/auth";

describe("auth environment policy", () => {
  it("allows development auth outside production", () => {
    expect(isDevelopmentAuthEnabled({ NODE_ENV: "development" })).toBe(true);
  });

  it("disables development auth in production by default", () => {
    expect(isDevelopmentAuthEnabled({ NODE_ENV: "production" })).toBe(false);
  });

  it("allows an explicit production override for temporary previews", () => {
    expect(
      isDevelopmentAuthEnabled({
        ALLOW_DEVELOPMENT_AUTH_PREVIEW: "true",
        NODE_ENV: "production"
      })
    ).toBe(true);
  });
});
