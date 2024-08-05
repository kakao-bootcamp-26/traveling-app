import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { Sidebar } from "@/shared/components/sidebar/index";

export default function MainLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  );
}
