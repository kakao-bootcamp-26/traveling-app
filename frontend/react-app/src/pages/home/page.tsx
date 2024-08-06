import TravelInfoForm from "@/pages/home/components/TravelInfoForm";
import React from "react";

export default function HomePage() {
  return (
    <main style={{ display: "flex", position: "absolute", width: "100%", overflow: "hidden" }}>
      <TravelInfoForm />
      {/* <section style={{ height: "100vh", flex: "1 1 0" }}></section> */}
      <section style={{ height: "100vh" }}></section>
    </main>
  );
}
