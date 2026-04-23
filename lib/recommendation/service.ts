import { RECOMMENDATION_LIMIT } from "@/lib/constants/app";
import { getFallbackRecommendations } from "@/lib/constants/fallback";
import { getLocationSnapshot } from "@/lib/api/kakao-local";
import { getWeatherSnapshot } from "@/lib/api/openweather";
import {
  createFallbackLocationSnapshot,
  createFallbackWeatherSnapshot
} from "@/lib/recommendation/fallback-snapshots";
import { searchYoutubeMusic } from "@/lib/api/youtube";
import { buildYoutubeSearchQueries } from "@/lib/recommendation/query-builder";
import { buildVibeContext, getWeatherLocalDate } from "@/lib/recommendation/vibe-map";
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

  const vibe = buildVibeContext(weather, getWeatherLocalDate(weather), emotion);
  const queryCandidates = buildYoutubeSearchQueries(location, weather, emotion, musicStyle);
  const query = queryCandidates[0] ?? "";
  const fallbackList = getFallbackRecommendations(emotion, musicStyle, query);

  try {
    let finalQuery = query;
    let normalized = [] as RecommendationPayload["recommendations"];

    for (const candidate of queryCandidates) {
      const recommendations = await searchYoutubeMusic(candidate, musicStyle);
      const sliced = recommendations.slice(0, RECOMMENDATION_LIMIT);
      if (sliced.length > 0) {
        finalQuery = candidate;
        normalized = sliced;
        break;
      }
    }

    const list = normalized.length > 0 ? normalized : fallbackList;

    return {
      coordinates,
      location,
      weather,
      vibe,
      query: finalQuery,
      recommendations: list,
      selectedVideo: list[0] ?? null,
      fallbackUsed: normalized.length === 0,
      fallbackReason: normalized.length === 0 ? "no_usable_youtube_results" : undefined,
      fetchedAt: new Date().toISOString()
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown_youtube_error";
    return {
      coordinates,
      location,
      weather,
      vibe,
      query,
      recommendations: fallbackList,
      selectedVideo: fallbackList[0] ?? null,
      fallbackUsed: true,
      fallbackReason: "youtube_api_error",
      fallbackDetail: message,
      fetchedAt: new Date().toISOString()
    };
  }
}
