import { serverEnv } from "@/lib/config/env";
import { fetchJson } from "@/lib/utils/fetcher";
import type { Coordinates, WeatherMood, WeatherSnapshot } from "@/types";

type OpenWeatherResponse = {
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  dt: number;
  timezone: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
  name: string;
};

const WEATHER_MOOD_MAP: Record<string, WeatherMood> = {
  Clear: "clear",
  Clouds: "clouds",
  Rain: "rain",
  Drizzle: "rain",
  Snow: "snow",
  Thunderstorm: "thunderstorm",
  Mist: "mist",
  Smoke: "mist",
  Haze: "mist",
  Dust: "mist",
  Fog: "mist",
  Sand: "mist",
  Ash: "mist",
  Squall: "mist",
  Tornado: "mist"
};

function toWeatherMood(main: string): WeatherMood {
  return WEATHER_MOOD_MAP[main] ?? "clear";
}

function toKoreanWeatherLabel(mood: WeatherMood) {
  switch (mood) {
    case "clear":
      return "맑음";
    case "clouds":
      return "흐림";
    case "rain":
      return "비";
    case "snow":
      return "눈";
    case "thunderstorm":
      return "천둥";
    case "mist":
      return "안개";
    default:
      return "보통";
  }
}

export async function getWeatherSnapshot(coordinates: Coordinates): Promise<WeatherSnapshot> {
  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.set("lat", coordinates.lat.toString());
  url.searchParams.set("lon", coordinates.lon.toString());
  url.searchParams.set("appid", serverEnv.openWeatherApiKey);
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "kr");

  const data = await fetchJson<OpenWeatherResponse>(url, {
    next: { revalidate: 900 }
  });

  const weather = data.weather[0];
  const mood = toWeatherMood(weather?.main ?? "Clear");
  const isDaytime = data.dt >= data.sys.sunrise && data.dt <= data.sys.sunset;
  const timeLabel = isDaytime ? "오후" : "밤";
  const weatherLabel = toKoreanWeatherLabel(mood);
  const cityName = data.name ? `${data.name}의` : "";

  return {
    mood,
    weatherLabel,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    isDaytime,
    summary: `${cityName} ${weatherLabel} ${timeLabel}`.trim(),
    observedAt: data.dt,
    timezoneOffsetSeconds: data.timezone
  };
}
