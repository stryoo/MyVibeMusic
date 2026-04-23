"use client";

type Props = {
  videoId: string | null;
  className?: string;
};

const PLAYER_HOST = process.env.NEXT_PUBLIC_YOUTUBE_PLAYER_HOST ?? "https://www.youtube.com";

function buildEmbedUrl(videoId: string) {
  const url = new URL(`/embed/${videoId}`, PLAYER_HOST);
  url.searchParams.set("autoplay", "1");
  url.searchParams.set("playsinline", "1");
  url.searchParams.set("rel", "0");
  url.searchParams.set("modestbranding", "1");
  url.searchParams.set("start", "0");
  return url.toString();
}

export function YouTubePlayer({ videoId, className = "" }: Props) {
  return (
    <div
      key={videoId ?? "empty-player"}
      className={`relative overflow-hidden rounded-[24px] bg-black ${className}`}
    >
      {videoId ? (
        <iframe
          src={buildEmbedUrl(videoId)}
          title="YouTube player"
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-sm text-white/70">
          선택된 곡이 없습니다.
        </div>
      )}
    </div>
  );
}
