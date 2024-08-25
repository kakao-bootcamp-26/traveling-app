export type TravelInformation = {
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
    fareType: 'Y' | 'C' | 'F';
  };
};
