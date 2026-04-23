import type { Emotion, MusicStyle, RecommendationItem } from "@/types";

const FALLBACK_BY_EMOTION: Record<Emotion, RecommendationItem[]> = {
  calm: [
    {
      videoId: "5qap5aO4i9A",
      title: "lofi hip hop radio - beats to relax/study to",
      channelTitle: "Lofi Girl",
      thumbnailUrl: "https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg",
      description: "Calm and stable fallback for relaxing breaks."
    },
    {
      videoId: "jfKfPfyJRdk",
      title: "lofi hip hop radio - beats to sleep/chill to",
      channelTitle: "Lofi Girl",
      thumbnailUrl: "https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg",
      description: "Soft and low-energy fallback for quiet moments."
    },
    {
      videoId: "DWcJFNfaw9c",
      title: "Rainy Jazz Cafe - Slow Jazz Music",
      channelTitle: "Relax Jazz Cafe",
      thumbnailUrl: "https://i.ytimg.com/vi/DWcJFNfaw9c/hqdefault.jpg",
      description: "Warm rainy mood fallback."
    },
    {
      videoId: "3qIot4Kfrxo",
      title: "Relaxing Piano Music for Deep Rest",
      channelTitle: "Soothing Relaxation",
      thumbnailUrl: "https://i.ytimg.com/vi/3qIot4Kfrxo/hqdefault.jpg",
      description: "Light piano fallback for background listening."
    },
    {
      videoId: "MYPVQccHhAQ",
      title: "Peaceful Piano & Ambient Mix",
      channelTitle: "Yellow Brick Cinema",
      thumbnailUrl: "https://i.ytimg.com/vi/MYPVQccHhAQ/hqdefault.jpg",
      description: "Slow and peaceful fallback ambience."
    }
  ],
  happy: [
    {
      videoId: "lFcSrYw-ARY",
      title: "City Pop Playlist for Sunset Drive",
      channelTitle: "The Jazz Hop Cafe",
      thumbnailUrl: "https://i.ytimg.com/vi/lFcSrYw-ARY/hqdefault.jpg",
      description: "Bright city-pop fallback."
    },
    {
      videoId: "kPa7bsKwL-c",
      title: "Feel Good Pop Playlist",
      channelTitle: "Dreamy",
      thumbnailUrl: "https://i.ytimg.com/vi/kPa7bsKwL-c/hqdefault.jpg",
      description: "Upbeat fallback for a positive mood."
    },
    {
      videoId: "fLexgOxsZu0",
      title: "Bruno Mars - Uptown Funk (Official Video)",
      channelTitle: "Bruno Mars",
      thumbnailUrl: "https://i.ytimg.com/vi/fLexgOxsZu0/hqdefault.jpg",
      description: "High-energy popular fallback."
    },
    {
      videoId: "OPf0YbXqDm0",
      title: "Mark Ronson - Uptown Funk ft. Bruno Mars",
      channelTitle: "Mark Ronson",
      thumbnailUrl: "https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg",
      description: "Danceable fallback track."
    },
    {
      videoId: "y6Sxv-sUYtM",
      title: "Happy Vibes Playlist",
      channelTitle: "Chill Zone",
      thumbnailUrl: "https://i.ytimg.com/vi/y6Sxv-sUYtM/hqdefault.jpg",
      description: "Cheerful fallback playlist."
    }
  ],
  sad: [
    {
      videoId: "hLQl3WQQoQ0",
      title: "Adele - Someone Like You",
      channelTitle: "Adele",
      thumbnailUrl: "https://i.ytimg.com/vi/hLQl3WQQoQ0/hqdefault.jpg",
      description: "Emotional fallback ballad."
    },
    {
      videoId: "RgKAFK5djSk",
      title: "Wiz Khalifa - See You Again ft. Charlie Puth",
      channelTitle: "Wiz Khalifa",
      thumbnailUrl: "https://i.ytimg.com/vi/RgKAFK5djSk/hqdefault.jpg",
      description: "Sentimental fallback track."
    },
    {
      videoId: "JGwWNGJdvx8",
      title: "Ed Sheeran - Shape of You (Acoustic Mood)",
      channelTitle: "Ed Sheeran",
      thumbnailUrl: "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg",
      description: "Soft vocal fallback."
    },
    {
      videoId: "4N3N1MlvVc4",
      title: "Sad Piano Music Mix",
      channelTitle: "Relaxing Music",
      thumbnailUrl: "https://i.ytimg.com/vi/4N3N1MlvVc4/hqdefault.jpg",
      description: "Low-tempo fallback for reflective moments."
    },
    {
      videoId: "M7lc1UVf-VE",
      title: "Melancholic Chill Playlist",
      channelTitle: "Mood Lab",
      thumbnailUrl: "https://i.ytimg.com/vi/M7lc1UVf-VE/hqdefault.jpg",
      description: "Melancholic fallback list."
    }
  ],
  focus: [
    {
      videoId: "5qap5aO4i9A",
      title: "lofi hip hop radio - beats to relax/study to",
      channelTitle: "Lofi Girl",
      thumbnailUrl: "https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg",
      description: "Focus fallback with stable rhythm."
    },
    {
      videoId: "jfKfPfyJRdk",
      title: "lofi hip hop radio - beats to sleep/chill to",
      channelTitle: "Lofi Girl",
      thumbnailUrl: "https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg",
      description: "Low-distraction fallback."
    },
    {
      videoId: "WPni755-Krg",
      title: "Deep Focus Music to Improve Concentration",
      channelTitle: "Yellow Brick Cinema",
      thumbnailUrl: "https://i.ytimg.com/vi/WPni755-Krg/hqdefault.jpg",
      description: "Ambient focus fallback."
    },
    {
      videoId: "2OEL4P1Rz04",
      title: "Coding Music Mix",
      channelTitle: "Chill Music Lab",
      thumbnailUrl: "https://i.ytimg.com/vi/2OEL4P1Rz04/hqdefault.jpg",
      description: "Work-session fallback."
    },
    {
      videoId: "Dg0IjOzopYU",
      title: "Concentration Music for Work",
      channelTitle: "Meditation Relax Music",
      thumbnailUrl: "https://i.ytimg.com/vi/Dg0IjOzopYU/hqdefault.jpg",
      description: "Long-form concentration fallback."
    }
  ],
  romantic: [
    {
      videoId: "YQHsXMglC9A",
      title: "Adele - Hello",
      channelTitle: "Adele",
      thumbnailUrl: "https://i.ytimg.com/vi/YQHsXMglC9A/hqdefault.jpg",
      description: "Romantic vocal fallback."
    },
    {
      videoId: "450p7goxZqg",
      title: "Ed Sheeran - Thinking Out Loud",
      channelTitle: "Ed Sheeran",
      thumbnailUrl: "https://i.ytimg.com/vi/450p7goxZqg/hqdefault.jpg",
      description: "Soft romantic fallback."
    },
    {
      videoId: "lp-EO5I60KA",
      title: "John Legend - All of Me",
      channelTitle: "John Legend",
      thumbnailUrl: "https://i.ytimg.com/vi/lp-EO5I60KA/hqdefault.jpg",
      description: "Classic romantic fallback."
    },
    {
      videoId: "09R8_2nJtjg",
      title: "Maroon 5 - Sugar",
      channelTitle: "Maroon 5",
      thumbnailUrl: "https://i.ytimg.com/vi/09R8_2nJtjg/hqdefault.jpg",
      description: "Light romantic fallback mood."
    },
    {
      videoId: "JGwWNGJdvx8",
      title: "Ed Sheeran - Shape of You",
      channelTitle: "Ed Sheeran",
      thumbnailUrl: "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg",
      description: "Rhythmic romantic fallback."
    }
  ],
  energetic: [
    {
      videoId: "kJQP7kiw5Fk",
      title: "Luis Fonsi - Despacito ft. Daddy Yankee",
      channelTitle: "Luis Fonsi",
      thumbnailUrl: "https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
      description: "Energetic global-pop fallback."
    },
    {
      videoId: "fRh_vgS2dFE",
      title: "Justin Bieber - Sorry",
      channelTitle: "Justin Bieber",
      thumbnailUrl: "https://i.ytimg.com/vi/fRh_vgS2dFE/hqdefault.jpg",
      description: "Dance-pop fallback."
    },
    {
      videoId: "9bZkp7q19f0",
      title: "PSY - GANGNAM STYLE",
      channelTitle: "officialpsy",
      thumbnailUrl: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
      description: "High-energy K-pop fallback."
    },
    {
      videoId: "LsoLEjrDogU",
      title: "Mark Ronson - Uptown Funk",
      channelTitle: "Mark Ronson",
      thumbnailUrl: "https://i.ytimg.com/vi/LsoLEjrDogU/hqdefault.jpg",
      description: "Funk-pop fallback."
    },
    {
      videoId: "CevxZvSJLk8",
      title: "Katy Perry - Roar",
      channelTitle: "Katy Perry",
      thumbnailUrl: "https://i.ytimg.com/vi/CevxZvSJLk8/hqdefault.jpg",
      description: "Boosting-energy fallback."
    }
  ]
};

