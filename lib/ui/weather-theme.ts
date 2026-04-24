import type { CSSProperties } from "react";

import type { Emotion, WeatherMood } from "@/types";

type Theme = {
  backgroundClassName: string;
  backgroundStyle: CSSProperties;
  glowStyle: CSSProperties;
  cardGlowStyle: CSSProperties;
  activeChipStyle: CSSProperties;
};

type WeatherThemeBase = {
  className: string;
  glowRgb: string;
};

const WEATHER_THEMES: Record<WeatherMood, WeatherThemeBase> = {
  clear: {
    className:
      "bg-[radial-gradient(circle_at_10%_10%,rgba(125,211,252,0.30),transparent_36%),radial-gradient(circle_at_90%_0%,rgba(251,191,36,0.24),transparent_38%),linear-gradient(155deg,#102a43_0%,#1d4e89_42%,#0b1f38_100%)]",
    glowRgb: "125,211,252"
  },
  clouds: {
    className:
      "bg-[radial-gradient(circle_at_15%_0%,rgba(148,163,184,0.28),transparent_34%),radial-gradient(circle_at_80%_15%,rgba(226,232,240,0.12),transparent_42%),linear-gradient(165deg,#1f2937_0%,#334155_46%,#0f172a_100%)]",
    glowRgb: "148,163,184"
  },
  rain: {
    className:
      "bg-[radial-gradient(circle_at_0%_10%,rgba(56,189,248,0.22),transparent_32%),radial-gradient(circle_at_90%_5%,rgba(59,130,246,0.20),transparent_34%),linear-gradient(160deg,#0b132b_0%,#1e3a8a_45%,#0f172a_100%)]",
    glowRgb: "56,189,248"
  },
  snow: {
    className:
      "bg-[radial-gradient(circle_at_12%_12%,rgba(255,255,255,0.26),transparent_30%),radial-gradient(circle_at_84%_8%,rgba(191,219,254,0.22),transparent_36%),linear-gradient(160deg,#1e293b_0%,#475569_44%,#0f172a_100%)]",
    glowRgb: "226,232,240"
  },
  thunderstorm: {
    className:
      "bg-[radial-gradient(circle_at_8%_0%,rgba(167,139,250,0.34),transparent_34%),radial-gradient(circle_at_92%_5%,rgba(99,102,241,0.25),transparent_36%),linear-gradient(165deg,#111827_0%,#312e81_45%,#0f172a_100%)]",
    glowRgb: "129,140,248"
  },
  mist: {
    className:
      "bg-[radial-gradient(circle_at_8%_10%,rgba(209,213,219,0.26),transparent_34%),radial-gradient(circle_at_88%_10%,rgba(203,213,225,0.22),transparent_38%),linear-gradient(155deg,#111827_0%,#1f2937_42%,#0b1120_100%)]",
    glowRgb: "203,213,225"
  }
};

const EMOTION_HUES: Record<Emotion, number> = {
  calm: 170,
  happy: 42,
  sad: 220,
  focus: 192,
  romantic: 336,
  energetic: 18
};

function hsla(hue: number, saturation: number, lightness: number, alpha: number) {
  return `hsla(${hue} ${saturation}% ${lightness}% / ${alpha})`;
}

function createEmotionOverlay(hue: number): CSSProperties {
  return {
    backgroundImage: [
      `radial-gradient(circle at 18% 14%, ${hsla(hue, 88, 66, 0.2)}, transparent 28%)`,
      `radial-gradient(circle at 82% 16%, ${hsla((hue + 32) % 360, 84, 62, 0.16)}, transparent 30%)`,
      `radial-gradient(circle at 50% 85%, ${hsla((hue + 340) % 360, 80, 58, 0.12)}, transparent 32%)`
    ].join(",")
  };
}

function createGlowStyle(hue: number, weatherGlowRgb: string, spread: string): CSSProperties {
  return {
    boxShadow: [
      `0 0 ${spread} rgba(${weatherGlowRgb},0.28)`,
      `0 0 calc(${spread} + 28px) ${hsla(hue, 88, 64, 0.16)}`
    ].join(", ")
  };
}

function createActiveChipStyle(hue: number): CSSProperties {
  return {
    backgroundImage: `linear-gradient(135deg, ${hsla(hue, 90, 66, 0.32)}, ${hsla((hue + 26) % 360, 88, 62, 0.18)})`,
    borderColor: hsla(hue, 82, 78, 0.42),
    color: "white"
  };
}

export function getWeatherTheme(mood?: WeatherMood, emotion: Emotion = "calm"): Theme {
  const weatherTheme = WEATHER_THEMES[mood ?? "clear"];
  const emotionHue = EMOTION_HUES[emotion];

  return {
    backgroundClassName: weatherTheme.className,
    backgroundStyle: createEmotionOverlay(emotionHue),
    glowStyle: createGlowStyle(emotionHue, weatherTheme.glowRgb, "122px"),
    cardGlowStyle: createGlowStyle(emotionHue, weatherTheme.glowRgb, "78px"),
    activeChipStyle: createActiveChipStyle(emotionHue)
  };
}
