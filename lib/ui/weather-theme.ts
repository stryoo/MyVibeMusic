import type { Emotion, WeatherMood } from "@/types";

type Theme = {
  background: string;
  accent: string;
  glow: string;
  chip: string;
};

const WEATHER_THEMES: Record<WeatherMood, Theme> = {
  clear: {
    background:
      "bg-[radial-gradient(circle_at_10%_10%,rgba(125,211,252,0.30),transparent_36%),radial-gradient(circle_at_90%_0%,rgba(251,191,36,0.24),transparent_38%),linear-gradient(155deg,#102a43_0%,#1d4e89_42%,#0b1f38_100%)]",
    accent: "from-sky-300/25 to-amber-300/25",
    glow: "shadow-[0_0_110px_rgba(125,211,252,0.40)]",
    chip: "border-sky-200/30 bg-sky-300/10"
  },
  clouds: {
    background:
      "bg-[radial-gradient(circle_at_15%_0%,rgba(148,163,184,0.28),transparent_34%),radial-gradient(circle_at_80%_15%,rgba(226,232,240,0.12),transparent_42%),linear-gradient(165deg,#1f2937_0%,#334155_46%,#0f172a_100%)]",
    accent: "from-slate-300/18 to-blue-200/18",
    glow: "shadow-[0_0_100px_rgba(148,163,184,0.30)]",
    chip: "border-slate-200/30 bg-slate-300/10"
  },
  rain: {
    background:
      "bg-[radial-gradient(circle_at_0%_10%,rgba(56,189,248,0.22),transparent_32%),radial-gradient(circle_at_90%_5%,rgba(59,130,246,0.20),transparent_34%),linear-gradient(160deg,#0b132b_0%,#1e3a8a_45%,#0f172a_100%)]",
    accent: "from-cyan-300/20 to-blue-300/20",
    glow: "shadow-[0_0_115px_rgba(56,189,248,0.35)]",
    chip: "border-cyan-200/28 bg-cyan-300/10"
  },
  snow: {
    background:
      "bg-[radial-gradient(circle_at_12%_12%,rgba(255,255,255,0.26),transparent_30%),radial-gradient(circle_at_84%_8%,rgba(191,219,254,0.22),transparent_36%),linear-gradient(160deg,#1e293b_0%,#475569_44%,#0f172a_100%)]",
    accent: "from-blue-100/20 to-slate-100/15",
    glow: "shadow-[0_0_110px_rgba(226,232,240,0.34)]",
    chip: "border-blue-100/28 bg-blue-100/10"
  },
  thunderstorm: {
    background:
      "bg-[radial-gradient(circle_at_8%_0%,rgba(167,139,250,0.34),transparent_34%),radial-gradient(circle_at_92%_5%,rgba(99,102,241,0.25),transparent_36%),linear-gradient(165deg,#111827_0%,#312e81_45%,#0f172a_100%)]",
    accent: "from-violet-300/24 to-indigo-300/24",
    glow: "shadow-[0_0_120px_rgba(129,140,248,0.36)]",
    chip: "border-violet-200/30 bg-violet-300/12"
  },
  mist: {
    background:
      "bg-[radial-gradient(circle_at_8%_10%,rgba(209,213,219,0.26),transparent_34%),radial-gradient(circle_at_88%_10%,rgba(203,213,225,0.22),transparent_38%),linear-gradient(155deg,#111827_0%,#1f2937_42%,#0b1120_100%)]",
    accent: "from-zinc-200/20 to-slate-200/18",
    glow: "shadow-[0_0_105px_rgba(203,213,225,0.30)]",
    chip: "border-zinc-200/30 bg-zinc-300/10"
  }
};

const EMOTION_OVERLAYS: Record<Emotion, Pick<Theme, "background" | "accent" | "glow" | "chip">> = {
  calm: {
    background:
      "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_18%_18%,rgba(167,243,208,0.12),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(125,211,252,0.10),transparent_30%)] before:content-['']",
    accent: "from-emerald-200/18 to-sky-200/18",
    glow: "shadow-[0_0_130px_rgba(110,231,183,0.18)]",
    chip: "border-emerald-200/30 bg-emerald-200/10"
  },
  happy: {
    background:
      "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_12%,rgba(253,224,71,0.18),transparent_30%),radial-gradient(circle_at_78%_16%,rgba(251,146,60,0.14),transparent_28%)] before:content-['']",
    accent: "from-yellow-200/22 to-orange-200/22",
    glow: "shadow-[0_0_140px_rgba(251,191,36,0.24)]",
    chip: "border-yellow-200/35 bg-yellow-200/12"
  },
  sad: {
    background:
      "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_12%_16%,rgba(96,165,250,0.12),transparent_28%),radial-gradient(circle_at_86%_20%,rgba(196,181,253,0.12),transparent_30%)] before:content-['']",
    accent: "from-blue-200/20 to-violet-200/18",
    glow: "shadow-[0_0_140px_rgba(147,197,253,0.18)]",
    chip: "border-blue-200/30 bg-blue-200/10"
  },
  focus: {
    background:
      "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_18%_14%,rgba(45,212,191,0.12),transparent_28%),radial-gradient(circle_at_84%_16%,rgba(59,130,246,0.12),transparent_32%)] before:content-['']",
    accent: "from-teal-200/18 to-cyan-200/18",
    glow: "shadow-[0_0_140px_rgba(45,212,191,0.18)]",
    chip: "border-teal-200/30 bg-teal-200/10"
  },
  romantic: {
    background:
      "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_18%_12%,rgba(244,114,182,0.16),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(251,113,133,0.12),transparent_30%)] before:content-['']",
    accent: "from-pink-200/22 to-rose-200/18",
    glow: "shadow-[0_0_145px_rgba(244,114,182,0.22)]",
    chip: "border-pink-200/35 bg-pink-200/12"
  },
  energetic: {
    background:
      "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_16%_14%,rgba(251,146,60,0.18),transparent_26%),radial-gradient(circle_at_84%_14%,rgba(248,113,113,0.16),transparent_28%)] before:content-['']",
    accent: "from-orange-200/24 to-red-200/20",
    glow: "shadow-[0_0_150px_rgba(251,146,60,0.24)]",
    chip: "border-orange-200/35 bg-orange-200/12"
  }
};

export function getWeatherTheme(mood?: WeatherMood, emotion: Emotion = "calm") {
  const weatherTheme = WEATHER_THEMES[mood ?? "clear"];
  const emotionOverlay = EMOTION_OVERLAYS[emotion];

  return {
    background: `${weatherTheme.background} ${emotionOverlay.background}`,
    accent: emotionOverlay.accent || weatherTheme.accent,
    glow: `${weatherTheme.glow} ${emotionOverlay.glow}`,
    chip: emotionOverlay.chip || weatherTheme.chip
  };
}
