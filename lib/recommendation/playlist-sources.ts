import type { Emotion, MusicStyle, TimeBand, WeatherMood } from "@/types";

type PlaylistSource = {
  id: string;
  label: string;
  styles: MusicStyle[];
  emotions?: Emotion[];
  weatherMoods?: WeatherMood[];
  timeBands?: TimeBand[];
};

function parsePlaylistIds(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function makeSources(
  ids: string[],
  label: string,
  styles: MusicStyle[],
  options?: {
    emotions?: Emotion[];
    weatherMoods?: WeatherMood[];
    timeBands?: TimeBand[];
  }
) {
  return ids.map<PlaylistSource>((id, index) => ({
    id,
    label: ids.length > 1 ? `${label} ${index + 1}` : label,
    styles,
    emotions: options?.emotions,
    weatherMoods: options?.weatherMoods,
    timeBands: options?.timeBands
  }));
}

const PLAYLIST_SOURCE_TABLE: PlaylistSource[] = [
  ...makeSources(parsePlaylistIds(process.env.YOUTUBE_PLAYLIST_ID_KPOP_MAIN), "K-pop Main", ["kpop"]),
  ...makeSources(parsePlaylistIds(process.env.YOUTUBE_PLAYLIST_ID_KPOP_CALM), "K-pop Calm", ["kpop"], {
    emotions: ["calm", "sad", "romantic"],
    weatherMoods: ["clouds", "rain", "mist", "snow"],
    timeBands: ["afternoon", "evening", "night", "lateNight"]
  }),
  ...makeSources(parsePlaylistIds(process.env.YOUTUBE_PLAYLIST_ID_POP_MAIN), "Pop Main", ["pop"], {
    emotions: ["happy", "energetic", "romantic"],
    weatherMoods: ["clear", "clouds"],
    timeBands: ["afternoon", "evening", "night"]
  }),
  ...makeSources(parsePlaylistIds(process.env.YOUTUBE_PLAYLIST_ID_BALLAD_MAIN), "Ballad Main", ["ballad"], {
    emotions: ["calm", "sad", "romantic"],
    weatherMoods: ["rain", "clouds", "snow", "mist"],
    timeBands: ["evening", "night", "lateNight"]
  }),
  ...makeSources(parsePlaylistIds(process.env.YOUTUBE_PLAYLIST_ID_INDIE_MAIN), "Indie Main", ["indie"], {
    emotions: ["calm", "focus", "romantic", "sad"],
    weatherMoods: ["clouds", "rain", "mist", "clear"],
    timeBands: ["morning", "afternoon", "evening", "night"]
  }),
  ...makeSources(parsePlaylistIds(process.env.YOUTUBE_PLAYLIST_ID_HIPHOP_MAIN), "Hip-hop Main", ["hiphop"], {
    emotions: ["focus", "energetic", "happy"],
    weatherMoods: ["clear", "clouds", "thunderstorm"],
    timeBands: ["midday", "afternoon", "evening"]
  })
];

function scoreSource(
  source: PlaylistSource,
  style: MusicStyle,
  emotion: Emotion,
  weatherMood: WeatherMood,
  timeBand: TimeBand
) {
  let score = 0;

  if (source.styles.includes(style)) {
    score += 5;
  }
  if (source.emotions?.includes(emotion)) {
    score += 3;
  }
  if (source.weatherMoods?.includes(weatherMood)) {
    score += 2;
  }
  if (source.timeBands?.includes(timeBand)) {
    score += 2;
  }

  return score;
}

export function getPlaylistSources(
  style: MusicStyle = "kpop",
  emotion: Emotion = "calm",
  weatherMood: WeatherMood,
  timeBand: TimeBand
) {
  return PLAYLIST_SOURCE_TABLE
    .map((source) => ({
      source,
      score: scoreSource(source, style, emotion, weatherMood, timeBand)
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .map((entry) => entry.source);
}
