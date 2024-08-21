type Country = string;
type City = string;
type Airport = { name: string; airportCode: string; cityCode: string };

export interface DestinationEntity {
  country: Country;
  city: City;
  airport: Airport;
}
