"use client";

import type {
  Coordinates,
  Emotion,
  MusicStyle,
  RecommendationPayload,
  WeatherContextPayload
} from "@/types";

function toQueryString(coordinates: Coordinates, emotion?: Emotion, musicStyle?: MusicStyle) {
  const query = new URLSearchParams({
    lat: String(coordinates.lat),
    lon: String(coordinates.lon)
  });
  if (emotion) {
    query.set("emotion", emotion);
  }
  if (musicStyle) {
    query.set("musicStyle", musicStyle);
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
  emotion?: Emotion,
  musicStyle?: MusicStyle
): Promise<WeatherContextPayload> {
  return fetchOk<WeatherContextPayload>(
    `/api/weather-context?${toQueryString(coordinates, emotion, musicStyle)}`
  );
}

export async function fetchRecommendations(
  coordinates: Coordinates,
  emotion?: Emotion,
  musicStyle?: MusicStyle
): Promise<RecommendationPayload> {
  return fetchOk<RecommendationPayload>(
    `/api/recommendations?${toQueryString(coordinates, emotion, musicStyle)}`
  );
}
