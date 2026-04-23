import { serverEnv } from "@/lib/config/env";
import { fetchJson } from "@/lib/utils/fetcher";
import type { Coordinates, LocationSnapshot } from "@/types";

type KakaoAddressDocument = {
  address?: {
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
  };
  road_address?: {
    region_1depth_name: string;
    region_2depth_name: string;
    road_name: string;
  };
};

type KakaoGeoResponse = {
  documents: KakaoAddressDocument[];
};

function normalizeDistrict(value?: string) {
  if (!value) {
    return "";
  }

  return value.replace(/\s+/g, " ").trim();
}

export async function getLocationSnapshot(coordinates: Coordinates): Promise<LocationSnapshot> {
  const url = new URL("https://dapi.kakao.com/v2/local/geo/coord2address.json");
  url.searchParams.set("x", coordinates.lon.toString());
  url.searchParams.set("y", coordinates.lat.toString());
  url.searchParams.set("input_coord", "WGS84");

  const data = await fetchJson<KakaoGeoResponse>(url, {
    headers: {
      Authorization: `KakaoAK ${serverEnv.kakaoRestApiKey}`
    },
    next: { revalidate: 3600 }
  });

  const document = data.documents[0];
  const address = document?.address;
  const roadAddress = document?.road_address;

  const city = normalizeDistrict(address?.region_1depth_name ?? roadAddress?.region_1depth_name) || "대한민국";
  const district =
    normalizeDistrict(address?.region_2depth_name ?? roadAddress?.region_2depth_name) || "어딘가";
  const neighborhood = normalizeDistrict(address?.region_3depth_name ?? roadAddress?.road_name) || district;
  const stationLikeLabel = neighborhood.endsWith("역") ? neighborhood : district;
  const fullLabel = [city, district, neighborhood].filter(Boolean).join(" ");

  return {
    city,
    district,
    neighborhood,
    fullLabel,
    stationLikeLabel
  };
}
