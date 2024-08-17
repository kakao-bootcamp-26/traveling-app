import { Helmet } from "react-helmet-async";
import TravelInfoForm from "@/pages/home/components/TravelInfoForm";
import { FindFlightProvider } from "@/pages/home/components/provider/FindFlightContext";
import FlightSuggestions from "@/pages/home/components/flightSuggestions/FlightSuggestions";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>GO.A.T</title>
        <meta name="description" content="GO.A.T" />
        {/* Open Graph */}
        <meta property="og:title" content="GO.A.T" />
        <meta property="og:description" content="GO.A.T 입니다." />
        <meta property="og:image" content="https://via.placeholder.com/1200" />
        <meta property="og:url" content="https://www.google.com" />
        <meta property="og:type" content="website" />
        {/* Twitter */}
        <meta property="twitter:title" content="GO.A.T" />
        <meta property="twitter:description" content="GO.A.T 입니다." />
        <meta property="twitter:image" content="https://via.placeholder.com/1200" />
        <meta property="twitter:card" content="summary_large_image" />
      </Helmet>
      <FindFlightProvider>
        <main style={{ display: "flex", position: "absolute", width: "100%", overflow: "hidden" }}>
          <TravelInfoForm />
          <section className="main_section" style={{ height: "100vh", flex: "1 1 0" }}>
            <FlightSuggestions />
          </section>
        </main>
      </FindFlightProvider>
    </>
  );
}
