import type { CaptureRecord } from "@/lib/types";

export type ProcessingResult = Pick<
  CaptureRecord,
  "transcript" | "generatedInsight" | "generatedFollowUps"
>;

const MAX_INSIGHT_LENGTH = 150;

export function normalizeSourceText(sourceText: string): string {
  return sourceText.replace(/\s+/g, " ").trim();
}

function pickAnchorSentence(transcript: string): string {
  const sentences = transcript.split(/(?<=[.!?])\s+/).filter(Boolean);
  return sentences[0] ?? transcript;
}

function clampSentence(sentence: string): string {
  if (sentence.length <= MAX_INSIGHT_LENGTH) {
    return sentence;
  }

  return `${sentence.slice(0, MAX_INSIGHT_LENGTH - 1).trimEnd()}...`;
}

function deriveFollowUps(transcript: string, insight: string): string[] {
  const lower = transcript.toLowerCase();
  const anchor = insight.replace(/[.!?]+$/, "");
  const candidates = [
    `Send a short follow-up that references "${anchor}".`,
    lower.includes("intro") || lower.includes("introduc")
      ? "Capture who should make the introduction and what context they need."
      : "Write down the concrete next step while the context is still fresh.",
    lower.includes("share") || lower.includes("send") || lower.includes("deck")
      ? "Collect the promised material and note when it should be sent."
      : "Decide whether this stays a standalone insight or needs a later grouping."
  ];

  return Array.from(new Set(candidates)).slice(0, 3);
}

export function processCaptureSource(sourceText: string): ProcessingResult {
  const transcript = normalizeSourceText(sourceText);
  const anchorSentence = pickAnchorSentence(transcript);
  const generatedInsight = clampSentence(anchorSentence);
  const generatedFollowUps = deriveFollowUps(transcript, generatedInsight);

  return {
    transcript,
    generatedInsight,
    generatedFollowUps
  };
}
