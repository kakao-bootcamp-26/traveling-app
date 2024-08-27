import ky from "ky";

type OpenStreetMapResponse = {
  place_id: number; // 장소의 고유 ID
  licence: string; // 데이터 사용 라이센스 정보
  osm_type: string; // OSM(오픈스트리트맵) 데이터 타입 (예: node, way, relation)
  osm_id: number; // OSM ID
  lat: string; // 위도
  lon: string; // 경도
  class: string; // 장소의 클래스 (예: aeroway, amenity)
  type: string; // 장소의 타입 (예: aerodrome, airport)
  place_rank: number; // 장소의 순위
  importance: number; // 장소의 중요도
  addresstype: string; // 주소 유형
  name: string; // 장소의 이름
  display_name: string; // 장소의 표시 이름 (포맷된 전체 이름)
  boundingbox: string[]; // 경계 상자의 좌표 (위도 및 경도 범위)
};

export async function getAirportCoordinates(airportCode: string) {
  const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(`${airportCode} Airport`)}`;
  const response = (await ky.get(apiUrl).json()) as OpenStreetMapResponse[];

  console.log(response);
  return { lat: response[0].lat, lon: response[0].lon };
}
