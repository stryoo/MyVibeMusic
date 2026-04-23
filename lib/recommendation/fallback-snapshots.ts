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
  const hour = new Date().getHours();
  const isDaytime = hour >= 6 && hour < 19;

  return {
    mood: "clear",
    weatherLabel: "잔잔한",
    temperature: 22,
    feelsLike: 22,
    humidity: 50,
    windSpeed: 1,
    isDaytime,
    summary: isDaytime ? "잔잔한 오후" : "잔잔한 밤"
  };
}
