import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { Sidebar } from "@/shared/components/sidebar/index";
import "./layout.css";

export default function MainLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout style={{ overflow: "hidden", paddingLeft: "120px" }}>
        <div className="bg"></div>
        <Outlet />
      </Layout>
    </Layout>
  );
}
