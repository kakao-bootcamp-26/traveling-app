export interface HotelInfo {
  clkLogUrl: string;
  id: string;
  image: string;
  name: string;
  overallRating: number;
  price: number;
}

export interface HotelRecommendationsNaversResponse {
  data: {
    statsRecommendedHotels: {
      hotelsInfo: HotelInfo[];
      impLogUrl: string;
    };
  };
}
