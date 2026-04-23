import { RECOMMENDATION_LIMIT } from "@/lib/constants/app";
import { getFallbackRecommendations } from "@/lib/constants/fallback";
import { getLocationSnapshot } from "@/lib/api/kakao-local";
import { getWeatherSnapshot } from "@/lib/api/openweather";
import {
  createFallbackLocationSnapshot,
  createFallbackWeatherSnapshot
} from "@/lib/recommendation/fallback-snapshots";
import { searchYoutubeMusic } from "@/lib/api/youtube";
import { buildYoutubeSearchQuery } from "@/lib/recommendation/query-builder";
import { buildVibeContext } from "@/lib/recommendation/vibe-map";
import type { Coordinates, Emotion, MusicStyle, RecommendationPayload } from "@/types";

export async function getMusicRecommendations(
  coordinates: Coordinates,
  emotion?: Emotion,
  musicStyle?: MusicStyle
): Promise<RecommendationPayload> {
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

  const vibe = buildVibeContext(weather, new Date(), emotion);
  const query = buildYoutubeSearchQuery(location, weather, emotion, musicStyle);
  const fallbackList = getFallbackRecommendations(emotion, musicStyle);

  try {
    const recommendations = await searchYoutubeMusic(query, musicStyle);
    const normalized = recommendations.slice(0, RECOMMENDATION_LIMIT);
    const list = normalized.length > 0 ? normalized : fallbackList;

    return {
      coordinates,
      location,
      weather,
      vibe,
      query,
      recommendations: list,
      selectedVideo: list[0] ?? null,
      fallbackUsed: normalized.length === 0,
      fetchedAt: new Date().toISOString()
    };
  } catch {
    return {
      coordinates,
      location,
      weather,
      vibe,
      query,
      recommendations: fallbackList,
      selectedVideo: fallbackList[0] ?? null,
      fallbackUsed: true,
      fetchedAt: new Date().toISOString()
    };
  }
}
