import { cookies } from "next/headers";

import type { UserSession } from "@/lib/types";
import { createMagicLink, findSession, revokeSession } from "@/lib/server/store";

export const SESSION_COOKIE_NAME = "insight_tracker_session";

export async function requestMagicLink(email: string) {
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
