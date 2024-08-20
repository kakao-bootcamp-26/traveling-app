type Country = string;
type City = string;
type Airport = { name: string; code: string };

export interface DestinationEntity {
  country: Country;
  city: City;
  airport: Airport;
}