export const FALLBACK_RECOMMENDATIONS: RecommendationItem[] = FALLBACK_BY_EMOTION.calm;

const EMOTION_STYLE_OFFSETS: Record<Emotion, number> = {
  calm: 0,
  happy: 2,
  sad: 4,
  focus: 1,
  romantic: 3,
  energetic: 5
};

const FALLBACK_BY_STYLE: Record<MusicStyle, RecommendationItem[]> = {
  kpop: [
    {
      videoId: "gdZLi9oWNZg",
      title: "BTS (방탄소년단) 'Dynamite' Official MV",
      channelTitle: "HYBE LABELS",
      thumbnailUrl: "https://i.ytimg.com/vi/gdZLi9oWNZg/hqdefault.jpg",
      description: "Bright K-pop fallback."
    },
    {
      videoId: "IO1Nl9ErTsI",
      title: "NewJeans (뉴진스) 'Super Shy' Official MV",
      channelTitle: "HYBE LABELS",
      thumbnailUrl: "https://i.ytimg.com/vi/IO1Nl9ErTsI/hqdefault.jpg",
      description: "Current K-pop fallback."
    },
    {
      videoId: "MbE0vN3yBT0",
      title: "IVE 아이브 'I AM' MV",
      channelTitle: "STARSHIP",
      thumbnailUrl: "https://i.ytimg.com/vi/MbE0vN3yBT0/hqdefault.jpg",
      description: "Big-stage K-pop fallback."
    },
    {
      videoId: "NaKrke1EL1A",
      title: "LE SSERAFIM (르세라핌) 'ANTIFRAGILE' OFFICIAL MV",
      channelTitle: "HYBE LABELS",
      thumbnailUrl: "https://i.ytimg.com/vi/NaKrke1EL1A/hqdefault.jpg",
      description: "Energetic K-pop fallback."
    },
    {
      videoId: "uR8Mrt1IpXg",
      title: "aespa 에스파 'Supernova' MV",
      channelTitle: "SMTOWN",
      thumbnailUrl: "https://i.ytimg.com/vi/uR8Mrt1IpXg/hqdefault.jpg",
      description: "Trendy K-pop fallback."
    },
    {
      videoId: "JleoAppaxi0",
      title: "ILLIT (아일릿) 'Magnetic' Official MV",
      channelTitle: "HYBE LABELS",
      thumbnailUrl: "https://i.ytimg.com/vi/JleoAppaxi0/hqdefault.jpg",
      description: "Light and catchy K-pop fallback."
    },
    {
      videoId: "WMweEpGlu_U",
      title: "BLACKPINK - 'How You Like That' M/V",
      channelTitle: "BLACKPINK",
      thumbnailUrl: "https://i.ytimg.com/vi/WMweEpGlu_U/hqdefault.jpg",
      description: "Bold K-pop fallback."
    },
    {
      videoId: "gQlMMD8auMs",
      title: "NewJeans (뉴진스) 'Ditto' Official MV (side A)",
      channelTitle: "HYBE LABELS",
      thumbnailUrl: "https://i.ytimg.com/vi/gQlMMD8auMs/hqdefault.jpg",
      description: "Soft K-pop fallback."
    },
    {
      videoId: "AyV0oe8Y8uU",
      title: "AKMU - Love Lee M/V",
      channelTitle: "AKMU",
      thumbnailUrl: "https://i.ytimg.com/vi/AyV0oe8Y8uU/hqdefault.jpg",
      description: "Warm K-pop fallback."
    },
    {
      videoId: "AbZH7XWDW_k",
      title: "IU 아이유 'Love wins all' MV",
      channelTitle: "이지금 [IU Official]",
      thumbnailUrl: "https://i.ytimg.com/vi/AbZH7XWDW_k/hqdefault.jpg",
      description: "Emotional K-pop fallback."
    }
  ],
  pop: [
    {
      videoId: "kJQP7kiw5Fk",
      title: "Luis Fonsi - Despacito ft. Daddy Yankee",
      channelTitle: "Luis Fonsi",
      thumbnailUrl: "https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
      description: "Global pop fallback."
    },
    {
      videoId: "fRh_vgS2dFE",
      title: "Justin Bieber - Sorry",
      channelTitle: "Justin Bieber",
      thumbnailUrl: "https://i.ytimg.com/vi/fRh_vgS2dFE/hqdefault.jpg",
      description: "Dance-pop fallback."
    },
    {
      videoId: "OPf0YbXqDm0",
      title: "Mark Ronson - Uptown Funk ft. Bruno Mars",
      channelTitle: "Mark Ronson",
      thumbnailUrl: "https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg",
      description: "Well-known pop fallback."
    },
    {
      videoId: "09R8_2nJtjg",
      title: "Maroon 5 - Sugar",
      channelTitle: "Maroon 5",
      thumbnailUrl: "https://i.ytimg.com/vi/09R8_2nJtjg/hqdefault.jpg",
      description: "Light pop fallback."
    },
    {
      videoId: "CevxZvSJLk8",
      title: "Katy Perry - Roar",
      channelTitle: "Katy Perry",
      thumbnailUrl: "https://i.ytimg.com/vi/CevxZvSJLk8/hqdefault.jpg",
      description: "Cheerful pop fallback."
    },
    {
      videoId: "JGwWNGJdvx8",
      title: "Ed Sheeran - Shape of You",
      channelTitle: "Ed Sheeran",
      thumbnailUrl: "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg",
      description: "Mainstream pop fallback."
    },
    {
      videoId: "YQHsXMglC9A",
      title: "Adele - Hello",
      channelTitle: "Adele",
      thumbnailUrl: "https://i.ytimg.com/vi/YQHsXMglC9A/hqdefault.jpg",
      description: "Emotional pop fallback."
    },
    {
      videoId: "fLexgOxsZu0",
      title: "Bruno Mars - Uptown Funk (Official Video)",
      channelTitle: "Bruno Mars",
      thumbnailUrl: "https://i.ytimg.com/vi/fLexgOxsZu0/hqdefault.jpg",
      description: "Groovy pop fallback."
    },
    {
      videoId: "2Vv-BfVoq4g",
      title: "Ed Sheeran - Perfect (Official Music Video)",
      channelTitle: "Ed Sheeran",
      thumbnailUrl: "https://i.ytimg.com/vi/2Vv-BfVoq4g/hqdefault.jpg",
      description: "Romantic pop fallback."
    },
    {
      videoId: "lp-EO5I60KA",
      title: "John Legend - All of Me",
      channelTitle: "John Legend",
      thumbnailUrl: "https://i.ytimg.com/vi/lp-EO5I60KA/hqdefault.jpg",
      description: "Soft pop fallback."
    }
  ],
  ballad: [
    {
      videoId: "YQHsXMglC9A",
      title: "Adele - Hello",
      channelTitle: "Adele",
      thumbnailUrl: "https://i.ytimg.com/vi/YQHsXMglC9A/hqdefault.jpg",
      description: "Ballad fallback."
    },
    {
      videoId: "450p7goxZqg",
      title: "Ed Sheeran - Thinking Out Loud",
      channelTitle: "Ed Sheeran",
      thumbnailUrl: "https://i.ytimg.com/vi/450p7goxZqg/hqdefault.jpg",
      description: "Soft ballad fallback."
    },
    {
      videoId: "lp-EO5I60KA",
      title: "John Legend - All of Me",
      channelTitle: "John Legend",
      thumbnailUrl: "https://i.ytimg.com/vi/lp-EO5I60KA/hqdefault.jpg",
      description: "Classic ballad fallback."
    },
    {
      videoId: "hLQl3WQQoQ0",
      title: "Adele - Someone Like You",
      channelTitle: "Adele",
      thumbnailUrl: "https://i.ytimg.com/vi/hLQl3WQQoQ0/hqdefault.jpg",
      description: "Emotional ballad fallback."
    },
    {
      videoId: "RgKAFK5djSk",
      title: "Wiz Khalifa - See You Again ft. Charlie Puth",
      channelTitle: "Wiz Khalifa",
      thumbnailUrl: "https://i.ytimg.com/vi/RgKAFK5djSk/hqdefault.jpg",
      description: "Sentimental ballad fallback."
    },
    {
      videoId: "450p7goxZqg",
      title: "Ed Sheeran - Thinking Out Loud",
      channelTitle: "Ed Sheeran",
      thumbnailUrl: "https://i.ytimg.com/vi/450p7goxZqg/hqdefault.jpg",
      description: "Gentle ballad fallback."
    },
    {
      videoId: "M7lc1UVf-VE",
      title: "Melancholic Chill Playlist",
      channelTitle: "Mood Lab",
      thumbnailUrl: "https://i.ytimg.com/vi/M7lc1UVf-VE/hqdefault.jpg",
      description: "Low-tempo ballad fallback."
    }
  ],
  indie: [
    {
      videoId: "5qap5aO4i9A",
      title: "lofi hip hop radio - beats to relax/study to",
      channelTitle: "Lofi Girl",
      thumbnailUrl: "https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg",
      description: "Indie-like chill fallback."
    },
    {
      videoId: "lFcSrYw-ARY",
      title: "City Pop Playlist for Sunset Drive",
      channelTitle: "The Jazz Hop Cafe",
      thumbnailUrl: "https://i.ytimg.com/vi/lFcSrYw-ARY/hqdefault.jpg",
      description: "Groovy indie fallback."
    },
    {
      videoId: "y6Sxv-sUYtM",
      title: "Happy Vibes Playlist",
      channelTitle: "Chill Zone",
      thumbnailUrl: "https://i.ytimg.com/vi/y6Sxv-sUYtM/hqdefault.jpg",
      description: "Easy indie-pop fallback."
    },
    {
      videoId: "DWcJFNfaw9c",
      title: "Rainy Jazz Cafe - Slow Jazz Music",
      channelTitle: "Relax Jazz Cafe",
      thumbnailUrl: "https://i.ytimg.com/vi/DWcJFNfaw9c/hqdefault.jpg",
      description: "Cafe indie fallback."
    },
    {
      videoId: "MYPVQccHhAQ",
      title: "Peaceful Piano & Ambient Mix",
      channelTitle: "Yellow Brick Cinema",
      thumbnailUrl: "https://i.ytimg.com/vi/MYPVQccHhAQ/hqdefault.jpg",
      description: "Quiet indie fallback."
    },
    {
      videoId: "jfKfPfyJRdk",
      title: "lofi hip hop radio - beats to sleep/chill to",
      channelTitle: "Lofi Girl",
      thumbnailUrl: "https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg",
      description: "Night indie fallback."
    },
    {
      videoId: "3qIot4Kfrxo",
      title: "Relaxing Piano Music for Deep Rest",
      channelTitle: "Soothing Relaxation",
      thumbnailUrl: "https://i.ytimg.com/vi/3qIot4Kfrxo/hqdefault.jpg",
      description: "Acoustic indie fallback."
    }
  ],
  hiphop: [
    {
      videoId: "9bZkp7q19f0",
      title: "PSY - GANGNAM STYLE",
      channelTitle: "officialpsy",
      thumbnailUrl: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
      description: "K-hiphop leaning fallback."
    },
    {
      videoId: "fLexgOxsZu0",
      title: "Bruno Mars - Uptown Funk (Official Video)",
      channelTitle: "Bruno Mars",
      thumbnailUrl: "https://i.ytimg.com/vi/fLexgOxsZu0/hqdefault.jpg",
      description: "Groovy hip-hop pop fallback."
    },
    {
      videoId: "LsoLEjrDogU",
      title: "Mark Ronson - Uptown Funk",
      channelTitle: "Mark Ronson",
      thumbnailUrl: "https://i.ytimg.com/vi/LsoLEjrDogU/hqdefault.jpg",
      description: "Punchy fallback."
    },
    {
      videoId: "kJQP7kiw5Fk",
      title: "Luis Fonsi - Despacito ft. Daddy Yankee",
      channelTitle: "Luis Fonsi",
      thumbnailUrl: "https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
      description: "Rhythmic fallback."
    },
    {
      videoId: "fRh_vgS2dFE",
      title: "Justin Bieber - Sorry",
      channelTitle: "Justin Bieber",
      thumbnailUrl: "https://i.ytimg.com/vi/fRh_vgS2dFE/hqdefault.jpg",
      description: "Light hip-hop/pop fallback."
    },
    {
      videoId: "OPf0YbXqDm0",
      title: "Mark Ronson - Uptown Funk ft. Bruno Mars",
      channelTitle: "Mark Ronson",
      thumbnailUrl: "https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg",
      description: "Danceable hip-hop fallback."
    },
    {
      videoId: "CevxZvSJLk8",
      title: "Katy Perry - Roar",
      channelTitle: "Katy Perry",
      thumbnailUrl: "https://i.ytimg.com/vi/CevxZvSJLk8/hqdefault.jpg",
      description: "Punchy crossover fallback."
    }
  ]
};

function pickRotatedList(list: RecommendationItem[], offset: number, size = 5) {
  if (list.length <= size) {
    return list;
  }

  return Array.from({ length: size }, (_, index) => list[(offset + index) % list.length]);
}

export function getFallbackRecommendations(
  emotion?: Emotion,
  musicStyle?: MusicStyle
): RecommendationItem[] {
  if (musicStyle) {
    const styleList = FALLBACK_BY_STYLE[musicStyle] ?? FALLBACK_RECOMMENDATIONS;
    const offset = emotion ? EMOTION_STYLE_OFFSETS[emotion] : 0;
    return pickRotatedList(styleList, offset);
  }

  if (!emotion) {
    return FALLBACK_RECOMMENDATIONS;
  }
  return FALLBACK_BY_EMOTION[emotion] ?? FALLBACK_RECOMMENDATIONS;
}
