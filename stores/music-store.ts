"use client";

import { create } from "zustand";

type MusicAppState = {
  selectedVideoId: string | null;
  setSelectedVideoId: (videoId: string | null) => void;
};

export const useMusicStore = create<MusicAppState>((set) => ({
  selectedVideoId: null,
  setSelectedVideoId: (videoId) => set({ selectedVideoId: videoId })
}));
