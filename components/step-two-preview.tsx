"use client";

import { motion } from "framer-motion";
import {
  CloudSun,
  Compass,
  LoaderCircle,
  Music4,
  Navigation,
  PlayCircle,
  RefreshCcw,
  Sparkles
} from "lucide-react";
import { useEffect } from "react";
import { EMOTIONS } from "@/lib/recommendation/emotion";
import { MUSIC_STYLES } from "@/lib/recommendation/music-style";
import { getWeatherTheme } from "@/lib/ui/weather-theme";
import { YouTubePlayer } from "@/components/youtube-player";
import { getSelectedVideo, useAppStore } from "@/stores/app-store";
import type { Coordinates, Emotion, MusicStyle } from "@/types";

const DEFAULT_COORDINATES: Coordinates = { lat: 37.4979, lon: 127.0276 };

export function StepTwoPreview() {
  const coordinates = useAppStore((state) => state.coordinates ?? DEFAULT_COORDINATES);
  const weatherContext = useAppStore((state) => state.weatherContext);
  const recommendations = useAppStore((state) => state.recommendations);
  const selectedVideoId = useAppStore((state) => state.selectedVideoId);
  const status = useAppStore((state) => state.status);
  const errorMessage = useAppStore((state) => state.errorMessage);
  const emotion = useAppStore((state) => state.emotion);
  const musicStyle = useAppStore((state) => state.musicStyle);
  const setEmotion = useAppStore((state) => state.setEmotion);
  const setMusicStyle = useAppStore((state) => state.setMusicStyle);
  const refresh = useAppStore((state) => state.refresh);
  const selectVideo = useAppStore((state) => state.selectVideo);

  const isLoading = status === "loading";
  const selectedVideo = getSelectedVideo(recommendations, selectedVideoId);
  const theme = getWeatherTheme(weatherContext?.weather.mood, emotion);
  const fallbackMessage = getFallbackMessage(
    recommendations?.fallbackReason,
    recommendations?.fallbackDetail
  );

  useEffect(() => {
    void refresh(DEFAULT_COORDINATES);
  }, [refresh]);

  function handleSelectEmotion(nextEmotion: Emotion) {
    setEmotion(nextEmotion);
    void refresh(coordinates);
  }

  function handleSelectMusicStyle(nextStyle: MusicStyle) {
    setMusicStyle(nextStyle);
    void refresh(coordinates);
  }

  function handleUseCurrentLocation() {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        void refresh({ lat: position.coords.latitude, lon: position.coords.longitude });
      },
      () => {},
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden overflow-y-hidden bg-[#070f1d] pb-24 text-white">
      <div className={`pointer-events-none absolute inset-0 ${theme.backgroundClassName}`} />
      <div className="pointer-events-none absolute inset-0" style={theme.backgroundStyle} />
      <div className="pointer-events-none absolute inset-0" style={theme.weatherOverlayStyle} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),transparent_24%,rgba(0,0,0,0.24)_100%)]" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-full overflow-hidden rounded-[30px] border border-white/20 bg-white/10 p-5 backdrop-blur-2xl sm:p-7"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.26em] text-white/80">
            <Sparkles className="h-4 w-4" />
            Step 4 Visual
          </div>

          <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">Weather Mood Player</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
            날씨 분위기에 맞춰 배경이 바뀌고, 감정 선택에 따라 추천 문맥과 플레이리스트가 반응하는
            글래스모피즘 플레이어 화면입니다.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {EMOTIONS.map((item) => {
              const active = item.id === emotion;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectEmotion(item.id)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    active
                      ? ""
                      : "border-white/15 bg-white/8 text-white/75 hover:bg-white/15"
                  }`}
                  style={active ? theme.activeChipStyle : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {MUSIC_STYLES.map((item) => {
              const active = item.id === musicStyle;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectMusicStyle(item.id)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    active
                      ? ""
                      : "border-white/15 bg-white/8 text-white/75 hover:bg-white/15"
                  }`}
                  style={active ? theme.activeChipStyle : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <ActionButton onClick={() => void refresh(DEFAULT_COORDINATES)} disabled={isLoading}>
              <RefreshCcw className="h-4 w-4" />
              샘플 좌표
            </ActionButton>
            <ActionButton onClick={handleUseCurrentLocation} disabled={isLoading}>
              <Navigation className="h-4 w-4" />
              현재 위치
            </ActionButton>
          </div>
        </motion.header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.section
            id="context"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.42 }}
            className="min-w-0 space-y-6"
          >
            <GlassCard>
              <CardTitle icon={<CloudSun className="h-5 w-5" />} subtitle="Weather + Location" title="Context" />

              {isLoading ? (
                <ContextSkeleton />
              ) : (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <DataTile label="좌표" value={`${coordinates.lat.toFixed(4)}, ${coordinates.lon.toFixed(4)}`} />
                  <DataTile label="주소" value={weatherContext?.location.fullLabel ?? "-"} />
                  <DataTile label="분위기 문맥" value={weatherContext?.context ?? "-"} />
                  <DataTile label="검색 쿼리" value={weatherContext?.query ?? recommendations?.query ?? "-"} />
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
                <StatusPill label={`Emotion: ${emotion}`} />
                <StatusPill label={`Style: ${musicStyle}`} />
                <StatusPill label={`Kakao: ${weatherContext?.fallbackUsed ? "Fallback" : "Live"}`} />
                <StatusPill label={`YouTube: ${recommendations?.fallbackUsed ? "Fallback" : "Live"}`} />
              </div>
            </GlassCard>

            <GlassCard id="list">
              <CardTitle icon={<Music4 className="h-5 w-5" />} subtitle="Top 5 Tracks" title="Recommendations" />

              <div className="mt-5 space-y-3">
                {isLoading ? (
                  <ListSkeleton />
                ) : (
                  recommendations?.recommendations.map((item, index) => {
                    const active = item.videoId === selectedVideo?.videoId;
                    return (
                      <motion.button
                        whileTap={{ scale: 0.99 }}
                        key={item.videoId}
                        type="button"
                        onClick={() => selectVideo(item.videoId)}
                        className={`flex w-full items-start gap-4 rounded-3xl border px-4 py-4 text-left transition ${
                          active
                            ? "border-white/35 bg-white/18 shadow-[0_0_35px_rgba(148,163,184,0.30)]"
                            : "border-white/12 bg-black/10 hover:border-white/25 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white/80">
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">{item.title}</p>
                          <p className="mt-1 truncate text-xs text-white/65">{item.channelTitle}</p>
                          <p className="mt-2 line-clamp-2 text-xs leading-6 text-white/55">
                            {item.description || "설명 없음"}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })
                )}

                {!recommendations && !isLoading ? (
                  <div className="rounded-3xl border border-dashed border-white/15 bg-black/10 px-4 py-7 text-center text-sm text-white/60">
                    아직 추천 데이터가 없습니다.
                  </div>
                ) : null}
              </div>
            </GlassCard>
          </motion.section>

          <motion.aside
            id="player"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.42 }}
            className="min-w-0 space-y-6"
          >
            <GlassCard className="relative overflow-hidden">
              <div className="pointer-events-none absolute -inset-10 rounded-[42px]" style={theme.glowStyle} />
              <div className="relative">
                <CardTitle icon={<PlayCircle className="h-5 w-5" />} subtitle="Now Playing" title="Main Player" />

                <div className="mt-5 rounded-[30px] border border-white/15 bg-white/8 p-5">
                  {isLoading ? (
                    <PlayerSkeleton />
                  ) : (
                    <>
                      <div className="relative">
                        <div className="pointer-events-none absolute -inset-4 rounded-[26px]" style={theme.cardGlowStyle} />
                        <YouTubePlayer
                          key={selectedVideo?.videoId ?? "empty-player"}
                          videoId={selectedVideo?.videoId ?? null}
                          className="relative aspect-square rounded-[24px] border border-white/10"
                        />
                      </div>
                      <h3 className="mt-5 break-words text-lg font-semibold">
                        {selectedVideo?.title ?? "선택된 곡이 없습니다."}
                      </h3>
                      <p className="mt-2 text-sm text-white/62">{selectedVideo?.channelTitle ?? "채널 정보 없음"}</p>
                      {selectedVideo?.watchUrl ? (
                        <p className="mt-2 break-all text-xs text-white/45">{selectedVideo.watchUrl}</p>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            </GlassCard>

            {isLoading ? (
              <GlassCard className="flex items-center gap-3 text-sm text-white/75">
                <LoaderCircle className="h-5 w-5 animate-spin" />
                추천 목록을 업데이트하는 중입니다.
              </GlassCard>
            ) : null}

            {errorMessage ? (
              <GlassCard className="border border-rose-200/35 bg-rose-400/15 text-sm text-rose-100">
                {errorMessage}
              </GlassCard>
            ) : null}

            {!errorMessage && fallbackMessage ? (
              <GlassCard className="border border-amber-200/35 bg-amber-300/12 text-sm text-amber-50">
                {fallbackMessage}
              </GlassCard>
            ) : null}
          </motion.aside>
        </div>
      </section>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-white/15 bg-black/35 px-4 py-3 backdrop-blur-2xl lg:hidden">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 text-xs text-white/85">
          <AnchorTab href="#context" icon={<Compass className="h-4 w-4" />} label="문맥" />
          <AnchorTab href="#list" icon={<Music4 className="h-4 w-4" />} label="추천" />
          <AnchorTab href="#player" icon={<PlayCircle className="h-4 w-4" />} label="플레이어" />
        </div>
      </nav>
    </main>
  );
}

function CardTitle({
  icon,
  subtitle,
  title
}: {
  icon: React.ReactNode;
  subtitle: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-white">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/55">{subtitle}</p>
        <h2 className="mt-1 text-xl font-semibold">{title}</h2>
      </div>
    </div>
  );
}

function ActionButton({
  children,
  disabled,
  onClick
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/18 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
}

function GlassCard({
  children,
  className = "",
  id
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`min-w-0 max-w-full overflow-hidden rounded-[30px] border border-white/20 bg-white/10 p-5 shadow-[0_24px_80px_rgba(0,10,25,0.35)] backdrop-blur-2xl sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

function DataTile({ label, value }: { label: string; value: string }) {
  return (
      <div className="min-w-0 rounded-2xl border border-white/12 bg-black/15 px-4 py-4">
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{label}</p>
        <p className="mt-2 break-words text-sm leading-6 text-white/85">{value}</p>
    </div>
  );
}

function StatusPill({ label }: { label: string }) {
  return <div className="rounded-full border border-white/15 bg-black/15 px-3 py-1.5">{label}</div>;
}

function AnchorTab({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function getFallbackMessage(reason?: string, detail?: string) {
  if (!reason) {
    return null;
  }

  if (reason === "youtube_api_error" && detail?.includes("quotaExceeded")) {
    return "YouTube API 할당량을 초과해 현재는 기본 추천 리스트를 보여주고 있어요. 할당량이 리셋되거나 새 API 키를 연결하면 실시간 추천으로 돌아옵니다.";
  }

  if (reason === "youtube_api_error") {
    return "YouTube 추천을 불러오는 중 문제가 있어 기본 추천 리스트를 보여주고 있어요.";
  }

  if (reason === "no_usable_youtube_results") {
    return "현재 조건에 맞는 재생 가능한 유튜브 결과가 적어 기본 추천 리스트를 보여주고 있어요.";
  }

  return "추천 데이터를 불러오는 중 일부 제한이 있어 기본 추천 리스트를 보여주고 있어요.";
}

function ContextSkeleton() {
  return (
    <div className="mt-5 grid animate-pulse gap-3 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-2xl border border-white/12 bg-black/15 px-4 py-4">
          <div className="h-3 w-20 rounded bg-white/15" />
          <div className="mt-3 h-4 w-full rounded bg-white/15" />
          <div className="mt-2 h-4 w-3/4 rounded bg-white/15" />
        </div>
      ))}
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="rounded-3xl border border-white/12 bg-black/15 px-4 py-4">
          <div className="h-4 w-3/4 rounded bg-white/15" />
          <div className="mt-2 h-3 w-1/2 rounded bg-white/15" />
          <div className="mt-3 h-3 w-11/12 rounded bg-white/15" />
        </div>
      ))}
    </div>
  );
}

function PlayerSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square rounded-[24px] bg-white/12" />
      <div className="mt-5 h-5 w-3/4 rounded bg-white/15" />
      <div className="mt-2 h-4 w-1/2 rounded bg-white/12" />
    </div>
  );
}
