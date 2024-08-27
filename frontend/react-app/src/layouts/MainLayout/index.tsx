import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { Sidebar } from "@/shared/components/sidebar/index";
import "./mainLayout.css";
import { useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";

export default function MainLayout() {
  useEffect(() => {
    document.body.classList.add("after-auth");
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout style={{ overflow: "hidden", paddingLeft: "120px" }}>
          <div className="bg"></div>
          <Outlet />
        </Layout>
      </Layout>
    </LoadScript>
  );
}
