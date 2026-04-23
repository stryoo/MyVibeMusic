import { getMissingServerEnvKeys, hasRequiredServerEnv } from "@/lib/config/env";
import { getFallbackRecommendations } from "@/lib/constants/fallback";
import { getMusicRecommendations } from "@/lib/recommendation/service";
import { parseEmotion } from "@/lib/recommendation/emotion";
import type { Coordinates } from "@/types";
import { NextResponse } from "next/server";

function parseCoordinates(searchParams: URLSearchParams): Coordinates | null {
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return null;
  }

  return { lat, lon };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coordinates = parseCoordinates(searchParams);
  const emotion = parseEmotion(searchParams.get("emotion"));
  const fallbackList = getFallbackRecommendations(emotion);

  if (!coordinates) {
    return NextResponse.json(
      {
        message: "lat, lon query parameter is required."
      },
      { status: 400 }
    );
  }

  if (!hasRequiredServerEnv()) {
    const missingKeys = getMissingServerEnvKeys();
    return NextResponse.json(
      {
        message: "Required API keys are missing. Emotion fallback list is returned.",
        missingKeys,
        recommendations: fallbackList,
        selectedVideo: fallbackList[0] ?? null,
        fallbackUsed: true
      },
      { status: 200 }
    );
  }

  try {
    const payload = await getMusicRecommendations(coordinates, emotion);
    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown recommendation error";

    return NextResponse.json(
      {
        message,
        recommendations: fallbackList,
        selectedVideo: fallbackList[0] ?? null,
        fallbackUsed: true
      },
      { status: 200 }
    );
  }
}
