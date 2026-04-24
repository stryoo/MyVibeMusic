# YouTube Playlist Setup

이 프로젝트는 `search.list` 대신, 미리 정한 YouTube 재생목록에서 영상을 가져와 추천합니다.

## 권장 방식

- 스타일별로 2~3개의 플레이리스트를 준비합니다.
- `.env.local`에는 playlist ID를 `,`로 구분해 여러 개 넣을 수 있습니다.
- 예시:

```env
YOUTUBE_PLAYLIST_ID_KPOP_MAIN=RDCLAK5uy_nMqMWmqwZwDvMcqcAohgO_Dp_7zT1nSC8
YOUTUBE_PLAYLIST_ID_KPOP_CALM=RDCLAK5uy_l_55_sN_r4EK6rLXumYGyCsrwzNjFKTuA
YOUTUBE_PLAYLIST_ID_POP_MAIN=RDCLAK5uy_mItjo5v7FEAngOlR08hW5s5TtIwfrexxY
YOUTUBE_PLAYLIST_ID_BALLAD_MAIN=RDCLAK5uy_mLJT5wcS3U47A03u-fgab2S6Yba9GwVtA
YOUTUBE_PLAYLIST_ID_INDIE_MAIN=RDCLAK5uy_l_55_sN_r4EK6rLXumYGyCsrwzNjFKTuA
YOUTUBE_PLAYLIST_ID_HIPHOP_MAIN=RDCLAK5uy_mZHyenayZw8LMV39ADiOCyJxmA4dlW0Os,RDCLAK5uy_kuwISRPpQ0pWcFUwdd1gigwj4wGWbISII
```

## 후보 플레이리스트

- K-pop 메인: `BEAT ON`
- K-pop/Indie 차분한 무드: `Spring Korean Indie Music`
- Pop: `Winter Pop Classics`
- Ballad: `Timeless 80s & 90s Korean Ballad`
- Hip-hop: `50 Deep`, `#WCE`

## playlist ID 찾는 법

1. YouTube Music 또는 YouTube에서 플레이리스트를 엽니다.
2. URL의 `list=` 뒤 값을 복사합니다.
3. `.env.local`에 넣습니다.

예:

```text
https://music.youtube.com/playlist?list=RDCLAK5uy_mItjo5v7FEAngOlR08hW5s5TtIwfrexxY
```

위 URL이면 playlist ID는:

```text
RDCLAK5uy_mItjo5v7FEAngOlR08hW5s5TtIwfrexxY
```

## 운영 팁

- 한 스타일에 플레이리스트를 1개만 두면 곡 풀이 너무 빨리 고정됩니다.
- 2~3개를 섞어두면 같은 감정/날씨에서도 추천 다양성이 좋아집니다.
- 플레이리스트 변경이 잦은 채널보다는 YouTube Music 큐레이션 플레이리스트나 검증된 공식 채널을 우선 추천합니다.
