import { Helmet } from "react-helmet-async";
import TravelInfoForm from "@/pages/home/components/TravelInfoForm";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Traveler</title>
        <meta name="description" content="Traveler" />
        {/* Open Graph */}
        <meta property="og:title" content="Traveler" />
        <meta property="og:description" content="Traveler 입니다." />
        <meta property="og:image" content="https://via.placeholder.com/1200" />
        <meta property="og:url" content="https://www.google.com" />
        <meta property="og:type" content="website" />
        {/* Twitter */}
        <meta property="twitter:title" content="Traveler" />
        <meta property="twitter:description" content="Traveler 입니다." />
        <meta property="twitter:image" content="https://via.placeholder.com/1200" />
        <meta property="twitter:card" content="summary_large_image" />
      </Helmet>
      <main style={{ display: "flex", position: "absolute", width: "100%", overflow: "hidden" }}>
        <TravelInfoForm />
        <section style={{ height: "100vh", flex: "1 1 0" }}></section>
      </main>
    </>
  );
}
