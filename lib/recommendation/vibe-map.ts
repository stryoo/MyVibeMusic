import type { Emotion, TimeBand, VibeContext, WeatherMood, WeatherSnapshot } from "@/types";

type TimeBandConfig = {
  label: string;
  keywords: string[];
};

type WeatherVibeConfig = {
  keywordsDay: string[];
  keywordsNight: string[];
};

type EmotionConfig = {
  label: string;
  keywords: string[];
};

type EmotionWeatherOverrides = Partial<Record<WeatherMood, WeatherVibeConfig>>;

const TIME_BAND_TABLE: Array<{ band: TimeBand; from: number; to: number; config: TimeBandConfig }> = [
  { band: "lateNight", from: 2, to: 6, config: { label: "새벽", keywords: ["고요한", "새벽 감성"] } },
  { band: "morning", from: 6, to: 11, config: { label: "아침", keywords: ["산뜻한", "가벼운"] } },
  { band: "midday", from: 11, to: 14, config: { label: "점심", keywords: ["집중", "카페"] } },
  { band: "afternoon", from: 14, to: 17, config: { label: "오후", keywords: ["여유로운", "나른한"] } },
  { band: "evening", from: 17, to: 22, config: { label: "저녁", keywords: ["퇴근길", "노을"] } },
  { band: "night", from: 22, to: 2, config: { label: "밤", keywords: ["야경", "드라이브"] } }
];

const BASE_WEATHER_VIBE_TABLE: Record<WeatherMood, WeatherVibeConfig> = {
  rain: {
    keywordsDay: ["차분한", "센치한", "감성"],
    keywordsNight: ["빗소리", "멜랑콜리", "감성"]
  },
  snow: {
    keywordsDay: ["포근한", "따뜻한", "감성"],
    keywordsNight: ["포근한", "고요한", "감성"]
  },
  clouds: {
    keywordsDay: ["멜로우", "차분한", "무드"],
    keywordsNight: ["멜로우", "잔잔한", "무드"]
  },
  clear: {
    keywordsDay: ["상쾌한", "기분 좋은", "산뜻한"],
    keywordsNight: ["네온", "도시", "드라이브"]
  },
  thunderstorm: {
    keywordsDay: ["강렬한", "에너지", "집중"],
    keywordsNight: ["웅장한", "강렬한", "몰입"]
  },
  mist: {
    keywordsDay: ["몽환적인", "드림", "무드"],
    keywordsNight: ["몽환적인", "드림", "고요한"]
  }
};

const EMOTION_TABLE: Record<Emotion, EmotionConfig> = {
  calm: { label: "편안", keywords: ["차분한", "릴랙스"] },
  happy: { label: "기분좋음", keywords: ["상쾌한", "업비트"] },
  sad: { label: "센치", keywords: ["감성", "멜랑콜리"] },
  focus: { label: "집중", keywords: ["집중", "몰입"] },
  romantic: { label: "로맨틱", keywords: ["설레는", "따뜻한"] },
  energetic: { label: "에너지", keywords: ["에너지", "강렬한"] }
};

const EMOTION_WEATHER_TABLE: Record<Emotion, EmotionWeatherOverrides> = {
  calm: {
    clouds: {
      keywordsDay: ["차분한", "멜로우", "잔잔한"],
      keywordsNight: ["잔잔한", "고요한", "무드"]
    },
    clear: {
      keywordsDay: ["산뜻한", "기분 좋은", "여유로운"],
      keywordsNight: ["드라이브", "도시", "은은한"]
    }
  },
  happy: {
    clouds: {
      keywordsDay: ["무드", "산뜻한", "포근한"],
      keywordsNight: ["반짝이는", "기분 좋은", "무드"]
    },
    rain: {
      keywordsDay: ["촉촉한", "기분 좋은", "산뜻한"],
      keywordsNight: ["반짝이는", "감성", "무드"]
    },
    clear: {
      keywordsDay: ["상쾌한", "업비트", "햇살 같은"],
      keywordsNight: ["네온", "반짝이는", "드라이브"]
    }
  },
  sad: {
    clouds: {
      keywordsDay: ["센치한", "멜랑콜리", "감성"],
      keywordsNight: ["쓸쓸한", "멜랑콜리", "감성"]
    },
    clear: {
      keywordsDay: ["아련한", "감성", "잔상 같은"],
      keywordsNight: ["야경", "쓸쓸한", "감성"]
    }
  },
  focus: {
    clouds: {
      keywordsDay: ["집중", "정돈된", "몰입"],
      keywordsNight: ["몰입", "정적", "집중"]
    },
    rain: {
      keywordsDay: ["집중", "차분한", "몰입"],
      keywordsNight: ["빗소리", "몰입", "집중"]
    },
    clear: {
      keywordsDay: ["정돈된", "산뜻한", "집중"],
      keywordsNight: ["도시", "몰입", "드라이브"]
    }
  },
  romantic: {
    clouds: {
      keywordsDay: ["설레는", "무드", "따뜻한"],
      keywordsNight: ["잔잔한", "설레는", "무드"]
    },
    rain: {
      keywordsDay: ["촉촉한", "설레는", "감성"],
      keywordsNight: ["빗소리", "아련한", "로맨틱"]
    },
    clear: {
      keywordsDay: ["햇살 같은", "따뜻한", "설레는"],
      keywordsNight: ["야경", "로맨틱", "드라이브"]
    }
  },
  energetic: {
    clouds: {
      keywordsDay: ["업비트", "에너지", "탄력 있는"],
      keywordsNight: ["네온", "질주감", "에너지"]
    },
    rain: {
      keywordsDay: ["리드미컬한", "에너지", "강렬한"],
      keywordsNight: ["질주감", "강렬한", "에너지"]
    },
    clear: {
      keywordsDay: ["상쾌한", "에너지", "업비트"],
      keywordsNight: ["네온", "강렬한", "드라이브"]
    },
    mist: {
      keywordsDay: ["몽환적인", "강렬한", "에너지"],
      keywordsNight: ["드림", "질주감", "강렬한"]
    }
  }
};

