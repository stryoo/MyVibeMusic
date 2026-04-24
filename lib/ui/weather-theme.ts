import type { CSSProperties } from "react";

import type { Emotion, WeatherMood } from "@/types";

type Theme = {
  backgroundClassName: string;
  backgroundStyle: CSSProperties;
  weatherOverlayStyle: CSSProperties;
  glowStyle: CSSProperties;
  cardGlowStyle: CSSProperties;
  activeChipStyle: CSSProperties;
};

type EmotionBaseTheme = {
  className: string;
  hue: number;
  glowRgb: string;
};

const EMOTION_THEMES: Record<Emotion, EmotionBaseTheme> = {
  calm: {
    className:
      "bg-[radial-gradient(circle_at_14%_14%,rgba(94,234,212,0.24),transparent_30%),radial-gradient(circle_at_84%_10%,rgba(125,211,252,0.18),transparent_32%),linear-gradient(155deg,#082f49_0%,#0f766e_42%,#071826_100%)]",
    hue: 170,
    glowRgb: "94,234,212"
  },
  happy: {
    className:
      "bg-[radial-gradient(circle_at_14%_12%,rgba(253,224,71,0.26),transparent_28%),radial-gradient(circle_at_84%_14%,rgba(251,146,60,0.20),transparent_32%),linear-gradient(155deg,#3b1900_0%,#7c2d12_38%,#1a1020_100%)]",
    hue: 42,
    glowRgb: "251,191,36"
  },
  sad: {
    className:
      "bg-[radial-gradient(circle_at_12%_12%,rgba(96,165,250,0.22),transparent_28%),radial-gradient(circle_at_84%_16%,rgba(129,140,248,0.18),transparent_32%),linear-gradient(160deg,#111827_0%,#1d4ed8_40%,#0f172a_100%)]",
    hue: 220,
    glowRgb: "96,165,250"
  },
  focus: {
    className:
      "bg-[radial-gradient(circle_at_14%_12%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(45,212,191,0.18),transparent_32%),linear-gradient(160deg,#082f49_0%,#155e75_40%,#07131f_100%)]",
    hue: 192,
    glowRgb: "34,211,238"
  },
  romantic: {
    className:
      "bg-[radial-gradient(circle_at_14%_12%,rgba(244,114,182,0.24),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(251,113,133,0.18),transparent_32%),linear-gradient(160deg,#3f0d24_0%,#7f1d4e_40%,#190d1f_100%)]",
    hue: 336,
    glowRgb: "244,114,182"
  },
  energetic: {
    className:
      "bg-[radial-gradient(circle_at_12%_12%,rgba(251,146,60,0.26),transparent_28%),radial-gradient(circle_at_84%_16%,rgba(248,113,113,0.20),transparent_32%),linear-gradient(160deg,#431407_0%,#9a3412_40%,#1f172a_100%)]",
    hue: 18,
    glowRgb: "251,146,60"
  }
};

function hsla(hue: number, saturation: number, lightness: number, alpha: number) {
  return `hsla(${hue} ${saturation}% ${lightness}% / ${alpha})`;
}

function createWeatherOverlay(mood: WeatherMood | undefined): CSSProperties {
  switch (mood ?? "clear") {
    case "clear":
      return {
        backgroundImage: [
          "radial-gradient(circle at 10% 10%, rgba(255,255,255,0.12), transparent 26%)",
          "radial-gradient(circle at 88% 8%, rgba(255,215,120,0.16), transparent 28%)"
        ].join(",")
      };
    case "clouds":
      return {
        backgroundImage: [
          "radial-gradient(circle at 18% 12%, rgba(203,213,225,0.12), transparent 28%)",
          "radial-gradient(circle at 82% 18%, rgba(148,163,184,0.14), transparent 30%)"
        ].join(",")
      };
    case "rain":
      return {
        backgroundImage: [
          "linear-gradient(180deg, rgba(125,211,252,0.08) 0%, rgba(59,130,246,0.04) 100%)",
          "radial-gradient(circle at 85% 12%, rgba(56,189,248,0.14), transparent 28%)"
        ].join(",")
      };
    case "snow":
      return {
        backgroundImage: [
          "radial-gradient(circle at 16% 12%, rgba(255,255,255,0.16), transparent 26%)",
          "radial-gradient(circle at 84% 14%, rgba(191,219,254,0.14), transparent 30%)"
        ].join(",")
      };
    case "thunderstorm":
      return {
        backgroundImage: [
          "radial-gradient(circle at 18% 10%, rgba(167,139,250,0.16), transparent 28%)",
          "radial-gradient(circle at 84% 12%, rgba(99,102,241,0.18), transparent 28%)"
        ].join(",")
      };
    case "mist":
      return {
        backgroundImage: [
          "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          "radial-gradient(circle at 82% 18%, rgba(226,232,240,0.12), transparent 30%)"
        ].join(",")
      };
    default:
      return {};
  }
}

function getWeatherGlowRgb(mood: WeatherMood | undefined) {
  switch (mood ?? "clear") {
    case "clear":
      return "251,191,36";
    case "clouds":
      return "148,163,184";
    case "rain":
      return "56,189,248";
    case "snow":
      return "226,232,240";
    case "thunderstorm":
      return "129,140,248";
    case "mist":
      return "203,213,225";
    default:
      return "255,255,255";
  }
}

function createGlowStyle(hue: number, emotionGlowRgb: string, weatherGlowRgb: string, spread: string): CSSProperties {
  return {
    boxShadow: [
      `0 0 ${spread} rgba(${emotionGlowRgb},0.22)`,
      `0 0 calc(${spread} + 22px) rgba(${weatherGlowRgb},0.14)`,
      `0 0 calc(${spread} + 42px) ${hsla(hue, 88, 64, 0.12)}`
    ].join(", ")
  };
}

function createActiveChipStyle(hue: number): CSSProperties {
  return {
    backgroundImage: `linear-gradient(135deg, ${hsla(hue, 88, 66, 0.3)}, ${hsla((hue + 28) % 360, 84, 62, 0.18)})`,
    borderColor: hsla(hue, 78, 76, 0.4),
    color: "white"
  };
}

export function getWeatherTheme(mood?: WeatherMood, emotion: Emotion = "calm"): Theme {
  const emotionTheme = EMOTION_THEMES[emotion];
  const weatherGlowRgb = getWeatherGlowRgb(mood);

  return {
    backgroundClassName: emotionTheme.className,
    backgroundStyle: {
      backgroundImage: [
        `radial-gradient(circle at 50% 80%, ${hsla((emotionTheme.hue + 340) % 360, 80, 54, 0.12)}, transparent 34%)`
      ].join(",")
    },
    weatherOverlayStyle: createWeatherOverlay(mood),
    glowStyle: createGlowStyle(emotionTheme.hue, emotionTheme.glowRgb, weatherGlowRgb, "122px"),
    cardGlowStyle: createGlowStyle(emotionTheme.hue, emotionTheme.glowRgb, weatherGlowRgb, "78px"),
    activeChipStyle: createActiveChipStyle(emotionTheme.hue)
  };
}
