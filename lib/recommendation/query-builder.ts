import type { Emotion, LocationSnapshot, WeatherSnapshot } from "@/types";
import { buildVibeContext } from "@/lib/recommendation/vibe-map";

function getWeatherMusicKeyword(weather: WeatherSnapshot) {
  switch (weather.mood) {
    case "rain":
      return "음악";
    case "snow":
      return "음악";
    case "clouds":
      return "음악";
    case "thunderstorm":
      return "집중 음악";
    case "mist":
      return "감성 음악";
    case "clear":
    default:
      return weather.isDaytime ? "기분 좋은 음악" : "드라이브 음악";
  }
}

function getMomentLabel(weather: WeatherSnapshot) {
  if (weather.mood === "rain") {
    return weather.isDaytime ? "비 오는 오후" : "비 오는 밤";
  }

  if (weather.mood === "clear") {
    return weather.isDaytime ? "맑은 오후" : "맑은 밤";
  }

  if (weather.mood === "clouds") {
    return weather.isDaytime ? "흐린 오후" : "흐린 저녁";
  }

  return weather.isDaytime ? "오늘" : "오늘 밤";
}

export function buildYoutubeSearchQuery(
  location: LocationSnapshot,
  weather: WeatherSnapshot,
  emotion?: Emotion
) {
  const moment = getMomentLabel(weather);
  const place = location.stationLikeLabel || location.district || location.city;
  const vibe = buildVibeContext(weather, new Date(), emotion);
  const musicKeyword = getWeatherMusicKeyword(weather);

  // Intentionally avoid explicit genre tokens; keep it "mood-based".
  return `${moment} ${place}에서 듣기 좋은 ${vibe.weatherKeyword} ${vibe.timeKeyword} ${vibe.emotionKeyword} ${musicKeyword}`
    .replace(/\s+/g, " ")
    .trim();
}

export function buildContextLabel(
  location: LocationSnapshot,
  weather: WeatherSnapshot,
  emotion?: Emotion
) {
  const moment = getMomentLabel(weather);
  const vibe = buildVibeContext(weather, new Date(), emotion);
  return `${location.city} ${location.district}, ${moment} (${vibe.timeLabel})`;
}