function pickStable(list: string[], key: string) {
  if (list.length === 0) {
    return "";
  }

  let sum = 0;
  for (let index = 0; index < key.length; index += 1) {
    sum = (sum + key.charCodeAt(index)) % 2147483647;
  }

  return list[sum % list.length] ?? list[0] ?? "";
}

function getWeatherLocalHour(weather: WeatherSnapshot, fallbackNow = new Date()) {
  if (Number.isFinite(weather.observedAt) && Number.isFinite(weather.timezoneOffsetSeconds)) {
    const totalHours = Math.floor((weather.observedAt + weather.timezoneOffsetSeconds) / 3600);
    return ((totalHours % 24) + 24) % 24;
  }

  return fallbackNow.getHours();
}

function getWeatherConfig(weather: WeatherSnapshot, emotion: Emotion) {
  const overrides = EMOTION_WEATHER_TABLE[emotion]?.[weather.mood];
  return overrides ?? BASE_WEATHER_VIBE_TABLE[weather.mood];
}

export function getWeatherLocalDate(weather: WeatherSnapshot, fallbackNow = new Date()) {
  const hour = getWeatherLocalHour(weather, fallbackNow);
  const snapshot = new Date(fallbackNow);
  snapshot.setHours(hour, 0, 0, 0);
  return snapshot;
}

export function getTimeBandFromHour(hour: number): { band: TimeBand; config: TimeBandConfig } {
  for (const row of TIME_BAND_TABLE) {
    if (row.from < row.to) {
      if (hour >= row.from && hour < row.to) {
        return { band: row.band, config: row.config };
      }
      continue;
    }

    if (hour >= row.from || hour < row.to) {
      return { band: row.band, config: row.config };
    }
  }

  return { band: "afternoon", config: TIME_BAND_TABLE[3]!.config };
}

export function getTimeBand(date: Date): { band: TimeBand; config: TimeBandConfig } {
  return getTimeBandFromHour(date.getHours());
}

export function buildVibeContext(
  weather: WeatherSnapshot,
  now = new Date(),
  emotion: Emotion = "calm"
): VibeContext {
  const { band: timeBand, config: timeConfig } = getTimeBand(now);
  const weatherConfig = getWeatherConfig(weather, emotion);
  const weatherKeywords = weather.isDaytime ? weatherConfig.keywordsDay : weatherConfig.keywordsNight;
  const emotionConfig = EMOTION_TABLE[emotion];

  const timeKeyword = pickStable(timeConfig.keywords, `${timeBand}:${weather.mood}:${emotion}`);
  const weatherKeyword = pickStable(weatherKeywords, `${weather.mood}:${timeBand}:${emotion}`);
  const emotionKeyword = pickStable(emotionConfig.keywords, `${emotion}:${timeBand}:${weather.mood}`);

  return {
    timeBand,
    timeLabel: timeConfig.label,
    timeKeyword,
    weatherKeyword,
    emotion,
    emotionLabel: emotionConfig.label,
    emotionKeyword,
    tags: [timeConfig.label, timeKeyword, weatherKeyword, emotionConfig.label, emotionKeyword].filter(Boolean)
  };
}
