export interface HotelInfo {
  clkLogUrl: string;
  id: string;
  image: string;
  name: string;
  overallRating: number;
  price: number;
}

export function checkIsHotelCuration(
  data: HotelCurationSuccess | HotelCurationError,
): data is HotelCurationSuccess {
  return "data" in data;
}

export type HotelCurationSuccess = { data: HotelInfo[] };

export interface HotelCurationError {
  error: string;
}
