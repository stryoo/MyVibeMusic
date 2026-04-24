import { Redis } from "@upstash/redis";

import { hasUpstashRedisEnv, serverEnv } from "@/lib/config/env";
import type { RecommendationItem } from "@/types";

const PLAYLIST_CACHE_TTL_SECONDS = 60 * 60 * 24;
const PLAYLIST_CACHE_VERSION = "v2";

type PlaylistCacheEntry = {
  playlistId: string;
  items: RecommendationItem[];
  updatedAt: string;
};

let redisClient: Redis | null = null;

function isValidRecommendationItem(value: unknown): value is RecommendationItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Record<string, unknown>;
  return (
    typeof item.videoId === "string" &&
    typeof item.title === "string" &&
    typeof item.channelTitle === "string" &&
    typeof item.thumbnailUrl === "string" &&
    typeof item.description === "string"
  );
}

function normalizeRecommendations(recommendations: RecommendationItem[]) {
  return recommendations
    .filter((item) => isValidRecommendationItem(item))
    .map((item) => ({
      ...item,
      watchUrl: item.watchUrl ?? `https://www.youtube.com/watch?v=${item.videoId}`
    }));
}

function getRedisClient() {
  if (!hasUpstashRedisEnv()) {
    return null;
  }

  if (!redisClient) {
    redisClient = new Redis({
      url: serverEnv.upstashRedisRestUrl,
      token: serverEnv.upstashRedisRestToken
    });
  }

  return redisClient;
}

function getPlaylistCacheKey(playlistId: string) {
  return `yt:playlist:${PLAYLIST_CACHE_VERSION}:${playlistId}`;
}

export async function getCachedPlaylistItems(playlistId: string) {
  const redis = getRedisClient();

  if (!redis) {
    return null;
  }

  try {
    const hit = await redis.get<PlaylistCacheEntry>(getPlaylistCacheKey(playlistId));

    if (!hit?.playlistId || !Array.isArray(hit.items) || !hit.updatedAt) {
      return null;
    }

    return {
      playlistId: hit.playlistId,
      items: normalizeRecommendations(hit.items),
      updatedAt: hit.updatedAt
    };
  } catch {
    return null;
  }
}

export async function saveCachedPlaylistItems(
  playlistId: string,
  recommendations: RecommendationItem[]
) {
  const redis = getRedisClient();
  const items = normalizeRecommendations(recommendations);

  if (!redis || !playlistId || items.length === 0) {
    return;
  }

  await redis.set(
    getPlaylistCacheKey(playlistId),
    {
      playlistId,
      items,
      updatedAt: new Date().toISOString()
    } satisfies PlaylistCacheEntry,
    {
      ex: PLAYLIST_CACHE_TTL_SECONDS
    }
  );
}
