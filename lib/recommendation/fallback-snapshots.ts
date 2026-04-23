import type { LocationSnapshot, WeatherSnapshot } from "@/types";

export function createFallbackLocationSnapshot(): LocationSnapshot {
  return {
    city: "대한민국",
    district: "현재 위치 근처",
    neighborhood: "현재 위치",
    fullLabel: "대한민국 현재 위치 근처",
    stationLikeLabel: "현재 위치"
  };
}

export function createFallbackWeatherSnapshot(): WeatherSnapshot {
  const now = new Date();
  const hour = now.getHours();
  const isDaytime = hour >= 6 && hour < 19;

  return {
    mood: "clear",
    weatherLabel: "보통",
    temperature: 22,
    feelsLike: 22,
    humidity: 50,
    windSpeed: 1,
    isDaytime,
    summary: isDaytime ? "보통 오후" : "보통 밤",
    observedAt: Math.floor(now.getTime() / 1000),
    timezoneOffsetSeconds: 9 * 60 * 60
  };
}
