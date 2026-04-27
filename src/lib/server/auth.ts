import { cookies } from "next/headers";

import type { UserSession } from "@/lib/types";
import { createMagicLink, findSession, revokeSession } from "@/lib/server/store";

export const SESSION_COOKIE_NAME = "insight_tracker_session";

export function isDevelopmentAuthEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.NODE_ENV !== "production" || env.ALLOW_DEVELOPMENT_AUTH_PREVIEW === "true";
}

export async function requestMagicLink(email: string) {
  if (!isDevelopmentAuthEnabled()) {
    throw new Error("Development magic-link preview is disabled in this environment.");
  }

  return createMagicLink(email);
}

export async function getCurrentSession(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return findSession(token);
}

export async function signOutCurrentSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return;
  }

  await revokeSession(token);
  cookieStore.delete(SESSION_COOKIE_NAME);
}
