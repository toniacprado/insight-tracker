import { describe, expect, it } from "vitest";

import { normalizeSourceText, processCaptureSource } from "@/lib/server/processing";

describe("processing", () => {
  it("normalizes whitespace before deriving output", () => {
    expect(normalizeSourceText(" met  Alice \n about  founder coffee ")).toBe(
      "met Alice about founder coffee"
    );
  });

  it("produces a transcript, insight, and multiple follow-up candidates", () => {
    const result = processCaptureSource(
      "Met Alice after the fintech panel. She asked for an intro to the payments team and said I should send the deck."
    );

    expect(result.transcript).toContain("Met Alice after the fintech panel.");
    expect(result.generatedInsight).toContain("Met Alice after the fintech panel.");
    expect(result.generatedFollowUps.length).toBeGreaterThanOrEqual(2);
    expect(result.generatedFollowUps.join(" ")).toContain("intro");
  });
});
