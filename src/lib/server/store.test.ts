import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  consumeMagicLink,
  createCapture,
  createMagicLink,
  listCapturesForUser,
  processPendingCaptures,
  saveReview,
  setStateFileForTesting
} from "@/lib/server/store";

describe("store", () => {
  let stateFile: string;

  beforeEach(async () => {
    const tempDir = await mkdtemp(join(tmpdir(), "insight-tracker-"));
    stateFile = join(tempDir, "state.json");
    setStateFileForTesting(stateFile);
  });

  afterEach(() => {
    setStateFileForTesting(null);
  });

  it("creates and consumes a magic link into a session", async () => {
    const preview = await createMagicLink("Tonia@Example.com");
    const token = new URL(`https://example.test${preview.href}`).searchParams.get("token");

    expect(token).toBeTruthy();

    const session = await consumeMagicLink(token ?? "");

    expect(session?.email).toBe("tonia@example.com");
  });

  it("stores captures and reviewed output together", async () => {
    const capture = await createCapture("tonia@example.com", "Follow up with Maya about the hiring workshop.");

    await processPendingCaptures(new Date(capture.createdAt).getTime() + 5000);

    const [processed] = await listCapturesForUser("tonia@example.com");

    expect(processed.status).toBe("needs_review");
    expect(processed.transcript).toContain("Follow up with Maya");

    await saveReview(processed.id, processed.email, {
      insight: "Maya is a strong contact for the hiring workshop.",
      followUps: ["Send a follow-up note with two possible times."],
      reviewedAt: new Date().toISOString()
    });

    const rawState = JSON.parse(await readFile(stateFile, "utf-8")) as {
      captures: Array<{ review: { insight: string } | null; status: string }>;
    };

    expect(rawState.captures[0].status).toBe("reviewed");
    expect(rawState.captures[0].review?.insight).toContain("Maya");
  });
});
