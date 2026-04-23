import { getMusicStyleQuery } from "@/lib/recommendation/music-style";
import { buildVibeContext, getWeatherLocalDate } from "@/lib/recommendation/vibe-map";
import type { Emotion, LocationSnapshot, MusicStyle, WeatherSnapshot } from "@/types";

function getWeatherMusicKeyword(weather: WeatherSnapshot) {
  switch (weather.mood) {
    case "rain":
      return "감성 플레이리스트";
    case "snow":
      return "포근한 플레이리스트";
    case "clouds":
      return "무드 플레이리스트";
    case "thunderstorm":
      return "몰입용 플레이리스트";
    case "mist":
      return "몽환적인 플레이리스트";
    case "clear":
    default:
      return weather.isDaytime ? "기분 좋은 플레이리스트" : "드라이브 플레이리스트";
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
    return weather.isDaytime ? "흐린 오후" : "흐린 밤";
  }

  return weather.isDaytime ? "오늘" : "오늘 밤";
}

function getBroadLocationHint(location: LocationSnapshot) {
  const city = location.city.trim();

  if (!city) {
    return "";
  }

  if (city === "서울") return "서울권";
  if (city === "경기") return "경기권";
  if (city === "인천") return "인천권";
  if (city === "부산") return "부산권";
  if (city === "대구") return "대구권";
  if (city === "광주") return "광주권";
  if (city === "대전") return "대전권";
  if (city === "울산") return "울산권";

  return city;
}

export function buildYoutubeSearchQuery(
  location: LocationSnapshot,
  weather: WeatherSnapshot,
  emotion?: Emotion,
  musicStyle?: MusicStyle
) {
  const moment = getMomentLabel(weather);
  const vibe = buildVibeContext(weather, getWeatherLocalDate(weather), emotion);
  const moodPhrase = getWeatherMusicKeyword(weather);
  const stylePhrase = getMusicStyleQuery(musicStyle);
  const locationHint = getBroadLocationHint(location);

  return [
    stylePhrase,
    moment,
    vibe.timeLabel,
    vibe.timeKeyword,
    vibe.weatherKeyword,
    vibe.emotionKeyword,
    moodPhrase,
    locationHint
  ]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildContextLabel(
  location: LocationSnapshot,
  weather: WeatherSnapshot,
  emotion?: Emotion
) {
  const moment = getMomentLabel(weather);
  const vibe = buildVibeContext(weather, getWeatherLocalDate(weather), emotion);
  return `${location.city} ${location.district}, ${moment} (${vibe.timeLabel})`;
}
