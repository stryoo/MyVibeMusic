"use client";

import { create } from "zustand";
import type {
  Coordinates,
  Emotion,
  RecommendationItem,
  RecommendationPayload,
  WeatherContextPayload
} from "@/types";
import { fetchRecommendations, fetchWeatherContext } from "@/lib/controllers/recommendations-client";

export type AppLoadStatus = "idle" | "loading" | "success" | "error";

type AppState = {
  coordinates: Coordinates | null;
  emotion: Emotion;
  weatherContext: WeatherContextPayload | null;
  recommendations: RecommendationPayload | null;
  selectedVideoId: string | null;
  status: AppLoadStatus;
  errorMessage: string | null;

  setEmotion: (emotion: Emotion) => void;
  selectVideo: (videoId: string) => void;
  hydrateFromRecommendations: (payload: RecommendationPayload) => void;
  refresh: (coordinates: Coordinates) => Promise<void>;
  clearError: () => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  coordinates: null,
  emotion: "calm",
  weatherContext: null,
  recommendations: null,
  selectedVideoId: null,
  status: "idle",
  errorMessage: null,

  clearError: () => set({ errorMessage: null }),

  setEmotion: (emotion) => set({ emotion }),

  selectVideo: (videoId) => set({ selectedVideoId: videoId }),

  hydrateFromRecommendations: (payload) => {
    const first = payload.selectedVideo?.videoId ?? payload.recommendations[0]?.videoId ?? null;
    set({
      recommendations: payload,
      selectedVideoId: first
    });
  },

  refresh: async (coordinates) => {
    const current = get();
    set({
      coordinates,
      status: "loading",
      errorMessage: null,
      weatherContext: current.weatherContext,
      recommendations: current.recommendations
    });

    try {
      const emotion = get().emotion;
      const [contextPayload, recommendationPayload] = await Promise.all([
        fetchWeatherContext(coordinates, emotion),
        fetchRecommendations(coordinates, emotion)
      ]);

      const firstVideoId =
        recommendationPayload.selectedVideo?.videoId ??
        recommendationPayload.recommendations[0]?.videoId ??
        null;

      set({
        coordinates,
        weatherContext: contextPayload,
        recommendations: recommendationPayload,
        selectedVideoId: firstVideoId,
        status: "success",
        errorMessage: null
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load recommendations.";
      set({
        coordinates,
        status: "error",
        errorMessage: message
      });
    }
  }
}));

export function getSelectedVideo(
  payload: RecommendationPayload | null,
  selectedVideoId: string | null
): RecommendationItem | null {
  if (!payload) {
    return null;
  }
  if (!selectedVideoId) {
    return payload.selectedVideo ?? payload.recommendations[0] ?? null;
  }
  return payload.recommendations.find((item) => item.videoId === selectedVideoId) ?? payload.selectedVideo ?? null;
}
