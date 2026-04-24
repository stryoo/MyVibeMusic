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

const PLAYBACK_REGION_BY_STYLE: Partial<Record<MusicStyle, string>> = {
  pop: "US",
  kpop: "KR",
  ballad: "KR",
  indie: "KR",
  hiphop: "KR"
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

type SearchAttempt = {
  videoCategoryId?: string;
  videoEmbeddable?: string;
  videoSyndicated?: string;
  regionCode?: string;
  relevanceLanguage?: string;
};

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

function isBlockedInRegion(item: YouTubeVideosResponse["items"][number], region: string) {
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

function isPlayableVideo(item: YouTubeVideosResponse["items"][number], region: string) {
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

  if (isBlockedInRegion(item, region)) {
    return false;
  }

  return true;
}

async function fetchYouTubeVideoDetails(videoIds: string[], region: string) {
  if (videoIds.length === 0) {
    return new Map<string, RecommendationItem>();
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("key", serverEnv.youtubeDataApiKey);
  url.searchParams.set("part", "snippet,status,contentDetails");
  url.searchParams.set("id", videoIds.join(","));
  url.searchParams.set("maxResults", RECOMMENDATION_LIMIT.toString());

  const data = await fetchJson<YouTubeVideosResponse>(url, {
    next: { revalidate: 900 }
  });

  return new Map(
    data.items
      .filter((item) => isPlayableVideo(item, region))
      .map((item) => [item.id, toHydratedRecommendation(item)])
  );
}

export async function searchYoutubeMusic(
  query: string,
  musicStyle?: MusicStyle
): Promise<RecommendationItem[]> {
  const profile = getSearchProfile(musicStyle);
  const playbackRegion = PLAYBACK_REGION_BY_STYLE[musicStyle ?? "kpop"] ?? "KR";
  const attemptErrors: string[] = [];
  const attempts: SearchAttempt[] = [
    {
      videoCategoryId: "10",
      videoEmbeddable: "true",
      videoSyndicated: "true",
      regionCode: profile.regionCode,
      relevanceLanguage: profile.relevanceLanguage
    },
    {
      videoEmbeddable: "true",
      videoSyndicated: "true",
      regionCode: profile.regionCode,
      relevanceLanguage: profile.relevanceLanguage
    },
    {
      regionCode: profile.regionCode,
      relevanceLanguage: profile.relevanceLanguage
    },
    {}
  ];

  for (const attempt of attempts) {
    try {
      const url = new URL("https://www.googleapis.com/youtube/v3/search");
      url.searchParams.set("key", serverEnv.youtubeDataApiKey);
      url.searchParams.set("part", "snippet");
      url.searchParams.set("type", "video");
      url.searchParams.set("maxResults", RECOMMENDATION_LIMIT.toString());
      url.searchParams.set("q", query);
      url.searchParams.set("safeSearch", "moderate");

      if (attempt.videoCategoryId) {
        url.searchParams.set("videoCategoryId", attempt.videoCategoryId);
      }
      if (attempt.videoEmbeddable) {
        url.searchParams.set("videoEmbeddable", attempt.videoEmbeddable);
      }
      if (attempt.videoSyndicated) {
        url.searchParams.set("videoSyndicated", attempt.videoSyndicated);
      }
      if (attempt.regionCode) {
        url.searchParams.set("regionCode", attempt.regionCode);
      }
      if (attempt.relevanceLanguage) {
        url.searchParams.set("relevanceLanguage", attempt.relevanceLanguage);
      }

      const data = await fetchJson<YouTubeSearchResponse>(url, {
        next: { revalidate: 900 }
      });

      const searchItems = data.items.filter((item) => item.id.kind === "youtube#video" && item.id.videoId);
      const videoIds = searchItems.map((item) => item.id.videoId as string);

      try {
        const hydratedMap = await fetchYouTubeVideoDetails(videoIds, playbackRegion);
        const hydratedItems = videoIds
          .map((videoId) => hydratedMap.get(videoId))
          .filter((item): item is RecommendationItem => Boolean(item));

        if (hydratedItems.length > 0) {
          return hydratedItems;
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "video_details_lookup_failed";
        attemptErrors.push(`details:${message}`);
      }

      if (searchItems.length > 0) {
        return searchItems.map((item) => toRecommendationItem(item.id.videoId as string, item));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "youtube_search_failed";
      attemptErrors.push(message);
    }
  }

  if (attemptErrors.length > 0) {
    throw new Error(attemptErrors.join(" | "));
  }

  return [];
}
