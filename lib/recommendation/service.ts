import { RECOMMENDATION_LIMIT } from "@/lib/constants/app";
import { getFallbackRecommendations } from "@/lib/constants/fallback";
import { getLocationSnapshot } from "@/lib/api/kakao-local";
import { getWeatherSnapshot } from "@/lib/api/openweather";
import { getPlaylistRecommendations } from "@/lib/api/youtube-playlists";
import {
  getCachedRecommendations,
  saveCachedRecommendations
} from "@/lib/cache/youtube-query-cache";
import {
  createFallbackLocationSnapshot,
  createFallbackWeatherSnapshot
} from "@/lib/recommendation/fallback-snapshots";
import { getPlaylistSources } from "@/lib/recommendation/playlist-sources";
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
  const cachedRecommendations = await getCachedRecommendations(queryCandidates);

  if (cachedRecommendations) {
    const list = cachedRecommendations.recommendations.slice(0, RECOMMENDATION_LIMIT);

    return {
      coordinates,
      location,
      weather,
      vibe,
      query: cachedRecommendations.query,
      recommendations: list,
      selectedVideo: list[0] ?? null,
      fallbackUsed: false,
      cacheUsed: true,
      cacheKey: cachedRecommendations.key,
      cachedAt: cachedRecommendations.updatedAt,
      fetchedAt: new Date().toISOString()
    };
  }

  try {
    const playlistSources = getPlaylistSources(
      musicStyle ?? "kpop",
      vibe.emotion,
      weather.mood,
      vibe.timeBand
    );

    if (playlistSources.length === 0) {
      return {
        coordinates,
        location,
        weather,
        vibe,
        query,
        recommendations: fallbackList,
        selectedVideo: fallbackList[0] ?? null,
        fallbackUsed: true,
        cacheUsed: false,
        fallbackReason: "playlist_source_unconfigured",
        fallbackDetail: "No curated playlist IDs were configured for the current style.",
        fetchedAt: new Date().toISOString()
      };
    }

    const playlistRecommendations = await getPlaylistRecommendations(
      playlistSources.map((source) => source.id),
      query
    );

    const normalized = playlistRecommendations.slice(0, RECOMMENDATION_LIMIT);
    const list = normalized.length > 0 ? normalized : fallbackList;

    if (normalized.length > 0) {
      await saveCachedRecommendations(query, normalized);
    }

    return {
      coordinates,
      location,
      weather,
      vibe,
      query,
      recommendations: list,
      selectedVideo: list[0] ?? null,
      fallbackUsed: normalized.length === 0,
      cacheUsed: false,
      fallbackReason: normalized.length === 0 ? "no_usable_playlist_results" : undefined,
      fetchedAt: new Date().toISOString()
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown_youtube_playlist_error";
    return {
      coordinates,
      location,
      weather,
      vibe,
      query,
      recommendations: fallbackList,
      selectedVideo: fallbackList[0] ?? null,
      fallbackUsed: true,
      fallbackReason: "youtube_playlist_error",
      fallbackDetail: message,
      fetchedAt: new Date().toISOString()
    };
  }
}
