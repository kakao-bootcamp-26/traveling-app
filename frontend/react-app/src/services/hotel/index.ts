import { indexApi } from "@/services";
import {
  HotelCurationSuccess,
  HotelCurationError,
  checkIsHotelCuration,
} from "@/shared/entities/hotelCuration.entity";

const hotelIndexApi = indexApi.extend({
  prefixUrl: "api/hotels",
});

type TravelInformation = {
  origin: string;
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  passengerInfo: {
    count: {
      adult: number;
      child: number;
      infant: number;
    };
    fareType: "Y" | "C" | "F";
  };
};

export const fetchHotelRecommendations = async ({
  origin,
  checkInDate,
  checkOutDate,
  destination,
  passengerInfo,
}: TravelInformation): Promise<HotelCurationSuccess | HotelCurationError> => {
  try {
    const response = (await hotelIndexApi
      .post("recommendations", {
        json: {
          origin,
          checkInDate,
          checkOutDate,
          destination,
          passengerInfo,
        },
      })
      .json()) as HotelCurationSuccess;
    if (!checkIsHotelCuration(response)) {
      throw new Error("Invalid response");
    }

    console.log("response", response);
    return response;
  } catch (error) {
    console.error("Error fetching hotel recommendations");
    return {
      error: "Error fetching hotel recommendations",
    };
  }
};
