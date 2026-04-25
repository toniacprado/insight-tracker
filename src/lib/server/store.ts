import { randomBytes, randomUUID } from "node:crypto";

import type { CaptureRecord, PendingMagicLink, ReviewRecord, UserSession } from "@/lib/types";
import { processCaptureSource } from "@/lib/server/processing";

type StoredMagicLink = {
  token: string;
  email: string;
  createdAt: string;
  consumedAt: string | null;
};

type StoredState = {
  magicLinks: StoredMagicLink[];
  sessions: UserSession[];
  captures: CaptureRecord[];
};

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const MAGIC_LINK_TTL_MS = 1000 * 60 * 15;
const PROCESSING_DELAY_MS = 1200;

function createInitialState(): StoredState {
  return {
    magicLinks: [],
    sessions: [],
    captures: []
  };
}

let mutationQueue = Promise.resolve();
let state = createInitialState();

export function resetStoreForTesting(): void {
  state = createInitialState();
  mutationQueue = Promise.resolve();
}

export function readStoreForTesting(): StoredState {
  return structuredClone(state);
}

export function setMagicLinkCreatedAtForTesting(token: string, createdAt: string): void {
  const link = state.magicLinks.find((candidate) => candidate.token === token);

  if (link) {
    link.createdAt = createdAt;
  }
}

async function withMutation<T>(mutate: (state: StoredState) => T | Promise<T>): Promise<T> {
  const run = mutationQueue.then(async () => {
    pruneExpiredSessions(state);
    pruneExpiredMagicLinks(state);
    const result = await mutate(state);
    return result;
  });

  mutationQueue = run.then(
    () => undefined,
    () => undefined
  );

  return run;
}

function pruneExpiredSessions(state: StoredState): void {
  const now = Date.now();
  state.sessions = state.sessions.filter((session) => new Date(session.expiresAt).getTime() > now);
}

function isMagicLinkExpired(link: StoredMagicLink, now = Date.now()): boolean {
  return now - new Date(link.createdAt).getTime() > MAGIC_LINK_TTL_MS;
}

function pruneExpiredMagicLinks(state: StoredState): void {
  state.magicLinks = state.magicLinks.filter((link) => !link.consumedAt && !isMagicLinkExpired(link));
}

function createToken(): string {
  return randomBytes(18).toString("hex");
}

function sortCaptures(captures: CaptureRecord[]): CaptureRecord[] {
  return [...captures].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export async function createMagicLink(email: string): Promise<PendingMagicLink> {
  return withMutation((state) => {
    const normalizedEmail = email.trim().toLowerCase();
    const token = createToken();
    const createdAt = new Date().toISOString();

    state.magicLinks.unshift({
      token,
      email: normalizedEmail,
      createdAt,
      consumedAt: null
    });

    state.magicLinks = state.magicLinks.slice(0, 20);

    return {
      email: normalizedEmail,
      href: `/auth/verify?token=${token}`,
      createdAt
    };
  });
}

export async function listPendingMagicLinks(): Promise<PendingMagicLink[]> {
  const now = Date.now();

  return state.magicLinks
    .filter((link) => !link.consumedAt && !isMagicLinkExpired(link, now))
    .slice(0, 5)
    .map((link) => ({
      email: link.email,
      href: `/auth/verify?token=${link.token}`,
      createdAt: link.createdAt
    }));
}

export async function consumeMagicLink(token: string): Promise<UserSession | null> {
  return withMutation((state) => {
    const now = Date.now();
    const link = state.magicLinks.find(
      (candidate) => candidate.token === token && !candidate.consumedAt && !isMagicLinkExpired(candidate, now)
    );

    if (!link) {
      return null;
    }

    link.consumedAt = new Date().toISOString();

    const session: UserSession = {
      email: link.email,
      token: createToken(),
      expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString()
    };

    state.sessions.unshift(session);
    state.sessions = state.sessions.slice(0, 20);

    return session;
  });
}

export async function findSession(token: string): Promise<UserSession | null> {
  pruneExpiredSessions(state);
  return state.sessions.find((session) => session.token === token) ?? null;
}

export async function revokeSession(token: string): Promise<void> {
  await withMutation((state) => {
    state.sessions = state.sessions.filter((session) => session.token !== token);
  });
}

export async function createCapture(email: string, sourceText: string): Promise<CaptureRecord> {
  return withMutation((state) => {
    const now = new Date().toISOString();
    const capture: CaptureRecord = {
      id: randomUUID(),
      email,
      sourceText,
      createdAt: now,
      updatedAt: now,
      status: "processing",
      transcript: null,
      generatedInsight: null,
      generatedFollowUps: [],
      review: null
    };

    state.captures.unshift(capture);
    return capture;
  });
}

export async function processPendingCaptures(now = Date.now(), email?: string): Promise<number> {
  return withMutation((state) => {
    let processedCount = 0;

    for (const capture of state.captures) {
      if (email && capture.email !== email) {
        continue;
      }

      if (capture.status !== "processing") {
        continue;
      }

      const createdAt = new Date(capture.createdAt).getTime();
      if (now - createdAt < PROCESSING_DELAY_MS) {
        continue;
      }

      try {
        const result = processCaptureSource(capture.sourceText);
        capture.transcript = result.transcript;
        capture.generatedInsight = result.generatedInsight;
        capture.generatedFollowUps = result.generatedFollowUps;
        capture.status = "needs_review";
      } catch {
        capture.status = "failed";
      }

      capture.updatedAt = new Date(now).toISOString();
      processedCount += 1;
    }

    return processedCount;
  });
}

export async function listCapturesForUser(email: string): Promise<CaptureRecord[]> {
  return sortCaptures(state.captures.filter((capture) => capture.email === email));
}

export async function saveReview(
  captureId: string,
  email: string,
  review: ReviewRecord
): Promise<CaptureRecord | null> {
  return withMutation((state) => {
    const capture = state.captures.find((candidate) => candidate.id === captureId && candidate.email === email);

    if (!capture) {
      return null;
    }

    capture.review = review;
    capture.status = "reviewed";
    capture.updatedAt = review.reviewedAt;
    return capture;
  });
}
