export type ProcessingStatus = "processing" | "needs_review" | "reviewed" | "failed";

export type ReviewRecord = {
  insight: string;
  followUps: string[];
  reviewedAt: string;
};

export type CaptureRecord = {
  id: string;
  email: string;
  sourceText: string;
  createdAt: string;
  updatedAt: string;
  status: ProcessingStatus;
  transcript: string | null;
  generatedInsight: string | null;
  generatedFollowUps: string[];
  review: ReviewRecord | null;
};

export type PendingMagicLink = {
  email: string;
  href: string;
  createdAt: string;
};

export type UserSession = {
  email: string;
  token: string;
  expiresAt: string;
};
