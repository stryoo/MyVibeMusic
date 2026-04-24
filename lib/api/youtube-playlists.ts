import { RECOMMENDATION_LIMIT } from "@/lib/constants/app";
import { getCachedPlaylistItems, saveCachedPlaylistItems } from "@/lib/cache/youtube-playlist-cache";
import { serverEnv } from "@/lib/config/env";
import { fetchJson } from "@/lib/utils/fetcher";
import type { RecommendationItem } from "@/types";

type PlaylistItemsResponse = {
  items: Array<{
    contentDetails?: {
      videoId?: string;
    };
    snippet?: {
      title?: string;
      description?: string;
      resourceId?: {
        videoId?: string;
      };
    };
  }>;
};

type YouTubeVideosResponse = {
  items: Array<{
    id: string;
    snippet: {
      title: string;
      description: string;
      channelTitle: string;
      thumbnails: {
        high?: { url: string };
        medium?: { url: string };
        default?: { url: string };
      };
    };
    contentDetails?: {
      regionRestriction?: {
        allowed?: string[];
        blocked?: string[];
      };
    };
    status?: {
      embeddable?: boolean;
      privacyStatus?: string;
      uploadStatus?: string;
    };
  }>;
};

const PLAYBACK_REGION = "KR";

function isBlockedInRegion(item: YouTubeVideosResponse["items"][number], region = PLAYBACK_REGION) {
  const restriction = item.contentDetails?.regionRestriction;

  if (restriction?.allowed) {
    return !restriction.allowed.includes(region);
  }

  if (restriction?.blocked) {
    return restriction.blocked.includes(region);
  }

  return false;
}

function isUnplayableTitle(title: string) {
  const normalized = title.trim().toLowerCase();
  return normalized === "deleted video" || normalized === "private video";
}

function isPlayableVideo(item: YouTubeVideosResponse["items"][number]) {
  const status = item.status;

  if (!item.id || !item.snippet?.title || isUnplayableTitle(item.snippet.title)) {
    return false;
  }

  if (status?.embeddable !== true) {
    return false;
  }

  if (status.privacyStatus && !["public", "unlisted"].includes(status.privacyStatus)) {
    return false;
  }

  if (status.uploadStatus && status.uploadStatus !== "processed") {
    return false;
  }

  if (isBlockedInRegion(item)) {
    return false;
  }

  return true;
}

function toWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function toRecommendationItem(item: YouTubeVideosResponse["items"][number]): RecommendationItem {
  return {
    videoId: item.id,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnailUrl:
      item.snippet.thumbnails.high?.url ??
      item.snippet.thumbnails.medium?.url ??
      item.snippet.thumbnails.default?.url ??
      "",
    description: item.snippet.description,
    watchUrl: toWatchUrl(item.id)
  };
}

function hashSeed(seed: string) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 2147483647;
  }
  return hash;
}

function tokenize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2);
}

function rankRecommendations(pool: RecommendationItem[], querySeed: string, limit = RECOMMENDATION_LIMIT) {
  const keywords = tokenize(querySeed);
  const dedupedPool = pool.filter(
    (item, index, list) => list.findIndex((candidate) => candidate.videoId === item.videoId) === index
  );

  const ranked = dedupedPool
    .map((item, index) => {
      const haystack = `${item.title} ${item.description} ${item.channelTitle}`.toLowerCase();
      const score = keywords.reduce((sum, keyword) => sum + (haystack.includes(keyword) ? 1 : 0), 0);
      const tieBreaker = hashSeed(`${querySeed}:${item.videoId}:${index}`);
      return { item, score, tieBreaker };
    })
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return left.tieBreaker - right.tieBreaker;
    })
    .slice(0, Math.max(limit * 2, limit));

  if (ranked.length <= limit) {
    return ranked.map((entry) => entry.item);
  }

  const rotation = hashSeed(querySeed) % ranked.length;
  return Array.from({ length: limit }, (_, index) => ranked[(rotation + index) % ranked.length]!.item);
}

async function fetchPlaylistVideoIds(playlistId: string) {
  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("key", serverEnv.youtubeDataApiKey);
  url.searchParams.set("part", "snippet,contentDetails");
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("maxResults", "25");

  const data = await fetchJson<PlaylistItemsResponse>(url, {
    next: { revalidate: 3600 }
  });

  return data.items
    .map((item) => item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId)
    .filter((videoId): videoId is string => Boolean(videoId));
}

async function fetchVideoDetails(videoIds: string[]) {
  if (videoIds.length === 0) {
    return [];
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("key", serverEnv.youtubeDataApiKey);
  url.searchParams.set("part", "snippet,status,contentDetails");
  url.searchParams.set("id", videoIds.slice(0, 50).join(","));
  url.searchParams.set("maxResults", Math.min(videoIds.length, 50).toString());

  const data = await fetchJson<YouTubeVideosResponse>(url, {
    next: { revalidate: 3600 }
  });

  return data.items.filter((item) => isPlayableVideo(item)).map((item) => toRecommendationItem(item));
}

export async function getPlaylistRecommendations(
  playlistIds: string[],
  querySeed: string
): Promise<RecommendationItem[]> {
  const pool: RecommendationItem[] = [];

  for (const playlistId of playlistIds) {
    const cached = await getCachedPlaylistItems(playlistId);
    if (cached?.items.length) {
      pool.push(...cached.items);
      continue;
    }

    const videoIds = await fetchPlaylistVideoIds(playlistId);
    const items = await fetchVideoDetails(videoIds);

    if (items.length > 0) {
      await saveCachedPlaylistItems(playlistId, items);
      pool.push(...items);
    }
  }

  return rankRecommendations(pool, querySeed, RECOMMENDATION_LIMIT);
}
