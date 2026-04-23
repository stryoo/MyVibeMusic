import { getMissingServerEnvKeys, hasRequiredServerEnv } from "@/lib/config/env";
import { getLocationSnapshot } from "@/lib/api/kakao-local";
import { getWeatherSnapshot } from "@/lib/api/openweather";
import {
  createFallbackLocationSnapshot,
  createFallbackWeatherSnapshot
} from "@/lib/recommendation/fallback-snapshots";
import { parseEmotion } from "@/lib/recommendation/emotion";
import { buildVibeContext } from "@/lib/recommendation/vibe-map";
import { buildContextLabel, buildYoutubeSearchQuery } from "@/lib/recommendation/query-builder";
import type { Coordinates } from "@/types";
import { NextResponse } from "next/server";

function parseCoordinates(searchParams: URLSearchParams): Coordinates | null {
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return null;
  }

  return { lat, lon };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coordinates = parseCoordinates(searchParams);
  const emotion = parseEmotion(searchParams.get("emotion"));

  if (!coordinates) {
    return NextResponse.json(
      {
        message: "lat, lon query parameter is required."
      },
      { status: 400 }
    );
  }

  if (!hasRequiredServerEnv()) {
    const weather = createFallbackWeatherSnapshot();
    const location = createFallbackLocationSnapshot();
    const missingKeys = getMissingServerEnvKeys();

    return NextResponse.json(
      {
        message: "Required API keys are missing. Fallback context is returned.",
        missingKeys,
        coordinates,
        location,
        weather,
        context: buildContextLabel(location, weather, emotion),
        query: buildYoutubeSearchQuery(location, weather, emotion),
        fallbackUsed: true,
        vibe: buildVibeContext(weather, new Date(), emotion)
      },
      { status: 200 }
    );
  }

  const [weatherResult, locationResult] = await Promise.allSettled([
    getWeatherSnapshot(coordinates),
    getLocationSnapshot(coordinates)
  ]);

  const weather =
    weatherResult.status === "fulfilled"
      ? weatherResult.value
      : createFallbackWeatherSnapshot();
  const location =
    locationResult.status === "fulfilled"
      ? locationResult.value
      : createFallbackLocationSnapshot();

  return NextResponse.json({
    coordinates,
    location,
    weather,
    context: buildContextLabel(location, weather, emotion),
    query: buildYoutubeSearchQuery(location, weather, emotion),
    fallbackUsed: weatherResult.status === "rejected" || locationResult.status === "rejected",
    vibe: buildVibeContext(weather, new Date(), emotion)
  });
}
