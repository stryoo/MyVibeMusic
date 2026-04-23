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

  const data = await fetchJson<YouTubeSearchResponse>(url, {
    next: { revalidate: 900 }
  });

  return data.items
    .filter((item) => item.id.kind === "youtube#video" && item.id.videoId)
    .map((item) => ({
      videoId: item.id.videoId as string,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnailUrl:
        item.snippet.thumbnails.high?.url ??
        item.snippet.thumbnails.medium?.url ??
        item.snippet.thumbnails.default?.url ??
        "",
      description: item.snippet.description
    }));
}
