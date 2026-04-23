export type WeatherMood =
  | "clear"
  | "clouds"
  | "rain"
  | "snow"
  | "thunderstorm"
  | "mist";

export type Coordinates = {
  lat: number;
  lon: number;
};

export type WeatherSnapshot = {
  mood: WeatherMood;
  weatherLabel: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  isDaytime: boolean;
  summary: string;
  observedAt: number;
  timezoneOffsetSeconds: number;
};

export type TimeBand = "lateNight" | "morning" | "midday" | "afternoon" | "evening" | "night";

export type Emotion =
  | "calm"
  | "happy"
  | "sad"
  | "focus"
  | "romantic"
  | "energetic";

export type MusicStyle = "kpop" | "pop" | "ballad" | "indie" | "hiphop";

export type VibeContext = {
  timeBand: TimeBand;
  timeLabel: string;
  timeKeyword: string;
  weatherKeyword: string;
  emotion: Emotion;
  emotionLabel: string;
  emotionKeyword: string;
  tags: string[];
};

export type LocationSnapshot = {
  city: string;
  district: string;
  neighborhood: string;
  fullLabel: string;
  stationLikeLabel: string;
};

export type RecommendationItem = {
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  description: string;
  watchUrl?: string;
};

export type RecommendationPayload = {
  coordinates: Coordinates;
  location: LocationSnapshot;
  weather: WeatherSnapshot;
  vibe?: VibeContext;
  query: string;
  recommendations: RecommendationItem[];
  selectedVideo: RecommendationItem | null;
  fallbackUsed: boolean;
  fallbackReason?: string;
  fallbackDetail?: string;
  fetchedAt: string;
};

export type WeatherContextPayload = {
  coordinates: Coordinates;
  location: LocationSnapshot;
  weather: WeatherSnapshot;
  context: string;
  query: string;
  fallbackUsed: boolean;
  vibe?: VibeContext;
};
