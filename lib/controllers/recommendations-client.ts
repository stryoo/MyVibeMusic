"use client";

import type { Coordinates, Emotion, RecommendationPayload, WeatherContextPayload } from "@/types";

function toQueryString(coordinates: Coordinates, emotion?: Emotion) {
  const query = new URLSearchParams({
    lat: String(coordinates.lat),
    lon: String(coordinates.lon)
  });
  if (emotion) {
    query.set("emotion", emotion);
  }
  return query.toString();
}

async function fetchOk<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Request failed: ${response.status} ${response.statusText} - ${body}`);
  }
  return (await response.json()) as T;
}

export async function fetchWeatherContext(
  coordinates: Coordinates,
  emotion?: Emotion
): Promise<WeatherContextPayload> {
  return fetchOk<WeatherContextPayload>(`/api/weather-context?${toQueryString(coordinates, emotion)}`);
}

export async function fetchRecommendations(
  coordinates: Coordinates,
  emotion?: Emotion
): Promise<RecommendationPayload> {
  return fetchOk<RecommendationPayload>(`/api/recommendations?${toQueryString(coordinates, emotion)}`);
}
