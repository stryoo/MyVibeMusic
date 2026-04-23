import { RECOMMENDATION_LIMIT } from "@/lib/constants/app";
import { serverEnv } from "@/lib/config/env";
import { fetchJson } from "@/lib/utils/fetcher";
import type { MusicStyle, RecommendationItem } from "@/types";

type YouTubeSearchResponse = {
  items: Array<{
    id: {
      kind: string;
      videoId?: string;
    };
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
    status?: {
      embeddable?: boolean;
      privacyStatus?: string;
      uploadStatus?: string;
    };
  }>;
};

function getSearchProfile(style?: MusicStyle) {
  switch (style) {
    case "pop":
      return {
        regionCode: "US",
        relevanceLanguage: "en"
      };
    case "kpop":
    case "ballad":
    case "indie":
    case "hiphop":
    default:
      return {
        regionCode: "KR",
        relevanceLanguage: "ko"
      };
  }
}

function toWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function toRecommendationItem(videoId: string, item: YouTubeSearchResponse["items"][number]): RecommendationItem {
  return {
    videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnailUrl:
      item.snippet.thumbnails.high?.url ??
      item.snippet.thumbnails.medium?.url ??
      item.snippet.thumbnails.default?.url ??
      "",
    description: item.snippet.description,
    watchUrl: toWatchUrl(videoId)
  };
}

function toHydratedRecommendation(item: YouTubeVideosResponse["items"][number]): RecommendationItem {
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

async function fetchYouTubeVideoDetails(videoIds: string[]) {
  if (videoIds.length === 0) {
    return new Map<string, RecommendationItem>();
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("key", serverEnv.youtubeDataApiKey);
  url.searchParams.set("part", "snippet,status");
  url.searchParams.set("id", videoIds.join(","));
  url.searchParams.set("maxResults", RECOMMENDATION_LIMIT.toString());

  const data = await fetchJson<YouTubeVideosResponse>(url, {
    next: { revalidate: 900 }
  });

  return new Map(
    data.items
      .filter((item) => {
        const status = item.status;
        return (
          status?.embeddable !== false &&
          status?.privacyStatus !== "private" &&
          status?.uploadStatus !== "rejected"
        );
      })
      .map((item) => [item.id, toHydratedRecommendation(item)])
  );
}

export async function searchYoutubeMusic(
  query: string,
  musicStyle?: MusicStyle
): Promise<RecommendationItem[]> {
  const profile = getSearchProfile(musicStyle);
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("key", serverEnv.youtubeDataApiKey);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("type", "video");
  url.searchParams.set("videoCategoryId", "10");
  url.searchParams.set("maxResults", RECOMMENDATION_LIMIT.toString());
  url.searchParams.set("q", query);
  url.searchParams.set("regionCode", profile.regionCode);
  url.searchParams.set("relevanceLanguage", profile.relevanceLanguage);
  url.searchParams.set("safeSearch", "moderate");
  url.searchParams.set("videoEmbeddable", "true");
  url.searchParams.set("videoSyndicated", "true");

  const data = await fetchJson<YouTubeSearchResponse>(url, {
    next: { revalidate: 900 }
  });

  const searchItems = data.items.filter((item) => item.id.kind === "youtube#video" && item.id.videoId);
  const videoIds = searchItems.map((item) => item.id.videoId as string);

  try {
    const hydratedMap = await fetchYouTubeVideoDetails(videoIds);
    const hydratedItems = videoIds
      .map((videoId) => hydratedMap.get(videoId))
      .filter((item): item is RecommendationItem => Boolean(item));

    if (hydratedItems.length > 0) {
      return hydratedItems;
    }
  } catch {
    // Fall back to search metadata when details lookup fails.
  }

  return searchItems.map((item) => toRecommendationItem(item.id.videoId as string, item));
}
