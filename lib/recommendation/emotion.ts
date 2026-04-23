import type { Emotion } from "@/types";

export const EMOTIONS: Array<{ id: Emotion; label: string }> = [
  { id: "calm", label: "편안" },
  { id: "happy", label: "기분좋음" },
  { id: "sad", label: "센치" },
  { id: "focus", label: "집중" },
  { id: "romantic", label: "로맨틱" },
  { id: "energetic", label: "에너지" }
];

export function parseEmotion(value: string | null | undefined): Emotion | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim();
  const match = EMOTIONS.find((item) => item.id === normalized);
  return match?.id;
}

