type PublicEnv = {
  appName: string;
  kakaoJavascriptKey: string;
  youtubePlayerHost: string;
};

type ServerEnv = {
  openWeatherApiKey: string;
  kakaoRestApiKey: string;
  youtubeDataApiKey: string;
};

function readRequiredEnv(name: string) {
  return process.env[name] ?? "";
}

export const publicEnv: PublicEnv = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "My Vibe Music",
  kakaoJavascriptKey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY ?? "",
  youtubePlayerHost: process.env.NEXT_PUBLIC_YOUTUBE_PLAYER_HOST ?? "https://www.youtube.com"
};

export const serverEnv: ServerEnv = {
  openWeatherApiKey: readRequiredEnv("OPENWEATHER_API_KEY"),
  kakaoRestApiKey: readRequiredEnv("KAKAO_REST_API_KEY"),
  youtubeDataApiKey: readRequiredEnv("YOUTUBE_DATA_API_KEY")
};

export function hasRequiredServerEnv() {
  return Object.values(serverEnv).every(Boolean);
}

export function getMissingServerEnvKeys() {
  const required: Record<string, string> = {
    OPENWEATHER_API_KEY: serverEnv.openWeatherApiKey,
    KAKAO_REST_API_KEY: serverEnv.kakaoRestApiKey,
    YOUTUBE_DATA_API_KEY: serverEnv.youtubeDataApiKey
  };

  return Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key);
}
