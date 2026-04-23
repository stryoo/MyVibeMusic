import type { MusicStyle } from "@/types";

export const MUSIC_STYLES: Array<{ id: MusicStyle; label: string }> = [
  { id: "kpop", label: "K-pop" },
  { id: "pop", label: "Pop Song" },
  { id: "ballad", label: "Ballad" },
  { id: "indie", label: "Indie" },
  { id: "hiphop", label: "Hip-hop" }
];

export function parseMusicStyle(value: string | null | undefined): MusicStyle | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();
  const match = MUSIC_STYLES.find((item) => item.id === normalized);
  return match?.id;
}

export function getMusicStyleQuery(style?: MusicStyle) {
  switch (style) {
    case "kpop":
      return "K-pop 플레이리스트";
    case "pop":
      return "Pop Song playlist";
    case "ballad":
      return "Korean ballad playlist";
    case "indie":
      return "K-indie playlist";
    case "hiphop":
      return "K-hiphop playlist";
    default:
      return "mood playlist";
  }
}
