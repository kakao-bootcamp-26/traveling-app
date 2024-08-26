import useGetAirportCoordinate from "@/pages/home/hooks/map/useGetAirportCoordinate";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

export default function useShowAirportMap() {
  const coordinates = useGetAirportCoordinate();

  return (
    <div style={{ width: "100%", height: "20vh", borderRadius: "10px" }}>
      {coordinates && (
        // <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          center={{
            lat: coordinates.lat,
            lng: coordinates.lon,
          }}
          zoom={14}
        >
          <MarkerF
            position={{
              lat: coordinates.lat,
              lng: coordinates.lon,
            }}
            icon={
              "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            }
          ></MarkerF>
        </GoogleMap>
        // </LoadScript>
      )}
    </div>
  );
}
