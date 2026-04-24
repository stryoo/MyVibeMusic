import { Redis } from "@upstash/redis";

import { hasUpstashRedisEnv, serverEnv } from "@/lib/config/env";
import type { RecommendationItem } from "@/types";

const CACHE_TTL_SECONDS = 60 * 60 * 24 * 14;

type CachedRecommendationHit = {
  key: string;
  query: string;
  recommendations: RecommendationItem[];
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

function normalizeQuery(query: string) {
  return query
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .join(" ");
}

function normalizeRecommendations(recommendations: RecommendationItem[]) {
  return recommendations
    .filter((item) => isValidRecommendationItem(item))
    .slice(0, 5)
    .map((item) => ({
      ...item,
      watchUrl: item.watchUrl ?? `https://www.youtube.com/watch?v=${item.videoId}`
    }));
}

function getCacheKey(query: string) {
  return `yt:query:${normalizeQuery(query)}`;
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

export async function getCachedRecommendations(
  queries: string[]
): Promise<CachedRecommendationHit | null> {
  const redis = getRedisClient();

  if (!redis) {
    return null;
  }

  for (const query of queries) {
    const key = getCacheKey(query);

    try {
      const hit = await redis.get<{
        query: string;
        recommendations: RecommendationItem[];
        updatedAt: string;
      }>(key);

      if (hit?.query && Array.isArray(hit.recommendations) && hit.updatedAt) {
        return {
          key,
          query: hit.query,
          recommendations: normalizeRecommendations(hit.recommendations),
          updatedAt: hit.updatedAt
        };
      }
    } catch {
      continue;
    }
  }

  return null;
}

export async function saveCachedRecommendations(
  query: string,
  recommendations: RecommendationItem[]
) {
  const redis = getRedisClient();
  const key = getCacheKey(query);
  const normalizedRecommendations = normalizeRecommendations(recommendations);

  if (!redis || !key || normalizedRecommendations.length === 0) {
    return;
  }

  await redis.set(
    key,
    {
      query,
      recommendations: normalizedRecommendations,
      updatedAt: new Date().toISOString()
    },
    {
      ex: CACHE_TTL_SECONDS
    }
  );
}
