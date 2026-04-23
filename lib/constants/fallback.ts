import type { Emotion, RecommendationItem } from "@/types";

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

export function getFallbackRecommendations(emotion?: Emotion): RecommendationItem[] {
  if (!emotion) {
    return FALLBACK_RECOMMENDATIONS;
  }
  return FALLBACK_BY_EMOTION[emotion] ?? FALLBACK_RECOMMENDATIONS;
}

