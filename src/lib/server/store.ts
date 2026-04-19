import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
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
const PROCESSING_DELAY_MS = 1200;
const DEFAULT_STATE_PATH = join(
  /* turbopackIgnore: true */ process.cwd(),
  "runtime",
  "dev-state",
  "insight-tracker.json"
);

const initialState: StoredState = {
  magicLinks: [],
  sessions: [],
  captures: []
};

let mutationQueue = Promise.resolve();
let statePathOverride: string | null = null;

function getStatePath(): string {
  return statePathOverride ?? DEFAULT_STATE_PATH;
}

export function setStateFileForTesting(path: string | null): void {
  statePathOverride = path;
}

async function ensureStateFile(): Promise<string> {
  const path = getStatePath();
  await mkdir(dirname(path), { recursive: true });

  try {
    await readFile(path, "utf-8");
  } catch {
    await writeFile(path, JSON.stringify(initialState, null, 2), "utf-8");
  }

  return path;
}

async function readState(): Promise<StoredState> {
  const path = await ensureStateFile();
  const parsed = JSON.parse(await readFile(path, "utf-8")) as StoredState;
  return {
    magicLinks: parsed.magicLinks ?? [],
    sessions: parsed.sessions ?? [],
    captures: parsed.captures ?? []
  };
}

async function writeState(state: StoredState): Promise<void> {
  const path = await ensureStateFile();
  await writeFile(path, JSON.stringify(state, null, 2), "utf-8");
}

async function withMutation<T>(mutate: (state: StoredState) => T | Promise<T>): Promise<T> {
  const run = mutationQueue.then(async () => {
    const state = await readState();
    pruneExpiredSessions(state);
    const result = await mutate(state);
    await writeState(state);
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
  const state = await readState();

  return state.magicLinks
    .filter((link) => !link.consumedAt)
    .slice(0, 5)
    .map((link) => ({
      email: link.email,
      href: `/auth/verify?token=${link.token}`,
      createdAt: link.createdAt
    }));
}

export async function consumeMagicLink(token: string): Promise<UserSession | null> {
  return withMutation((state) => {
    const link = state.magicLinks.find((candidate) => candidate.token === token && !candidate.consumedAt);

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
  const state = await readState();
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

export async function processPendingCaptures(now = Date.now()): Promise<number> {
  return withMutation((state) => {
    let processedCount = 0;

    for (const capture of state.captures) {
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

      capture.updatedAt = new Date().toISOString();
      processedCount += 1;
    }

    return processedCount;
  });
}

export async function listCapturesForUser(email: string): Promise<CaptureRecord[]> {
  const state = await readState();
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
