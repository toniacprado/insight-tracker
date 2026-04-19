"use server";

import { revalidatePath } from "next/cache";

import { getCurrentSession, requestMagicLink, signOutCurrentSession } from "@/lib/server/auth";
import { createCapture, saveReview } from "@/lib/server/store";

function requireEmail(value: FormDataEntryValue | null): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error("Expected a non-empty email value.");
  }

  return value.trim();
}

function requireText(value: FormDataEntryValue | null): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error("Expected a non-empty text value.");
  }

  return value.trim();
}

function parseFollowUps(value: string): string[] {
  return value
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export async function requestMagicLinkAction(formData: FormData): Promise<void> {
  const email = requireEmail(formData.get("email"));
  await requestMagicLink(email);
  revalidatePath("/");
}

export async function signOutAction(): Promise<void> {
  await signOutCurrentSession();
  revalidatePath("/");
}

export async function createCaptureAction(formData: FormData): Promise<void> {
  const session = await getCurrentSession();

  if (!session) {
    throw new Error("You must be signed in to create captures.");
  }

  const sourceText = requireText(formData.get("sourceText"));
  await createCapture(session.email, sourceText);
  revalidatePath("/");
}

export async function saveReviewAction(formData: FormData): Promise<void> {
  const session = await getCurrentSession();

  if (!session) {
    throw new Error("You must be signed in to review captures.");
  }

  const captureId = requireText(formData.get("captureId"));
  const insight = requireText(formData.get("insight"));
  const rawFollowUps = formData.get("followUps");
  const followUps = parseFollowUps(typeof rawFollowUps === "string" ? rawFollowUps : "");

  await saveReview(captureId, session.email, {
    insight,
    followUps,
    reviewedAt: new Date().toISOString()
  });

  revalidatePath("/");
}
