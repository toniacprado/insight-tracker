import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  consumeMagicLink,
  createCapture,
  createMagicLink,
  listCapturesForUser,
  processPendingCaptures,
  readStoreForTesting,
  resetStoreForTesting,
  saveReview,
  setMagicLinkCreatedAtForTesting
} from "@/lib/server/store";

describe("store", () => {
  beforeEach(() => {
    resetStoreForTesting();
  });

  afterEach(() => {
    resetStoreForTesting();
  });

  it("creates and consumes a magic link into a session", async () => {
    const preview = await createMagicLink("Tonia@Example.com");
    const token = new URL(`https://example.test${preview.href}`).searchParams.get("token");

    expect(token).toBeTruthy();

    const session = await consumeMagicLink(token ?? "");

    expect(session?.email).toBe("tonia@example.com");
  });

  it("does not list or consume expired magic links", async () => {
    const preview = await createMagicLink("tonia@example.com");
    const token = new URL(`https://example.test${preview.href}`).searchParams.get("token");

    setMagicLinkCreatedAtForTesting(token ?? "", new Date(Date.now() - 1000 * 60 * 16).toISOString());

    expect(await consumeMagicLink(token ?? "")).toBeNull();
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

    const rawState = readStoreForTesting();

    expect(rawState.captures[0].status).toBe("reviewed");
    expect(rawState.captures[0].review?.insight).toContain("Maya");
  });

  it("processes pending captures only for the requested user", async () => {
    const toniaCapture = await createCapture("tonia@example.com", "Follow up with Maya.");
    const otherCapture = await createCapture("other@example.com", "Send the workshop deck.");
    const processAt = new Date(toniaCapture.createdAt).getTime() + 5000;

    await processPendingCaptures(processAt, "tonia@example.com");

    const [processed] = await listCapturesForUser("tonia@example.com");
    const [unprocessed] = await listCapturesForUser("other@example.com");

    expect(processed.id).toBe(toniaCapture.id);
    expect(processed.status).toBe("needs_review");
    expect(unprocessed.id).toBe(otherCapture.id);
    expect(unprocessed.status).toBe("processing");
  });
});
