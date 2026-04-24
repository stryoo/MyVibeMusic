# YouTube Playlist Presets

운영용으로 바로 적용하기 좋은 기본 조합입니다.

## 추천 조합 A

가장 무난하고 현재 앱 컨셉과 잘 맞는 기본 세트입니다.

```env
YOUTUBE_PLAYLIST_ID_KPOP_MAIN=RDCLAK5uy_nMqMWmqwZwDvMcqcAohgO_Dp_7zT1nSC8
YOUTUBE_PLAYLIST_ID_KPOP_CALM=RDCLAK5uy_l_55_sN_r4EK6rLXumYGyCsrwzNjFKTuA
YOUTUBE_PLAYLIST_ID_POP_MAIN=RDCLAK5uy_mItjo5v7FEAngOlR08hW5s5TtIwfrexxY
YOUTUBE_PLAYLIST_ID_BALLAD_MAIN=RDCLAK5uy_mLJT5wcS3U47A03u-fgab2S6Yba9GwVtA
YOUTUBE_PLAYLIST_ID_INDIE_MAIN=RDCLAK5uy_l_55_sN_r4EK6rLXumYGyCsrwzNjFKTuA
YOUTUBE_PLAYLIST_ID_HIPHOP_MAIN=RDCLAK5uy_mZHyenayZw8LMV39ADiOCyJxmA4dlW0Os,RDCLAK5uy_kuwISRPpQ0pWcFUwdd1gigwj4wGWbISII
```

이 조합은 아래 기준으로 튜닝했습니다.

- `K-pop Main`: 밝고 대중적인 기본 축
- `K-pop Calm`: 흐림/비/저녁/감성 쪽 보정 축
- `Pop Main`: 맑음/기분좋음/퇴근길 쪽 보정 축
- `Ballad Main`: 비/눈/밤/센치함 보정 축
- `Indie Main`: 차분함/집중/잔잔한 날씨 보정 축
- `Hip-hop Main`: 낮/오후/에너지/집중 보정 축

## 스타일별 의도

- `K-pop Main`
  - 최신성과 대중성을 우선
  - 추천 소스: `BEAT ON`
  - 잘 맞는 상황: `happy`, `energetic`, `clear`, `afternoon~night`
- `K-pop Calm`
  - 차분함, 저녁, 흐린 날, 감성 무드용
  - 추천 소스: `Spring Korean Indie Music`
  - 잘 맞는 상황: `calm`, `sad`, `romantic`, `clouds/rain/mist`, `afternoon~lateNight`
- `Pop Main`
  - 너무 자극적이지 않은 글로벌 팝 위주
  - 추천 소스: `Winter Pop Classics`
  - 잘 맞는 상황: `happy`, `energetic`, `romantic`, `clear/clouds`, `afternoon~night`
- `Ballad Main`
  - 감성/회상/차분한 흐름에 적합
  - 추천 소스: `Timeless 80s & 90s Korean Ballad`
  - 잘 맞는 상황: `calm`, `sad`, `romantic`, `rain/clouds/snow`, `evening~lateNight`
- `Indie Main`
  - 현재 날씨/감정과 가장 잘 어울리는 잔잔한 축
  - 추천 소스: `Spring Korean Indie Music`
  - 잘 맞는 상황: `calm`, `focus`, `romantic`, `sad`, `morning~night`
- `Hip-hop Main`
  - 클래식 힙합 + 최신 여성 랩/에너지 힙합 섞기
  - 추천 소스: `50 Deep`, `#WCE`
  - 잘 맞는 상황: `focus`, `energetic`, `happy`, `midday~evening`

## 감정별 추천 연결 가이드

- `calm`
  - `K-pop Calm` > `Indie Main` > `Ballad Main`
- `happy`
  - `K-pop Main` > `Pop Main` > `Hip-hop Main`
- `sad`
  - `Ballad Main` > `K-pop Calm` > `Indie Main`
- `focus`
  - `Indie Main` > `Hip-hop Main`
- `romantic`
  - `Ballad Main` > `K-pop Calm` > `Pop Main`
- `energetic`
  - `K-pop Main` > `Hip-hop Main` > `Pop Main`

## 적용 방법

1. 이 값들을 `.env.local`에 복사합니다.
2. 서버를 다시 시작합니다.
3. 추천 결과가 너무 한쪽으로 치우치면 해당 스타일의 playlist ID를 1~2개 더 추가합니다.

## 참고 링크

- BEAT ON  
  [https://music.youtube.com/playlist?list=RDCLAK5uy_nMqMWmqwZwDvMcqcAohgO_Dp_7zT1nSC8](https://music.youtube.com/playlist?list=RDCLAK5uy_nMqMWmqwZwDvMcqcAohgO_Dp_7zT1nSC8)
- Spring Korean Indie Music  
  [https://music.youtube.com/watch?list=RDCLAK5uy_l_55_sN_r4EK6rLXumYGyCsrwzNjFKTuA&v=FoYyqHqbnxc](https://music.youtube.com/watch?list=RDCLAK5uy_l_55_sN_r4EK6rLXumYGyCsrwzNjFKTuA&v=FoYyqHqbnxc)
- Winter Pop Classics  
  [https://music.youtube.com/playlist?list=RDCLAK5uy_mItjo5v7FEAngOlR08hW5s5TtIwfrexxY](https://music.youtube.com/playlist?list=RDCLAK5uy_mItjo5v7FEAngOlR08hW5s5TtIwfrexxY)
- Timeless 80s & 90s Korean Ballad  
  [https://music.youtube.com/playlist?list=RDCLAK5uy_mLJT5wcS3U47A03u-fgab2S6Yba9GwVtA](https://music.youtube.com/playlist?list=RDCLAK5uy_mLJT5wcS3U47A03u-fgab2S6Yba9GwVtA)
- 50 Deep  
  [https://music.youtube.com/playlist?list=RDCLAK5uy_mZHyenayZw8LMV39ADiOCyJxmA4dlW0Os](https://music.youtube.com/playlist?list=RDCLAK5uy_mZHyenayZw8LMV39ADiOCyJxmA4dlW0Os)
- #WCE  
  [https://music.youtube.com/playlist?list=RDCLAK5uy_kuwISRPpQ0pWcFUwdd1gigwj4wGWbISII](https://music.youtube.com/playlist?list=RDCLAK5uy_kuwISRPpQ0pWcFUwdd1gigwj4wGWbISII)
